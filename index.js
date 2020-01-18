const data = {
  graph: {
    start: {
      a: 5,
      b: 2
    },
    a: {
      c: 4,
      d: 2
    },
    b: {
      a: 8,
      d: 7
    },
    c: {
      end: 3,
      d: 6
    },
    d: {
      end: 1
    },
    end: null
  },
  costs: {
    a: 5,
    b: 2,
    c: Infinity,
    d: Infinity,
    end: Infinity
  },
  parents: {
    a: 'start',
    b: 'start',
    c: null,
    d: null,
    end: null
  }
};

const findShortestPath = ({graph, costs, parents}) => {
  const costsTrack = {...costs};
  const parentsTrack = {...parents};
  const processedNodes = [];
  let node = findLowestCostNode(costs, processedNodes);
  while(node) {
    const nodeCost = costsTrack[node];
    const neighbors = graph[node] || [];
    for (const [n, v] of Object.entries(neighbors)) {
      const newCost = nodeCost + v;
      if (costsTrack[n] > newCost) {
          costsTrack[n] = newCost;
          parentsTrack[n] = node;
      }
    } 
    processedNodes.push(node)
    node = findLowestCostNode(costsTrack, processedNodes)
  }
  return createPathFromParents(parentsTrack);
}

const findLowestCostNode = (values, exist) => {
  let lowest = Infinity;
  let lowestNode = null;
  for (const [n, v] of Object.entries(values)) {
    if (v < lowest && !exist.includes(n)) {
      lowest = v;
      lowestNode = n;
    }
  }
  return lowestNode;
}

const createPathFromParents = (parents) => {
  const result = [];
  let node = parents['end'];
  while(node) {
    result.unshift(node);
    node = parents[node];
  }
  return [...result, 'end']
}

console.log(findShortestPath(data))
