goog.provide("hvdoo.tetris.Canvas");

hvdoo.tetris.Canvas = function(width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");

    this.render = function(panel) {
        panel.appendChild(canvas);
    };

    this.getWidth = function() {
        return canvas.width;
    };

    this.getHeight = function() {
        return canvas.height;
    };

    this.clear = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.draw = function(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    };

    this.drawImage = function(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height) {
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height);
    };

    this.getRenderer = function() {
        return ctx;
    };
};