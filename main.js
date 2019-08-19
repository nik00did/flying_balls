let canvas;
let ctx;
let itemBall;
let timeMoving;

const addBallInArray = ball => {
    if (!ball || typeof ball !== 'object') {
        return;
    }

    balls.push(ball);
};

const drawBall = ball => {
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.lineWidth = ball.borderWidth;
    ctx.strokeStyle = ball.borderColor;
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

const onClick = event => {
    itemBall = new Ball(event.layerX, event.layerY, (Math.random() * 150 + 50) / 2, (Math.random() * 40 + 10) * 0.1, Math.round(Math.random() * (2 * Math.PI)));

    if (itemBall.x < itemBall.radius || itemBall.y < itemBall.radius || itemBall.x > canvas.width - itemBall.radius || itemBall.y > canvas.height - itemBall.radius) {
        return;
    }

    if (balls.length > 1) {
        let distanceBetweenPoints;// чтоб шарик на шарике не появлялся

        for (let i = 0; i < balls.length; i++) {
            if (!balls[i]) {
                continue;
            }

            distanceBetweenPoints = Math.sqrt(Math.pow(itemBall.x - balls[i].x,2) + Math.pow( itemBall.y - balls[i].y,2));

            if (distanceBetweenPoints < itemBall.radius + balls[i].radius) {
                return;
            }
        }
    }

    addBallInArray(itemBall);

    drawBall(balls[balls.length - 1]);
};

let moveOneBall = ball => {
    if (ball.x + ball.radius < canvas.width && ball.x - ball.radius > 0) {
        ball.x += Math.cos(ball.startAngel) * ball.speed;
    } else {
        ball.startAngel = Math.PI - ball.startAngel;
        ball.x += Math.cos(ball.startAngel) * ball.speed;
    }

    if (ball.y + ball.radius < canvas.height && ball.y - ball.radius > 0) {
        ball.y += Math.sin(ball.startAngel) * ball.speed;
    } else {
        ball.startAngel = -ball.startAngel;
        ball.y += Math.sin(ball.startAngel) * ball.speed;
    }
};

const moving = balls => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        if (!balls[i]) {
            continue;
        }

        if (balls[i].radius >= 250) {
            clearInterval(timeMoving);
            console.log('STOP!');
        }

        for (let j = 0; j < balls.length; j++) {
            if (j === i) {
                continue;
            }

            clashTwoBalls(balls[i], balls[j]);
        }

        moveOneBall(balls[i]);

        drawBall(balls[i]);
    }
};

const clashTwoBalls = (ball1, ball2) => {
    if (ball1.x + ball1.radius === ball2.x - ball2.radius) {
        ball1.startAngel = -ball1.startAngel;
        ball2.startAngel = -ball2.startAngel;
    }

    if (ball1.x - ball1.radius === ball2.x + ball2.radius) {
        ball1.startAngel = -ball1.startAngel;
        ball2.startAngel = -ball2.startAngel;
    }

    if (ball1.x + ball1.radius < ball2.x - ball2.radius && ball1.y + ball1.radius > ball2.y - ball2.radius) {

    }

    if (ball1.y - ball1.radius === ball2.y + ball2.radius) {
        ball1.startAngel = -ball1.startAngel;
        ball2.startAngel = -ball2.startAngel;
    }

    if (ball1.y + ball1.radius === ball2.y - ball2.radius) {
        ball1.startAngel = -ball1.startAngel;
        ball2.startAngel = -ball2.startAngel;
    }
};

const init = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.onclick = onClick;
    timeMoving = setInterval(moving, 10, balls);
};

init();