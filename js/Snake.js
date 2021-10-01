"use strict";
GitSnake.Snake = class Snake extends GitSnake.SquareObject {
    constructor(pos) {
        super(pos); this.velocity.x = 1;
        this.tail = [new GitSnake.SquareObject(new GitSnake.Point2D(pos.x - 1, pos.y))];
        this.length = 1 + this.tail.length; this.color = "green";
    } grow(size) {
        this.length += size; var lastChunk = this.tail[this.tail.length - 1];
        for (var i = 1; i <= size; i++) {
            this.tail.push(new GitSnake.SquareObject(lastChunk.position.copy()));
        }
    } turn(velX, velY) {
        if (this.lastVelocity.x !== -(velX) || this.lastVelocity.y !== -(velY))
            super.turn(velX, velY);
    } draw(ctx) {
        this.tail.forEach(function (chunk) {
            chunk.draw(ctx);
        }); super.draw(ctx);
    } animate() {
        var lastChunk = this.tail.pop(); this.tail.unshift(lastChunk);
        lastChunk.position.setTo(this.position); super.animate();
    } resolveCollisionWithSnake(snake, game) {
        this.tail.forEach(function (chunk) {
            if (chunk.hasSamePositionAs(snake.position))
                game.gameOver();
        });
    } hasSamePositionAs(point) {
        return this.tail.some(function (chunk) {
            return chunk.hasSamePositionAs(point);
        });  // not snake head itself
    }
}