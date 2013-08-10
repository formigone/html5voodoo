HVdoo.components.Drawable = (function() {

	var renderer;
	var entity;
	var size;
	var img;
	var srcImage = {
			x: 0,
			y: 0,
			width: 0,
			height: 0
	};
	
	var Drawable = function(renderer, entity,  imgPath, 
			width, height, srcX, srcY, srcWdith, srcHeight) {
		renderer = renderer;
		entity = entity;
		size = new HVdoo.util.math.Vec2(width, height);
		img = new Image();
		img.src = imgPath;
		srcImg.x = srcX || 0;
		srcImg.y = srcY || 0;
		srcImg.width = srcWidth || width;
		srcImg.height = srcHeight || height;
		
		this.exec = function() {
			pos = entity.getPos().get();
			renderer.render(img, srcImg.x, srcImg.y, srcImg.width, srcImg.height, pos.x, pos.y, size.w, size.h);
		};
		
		this.getSize = function() {
			return size;
		};
		
		this.setSize = function(vec2) {
			size = vec2;
		};
	};
	
	Drawable.prototype = Object.create(HVdoo.components.Component.prototype);
	return Drawable;
})();
