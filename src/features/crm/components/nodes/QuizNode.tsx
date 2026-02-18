import { Handle, Position, NodeProps } from '@xyflow/react';
import { ClipboardList, MessageSquareDashed } from 'lucide-react';

export function QuizNode({ data, selected }: NodeProps) {
  const isAd = data.isAd;
  
  const borderColor = isAd ? "border-indigo-500" : "border-zinc-700";
  const containerStyle = selected 
    ? `ring-1 ring-white shadow-[0_0_15px_rgba(99,102,241,0.4)] ${borderColor}` 
    : `${borderColor} hover:border-indigo-500/50`;

  // Handles invisíveis por padrão
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  return (
    // CONTAINER (Relative para Handles e Flags)
    <div className={`relative w-40 h-64 group ${containerStyle} rounded-xl bg-zinc-950 border-2 transition-all duration-200`}>
      
      {/* FLAG AD */}
      {isAd && (
        <div className="absolute -top-[1px] -right-[1px] z-50 overflow-hidden rounded-tr-lg">
            <div className="bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded-bl-lg shadow-sm">
                AD
            </div>
        </div>
      )}

      {/* CONTEÚDO (Overflow para arredondar) */}
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[10px] pointer-events-none">
          <div className="bg-indigo-600 p-2 flex items-center gap-2 h-8 shrink-0">
            <ClipboardList size={14} className="text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">Quiz</span>
          </div>

          <div className="flex-1 bg-zinc-900/50 flex flex-col items-center justify-center p-2 space-y-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <MessageSquareDashed size={18} className="text-indigo-400"/>
            </div>
            <div className="text-center">
                <span className="text-xl font-bold text-white leading-none block">{(data.questions || []).length}</span>
                <span className="text-[8px] text-zinc-500 uppercase font-bold">Perguntas</span>
            </div>
          </div>

          <div className="px-2 py-2 border-t border-zinc-800 bg-zinc-950 h-12 flex flex-col justify-center shrink-0">
            <p className="text-[8px] text-zinc-500 font-bold uppercase mb-0.5">Título</p>
            <p className="text-[10px] font-medium text-white line-clamp-2 leading-tight">{data.label || "Nova Pesquisa"}</p>
          </div>
      </div>

      {/* HANDLES (Externos) */}
      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="target" position={Position.Top} id="top" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Bottom} id="bottom" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}