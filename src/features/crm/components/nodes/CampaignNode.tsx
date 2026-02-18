import { Handle, Position, NodeProps, useReactFlow } from '@xyflow/react';
import { Target, Activity, Power, Lock, Wallet } from 'lucide-react';

export function CampaignNode({ id, data, selected }: NodeProps) {
  const { setNodes } = useReactFlow();
  const isActive = data.active !== false; 

  const toggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, active: !isActive } } : node)));
  };

  const styles = isActive
    ? {
        border: selected ? 'border-amber-500 border-2' : 'border-amber-500 border',
        headerBg: 'bg-amber-500',
        headerText: 'text-black',
        headerIcon: 'text-black',
        budgetColor: 'text-amber-500',
        statusBtn: 'text-black border-black/20 bg-black/10'
      }
    : {
        border: selected ? 'border-zinc-500 border-2' : 'border-zinc-700 border',
        headerBg: 'bg-zinc-900',
        headerText: 'text-white',
        headerIcon: 'text-amber-500', 
        budgetColor: 'text-green-500', 
        statusBtn: 'text-zinc-400 border-zinc-700 bg-zinc-800'
      };

  const formatCurrency = (val: string | number) => {
    const num = parseFloat(val?.toString() || '0');
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleStyle = { width: 12, height: 12, background: isActive ? '#f59e0b' : '#52525b', border: '2px solid #09090b', zIndex: 9999 };

  return (
    <div className={`bg-zinc-950 rounded-xl w-[340px] transition-all relative group shadow-xl ${styles.border}`}>
      
      <div className={`${styles.headerBg} p-3 flex items-center justify-between rounded-t-lg border-b ${isActive ? 'border-amber-600' : 'border-zinc-800'}`}>
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-full ${isActive ? 'bg-black/10' : 'bg-amber-500/10'}`}>
             <Target size={18} className={styles.headerIcon} />
          </div>
          <span className={`text-xs font-bold uppercase tracking-wider ${styles.headerText}`}>
            {isActive ? 'Campanha Mestra' : 'Campanha Pausada'}
          </span>
        </div>
        <button onClick={toggleStatus} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase border transition-all hover:opacity-80 ${styles.statusBtn}`}>
            <Power size={10} /> {isActive ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="p-5 space-y-5 bg-zinc-950 rounded-b-xl">
        <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1 max-w-[60%]">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Objetivo</span>
                <span className="text-white font-bold text-lg leading-tight truncate">{data.label || "Nova Campanha"}</span>
            </div>
            <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider flex items-center gap-1">
                    {!isActive && <Lock size={10}/>} Budget
                </span>
                <span className={`text-lg font-mono font-bold ${styles.budgetColor}`}>{formatCurrency(data.budget || 0)}</span>
            </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-2 border border-zinc-800 flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-md">
                <Wallet size={16} className="text-green-500" />
            </div>
            <div className="flex flex-col">
                <span className="text-[9px] text-zinc-500 uppercase font-bold">Saldo em Conta</span>
                <span className="text-white font-mono font-bold text-sm">{formatCurrency(data.balance || 0)}</span>
            </div>
        </div>

        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800/80 p-3">
            <div className="flex justify-between text-[9px] text-zinc-500 uppercase font-bold mb-2 px-1">
                <span className="w-20">Métrica</span><span className="text-center w-20">Estimado</span><span className="text-right w-20">Atual</span>
            </div>
            <div className="h-px bg-zinc-800 mb-2"></div>
            <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-center px-1"><span className="text-zinc-400 w-20 truncate">Impressões</span><span className="text-zinc-600 text-center w-20">10.000</span><span className="text-white text-right w-20 font-bold">2.340</span></div>
                <div className="flex justify-between items-center px-1"><span className="text-zinc-400 w-20 truncate">CPM</span><span className="text-zinc-600 text-center w-20">R$ 15,50</span><span className="text-white text-right w-20 font-bold">R$ 14,20</span></div>
                <div className="flex justify-between items-center px-1"><span className="text-zinc-400 w-20 truncate">CPI</span><span className="text-zinc-600 text-center w-20">R$ 0,015</span><span className="text-white text-right w-20 font-bold">R$ 0,014</span></div>
                <div className="flex justify-between items-center px-1"><span className="text-zinc-400 w-20 truncate">CPV (Vídeo)</span><span className="text-zinc-600 text-center w-20">R$ 0,10</span><span className="text-white text-right w-20 font-bold">R$ 0,08</span></div>
                <div className="flex justify-between items-center px-1 border-t border-zinc-800/50 pt-1 mt-1"><span className="text-amber-500 w-20 truncate font-bold">CPE</span><span className="text-zinc-600 text-center w-20">R$ 0,25</span><span className="text-amber-500 text-right w-20 font-bold">R$ 0,22</span></div>
            </div>
        </div>

        <Activity className={`absolute top-14 right-4 opacity-5 pointer-events-none ${isActive ? 'text-amber-500' : 'text-zinc-500'}`} size={80} strokeWidth={1} />
      </div>

      <Handle type="source" position={Position.Right} id="source-r" style={{ ...handleStyle, right: -6 }} />
    </div>
  );
}