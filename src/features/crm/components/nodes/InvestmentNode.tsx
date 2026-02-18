import { Handle, Position, NodeProps } from '@xyflow/react';
import { Wallet } from 'lucide-react';

export function InvestmentNode({ data, selected }: NodeProps) {
  const borderClass = selected ? 'border-green-500' : 'border-zinc-800 hover:border-green-500/50';
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
  const handleStyle = { width: 10, height: 10, background: '#22c55e', border: '2px solid #09090b', zIndex: 50 };

  const formattedValue = parseFloat(data.value?.toString() || '0')
    .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`bg-zinc-950 border-2 rounded-xl min-w-[160px] transition-all relative group ${borderClass}`}>
      <div className="p-3 flex items-center gap-3">
        <div className={`p-2 rounded-lg ${selected ? 'bg-green-500 text-black' : 'bg-zinc-900 text-green-500 border border-zinc-800'}`}>
            <Wallet size={18} />
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">Investimento</span>
            <div className="flex items-center gap-1 text-white font-mono text-xl font-bold leading-none mt-0.5">
                <span className="text-xs text-zinc-500">R$</span>
                <span>{formattedValue}</span>
            </div>
        </div>
      </div>

      <Handle type="target" position={Position.Left} id="l" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, left: -6 }} />
      <Handle type="target" position={Position.Top} id="t" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, top: -6 }} />
      <Handle type="source" position={Position.Right} id="r" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, right: -6 }} />
      <Handle type="source" position={Position.Bottom} id="b" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, bottom: -6 }} />
    </div>
  );
}