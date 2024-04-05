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

    const createAvailableTmp = (arr) => {
      let tmp = `<h2>Available Courses</h2>`;
      arr.forEach((course, index) => {
        tmp += 
            `<div id=${course.courseId} class="course-box ${index % 2 != 0 ?'' : 'green'}" credit=${course.credit}>
                <p>
                    ${course.courseName}<br>
                    Course Type: ${course.required ? 'Compulsory' : 'Elective'}<br>
                    Course Credit: ${course.credit}<br>
                </p>
            </div>`;
      });
      return tmp;
    };

    const createSelectedTmp = (arr) => {
        let tmp = `<h2>Selected Courses</h2>`;
        arr.forEach((course, index) => {
          tmp += 
              `<div id=${course.courseId} credit="t" class="course-box ${index % 2 != 0 ?'' : 'green'}">
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
      createAvailableTmp,
      render,
    };
  })();
  
  const Model = ((view, api) => {

    const { getData } = api;
  
    const { domStr, createAvailableTmp, render } = view;
  
    class State {
      constructor() {
        this._courseList = [];
        this._copiedList = [];
        this._selectedList = [];
        this._credits = 0;
      }
      get getCourseList() {
        return this._courseList;
      }
      set newCourse(arr) {
        this._courseList = arr;
        const availableBox = document.querySelector(domStr.availableBox);
        const tmp = createAvailableTmp(this._courseList);
        render(availableBox, tmp);
      }

      get getCopiedList() {
        return this._copiedList;
      }
      set newCopiedCourse(arr) {
        this._copiedList = arr;
      }

      get getSelectedList() {
        return this._selectedList;
      }
      set newSelectedCourse(arr) {
        this._selectedList = arr;
        const selectedBox = document.querySelector(domStr.selectedBox);
        const tmp = createAvailableTmp(this._selectedList);
        render(selectedBox, tmp);
      }

      get getCredits() {
        return this._credits;
      }
      set addCredits(credit) {
        this._credits += credit;
      }
      set removeCredits(credit) {
        this._credits -= credit;
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
    const init = () => {
      return getData.then((data) => {  // let init() returns a promise so that deleteTodo() can be called after getData done.
        state.newCourse = data;
      });
    };
    

    const selectCourse = () => {
        const courseBoxes = document.querySelectorAll(domStr.availableBox+' '+domStr.courseBox);

        courseBoxes.forEach((courseBox, index) => {
            courseBox.addEventListener('click', function() {
                if (!this.classList.contains('blue')) {
                    this.classList.remove('green');
                    this.classList.add('blue');
                    const copiedList = state.getCopiedList;
                    copiedList.push(this.id);
                    state.newCopiedCourse = copiedList;
                    state.addCredits = +this.getAttribute('credit');
                } else {
                    this.classList.remove('blue');
                    if (index %  2 == 0)
                        this.classList.add('green');
                        const copiedList = state.getCopiedList;
                        const newCopiedList = copiedList.filter(item => item != this.id);
                        state.newCopiedCourse = newCopiedList;
                        state.removeCredits = +this.getAttribute('credit');
                }
                alert(state._credits);
            });
        });
        
    }

    const bootstrap = () => {
      init().then(() => {
        selectCourse();
      })
    }
  
    return {
      bootstrap
    }
  })(View, Model);
  
  Controller.bootstrap();