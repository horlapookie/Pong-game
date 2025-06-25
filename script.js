const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const CANVAS_W = canvas.width;
const CANVAS_H = canvas.height;
const PADDLE_W = 15;
const PADDLE_H = 90;
const BALL_SIZE = 16;
const BALL_SPEED = 6;
const AI_SPEED = 4;

// Paddle positions
let leftPaddleY = CANVAS_H / 2 - PADDLE_H / 2;
let rightPaddleY = CANVAS_H / 2 - PADDLE_H / 2;

// Ball properties
let ballX = CANVAS_W / 2 - BALL_SIZE / 2;
let ballY = CANVAS_H / 2 - BALL_SIZE / 2;
let ballVelX = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
let ballVelY = BALL_SPEED * (Math.random() * 2 - 1);

// Mouse control
canvas.addEventListener('mousemove', function (evt) {
    const rect = canvas.getBoundingClientRect();
        let mouseY = evt.clientY - rect.top;
            leftPaddleY = mouseY - PADDLE_H / 2;
                // Clamp paddle within bounds
                    if (leftPaddleY < 0) leftPaddleY = 0;
                        if (leftPaddleY > CANVAS_H - PADDLE_H) leftPaddleY = CANVAS_H - PADDLE_H;
                        });

                        // Draw everything
                        function draw() {
                            // Background
                                ctx.fillStyle = '#282c34';
                                    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

                                        // Middle line
                                            ctx.strokeStyle = '#444';
                                                ctx.setLineDash([10, 15]);
                                                    ctx.beginPath();
                                                        ctx.moveTo(CANVAS_W / 2, 0);
                                                            ctx.lineTo(CANVAS_W / 2, CANVAS_H);
                                                                ctx.stroke();
                                                                    ctx.setLineDash([]);

                                                                        // Left paddle
                                                                            ctx.fillStyle = '#61dafb';
                                                                                ctx.fillRect(0, leftPaddleY, PADDLE_W, PADDLE_H);

                                                                                    // Right paddle
                                                                                        ctx.fillStyle = '#e06c75';
                                                                                            ctx.fillRect(CANVAS_W - PADDLE_W, rightPaddleY, PADDLE_W, PADDLE_H);

                                                                                                // Ball
                                                                                                    ctx.fillStyle = '#fff';
                                                                                                        ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);
                                                                                                        }

                                                                                                        // Collision detection
                                                                                                        function collide(paddleX, paddleY) {
                                                                                                            return (
                                                                                                                    ballX < paddleX + PADDLE_W &&
                                                                                                                            ballX + BALL_SIZE > paddleX &&
                                                                                                                                    ballY < paddleY + PADDLE_H &&
                                                                                                                                            ballY + BALL_SIZE > paddleY
                                                                                                                                                );
                                                                                                                                                }

                                                                                                                                                // Reset ball to center
                                                                                                                                                function resetBall() {
                                                                                                                                                    ballX = CANVAS_W / 2 - BALL_SIZE / 2;
                                                                                                                                                        ballY = CANVAS_H / 2 - BALL_SIZE / 2;
                                                                                                                                                            ballVelX = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
                                                                                                                                                                ballVelY = BALL_SPEED * (Math.random() * 2 - 1);
                                                                                                                                                                }

                                                                                                                                                                // Game logic update
                                                                                                                                                                function update() {
                                                                                                                                                                    // Ball movement
                                                                                                                                                                        ballX += ballVelX;
                                                                                                                                                                            ballY += ballVelY;

                                                                                                                                                                                // Top and bottom wall collision
                                                                                                                                                                                    if (ballY <= 0 || ballY + BALL_SIZE >= CANVAS_H) {
                                                                                                                                                                                            ballVelY = -ballVelY;
                                                                                                                                                                                                    ballY = ballY <= 0 ? 0 : CANVAS_H - BALL_SIZE;
                                                                                                                                                                                                        }

                                                                                                                                                                                                            // Paddle collisions
                                                                                                                                                                                                                if (collide(0, leftPaddleY)) {
                                                                                                                                                                                                                        ballVelX = Math.abs(ballVelX);
                                                                                                                                                                                                                                // Add some spin based on where the ball hit the paddle
                                                                                                                                                                                                                                        let collidePoint = (ballY + BALL_SIZE / 2) - (leftPaddleY + PADDLE_H / 2);
                                                                                                                                                                                                                                                collidePoint /= (PADDLE_H / 2);
                                                                                                                                                                                                                                                        ballVelY = BALL_SPEED * collidePoint;
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                if (collide(CANVAS_W - PADDLE_W, rightPaddleY)) {
                                                                                                                                                                                                                                                                        ballVelX = -Math.abs(ballVelX);
                                                                                                                                                                                                                                                                                let collidePoint = (ballY + BALL_SIZE / 2) - (rightPaddleY + PADDLE_H / 2);
                                                                                                                                                                                                                                                                                        collidePoint /= (PADDLE_H / 2);
                                                                                                                                                                                                                                                                                                ballVelY = BALL_SPEED * collidePoint;
                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                        // Left/right wall: reset ball
                                                                                                                                                                                                                                                                                                            if (ballX < 0 || ballX + BALL_SIZE > CANVAS_W) {
                                                                                                                                                                                                                                                                                                                    resetBall();
                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                            // AI paddle (right)
                                                                                                                                                                                                                                                                                                                                let targetY = ballY - (PADDLE_H / 2) + (BALL_SIZE / 2);
                                                                                                                                                                                                                                                                                                                                    if (rightPaddleY + PADDLE_H / 2 < targetY) {
                                                                                                                                                                                                                                                                                                                                            rightPaddleY += AI_SPEED;
                                                                                                                                                                                                                                                                                                                                                } else if (rightPaddleY + PADDLE_H / 2 > targetY) {
                                                                                                                                                                                                                                                                                                                                                        rightPaddleY -= AI_SPEED;
                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                // Clamp AI paddle
                                                                                                                                                                                                                                                                                                                                                                    if (rightPaddleY < 0) rightPaddleY = 0;
                                                                                                                                                                                                                                                                                                                                                                        if (rightPaddleY > CANVAS_H - PADDLE_H) rightPaddleY = CANVAS_H - PADDLE_H;
                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                        // Main game loop
                                                                                                                                                                                                                                                                                                                                                                        function gameLoop() {
                                                                                                                                                                                                                                                                                                                                                                            update();
                                                                                                                                                                                                                                                                                                                                                                                draw();
                                                                                                                                                                                                                                                                                                                                                                                    requestAnimationFrame(gameLoop);
                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                    // Start the game
                                                                                                                                                                                                                                                                                                                                                                                    gameLoop();