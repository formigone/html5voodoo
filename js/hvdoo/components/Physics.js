HVdoo.components.Physics = (function() {

   var entity;
   var controller;
   var G;
   var velY;
   var isJumping;
   var isFalling;

   var Physics = function(entity,  controller, options) {
      entity = entity;
      controller = controller;
      options = options || {};
      
      G = options.gravity || 0.75;
      MAX_VEL_Y = options.velocity_y || -15;
      velY = 0;
      isJumping = false;
      isFalling = true;

      this.exec = function() {
         if (controller.isSet("SPACE")) {
            if (!isJumping && !isFalling) {
               isJumping = true;
               isFalling = true;
               velY = MAX_VEL_Y;
            }
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
