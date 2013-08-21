HVdoo.components.Movement = (function() {

	var entity;
	var controller;
	var hor;
	
	/**
    * @constructor
    */
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
