goog.require("hvdoo.tetris.Board");
goog.require("hvdoo.tetris.Canvas");
goog.require("hvdoo.tetris.Step");
goog.require("hvdoo.tetris.input");
goog.require("hvdoo.tetris.util");

function main(cellWidth, cellHeight, gridWidth, gridHeight) {
    canvas = new hvdoo.tetris.Canvas(gridWidth * cellWidth, gridHeight * cellHeight);
    canvas.render(document.body);

    var keyboard = new hvdoo.tetris.input.Keyboard();
    var __x = parseInt(Math.random() * (gridWidth - 6));
    if (__x < 0) {
        __x = 1;
    }

    block = new hvdoo.tetris.Piece(__x, 0, hvdoo.tetris.util.genRandomShape(), hvdoo.tetris.util.genRandomSprite(cellWidth, cellHeight));
    board = new hvdoo.tetris.Board(gridWidth, gridHeight, cellWidth, cellHeight, block, keyboard);

    document.addEventListener("keydown", function(key) {
        keyboard.set(key.keyCode, true);
    });

    document.addEventListener("keyup", function(key) {
        keyboard.set(key.keyCode, false);
    });

    var pieceStep = new hvdoo.tetris.Step(20);
    var aiStep = new hvdoo.tetris.Step(5);

    function run(time) {
        pieceStep.update(time);
        aiStep.update(time);

        if (pieceStep.isReady()) {
            board.updatePiece();
            pieceStep.step(time);
        }

        if (aiStep.isReady()) {
            board.update();
            aiStep.step(time);
        }

        canvas.clear();
        board.draw(canvas);
        requestAnimationFrame(run);
    }

    run(0);
}
