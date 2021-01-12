var dog, happyDog, food, foodStock;
var dogImg, happyDogImg;
var database;

function preload() {
dogImg = loadImage("../images/dogImg.png");
happyDogImg = loadImage("../images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  
  dog = createSprite(250,300);
  dog.addImage("dog",dogImg);
  dog.scale = 0.15;
  
}


function draw() {  
  background(46,139,87);
  if(food > 0) {
    if(keyWentDown(UP_ARROW)) {
      food -= 1;
      writeStock(food);
      dog.addImage("dog",happyDogImg);
    }
  }

  drawSprites();
  //add styles here

  fill(255);
  stroke(0);
  text("Note: Press 'Up Arrow' Key To Feed The Dog",125,50);
  fill(255);
  stroke(0);
  text("Food Remaining: "+food,200,120);
  
}

function readStock(data) {
  food = data.val();
}

function writeStock(x) {


  database.ref('/').update({
    Food: x
  })
}



