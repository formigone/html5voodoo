goog.provide("hvdoo.tetris.util");

goog.require("hvdoo.tetris.constants");
goog.require("hvdoo.tetris.Sprite");

hvdoo.tetris.util.genRandomSprite = function(width, height) {
	width = width || 32;
	height = height || width;

	var mms = hvdoo.tetris.constants.MEGA_MAN_CHARACTER_OFFSET;
	var rand = parseInt(Math.random() * mms.offsets.length);
	return new hvdoo.tetris.Sprite("/img/tetris/Mega-Man-Character-Select-C.png", width,
			height, mms.offsets[rand].x, mms.offsets[rand].y, mms.size.width,
			mms.size.height);
};

hvdoo.tetris.util.genRandomShape = function() {
	var shapes = [
	// { size: { width : 4, height : 1 }, map: [ 1, 0, 1, 1 ] },
	{
		size : {
			width : 4,
			height : 2
		},
		map : [ 0, 0, 0, 0, 1, 1, 1, 1]
	}, {
		size : {
			width : 2,
			height : 2
		},
		map : [ 1, 1, 1, 1 ]
	}, {
		size : {
			width : 3,
			height : 2
		},
		map : [ 1, 0, 0, 1, 1, 1 ]
	}, {
		size : {
			width : 3,
			height : 2
		},
		map : [ 0, 0, 1, 1, 1, 1 ]
	}, {
		size : {
			width : 3,
			height : 2
		},
		map : [ 0, 1, 0, 1, 1, 1 ]
	}, {
		size : {
			width : 3,
			height : 2
		},
		map : [ 0, 1, 1, 1, 1, 0 ]
	}, {
		size : {
			width : 3,
			height : 2
		},
		map : [ 1, 1, 0, 0, 1, 1 ]
	} ];

	var rand = parseInt(Math.random() * shapes.length);
//	rand = 1;
// console.log("Shape #" + rand + ": (" + shapes[rand].size.width + ", " +
// shapes[rand].size.height + ")");
// console.log(" " + shapes[rand].map.slice(0, shapes[rand].size.width) +
// "\n" +
// " " + shapes[rand].map.slice(shapes[rand].size.width));
	return shapes[rand];
};
