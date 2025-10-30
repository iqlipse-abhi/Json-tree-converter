import dagre from 'dagre';

export function parseJsonToNodes(data) {
  const nodes = [];
  const edges = [];
  let nId = 0;
  let eId = 0;

  function traverse(obj, parentId, key) {
    const currId = `node-${nId++}`;
    
    if (obj === null) {
      nodes.push({
        id: currId,
        data: { label: key, value: 'null' },
        position: { x: 0, y: 0 },
        type: 'primitive',
      });
    } else if (Array.isArray(obj)) {
      nodes.push({
        id: currId,
        data: { label: key },
        position: { x: 0, y: 0 },
        type: 'array',
      });
      
      if (parentId) {
        edges.push({
          id: `e${eId++}`,
          source: parentId,
          target: currId,
        });
      }
      
      obj.forEach((item, idx) => {
        traverse(item, currId, `[${idx}]`);
      });
    } else if (typeof obj === 'object') {
      nodes.push({
        id: currId,
        data: { label: key },
        position: { x: 0, y: 0 },
        type: 'object',
      });
      
      if (parentId) {
        edges.push({
          id: `e${eId++}`,
          source: parentId,
          target: currId,
        });
      }
      
      Object.keys(obj).forEach((k) => {
        traverse(obj[k], currId, k);
      });
    } else {
      nodes.push({
        id: currId,
        data: { label: key, value: String(obj) },
        position: { x: 0, y: 0 },
        type: 'primitive',
      });
      
      if (parentId) {
        edges.push({
          id: `e${eId++}`,
          source: parentId,
          target: currId,
        });
      }
    }
    
    return currId;
  }

  if (typeof data === 'object' && !Array.isArray(data)) {
    Object.keys(data).forEach((key) => {
      traverse(data[key], null, key);
    });
  } else {
    traverse(data, null, 'root');
  }
  
  const layouted = getLayoutedElements(nodes, edges);
  
  return { nodes: layouted, edges };
}

function getLayoutedElements(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  // g.setGraph({ rankdir: 'LR', nodesep: 100, ranksep: 150 });
  g.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 100 });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 120, height: 40 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return nodes.map((node) => {
    const nodePos = g.node(node.id);
    // const x = nodePos.x - 75;
    // const y = nodePos.y - 25;
    return {
      ...node,
      position: {
        x: nodePos.x - 60,
        y: nodePos.y - 20,
      },
    };
  });
}