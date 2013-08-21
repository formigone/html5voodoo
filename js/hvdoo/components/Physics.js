HVdoo.components.Physics = (function() {

   var entity;
   var controller;
   var G;
   var velY;
   var posY;
   var isJumping;

   var Physics = function(entity,  controller, options) {
      entity = entity;
      controller = controller;
      options = options || {};
      
      G = options.gravity || 0.75;
      MAX_VEL_Y = options.velocity_y || -12.5;
      velY = 0;
      posY = 0;
      isJumping = false;

      this.exec = function() {
         if (controller.isSet("SPACE")) {
            if (!isJumping) {
               isJumping = true;
               velY = MAX_VEL_Y;
               posY = posY = entity.getPos().get().y; 
            }
         }

         if (isJumping) {
            posY += velY;
            velY += G;
            entity.setPos(null, posY);
         }

         // TODO: Remove this when proper collision detection is in place
         if (posY > 300) {
            entity.setPos(null, 300);
            isJumping = false;
         }
      };
   };

   Physics.prototype = Object.create(HVdoo.components.Component.prototype);
   return Physics;
})();
