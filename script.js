const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const momo = {
  x: 100,
  y: 100,
  width: 48,
  height: 48,
  speed: 2,
  sprite: new Image()
};
const bg = new Image();

bg.src = 'background.png';

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(momo.sprite, momo.x, momo.y, momo.width, momo.height);
}


momo.sprite.src = 'momo-placeholder.png';

const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function update() {
  if (keys['ArrowUp'] || keys['w']) momo.y -= momo.speed;
  if (keys['ArrowDown'] || keys['s']) momo.y += momo.speed;
  if (keys['ArrowLeft'] || keys['a']) momo.x -= momo.speed;
  if (keys['ArrowRight'] || keys['d']) momo.x += momo.speed;
}


function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
