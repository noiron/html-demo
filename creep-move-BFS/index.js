function Graph(w, h) {
    this.width = w;
    this.height = h;
    this.walls = [];

    console.log("-----:", this.width);
}

/**
 * @param id: [x, y]
 * @returns {boolean}
 */
Graph.prototype.inBounds = function(id) {

    return (0 <= id[0] && id[0]< this.width &&
        0 <= id[1] && id[1] < this.height);
};

Graph.prototype.passable = function(id) {

    for (var i = 0; i < this.walls.length; i++) {
        if (this.walls[i][0] === id[0] && this.walls[i][1] === id[1]) {
            return false;
        }
    }
    return true;
};

Graph.prototype.neighbors = function(id) {
        var x = id[0];
        var y = id[1];
        var results = [[x+1, y], [x,y-1], [x-1,y], [x,y+1]];

        results = results.filter(this.passable, this);
        results = results.filter(this.inBounds, this);
        return results;
    };

Graph.prototype.print = function() {
    var info = "";
    for (var j = 0; j < this.height; j++) {
        for (var i = 0; i < this.width; i++) {
            if (this.walls.hasArray([i, j])) {
                info += "#";
            }
            else {
                info += ".";
            }
        }
        info += "\n";
    }
    console.log(info);
};

function Queue() {
    this.elements = [];

    this.empty = function() {
        return elements.length === 0;
    };

    this.put = function(x) {
        this.elements.push(x);
    };

    this.get = function() {
        return this.elements.shift();
    };
}

function BreadthFirstSearch(graph, start) {

    var frontier = new Queue;
    frontier.put(start);

    var visited = [start];

    this.came_from = [];
    this.came_from[start] = null;

    var distance = [];
    //distance[s]

    var current;
    var next = [];
    console.log(frontier.elements.length);

    while (frontier.elements.length !== 0) {
        current = frontier.get();

        console.log(current[0], current[1]);

        next = graph.neighbors(current);
        for (var i = 0; i < next.length; i++) {

            if (! visited.hasArray(next[i])) {
                frontier.put(next[i]);
                visited.push(next[i]);
            }
        }
    }
}

Array.prototype.hasArray = function(arr) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][0] === arr[0] && this[i][1] === arr[1]) {
            return true;
        }
    }
    return false;
};

g = new Graph(10, 10);
var walls = [[1, 7], [1, 8], [2, 7], [2, 8], [3, 7], [3, 8], [0,0]];
for (var i = 0; i < walls.length; i++) {
    g.walls.push(walls[i]);
}
g.print();

var bfs =new BreadthFirstSearch(g, [1,1]);
