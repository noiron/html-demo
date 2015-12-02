var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var sizeX = 30;
var sizeY = 15;

var gridWidth = 30;
var gridHeight = 30;

context.clearRect(0, 0, canvas.width, canvas.height);

function fillGrid(x, y, color) {
    context.fillStyle = color || "#1fa";
    context.fillRect(x * (gridWidth+1), y * (gridHeight + 1), gridWidth+1, gridHeight +1);
}

var map = new Graph(10, 10);
var walls = [[1, 7], [1, 8], [2, 7], [2, 8], [3, 7], [3, 8], [0,0],[6,2],
    [6,3], [6,4]];
for (i = 0; i < walls.length; i++) {
    map.walls.push(walls[i]);
}

for (i = 0; i < map.walls.length; i++) {
    fillGrid(map.walls[i][0], map.walls[i][1], "#808080");
}

fillGrid(0, 2, "green");
var search1 =new BreadthFirstSearch(map, [0,2]);
var path1 = search1.findPath([3, 9]);
for (i = 0; i < path1.length; i++) {
    fillGrid(path1[i][0], path1[i][1], "#98fb98");
}



context.beginPath();
context.strokeStyle = "#d0d0d0";
// Draw vertical lines
for (var i = 0; i < sizeX+1; i++) {
    context.moveTo(i * (gridWidth + 1), 0);
    context.lineTo(i * (gridWidth + 1), sizeY*(gridHeight+1));
}
context.stroke();

// Draw horizontal lines
for (i = 0; i < sizeY+1; i++) {
    context.moveTo(0, i * gridWidth + i);
    context.lineTo(sizeX*(gridWidth+1), i * gridWidth + i);
}
context.stroke();