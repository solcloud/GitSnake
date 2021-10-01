"use strict";
GitSnake.Food = class Food extends GitSnake.SquareObject {
    constructor(pos) {
        super(pos);
        this.score = 1;
        this.color = "gray";
    }

    resolveCollisionWithSnake(snake, game) {
        this.position.setTo(game.getRandomFreeCell());
        snake.grow(this.score);
        game.increaseScore(this.score);
    }
}