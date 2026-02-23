import { Handle, Position, NodeProps } from '@xyflow/react';
import { Clock } from 'lucide-react';

export function TimeNode({ data, selected }: NodeProps) {
  const containerStyle = selected 
    ? 'ring-1 ring-white border-teal-500' 
    : 'border-zinc-800 hover:border-zinc-500';

  // Mantemos a base invisível, mas o CSS Global do FlowEditor vai manter os conectados sempre acesos!
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  const times: string[] = data.times || [];

  return (
    <div className={`relative min-w-[140px] flex flex-col group ${containerStyle} rounded-xl bg-zinc-950 border-2 transition-all duration-200`}>
      
      <div className={`bg-teal-700 p-2 flex items-center justify-center gap-2 rounded-t-[10px] shrink-0`}>
        <Clock size={14} className="text-white" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
            Horários
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2 rounded-b-[10px]">
         {times.length === 0 ? (
             <div className="text-center py-2">
                 <span className="text-[10px] text-zinc-500 font-bold uppercase">Nenhum horário</span>
             </div>
         ) : (
             <div className="flex flex-col gap-2">
                 {times.map((time, index) => (
                    <div key={index} className="relative flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded py-1.5">
                        
                        {/* BULLET COLADO NA BORDA ESQUERDA */}
                        <Handle 
                            type="target" 
                            position={Position.Left} 
                            id={`in-${time}`} 
                            className={`!absolute !left-[-14px] !top-1/2 !-translate-y-1/2 w-3 h-3 bg-indigo-500 border-2 border-zinc-950 z-50 ${handleOpacity}`} 
                        />
                        
                        <span className="text-xs text-white font-mono font-bold">{time}</span>
                        
                        {/* BULLET COLADO NA BORDA DIREITA */}
                        <Handle 
                            type="source" 
                            position={Position.Right} 
                            id={`out-${time}`} 
                            className={`!absolute !right-[-14px] !top-1/2 !-translate-y-1/2 w-3 h-3 bg-emerald-500 border-2 border-zinc-950 z-50 ${handleOpacity}`} 
                        />
                    </div>
                 ))}
             </div>
         )}
      </div>
    </div>
  );
}