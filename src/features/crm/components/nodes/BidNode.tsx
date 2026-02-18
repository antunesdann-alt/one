import { Handle, Position, NodeProps } from '@xyflow/react';
import { Gavel } from 'lucide-react';

export function BidNode({ data, selected }: NodeProps) {
  const borderClass = selected ? 'border-green-500 border-2' : 'border-zinc-800 border';
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
  // Handles menores para o Bid
  const handleStyle = { width: 8, height: 8, background: '#71717a', border: '1px solid #000', zIndex: 50 };

  const formattedValue = parseFloat(data.value?.toString() || '0')
    .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`bg-zinc-950 rounded-full px-4 py-2 flex items-center gap-3 transition-colors relative group ${borderClass}`}>
      <div className="bg-zinc-900 p-1.5 rounded-full border border-zinc-800">
         <Gavel size={14} className="text-green-500" />
      </div>
      <div className="flex flex-col leading-none">
         <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">LANCE MAX</span>
         <span className="text-white font-mono font-bold text-sm">R$ {formattedValue}</span>
      </div>

      <Handle type="target" position={Position.Left} id="l" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, left: -4 }} />
      <Handle type="target" position={Position.Top} id="t" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, top: -4 }} />
      <Handle type="source" position={Position.Right} id="r" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, right: -4 }} />
      <Handle type="source" position={Position.Bottom} id="b" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, bottom: -4 }} />
    </div>
  );
}