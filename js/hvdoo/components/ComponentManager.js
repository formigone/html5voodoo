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
