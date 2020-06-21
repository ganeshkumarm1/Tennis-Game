var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 4;
var player1Score = 0;
var player2Score = 0;
var rounds = 1;
const WINNING_SCORE = 1;
var run;
var gameOver = false;

var paddle1Y = 250, paddle2Y = 250;
const PADDLE_HEIGHT = 100, PADDLE_WIDTH = 10;

var canvas = document.getElementById('canvas');
var canvasContext = canvas.getContext('2d');

window.onload = function() {	
	var framesPerSecond = 30;
	run = setInterval(function() { 
		move();
		draw();
	}, 500 / framesPerSecond);

	canvas.addEventListener('mousemove', function(e) {
		var mousePos = calculateMousePos(e);
		paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
	});

	canvas.addEventListener('mousedown', function(e) {
		alert(gameOver);
		if(gameOver) {
			player1Score = 0;
			player2Score = 0;
			gameOver = !gameOver;
		}
	});
}


function move() {
		if(gameOver)
		{
			return;
		}

		computerMove();

		ballX += ballSpeedX;
		ballY += ballSpeedY;

		if(ballX > canvas.width)
		{
			if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT)
			{
				ballSpeedX = -ballSpeedX;	
			}
			else
			{
					player1Score += 1;
					resetBall();
			}
		}
		if(ballX < 0)
		{
			if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT)
			{
				ballSpeedX = -ballSpeedX;
			}
			else
			{
					player2Score += 1;
					resetBall();
			}
		}
		if(ballY > canvas.height)
		{
			ballSpeedY = -ballSpeedY;
		}
		if(ballY < 0)
		{
			ballSpeedY = -ballSpeedY;
		}
}

function draw() {
	drawRect(0, 0, canvas.width, canvas.height, '#212121');
	if(gameOver)
	{
		canvasContext.fillStyle = '#ffffff';
		drawText("Game Over", (canvas.width / 2) - 20, 300);		
		drawText("Click to start a new game", (canvas.width / 2) - 50, 330);
		//clearInterval(run);
		return;	
	}
	drawRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#ffffff')
	drawRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, '#ffffff');
	drawCircle(ballX, ballY, 10, 0, 2 * Math.PI, true, '#fafafa');
	drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height, '#ffffff');
	drawText("User: " + player1Score, canvas.width / 4, 50);
	drawText("AI: " + player2Score , (canvas.width / 2) + (canvas.width / 4), 50); 
	drawText("Round: " + rounds, (canvas.width / 2) - 20, 50);
}

function drawLine(x1, y1, x2, y2, color) {
	canvasContext.strokeStyle = color
	canvasContext.setLineDash([10, 15]);
	canvasContext.beginPath();
	canvasContext.moveTo(x1, y1);
	canvasContext.lineTo(x2, y2);
	canvasContext.stroke();
}

function drawText(text, x, y) {
	canvasContext.fillText(text, x, y);
}


function drawRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, start, end, clockwise, color) {
	canvas.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, start, end, clockwise);
	canvasContext.fill();
}


function calculateMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = e.clientX - rect.left - root.scrollLeft;
	var mouseY = e.clientY - rect.top - root.scrollTop;
	return {x: mouseX, y: mouseY};
}

function resetBall() {
	if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE)
	{
		player1Score = 0;
		player2Score = 0;
		gameOver = !gameOver;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

function computerMove() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if(paddle2YCenter < ballY - 35) 
	{
		paddle2Y = paddle2Y + 6;
	} 
	else if(paddle2YCenter > ballY + 35) 
	{
		paddle2Y = paddle2Y - 6;
	}
}


function resetGame() {
	player1Score = 0;
	player2Score = 0;
	rounds = 0;
	resetBall();
}

function displayWin() {
	//player1Score > player2Score?drawText("User wins!", (canvas.width / 2) - 20, 300):drawText("AI wins!", (canvas.width / 2) - 20, 300);	
	gameOver = !gameOver;
	draw();
	//drawText("AI wins!", 500, 300);	
}