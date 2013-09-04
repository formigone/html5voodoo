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
	
	this.drawImage = function(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height) {
		ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height);
	};

	this.getRenderer = function() {
		return ctx;
	};
};

var Piece = function(x, y, pShape, pSprite) {
	var pos = {
		x : x || 0,
		y : y || 0
	};

	var shape = pShape;
	var sprite = pSprite || genRandomSprite(CELL_WIDTH, CELL_HEIGHT);

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

var Board = function(cols, rows, width, height, pPiece) {
	var cell = {
		width : width || 32,
		height : height || width || 32
	};

	var grid = {
		rows : rows || 10,
		cols : cols || 10
	};

	var needsNewPiece = false;
	var piece = pPiece;
	var inactivePieces = [];
	var filledCells = [];

	for (var i = 0, len = grid.rows * grid.cols; i < len; i++) {
		filledCells[i] = false;
	}

	var isValidMove = function(x, y) {
		
		var shape = piece.getShape();
		var _map = shape.map;
		var _w = shape.size.width;
		var _h = shape.size.height;
		var _y;
		var _p;
		var _offset;
		var _vOffset = shape.size.height > 1 ? 1 : 0;

		if (x < 0) {
			return false;
		}

		if (x + _w > grid.cols) {
			return false;
		}
		
		if (y + _h > grid.rows) {
			return false;
		}

		for (var i = 0, len = _map.length; i < len; i++) {
			_y = parseInt(i / _w) + 1;
			_offset = (y + _y - _vOffset) * grid.cols + x;
			_p = _offset + (i % _w);

			if (filledCells[_p] && _map[i] == 1) {
				return false;
			}
		}

		return true;
	};

	this.updatePiece = function() {
		var pos = piece.getPos();

		if (KEYS[KEY_MAPPING.DOWN_KEY]) {
			if (isValidMove(pos.x, pos.y + 1)) {
				piece.moveBy(0, 1);
				pos = piece.getPos();
			} else {
				needsNewPiece = true;
				return;
			}
		}

		if (KEYS[KEY_MAPPING.LEFT_KEY]) {
			if (isValidMove(pos.x - 1, pos.y)) {
				piece.moveBy(-1, 0);
				pos = piece.getPos();
			}
		}

		if (KEYS[KEY_MAPPING.RIGHT_KEY]) {
			if (isValidMove(pos.x + 1, pos.y)) {
				piece.moveBy(1, 0);
			}
		}
	};
	
	this.update = function() {
		var pos = piece.getPos();
		var shape = piece.getShape();
		var _size = shape.size;

		if (needsNewPiece) {
			var _y;
			var _offset;
			var _p;
			
			for (var i = 0, len = shape.map.length; i < len; i++) {
				_y = parseInt(i / _size.width);
				_offset = (pos.y + _y) * grid.cols + pos.x;
				_p = _offset + (i % _size.width);
				filledCells[_p] = Boolean(shape.map[i]);
			}

			inactivePieces.push(piece);
			var __x = parseInt(Math.random() * (grid.cols - 6));
			if (__x < 0) {
				__x = 1;
			}
			piece = new Piece(__x, -1, genRandomShape());
			needsNewPiece = false;
		}

//		if (isValidMove(pos.x, pos.y + _size.height)) {
//			piece.moveBy(0, 1);
//			pos = piece.getPos();
//		} else {
//			needsNewPiece = true;
//		}
	};

	var drawInactivePiece = function(p) {
		var shape = p.getShape();
		var pos = p.getPos();
		var x;
		var y;

		for (var i = 0, len = shape.map.length; i < len; i++) {
			x = i % shape.size.width;
			y = parseInt(i / shape.size.width);

			if (shape.map[i]) {
				p.render(canvas, pos.x * cell.width + x * cell.width, pos.y * cell.height + y * cell.height);
			}
		}
	};
	
	this.draw = function(canvas) {
		var shape = piece.getShape();
		var pos = piece.getPos();

		for (var i = 0, len = shape.map.length; i < len; i++) {
			var x = i % shape.size.width;
			var y = parseInt(i / shape.size.width);

			if (shape.map[i]) {
				piece.render(canvas, pos.x * cell.width + x * cell.width, pos.y * cell.height + y * cell.height);
			}
		}
		
		for (i = 0, len = inactivePieces.length; i < len; i++) {
			drawInactivePiece(inactivePieces[i]);
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

var Step = function(fps) {
	var FPS = parseInt(fps || 60);
	var last = 0;
	var delta = 0;
	var delay = 1000 / FPS;

	this.update = function(now) {
		delta = now - last;
	};

	this.step = function(now) {
		last = now;
	};
	
	this.isReady = function() {
		return (delta >= delay);
	};
};

var Sprite = function(img, width, height, srcX, srcY, srcWidth, srcHeight) {
	var el = new Image();
	el.src = img;

	var size = {
		width: width,
		height: height
	};
	
	var meta = {
		x: srcX || 0,
		y: srcY || 0,
		width: srcWidth || width,
		height: srcHeight || height
	};
	
	this.render = function(canvas, x, y) {
		canvas.drawImage(el, meta.x, meta.y, meta.width, meta.height, x, y, size.width, size.height);
	};
};

var MEGA_MAN_CHARACTER_OFFSET = {
	size: {
		width: 45,
		height: 45
	},
	offsets: [
        {x: 42, y: 26},
        {x: 106, y: 26},
        {x: 170, y: 26},
        {x: 233, y: 26},
        {x: 297, y: 26},
        {x: 361, y: 26},
        {x: 425, y: 26},
        {x: 489, y: 26},

        {x: 42, y: 90},
        {x: 106, y: 90},
        {x: 170, y: 90},
        {x: 233, y: 90},
        {x: 297, y: 90},
        {x: 361, y: 90},
        {x: 425, y: 90},
        {x: 489, y: 90},

        {x: 42, y: 154},
        {x: 106, y: 154},
        {x: 170, y: 154},
        {x: 233, y: 154},
        {x: 297, y: 154},
        {x: 361, y: 154},
        {x: 425, y: 154},
        {x: 489, y: 154},

        {x: 42, y: 218},
        {x: 106, y: 218},
        {x: 170, y: 218},
        {x: 233, y: 218},
        {x: 297, y: 218},
        {x: 361, y: 218},
        {x: 425, y: 218},
        {x: 489, y: 218},

        {x: 42, y: 282},
        {x: 106, y: 282},
        {x: 170, y: 282},
        {x: 233, y: 282},
        {x: 297, y: 282},
        {x: 361, y: 282},
        {x: 425, y: 282},
        {x: 489, y: 282},

        {x: 42, y: 346},
        {x: 106, y: 346},
        {x: 170, y: 346},
        {x: 233, y: 346},
        {x: 297, y: 346},
        {x: 361, y: 346},
        {x: 425, y: 346},
        {x: 489, y: 346},
        
        {x: 42, y: 346},
        {x: 106, y: 346},
        {x: 170, y: 346},
        {x: 233, y: 346},
        {x: 297, y: 346},
        {x: 361, y: 346},
        {x: 425, y: 346},
        {x: 489, y: 346},
        ],
	character: [
        "N/A"
    ]
};

function genRandomSprite(width, height) {
	width = width || 32;
	height = height || width;

	var mms = MEGA_MAN_CHARACTER_OFFSET;
	var rand = parseInt(Math.random() * mms.offsets.length);
	return new Sprite("/img/tetris/Mega-Man-Character-Select-C.png", width, height, mms.offsets[rand].x, mms.offsets[rand].y, mms.size.width, mms.size.height);
}

function genRandomShape() {
	var shapes = [
//{ size: { width : 4, height : 1 }, map: [ 1, 0, 1, 1 ] },
	    {
	    	size: {
    			width : 4,
    			height : 1
	    	},
	    	map: [
    	        1, 1, 1, 1
        	]
	    },
	    {
	    	size: {
    			width : 2,
    			height : 2	
	    	},
	    	map: [
    	        1, 1, 
    	        1, 1
        	]
	    },
	    {
	    	size: {
    			width : 3,
    			height : 2	
	    	},
	    	map: [
    	        1, 0, 0,
    	        1, 1, 1
        	]
	    },
	    {
	    	size: {
    			width : 3,
    			height : 2	
	    	},
	    	map: [
    	        0, 0, 1,
    	        1, 1, 1
        	]
	    },
	    {
	    	size: {
    			width : 3,
    			height : 2	
	    	},
	    	map: [
    	        0, 1, 0,
    	        1, 1, 1
        	]
	    },
	    {
	    	size: {
    			width : 3,
    			height : 2	
	    	},
	    	map: [
    	        0, 1, 1,
    	        1, 1, 0
        	]
	    },
	    {
	    	size: {
    			width : 3,
    			height : 2	
	    	},
	    	map: [
    	        1, 1, 0,
    	        0, 1, 1
        	]
	    }
    ];

	var rand = parseInt(Math.random() * shapes.length);
rand = 1;
//console.log("Shape #" + rand + ": (" + shapes[rand].size.width + ", " + shapes[rand].size.height + ")");
//console.log("  " + shapes[rand].map.slice(0, shapes[rand].size.width) + "\n" + 
//		    "  " + shapes[rand].map.slice(shapes[rand].size.width));
	return shapes[rand];
}
