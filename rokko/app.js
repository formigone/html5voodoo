goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");

function main(){
    var img = new rokko.graphics.Image("/img/tetris/ssfiv-8bit.jpg", {
        pos: {
            x: 0,
            y: 0
        },
        size: {
            w: 112,
            h: 132
        }
    });

    var sprite = new rokko.graphics.Sprite(img);

    var hero = new rokko.entities.Entity({x: 100, y: 150}, {w: 112, h: 132}, sprite);
    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);

    canvas.show(document.body);

    renderer.addEntity(hero);

    function go() {
        renderer.exec();
        requestAnimationFrame(go);
    }

    go();
}

goog.exportSymbol("main", main);
