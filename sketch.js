//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, monster, fruit, fruitsGroup, monstersGroup;
var knifeImage, monsterAnimation;
var fruit1Image, fruit2Image, fruit3Image, fruit4Image;
var knifeSwooshSound, gameOverImage, gameOverSound;


function preload() {

  knifeImage = loadImage("knife.png");
  monsterAnimation = loadAnimation("alien1.png", "alien2.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3")

}



function setup() {
  createCanvas(600, 600);

  //creating sword
  knife = createSprite(40, 200, 20, 20);
  knife.addImage(knifeImage);
  knife.scale = 0.7


  //set collider for sword
  knife.setCollider("rectangle", 0, 0, 40, 40);

  score = 0;
  //create fruit and monster Group variable here
  fruitsGroup = createGroup();
  monstersGroup = createGroup();
}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {

    //calling fruit and monster function
    fruits();
    monsters();

    // Move knife with mouse
    knife.y = World.mouseY;
    knife.x = World.mouseX;

    // Increase score if knife touching fruit
    if (knife.isTouching(fruitsGroup)) {
      fruitsGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2;
    }

    // Go to end state if knife touching enemy
    if (knife.isTouching(monstersGroup)) {
      gameState = END;
    }


  }
  if (gameState === END) {
    fruitsGroup.destroyEach();
    monstersGroup.destroyEach();
    monstersGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
    score = 0;
    knife.addImage(gameOverImage);
    knife.x = 300;
    knife.y = 300;
    knife.scale = 1.5;
    gameOverSound.play();
  }


  drawSprites();

  //Display score
  textSize(25);
  text("Score : " + score, 250, 50);
}

function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 400, 20, 20);
    fruit.velocityX = -7;
    fruit.scale = 0.2;

    r = Math.round(random(1, 4));

    if (r === 1) {
      fruit.addImage(fruit1Image);
    } else if (r === 2) {
      fruit.addImage(fruit2Image);
    } else if (r === 3) {
      fruit.addImage(fruit3Image);
    } else if (r === 4) {
      fruit.addImage(fruit3Image);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -(7 + Math.round((score / 4)));
    fruit.setLifetime = 100;

    fruitsGroup.add(fruit);

    position = Math.round(random(1, 2));
    if (position === 1) {
      fruit.x = 600
    }

  }

}

function monsters() {
  if (frameCount % 160 === 0) {
    monster = createSprite(400, Math.round(random(50, 340)), 20, 20);
    monster.velocityX = -(8 + Math.round((score / 10)));
    monster.addAnimation("animation", monsterAnimation);
    monstersGroup.add(monster);
  }

}