import { Button } from "@/components/ui/button";
import { 
  Undo, Redo, ScanSearch,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical, 
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal        
} from "lucide-react";
import { Node } from "@xyflow/react";

interface FlowToolbarProps {
    selectedNodesList: Node[];
    alignNodes: (mode: 'left' | 'center-h' | 'right' | 'top' | 'center-v' | 'bottom') => void;
    performUndo: () => void;
    canUndo: boolean;
    performRedo: () => void;
    canRedo: boolean;
    fitView: (options: any) => void;
}

export function FlowToolbar({ 
    selectedNodesList, alignNodes, performUndo, canUndo, performRedo, canRedo, fitView 
}: FlowToolbarProps) {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 p-2 rounded-xl shadow-2xl backdrop-blur-sm z-50">
            {selectedNodesList.length > 1 && (
            <>
                <div className="flex gap-0.5">
                    {/* Alinhamentos Horizontais (Eixo X) - Ícones com Linha Vertical */}
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('left')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Alinhar à Esquerda"><AlignStartVertical size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('center-h')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Centralizar Horizontalmente"><AlignCenterVertical size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('right')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Alinhar à Direita"><AlignEndVertical size={16} /></Button>
                    
                    <div className="w-px h-4 bg-zinc-700 mx-1 self-center"></div>
                    
                    {/* Alinhamentos Verticais (Eixo Y) - Ícones com Linha Horizontal */}
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('top')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Alinhar ao Topo"><AlignStartHorizontal size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('center-v')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Centralizar Verticalmente"><AlignCenterHorizontal size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => alignNodes('bottom')} className="h-8 w-8 text-zinc-400 hover:text-white" title="Alinhar à Base"><AlignEndHorizontal size={16} /></Button>
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
    );
}