// Canvas Setup
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let mouseX = 0;
let mouseY = 0;
let moveMouse = false;
let frameCount = 0;

// Player Array
let player = {
x: cnv.width / 2,
y: cnv.height / 2,
r: 20,
s: 4
}

// Circle Food Array
let circles = [];
for (let n = 1; n <= 65; n++) {
    circles.push(randomCirc());
}

function randomCirc() {
return {
  x: randomInteger(0, cnv.width),
  y: randomInteger(0, cnv.height),
  r: randomInteger(2, 8),
  c: randomColor()
 }
}

// Draw Function
window.addEventListener("load", draw);

function draw() {
 frameCount++;
 ctx.clearRect(0, 0, cnv.width, cnv.height);
   
 // Draw Player
 ctx.strokeStyle = "blue";
 ctx.beginPath();
 ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
 ctx.stroke();

 // Draw Food (Circles)
 for (let i = 0; i < circles.length; i++) {
 drawCircle(circles[i]);
    
 // Check for Circle Collision
 let circle = circles[i];
 let d = Math.sqrt((player.x - circle.x) **2 + (player.y - circle.y) **2);
 if (d < player.r + circle.r) {
  player.r += (circle.r / 8);
  circles.splice(i, 1);
 }   
}

// Add food (Circles
if (frameCount % 200 === 0) {
 circles.push(randomCirc());
}
    
// Boundary Check
player.x = constrain(player.x, player.r, cnv.width - player.r)
player.y = constrain(player.y, player.r, cnv.height - player.r)

    
requestAnimationFrame(draw);
}

function drawCircle(circle) {
ctx.fillStyle = circle.c;
ctx.beginPath();
ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
ctx.fill();
}


// Event Listeners
document.addEventListener("mousemove", mouseMovehandler);

function mouseMovehandler(event) {
mouseMove = true;
let cnvRect = cnv.getBoundingClientRect();

mouseX = Math.round(event.clientX - cnvRect.left);
mouseY = Math.round(event.clientY - cnvRect.top);
   
let rise = mouseY - player.x;
let run = mouseX - player.x
let d = Math.sqrt(run ** 2 + rise **2);
    
if (d > 0) {
let dx = (run / d) * player.s;
let dy = (rise / d) * player.s;

player.x += dx;
player.y += dy;
}
}

draw();

