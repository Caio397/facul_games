//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//Snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

//Comida
var foodX = blockSize * 10;
var foodY = blockSize * 10;

var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //Usado para desenhar no board

    placeFood();
    document.addEventListener("keyup", changeDirection);    
    //update();
    setInterval(update, 1000/10) //Atualiza a tela a cada 100 milissegundos
}



function update(){
    if (gameOver){
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0,0,board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood()
    }

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1]
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY]
    }

    context.fillStyle = "lime";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    for(let i = 0;i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    //condições de game over
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver = true;
        alert("Game Over");
 
    }

    for(let i = 0; i<snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver=true; 
            alert("Game Over");

        }
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && speedY !=1){
        speedX = 0;
        speedY = -1;
    }
    if(e.code == "ArrowDown" && speedY !=-1){
        speedX = 0;
        speedY = 1;
    }
    if(e.code == "ArrowRight" && speedX !=-1){
        speedX = 1;
        speedY = 0;
    }
    if(e.code == "ArrowLeft" && speedX !=1){
        speedX = -1;
        speedY = 0;
    }
}

function placeFood(){

    //0-1 * cols (0-19.999) -> (0-19)
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}