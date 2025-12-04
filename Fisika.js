let charX = 250;
let charY = 360;
let rectX = 300;
let rectW = 140;
let rectH = 140;

let mass = 0; 
let force = 0; 
let velocity = 0;
let acceleration = 0;
let friction = 0.9; // sederhana agar perlahan berhenti

let massSlider; // massa batu (kg) - nanti bisa diubah dengan slider
let forceSlider; // gaya yang diberikan saat menekan tombol
let maxForce;

let pushing = false;
let karakterImg;

function preload() {
  karakterImg = loadImage("Push.png");
}

function setup() {
  createCanvas(1500, 360);
  rectMode(CORNER);
  textSize(14);

  massSlider = createSlider(5, 1000, 500);    // atur massa 5..1000
  massSlider.position(25, 205);

  forceSlider = createSlider(0, 500, 80);   // atur kekuatan dorong 0..500
  forceSlider.position(25, 235);
}

function draw() {
  background(200, 230, 255);
  // Lantai
  fill(80, 50, 30);
  rect(0, height - 60, width, 60);

  mass = massSlider.value();
  maxForce = forceSlider.value();

  // Jika tombol kanan ditekan, beri gaya terus-menerus
  if (keyIsDown(RIGHT_ARROW)) {
    charX += 2;
    pushing = true;
    force = maxForce
  } else {
    pushing = false;
    force = 0;  // Reset gaya setiap frame (kita anggap gaya diterapkan saat tombol ditekan)
  }

  //Menentukan Sisi Kanan Karakter
  let charRight = charX + 60;
  //Menentukan Sisi Kiri Kotak
  let boxLeft = rectX;

  //Mengecek Apakah Sudah Bersentuhan
  let touching = charRight >= boxLeft;

  // Hitung fisika: a = F / m
  if (touching) {
    charX = rectX - 56;
    acceleration = force / mass;
    velocity += acceleration;
    rectX += velocity;
    velocity *= friction;

  } else {
    acceleration = 0;
  }

  // batas kanan
  // cek batas canvas
  if (rectX + rectW > width) {
    rectX = width - rectW;
    velocity = 0;
  }
  // Karakter sederhana
    if (pushing) {
    push();
    translate(charX, charY - 160);
    image(karakterImg, 0, 0, 60, 120);
    pop();
  } else {
    image(karakterImg, charX, charY - 160, 60, 120);
  }

  // box sederhana
  fill(100);
  rect(rectX, height - 200, rectW, rectH);

  // Info
  fill(0);
  text("m / Massa batu: " + mass + "kg", 10, 20);
  text("F/ Kekuatan dorong / Gaya / Force: " + maxForce + "N", 10, 50);
  text("a / Akselerasi / Percepatan =" + nf(acceleration,1,3) + "m/s²", 10, 80);
 
}