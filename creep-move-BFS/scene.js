var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var sizeX = 30;
var sizeY = 15;

var gridWidth = 30;
var gridHeight = 30;

// Which grid your mouse is in now
var xGrid = 0;
var yGrid = 0;



function fillGrid(x, y, color) {
    context.fillStyle = color || "#1fa";
    context.fillRect(x * (gridWidth+1), y * (gridHeight + 1), gridWidth+1, gridHeight +1);
}

var map = new Graph(sizeX, sizeY);
var walls = [[1, 7], [1, 8],
    [2, 7], [2, 8],
    [3, 7], [3, 8],
    [0,0],
    [6,2], [6,3], [6,4]];
for (i = 0; i < walls.length; i++) {
    map.walls.push(walls[i]);
}

drawWalls();

function drawWalls() {
    for (i = 0; i < map.walls.length; i++) {
        fillGrid(map.walls[i][0], map.walls[i][1], "#808080");
    }
}

var target = [0, 2];
var begin = [20, 12];

var moveState = 0;

var search1 =new BreadthFirstSearch(map, target);
var path1 = search1.findPath(begin);
drawPath(path1);


function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.strokeStyle = "#d0d0d0";
// Draw vertical lines
    for (var i = 0; i < sizeX + 1; i++) {
        context.moveTo(i * (gridWidth + 1), 0);
        context.lineTo(i * (gridWidth + 1), sizeY * (gridHeight + 1));
    }
    context.stroke();

// Draw horizontal lines
    for (i = 0; i < sizeY + 1; i++) {
        context.moveTo(0, i * gridWidth + i);
        context.lineTo(sizeX * (gridWidth + 1), i * gridWidth + i);
    }
    context.stroke();
}


function mouseDown(e) {
    // Change begin point position
    if (begin[0] === xGrid && begin[1] === yGrid) {
        moveState = 1;
    } else if (target[0] === xGrid && target[1] === yGrid) {
        moveState = 2;
    } else if (map.walls.hasArray([xGrid, yGrid])) {
        moveState = 3;      // Turn walls to blank
    } else {
        moveState = 4;      // Turn blank to walls
    }

    // Turn walls to blank
//    if (map.walls.hasArray([xGrid, yGrid])) {
//        map.walls.removeArray([xGrid, yGrid]);
//        console.log("1");
//    }
//    else {
//        map.walls.push([xGrid, yGrid]);
//        console.log("2");
//    }
//
//    search1 =new BreadthFirstSearch(map, target);
//    path1 = search1.findPath(begin);
}

function mouseUp(e) {
    moveState = 0;  // move and do nothing
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
    xGrid = Math.floor(mouseX / (gridWidth+1));
    yGrid = Math.floor(mouseY / (gridHeight+1));

    if (moveState === 0) {
        return;
    } else if(moveState === 3) {   // Turn walls to blank
        map.walls.removeArray([xGrid, yGrid]);
    } else if (moveState === 4) {
        if (!map.walls.hasArray([xGrid, yGrid])) {
            map.walls.push([xGrid, yGrid]);
        }
    }
    search1 =new BreadthFirstSearch(map, target);
    if (search1.came_from[begin[0]][ begin[1]] === null) {
        path1 = [];
    } else {
        path1 = search1.findPath(begin);
    }
    console.log(map.walls.length);
}


function drawPath(path) {

    for (i = 0; i < path.length; i++) {
        fillGrid(path[i][0], path[i][1], "#98fb98");
    }
    fillGrid(target[0], target[1], "#ee4400");
    fillGrid(begin[0], begin[1], "green");
}

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

function draw() {
    requestAnimationFrame(draw);

    drawBoard();
    if (path1 !== []) {
        drawPath(path1);
    }
    drawWalls();


}