import { useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

function TreeView({ nodes, edges, highlightedNode }) {
  const [nds, setNds, onNodesChg] = useNodesState(nodes);
  const [edgs, setEdgs, onEdgesChg] = useEdgesState(edges);
  const { setCenter } = useReactFlow();

  // tried solid lines first but dotted looks better
  // useEffect(() => {
  //   const styledEdges = edges.map(edge => ({
  //     ...edge,
  //     type: 'default',
  //     style: {
  //       stroke: '#000000',
  //       strokeWidth: 3
  //     }
  //   }));
  //   setNds(nodes);
  //   setEdgs(styledEdges);
  // }, [nodes, edges]);

  useEffect(() => {
    const styledEdgs = edges.map((e) => ({
      ...e,
      type: "default",
      style: {
        stroke: "#94a3b8",
        strokeWidth: 2,
        strokeDasharray: "5,5",
      },
    }));
    setNds(nodes);
    setEdgs(styledEdgs);
  }, [nodes, edges]);

  useEffect(() => {
    if (highlightedNode) {
      const updatedNds = nds.map((n) => ({
        ...n,
        style: {
          ...n.style,
          border: n.id === highlightedNode ? "3px solid #ff6b6b" : undefined,
          boxShadow:
            n.id === highlightedNode
              ? "0 0 20px rgba(255,107,107,0.5)"
              : undefined,
        },
      }));
      setNds(updatedNds);

      const node = nds.find((n) => n.id === highlightedNode);
      if (node) {
        setCenter(node.position.x + 60, node.position.y + 20, {
          zoom: 1.5,
          duration: 800,
        });
      }
    }
  }, [highlightedNode]);

  const types = {
    object: ObjectNode,
    array: ArrayNode,
    primitive: PrimitiveNode,
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-gray-300 dark:border-gray-700"
      style={{ height: "700px" }}
    >
      <ReactFlow
        nodes={nds}
        edges={edgs}
        onNodesChange={onNodesChg}
        onEdgesChange={onEdgesChg}
        nodeTypes={types}
        fitView
      >
        <Controls />
        <Background color="#e5e7eb" gap={20} />
      </ReactFlow>
    </div>
  );
}

function ObjectNode({ data }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-blue-500 text-white border-2 border-blue-600 text-sm shadow-md">
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function ArrayNode({ data }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-green-500 text-white border-2 border-green-600 text-sm shadow-md">
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function PrimitiveNode({ data }) {
  return (
    <div className="px-4 py-2 rounded-lg bg-orange-400 text-white border-2 border-orange-500 text-sm shadow-md">
      <Handle type="target" position={Position.Top} />
      {data.value ? `${data.label}: ${data.value}` : data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default TreeView;