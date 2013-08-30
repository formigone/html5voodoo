goog.provide("HVdoo.entities");

/**
 * @constructor
 */
HVdoo.entities.Entity = function(x, y, dX, dY, componentManager) {
   var pos = new HVdoo.util.math.Vec2(x || 0, y || 0);
   var dir = new HVdoo.util.math.Vec2(0, 0);
   var vel = new HVdoo.util.math.Vec2(dX || 5, dY || 5);
   var sprite;
   var components = componentManager;

   this.update = function() {
      components.exec();
   };

   this.draw = function() {
      if (sprite !== undefined) {
         sprite.exec();
      }
   };

   this.setSprite = function(drawable) {
      sprite = drawable || null;
   };

   this.getPos = function() {
      return pos;
   };

   this.setPos = function(x, y) {
      pos.set(x, y);
   };

   this.getDir = function() {
      return dir;
   };

   this.setDir = function(x, y) {
      dir.set(x, y);
   };

   this.getVel = function() {
      return vel;
   };

   this.setVel = function(x, y) {
      vel.set(x, y);
   };

   this.move = function() {
      var _dir = dir.get();
      var _vel = vel.get();
      pos.add(_dir.x * _vel.x, _dir.y * _vel.y);
   };
};
