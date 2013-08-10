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

    set = function(key, val) {
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
