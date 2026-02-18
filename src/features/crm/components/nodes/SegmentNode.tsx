import { Handle, Position, NodeProps } from '@xyflow/react';
import { 
  Wallet, MapPin, Smartphone, Music, ShoppingBag, 
  HelpCircle, Users, Filter, GitFork, ArrowRight
} from 'lucide-react';

// Configuração visual
const segmentConfig: any = {
  wallet: { label: 'Poder de Compra', icon: Wallet, color: 'bg-emerald-600', border: 'border-emerald-600' },
  geo: { label: 'Geolocalização', icon: MapPin, color: 'bg-teal-600', border: 'border-teal-600' },
  device: { label: 'Dispositivo', icon: Smartphone, color: 'bg-zinc-600', border: 'border-zinc-600' },
  mood: { label: 'Vibe / Música', icon: Music, color: 'bg-violet-600', border: 'border-violet-600' },
  shop: { label: 'Shop Behavior', icon: ShoppingBag, color: 'bg-amber-600', border: 'border-amber-600' },
  quiz: { label: 'Target Quiz', icon: HelpCircle, color: 'bg-indigo-600', border: 'border-indigo-600' },
  demo: { label: 'Demográfico', icon: Users, color: 'bg-blue-600', border: 'border-blue-600' },
  default: { label: 'Filtro', icon: Filter, color: 'bg-zinc-700', border: 'border-zinc-700' }
};

export function SegmentNode({ data, selected }: NodeProps) {
  const type = data.segmentType || 'default';
  const config = segmentConfig[type] || segmentConfig.default;
  const Icon = config.icon;
  
  // Array de lógicas (IF, ELIF, ELSE) vindo do Painel
  const branches = data.branches || []; 

  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
  const containerStyle = selected 
    ? `ring-1 ring-white shadow-[0_0_15px_rgba(255,255,255,0.3)]` 
    : `hover:border-zinc-500`;

  // --- MODO TARGET QUIZ (Multi-Saídas) ---
  if (type === 'quiz' && branches.length > 0) {
      return (
        <div className={`relative min-w-[220px] bg-zinc-950 border-2 ${config.border} rounded-lg transition-all group flex flex-col overflow-visible ${containerStyle}`}>
            
            {/* Header */}
            <div className={`${config.color} px-3 py-2 flex items-center justify-between rounded-t-md`}>
                <div className="flex items-center gap-2">
                    <Icon size={16} className="text-white" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{config.label}</span>
                </div>
                <GitFork size={14} className="text-white/70" />
            </div>

            {/* Corpo com Ramificações Lógicas */}
            <div className="flex flex-col bg-zinc-900/90 rounded-b-md divide-y divide-zinc-800">
                {branches.map((branch: any, index: number) => (
                    <div key={branch.id} className="relative h-12 flex items-center justify-between px-3 group/branch hover:bg-zinc-800 transition-colors">
                        <div className="flex items-center gap-2 overflow-hidden w-full">
                            {/* Badge Lógica (IF, ELIF, ELSE) */}
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 w-10 text-center ${
                                branch.logic === 'if' ? 'bg-indigo-500 text-white' :
                                branch.logic === 'elif' ? 'bg-indigo-500/50 text-indigo-100' :
                                'bg-zinc-600 text-zinc-300'
                            }`}>
                                {branch.logic}
                            </span>
                            
                            {/* Descrição da Condição */}
                            <span className="text-[10px] text-zinc-300 truncate flex-1" title={branch.label}>
                                {branch.logic === 'else' ? 'Caso contrário' : (branch.label || 'Configurar...')}
                            </span>
                        </div>
                        
                        <ArrowRight size={12} className="text-zinc-600 shrink-0 ml-2" />

                        {/* Conector de SAÍDA Específico para esta Condição */}
                        <Handle 
                            type="source" 
                            position={Position.Right} 
                            id={`branch-${branch.id}`} // ID único para conectar corretamente
                            className={`w-3 h-3 bg-indigo-400 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} 
                            style={{ top: '50%', transform: 'translate(50%, -50%)' }}
                        />
                    </div>
                ))}
            </div>

            {/* Conector de ENTRADA (Esquerda) */}
            <Handle 
                type="target" 
                position={Position.Left} 
                className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} 
            />
        </div>
      );
  }

  // --- MODO PADRÃO (Filtro Simples) ---
  return (
    <div className={`relative w-48 bg-zinc-950 border-2 ${config.border} rounded-lg transition-all group flex flex-col overflow-visible ${containerStyle}`}>
      
      <div className={`${config.color} px-3 py-1.5 flex items-center justify-between rounded-t-md`}>
        <div className="flex items-center gap-2">
            <Icon size={14} className="text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{config.label}</span>
        </div>
        <Filter size={10} className="text-white/50" />
      </div>

      <div className="p-3 bg-zinc-900/80 min-h-[50px] flex items-center justify-center text-center rounded-b-md">
        <p className="text-[10px] text-zinc-300 font-medium leading-tight">
            {data.summary || <span className="text-zinc-600 italic">Arraste para conectar...</span>}
        </p>
      </div>

      {/* Handles Padrão */}
      <Handle type="target" position={Position.Left} className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}