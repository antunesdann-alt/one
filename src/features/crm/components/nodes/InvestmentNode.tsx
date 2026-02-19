import { Handle, Position, NodeProps } from '@xyflow/react';
import { Wallet } from 'lucide-react';

const formatBRL = (value: any) => {
    const num = parseFloat(value || 0);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
};

export function InvestmentNode({ data, selected }: NodeProps) {
  // REMOÇÃO DO GLOW
  const containerStyle = selected 
    ? "ring-1 ring-white border-green-500" 
    : "border-green-600 hover:border-green-400";

  return (
    <div className={`relative min-w-[160px] bg-black border-2 rounded-full px-4 py-3 flex items-center gap-3 transition-all group ${containerStyle}`}>
      <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
        <Wallet size={20} className="text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Investimento</span>
        <span className="text-sm font-black text-white font-mono leading-none mt-0.5">
            {formatBRL(data.value)}
        </span>
      </div>

      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500 border-2 border-zinc-950 translate-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500 border-2 border-zinc-950 translate-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-500 border-2 border-zinc-950 -translate-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500 border-2 border-zinc-950 -translate-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}