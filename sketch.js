let points = [];
let fallPalette;

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  background(0);
  stroke(255);
  colorMode(RGB);

  fallPalette = [
    color(231, 117, 100),
    color(251, 119, 60),
    color(235, 54, 120), 
    color(79, 23, 135),  
    color(24, 1, 97), 
  ];

  for (let i = 0; i < 500; i++) {
    let x = randomGaussian(0.5, 0.13) * width;
    let y = randomGaussian(0.5, 0.13) * height;
    points.push({ x, y, c: int(random(10, 50)), scl: 0.005, rnd: int(random(4)) });
  }
}

function draw() {
  background(0, 15); 
  strokeWeight(1);
  
  for (let pt of points) {
    backInTheDay(pt);
  }
}

function backInTheDay(pt) {
  let { x, y, c, scl, rnd } = pt;
  let col = random(fallPalette); 
  stroke(col);
  noFill();

  beginShape();
  if (rnd === 0) {
    for (let i = 0; i < c; i++) {
      let n = noise(x * scl, y * scl, frameCount * 0.0005);
      let angle = int(n * 10) * (TAU / 4);
      vertex(x, y);
      x += cos(angle) * 8;
      y += sin(angle) * 8;
    }
  } else if (rnd === 1) {
    for (let i = 0; i < c; i++) {
      let n = noise(x * scl, y * scl, frameCount * 0.0005);
      let angle = 10 * n;
      vertex(x, y);
      x += cos(angle) * 8;
      y += sin(angle) * 8;
    }
  } else if (rnd === 2) {
    for (let i = 0; i < c; i++) {
      let n = noise(x * scl, y * scl, frameCount * 0.0005);
      let angle = int(n * 15) * (TAU / 4);
      strokeWeight(random(0.5, 2));
      circle(x, y, random(5));
      x += cos(angle) * 8;
      y += sin(angle) * 8;
    }
  } else if (rnd === 3) {
    for (let i = 0; i < c; i++) {
      let n = noise(x * scl, y * scl, frameCount * 0.0005);
      let angle = 15 * n;
      strokeWeight(random(0.5, 2));
      circle(x, y, random(5));
      x += cos(angle) * 8;
      y += sin(angle) * 8;
    }
  }
  endShape();
}