import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import WorkflowSidebar from './WorkflowSidebar';
import NodeEditor from './NodeEditor';

// Tùy chỉnh giao diện node
const nodeTypes = {
  special: ({ data }) => (
    <div className="custom-node">
      {data.label}
    </div>
  ),
};

// Khởi tạo các node và edge ban đầu
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start', type: 'start' }, type: 'input' },
];

const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Xử lý khi click vào node để chỉnh sửa
  const onNodeClick = (_, node) => setSelectedNode(node);

  // Thêm node mới từ sidebar
  const addNode = (type, label) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label, type },
      type: 'special',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Cập nhật node sau khi chỉnh sửa
  const updateNode = (id, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...newData } } : node))
    );
    setSelectedNode(null);
  };

  // Lưu workflow vào localStorage
  const saveWorkflow = () => {
    const workflow = { nodes, edges };
    localStorage.setItem('workflow', JSON.stringify(workflow));
    alert('Workflow saved!');
  };

  // Tải workflow từ localStorage
  const loadWorkflow = () => {
    const savedWorkflow = localStorage.getItem('workflow');
    if (savedWorkflow) {
      const { nodes: savedNodes, edges: savedEdges } = JSON.parse(savedWorkflow);
      setNodes(savedNodes);
      setEdges(savedEdges);
    }
  };

  return (
    <div className={`app-container${selectedNode ? ' has-editor' : ''}`}>
      <WorkflowSidebar addNode={addNode} saveWorkflow={saveWorkflow} loadWorkflow={loadWorkflow} />
      <div className={`workflow-main-area${selectedNode ? '' : ' full'}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      {selectedNode && (
        <div className="workflow-rightbar">
          <NodeEditor
            node={selectedNode}
            onSave={updateNode}
            onClose={() => setSelectedNode(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;