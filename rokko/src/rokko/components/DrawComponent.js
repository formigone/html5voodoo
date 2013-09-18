goog.provide("rokko.components.DrawComponent");

goog.require("rokko.components.Component");
goog.require("goog.dom");

/**
 *
 * @constructor
 * @implements {rokko.components.Component}
 */
rokko.components.DrawComponent = function(width, height) {
    /** @private */
    /** @type {HTMLCanvasElement} */
    this.canvas = goog.dom.createDom("canvas", {width: width || 800, height: height || 450});

    /** @private */
    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext("2d");
};

/** @inheritDoc */
rokko.components.DrawComponent.prototype.exec = function(entity){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(entity.pos.x, entity.pos.y, entity.size.w, entity.size.h);
};

/** @inheritDoc */
rokko.components.DrawComponent.prototype.ID = "__DRAW_COMPONENT__";

rokko.components.DrawComponent.prototype.show = function(container){
    container.appendChild(this.canvas);
};
