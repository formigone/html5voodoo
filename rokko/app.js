goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
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

    var seqImg = new rokko.graphics.SequencedImage("/img/tetris/ssfiv-8bit.jpg", {
        frames: [
            {
                pos: {
                    x: 122,
                    y: 0
                },
                size: {
                    w: 112,
                    h: 132
                }
            },
            {
                pos: {
                    x: 0,
                    y: 0
                },
                size: {
                    w: 112,
                    h: 132
                }
            }
        ],
        freq: 500
    });

    var sprite = new rokko.graphics.Sprite(seqImg);

    var hero = new rokko.entities.Entity({x: 100, y: 150}, {w: 112, h: 132}, sprite);
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
