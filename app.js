const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colours = document.getElementsByClassName("jsColor"); //** 
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOUR = "#2C2C2C";
const CANVAS_SIZE = 700;

canvas.width= CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOUR;
ctx.fillStyle = INITIAL_COLOUR;
ctx.lineWidth = 2.5;

let painting = false;
let filling  = false;
let colour_opacity = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //console.log("creating path in", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    //console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

}

function handleColourClick(event) {
  const colour = event.target.style.backgroundColor;
  const colourOpacity = event.target;
 
  if(colour_opacity === false) {
    colourOpacity.classList.add("colour_opacity");
    colour_opacity = true;
  }
  
  ctx.strokeStyle = colour;
  ctx.fillStyle = colour;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colours).forEach(potato => potato.addEventListener("click", handleColourClick));
//** potato: represents each of the items inside of the array 'const colours'

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}