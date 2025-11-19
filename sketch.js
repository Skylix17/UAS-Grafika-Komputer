let charX = 256;
let rectX = 300;
let rectW = 140;
let rectH = 140;

let mass = 0 ; 
let force = 0; 
let velocity = 0;
let acceleration = 0;
let friction = 0;  

let massSlider; // massa batu (kg) - nanti bisa diubah dengan slider
let forceSlider; // gaya yang diberikan saat menekan tombol
let frictionSlider; // sederhana agar perlahan berhenti
let maxForce;

let pushing = false;

function setup() {
  createCanvas(1500, 360);
  rectMode(CORNER);
  textSize(14);

  massSlider = createSlider(5, 1000, 500);    // atur massa 5..200
  massSlider.position(25, 205);

  forceSlider = createSlider(0, 300, 80);   // atur kekuatan dorong 0..300
  forceSlider.position(25, 235);

  frictionSlider = createSlider(0.90, 0.999, 0,90, 0.001);
  frictionSlider.position(300, 235);
}

function draw() {
  background(200, 230, 255);
  // Lantai
  fill(80, 50, 30);
  rect(0, height - 60, width, 60);

  mass = massSlider.value();
  maxForce = forceSlider.value();
  friction = frictionSlider.value();

  // Hitung fisika: a = F / m
  acceleration = force / mass;
  velocity += acceleration;
  rectX += velocity;
  velocity *= friction;

    // Jika tombol kanan ditekan, beri gaya terus-menerus
  if (keyIsDown(RIGHT_ARROW)) {
    force = maxForce
    pushing = true;
  } else {
    force = 0;   // Reset gaya setiap frame (kita anggap gaya diterapkan saat tombol ditekan)
    pushing = false;
  }

  // Karakter sederhana (kotak)
    if (pushing) {
    // pose mendorong: condong ke depan
    push();
    translate(charX, height - 140);
    rotate(-0.05);
    fill(128,0,128);
    rect(0, 0, 40, 80);
    pop();
  } else {
    fill(0, 120, 200);
    rect(charX, height - 140, 40, 80);
  }

  // box sederhana
  fill(100);
  rect(rectX, height - 200, rectW, rectH);

  // batas kanan
  // cek batas canvas
  if (rectX + rectW > width) {
    rectX = width - rectW;
    velocity = 0;
}

  // Info
  fill(0);
  text("m / Massa batu: " + mass + "kg", 10, 20);
  text("F/ Kekuatan dorong/Gaya/Force: " + maxForce + "N", 10, 50);
  text("Friction/ Medan Gesekan: " + nf(friction,1,3), 300, 50);
  text("a / Akselerasi / Percepatan =" + nf(acceleration,1,3) + "m/s²", 10, 80);
  text("v / Kecepatan gerak benda =" + nf(velocity,1,3)+ "m/s" , 10, 95);
}
