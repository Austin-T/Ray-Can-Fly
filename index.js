class Bird {

    constructor() {
        // """Initializes an instance of the rock class.

        // :param size: a tuple or list containing two ints: the first digit represents the width of the rock
        // while the second digit is for the height.
        // :param location: a tuple or list containing two ints: the first digit represents the x-coordinate of the
        // rock while the second digit is for the y-coordinate.
        // :param velocity: an int representing the upward speed of the rock.
        // """

        this.velocity = 30;
        this.position = {
            x: 2000,
            y: Math.floor(Math.random() * 1000),
        }
        this.width = 70;
        this.height = 70; 
        this.image = document.querySelector(".birdImage");
        this.falling = false;
        this.squawk = new Audio('./sounds/squawk.mp3');
    }

    update(deltaTime) {
        // """Moves the rock by 'this.velocity' units in the upward direction."""

        this.position.x -= (this.velocity / deltaTime);

        if (this.falling == true) {
            this.velocity *= 0.98;
            this.position.y += 6;
        } else {
            this.position.y += (Math.floor(Math.random() * 20) - 10);
        }
        
    }

    draw(context) {
        // """Draws the rock onto the game window."""

        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    getXPos(){
        // This function returns the current x position of the paddle
        return this.position.x;
    }
    getYPos(){
        // This function returns the current x position of the paddle
        return this.position.y;
    }
    fall(){
        this.squawk.play();
        this.falling = true;
    }
}

class Rock {

    constructor(x, y) {
        // """Initializes an instance of the rock class.

        // :param size: a tuple or list containing two ints: the first digit represents the width of the rock
        // while the second digit is for the height.
        // :param location: a tuple or list containing two ints: the first digit represents the x-coordinate of the
        // rock while the second digit is for the y-coordinate.
        // :param velocity: an int representing the upward speed of the rock.
        // """

        this.velocity = 70;
        this.position = {
            x: x,
            y: y,
        }
        this.width = 15;
        this.height = 15; 
        this.image = document.querySelector(".rockImage");
    }

    update(deltaTime) {
        // """Moves the rock by 'this.velocity' units in the upward direction."""

        this.position.x += (this.velocity / deltaTime);
    }

    draw(context) {
        // """Draws the rock onto the game window."""

        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    getXPos(){
        // This function returns the current x position of the paddle
        return this.position.x;
    }
    getYPos(){
        // This function returns the current x position of the paddle
        return this.position.y;
    }
}

class Cloud {

    constructor() {
        // """Initializes an instance of the rock class.

        // :param size: a tuple or list containing two ints: the first digit represents the width of the rock
        // while the second digit is for the height.
        // :param location: a tuple or list containing two ints: the first digit represents the x-coordinate of the
        // rock while the second digit is for the y-coordinate.
        // :param velocity: an int representing the upward speed of the rock.
        // """

        this.velocity = 10;
        this.position = {
            x: 1500,
            y: Math.floor(Math.random() * 1000),
        }
        this.width = Math.floor(Math.random() * 200) + 60;
        this.height = Math.floor(Math.random() * 200) + 60; 
        this.image = document.querySelector(".cloudImage");
    }

    update(deltaTime) {
        // """Moves the rock by 'this.velocity' units in the upward direction."""

        this.position.x -= (this.velocity / deltaTime);
    }

    draw(context) {
        // """Draws the rock onto the game window."""

        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

    }
    getWidth(){
        return this.width;
    }
    getHeight(){
        return this.height;
    }
    getXPos(){
        // This function returns the current x position of the paddle
        return this.position.x;
    }
    getYPos(){
        // This function returns the current x position of the paddle
        return this.position.y;
    }
}

class Plane {
    constructor(x, y) {

        this.width = 150;
        this.height = 200;

        this.imageReady = document.querySelector(".planeImageReady");
        this.imageThrow = document.querySelector(".planeImageThrow");

        this.image = this.imageReady;

        this.throw = 100;

        this.explosionImages = document.querySelectorAll(".explosionImage");

        this.position = {
            x: x,
            y: y,
        }

        this.planeDirection = 0;
    }
    draw(context, isGameOver){
        if (isGameOver) {
            context.drawImage(this.explosionImages[0], this.position.x, this.position.y, this.width, this.height);
        } else {
            context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }

    update(deltaTime){
        if (this.throw < 50){
            console.log("throwing");
            this.image = this.imageThrow;
            this.throw += 1;
        } else {
            this.image = this.imageReady;
        }
        if (this.position.y - (this.planeDirection / deltaTime) > 0 && this.position.y - (this.planeDirection / deltaTime) < 800) {
           this.position.y -= (this.planeDirection / deltaTime); 
        }
        this.planeDirection *= 0.98;
    }
    getWidth(){
        return 100;
    }
    getHeight(){
        return 100;
    }
    getXPos(){
        // This function returns the current x position of the paddle
        return this.position.x;
    }
    getYPos(){
        // This function returns the current x position of the paddle
        return this.position.y + (this.height / 3);
    }
    setPos(xPos, yPos) {
        // This function allows a user to reset the position of the paddle
        this.position.x = xPos;
        this.position.y = yPos;
    }
    contains(coordinate){
        // This function returns tue id the given x coordinate falls within the
        // paddle. Otherwise, false is returned
        if (this.position.x < coordinate && this.position.x + this.width > coordinate) {
            return true;
        }
        return false;
    }
    setDirection(direction){
        this.planeDirection = direction;
    }
    throwRock(){
        this.throw = 0;
    }
}

// Functions

function playGame(timestamp) {
    // This function is responisble for plaing the looper and allowing new recording

    updateObjects(timestamp - lastUpdate);
    lastUpdate = timestamp;
    clearCanvas();
    drawObjects(isGameOver);

    if (isGameOver) {
        gameOverMessage.style.display = "inline";
        return;
    }
    requestAnimationFrame(playGame);
    
}

function updateObjects(deltaTime) {
    // This function updates all objcts inside the looper (i.e. paddle, notes, etc)
    if (!deltaTime) return;

    // ============================================= Update game objects ================

    // update the score
    score.innerText = clock;
    clock += 1;

    // update the plane
    plane.update(deltaTime);

    // update the rocks
    rockList.forEach(rock => {
        rock.update(deltaTime);
    });

    // update the birds
    birdList.forEach(bird => {
        bird.update(deltaTime);
    });

    // update the clouds
    cloudList.forEach(cloud => {
        cloud.update(deltaTime);
    });

    // ============================================= Check for collisons ================

    // check for collision between rock and bird
    rockList.forEach(rock => {
        birdList.forEach(bird => {
            if (checkCollide(rock, bird)) bird.fall();
        });
        // birdList = birdList.filter(bird => !checkCollide(rock, bird));
    });

    // check for collision between cloud and plane
    cloudList.forEach(cloud => {
        if (checkCollide(cloud, plane)) {
            console.log("cloud->plane");
            console.log(cloudEffect.style.animation);
            if (cloudEffect.style.animation == "0s ease 0s 1 normal none running none") {
                cloudEffect.style.animation = "cloudEffect 4s ease infinite alternate";
                cloudCover = clock;
            }
        }
    });
    if (clock - cloudCover > 1000) {
        cloudEffect.style.animation = "none";
    }

    // check for collision between bird and plane
    birdList.forEach(bird => {
        if (checkCollide(bird, plane)) {
            isGameOver = true;
            let thump = new Audio('./sounds/thump.mp3');
            thump.play();
            cloudEffect.style.animation = "none";
        }
    });

    // ============================================= Spawn new game objects =============
    
    // spawn new birds. Delete any excess
    if (Math.floor(Math.random() * 200) == 0) {
        birdList.push(new Bird());
        if (birdList.length > 30) birdList.shift();
    }

    // spawn new clouds. Delete any excess
    if (Math.floor(Math.random() * 200) == 0) {
        cloudList.push(new Cloud());
        if (cloudList.length > 30) cloudList.shift();
    }

    // delete any excess rocks
    if (rockList.length > 30) rockList.shift();
}

function clearCanvas() {
    // This function clears the canvas and resets any objects which need to be reset
    context.clearRect(0, 0, width, height);
}

function drawObjects(isGameOver) {
    // This function draws all objects to the canvas

    // draw the sky
    context.fillStyle = "rgb(176, 223, 250)";
    context.fillRect(0, 0, width, height);

    // draw the plane
    plane.draw(context, isGameOver);

    // draw the rocks
    rockList.forEach(rock => {
        rock.draw(context);
    });

    // draw the birds
    birdList.forEach(bird => {
        bird.draw(context);
    });

    // draw the clouds
    cloudList.forEach(cloud => {
        cloud.draw(context);
    });
}

function checkCollide(rect1, rect2) {
    // returns true if there is some overlap between the two rectangels. returns false otherwise
    
    // check if x is overlapping
    if (
        ((rect1.getXPos() > rect2.getXPos() && rect1.getXPos() < rect2.getXPos() + rect2.getWidth()) ||
        (rect1.getXPos() + rect1.getWidth() > rect2.getXPos() && rect1.getXPos() + rect1.getWidth() < rect2.getXPos() + rect2.getWidth())) &&
        ((rect1.getYPos() > rect2.getYPos() && rect1.getYPos() < rect2.getYPos() + rect2.getHeight()) ||
        (rect1.getYPos() + rect1.getHeight() > rect2.getYPos() && rect1.getYPos() + rect1.getHeight() < rect2.getYPos() + rect2.getHeight()))
    ){
        return true;
    } else {
        return false;
    }

    // check if y is overlapping
}
function throwRock() {
    if (clock - lastThrow > 100) {
        let new_rock = new Rock(
            plane.getXPos() + 130,
            plane.getYPos()
        );
        rockList.push(new_rock);
        lastThrow = clock;

        plane.throwRock();
    }

}

// Global variables

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");

const score = document.getElementById("scoreInt");

// let play = false;
const width = 1500;//canvas.width;
const height = 1000;//canvas.height;
// canvas.style.width = "1500px";
// canvas.style.height = "1000px";
canvas.width = 1500;
canvas.height = 1000;
console.log("widthHeight");
console.log(width);
console.log(height);


let plane = new Plane(200, 400);
let cloudList = [];
let birdList = [];
let rockList = [];
let clock = 0;
let lastThrow = 0;
let cloudCover = 0;
let isGameOver = false;

const gameOverMessage = document.querySelector(".gameOver");
const cloudEffect = document.querySelector(".cloudEffect");

// Event Listeners

let lastUpdate = 0;
window.addEventListener('keydown', function(event) {
    console.log(event.key);
    switch (event.key) {
        case "ArrowLeft":
            // Left pressed
            plane.setDirection(0);
            break;
        case "ArrowRight":
            // Right pressed
            plane.setDirection(0);
            break;
        case "ArrowUp":
            // Up pressed
            plane.setDirection(30);
            break;
        case "ArrowDown":
            // Down pressed
            plane.setDirection(-30);
            break;
        case " ":
            // space pressed
            throwRock();
            break;
        case "Enter":
            // enter key pressed. hide loading screen
            if (isGameOver) {
                location.reload();
                break;
            }

            // delete the preload screen
            const preload = document.getElementById("preload");
            preload.classList.add("preload-finish");

            // add background sounds
            let whiteNoise = new Audio('./sounds/whiteNoise.mp3');
            whiteNoise.volume = 0.5;
            whiteNoise.play();

            // play the game
            playGame(0);

            break;
    }
});


