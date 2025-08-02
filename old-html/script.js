const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const TILE_SIZE = 32;

// Load tile images
const tileImages = {
  0: new Image(), // grass
  1: new Image(), // tree
  2: new Image(), // water
  3: new Image()  // stone
};

tileImages[0].src = 'tiles/grass.png';
tileImages[1].src = 'tiles/tree.png';
tileImages[2].src = 'tiles/water.png';
tileImages[3].src = 'tiles/stone.png';

// Define tilemap
const collisionMap = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,0,0,0,0,3,0,3,0,0,0,1,1,1,0,1],
  [1,0,1,0,1,0,2,2,0,3,0,3,0,2,2,1,0,1,0,1],
  [1,0,1,0,1,0,2,2,0,3,0,3,0,2,2,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,0,3,0,3,0,0,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,0,0,3,3,3,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Momo setup
const momo = {
  x: 100,
  y: 100,
  width: 48,
  height: 48,
  speed: 2,
  sprite: new Image()
};
momo.sprite.src = 'momo-placeholder.png';

// Input tracking
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Draw tilemap
function drawMap() {
  for (let row = 0; row < collisionMap.length; row++) {
    for (let col = 0; col < collisionMap[row].length; col++) {
      const tileId = collisionMap[row][col];
      const img = tileImages[tileId];
      if (img.complete) {
        ctx.drawImage(img, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  ctx.drawImage(momo.sprite, momo.x, momo.y, momo.width, momo.height);
}

// Update game state
function update() {
  if (keys['ArrowUp'] || keys['w']) momo.y -= momo.speed;
  if (keys['ArrowDown'] || keys['s']) momo.y += momo.speed;
  if (keys['ArrowLeft'] || keys['a']) momo.x -= momo.speed;
  if (keys['ArrowRight'] || keys['d']) momo.x += momo.speed;
}

// Main game loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

// Ensure ALL images (tiles + Momo) are loaded
let loaded = 0;
const totalToLoad = Object.keys(tileImages).length + 1;

function checkLoaded() {
  loaded++;
  if (loaded === totalToLoad) {
    loop();
  }
}

// Hook up all tile loads
for (let key in tileImages) {
  tileImages[key].onload = checkLoaded;
}
momo.sprite.onload = checkLoaded;
