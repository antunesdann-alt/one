"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { 
  ReactFlow, Background, useNodesState, useEdgesState, addEdge, 
  Connection, BackgroundVariant, useReactFlow, ReactFlowProvider, 
  NodeChange, applyNodeChanges, useOnSelectionChange, Node 
} from "@xyflow/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCw, AlertTriangle } from "lucide-react";
import "@xyflow/react/dist/style.css";

import { VideoNode } from "./nodes/VideoNode"; 
import { CampaignNode } from "./nodes/CampaignNode";
import { BidNode } from "./nodes/BidNode";
import { InvestmentNode } from "./nodes/InvestmentNode";
import { ChannelNode } from "./nodes/ChannelNode";
import { QuizNode } from "./nodes/QuizNode";
import { SegmentNode } from "./nodes/SegmentNode";
import { SpotNode } from "./nodes/SpotNode";
import { DateNode } from "./nodes/DateNode";
import { TimeNode } from "./nodes/TimeNode";

import PropertiesPanel from "./PropertiesPanel";
import { FlowToolbar } from "./FlowToolbar"; 

const FLOW_KEY = 'social-one-flow-v31';

const nodeTypes = {
  campaignNode: CampaignNode,
  bidNode: BidNode,
  investmentNode: InvestmentNode,
  mediaVideoNode: VideoNode,
  mediaImageNode: VideoNode,
  mediaCarouselNode: VideoNode, 
  channelNode: ChannelNode,
  quizNode: QuizNode,
  segmentNode: SegmentNode,
  spotNode: SpotNode,
  dateNode: DateNode,
  timeNode: TimeNode
};

const defaultNodes = [{ 
  id: 'master-1', 
  type: 'campaignNode', 
  position: { x: 100, y: 100 }, 
  data: { label: 'Nova Campanha', budget: 0, balance: 0, usedBudget: 124.50, allocatedBudget: 0, orphans: 0, active: false } 
}];

function FlowEditorInternal() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, getNodes, getEdges, fitView } = useReactFlow(); 
  
  const [nodes, setNodes] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedNodesList, setSelectedNodesList] = useState<Node[]>([]);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  
  // MOTOR DE HISTÓRICO BLINDADO (Substitui o hook externo)
  const historyState = useRef({ past: [] as any[], future: [] as any[] });
  const [historyLen, setHistoryLen] = useState({ past: 0, future: 0 });
  const isHistoryAction = useRef(false);
  
  // ÁREA DE TRANSFERÊNCIA (Para CTRL+C / CTRL+V)
  const clipboard = useRef({ nodes: [] as Node[], edges: [] as any[] });

  const takeSnapshot = useCallback(() => {
      historyState.current.past.push({ nodes: getNodes(), edges: getEdges() });
      if (historyState.current.past.length > 50) historyState.current.past.shift();
      historyState.current.future = [];
      setHistoryLen({ past: historyState.current.past.length, future: 0 });
  }, [getNodes, getEdges]);

  const performUndo = useCallback(() => {
      if (historyState.current.past.length === 0) return;
      const previous = historyState.current.past.pop();
      historyState.current.future.push({ nodes: getNodes(), edges: getEdges() });
      setHistoryLen({ past: historyState.current.past.length, future: historyState.current.future.length });
      
      isHistoryAction.current = true;
      setNodes([...previous.nodes]);
      setEdges([...previous.edges]);
      setTimeout(() => { isHistoryAction.current = false; }, 150);
  }, [getNodes, getEdges, setNodes, setEdges]);

  const performRedo = useCallback(() => {
      if (historyState.current.future.length === 0) return;
      const next = historyState.current.future.pop();
      historyState.current.past.push({ nodes: getNodes(), edges: getEdges() });
      setHistoryLen({ past: historyState.current.past.length, future: historyState.current.future.length });
      
      isHistoryAction.current = true;
      setNodes([...next.nodes]);
      setEdges([...next.edges]);
      setTimeout(() => { isHistoryAction.current = false; }, 150);
  }, [getNodes, getEdges, setNodes, setEdges]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodesList([...nodes]);
      setSelectedNode(nodes.length === 1 ? nodes[0] : null);
    },
  });

  useEffect(() => {
    const savedFlow = localStorage.getItem(FLOW_KEY);
    if (savedFlow) { 
      try { 
        const { nodes: sN, edges: sE } = JSON.parse(savedFlow); 
        setNodes(Array.isArray(sN) ? sN : defaultNodes); 
        setEdges(Array.isArray(sE) ? sE : []); 
      } catch (e) {} 
    }
  }, [setNodes, setEdges]);

  useEffect(() => {
    if (autosaveEnabled) {
        const timer = setTimeout(() => { 
          if (nodes && nodes.length > 0) localStorage.setItem(FLOW_KEY, JSON.stringify({ nodes, edges }));
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [nodes, edges, autosaveEnabled]);

  const onNodesChangeCustom = useCallback((changes: NodeChange[]) => { 
      setNodes((nds) => applyNodeChanges(changes, nds)); 
  }, [setNodes]);

  const onNodeDragStart = useCallback(() => {
      if (!isHistoryAction.current) takeSnapshot();
  }, [takeSnapshot]);
  
  const onSelectionDragStop = useCallback(() => {
      takeSnapshot();
  }, [takeSnapshot]);

  const isValidConnection = useCallback((connection: Connection) => {
      if (connection.source === connection.target) return false;
      const currentNodes = getNodes();
      const sourceNode = currentNodes.find(n => n.id === connection.source);
      const targetNode = currentNodes.find(n => n.id === connection.target);
      
      if (!sourceNode || !targetNode) return false;

      if (sourceNode.type === 'channelNode' && targetNode.type === 'channelNode') return false;

      if (sourceNode.type === 'spotNode' && targetNode.type === 'channelNode' && targetNode.data?.channelType !== 'music') return false;
      if (targetNode.type === 'spotNode' && sourceNode.type === 'channelNode' && sourceNode.data?.channelType !== 'music') return false;

      const isStaticMedia = (type: string) => ['mediaImageNode', 'imageNode', 'mediaCarouselNode', 'carouselNode'].includes(type);
      const isVideoChannel = (node: any) => node.type === 'channelNode' && ['reels', 'tube'].includes(node.data?.channelType as string);
      
      if (isStaticMedia(sourceNode.type) && isVideoChannel(targetNode)) return false;
      if (isVideoChannel(sourceNode) && isStaticMedia(targetNode.type)) return false;
      
      return true;
  }, [getNodes]);

  const onConnect = useCallback((params: Connection) => { 
      if (!isValidConnection(params)) return;
      const exists = edges.some(e => 
          e.source === params.source && 
          e.target === params.target && 
          e.sourceHandle === params.sourceHandle && 
          e.targetHandle === params.targetHandle
      );
      if (exists) return;
      
      takeSnapshot(); 
      setEdges((eds) => addEdge(params, eds)); 
  }, [setEdges, takeSnapshot, edges, isValidConnection]);

  const onNodeDataChange = useCallback((id: string, data: any) => { 
      setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...data } } : n)); 
      setSelectedNode((prev: any) => prev?.id === id ? { ...prev, data: { ...prev.data, ...data } } : prev); 
  }, [setNodes]);

  const onDrop = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow/type');
      if (!type) return;
      if (type === 'campaignNode' && nodes.some(n => n.type === 'campaignNode')) { alert("Apenas uma Campanha Mestra permitida."); return; }
      
      takeSnapshot();
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const label = event.dataTransfer.getData('application/reactflow/label');
      const dataString = event.dataTransfer.getData('application/reactflow/data');
      let extraData = {}; 
      try { if (dataString) extraData = JSON.parse(dataString); } catch(e) {}
      
      const baseData = { label, value: 0, isAd: false, frequency: 3, ...extraData }; 
      if (label.includes('Ad') || label.includes('AD')) baseData.isAd = true;
      
      setNodes((nds) => nds.concat({ id: `${type}-${Date.now()}`, type, position, data: baseData }));
  }, [screenToFlowPosition, setNodes, nodes, takeSnapshot]);

  // SISTEMA DE DUPLICAÇÃO E ATALHOS GERAIS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) return;
      
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;

      // Desfazer (Ctrl+Z)
      if (ctrl && key === 'z' && !e.shiftKey) { e.preventDefault(); performUndo(); return; }
      // Refazer (Ctrl+Y ou Ctrl+Shift+Z)
      if (ctrl && (key === 'y' || (key === 'z' && e.shiftKey))) { e.preventDefault(); performRedo(); return; }

      // COPIAR (Ctrl+C)
      if (ctrl && key === 'c') {
          const sNodes = getNodes().filter(n => n.selected);
          if (!sNodes.length) return;
          const sNodeIds = new Set(sNodes.map(n => n.id));
          const sEdges = getEdges().filter(edge => sNodeIds.has(edge.source) && sNodeIds.has(edge.target));
          clipboard.current = { nodes: sNodes, edges: sEdges };
      }

      // COLAR (Ctrl+V) ou DUPLICAR (Ctrl+D)
      if (ctrl && (key === 'v' || key === 'd')) {
          if (key === 'd') {
              e.preventDefault(); // Impede o navegador de salvar nos favoritos
              const sNodes = getNodes().filter(n => n.selected);
              if (!sNodes.length) return;
              const sNodeIds = new Set(sNodes.map(n => n.id));
              const sEdges = getEdges().filter(edge => sNodeIds.has(edge.source) && sNodeIds.has(edge.target));
              clipboard.current = { nodes: sNodes, edges: sEdges };
          }
          
          if (!clipboard.current.nodes.length) return;
          takeSnapshot();
          
          const idMap = new Map();
          const newNodes = clipboard.current.nodes.map(node => {
              const newId = `${node.type}-${Date.now()}-${Math.floor(Math.random()*1000)}`;
              idMap.set(node.id, newId);
              return { ...node, id: newId, position: { x: node.position.x + 50, y: node.position.y + 50 }, selected: true };
          });
          
          const newEdges = clipboard.current.edges.map(edge => ({
              ...edge,
              id: `edge-${Date.now()}-${Math.floor(Math.random()*1000)}`,
              source: idMap.get(edge.source),
              target: idMap.get(edge.target),
              selected: true
          }));
          
          setNodes(nds => nds.map(n => ({...n, selected: false})).concat(newNodes));
          setEdges(eds => eds.map(edge => ({...edge, selected: false})).concat(newEdges));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [performUndo, performRedo, getNodes, getEdges, setNodes, setEdges, takeSnapshot]);

  const alignNodes = (mode: 'left' | 'center-h' | 'right' | 'top' | 'center-v' | 'bottom') => {
    if (selectedNodesList.length < 2) return;
    takeSnapshot();
    const selected = getNodes().filter(n => n.selected);
    let target = 0;
    switch (mode) {
        case 'left': target = Math.min(...selected.map(n => n.position.x)); break;
        case 'center-h': target = (Math.min(...selected.map(n => n.position.x)) + Math.max(...selected.map(n => n.position.x + (n.measured?.width || 0)))) / 2; break;
        case 'right': target = Math.max(...selected.map(n => n.position.x + (n.measured?.width || 0))); break;
        case 'top': target = Math.min(...selected.map(n => n.position.y)); break;
        case 'center-v': target = (Math.min(...selected.map(n => n.position.y)) + Math.max(...selected.map(n => n.position.y + (n.measured?.height || 0)))) / 2; break;
        case 'bottom': target = Math.max(...selected.map(n => n.position.y + (n.measured?.height || 0))); break;
    }
    setNodes(nds => nds.map(n => {
        if (!n.selected) return n;
        const pos = { ...n.position };
        if (mode === 'left') pos.x = target;
        if (mode === 'center-h') pos.x = target - (n.measured?.width || 0)/2;
        if (mode === 'right') pos.x = target - (n.measured?.width || 0);
        if (mode === 'top') pos.y = target;
        if (mode === 'center-v') pos.y = target - (n.measured?.height || 0)/2;
        if (mode === 'bottom') pos.y = target - (n.measured?.height || 0);
        return { ...n, position: pos };
    }));
  };

  const handleReset = () => { if (confirm("Resetar o fluxo?")) { localStorage.removeItem(FLOW_KEY); window.location.reload(); } };

  useEffect(() => {
    if (!nodes || !Array.isArray(nodes)) return;
    const campaignNode = nodes.find(n => n.type === 'campaignNode');
    const investmentNodes = nodes.filter(n => n.type === 'investmentNode');
    if (!campaignNode) return;
    
    const connectedNodeIds = new Set<string>([campaignNode.id]);
    const queue = [campaignNode.id];
    while (queue.length > 0) {
        const currentId = queue.shift()!;
        const relatedEdges = edges.filter(e => e.source === currentId || e.target === currentId);
        relatedEdges.forEach(edge => {
            const neighborId = edge.source === currentId ? edge.target : edge.source;
            if (!connectedNodeIds.has(neighborId)) { connectedNodeIds.add(neighborId); queue.push(neighborId); }
        });
    }
    
    const validInvestments = investmentNodes.filter(node => connectedNodeIds.has(node.id));
    const orphansCount = investmentNodes.length - validInvestments.length;
    const totalAllocated = validInvestments.reduce((acc, node) => acc + (Number(node.data.value) || 0), 0);
    
    if (campaignNode.data.allocatedBudget !== totalAllocated || campaignNode.data.orphans !== orphansCount) {
        setNodes((nds) => nds.map((n) => n.id === campaignNode.id 
          ? { ...n, data: { ...n.data, allocatedBudget: totalAllocated, orphans: orphansCount } } 
          : n));
    }
  }, [nodes, edges, setNodes]);

  // CSS DINÂMICO DOS BULLETS CONECTADOS
  const getConnectedStyles = () => {
      return edges.map(e => {
          const sSelector = e.sourceHandle 
              ? `.react-flow__node[data-id="${e.source}"] .react-flow__handle.source[data-handleid="${e.sourceHandle}"]`
              : `.react-flow__node[data-id="${e.source}"] .react-flow__handle.source:not([data-handleid])`;
          const tSelector = e.targetHandle 
              ? `.react-flow__node[data-id="${e.target}"] .react-flow__handle.target[data-handleid="${e.targetHandle}"]`
              : `.react-flow__node[data-id="${e.target}"] .react-flow__handle.target:not([data-handleid])`;
          
          return `${sSelector}, ${tSelector} { opacity: 1 !important; visibility: visible !important; }`;
      }).join('\n');
  };

  return (
    <div className="h-full w-full bg-zinc-950 relative" ref={reactFlowWrapper}>
      
      {/* MAGIA GLOBAL: O React insere uma tag de estilo imortal para todo bullet que possuir um cabo ligado */}
      <style>{getConnectedStyles()}</style>

      <ReactFlow 
        nodes={nodes} edges={edges} nodeTypes={nodeTypes} 
        onNodesChange={onNodesChangeCustom} onEdgesChange={onEdgesChange} 
        onConnect={onConnect} onNodeDragStart={onNodeDragStart} onDrop={onDrop} 
        onSelectionDragStop={onSelectionDragStop} 
        isValidConnection={isValidConnection}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }} 
        fitView colorMode="dark"
        selectionKeyCode={['Shift']} multiSelectionKeyCode={['Shift']} 
        selectionOnDrag={true} panOnDrag={true} deleteKeyCode={['Backspace', 'Delete']} 
      >
        <Background color="#18181b" gap={20} size={1} variant={BackgroundVariant.Dots} />
      </ReactFlow>
      
      <div className="absolute top-4 left-4 flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-2 rounded-lg shadow-xl backdrop-blur-sm z-50">
          <Switch checked={autosaveEnabled} onCheckedChange={setAutosaveEnabled} className="data-[state=checked]:bg-green-500 scale-75" />
          <div className="flex items-center gap-2"><Label className="text-[10px] text-zinc-400 font-mono uppercase">Autosave</Label>{!autosaveEnabled && <AlertTriangle size={14} className="text-amber-500 animate-pulse" />}</div>
          <div className="w-px h-4 bg-zinc-700"></div>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-500 hover:text-red-500" onClick={handleReset}><RotateCw size={14} /></Button>
      </div>

      <FlowToolbar 
          selectedNodesList={selectedNodesList}
          alignNodes={alignNodes}
          performUndo={performUndo}
          canUndo={historyLen.past > 0}
          performRedo={performRedo}
          canRedo={historyLen.future > 0}
          fitView={fitView}
      />
      
      {selectedNode && (
        <PropertiesPanel 
            selectedNode={selectedNode} 
            onChange={onNodeDataChange} 
            onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}

export default function FlowEditor() { return ( <ReactFlowProvider> <FlowEditorInternal /> </ReactFlowProvider> ); }