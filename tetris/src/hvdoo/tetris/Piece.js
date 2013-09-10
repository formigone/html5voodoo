goog.provide("hvdoo.tetris.Piece");

goog.require("hvdoo.tetris.constants");

hvdoo.tetris.Piece = function(x, y, pShape, pSprite) {
	var pos = {
		x : x || 0,
		y : y || 0
	};

	var shape = pShape;
	var sprite = pSprite;

	this.getPos = function() {
		return pos;
	};

	this.getSize = function() {
		return shape.size;
	};

	this.getShape = function() {
		return shape;
	};

	this.moveBy = function(x, y) {
		pos.x += x || 0;
		pos.y += y || 0;
	};

	this.isOn = function(i) {
		return shape.map[i] > 0;
	};

	this.getSprite = function() {
		return sprite;
	};

	this.render = function(canvas, x, y) {
		sprite.render(canvas, x, y);
	};
};
