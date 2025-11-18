let circleX = 376;
let circleW = 160;
let circleH = 120;

let mass = 1000;        // massa batu (kg) - nanti bisa diubah dengan slider
let force = 0;        // gaya yang diberikan saat menekan tombol
let velocity = 0;
let acceleration = 0;
let friction = 0.98;  // sederhana agar perlahan berhenti

let pushing = false;

function setup() {
  createCanvas(800, 360);
  rectMode(CORNER);
  textSize(14);
}

function draw() {
  background(200, 230, 255);
  // Lantai
  fill(80, 50, 30);
  rect(0, height - 60, width, 60);

  // Hitung fisika: a = F / m
  acceleration = force / mass;
  velocity += acceleration;
  circleX += velocity;
  velocity *= friction;

    // Jika tombol kanan ditekan, beri gaya terus-menerus
  if (keyIsDown(RIGHT_ARROW)) {
    force = 80; // gaya kontinyu
    pushing = true;
  } else {
    force = 0;   // Reset gaya setiap frame (kita anggap gaya diterapkan saat tombol ditekan)
    pushing = false;
  }

  // Karakter sederhana (kotak)
    if (pushing) {
    // pose mendorong: condong ke depan
    push();
    translate(255, height - 140);
    rotate(-0.05);
    fill(128,0,128);
    rect(0, 0, 40, 80);
    pop();
  } else {
    fill(0, 120, 200);
    rect(255, height - 140, 40, 80);
  }

  // lingkaran sederhana
  fill(100);
  circle(circleX, height - 140, circleW, circleH);

  // Info
  fill(0);
  text("Tekan → untuk memberi dorongan (Force / GAYA = 80 N). Massa KG= " + mass, 10, 20);
  text("Akselerasi / Percepatan m/s²= " + nf(acceleration, 1, 3) + " Kecepatan gerak benda m/s = " + nf(velocity, 1, 3), 10, 40);
  }

