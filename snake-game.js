const id = (name) => document.querySelector(name);

let gameboard = id('.game-board');
let gameScore = id('.game-score');
let gameHighScore = id('.game-high-score');
let controls = document.querySelectorAll('.controls ion-icon');

let foodX, foodY;
let snakeX = 22, snakeY = 22;
let velocityX = 0 , velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalId = 0;
let score = 0;
let highScore = localStorage.getItem('high-score') || 0;
gameHighScore.innerHTML = `High Score: ${highScore}`;

const handleGameOver = () =>{
    alert('Game over...!\nPress ok to start again.');
    clearInterval(setIntervalId);
    location.reload();
}

const changeDirection = (e) =>{
    if(e.key === 'ArrowUp' && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === 'ArrowDown' && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === 'ArrowLeft' && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === 'ArrowRight' && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    mainGame();
}

controls.forEach((btn)=> btn.addEventListener('click', ()=> changeDirection({key: btn.dataset.key})));

const foodPositionChange = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const mainGame = () =>{
    if(gameOver){
        return handleGameOver();
    }
    let snakeFood = `<div class='snake-food' style='grid-area: ${foodY} / ${foodX}'></div>`;
    
    if(snakeX == foodX && snakeY === foodY){
        foodPositionChange();
        snakeBody.push([foodX, foodY]);
        score++;
        gameScore.innerHTML =  `Score: ${score}`;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem('high-score', highScore);
        gameHighScore.innerHTML = `High Score: ${highScore}`;
    }
    for(let i = snakeBody.length -1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX, snakeY];
    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX <=0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }
    let snakeHead = `<div class='snake-head' style='grid-area: ${snakeBody[0][1]} / ${snakeBody[0][0]}'>..</div>`;
    for(let i = 1; i< snakeBody.length; i++){
        snakeHead += `<div class='snake-body' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
        if(snakeBody[0][1]==snakeBody[i][1] && snakeBody[0][0]==snakeBody[i][0]){
            gameOver = true;
        }
    }
    gameboard.innerHTML = snakeFood;
    gameboard.innerHTML += snakeHead;
}


foodPositionChange();
setIntervalId = setInterval(mainGame, 150);
document.addEventListener('keydown',changeDirection);