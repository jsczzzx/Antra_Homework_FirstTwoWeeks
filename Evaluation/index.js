const Api = (() => {
    // Fetch data from server
    const url = "http://localhost:4232/courseList";
    const getData = fetch(url).then((res) => res.json());
    return {
      getData,
    };
  })();
  
  const View = (() => {
    const domStr = {
      availableBox: "#available-courses",
      selectedBox: "#selected-courses",
      courseBox: ".course-box",
      selectBtn: "#select-button",
    };

    const createTmp = (arr) => {
      let tmp = `<h2>Available Courses</h2>`;
      arr.forEach((course) => {
        tmp += 
            `<div class="course-box ${course.courseId % 2 == 0 ?'' : 'green'}">
                <p>
                    ${course.courseName}<br>
                    Course Type: ${course.required ? 'Compulsory' : 'Elective'}<br>
                    Course Credit: ${course.credit}<br>
                </p>
            </div>`;
      });
      return tmp;
    };
  
    const render = (ele, tmp) => {
      ele.innerHTML = tmp;
    };
  
    return {
      domStr,
      createTmp,
      render,
    };
  })();
  
  const Model = ((view, api) => {

    const { getData } = api;
  
    const { domStr, createTmp, render } = view;
  
    class State {
      constructor() {
        this._courseList = [];
      }
      get getCourseList() {
        return this._courseList;
      }
      set newCourse(arr) {
        this._courseList = arr;
        const availableBox = document.querySelector(domStr.availableBox);
        const tmp = createTmp(this._courseList);
        render(availableBox, tmp);
      }
    }
  
    return {
      getData,
      State,
    };
  })(View, Api);
  
  const Controller = ((view, model) => {
    const { getData, State } = model;
    const { domStr } = view;
  
    const state = new State();
    const initCourse = () => {
      return getData.then((data) => {  // let init() returns a promise so that deleteTodo() can be called after getData done.
        state.newCourse = data;
      });
    };

    const bootstrap = () => {
      initCourse();
    }
  
    return {
      bootstrap
    }
  })(View, Model);
  
  Controller.bootstrap();