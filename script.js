//modern js says use const instead of variable
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');



//by default set values of keys 
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}


//to make assurity whether want to play
let player = { speed: 5, score: 0 };


// when collision takes place  here a represent posotion of car and b represent enemy car
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    console.log("aRect");

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

// to movelines
function moveLines() {
    let line = document.querySelectorAll(".line");
    line.forEach(function (item) {

        if (item.y >= 700) {
            item.y -= 750;
        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    }
    )
}
function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "<i><b><u>GAME OVER</u> </i><b><br> <br><hr> YOR FINAL SCORE IS " + player.score + " <hr><br> <i>PRESS HERE TO <b>RESTART</b></i>"

}
// to moveEnemy
function moveEnemy(car) {
    let enemy = document.querySelectorAll(".enemy");
    enemy.forEach(function (item) {
        //check if collide
        if (isCollide(car, item)) {
            console.log("boom hit");
            endGame();
        }

        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";

        }
        item.y += player.speed;
        item.style.top = item.y + 'px';
    }
    )


}
function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();//to find size and cboundary of gameArea
    // console.log(road);
    if (player.start) {

        moveLines();
        moveEnemy(car);




        if (keys.ArrowUp && player.y > (road.top + 70)) { player.y -= player.speed; }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed; }
        if (keys.ArrowRight && player.x < (road.width - 50)) { player.x += player.speed; }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
        //to change car position
        car.style.top = player.y + "px";
        car.style.left = player.x + "px ";

        // //we can create a animation loop;
        // to perform recursion
        window.requestAnimationFrame(gamePlay);

        // to diplay score
        player.score++;
        let ps = player.score - 1;
        score.innerText = " SCORE: " + ps;

    }

}

function start() {

    // to hide startscreen and start game area
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = " ";

    //player want to play
    player.start = true;

    //to get score
    player.score = 0;
    //to perform animation on enter
    window.requestAnimationFrame(gamePlay);

    // to create lines
    for (var i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.y = (i * 150);

        line.style.top = (i * 150) + 'px';
        gameArea.appendChild(line);

        // // x+= 1player.speed0;
    }

    //create a car
    const car = document.createElement('div'); //create div name car
    car.setAttribute('class', 'car'); //give class to car
    car.style.backgroundColor = "white";
    // car.innerText="hey i am car";

    //add it inside gameArea
    gameArea.appendChild(car);

    //to find position of car
    player.y = car.offsetTop;
    player.x = car.offsetLeft;


    //to add enemy car
    for (var i = 0; i < 3; i++) {
        const enemyCar = document.createElement('div');
        enemyCar.classList.add('enemy');
        enemyCar.y = ((i + 1) * 350) * -1; //to eliminate diffrnce between 1-4 car
        enemyCar.style.backgroundColor = randomeColor();


        enemyCar.style.top = enemyCar.y + "px";

        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);

        // // x+= 1player.speed0;
    }
}




//to find which key is pressed
function keyPress(e) {
    //to prevent by default function of js parameter event is passed
    e.preventDefault();
    keys[e.key] = true; //e.key=pressed key 


}
//to find which key is released
function keyRelease(e) {
    e.preventDefault();
    keys[e.key] = false;

    //on releasing key make it value false


}


// invoke function when user press keys
document.addEventListener('keydown', keyPress);

// invoke function when user release keys
document.addEventListener('keyup', keyRelease);

// add event listener to start
startScreen.addEventListener('click', start)



function randomeColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}