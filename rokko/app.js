goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");

function main(){
    var img = new rokko.graphics.Image("/img/8bitmm.gif", {
        pos: {
            x: 105,
            y: 11
        },
        size: {
            w: 21,
            h: 24
        }
    });

    var seqImg = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 189,
                    y: 11
                },
                size: {
                    w: 26,
                    h: 24
                }
            },
            {
                pos: {
                    x: 214,
                    y: 11
                },
                size: {
                    w: 26,
                    h: 24
                }
            },
            {
                pos: {
                    x: 239,
                    y: 11
                },
                size: {
                    w: 26,
                    h: 24
                }
            }
        ],
        freq: 100,
        currFrame: 0
    });

    var sprite = new rokko.graphics.Sprite(seqImg);

    var hero = new rokko.entities.Entity({x: 100, y: 150}, {w: 102, h: 98}, sprite);
    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);

    canvas.show(document.body);

    renderer.addEntity(hero);

    function go(time) {
        renderer.exec(time);
        requestAnimationFrame(go);
    }

    go(0);
}

goog.exportSymbol("main", main);
