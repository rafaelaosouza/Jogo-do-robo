
const gridEl = document.getElementById('grid');
const robotValueEl = document.getElementById('robotValue');
const stepCountEl = document.getElementById('stepCount');

let robot = {
  x: 0,
  y: 0,
  value: 0,
  steps: 0
};

const gridData = [
  ['R', '', '', '', { type: 'triangle' }],
  ['', { type: 'circle' },'2c', '', ''],
  ['', '', { type: 'star' }, '3d', ''],
  [{ type: 'lightning' }, '', '4c', '', ''],
  ['', '', '', '5d' , 'END']
];

function renderGrid() {
  gridEl.innerHTML = '';
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';

      const item = gridData[y][x];
      if (item && typeof item === 'object') {
        if (item.type === 'star') {
          cell.classList.add('mod-star');
          cell.classList.add('door-top-and-bottom')
          
        }
        if (item.type === 'circle') cell.classList.add('mod-circle');
        if (item.type === 'triangle') {
          cell.classList.add('mod-triangle'); 
          cell.classList.add('door-left');
        };
        if (item.type === 'lightning') {
          cell.classList.add('mod-lightning');
          cell.classList.add('door-top-and-bottom');
          cell.classList.add('door-left');
        }
      }else if (item == '5d'){
        cell.classList.add('door-top-and-bottom');
      } else if (item == '3d'){
        cell.classList.add('door-top-and-bottom');
        cell.classList.add('door-right');
      } else if (item == '2c'){
        cell.classList.add('door-right');
      }
      else if (item == '4c'){
        cell.classList.add('door-left');
      }else if (item === 'END') {
        cell.classList.add('door-top-and-bottom');
        cell.classList.add('door-right');
        cell.classList.add('end');
        cell.textContent = '🏆';
      } 

      if (robot.x === x && robot.y === y) {
        cell.classList.add('robot');
        cell.textContent = '🤖';
      }
      
      gridEl.appendChild(cell);
    }
  }
  robotValueEl.textContent = robot.value;
  stepCountEl.textContent = robot.steps;
}

function move(direction) {
  const dx = direction === 'right' ? 1 : direction === 'left' ? -1 : 0;
  const dy = direction === 'down' ? 1 : direction === 'up' ? -1 : 0;

  const newX = robot.x + dx;
  const newY = robot.y + dy;

  if (newX < 0 || newY < 0 || newX >= 5 || newY >= 5) return;

  const target = gridData[newY][newX];

  if (target && typeof target === 'object') {
    if (target.type === 'wall') return;
    if (target.type === 'door' && target.value !== robot.value) return;
  }

  robot.x = newX;
  robot.y = newY;
  robot.steps++;

  if (target && typeof target === 'object') {
    if (target.type === 'star') robot.value += 3;
    if (target.type === 'circle') robot.value += 1;
    if (target.type === 'triangle') robot.value -= 1;
    if (target.type === 'lightning') robot.value *= 2;
  }

  renderGrid();
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      move('up')
      break;
    case 'ArrowDown':
      move('down');
      break;
    case 'ArrowLeft':
      move('left');
      break;
    case 'ArrowRight':
      move('right');
      break;
  }
});

renderGrid();
