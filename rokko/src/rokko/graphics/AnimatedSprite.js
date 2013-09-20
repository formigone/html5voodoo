goog.provide("rokko.graphics.AnimatedSprite");

goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.Sprite");

/**
 *
 * @param {rokko.graphics.Image} img
 * @constructor
 */
rokko.graphics.AnimatedSprite = function(options) {
    /** @protected */
    this.defFrame = options.defaultFrame;
    this.frame = this.defFrame;
    this.sprites = options.sprites;
};

rokko.graphics.AnimatedSprite.prototype.setSprite = function(frame) {
    this.frame = frame;
};

rokko.graphics.AnimatedSprite.prototype.resetSprite = function() {
    this.frame = this.defFrame;
};

rokko.graphics.AnimatedSprite.prototype.getSprite = function() {
    return this.sprites[this.frame];
};
