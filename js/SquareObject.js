"use strict";
GitSnake.SquareObject = class SquareObject {
    constructor(pos) {
        this.position = pos;
        this.color = "red";
        this.size = this.constructor.size;
        this.velocity = new GitSnake.Point2D(0, 0);
        this.collidable = true;
        this.lastVelocity = this.velocity.copy();
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        var tp = this.position;
        ctx.strokeStyle = "white";
        ctx.fillRect(tp.x * this.size, tp.y * this.size, this.size, this.size);
        ctx.strokeRect(tp.x * this.size, tp.y * this.size, this.size, this.size);
    }

    animate() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.lastVelocity.x = this.velocity.x;
        this.lastVelocity.y = this.velocity.y;
    }

    turn(velX, velY) {
        this.velocity.x = velX;
        this.velocity.y = velY;
    }

    hasSamePositionAs(point) {
        return (this.collidable && this.position.equals(point));
    }

    resolveCollisionWithSnake(snake, game) {
        game.gameOver();
    }
}
GitSnake.SquareObject.size = 1;