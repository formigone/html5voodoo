var HVdoo = HVdoo || {};
HVdoo.components = HVdoo.components || {};
HVdoo.entities = HVdoo.entities || {};
HVdoo.util = HVdoo.util || {};
HVdoo.util.graphics = HVdoo.util.graphics || {};
HVdoo.util.input = HVdoo.util.input || {};
HVdoo.util.math = HVdoo.util.math || {};
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
HVdoo.components.Movement = (function() {

	var entity;
	var controller;
	var hor;
	
	var Movement = function(entity,  controller) {
		entity = entity;
		controller = controller;
		
		hor = 0;
		
		this.exec = function() {
			entity.getDir().zero();
			hor = 0;
			
//			if (controller.isSet("UP")) entity.setDir(null, -1);
//			if (controller.isSet("DOWN")) entity.setDir(null, 1);
			if (controller.isSet("LEFT")) {
			   hor -= 1;
			}
			if (controller.isSet("RIGHT")) {
			   hor += 1;
			}
		   
		   entity.setDir(hor, null);

			entity.move();
		};
	};
	
	Movement.prototype = Object.create(HVdoo.components.Component.prototype);
	return Movement;
})();
HVdoo.components.Physics = (function() {

   var entity;
   var controller;
   var G;
   var velY;
   var isJumping;
   var isFalling;
   var isJumpingIntent;

   var Physics = function(entity,  controller, options) {
      entity = entity;
      controller = controller;
      options = options || {};
      
      G = options.gravity || 0.75;
      MAX_VEL_Y = options.velocity_y || -15;
      velY = 0;
      isJumping = false;
      isFalling = true;
      
      // Deactivate turbo-jumping by holding down jumping button
      isJumpingIntent = false;

      this.exec = function() {
         if (controller.isSet("SPACE")) {
            if (!isJumping && !isFalling && !isJumpingIntent) {
               isJumping = true;
               isFalling = true;
               velY = MAX_VEL_Y;
               isJumpingIntent = true;
            }
         } else {
            isJumpingIntent = false;
         }

         if (isJumping || isFalling) {
            velY += G;
            entity.getPos().add(null, velY);
         }

         // TODO: Remove this when proper collision detection is in place
         if (entity.getPos().get().y > 300) {
            entity.setPos(null, 300);
            isJumping = false;
            isFalling = false;
         }
      };
   };

   Physics.prototype = Object.create(HVdoo.components.Component.prototype);
   return Physics;
})();
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
HVdoo.util.input.Controller = function() {
	var controller = {};
    var keys = {
    		SPACE: 32,
    		LEFT: 37,
    		UP: 38,
    		RIGHT: 39,
    		DOWN: 40,
    		A: 65,
    		S: 83,
    		D: 68,
    		F: 70
    };

    var set = function(key, val) {
    	controller[key] = val;
	};
	
	this.isSet = function(key) {
		return controller[keys[key]]; 
	};

	this.onKeyDown = function(event) {
		set(event.keyCode, true);
	};
	
	this.onKeyUp = function(event) {
		set(event.keyCode, false);
	};
};
HVdoo.util.math.Vec2 = function(x, y) {
    var el = {
        x: (x || 0),
        y: (y || 0)
     };

    this.add = function(x, y) {
        el.x += (x || 0);
        el.y += (y || 0);
     };

     this.subt = function(x, y) {
        el.x -= (x || 0);
        el.y -= (y || 0);
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

     this.zero = function() {
    	 el.x = 0;
    	 el.y = 0;
     };
}
