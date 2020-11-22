// month list
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];

// retrieve state from localStorage
let state = JSON.parse(window.localStorage.getItem("state"));

const gridsContainer = document.querySelector(".grids");

const year = document.querySelector(".year");
const leftButton = document.querySelector(".left-btn");
const rightButton = document.querySelector(".right-btn");

const currDate = new Date();
let currYear = currDate.getFullYear();
const originalYear = currYear;

const updateYear = (e) => {
  
  const button = e.currentTarget;

  if (button.classList.contains("left-btn"))
    currYear--;
  else if (currYear !== originalYear)
    currYear++;

  // hide or unhide the right button
  if (currYear === originalYear)
    rightButton.classList.add("hide-button");
  else if (rightButton.classList.contains("hide-button"))
    rightButton.classList.remove("hide-button");

  // Check if the key is already present in the state because otherwise it overwrites the value
  if (!(currYear in state))
    updateState();

  // new grids
  generateGrids();    
}


const updateLocalStorage = () => {

  window.localStorage.setItem("state", JSON.stringify(state));

}

const updateState = () => {

  const array = [];
  for (let i = 0; i < 12; i++) {

    const month = [];

    for (let j = 0; j < 31; j++)
      month.push(0);

    array.push(month);
  }

  state = {
    ...state,
    [currYear]: array,
  }

  updateLocalStorage();
}


const generateGrids = () => {

  gridsContainer.innerHTML = "";
  year.textContent = currYear;

  months.forEach((month, index) => {

    const days = new Date(currYear, index + 1, 0).getDate();

    const monthElement = document.createElement("div");
    monthElement.className = "month";

    const monthNameElement = document.createElement("h5");
    monthNameElement.className = "month__name";
    monthNameElement.textContent = month;

    const monthGridElement = document.createElement("div");
    monthGridElement.className = "month__grid";

    for (let i = 0; i < days; i++) {

      const day = document.createElement("button");
      day.textContent = i + 1;
      day.className = "month__grid-item";

      // First time rendering
      if (state[currYear][index][i] == 1) {

        day.classList.add("done");

      } else if (state[currYear][index][i] == 2) {

        day.classList.add("not-done");

      }

      day.addEventListener("click", () => {

        if (state[currYear][index][i] == 0) {

          state[currYear][index][i] = 1;
          day.classList.add("done");
          updateLocalStorage();

        } else if (state[currYear][index][i] == 1) {

          state[currYear][index][i] = 2;
          day.classList.add("not-done");
          updateLocalStorage();

        } else {

          state[currYear][index][i] = 0;
          day.classList.remove("done");
          day.classList.remove("not-done");
          updateLocalStorage();

        }

      })

      monthGridElement.appendChild(day);

    }

    monthElement.appendChild(monthNameElement);
    monthElement.appendChild(monthGridElement);
    gridsContainer.appendChild(monthElement);

  })

}

leftButton.addEventListener("click", updateYear);
rightButton.addEventListener("click", updateYear);

window.addEventListener("DOMContentLoaded", () => {

  // if no state is present in localStorage, create new
  if (!state)
    updateState();

  rightButton.classList.add("hide-button");
  generateGrids();
})