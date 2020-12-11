var PLAY=1;
var END=0;

var gameState=PLAY;

var trex,trex_running,trex_collided;

var ground, groundImage, invisibleGround;

var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesGroup;

var cloud, cloudImage, cloudsGroup;

var score;

var restart, restartImage, game_over, game_overImage;

function preload(){
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png"); 
  
 groundImage=loadImage("ground2.png") ;

obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");  
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png"); 

cloudImage=loadImage("cloud.png"); 

trex_collided=loadAnimation("trex_collided.png");

restartImage=loadImage("restart.png")  
game_overImage=loadImage("gameOver.png")  
  
obstaclesGroup=new Group();
cloudsGroup=new Group();
}


function setup() {
  createCanvas(600, 200);

trex=createSprite(40,170,20,20);
trex.addAnimation("running",trex_running);
trex.scale=0.5;

ground=createSprite(300,180,600,5)
ground.addImage("ground",groundImage);

invisibleGround=createSprite(300,190,600,5);
invisibleGround.visible=false;  

restart=createSprite(300,140);  
restart.addImage(restartImage);  
restart.scale=0.6;
  
game_over=createSprite(300,100);
game_over.addImage(game_overImage);  
game_over.scale=0.5  
  
score=0; 
}

function draw() {
  background(190);

text("score="+score,480,50)  
  
if(gameState===PLAY){
 
game_over.visible=false;
restart.visible=false;
  
score=score+Math.round(frameCount/60);  
  
ground.velocityX=-(7+3*score/100); 
  
if(ground.x<0){
 ground.x=ground.width/2; 
}  

if(keyDown("space")){
  trex.velocityY=-10;
}  
  
trex.velocityY=trex.velocityY+0.8;   
  
spawnObstacles();  
spawnClouds(); 
  
if(obstaclesGroup.isTouching(trex)){
gameState=END;  
}  
  
}
else if(gameState===END){

restart.visible=true;
game_over.visible=true;
  
ground.velocityX=0;  
  
trex.changeAnimation(trex_collided);    
trex.velocityY=0;
  
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)){
reset();
}

}  
  
trex.collide(invisibleGround);  
  
drawSprites();
}

function reset(){
gameState=PLAY;
  
reset.visible=false;
game_over.visible=false;
  
obstaclesGroup.destroyEach();  
cloudsGroup.destroyEach();  
  
score=0;
}

function spawnObstacles(){
if(World.frameCount%60===0){
obstacle=createSprite(600,180,10,40);  
obstacle.velocityX=-(3+score/100);
 
var rand=Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break; 
  default: break;
}  

obstacle.scale=0.5;  
  
obstacle.lifetime=300;
  
obstaclesGroup.add(obstacle);  
}
}

function spawnClouds(){
if(World.frameCount%60===0){
cloud=createSprite(600,40,40,10);  
cloud.y=Math.round(random(40,120));  

cloud.addImage(cloudImage);  
cloud.velocityX=-3;           

cloud.scale=0.5;
cloud.lifetime=300;

cloud.depth=trex.depth-1;
  
cloudsGroup.add(cloud);  
}  
}

