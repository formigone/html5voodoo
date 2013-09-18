goog.provide("rokko.entities.Entity");

goog.require("rokko.components.Component");
goog.require("rokko.components.DrawComponent");

/**
 * @param {number} x X position
 * @param {number} y Y position
 *
 * @constructor
 */
rokko.entities.Entity = function(pos, size) {
    /** @protected */
    this.components = {};

    /** @protected */
    this.pos = pos;

    /** @protected */
    this.size = size;
};

rokko.entities.Entity.prototype.getComponents = function() {
    return this.components;
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
