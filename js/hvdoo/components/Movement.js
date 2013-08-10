HVdoo.components.Movement = (function() {

	var entity;
	var controller;
	
	var Movement = function(entity,  controller) {
		entity = entity;
		controller = controller;
		
		this.exec = function() {
			entity.getDir().zero();
			if (controller.isSet("UP")) entity.setDir(null, -1);
			if (controller.isSet("DOWN")) entity.setDir(null, 1);
			if (controller.isSet("LEFT")) entity.setDir(-1, null);
			if (controller.isSet("RIGHT")) entity.setDir(1, null);

			entity.move();
		};
	};
	
	Movement.prototype = Object.create(HVdoo.components.Component.prototype);
	return Movement;
})();
