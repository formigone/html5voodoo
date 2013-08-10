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

	ComponentManager.prototype = Object.create(HVdoo.components.Component.prototype);
	return ComponentManager;
})();
HVdoo.components.Drawable = (function() {

	var renderer;
	var entity;
	var size;
	var img;
	var srcImage = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
	};
	
	var Drawable = function(renderer, entity,  imgPath, 
			width, height, srcX, srcY, srcWdith, srcHeight) {
		renderer = renderer;
		entity = entity;
		size = new HVdoo.util.math.Vec2(width, height);
		img = new Image();
		img.src = imgPath;
		srcImg.x = srcX || 0;
		srcImg.y = srcY || 0;
		srcImg.width = srcWidth || width;
		srcImg.height = srcHeight || height;
		
		this.exec = function() {
			pos = entity.getPos().get();
			renderer.render(img, srcImg.x, srcImg.y, srcImg.width, srcImg.height, pos.x, pos.y, size.w, size.h);
		};
		
		this.getSize = function() {
			return size;
		};
		
		this.setSize = function(vec2) {
			size = vec2;
		};
	};
	
	Drawable.prototype = Object.create(HVdoo.components.Component.prototype);
	return Drawable;
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
HVdoo.util.graphics.Renderer2D = function() {
	
};
HVdoo.util.math.Vec2 = function(x, y) {
    var el = {
        x: (x || 0),
        y: (y || 0),
     };

    this.add = function(vec2) {
        vec2 = vec2.get();
        el.x += vec2.x;
        el.y += vec2.y;
     };
     
     this.subt = function(vec2) {
        vec2 = vec2.get();
        el.x -= vec2.x;
        el.y -= vec2.y;
     };
     
     this.mult = function(scal) {
        el.x *= scal;
        el.y *= scal;
     };
     
     this.normalize = function() {
    	 var length = Math.sqrt(el.x * el.x + el.y * el.y);
    	 el.x /= length;
    	 el.y /= length;

    	 return el;
     };
     
     this.get = function() {
        return el;
     };
     
     this.set = function(x, y) { 
        el.x = x || el.x;
        el.y = y || el.y;
        return el;
     };
}
