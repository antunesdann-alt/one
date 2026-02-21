import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { Target, Power, Wallet } from 'lucide-react';

const formatCurrency = (val: any) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
};

const formatNumber = (val: any) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('pt-BR').format(num);
}

export function CampaignNode({ id, data, selected }: NodeProps) {
  const { updateNodeData } = useReactFlow();

  const containerStyle = selected 
    ? 'ring-1 ring-white border-amber-500' 
    : 'border-zinc-800 hover:border-amber-500/50';

  const isActive = data.active;
  const headerColor = isActive ? 'bg-amber-500' : 'bg-zinc-800';
  const headerTextColor = isActive ? 'text-zinc-950' : 'text-zinc-400';

  // Opacidade dinâmica para revelar os conectores
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  const metrics = {
      impressions: { est: 10000, current: 2340 },
      cpm: { est: 15.50, current: 14.20 },
      cpi: { est: 0.02, current: 0.01 },
      cpv: { est: 0.10, current: 0.08 },
      cpe: { est: 0.25, current: 0.22 },
  };

  const toggleActive = () => {
    updateNodeData(id, { active: !isActive });
  };

  const isOverBudget = (data.allocatedBudget || 0) > (data.balance || 0);

  return (
    // REMOVIDO o overflow-hidden para os bullets não serem cortados. 
    // ADICIONADO rounded-2xl aqui e rounded-t-[14px] no cabeçalho para manter as bordas perfeitas.
    <div className={`relative flex flex-col bg-zinc-950 rounded-2xl border-2 transition-all duration-200 group ${containerStyle} w-[280px]`}>
      
      <div className={`${headerColor} p-3 rounded-t-[14px] flex items-center justify-between transition-colors`}>
        <div className="flex items-center gap-2">
           <Target size={18} className={headerTextColor} />
           <span className={`text-xs font-black uppercase tracking-wider ${headerTextColor}`}>CAMPANHA MESTRA</span>
        </div>
        <button onClick={toggleActive} className={`flex items-center gap-1 px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition-transform ${isActive ? 'bg-zinc-950/20 text-zinc-900' : 'bg-zinc-900 text-zinc-500'}`}>
            <Power size={12} />
            <span className="text-[10px] font-bold">{isActive ? 'ON' : 'OFF'}</span>
        </button>
      </div>
      
      <div className="p-4 flex flex-col gap-4 bg-zinc-950 rounded-b-2xl">
         <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">OBJETIVO</span>
                    <span className="text-sm font-bold text-white line-clamp-1">{data.label || 'Nova Campanha'}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">BUDGET TOTAL</span>
                    <span className="text-base font-black text-amber-500">
                        {formatCurrency(data.budget)}
                    </span>
                    {(data.allocatedBudget || 0) > 0 && (
                        <span className={`text-[9px] font-bold mt-0.5 uppercase tracking-wider ${isOverBudget ? 'text-red-500' : 'text-zinc-400'}`}>
                            ALOCADO: {formatCurrency(data.allocatedBudget)}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex justify-between items-center py-1 border-t border-zinc-800/50 border-b">
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">UTILIZADO (LIVE)</span>
                <span className="text-xs font-bold text-pink-500">
                    {formatCurrency(data.usedBudget || 124.50)}
                </span>
            </div>
         </div>

         <div className={`bg-zinc-900 p-3 rounded-xl flex items-center gap-3 border ${isOverBudget ? 'border-red-500/30' : 'border-zinc-800'}`}>
            <div className={`p-2 rounded-lg ${isOverBudget ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
                <Wallet size={18} />
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">SALDO EM CONTA</span>
                <span className="text-lg font-black text-white">
                    {formatCurrency(data.balance)}
                </span>
            </div>
         </div>

         <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800 space-y-2">
            <div className="grid grid-cols-3 text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                <span>MÉTRICA</span>
                <span className="text-right">ESTIMADO</span>
                <span className="text-right">ATUAL</span>
            </div>
            
            <div className="grid grid-cols-3 text-xs items-center py-0.5 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">Impressões</span>
                <span className="text-right text-zinc-600">{formatNumber(metrics.impressions.est)}</span>
                <span className="text-right text-white font-bold">{formatNumber(metrics.impressions.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-0.5 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">CPM</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpm.est)}</span>
                <span className="text-right text-white font-bold">{formatCurrency(metrics.cpm.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-0.5 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">CPI</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpi.est)}</span>
                <span className="text-right text-white font-bold">{formatCurrency(metrics.cpi.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-0.5 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">CPV (Vídeo)</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpv.est)}</span>
                <span className="text-right text-white font-bold">{formatCurrency(metrics.cpv.current)}</span>
            </div>
             <div className="grid grid-cols-3 text-xs items-center py-0.5 border-t border-zinc-800/30">
                <span className="text-amber-500 font-bold">CPE</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpe.est)}</span>
                <span className="text-right text-amber-500 font-bold">{formatCurrency(metrics.cpe.current)}</span>
            </div>
         </div>
      </div>

      {/* Bullets visíveis dinamicamente */}
      <Handle type="target" position={Position.Top} id="top" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Bottom} id="bottom" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}