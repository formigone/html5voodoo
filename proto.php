<!doctype html>
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HTML5 Voodoo &raquo; 2D JavaScript Gaming</title>
<style>
html,body {
	margin: 0;
	padding: 0;
	width: 100%;
	background: #ddd;
}

canvas {
	display: block;
	margin: 50px auto 0;
	box-shadow: 0 10px 30px #333;
}
</style>
<script src="js/out/hvdoo.js"></script>
</head>

<body>
	<script>
var renderer = new HVdoo.util.graphics.Renderer2D();

var cm = new HVdoo.components.ComponentManager();
var hero = new HVdoo.entities.Entity(0, 50, 5, 5, cm);

var heroImg = new HVdoo.components.Drawable(renderer, hero, "img/elements-icons.png", 64, 64, 40, 5, 275, 355);
hero.setSprite(heroImg);

var ctr = new HVdoo.util.input.Controller();
var move = new HVdoo.components.Movement(hero, ctr);
var phy = new HVdoo.components.Physics(hero, ctr);
cm.set("move", move);
cm.set("phy", phy);

document.body.addEventListener("keydown", ctr.onKeyDown);
document.body.addEventListener("keyup", ctr.onKeyUp);
renderer.attach(document.body);

(function draw(){
	renderer.clear();
	hero.update();
	hero.draw();
	requestAnimationFrame(draw);
})();
</script>

</body>
</html>

