goog.require("rokko.entities.Entity");
goog.require("rokko.components.DrawComponent");

function main(){
    var entity = new rokko.entities.Entity({x: 0, y: 0}, {w: 50, h: 50});
    var canvas = new rokko.components.DrawComponent();

    entity.addComponent(canvas);
    canvas.show(document.body);


}
