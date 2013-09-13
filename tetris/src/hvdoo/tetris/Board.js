goog.provide("hvdoo.tetris.Board");

goog.require("hvdoo.tetris.Piece");
goog.require("hvdoo.tetris.input");
goog.require("hvdoo.tetris.util");

hvdoo.tetris.Board = function(cols, rows, width, height, pPiece, pInput) {
    var cell = {
        width: width || 32,
        height: height || width || 32
    };

    var grid = {
        rows: rows || 10,
        cols: cols || 10
    };

    var input = pInput;
    var needsNewPiece = false;
    var piece = pPiece || void 0;
    if (!piece) {
        var __x = parseInt(Math.random() * (grid.cols - 6));
        if (__x < 0) {
            __x = 1;
        }

        piece = new hvdoo.tetris.Piece(__x, -1, hvdoo.tetris.util.genRandomShape(), hvdoo.tetris.util.genRandomSprite(cell.width, cell.height));
    }

    var inactivePieces = [];
    var filledCells = [];

    for (var i = 0, len = grid.rows * grid.cols; i < len; i++) {
        filledCells[i] = false;
    }

//    var __isValidMove = function(x, y) {
//
//        var shape = piece.getShape();
//        var _map = shape.map;
//        var _w = shape.size.width;
//        var _h = shape.size.height;
//        var _y;
//        var _p;
//        var _offset;
//        var _vOffset = shape.size.height > 1 ? 1 : 0;
//
//        if (x < 0) {
//            return false;
//        }
//
//        if (x + _w > grid.cols) {
//            return false;
//        }
//
//        if (y + _h > grid.rows) {
//            return false;
//        }
//
//        for (var i = 0, len = _map.length; i < len; i++) {
//            _y = parseInt(i / _w) + 1;
//            _offset = (y + _y - _vOffset) * grid.cols + x;
//            _p = _offset + (i % _w);
//
//            if (filledCells[_p] && _map[i] == 1) {
//                return false;
//            }
//        }
//
//        return true;
//    };

    this.updatePiece = function() {
        var pos = piece.getPos();

        if (input.isPressed(input.KEY_MAPPING.DOWN_KEY)) {
            if (this.isValidMove(piece, pos.x, pos.y + 1, grid, filledCells)) {
                piece.moveBy(0, 1);
                pos = piece.getPos();
            } else {
                needsNewPiece = true;
                return;
            }
        }

        if (input.isPressed(input.KEY_MAPPING.LEFT_KEY)) {
            if (this.isValidMove(piece, pos.x - 1, pos.y, grid, filledCells)) {
                piece.moveBy(-1, 0);
                pos = piece.getPos();
            }
        }

        if (input.isPressed(input.KEY_MAPPING.RIGHT_KEY)) {
            if (this.isValidMove(piece, pos.x + 1, pos.y, grid, filledCells)) {
                piece.moveBy(1, 0);
            }
        }
    };

    this.update = function() {
        var pos = piece.getPos();
        var shape = piece.getShape();
        var _size = shape.size;

        if (this.isValidMove(piece, pos.x, pos.y + 1, grid, filledCells)) {
            piece.moveBy(0, 1);
        } else {
            needsNewPiece = true;
        }
        
        if (needsNewPiece) {
            var _y;
            var _offset;
            var _p;

            for (var i = 0, len = shape.map.length; i < len; i++) {
                _y = parseInt(i / _size.width);
                _offset = (pos.y + _y) * grid.cols + pos.x;
                _p = _offset + (i % _size.width);
                filledCells[_p] = Boolean(shape.map[i]);
            }

            inactivePieces.push(piece);
            var __x = parseInt(Math.random() * (grid.cols - 6));
            if (__x < 0) {
                __x = 1;
            }

            piece = new hvdoo.tetris.Piece(__x, -1, hvdoo.tetris.util.genRandomShape(), hvdoo.tetris.util.genRandomSprite(cell.width, cell.height));
            needsNewPiece = false;
        }
    };

    var drawInactivePiece = function(p) {
        var shape = p.getShape();
        var pos = p.getPos();
        var x;
        var y;

        for (var i = 0, len = shape.map.length; i < len; i++) {
            x = i % shape.size.width;
            y = parseInt(i / shape.size.width);

            if (shape.map[i]) {
                p.render(canvas, pos.x * cell.width + x * cell.width, pos.y
                        * cell.height + y * cell.height);
            }
        }
    };

    this.draw = function(canvas) {
        var shape = piece.getShape();
        var pos = piece.getPos();

        for (var i = 0, len = shape.map.length; i < len; i++) {
            var x = i % shape.size.width;
            var y = parseInt(i / shape.size.width);

            if (shape.map[i]) {
                piece.render(canvas, pos.x * cell.width + x * cell.width, pos.y * cell.height + y * cell.height);
            }
        }

        for (i = 0, len = inactivePieces.length; i < len; i++) {
            drawInactivePiece(inactivePieces[i]);
        }
    };
};

hvdoo.tetris.Board.prototype.isValidMove = function(piece, x, y, grid, filledCells) {
    var shape = piece.getShape();
    var _map = shape.map;
    var _w = shape.size.width;
    var _h = shape.size.height;
    var _y;
    var _p;
    var _offset;
    var _vOffset = shape.size.height > 1 ? 1 : 0;

    if (x < 0) {
        return false;
    }

    if (x + _w > grid.cols) {
        return false;
    }

    if (y + _h > grid.rows) {
        return false;
    }

    for (var i = 0, len = _map.length; i < len; i++) {
        _y = parseInt(i / _w) + 1;
        _offset = (y + _y - _vOffset) * grid.cols + x;
        _p = _offset + (i % _w);

        if (filledCells[_p] && _map[i] == 1) {
            return false;
        }
    }

    return true;
};
