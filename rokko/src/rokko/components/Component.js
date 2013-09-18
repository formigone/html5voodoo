goog.provide("rokko.components.Component");

/**
 *
 * @interface
 */
rokko.components.Component = function() {};

/**
 *
 * @param {rokko.entities.Entity} entity
 */
rokko.components.Component.prototype.exec = function(entity){};

/** @type {string} */
rokko.components.Component.prototype.ID;
