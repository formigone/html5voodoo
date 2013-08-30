var Canvas = function(width, height) {
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext("2d");

	this.render = function(panel) {
		panel.appendChild(canvas);
	};

	this.getWidth = function() {
		return canvas.width;
	};

	this.getHeight = function() {
		return canvas.height;
	};

	this.clear = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	this.draw = function(x, y, width, height) {
		ctx.fillRect(x, y, width, height);
	};

	this.getRenderer = function() {
		return ctx;
	};
};

var Piece = function(x, y) {
	var pos = {
		x : x || 0,
		y : y || 0
	};

	var size = {
		width : 2,
		height : 2
	};

	var shape = [ true, true, true, true ];

	this.getPos = function() {
		return pos;
	};

	this.getSize = function() {
		return size;
	};

	this.getShape = function() {
		return shape;
	};

	this.moveBy = function(x, y) {
		pos.x += x || 0;
		pos.y += y || 0;
	};
};

var Board = function(rows, cols, width, height) {
	var cell = {
		width : width || 16,
		height : height || 16
	};
	var grid = {
		rows : rows || 10,
		cols : cols || 10
	};

	var piece = void 0;

	this.setPiece = function(pPiece) {
		piece = pPiece;
	};

	this.movePiece = function() {
		if (piece == null) {
			return;
		}

		if (KEYS[KEY_MAPPING.LEFT_KEY]) {
			piece.moveBy(-1, 0);
		}
		
		if (KEYS[KEY_MAPPING.RIGHT_KEY]) {
			piece.moveBy(1, 0);
		}
		
		if (KEYS[KEY_MAPPING.DOWN_KEY]) {
			piece.moveBy(0, 1);
		}
	};
	
	this.draw = function(canvas) {
		var pos = piece.getPos();
		var shape = piece.getShape();

		canvas.draw(pos.x * grid.cols, pos.y * grid.rows, cell.width, cell.height);
	};
};

var KEYS = {};
var KEY_MAPPING = {
	"LEFT_KEY" : 37,
	"UP_KEY" : 38,
	"RIGHT_KEY" : 39,
	"DOWN_KEY" : 40
};
