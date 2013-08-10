var HVdoo = HVdoo || {};
HVdoo.components = HVdoo.components || {};
HVdoo.entities = HVdoo.entities || {};
HVdoo.util = HVdoo.util || {};
HVdoo.components.Component = function() {
	this.exec = function(){};
}
HVdoo.components.ComponentManager = (function() {
	var components = {};
	var ComponentManager = function() {
		HVdoo.components.Component.call(this);

		this.has = function(key) {
			return this.get(key) !== undefined;
		};

		this.set = function(key, val) {
			components[key] = val;
		};

		this.get = function(key) {
			return components[key];
		};

		this.exec = function() {
			for ( var c in components) {
				if (components[c] instanceof HVdoo.components.Component) {
					components[c].exec();
				}
			}
		}
	};

	ComponentManager.prototype = Object
			.create(HVdoo.components.Component.prototype);

	return ComponentManager;
})();
HVdoo.entities.Entity = function(x, y, w, h) {
   var pos = {x:x, y:y};
   var size = {w:w, h:h};

   var _update = function(){};

   this.getPos = function(){
      return pos;
   };

   this.setPos = function(pPos) {
      pos = pPos;
   };

   this.getSize = function() {
      return size;
   };

   this.setSize = function(pSize) {
      size = pSize;
   };

   this.onUpdate = function(cb) {
      _update = cb;
   };

   this.update = function() {
      return _update();
   };
};
HVdoo.entities.HeroEntity = (function() {
   var HeroEntity = function(x, y, w, h, sprite){
      // Call parent contructor
      HVdoo.entities.Entity.call(this, x, y, w, h);

      var img = new Image();
      img.src = sprite;

      this.getSprite = function() {
         var pos = this.getPos();
         var size = this.getSize();

         return {
            x: pos.x,
            y: pos.y,
            width: size.w,
            height: size.h,
            img: img
         };
      };
   };

   HeroEntity.prototype = Object.create(HVdoo.entities.Entity.prototype);

   return HeroEntity;

})();
