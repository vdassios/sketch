let container = document.querySelector(".grid-container");
let item = [];
const gridbtn = document.querySelector("#grid");
const sizebtn = document.querySelector("#size");
const resetbtn = document.querySelector("#reset");
const root = document.documentElement;

let rand = () => Math.floor(Math.random() * 255); //rgb generator

gridInit(20); //starting grid
hover();
function checkSize() {
  //trims the DOM accordingly if the user specifies smaller size than current grid
  let size = prompt("(we suggest sizes under 100 blocks)"); //handles user size input
  if (!size) {
    return;
  } else {
    size = parseInt(size, 10);
    item.forEach((div) => div.remove()); //depopulate the DOM, prolly not efficient at all
    gridInit(size); //initialize grid to new size
  }
  hover();
}

function gridInit(dim) {
  // initialize a grid of user's dimension
  item.length = 0; //wipe div data inplace
  for (let i = 0; i < dim ** 2; i++) {
    item.push(document.createElement("div")); //generate & store divs into an array
    container.appendChild(item[i]);
    root.style.setProperty("--colNum", dim); //updates css variable
  }
}
function hover() {
  //generate random cell color on hover
  item.forEach((div) => {
    div.addEventListener("mouseover", function () {
      const cellColor = `rgb(${rand()}, ${rand()}, ${rand()})`;
      this.style.backgroundColor = cellColor; //black magic uwu
    });
  });
}

function reset() {
  //clears the board. Currently recolors every individual cell, think of a better way.
  item.forEach((div) => {
    div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  });
}

function gridLines() {
  //toggles grid lines
  item.forEach((div) => {
    div.classList.toggle("grid-lines");
  });
}

gridbtn.addEventListener("click", gridLines);
resetbtn.addEventListener("click", reset);
sizebtn.addEventListener("click", checkSize);
