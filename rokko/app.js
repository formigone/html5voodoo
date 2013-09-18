goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");

function main(){
    var hero = new rokko.entities.Entity({x: 100, y: 100}, {w: 50, h: 50});
    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);

    canvas.show(document.body);

    renderer.addEntity(hero);
    renderer.exec();
}

goog.exportSymbol("main", main);
