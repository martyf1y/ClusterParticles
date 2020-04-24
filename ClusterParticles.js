let amountParticles = 300;
let allParticles = [amountParticles];
let colourinRadians;
let goToMouse = false;
let easing = 0.05;
let particleSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  colourinRadians = TWO_PI/255;
  for (let i = 0; i < amountParticles; i++) {
    allParticles[i] = new particle(i, amountParticles, particleSize);
  }
}

function draw() {
  background(100);
  for (let i = 0; i < amountParticles; i++) {
    allParticles[i].update(goToMouse);
    allParticles[i].draw();
  }
  
}

class particle {
  constructor(_pNum, _amountParticles, _particleSize) {
    this.amountParticles = _amountParticles;
    this.pNum = _pNum*(TWO_PI/this.amountParticles);//Particle Number
    this.particleSize = _particleSize;
    this.radius = random(20, 75);
  
    //this.angle=PI/this.amountParticles;
    this.x = random(0, 1200);
    this.y = random(0, 600);
    this.origX = this.x;
    this.origY = this.y;
  }
  
  update(_goToMouse){
    
    if(_goToMouse){ // track down the mouse position
      this.goToMouse = _goToMouse;
      this.radius = 50;
      
      this.easing(mouseX, mouseY);
      this.radius = random(25, 75);
       }
    else if(this.goToMouse){ // go back to where you started
      
      
      this.easing(this.origX, this.origY);
      
      this.dotDist = abs(this.dx + this.dy);
      this.mouseToDotDist = abs(this.x + this.particleSize*0.5 + (this.radius * this.sinCalc) - mouseX) + abs(this.y + this.particleSize*0.5 + (this.radius * this.cosCalc) - mouseY);
    //  print("X" + abs(this.x - mouseX));
    //  print("Y" +  abs(this.y - mouseY));
    //  print(this.mouseToDotDist);
      // When the blob is back home and the mouse has given it life again
      if(this.dotDist <=2 && this.mouseToDotDist <= 10){this.goToMouse = false;}
    }
    else{
        this.pNum += 0.01;
    this.sinCalc = sin(this.pNum);
    this.cosCalc = cos(this.pNum);
    }
  }
  draw() {
    
    colorMode(HSB, 100);
    noStroke();
    if(this.goToMouse){
      fill(255, 100, 0);
  }
    else{
      fill(abs(this.sinCalc*100), 100, 100);
    }
    rect(this.x + (this.radius * this.sinCalc), this.y + (this.radius * this.cosCalc), this.particleSize, this.particleSize);
    //rect(this.x - (this.radius * -this.sinCalc), this.y - (this.radius * this.cosCalc), this.particleSize, this.particleSize);
  }
  
  easing(_targetX, _targetY){
      this.targetX = _targetX ;
      this.dx = this.targetX - this.x;
      this.x += this.dx * easing;
      
      this.targetY = _targetY;
      this.dy = this.targetY - this.y;
      this.y += this.dy * easing;
  }
}

function mouseReleased() {
  if (goToMouse) {
    goToMouse = false;
  }
  else{
    goToMouse = true;
  }
}
