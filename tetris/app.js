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
			x: x || 0,
			y: y || 0
		};

	var size = {
			width: 2,
			height: 2
		};
	
	var shape = [true, true, true, true];
	
	this.getPos = function() {
		return pos;
	};
	
	this.getSize = function() {
		return size;
	};

	this.getShape = function() {
		return shape;
	};
};

var Board = function(rows, cols, width, height) {
	var cell = {
			width: width || 16,
			height: height || 16
		};
	var grid = {
			rows: rows || 10,
			cols: cols || 10
		};

	var piece;

	this.setPiece = function(pPiece) {
		piece = pPiece;
	};
	
	this.draw = function(canvas) {
		var pos = piece.getPos();
		var shape = piece.getShape();
		
		canvas.draw(pos.x, pos.y, cell.width, cell.height);
	};
};
