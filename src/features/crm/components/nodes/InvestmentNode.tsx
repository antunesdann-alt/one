import { Handle, Position, NodeProps } from '@xyflow/react';
import { Wallet } from 'lucide-react';

const formatCurrency = (val: any) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
};

export function InvestmentNode({ data, selected }: NodeProps) {
  const containerStyle = selected 
    ? 'ring-1 ring-white border-green-500' 
    : 'border-zinc-700 hover:border-zinc-500';

  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  return (
    <div className={`relative flex items-center gap-3 px-4 py-2 bg-zinc-950 rounded-full border-2 transition-all duration-200 group ${containerStyle} min-w-[180px]`}>
      
      <div className="bg-green-600 p-2 rounded-xl flex items-center justify-center shrink-0">
         <Wallet size={16} className="text-zinc-50" />
      </div>
      
      <div className="flex flex-col">
         <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Investimento</span>
         <span className="text-sm font-bold text-white leading-tight">
            {formatCurrency(data?.value)}
         </span>
      </div>

      <Handle type="target" position={Position.Top} id="top" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Bottom} id="bottom" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}