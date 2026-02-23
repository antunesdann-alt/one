import { Handle, Position, NodeProps } from '@xyflow/react';
import { Headphones } from 'lucide-react';

export function SpotNode({ data, selected }: NodeProps) {
  const containerStyle = selected 
    ? 'ring-1 ring-white border-purple-500' 
    : 'border-zinc-800 hover:border-zinc-500';

  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  return (
    <div className={`relative w-40 h-24 group ${containerStyle} rounded-xl bg-zinc-950 border-2 transition-all duration-200`}>
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[10px] pointer-events-none">
          
          <div className={`bg-purple-600 p-2 flex items-center justify-between h-8 shrink-0`}>
            <div className="flex items-center gap-2">
                <Headphones size={14} className="text-white" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                    SPOT
                </span>
            </div>
            {data.isAd && <span className="text-[8px] font-bold bg-white text-black px-1.5 py-0.5 rounded">AD</span>}
          </div>

          <div className="flex-1 bg-zinc-900 relative flex flex-col p-3 justify-center overflow-hidden">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Áudio</span>
            <span className="text-xs font-bold text-white line-clamp-1">
                {data?.name || data?.label || 'Novo Spot'}
            </span>
          </div>
      </div>

      <Handle type="target" position={Position.Top} id="top" className={`w-3 h-3 bg-indigo-500 border-2 border-zinc-950 -translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-indigo-500 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Bottom} id="bottom" className={`w-3 h-3 bg-emerald-500 border-2 border-zinc-950 translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-emerald-500 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}