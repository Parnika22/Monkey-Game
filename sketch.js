
var monkey , monkey_running;

var banana ,bananaImage,bananaGroup;
    
var obstacle, obstacleImage,obstacleGroup;

var ground;

var score = 0 ;

var survivalTime = 0;

var play = 1;
var end = 0;
var gameState = 1;

//let brush;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  brush = loadFont('Angeline Vintage_Demo.otf')
 
}



function setup() {
  createCanvas(500,500);
 
  
  
  monkey = createSprite(100,365,10,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale =0.1
  
  ground = createSprite(250,400,1000,10);
  ground.shapeColor = "PaleGreen"
  ground.x = ground.width /2;


  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  

}


function draw() {
  background("LightGoldenRodYellow");
  
  
  stroke("white");
  textSize(20);
  textFont("didot")
  fill("CornflowerBlue");
  text("Score:  " + score,300,50);
  
  stroke("white");
  textSize(20);
  textFont("didot");
  fill("CornflowerBlue");
  text("Survival Time:  "  + survivalTime, 50, 50)

  
  if(gameState === play){
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60)

  //if(frameCount % 10 === 0 ){
   //survivalTime = survivalTime + 1; 
  //}
  
  //survivalTime = Math.ceil(frameCount/frameRate())
  
  food();
  obstacles();

  ground.velocityX = -(4 + survivalTime/100);
   
  monkey.collide(ground)
  
  if(ground.x < 0){
   ground.x = ground.width/2;
  }
  
  
  if(keyDown("space") && monkey.y >= 360){
   monkey.velocityY = -20
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(monkey.isTouching(bananaGroup)){
   score = score + 2; 
   bananaGroup.destroyEach();
  }
    
  if(monkey.isTouching(obstacleGroup)){
   gameState = end; 
  }
    
    
  // console.log(monkey.y)
  
  }
   
  else if(gameState === end){
    background("CornflowerBlue");
    
    
    ground.visible = false;
    monkey.visible = false;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
    
    fill("LightGoldenRodYellow")
    textSize(90)
    textFont(brush)
    text("Game Over", 75,250)
    
    

    
  
  }
  drawSprites();
  
  



}


function food(){
  if(frameCount % 80 === 0 ){
    banana = createSprite(500,300,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -(6 + survivalTime/100);
    banana.lifetime = 550;
    bananaGroup.add(banana);
  }  
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(500,370,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 550;
    obstacle.velocityX = -(6 + survivalTime/100);
    obstacleGroup.add(obstacle)
  }
  
  
}

