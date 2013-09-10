goog.provide("hvdoo.tetris.Sprite");

hvdoo.tetris.Sprite = function(img, width, height, srcX, srcY, srcWidth, srcHeight) {
    var el = new Image();
    el.src = img;

    var size = {
        width: width,
        height: height
    };

    var meta = {
        x: srcX || 0,
        y: srcY || 0,
        width: srcWidth || width,
        height: srcHeight || height
    };

    this.render = function(canvas, x, y) {
        canvas.drawImage(el, meta.x, meta.y, meta.width, meta.height, x, y, size.width, size.height);
    };
};
