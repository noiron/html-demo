size = 6;

map = [];

var canvas = document.getElementById("drawing");
var context = canvas.getContext("2d");

var gridWidth, gridHeight;

gridWidth = Math.floor((canvas.width -size) / size);
gridHeight = Math.floor((canvas.width -size) / size);

for (var x = 0; x < size; x++) {
    var row = [];
    for (var y = 0; y < size; y++) {
        row.push(new GraphNode(x, y, 0));
    }
    map.push(row);
}

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

var start = new GraphNode(1, 1, 0);
var end = new GraphNode(9, 8, 0);
console.log(end.pos.x, end.pos.y);
var path = [];
path = astar.search(map, start, end);

fillGrid(start.x, start.y, "red");
fillGrid(end.x, end.y, "red");

for (i = 0; i < path.length; i++) {
    fillGrid(path[i].x, path[i].y);
}

function fillGrid(x, y, color) {
    context.fillStyle = color || "#1fa";
    context.fillRect(x * (gridWidth+1) + 1, y * (gridHeight + 1) + 1, gridWidth-1, gridHeight-1 );
}
