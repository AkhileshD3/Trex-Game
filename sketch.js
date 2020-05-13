var trex, trexRunning, ground, groundIMG, invisibleGround,gameState;
var PLAY,END,jump,cloudIMG,cloudsGroup,ob1,ob2,ob3,ob4,ob5,ob6
var obstaclesGroup,die,trexEND,count,gameOver,restart,gameOverIMG, restartIMG,check

function preload() {
trexRunning=loadAnimation('trex1.png','trex3.png','trex4.png');
groundIMG=loadImage('ground2.png');
jump=loadSound('jump.mp3');
cloudIMG=loadImage('cloud.png');
ob1=loadImage('obstacle1.png');
  
ob2=loadImage('obstacle2.png');
  
ob3=loadImage('obstacle3.png');
  
ob4=loadImage('obstacle4.png');
  
ob5=loadImage('obstacle5.png');
  
ob6=loadImage('obstacle6.png');

die = loadSound('die.mp3');
  
trexEND=loadAnimation('trex_collided.png');
  
gameOverIMG=loadImage('gameOver.png');
  
restartIMG=loadImage('restart.png');
  
check=loadSound('checkPoint.mp3');
}
function setup() {
  createCanvas(600,200);
  trex=createSprite(50,180,10,40)
  trex.addAnimation('t1',trexRunning);
  trex.scale=0.5
  trex.addAnimation('t2',trexEND)
  ground=createSprite(300,180,600,20);
  ground.addImage(groundIMG);
  ground.x=ground.width/2
  invisibleGround=createSprite(300,185,600,5);
  invisibleGround.visible=false;
  PLAY=1;
  END=0;
  gameState=PLAY
  cloudsGroup=createGroup();
  obstaclesGroup=createGroup();
  count=0;
  gameOver=createSprite(300,80,10,10);
  restart=createSprite(300,120,10,10);
  gameOver.addImage(gameOverIMG);
  gameOver.scale=0.6
  restart.addImage(restartIMG);
  restart.scale=0.6
  gameOver.visible=false;
  restart.visible=false;
}

function draw() {
  background(255);
  if(gameState===PLAY){
  count=count+Math.round(getFrameRate()/60);
  if(keyDown('space')&&trex.y>159){
  trex.velocityY=-13 
  jump.play();
  }
  trex.velocityY= trex.velocityY+1
  ground.velocityX=-5;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  
  if(obstaclesGroup.isTouching(trex)){
  gameState=END
  die.play();
  }
  if(count%100===0){
  check.play();
  }
  }else if(gameState===END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation('t2',trexEND);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    restart.visible=true;
    gameOver.visible=true;
  }
  if(mousePressedOver(restart)){
  reset();
  }
  
  trex.collide(invisibleGround);
  textSize(16);
   textFont('Georgia');
  text('Score: '+ count,500,80);
  drawSprites();
}
 function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,20,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudIMG);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
 }
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1);
      break;
      case 2: obstacle.addImage(ob2);
      break;
      case 3: obstacle.addImage(ob3);
      break;
      case 4: obstacle.addImage(ob4);
      break;
      case 5: obstacle.addImage(ob5);
      break;
      case 6: obstacle.addImage(ob6);
      break;
      default: 
      break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.45;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible= false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("t1",trexRunning);
  count=0;
}