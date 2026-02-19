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
import { 
  RotateCw, Undo, Redo, ScanSearch, AlertTriangle,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal, 
  AlignStartVertical, AlignCenterVertical, AlignEndVertical        
} from "lucide-react";
import "@xyflow/react/dist/style.css";

import { VideoNode } from "./nodes/VideoNode"; 
import { CampaignNode } from "./nodes/CampaignNode";
import { BidNode } from "./nodes/BidNode";
import { InvestmentNode } from "./nodes/InvestmentNode";
import { ChannelNode } from "./nodes/ChannelNode";
import { QuizNode } from "./nodes/QuizNode";
import { SegmentNode } from "./nodes/SegmentNode";

import { useUndoRedo } from "../hooks/useUndoRedo";
import PropertiesPanel from "./PropertiesPanel";

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
  segmentNode: SegmentNode
};

const defaultNodes = [{ 
  id: 'master-1', 
  type: 'campaignNode', 
  position: { x: 100, y: 100 }, 
  data: { label: 'Nova Campanha', budget: '0', balance: 0, isAutomatedBudget: false, active: false } 
}];

function FlowEditorInternal() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition, getNodes, getEdges, fitView } = useReactFlow(); 
  const { takeSnapshot, undo, redo, canUndo, canRedo } = useUndoRedo();
  
  const [nodes, setNodes] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedNodesList, setSelectedNodesList] = useState<Node[]>([]);
  const [clipboard, setClipboard] = useState<Node[]>([]);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  
  const isHistoryAction = useRef(false);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setSelectedNodesList(nodes);
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

  const performUndo = useCallback(() => {
      const result = undo(); 
      if (result) {
          isHistoryAction.current = true; 
          setNodes(Array.isArray(result.nodes) ? [...result.nodes] : []);
          setEdges(Array.isArray(result.edges) ? [...result.edges] : []);
          setTimeout(() => { isHistoryAction.current = false; }, 100);
      }
  }, [undo, setNodes, setEdges]);

  const performRedo = useCallback(() => {
      const result = redo();
      if (result) {
          isHistoryAction.current = true;
          setNodes(Array.isArray(result.nodes) ? [...result.nodes] : []);
          setEdges(Array.isArray(result.edges) ? [...result.edges] : []);
          setTimeout(() => { isHistoryAction.current = false; }, 100);
      }
  }, [redo, setNodes, setEdges]);

  const onNodesChangeCustom = useCallback((changes: NodeChange[]) => { 
      const isSelectionChange = changes.every(c => c.type === 'select');
      if (!isHistoryAction.current && !isSelectionChange && changes.some(c => c.type !== 'select')) {
      }
      setNodes((nds) => applyNodeChanges(changes, nds)); 
  }, [setNodes]);

  const onNodeDragStart = useCallback(() => {
      if (!isHistoryAction.current) takeSnapshot(getNodes(), getEdges());
  }, [takeSnapshot, getNodes, getEdges]);

  const onConnect = useCallback((params: Connection) => { 
      if (params.source === params.target) return;
      const exists = edges.some(e => e.source === params.source && e.target === params.target);
      if (exists) return;

      takeSnapshot(getNodes(), getEdges()); 
      setEdges((eds) => addEdge(params, eds)); 
  }, [setEdges, takeSnapshot, getNodes, getEdges, edges]);

  const onNodeDataChange = useCallback((id: string, data: any) => { 
      setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...data } } : n)); 
      setSelectedNode((prev: any) => prev?.id === id ? { ...prev, data: { ...prev.data, ...data } } : prev); 
  }, [setNodes]);

  const onDrop = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow/type');
      if (!type) return;
      if (type === 'campaignNode' && nodes.some(n => n.type === 'campaignNode')) { alert("Apenas uma Campanha Mestra permitida."); return; }
      
      takeSnapshot(getNodes(), getEdges());
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const label = event.dataTransfer.getData('application/reactflow/label');
      
      const dataString = event.dataTransfer.getData('application/reactflow/data');
      let extraData = {}; 
      try { if (dataString) extraData = JSON.parse(dataString); } catch(e) {}
      
      const baseData = { label, value: '0', isAd: false, frequency: 3, ...extraData }; 
      if (label.includes('Ad') || label.includes('AD')) baseData.isAd = true;

      setNodes((nds) => nds.concat({ id: `${type}-${Date.now()}`, type, position, data: baseData }));
  }, [screenToFlowPosition, setNodes, nodes, takeSnapshot, getNodes, getEdges]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) return;
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === 'z') {
        event.preventDefault();
        if (event.shiftKey) performRedo(); else performUndo();
      }
      if ((event.ctrlKey || event.metaKey) && key === 'y') {
        event.preventDefault();
        performRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [performUndo, performRedo]);

  const alignNodes = (mode: 'left' | 'center-h' | 'right' | 'top' | 'center-v' | 'bottom') => {
    if (selectedNodesList.length < 2) return;
    takeSnapshot(getNodes(), getEdges());
    const selected = getNodes().filter(n => n.selected);
    let target = 0;
    switch (mode) {
        case 'left': target = Math.min(...selected.map(n => n.position.x)); break;
        case 'center-h': 
            const minX = Math.min(...selected.map(n => n.position.x));
            const maxX = Math.max(...selected.map(n => n.position.x + (n.measured?.width || 0)));
            target = (minX + maxX) / 2; break;
        case 'right': 
            const maxR = Math.max(...selected.map(n => n.position.x + (n.measured?.width || 0)));
            target = maxR; break;
        case 'top': target = Math.min(...selected.map(n => n.position.y)); break;
        case 'center-v':
            const minY = Math.min(...selected.map(n => n.position.y));
            const maxY = Math.max(...selected.map(n => n.position.y + (n.measured?.height || 0)));
            target = (minY + maxY) / 2; break;
        case 'bottom':
            const maxB = Math.max(...selected.map(n => n.position.y + (n.measured?.height || 0)));
            target = maxB; break;
    }
    setNodes(nds => nds.map(n => {
        if (!n.selected) return n;
        const w = n.measured?.width || 0;
        const h = n.measured?.height || 0;
        const pos = { ...n.position };
        if (mode === 'left') pos.x = target;
        if (mode === 'center-h') pos.x = target - w/2;
        if (mode === 'right') pos.x = target - w;
        if (mode === 'top') pos.y = target;
        if (mode === 'center-v') pos.y = target - h/2;
        if (mode === 'bottom') pos.y = target - h;
        return { ...n, position: pos };
    }));
  };

  const handleReset = () => { if (confirm("Resetar?")) { localStorage.removeItem(FLOW_KEY); window.location.reload(); } };

  // BFS Logic
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
    const totalInvestment = validInvestments.reduce((acc, node) => acc + (parseFloat(node.data.value as string) || 0), 0);
    const currentBudget = parseFloat(campaignNode.data.budget as string) || 0;
    const isCurrentlyAutomated = campaignNode.data.isAutomatedBudget;
    if (validInvestments.length > 0 && (currentBudget !== totalInvestment || !isCurrentlyAutomated)) {
        setNodes((nds) => nds.map((n) => n.id === campaignNode.id ? { ...n, data: { ...n.data, budget: totalInvestment.toString(), isAutomatedBudget: true, orphans: orphansCount } } : n));
    } else if (validInvestments.length === 0 && isCurrentlyAutomated) {
        setNodes((nds) => nds.map((n) => n.id === campaignNode.id ? { ...n, data: { ...n.data, budget: '0', isAutomatedBudget: false, orphans: orphansCount } } : n));
    } else if (campaignNode.data.orphans !== orphansCount) {
        setNodes((nds) => nds.map((n) => n.id === campaignNode.id ? { ...n, data: { ...n.data, orphans: orphansCount } } : n));
    }
  }, [nodes, edges, setNodes]);

  return (
    <div className="h-full w-full bg-zinc-950 relative" ref={reactFlowWrapper}>
      <ReactFlow 
        nodes={nodes} edges={edges} nodeTypes={nodeTypes} 
        onNodesChange={onNodesChangeCustom} onEdgesChange={onEdgesChange} 
        onConnect={onConnect} onNodeDragStart={onNodeDragStart} onDrop={onDrop} 
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-2 rounded-xl shadow-2xl backdrop-blur-sm z-50">
          {selectedNodesList.length > 1 && (
            <>
                <div className="flex gap-0.5">
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('left')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Esquerda"><AlignStartHorizontal size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('center-h')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Centro H"><AlignCenterHorizontal size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('right')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Direita"><AlignEndHorizontal size={16} /></Button>
                    <div className="w-px h-4 bg-zinc-700 mx-1 self-center"></div>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('top')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Topo"><AlignStartVertical size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('center-v')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Centro V"><AlignCenterVertical size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('bottom')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Base"><AlignEndVertical size={16} /></Button>
                </div>
                <div className="w-px h-6 bg-zinc-700 mx-1"></div>
            </>
          )}
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={performUndo} disabled={!canUndo} className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800" title="Desfazer (Ctrl+Z)"><Undo size={16} /></Button>
            <Button variant="ghost" size="icon" onClick={performRedo} disabled={!canRedo} className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800" title="Refazer (Ctrl+Shift+Z)"><Redo size={16} /></Button>
          </div>
          <div className="w-px h-6 bg-zinc-700 mx-1"></div>
          <Button variant="ghost" size="icon" onClick={() => fitView({ duration: 800, padding: 0.2 })} className="h-8 w-8 text-zinc-400 hover:text-green-400 hover:bg-zinc-800"><ScanSearch size={16} /></Button>
      </div>
      
      {/* CORREÇÃO AQUI: Renderização Condicional */}
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