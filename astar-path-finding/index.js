var size = 15;

var map = [];
var blocks = [];
var wallFrequency = 0.15;

var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");

var gridWidth = Math.floor((canvas.width -size) / size);
var gridHeight = Math.floor((canvas.width -size) / size);

var mapHeight = size*(gridHeight+1);
var mapWidth = size*(gridWidth+1);

var xSelect = 0, ySelect = 0;

var blockReady = false;
var beginSearch = true;
var pathChanged = true;

var start;
var end;

function init() {

    for (var x = 0; x < size; x++) {
        var row = [];
        for (var y = 0; y < size; y++) {
            var newGrid = new GraphNode(x, y, 0);
            row.push(newGrid);

            if (Math.random() <  wallFrequency ) {
                row[y].type = 1;
                blocks.push(newGrid);
            }
        }
        map.push(row);
    }

    start = map[0][0];
    end = map[Math.floor(Math.random()*size)][Math.floor(Math.random()*size)];
    start.type = 0;
    end.type = 0;
    if (blocks.findGraphNode(start)) {
        blocks.removeGraphNode(start);
    }
    if (blocks.findGraphNode(end)) {
        blocks.removeGraphNode(end);
    }

    var path = astar.search(map, start, end);

}

init();

requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/30);
        };
})();
requestAnimationFrame(draw);

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
    if(blockReady) {
        if (map[xSelect][ySelect].type === 0) {
            map[xSelect][ySelect].type = 1;

            blocks.push(map[xSelect][ySelect]);
        } else if(map[xSelect][ySelect].type === 1) {
            if (blocks.findGraphNode(map[xSelect][ySelect])) {
                blocks.removeGraphNode(map[xSelect][ySelect]);
                map[xSelect][ySelect].type = 0;
            }
        }
        //if (newBlock in path) {
            pathChanged = true;
        //}
        return false;
    }

    else if(beginSearch) {
        start = end;
        end = map[xSelect][ySelect];
        start.type = 0;
        end.type = 0;
        path = astar.search(map, start, end);
        pathChanged = false;
    }
}

function placeBlock() {
    blockReady = document.getElementById("radio1").checked;
    beginSearch = document.getElementById("radio2").checked;
}

function draw() {
    requestAnimationFrame(draw);

    drawBoard();

    if (pathChanged) {
        path = astar.search(map, start, end);
        pathChanged = false;
    }

    drawPath();

    if (blockReady) {
        fillGrid(xSelect, ySelect, "gray");
    } else if(beginSearch) {
        fillGrid(xSelect, ySelect, "#944");
    }

    drawBlocks();
}

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    // Draw vertical lines
    for (var i = 0; i < size+1; i++) {
        context.moveTo(i * (gridWidth + 1), 0);
        context.lineTo(i * (gridWidth + 1), mapHeight);
    }

    // Draw horizontal lines
    for (i = 0; i < size+1; i++) {
        context.moveTo(0, i * gridWidth + i);
        context.lineTo(mapWidth, i * gridWidth + i);
    }
    context.stroke();
}

function generateMap() {
    // Clear all blocks
    while (blocks.length !== 0) {
        blocks[0].type = 0;
        blocks.removeGraphNode(blocks[0]);
    }
    // Generate new blocks
    for (var x = 0; x < size; x++) {
        for (var y = 0; y < size; y++) {
            if (Math.random() < wallFrequency) {
                map[x][y].type = 1;
                blocks.push(map[x][y]);
            }
        }
    }

    start = map[0][0];

    // end shouldn't equal to start
    do {
        var randX = Math.floor(Math.random() * size);
        var randY = Math.floor(Math.random() * size);
    }
    while (randX === start.x && randY === start.y);
    end = map[randX][randY];

    start.type = 0;
    end.type = 0;
    if (blocks.findGraphNode(start)) {
        blocks.removeGraphNode(start);
    }
    if (blocks.findGraphNode(end)) {
        blocks.removeGraphNode(end);
    }
    pathChanged = true;
}


