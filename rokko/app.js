goog.provide("rokko.go");

goog.require("rokko.entities.Entity");
goog.require("rokko.graphics.Sprite");
goog.require("rokko.graphics.Image");
goog.require("rokko.graphics.SequencedImage");
goog.require("rokko.components.DrawComponent");
goog.require("rokko.components.RendererComponent");

function main(){
    var standing = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
        frames: [
            {
                pos: {
                    x: 105,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 1500
            },
            {
                pos: {
                    x: 135,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 100
            },
            {
                pos: {
                    x: 105,
                    y: 11
                },
                size: {
                    w: 21,
                    h: 24
                },
                freq: 1500
            }
        ],
        freq: 100,
        currFrame: 0
    });

    var running = new rokko.graphics.SequencedImage("/img/8bitmm.gif", {
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

    var sprites = {
        standing: new rokko.graphics.Sprite(standing),
        running: new rokko.graphics.Sprite(running)
    };

    // TODO: make entity size the same as img size. If entity size is always the same, then Mega Man can't fit under a low ceiling by sliding...
    // Maybe I can use a scaling factor? Only way this would work is if the same src image is always the same, and the renderer scales each size component before each draw. ** Might be much, much easier to simply always set entity.size === img.size and create new src image for each game that wants different size sprites **
    var hero = new rokko.entities.Entity({x: 100, y: 150}, {w: 102, h: 98}, sprites.standing);
    var hero2 = new rokko.entities.Entity({x: 300, y: 150}, {w: 102, h: 98}, sprites.running);

    var canvas = new rokko.components.DrawComponent();
    var renderer = new rokko.components.RendererComponent(canvas);

    canvas.show(document.body);

    renderer.addEntity(hero);
    renderer.addEntity(hero2);

    function go(time) {
        renderer.exec(time);
        requestAnimationFrame(go);
    }

    go(0);
}

goog.exportSymbol("main", main);
