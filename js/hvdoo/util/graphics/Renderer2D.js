goog.provide("HVdoo.util.graphics");

HVdoo.util.graphics.Renderer2D = function(width, height) {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", width || 800);
	canvas.setAttribute("height", height || 450);
	
	var ctx = canvas.getContext("2d");
	
	this.render = function(img, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight) {
		ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
	};
	
	this.clear = function(x, y, width, height) {
		ctx.clearRect(x || 0, y || 0, width || canvas.width, height || canvas.height);
	};
	
	this.getCanvas = function() {
		return canvas;
	};
	
	this.attach = function(panel) {
		if (panel instanceof HTMLElement) {			
			panel.appendChild(canvas);
		}
	};
};
