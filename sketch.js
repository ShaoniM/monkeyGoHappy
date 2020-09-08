var monkey, banana, monkeyA, bananaI, count;
var jungle, stone, jungleImage, stoneImage, bananaImage;
var stonesGroup, bananaGroup, gameState;
var inviground, PLAY, END;

function preload() {
  monkeyA = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  jungle = createSprite(200, 200, 400, 400);
  monkey = createSprite(100, 320);


  jungle.addImage("jungle", jungleImage);
  jungle.x = jungle.width / 2;
  monkey.addAnimation("running", monkeyA);
  monkey.scale = 0.2;
  monkey.velocityX = 0;
  jungle.velocityX = -7;

  inviground = createSprite(200, 380, 400, 1);
  inviground.visible = false;

  count = 0
  PLAY = 1;
  END = 2;
  gameState = PLAY;

  bananaGroup = new Group();
  stonesGroup = new Group();
}

function draw() {

  background(220);
  if (gameState === PLAY) {
    count = count + Math.round(getFrameRate() / 60);
    if (jungle.x < 0) {
      jungle.x = jungle.width / 2;
    }
    if (keyDown("space") && monkey.y >= 320) {
      monkey.velocityY = -21;
    }

    spawnObstacles();
    spawnBananas();
    if (monkey.isTouching(stonesGroup)) {
      gameState = END;
    }
    jungle.velocityX = -7;
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      count = count + 20;
    }
  } 
  else if (gameState === END) {
    stonesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    monkey.velocityX = 0;
    reset();
           }

    monkey.collide(inviground);
    monkey.velocityY = monkey.velocityY + 0.8;

    drawSprites();
    stroke("blue");
    textSize(15);
    text("Score: " + count, 300, 50);
 
  if(gameState===END){
    stroke("red");
    textSize(30);
    text("Game Over",100,200);
    textSize(20);
    text("Press R to restart",100,100);
  }
}

  function spawnObstacles() {
    if (frameCount % 100 === 0) {
      var stone = createSprite(400, 335, 10, 40);
      stone.velocityX = -4;
      stone.addImage(stoneImage);
      stone.scale = 0.2;
      stonesGroup.add(stone);
      stone.lifetime = -1;
    }
  }

  function spawnBananas() {
    if (frameCount % 80 === 0) {
      var banana = createSprite(400, 165, 40, 10);

      banana.addImage(bananaImage);
      banana.scale = 0.05;
      banana.velocityX = -3;
      banana.lifetime = -1;


      bananaGroup.add(banana);
    }
  }

  function reset() {
    if (keyDown("r")) {
      count = 0;
      gameState = PLAY;
      stonesGroup.destroyEach();
      bananaGroup.destroyEach();
    }
  }