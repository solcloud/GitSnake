"use strict";
GitSnake.Game = class Game {
    constructor(canvas, tileSize, drawFPS = 60) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.animationSpeed = 100;
        this.drawingSpeed = Math.ceil(1000 / drawFPS);
        this.drawingId;
        this.tileX = Math.floor(this.width / tileSize);
        this.animationId;
        this.tileY = Math.floor(this.height / tileSize);
        GitSnake.SquareObject.size = tileSize;
        this.gameObjects = [];
        this.isPlaying = false;
        this.isGameOver = false;
        this.score = 0;

        this.snake = new GitSnake.Snake(new GitSnake.Point2D(0, 0));
        this.addEntity(this.snake);
        this.addEntity(new GitSnake.Food(this.getRandomFreeCell()));

        var pos = new GitSnake.Point2D(1, this.tileY - 1);
        this.scoreText = new GitSnake.Text(pos, "Skóre: " + this.score);
        this.scoreText.attr.font = "15px Arial";
        this.addEntity(this.scoreText);

        pos = new GitSnake.Point2D(this.tileX / 2, this.tileY / 2)
        this.pauseText = new GitSnake.Text(pos);
        this.pauseText.attr.textAlign = "center";
        this.pauseText.attr.overlay.opacity = 0.8;
    }

    setPauseText(text) {
        this.pauseText.text = text;
        this.pauseText.draw(this.ctx);
    }

    addEntity(entity) {
        this.gameObjects.push(entity);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.gameObjects.forEach(function (entity) {
            entity.draw(this.ctx);
        }, this);
    }

    animate() {
        this.gameObjects.forEach(function (entity) {
            if (entity.hasSamePositionAs(this.snake.position)) {
                entity.resolveCollisionWithSnake(this.snake, this);
            }
            entity.animate();
        }, this);
        this.checkGameOverConditons();
    }

    checkGameOverConditons() {
        if (this.snake.length >= this.tileX * this.tileY - 1)
            return this.gameOver("Vyhráli jste!");

        var spos = this.snake.position;
        if (spos.x < 0 || spos.x > this.tileX - 1 || spos.y < 0 || spos.y > this.tileY - 1)
            return this.gameOver();
    }

    gameOver(text) {
        this.pause();
        this.isGameOver = true;
        alert((text || "Prohráli jste!") + "\nVaše skóre: " + this.score);
        location.reload();
    }

    play() {
        if (this.isPlaying || this.isGameOver) {
            return;
        }

        this.isPlaying = true;
        var game = this;
        this.drawingId = setInterval(function () {
            game.draw();
        }, this.drawingSpeed);
        this.animationId = setInterval(function () {
            game.animate();
        }, this.animationSpeed);
    }

    pause() {
        this.isPlaying = false;
        clearInterval(this.drawingId);
        clearInterval(this.animationId);
    }

    getRandomFreeCell() {
        var cellPoint = new GitSnake.Point2D(
            Math.floor(Math.random() * this.tileX), Math.floor(Math.random() * this.tileY)
        );
        if (this.gameObjects.every(function (entity) {
            return entity.hasSamePositionAs(cellPoint) === false;
        })) {
            return cellPoint;
        }

        return this.getRandomFreeCell();
    }

    increaseScore(score) {
        this.score += score;
        this.scoreText.text = "Skóre: " + this.score;
        if (this.score % 5 === 0) {
            this.animationSpeed = Math.max(50, this.animationSpeed - 5);
            this.pause();
            this.play(); // refresh loops
        }
    }
}