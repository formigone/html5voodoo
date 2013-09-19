goog.provide("rokko.graphics.Image");

goog.require("goog.dom");

/**
 *
 * @param {string} img
 * @param {Object} pos
 * @param {Object} size
 * @constructor
 */
rokko.graphics.Image = function(img, options) {
    /** @private */
    /** @type {HTMLImageElement} */
    this.img = goog.dom.createDom("img", {src: img});

    /** @private */
    this.pos = options.pos;

    /** @private */
    this.size = options.size;
};

/**
 *
 * @returns {HTMLImageElement}
 */
rokko.graphics.Image.prototype.getImage = function(){
    return this.img;
};

rokko.graphics.Image.prototype.getPos = function(){
    return this.pos;
};

rokko.graphics.Image.prototype.getSize = function(){
    return this.size;
};
