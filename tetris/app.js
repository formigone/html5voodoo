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
		width : 3,
		height : 3
	};

	var shape = [
         0, 1, 0,
         1, 1, 0
     ];

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

	this.getOffset = function() {
		var max = {
			x: 0,
			y: 0
		};
		
		for (var i = 0, len = shape.length; i < len; i++) {
			if (shape[i]) {
				var x = i % size.width;
				var y = parseInt(i / size.height);
				if (x > max.x) {
					max.x = x;
				}
				
				if (y > max.y) {
					max.y = y;
				}
			}
		}
		
		return max;
	};
};

var Board = function(cols, rows, width, height) {
	var cell = {
		width : width || 32,
		height : height || width || 32
	};

	var grid = {
		rows : rows || 10,
		cols : cols || 10
	};
this.getGrid = function() { return grid; };
	var piece = void 0;

	this.setPiece = function(pPiece) {
		piece = pPiece;
	};

	this.movePiece = function() {
		if (piece == null) {
			return;
		}

		var pos = piece.getPos();
		var offset = piece.getOffset();
		
		if (KEYS[KEY_MAPPING.LEFT_KEY]) {
			if (pos.x > 0) {
				piece.moveBy(-1, 0);
			}
		}
		
		if (KEYS[KEY_MAPPING.RIGHT_KEY]) {
			if (pos.x + offset.x < grid.cols - 1) {
				piece.moveBy(1, 0);
			}
		}
		
		if (KEYS[KEY_MAPPING.DOWN_KEY]) {
			if (pos.y + offset.y < grid.rows - 1) {
				piece.moveBy(0, 1);
			}
		}
		
		if (KEYS[KEY_MAPPING.UP_KEY]) {
			piece.moveBy(0, -1);
		}
	};
	
	this.draw = function(canvas) {
		var pos = piece.getPos();
		var size = piece.getSize();
		var shape = piece.getShape();

		for (var i = 0, len = shape.length; i < len; i++) {
			if (shape[i]) {
				var x = i % size.width;
				var y = parseInt(i / size.height);
				canvas.draw(pos.x * cell.width + x * cell.width, pos.y * cell.height + y * cell.height, cell.width, cell.height);
			}
		}
	};
};

var KEYS = {};
var KEY_MAPPING = {
	"LEFT_KEY" : 37,
	"UP_KEY" : 38,
	"RIGHT_KEY" : 39,
	"DOWN_KEY" : 40
};
