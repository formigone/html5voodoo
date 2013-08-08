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
