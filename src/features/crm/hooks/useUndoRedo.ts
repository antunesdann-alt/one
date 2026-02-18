import { useState, useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

// Define como é um "momento" na história (o snapshot)
interface HistoryItem {
  nodes: Node[];
  edges: Edge[];
}

export function useUndoRedo() {
  // Pilhas de memória
  const [past, setPast] = useState<HistoryItem[]>([]);
  const [future, setFuture] = useState<HistoryItem[]>([]);

  // Função para "Tirar uma foto" do estado atual antes de mudar algo
  const takeSnapshot = useCallback((nodes: Node[], edges: Edge[]) => {
    setPast((old) => [...old, { nodes, edges }]);
    setFuture([]); // Se você fez algo novo, o futuro (refazer) deixa de existir
  }, []);

  // Lógica do CTRL+Z
  const undo = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    if (past.length === 0) return null;

    const previous = past[past.length - 1]; // Pega o último item
    const newPast = past.slice(0, past.length - 1); // Remove ele da pilha

    setPast(newPast);
    setFuture((old) => [{ nodes: currentNodes, edges: currentEdges }, ...old]); // Joga o atual pro futuro

    return previous; // Retorna o estado antigo para ser aplicado
  }, [past]);

  // Lógica do CTRL+SHIFT+Z
  const redo = useCallback((currentNodes: Node[], currentEdges: Edge[]) => {
    if (future.length === 0) return null;

    const next = future[0]; // Pega o primeiro do futuro
    const newFuture = future.slice(1); // Remove ele da pilha

    setFuture(newFuture);
    setPast((old) => [...old, { nodes: currentNodes, edges: currentEdges }]); // Joga o atual pro passado

    return next; // Retorna o estado futuro para ser aplicado
  }, [future]);

  return {
    takeSnapshot,
    undo,
    redo,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}