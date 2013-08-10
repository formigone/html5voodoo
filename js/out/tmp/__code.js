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
	var srcImg = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
	};
	
	var Drawable = function(renderer, entity,  imgPath, width, height, 
			srcX, srcY, srcWidth, srcHeight) {
		renderer = renderer;
		entity = entity;
		size = new HVdoo.util.math.Vec2(width || 64, height || 64);
		img = new Image();
		img.src = imgPath;
		srcImg.x = srcX || 0;
		srcImg.y = srcY || 0;
		srcImg.width = srcWidth || width;
		srcImg.height = srcHeight || height;
		
		this.exec = function() {
			var pos = entity.getPos().get();
			var s = size.get();
			renderer.render(img, srcImg.x, srcImg.y, srcImg.width, srcImg.height, pos.x, pos.y, s.x, s.y);
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
HVdoo.entities.Entity = function(sprite, x, y) {
	var pos = new HVdoo.util.math.Vec2(x || 0, y || 0);
    var dir = new HVdoo.util.math.Vec2(0, 0);
    var sprite;
    var components = new HVdoo.components.ComponentManager();

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
    
    this.setPos = function(pos) {
       pos = pos;
    };
    
    this.getDir = function() {
       return dir;
    };
    
    this.setDir = function(dir) {
       dir = dir;
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
HVdoo.util.graphics.Renderer2D = function(width, height) {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", width || 800);
	canvas.setAttribute("height", height || 450);
	
	var ctx = canvas.getContext("2d");
	
	this.render = function(img, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight) {
		ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
	};
	
	this.clear = function(x, y, width, height) {
		ctx.clearRect(x || 0, y || 0, width || canvas.width, height || canvas.height);
	};
	
	this.getCanvas = function() {
		return canvas;
	};
	
	this.attach = function(panel) {
		if (panel instanceof HTMLElement) {			
			panel.appendChild(canvas);
		}
	};
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
