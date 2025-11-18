let circleX = 376;
let circleW = 160;
let circleH = 120;

let mass = 50;        // massa batu (kg) - nanti bisa diubah dengan slider
let force = 0;        // gaya yang diberikan saat menekan tombol
let velocity = 0;
let acceleration = 0;
let friction = 0.98;  // sederhana agar perlahan berhenti

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

  // Karakter sederhana (kotak)
  fill(0, 120, 200);
  rect(255, height - 140, 40, 80);

  // Hitung fisika: a = F / m
  acceleration = force / mass;
  velocity += acceleration;
  circleX += velocity;
  velocity *= friction;

  // lingkaran sederhana
  fill(100);
  circle(circleX, height - 140, circleW, circleH);

  // Reset gaya setiap frame (kita anggap gaya diterapkan saat tombol ditekan)
  force = 0;

  // Info
  fill(0);
  text("STEP 2: Tekan → untuk memberi dorongan (force = 120). Massa = " + mass, 10, 20);
  text("a = " + nf(acceleration, 1, 3) + "  v = " + nf(velocity, 1, 3), 10, 40);
  }
  function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      force = 120; // gaya dorongan saat menekan
    }
  }
