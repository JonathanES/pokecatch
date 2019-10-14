const max = Number.MAX_SAFE_INTEGER;


// let target = { row: 8, col: 25 }
// let playerpos = { row: 7, col: 20 }

export default function djikstra(playerpos, target, height, width, dispatch) {
    const visitedNodesInOrder = [];
    const grid = generateGrid(playerpos, height, width);
    playerpos.isVisited = true;
    playerpos.dist = 0;
    let unvisitedNodes = [playerpos]
    const visitedNodes = [];
    while (unvisitedNodes.length > 0) {
        unvisitedNodes.sort((a, b) => { return a.dist - b.dist });
        const cell = unvisitedNodes.shift();
        visitedNodes.push(cell);
        grid[cell.row][cell.col].isVisited = true;
        visitedNodesInOrder.push(cell);
        // setTimeout(function () { //Start the timer
        //     dispatch({ type: 'VISITED_CELL_ACTION', pos: cell })//After 1 second, set render to true
        // }, 1000)
        dispatch({ type: 'VISITED_CELL_ACTION', pos: cell })
        if (cell.row === target.row && cell.col === target.col) {
            const path = getPath(visitedNodesInOrder, playerpos);
            return {path: path};
            break;
        }
        const neighbors = updateUnvisitedNeighbors(cell, grid);
        unvisitedNodes = unvisitedNodes.concat(neighbors);
    }
}

// Driver method 
function generateGrid(playerpos, height, width) {
    let grid = [];
    for (let row = 0; row < height; row++) {
        const currentRow = [];
        for (let col = 0; col < width; col++) {
            if (row === playerpos.row && col === playerpos.col)
                currentRow.push({ row: row, col: col, dist: 0, isVisited: false });
            else
                currentRow.push({ row: row, col: col, dist: max, isVisited: false });
        }
        grid.push(currentRow);
    }
    return grid;
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.dist = node.dist + 1;
        grid[neighbor.row][neighbor.col].isVisited = true;
        neighbor.previous = node;
    }
    return unvisitedNeighbors;
}

function getUnvisitedNeighbors(node, grid) {
    let neighbors = [];
    const { col, row } = node;
    if (row > 0)
        neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1)
        neighbors.push(grid[row + 1][col]);
    if (col > 0)
        neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1)
        neighbors.push(grid[row][col + 1]);
    neighbors = neighbors.filter(neighbor => neighbor.isVisited === false);
    return neighbors;
}

function getPath(visitedNodesInOrder, playerpos) {
    let target = visitedNodesInOrder.pop();
    let prev = target.previous;
    const res = [prev, target];
    while (visitedNodesInOrder.length && prev !== playerpos) {
        let idx = visitedNodesInOrder.indexOf(prev);
        target = visitedNodesInOrder.splice(idx, 1);
        prev = target[0].previous;
        res.unshift(prev);
    }
    console.log(res);
    return res;
}

//djikstra(playerpos, target);