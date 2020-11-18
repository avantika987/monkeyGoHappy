var banana, bananaImage,bananaGroup;
var monkey, monkeyImage;
var obstacle,obstacleImage,obstacleGroup;
var score = 0;
var bg,bgImage;
var ground;

function preload() {
  bananaImage = loadImage("banana.png");
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bgImage = loadImage("jungle.jpg");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(0,0,400,400);
  bg.addAnimation("bg",bgImage);
 // bg.scale = 0.55;
  bg.x = bg.width/2;
  bg.velocityX = -2;
  
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.15;
  
  ground = createSprite(200,380,400,5);
  ground.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background(220);
 
  bg.depth = score.depth;
  score.depth = score.depth + 1;
  
  if(bg.x <0){
    bg.x = bg.width/2;
  }
 // console.log(bg.width);
  
  if(keyDown("space")){
    monkey.velocityY=-4;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);     
     
     
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score+ 2;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.scale = 0.15;
    score = 0;
     }
  
  bananas();
  obstacles();
  switch(score){
    case 10 :monkey.scale = 0.18;
      break;
      case 20 : monkey.scale = 0.21;
      break;
      case 30 :monkey.scale = 0.24;
      break;
      case 40 : monkey.scale = 0.27;
      break;
      case 50 :monkey.scale = 0.3;
      break;
      case 60 : monkey.scale = 0.33;
      break;
  }
  
  drawSprites();
   fill("black ");
  text("score = "+score,300,50);
}

function bananas(){
  if(frameCount%80===0){
  banana = createSprite(400,Math.round(random(150,300)),20,20);
  banana.scale = 0.05;
  banana.addImage("banana",bananaImage);
  banana.velocityX = -5;
  banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%100 ===0){
    obstacle = createSprite(400,350,20,20);
    obstacle.scale = 0.15;
    obstacle.addImage("stone",obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
    }
}
function reset(){
  obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.destroyEach();
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.velocityX = 0;
    bg.velocityX = 0;
}




