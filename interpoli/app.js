function main(panel, width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");

    var block = {
        w: 10,
        h: 10,
        x: 10,
        y: 10,
        vel: {
            x: 50,
            y: 10
        }
    };

    var FPS = 2;
    var tickLen = 1000 / FPS;
    var lastTime = 0;
    var deltaTime = 0;
    var keys = {};

    panel.addEventListener("keydown", function(event){
        keys[event.keyCode] = true;
    });

    panel.addEventListener("keyup", function(event){
        keys[event.keyCode] = false;
    });

    function update(time) {

        deltaTime = time - lastTime;
        lastTime = time;

        if (deltaTime) {
            if (keys[37]) {
                block.x -= block.vel.x;
            }

            if (keys[39]) {
                block.x += block.vel.x;
            }

            if (keys[38]) {
                block.y -= block.vel.x;
            }

            if (keys[40]) {
                block.y += block.vel.x;
            }
        }

        render(deltaTime / tickLen);
    }

    function render(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(block.x * time, block.y * time, block.w, block.h);
        requestAnimationFrame(update);
    }

    panel.appendChild(canvas);
    update(0);
}
