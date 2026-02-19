import { Handle, Position, NodeProps } from '@xyflow/react';
import { Smartphone, Clapperboard, CircleDashed, MonitorPlay, Music } from 'lucide-react';

export function ChannelNode({ data, selected }: NodeProps) {
  const channelType = data.channelType || 'feed';

  const config: any = {
    feed: { icon: Smartphone, label: 'Feed', color: 'text-purple-400', border: 'border-purple-500' },
    reels: { icon: Clapperboard, label: 'Reels', color: 'text-pink-400', border: 'border-pink-500' },
    stories: { icon: CircleDashed, label: 'Stories', color: 'text-orange-400', border: 'border-orange-500' },
    tube: { icon: MonitorPlay, label: 'One Tube', color: 'text-red-400', border: 'border-red-500' },
    music: { icon: Music, label: 'One Music', color: 'text-cyan-400', border: 'border-cyan-500' },
  };

  const current = config[channelType] || config.feed;
  const Icon = current.icon;

  // REMOÇÃO DO GLOW -> APENAS BORDA BRANCA
  const containerStyle = selected 
    ? `ring-1 ring-white ${current.border}` 
    : `${current.border} hover:border-zinc-400`;

  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  return (
    <div className={`relative min-w-[140px] px-3 py-2 bg-zinc-950 border-2 rounded-full transition-all group flex items-center justify-center gap-2 ${containerStyle}`}>
      <Icon size={16} className={current.color} />
      <span className={`text-xs font-bold uppercase tracking-wider ${current.color}`}>{current.label}</span>

      {/* Handles com IDs para garantir conexões independentes */}
      <Handle type="target" position={Position.Top} id="top" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-y-1.5 transition-opacity ${handleOpacity}`} />
      <Handle type="target" position={Position.Right} id="right" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-x-1.5 transition-opacity ${handleOpacity}`} />
      <Handle type="target" position={Position.Bottom} id="bottom" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-y-1.5 transition-opacity ${handleOpacity}`} />
      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 transition-opacity ${handleOpacity}`} />
    </div>
  );
}