width = 6.6;
var Graph = function(w, h) {
    this.width = w;
    this.height = h;

    this.walls = [];

    console.log("-----:", this.width);
};

/**
 * @param id: [x, y]
 * @returns {boolean}
 */
Graph.prototype.inBounds = function(id) {
    //var that = this;
    //console.log("this width:", this.width);
    //console.log("that width:", that.width);
    //console.log("that wall length:", this.walls.length);

    //console.log(this.width);
    return (0 <= id[0] && id[0]< this.width &&
        0 <= id[1] && id[1] < this.height);

    //console.log(this.width);
    //console.log(width);

    //var that = this;
    //console.log(that.width);
    //return (0 <= id[0] && id[0]< that.width &&
    //0 <= id[1] && id[1] < that.height);
};

Graph.prototype.passable = function(id) {

    // console.log("******:", this.width);
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
       // console.log(id);
        var results = [[x+1, y], [x,y-1], [x-1,y], [x,y+1]];
        //console.log(results[0]);

        results = results.filter(this.passable);
        results = results.filter(this.inBounds);

        return results;
    };

Graph.prototype.print = function() {
        var info = "";
        for(var i = 0; i < this.width; i++) {
            for(var j = 0; j < this.height; j++) {
                if (this.walls.hasArray([i,j])) {
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

var Queue = function() {
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
};

var BreadthFirstSearch = function(graph, start) {


    // TODO: What the hell!!!
    this.width = graph.width;
    this.height = graph.height;

    var frontier = new Queue;
    frontier.put(start);
    var visited = [start];
    //console.log(visited);
    //visited[start] = true;
    var current;
    var next = [];

    while (frontier.elements.length !== 0) {
        current = frontier.get();
        //graph(current)
        //console.log("Visiting:" + this.current);

        console.log(current[0], current[1]);
        //console.log(frontier.length);

        next = graph.neighbors(current);
        //console.log(next.length);
        for (var i = 0; i < next.length; i++) {
            //console.log(visited.hasArray(next[i]));
            //console.log("visited:"+visited);
            //console.log("next["+ i +"]" +next[i]);
            if (! visited.hasArray(next[i])) {
                frontier.put(next[i]);
                //alert("___");
                //console.log(frontier);
                visited.push(next[i]);
            }
        }
    }
};

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

BreadthFirstSearch(g, [1,1]);
