goog.provide("rokko.entities.Entity");

goog.require("rokko.components.Component");
goog.require("rokko.components.DrawComponent");

/**
 * @param {number} pos Position vector
 * @param {number} size Size vector
 * @param {rokko.graphics.Sprite} sprite Sprite
 *
 * @constructor
 */
rokko.entities.Entity = function(pos, size, sprite) {
    /** @protected */
    this.components = {};

    /** @protected */
    this.pos = pos;

    /** @protected */
    this.size = size;

    /** @protected */
    this.sprite = sprite;
};

rokko.entities.Entity.prototype.getComponents = function() {
    return this.components;
};

/** @enum */
rokko.entities.Entity.prototype.EntityState = {
    STANDING_LEFT: 0,
    STANDING_RIGHT: 1,
    WALKING_LEFT: 2,
    WALKING_RIGHT: 3,
    RUNNING_LEFT: 4,
    RUNNING_RIGHT: 5,
    JUMPING_UP: 6,
    JUMPING_DOWN: 7
};

/**
 *
 * @param {rokko.components.Component} comp
 */
rokko.entities.Entity.prototype.addComponent = function(comp) {
    this.components[comp.ID] = comp;
};

/**
 *
 * @param {string} id
 * @return {rokko.components.Component|null}
 */
rokko.entities.Entity.prototype.getComponent = function(id) {
    return this.components[id] || null;
};
