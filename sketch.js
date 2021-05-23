const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;

function preload() {
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(1366, 634);
	rectMode(CENTER);

	createEdgeSprites();

	packageSprite=createSprite(200, 100, 40,40);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(200, 100, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6;
	helicopterSprite.setVelocity(0,0);

	groundSprite=createSprite(width/2, height-20, width,40);
	groundSprite.shapeColor=color("white");

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(200 , 100, 40 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	
	ground = Bodies.rectangle(width/2, height-20, width, 40 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2;
 	boxY=544;

 	boxleftSprite=createSprite(boxPosition-150, boxY-15, 20,130);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition-150, boxY-15, 20,130 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition, boxY+40, 300,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition, boxY+60, 300,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+150 , boxY-15, 20,130);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+150 , boxY-15, 20,130 , {isStatic:true} );
 	World.add(world, boxRightBody);

	Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  background(0);
 
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  //helicopterSprite.bounce("edges");

  helicopterSprite.setVelocity(0,0);

  if (packageSprite.y>boxY && packageSprite.x>boxPosition-150 && packageSprite.x<boxPosition+150) {
	  textSize(30);
	  text("YOU WON!  REFRESH PAGE TO PLAY AGAIN",width/2-300,height/2);
	  //text("PRESS SPACE TO PLAY AGAIN",width/2-250,heigth/2+30);
  }
  
  createEdgeSprites();
  drawSprites(); 
}

function keyPressed() {
	if (keyCode===RIGHT_ARROW) {
		helicopterSprite.setVelocity(20,0);
		packageSprite.setVelocity(20,0);
		Matter.Body.translate(packageBody,{x:20,y:0});
	}

	if (keyCode===LEFT_ARROW) {
		helicopterSprite.setVelocity(-20,0);
		packageSprite.setVelocity(-20,0);
		Matter.Body.translate(packageBody,{x:-20,y:0});
	}

	if (keyCode===DOWN_ARROW) {
		Matter.Body.setStatic(packageBody,false);
	}

	if (keyCode===32) {
		helicopterSprite.setPosition(200,100);
		packageSprite.setPosition(200,100);
		//Matter.Body.setPosition(packageBody,{x:200,y:100});
	}
}