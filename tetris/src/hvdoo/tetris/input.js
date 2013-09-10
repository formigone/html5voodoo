goog.provide("hvdoo.tetris.input");

hvdoo.tetris.input.Keyboard = function() {
    var keys = {};

    this.set = function(key, state) {
        keys[key] = !!state;
    };
    
    this.isPressed = function(key) {
        return !!keys[key];
    };
};

hvdoo.tetris.input.Keyboard.prototype.KEY_MAPPING = {
    "LEFT_KEY": 37,
    "UP_KEY": 38,
    "RIGHT_KEY": 39,
    "DOWN_KEY": 40
};