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
