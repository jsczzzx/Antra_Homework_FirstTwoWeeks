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
      sum: "#sum",
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
      createSelectedTmp,
      render,
    };
  })();
  
  const Model = ((view, api) => {

    const { getData } = api;
  
    const { domStr, createAvailableTmp, createSelectedTmp, render } = view;
  
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
        const tmp = createSelectedTmp(this._selectedList);
        render(selectedBox, tmp);
      }

      get getCredits() {
        return this._credits;
      }
      set addCredits(credit) {
        this._credits += credit;
        let sum = document.querySelector(domStr.sum);
        render(sum, this.getCredits);
      }
      set removeCredits(credit) {
        this._credits -= credit;
        let sum = document.querySelector(domStr.sum);
        render(sum, this.getCredits);
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
                    let credits = state.getCredits;
                    if (credits + parseInt(this.getAttribute('credit')) > 18) {
                        alert("You can only choose up to 18 credits in one semester");
                    } else {
                        this.classList.remove('green');
                        this.classList.add('blue');
                        const copiedList = state.getCopiedList;
                        copiedList.push(this.id);
                        state.newCopiedCourse = copiedList;
                        state.addCredits = +this.getAttribute('credit');
                    }

                } else {
                    this.classList.remove('blue');
                    if (index %  2 == 0)
                        this.classList.add('green');
                        const copiedList = state.getCopiedList;
                        const newCopiedList = copiedList.filter(item => item != this.id);
                        state.newCopiedCourse = newCopiedList;
                        state.removeCredits = +this.getAttribute('credit');
                }
            });
        });
        
    }

    const submit = () => {
        const button = document.querySelector(domStr.selectBtn);
        button.addEventListener('click', (event) => {
            const credits = state.getCredits;
            let text = "You have chosen "+credits+" credits in this semester. You cannot change once you submit. Do you want to confirm?";
            if (confirm(text) == true) {
              text = "Successfully submitted!";
              const copiedList = state.getCopiedList;
              const availableCourse = state.getCourseList;
              let selectedCourse = [];
              //alert(copiedList.includes('1'));
              for (let i = 0; i < availableCourse.length; i++) {
                //alert(copiedList.indexOf(availableCourse[i].courseId));
                if (copiedList.includes(availableCourse[i].courseId)) {
                    selectedCourse.push(availableCourse[i]);
                }
              }
              //let selectedCourse = availableCourse;
              state.newSelectedCourse = selectedCourse;
              this.disabled = true;
              //alert(JSON.stringify(selectedCourse));
            }

        })
    }

    const bootstrap = () => {
      init().then(() => {
        selectCourse();
        submit();
      })
    }
  
    return {
      bootstrap
    }
  })(View, Model);
  
  Controller.bootstrap();