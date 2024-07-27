const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const car = {
    x: canvas.width / 2,
    y: canvas.height - 150,
    width: 50,
    height: 100,
    speed: 5,
    angle: 0,
    color: 'blue'
};

const parkingSpot = {
    x: canvas.width / 2 - 25,
    y: 50,
    width: 60,
    height: 120,
    color: 'green'
};

const obstacles = [
    { x: canvas.width / 2 - 100, y: 200, width: 200, height: 20, color: 'red' },
    { x: canvas.width / 2 - 150, y: 400, width: 100, height: 20, color: 'red' },
];

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCar(car) {
    context.save();
    context.translate(car.x + car.width / 2, car.y + car.height / 2);
    context.rotate(car.angle * Math.PI / 180);
    context.translate(-car.x - car.width / 2, -car.y - car.height / 2);
    drawRect(car.x, car.y, car.width, car.height, car.color);
    context.restore();
}

function drawParkingSpot(parkingSpot) {
    drawRect(parkingSpot.x, parkingSpot.y, parkingSpot.width, parkingSpot.height, parkingSpot.color);
}

function drawObstacles(obstacles) {
    obstacles.forEach(obstacle => {
        drawRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, obstacle.color);
    });
}

function checkCollision(rect1, rect2) {
    return !(rect1.x > rect2.x + rect2.width ||
             rect1.x + rect1.width < rect2.x ||
             rect1.y > rect2.y + rect2.height ||
             rect1.y + rect1.height < rect2.y);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawParkingSpot(parkingSpot);
    drawObstacles(obstacles);
    drawCar(car);
    
    if (checkCollision(car, parkingSpot)) {
        alert('Parked Successfully!');
        resetGame();
    }
    
    for (let obstacle of obstacles) {
        if (checkCollision(car, obstacle)) {
            alert('Crashed!');
            resetGame();
        }
    }
}

function resetGame() {
    car.x = canvas.width / 2;
    car.y = canvas.height - 150;
    car.angle = 0;
}

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowUp':
            car.x += car.speed * Math.sin(car.angle * Math.PI / 180);
            car.y -= car.speed * Math.cos(car.angle * Math.PI / 180);
            break;
        case 'ArrowDown':
            car.x -= car.speed * Math.sin(car.angle * Math.PI / 180);
            car.y += car.speed * Math.cos(car.angle * Math.PI / 180);
            break;
        case 'ArrowLeft':
            car.angle -= 5;
            break;
        case 'ArrowRight':
            car.angle += 5;
            break;
    }
}

window.addEventListener('keydown', handleKeydown);

gameLoop();
