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
