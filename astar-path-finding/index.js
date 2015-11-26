var size = 20;

var map = [];
var blocks = [];

var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");

var gridWidth = Math.floor((canvas.width -size) / size);
var gridHeight = Math.floor((canvas.width -size) / size);

var xSelect = 0, ySelect = 0;

var blockReady = false;
var pathChanged = true;


function init() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw vertical lines
    for (var i = 0; i < size+1; i++) {
        context.moveTo(i * (gridWidth + 1), 0);
        context.lineTo(i * (gridWidth + 1), size*(gridHeight+1));
    }
    context.stroke();

    // Draw horizontal lines
    for (i = 0; i < size+1; i++) {
        context.moveTo(0, i * gridWidth + i);
        context.lineTo(size*(gridWidth+1), i * gridWidth + i);
    }
    context.stroke();

    // TODO: addRandomBlocks();
}


for (var x = 0; x < size; x++) {
    var row = [];
    for (var y = 0; y < size; y++) {
        row.push(new GraphNode(x, y, 0));
    }
    map.push(row);
}

init();

requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);

        };
})();
requestAnimFrame(draw);

var start = new GraphNode(0, 0, 0);
var end = new GraphNode(Math.floor(Math.random()*size), Math.floor(Math.random()*size), 0);
console.log(end.pos.x, end.pos.y);
var path = astar.search(map, start, end);


function drawPath() {
    fillGrid(start.x, start.y, "red");

    // Color the path
    for (i = 0; i < path.length; i++) {
        fillGrid(path[i].x, path[i].y);
    }

    fillGrid(end.x, end.y, "pink");
}

function drawBlocks() {
    for (i = 0; i < blocks.length; i++) {
        fillGrid(blocks[i].x, blocks[i].y, "black");
    }
}

function fillGrid(x, y, color) {
    context.fillStyle = color || "#1fa";
    context.fillRect(x * (gridWidth+1) + 1, y * (gridHeight + 1) + 1, gridWidth-1, gridHeight-1 );
}

function mouseMove(e) {
    var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }

    // Calculate which grid mouse is in
    xSelect = Math.floor(mouseX / (gridWidth+1));
    ySelect = Math.floor(mouseY / (gridHeight+1));
}

function onClick(e) {
    if(blockReady == true) {
        map[xSelect][ySelect].type = 1;
        // blockReady = false;
        var newBlock = new GraphNode(xSelect, ySelect, 1);
        blocks.push(newBlock);
        //if (newBlock in path) {
            pathChanged = true;
        //}
        return false;
    }
}

function placeBlock() {
    blockReady = ! blockReady;
}

function draw() {
    requestAnimFrame(draw);

    init();

    // TODO: only when path changed, search the path again
    if (pathChanged) {
        path = astar.search(map, start, end);
        pathChanged = false;
    }
    drawPath();
    drawBlocks();
    if (blockReady == true) {
        fillGrid(xSelect, ySelect, "black");
    }


}


