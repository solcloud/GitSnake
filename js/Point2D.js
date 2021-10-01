"use strict";
GitSnake.Point2D = class Point2D {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    copy() {
        return new GitSnake.Point2D(this.x, this.y);
    } setTo(point) {
        this.x = point.x; this.y = point.y;
    } equals(point) {
        return (this.x === point.x && this.y === point.y);
    }
}