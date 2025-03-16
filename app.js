let gameSeq = [];
let userSeq = [];
let currScore = 0;
let highScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.querySelector(".high-score").innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is started");
        started = true;

        levelUp();
    }
});
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    currScore = level;
    checkHighscore();
    h2.innerText = `level ${level}`;

    //random btn choose
    let randmIdx = Math.floor(Math.random() * 3);
    let randmColor = btns[randmIdx];
    let randmbtn = document.querySelector(`.${randmColor}`);
    // console.log(randmIdx);
    // console.log(randmColor);
    // console.log(randmbtn);
    gameSeq.push(randmColor);
    console.log(gameSeq)
    gameFlash(randmbtn);
}

function checkAns(idx){
    // console.log("curr level :",level);

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.<br>Your Highest score was ${highScore}`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
        checkHighscore();
        
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor= btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function checkHighscore(){
    if(currScore > highScore){
        highScore = currScore;
        document.querySelector(".high-score").innerText = `High Score: ${highScore}`;
    }
}

