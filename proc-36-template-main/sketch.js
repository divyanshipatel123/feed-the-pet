var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var time, timrAp;
// to update the time
var hourMIN;
//var min;
//var timeShow = 'AM';
//create feed and lastFed variable here
var feed ;
var lastFed ;

var response;
var responseJSON;
var datetime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
  getThetime();

  dog=createSprite(800,200,150,150);
  dog.addImage('doggy',sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed = createButton("Feed dog");
  feed.position(700,95);
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  
 // lastFed = hourMIN ;
 // getThetime();
  

}

function draw() {
  background(46,139,87);
  drawSprites();
  foodObj.display();

  feed.mousePressed(feedDog);
  

  addFood.mousePressed(addFoods);
  
  
 
  //write code to display text lastFed time here
 textSize(20)
 fill('black');
 text('Last fed :' + lastFed , 250  , 50);

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage('doggy',happyDog);

  //write code here to update food stock and last fed time
  var feeding = foodObj.getFoodStock();
  if(feeding <= 0){
    foodObj.updateFoodStock(feeding*0);
  }else{
    foodObj.updateFoodStock(feeding - 1);

    database.ref('FeedTime').update({
      FeedTime : lastFed
     
    })
    console.log('blasss' + lastFed)
    
  }
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage('doggy',sadDog);
}
async function getThetime(){

  // write code to fetch time from API
   response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  
   responseJSON = await response.json();
  
   datetime = responseJSON.datetime;
   lastFed = datetime.slice(11,16);
 
}
