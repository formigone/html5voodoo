goog.provide("hvdoo.tetris.Step");

hvdoo.tetris.Step = function(fps) {
    var FPS = parseInt(fps || 60);
    var last = 0;
    var delta = 0;
    var delay = 1000 / FPS;

    this.update = function(now) {
        delta = now - last;
    };

    this.step = function(now) {
        last = now;
    };

    this.isReady = function() {
        return (delta >= delay);
    };
};