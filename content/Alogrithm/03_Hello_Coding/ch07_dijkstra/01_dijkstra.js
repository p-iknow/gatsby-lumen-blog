const graph = {};

// start point 
graph.start = {};

// neighbor node,  weight add
graph.start.a = 6;
graph.start.b = 2;

// Object.keys(obj), method to get object's key  
graph.a = {fin : 1};
graph.b = { a : 3, fin : 5};
graph.fin = {};

// hash table to add each node's cost
const costs = {};
costs.a = 6;
costs.b = 2;
costs.fin = Infinity;

//has table to represent node's parents
const parents = {};
parents.a = "start";
parents.b = "start";
parents.fin = null;

//Array to record process history
const processed = [];

//delcare findLowestCostNode function
function findLowestCostNode(costs){
    let lowestCost = Infinity;
    let lowestCostNode = null;
    for( let node in costs) {
        let cost = costs[node];
        if (cost < lowestCost && !(processed.includes(node))) {
            lowestCost = cost;
            lowestCostNode = node;
        }
    }
    return lowestCostNode;
}


// prcess start
let node = findLowestCostNode(costs);  // 아직 처리하지 않은 가장 싼 정점을 찾는다

while(node) {  // 모든 정점을 처리하면 반목문이 종료 된다. 
    let cost = costs[node], neighbors = graph[node]; 
    for( let n in neighbors) {  // 모든 이웃에 대해 반복한다. 
        let newCost = cost + neighbors[n]; 
        if (costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;
        }
    }
    processed.push(node);
    node = findLowestCostNode(costs);
}