"use strict";
GitSnake.Text = class Text extends GitSnake.SquareObject {
    constructor(pos, text) {
        super(pos);
        this.text = text;
        this.color = "gray";
        this.collidable = false;
        this.attr = {
            overlay: {color: "white", opacity: 0},
            font: "18px Arial", textAlign: "left"
        };
    }

    draw(ctx) {
        if (this.text === undefined)
            return;

        ctx.fillStyle = this.attr.overlay.color;
        ctx.globalAlpha = this.attr.overlay.opacity;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 1;
        ctx.textAlign = this.attr.textAlign;
        ctx.fillStyle = this.color;
        ctx.font = this.attr.font;
        ctx.fillText(this.text, this.position.x * this.size, this.position.y * this.size);
    }
}