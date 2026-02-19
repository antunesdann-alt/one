import { Handle, Position, NodeProps } from '@xyflow/react';
import { Gavel } from 'lucide-react';

const formatBRL = (value: any) => {
    const num = parseFloat(value || 0);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
};

export function BidNode({ data, selected }: NodeProps) {
  // REMOÇÃO DO GLOW
  const containerStyle = selected 
    ? "ring-1 ring-white border-emerald-500" 
    : "border-emerald-700 hover:border-emerald-500";

  return (
    <div className={`relative min-w-[150px] bg-zinc-950 border-2 rounded-full px-3 py-2 flex items-center gap-3 transition-all group ${containerStyle}`}>
      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-emerald-500">
        <Gavel size={16} />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Lance Max</span>
        <span className="text-xs font-bold text-white font-mono leading-none mt-0.5">
            {formatBRL(data.value)}
        </span>
      </div>

      <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 translate-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 -translate-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}