import { Handle, Position, NodeProps } from '@xyflow/react';
import { Smartphone, Clapperboard, CircleDashed, MonitorPlay, Gift, Music } from 'lucide-react';

const icons = { feed: Smartphone, reels: Clapperboard, stories: CircleDashed, tube: MonitorPlay, rewarded: Gift, music: Music };
const colors: any = { feed: 'border-purple-500 text-purple-500', reels: 'border-pink-500 text-pink-500', stories: 'border-orange-500 text-orange-500', tube: 'border-red-500 text-red-500', rewarded: 'border-yellow-500 text-yellow-500', music: 'border-cyan-500 text-cyan-500' };

export function ChannelNode({ data, selected }: NodeProps) {
  const channelType = data.channelType as keyof typeof icons || 'feed';
  const Icon = icons[channelType];
  const colorClass = colors[channelType];
  
  const borderStyle = selected ? colorClass : 'border-zinc-800 hover:border-zinc-700 text-zinc-500';
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';
  const handleStyle = { width: 10, height: 10, background: '#71717a', border: '2px solid #09090b', zIndex: 50 };

  return (
    <div className={`bg-zinc-950 border-2 rounded-xl min-w-[150px] transition-all relative group flex items-center justify-center p-3 gap-2 ${borderStyle}`}>
        <Icon size={20} />
        <span className="text-sm font-bold uppercase tracking-wider">{data.label}</span>

      <Handle type="target" position={Position.Left} id="l" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, left: -6 }} />
      <Handle type="target" position={Position.Top} id="t" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, top: -6 }} />
      <Handle type="source" position={Position.Right} id="r" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, right: -6 }} />
      <Handle type="source" position={Position.Bottom} id="b" className={`transition-opacity duration-300 ${handleOpacity}`} style={{ ...handleStyle, bottom: -6 }} />
    </div>
  );
}