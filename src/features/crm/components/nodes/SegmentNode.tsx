import { Handle, Position, NodeProps } from '@xyflow/react';
import { Users, Filter, CopyPlus, MousePointerClick, Wallet, HelpCircle, ShoppingBag, Music, MapPin, Smartphone } from 'lucide-react';

export function SegmentNode({ data, selected }: NodeProps) {
  const containerStyle = selected 
    ? 'ring-1 ring-white border-zinc-400' 
    : 'border-zinc-800 hover:border-zinc-600';

  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
  const type = data.segmentType || 'demo';

  // Dicionário de estilos para cada tipo de segmentação
  const getStyleConfig = () => {
      switch (type) {
          case 'demo': return { icon: Users, title: 'Demográfico', color: 'bg-zinc-800', textColor: 'text-zinc-300' };
          case 'lookalike': return { icon: CopyPlus, title: 'Semelhante', color: 'bg-indigo-900', textColor: 'text-indigo-300' };
          case 'interaction': return { icon: MousePointerClick, title: 'Interação', color: 'bg-emerald-900', textColor: 'text-emerald-300' };
          case 'wallet': return { icon: Wallet, title: 'Wallet Power', color: 'bg-amber-600', textColor: 'text-white' };
          case 'quiz': return { icon: HelpCircle, title: 'Target Quiz', color: 'bg-purple-900', textColor: 'text-purple-300' };
          case 'shop': return { icon: ShoppingBag, title: 'Shop Behavior', color: 'bg-orange-900', textColor: 'text-orange-300' };
          case 'mood': return { icon: Music, title: 'Vibe / Music', color: 'bg-pink-900', textColor: 'text-pink-300' };
          case 'geo': return { icon: MapPin, title: 'Geolocalização', color: 'bg-cyan-900', textColor: 'text-cyan-300' };
          case 'device': return { icon: Smartphone, title: 'Dispositivo', color: 'bg-slate-800', textColor: 'text-slate-300' };
          default: return { icon: Filter, title: 'Segmentação', color: 'bg-zinc-800', textColor: 'text-zinc-300' };
      }
  };

  const config = getStyleConfig();
  const Icon = config.icon;

  // Lógica para gerar o resumo visual caso seja o Demográfico
  const getSummary = () => {
      if (type !== 'demo') return data.label || config.title;
      
      const demo = data.demo;
      if (!demo) return data.label || 'Todos os Públicos';

      const ageStr = `${demo.ageMin || 18}-${demo.ageMax || 65}a`;
      const genStr = demo.gender === 'ALL' ? 'Todos' : (demo.gender === 'M' ? 'Homens' : 'Mulheres');
      
      let extraStr = '';
      if (demo.relEnabled && demo.marital && demo.marital.length > 0) extraStr += ` • ${demo.marital[0]}`;
      else if (demo.profEnabled && demo.education && demo.education.length > 0) extraStr += ` • ${demo.education[0]}`;
      
      return `${ageStr} • ${genStr}${extraStr}`;
  };

  return (
    <div className={`relative min-w-[180px] flex flex-col group ${containerStyle} rounded-xl bg-zinc-950 border-2 transition-all duration-200`}>
      
      <div className={`${config.color} p-2 flex items-center gap-2 rounded-t-[10px] shrink-0`}>
        <Icon size={14} className={config.textColor} />
        <span className={`text-[10px] font-bold ${config.textColor} uppercase tracking-wider truncate`}>
            {config.title}
        </span>
      </div>

      <div className="p-3 flex flex-col gap-1 rounded-b-[10px] bg-zinc-950">
         <span className="text-[11px] font-bold text-white truncate">
             {data.label || config.title}
         </span>
         
         <div className="flex items-center gap-1.5 mt-1">
             <Filter size={10} className="text-zinc-500" />
             <span className="text-[9px] text-zinc-400 font-medium truncate">
                 {getSummary()}
             </span>
         </div>
      </div>

      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-indigo-500 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-emerald-500 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}