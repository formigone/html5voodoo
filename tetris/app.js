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

var Piece = function(x, y, pSprite) {
	var pos = {
		x : x || 0,
		y : y || 0
	};

	var size = {
		width : 3,
		height : 3
	};

	var sprite = pSprite || genRandomSprite();
	
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
	
	this.getSprite = function() {
		return sprite;
	};

	this.render = function(canvas, x, y) {
		sprite.render(canvas, x, y);
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

	var piece = void 0;

	this.setPiece = function(pPiece) {
		piece = pPiece;
	};

	this.updatePiece = function() {
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
	
	this.update = function() {
		if (piece == null) {
			return;
		}

		var pos = piece.getPos();
		var offset = piece.getOffset();
		
		if (pos.y + offset.y < grid.rows - 1) {
			piece.moveBy(0, 1);
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
//				canvas.draw(pos.x * cell.width + x * cell.width, pos.y * cell.height + y * cell.height, cell.width, cell.height);
				piece.render(canvas, pos.x * cell.width + x * cell.width, pos.y * cell.height + y * cell.height);
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

function genRandomSprite() {
	var mms = MEGA_MAN_CHARACTER_OFFSET;
	var rand = parseInt(Math.random() * mms.offsets.length);
	return new Sprite("/tetris/Mega-Man-Character-Select-C.png", 32, 32, mms.offsets[rand].x, mms.offsets[rand].y, mms.size.width, mms.size.height);
}
