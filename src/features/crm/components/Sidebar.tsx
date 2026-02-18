"use client";

import { 
  Target, Wallet, Gavel, 
  Video, Image as ImageIcon, Layers, ClipboardList, 
  Smartphone, Clapperboard, CircleDashed, MonitorPlay, Music, 
  Users, DollarSign, MessageCircle, 
  Megaphone, Wand2, FileImage, 
  Filter, MapPin, ShoppingBag, HelpCircle
} from "lucide-react";
import { OneLiveLogo } from "@/components/ui/OneLiveLogo";

const onDragStart = (event: React.DragEvent, nodeType: string, label: string, data?: any) => {
  event.dataTransfer.setData('application/reactflow/type', nodeType);
  event.dataTransfer.setData('application/reactflow/label', label);
  if (data) event.dataTransfer.setData('application/reactflow/data', JSON.stringify(data));
  event.dataTransfer.effectAllowed = 'move';
};

const DraggableItem = ({ type, label, icon: Icon, meta, variant = 'default' }: any) => (
  <div 
    className={`flex items-center gap-3 p-2 rounded-md cursor-grab transition-colors group/item ${variant === 'highlight' ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500' : 'hover:bg-blue-600 text-zinc-300 hover:text-white'}`}
    onDragStart={(event) => onDragStart(event, type, label, meta)}
    draggable
  >
    <Icon size={16} className={`${variant === 'highlight' ? 'text-amber-500' : 'text-zinc-500 group-hover/item:text-white'} transition-colors`} />
    <span className="text-xs font-medium whitespace-nowrap">{label}</span>
  </div>
);

const ToolGroup = ({ icon: GroupIcon, label, children }: any) => (
  <div className="relative group w-full flex justify-center py-4 cursor-pointer hover:bg-zinc-800 transition-colors">
    <div className="flex flex-col items-center gap-1 text-zinc-500 group-hover:text-white transition-colors">
      <GroupIcon size={24} />
      <span className="text-[9px] uppercase font-bold tracking-tighter scale-75">{label}</span>
    </div>
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-[#E347F8] opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute left-full top-0 ml-1 bg-zinc-950 border border-zinc-800 rounded-r-lg rounded-bl-lg p-2 shadow-[5px_0_30px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-[9999] min-w-[160px] flex flex-col gap-1 translate-x-[-5px] group-hover:translate-x-0">
      <div className="text-[10px] uppercase font-bold text-zinc-600 px-2 py-1 mb-1 border-b border-zinc-900 flex justify-between items-center">
          <span>{label}</span>
      </div>
      {children}
    </div>
  </div>
);

interface SidebarProps {
    onSwitchToMobile: () => void;
}

export default function Sidebar({ onSwitchToMobile }: SidebarProps) {
  return (
    <aside className="w-20 bg-zinc-950 border-r border-zinc-900 flex flex-col items-center py-4 z-40 h-full overflow-visible">
      
      <div 
        className="mb-4 cursor-pointer transition-transform hover:scale-105 active:scale-95 group"
        onClick={onSwitchToMobile} 
        title="Ir para o App One Live"
      >
        <OneLiveLogo size={42} showText={false} className="shadow-lg shadow-purple-500/20" />
      </div>
      
      <div className="w-8 h-px bg-zinc-800 mx-auto mb-2"></div>

      <div className="flex-1 w-full flex flex-col gap-1">
        
        {/* MESTRA */}
        <div className="w-full px-2 mb-2" title="Campanha Mestra (Arraste)">
             <div 
                className="w-full aspect-square bg-amber-500/10 border border-amber-500/20 rounded-xl flex flex-col items-center justify-center cursor-grab hover:bg-amber-500/20 transition-all group"
                onDragStart={(event) => onDragStart(event, 'campaignNode', 'Campanha Mestra')}
                draggable
             >
                <Target size={20} className="text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[8px] font-bold text-amber-500 uppercase text-center leading-none">Mestra</span>
             </div>
        </div>

        <div className="w-8 h-px bg-zinc-800 mx-auto my-1"></div>

        {/* 1. Financeiro */}
        <ToolGroup icon={Wallet} label="Financeiro">
            <DraggableItem type="investmentNode" label="Investimento" icon={Wallet} />
            <DraggableItem type="bidNode" label="Lance Máximo" icon={Gavel} />
        </ToolGroup>

        {/* 2. Canais */}
        <ToolGroup icon={Smartphone} label="Canais">
            <DraggableItem type="channelNode" label="Feed" icon={Smartphone} meta={{ channelType: 'feed' }} />
            <DraggableItem type="channelNode" label="Reels" icon={Clapperboard} meta={{ channelType: 'reels' }} />
            <DraggableItem type="channelNode" label="Stories" icon={CircleDashed} meta={{ channelType: 'stories' }} />
            <DraggableItem type="channelNode" label="One Tube" icon={MonitorPlay} meta={{ channelType: 'tube' }} />
            <DraggableItem type="channelNode" label="One Music" icon={Music} meta={{ channelType: 'music' }} />
        </ToolGroup>

        {/* 3. Posts */}
        <ToolGroup icon={FileImage} label="Posts">
            <DraggableItem type="mediaVideoNode" label="Vídeo" icon={Video} meta={{ isAd: false }} />
            <DraggableItem type="mediaImageNode" label="Imagem Única" icon={ImageIcon} meta={{ isAd: false }} />
            <DraggableItem type="mediaCarouselNode" label="Carrossel" icon={Layers} meta={{ isAd: false }} />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="quizNode" label="Quiz / Pesquisa" icon={ClipboardList} />
        </ToolGroup>

        {/* 4. Anúncios */}
        <ToolGroup icon={Megaphone} label="Anúncios">
            <DraggableItem type="mediaVideoNode" label="Vídeo Ad" icon={Video} meta={{ isAd: true, label: "Vídeo Ad" }} />
            <DraggableItem type="mediaImageNode" label="Imagem Ad" icon={ImageIcon} meta={{ isAd: true, label: "Imagem Ad" }} />
            <DraggableItem type="mediaCarouselNode" label="Carrossel Ad" icon={Layers} meta={{ isAd: true, label: "Carrossel Ad" }} />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="quizNode" label="Quiz Ad" icon={ClipboardList} meta={{ isAd: true, label: "Quiz Ad" }} />
        </ToolGroup>

        {/* 5. Targeting (ATUALIZADO COM DEMOGRÁFICO) */}
        <ToolGroup icon={Filter} label="Targeting">
            <DraggableItem type="segmentNode" label="Demográfico" icon={Users} meta={{ segmentType: 'demo' }} />
            <DraggableItem type="segmentNode" label="Wallet Power" icon={Wallet} meta={{ segmentType: 'wallet' }} variant="highlight" />
            <DraggableItem type="segmentNode" label="Target Quiz" icon={HelpCircle} meta={{ segmentType: 'quiz' }} />
            <DraggableItem type="segmentNode" label="Shop Behavior" icon={ShoppingBag} meta={{ segmentType: 'shop' }} />
            <DraggableItem type="segmentNode" label="Vibe / Music" icon={Music} meta={{ segmentType: 'mood' }} />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="segmentNode" label="Geolocalização" icon={MapPin} meta={{ segmentType: 'geo' }} />
            <DraggableItem type="segmentNode" label="Dispositivo" icon={Smartphone} meta={{ segmentType: 'device' }} />
        </ToolGroup>

        {/* 6. Ações */}
        <ToolGroup icon={Wand2} label="Ações">
            <DraggableItem type="default" label="Público Alvo" icon={Users} />
            <DraggableItem type="default" label="Pagamento" icon={DollarSign} />
            <DraggableItem type="default" label="Mensagem" icon={MessageCircle} />
        </ToolGroup>

      </div>
    </aside>
  );
}