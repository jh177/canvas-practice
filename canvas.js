const canvas = document.querySelector('canvas');
// 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

// ctx.fillStyle = "rgba(0,255,0,0.5)";
// ctx.fillRect(100,100,100,100);
// ctx.fillStyle = "rgba(0,0,255,0.5)";
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = "rgba(255,0,0,0.5)";
// ctx.fillRect(300,300,100,100);

// console.log(canvas);


// //line
// ctx.beginPath();
// ctx.moveTo(50,300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = "blue";
// ctx.stroke();


// //arc // circle
// ctx.beginPath();
// ctx.arc(300,300,30,0, Math.PI*2, false);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// for (let i = 0; i < 1000; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   const color = ["blue", "green", "red"]
//   let randomColor = color[Math.floor(Math.random() * color.length)]
//   ctx.beginPath();
//   ctx.arc(x, y, 30, 0, Math.PI * 2, false);
//   ctx.strokeStyle = randomColor;
//   ctx.stroke();
// }



// Add interaction
let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
// let minRadius = 2;

let colorArray = ['#038C8C', '#F2B138', '#F2C6A0', '#F28157', '#F25A38']

window.addEventListener('mousemove', 
  function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
  }
);

// when browser resize
window.addEventListener('resize', 
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
  }
);


//

//moving circles
function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // ctx.strokeStyle = "blue";
    // ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  this.update = function(){
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 
      && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }

}




// create 100 circles

let circleArray = [];

function init(){
  circleArray = []; //make sure not keep adding
  for (let i = 0; i < 500; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = 1 * (Math.random() - 0.5);
    let dy = 1 * (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}


// create one circle
// let circle = new Circle(200, 200, 3, 3, 30);

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  
  // circle.update();
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();