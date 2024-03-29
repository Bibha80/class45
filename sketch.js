//initiate Game STATEs
var PLAY = 1;

 

var gameState =PLAY;



var trex, trex_running, trexDead;

var ground, invisibleGround, groundImage;

var obstacle,cloud;

var score=0;

function preload(){
  trex_running = loadAnimation("Walk (2).png","Walk (3).png");
 
 trexDead=loadImage("die.png");
  
  backgroundImage = loadImage("background.jpg");
 // cloudsImage=loadImage("cloud.png");
  Obstacle1=loadImage("obstacle.png");
 
 
}
 

function setup() {
  createCanvas(600,200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.1;
  var obstacle= createSprite(600,160,15,10);

   
  obstacle.velocityX = -6;
  obstacle.addImage(Obstacle1);
  obstacle.scale=0.09;
  
  
  
  ground = createSprite(10,200,1600,20);
  
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  

  
}

function draw() {
  background(backgroundImage);
  
  text("SCORE:" + score,500,50);
 
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
  score =score+Math.round(frameRate/20);
  
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 159){
      
      trex.velocityY = -12 ;
     
    }
    if(frameCount % 40 === 0) {
   
      // generate random obstacles
  
      var obstacle= createSprite(600,160,15,10);
  
   
  obstacle.velocityX = -6;
  obstacle.addImage(Obstacle1);
  obstacle.scale=0.09;
  
      obstacle.lifetime = 100;
  
      
    
     
       
       
       //assign scale and lifetime to the obstacle           
   
     }
    
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
   spawnClouds();
  
    //spawn obstacles
   // spawnObstacles();
    
    //End the game when trex is touching the obstacle
   
   
  }
  if(trex.isTouching(obstacle)){
    gameState = "end";
    obstacle.destroy();
    trex.changeImage(trexDead);
   
  }
  
  
  else if(gameState === "end") {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle.velocityX=0;
    cloud.velocityX=0;
   
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstacle.lifetime(-1);
    cloud.lifetime(-1);
    gameOver.visible=true;
    restart.visible=true;
   
  }
  
  if(keyDown("space") && trex.y >= 159){
    trex.velocityY = -12 ;
   
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
 
  trex.collide(invisibleGround);
  
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    
     cloud.y = Math.round (random(80,120));
   // cloud.addImage(cloudsImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
   

  }
  
}
function spawnObstacles() {

    

}
