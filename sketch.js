let points = [];
let fallPalette;
let targetWidth = 800;
let targetHeight = 800;
let canvas;

function setup() {
  canvas = createCanvas(targetWidth, targetHeight);
  canvas.elt.style.display = 'block';
  canvas.elt.style.maxWidth = '100%';
  canvas.elt.style.height = 'auto';
  customResizeCanvas(windowWidth, windowHeight);
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
  generatePoints();
}

function draw() {
  background(0, 15);
  strokeWeight(1);
  for (let pt of points) {
    sweety(pt);
  }
}

function sweety(pt) {
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

function windowResized() {
  customResizeCanvas(windowWidth, windowHeight);
}

function customResizeCanvas(w, h) {
  let aspectRatio = targetWidth / targetHeight;
  let newWidth, newHeight;
  
  if (w / h > aspectRatio) {
    newHeight = h;
    newWidth = h * aspectRatio;
  } else {
    newWidth = w;
    newHeight = w / aspectRatio;
  }
 
  newWidth = min(newWidth, targetWidth);
  newHeight = min(newHeight, targetHeight);
  
  let offsetX = 0;
  let offsetY = 0;
  
  resizeCanvas(newWidth, newHeight);
  if (canvas && canvas.elt) {
    canvas.elt.style.position = 'absolute';
    canvas.elt.style.left = `${offsetX}px`;
    canvas.elt.style.top = `${offsetY}px`;
    canvas.elt.style.width = `${newWidth}px`;
    canvas.elt.style.height = `${newHeight}px`;
  }
  
  generatePoints();
}

function generatePoints() {
  points = [];
  for (let i = 0; i < 200; i++) { 
    let x = randomGaussian(0.5, 0.13) * width;
    let y = randomGaussian(0.5, 0.13) * height;
    points.push({ x, y, c: int(random(10, 30)), scl: 0.005, rnd: int(random(4)) }); 
  }
}
