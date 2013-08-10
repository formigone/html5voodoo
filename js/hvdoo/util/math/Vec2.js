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
