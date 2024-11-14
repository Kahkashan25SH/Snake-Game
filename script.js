const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // size of one snake segment
let snake = [{ x: 9 * box, y: 10 * box }]; // intial snake position
let direction = "RIGHT"; // initial movement direction
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
}; // Random food position

let score = 0;


// control the snake
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.keyCode === 37 && direction!== "RIGHT") {
    direction = "LEFT";
  } else if (event.keyCode === 38 && direction!== "DOWN") {
    direction = "UP";
  } else if (event.keyCode === 39 && direction!== "LEFT") {
    direction = "RIGHT";
  } else if (event.keyCode === 40 && direction!== "UP") {
    direction = "DOWN";
  }
}
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let upBtn = document.querySelector(".up");
let downBtn = document.querySelector(".down");
leftBtn.addEventListener("click", () => changeDirection({ keyCode: 37 }));
upBtn.addEventListener("click", () => changeDirection({ keyCode: 38 }));
downBtn.addEventListener("click", () => changeDirection({ keyCode: 40 }));
rightBtn.addEventListener("click", () => changeDirection({ keyCode: 39 }));

//Draw the snake
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    
    ctx.fillStyle = (i === 0) ? "black" : "white"; // head is green, body is lightgreen
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

// Draw the Food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);
}

// update game state
function updateGame() {     // get the current head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

// Move the snake in the current direction
  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;


  // Check if the snake eats the food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };  //Re generate food at randome position
  } else {
    snake.pop(); // Remove the tail if no food eaten
  }

  // Add new head to the snake
  let newHead = {
     x: snakeX,
     y: snakeY 
    };

// cheack for collision with walls or itself
  if (
    snakeX < 0 || snakeY < 0 || snakeX >= 20 * box || snakeY >= 20 * box || collision(newHead, snake)
  ) {
    clearInterval(game); // End the game

    alert("GamerOver");
  }

  snake.unshift(newHead); // Add new head at the beggining of the array
}

// collision detection
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) 
      return true; // collision detected
  }
  return array.some((segment) => head.x === segment.x && head.y === segment.y);
}

// Main game loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
  drawSnake();
  drawFood();
  updateGame();
  ctx.fillStyle = "black";
  ctx.font = "bold 2px Monospace";
  ctx.fillText("Score: " + score, box, box); // display the score
}

let game = setInterval(draw,300); // game loop speed

// Reset game

function restartGame() {
  clearInterval(game);
  snake = [{ x: 9 * box, y: 10 * box }]; // reset snake position
  direction = "RIGHT"; // reset movement direction
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
  }; // reset food position
  score = 0;
  game = setInterval(draw, 300); // start the game again
}

let resetBtn = document.querySelector(".restart");

resetBtn.addEventListener("click", restartGame);




