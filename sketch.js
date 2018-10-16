var colori;
var mood;
var r;
var nOnde, ondaValore;
var palline = [];


function setup() {
    createCanvas(windowWidth, windowHeight);
    cursor(HAND);

    mood = 0;

    r = height/3;

    nOnde = 1;

    ondaValore = 0.002;

    colori = [
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 0, 255)
    ];
}

function draw() {

    blendMode(BLEND);
    if(mood == 0) {
        background(0);
        blendMode(SCREEN);

    } else {
        background(255);
        blendMode(EXCLUSION);
    }

    noFill();
    strokeWeight(20);


    // creare l'onda spastica
    translate(width/2, height/2);
    scale(0.75, 0.75);
    for(var i = 0; i < 3; i++){

    stroke(colori[i]);

    beginShape();
    for(var w = -10; w < width + 20; w +=5){
          var r2 = 100 * pow(sin(w * 0.1 + i * TWO_PI / 3), 50) * pow(abs(cos(w * PI * ondaValore * nOnde + frameCount * 0.02)), 50);

          var cX = sin(w * TWO_PI / (width+40)) * ((r + r2) + (mouseX/10));
          var cY = cos(w * TWO_PI / (width+40)) * ((r + r2) + (mouseY/10));
          curveVertex(cX, cY);
        }
    endShape(CLOSE);
    }

    //creare palline spastiche
    translate(-2.3*width/3, -2*height/3);
    scale(1.5, 1.5);

    // crea palline ogni frame
    for (var i = 0; i < random(2); i++) {
      palline.push(new pallinaSingola(random(-40), random(-20, 0)));
    }

    let t = (mouseX+mouseY)/2000 + frameCount / 180;

    // loop palline
    for (let flake of palline) {
      flake.update(t); // update posizione palline
      flake.display(); // ciò che disegna
    }
}

function mousePressed() {
    if(mood == 0) {
        mood = 1;
    } else {
        mood = 0;
    }
}

// oggetto pallina singola
function pallinaSingola(_x, _y) {

  this.x = _x;
  this.y = _y;
  this.angoloiniziale = random(0, 4 * PI);
  this.size = random(1, 10);

  this.raggio = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {

    var velocita = 1; // velocità tangenziale
    var angolo = velocita * time + this.angoloiniziale;
    this.x = width / 2 + this.raggio * sin(angolo);
    this.y += pow(this.size, 0.8);

    // cancella le palline se escono fuori
    if (this.y > height) {
      let index = palline.indexOf(this);
      palline.splice(index, 1);
    }
  };

  this.display = function() {
    noStroke();
    fill(colori);
    ellipse(this.x, this.y, this.size);
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
