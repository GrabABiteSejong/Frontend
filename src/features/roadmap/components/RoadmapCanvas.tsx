import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from 'reactflow';
import type { Node, Edge, Connection, NodeChange, EdgeChange } from 'reactflow';
import 'reactflow/dist/style.css';
import type { RoadmapNode, RoadmapEdge } from '../types/roadmap';

interface RoadmapCanvasProps {
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  onNodesChange?: (nodes: RoadmapNode[]) => void;
  onEdgesChange?: (edges: RoadmapEdge[]) => void;
  readOnly?: boolean;
}

const nodeTypes = {
  course: ({ data }: { data: RoadmapNode['data'] }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500">
      <div className="font-bold text-sm">{data.label}</div>
      {data.course && (
        <div className="text-xs text-gray-500">
          {data.course.code} ({data.course.credits}학점)
        </div>
      )}
      {data.semester && data.year && (
        <div className="text-xs text-gray-400 mt-1">
          {data.year}학년 {data.semester}학기
        </div>
      )}
    </div>
  ),
  milestone: ({ data }: { data: RoadmapNode['data'] }) => (
    <div className="px-4 py-2 shadow-md rounded-md bg-yellow-100 border-2 border-yellow-500">
      <div className="font-bold text-sm">{data.label}</div>
      {data.description && <div className="text-xs text-gray-600 mt-1">{data.description}</div>}
    </div>
  ),
  career: ({ data }: { data: RoadmapNode['data'] }) => (
    <div className="px-6 py-3 shadow-lg rounded-lg bg-green-100 border-2 border-green-600">
      <div className="font-bold text-base">{data.label}</div>
      {data.description && <div className="text-sm text-gray-700 mt-1">{data.description}</div>}
    </div>
  ),
};

export function RoadmapCanvas({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange,
  onEdgesChange,
  readOnly = false,
}: RoadmapCanvasProps) {
  const [nodes, , handleNodesChange] = useNodesState(
    initialNodes as Node[]
  );
  const [edges, setEdges, handleEdgesChange] = useEdgesState(
    initialEdges as Edge[]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (readOnly) return;
      const newEdges = addEdge(connection, edges);
      setEdges(newEdges);
      onEdgesChange?.(newEdges as RoadmapEdge[]);
    },
    [edges, readOnly, onEdgesChange, setEdges]
  );

  const onNodesChangeHandler = useCallback(
    (changes: NodeChange[]) => {
      handleNodesChange(changes);
      if (!readOnly && onNodesChange) {
        setTimeout(() => {
          onNodesChange(nodes as RoadmapNode[]);
        }, 0);
      }
    },
    [handleNodesChange, nodes, readOnly, onNodesChange]
  );

  const onEdgesChangeHandler = useCallback(
    (changes: EdgeChange[]) => {
      handleEdgesChange(changes);
      if (!readOnly && onEdgesChange) {
        setTimeout(() => {
          onEdgesChange(edges as RoadmapEdge[]);
        }, 0);
      }
    },
    [handleEdgesChange, edges, readOnly, onEdgesChange]
  );

  return (
    <div className="w-full h-[600px] bg-gray-50 rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
