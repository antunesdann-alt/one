"use client";

import { 
  Target, Wallet, Gavel, 
  Video, Image as ImageIcon, Layers, ClipboardList, 
  Smartphone, Clapperboard, CircleDashed, MonitorPlay, Music, 
  Users, DollarSign, MessageCircle, 
  Megaphone, Wand2, FileImage, 
  Filter, MapPin, ShoppingBag, HelpCircle, 
  Headphones, CalendarDays, Clock, 
  CopyPlus, MousePointerClick
} from "lucide-react";
import { OneLiveLogo } from "@/components/ui/OneLiveLogo";

const onDragStart = (event: React.DragEvent, nodeType: string, label: string, data?: any) => {
  event.dataTransfer.setData('application/reactflow/type', nodeType);
  event.dataTransfer.setData('application/reactflow/label', label);
  if (data) event.dataTransfer.setData('application/reactflow/data', JSON.stringify(data));
  event.dataTransfer.effectAllowed = 'move';
};

// COMPONENTE REFATORADO PARA HOVER INTELIGENTE DE CORES
const DraggableItem = ({ type, label, icon: Icon, meta, hoverColorClass = 'hover:bg-zinc-800' }: any) => (
  <div 
    className={`flex items-center gap-3 p-2 rounded-md cursor-grab transition-all group/item text-zinc-400 hover:text-white ${hoverColorClass}`}
    onDragStart={(event) => onDragStart(event, type, label, meta)}
    draggable
  >
    <Icon size={16} className={`text-zinc-500 group-hover/item:text-white transition-colors`} />
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

export default function Sidebar({ onSwitchToMobile }: any) {
  return (
    <aside className="w-20 bg-zinc-950 border-r border-zinc-900 flex flex-col items-center py-4 z-40 h-full overflow-visible">
      
      <div className="mb-4 cursor-pointer transition-transform hover:scale-105 active:scale-95 group" onClick={onSwitchToMobile}>
        <OneLiveLogo size={42} showText={false} className="shadow-lg shadow-purple-500/20" />
      </div>
      
      <div className="w-8 h-px bg-zinc-800 mx-auto mb-2"></div>

      <div className="flex-1 w-full flex flex-col gap-1">
        
        <div className="w-full px-2 mb-2" title="Campanha Mestra (Arraste)">
             <div className="w-full aspect-square bg-zinc-900/50 hover:bg-amber-600/40 text-zinc-400 hover:text-white border border-zinc-800 rounded-xl flex flex-col items-center justify-center cursor-grab transition-all group" onDragStart={(event) => onDragStart(event, 'campaignNode', 'Campanha Mestra')} draggable>
                <Target size={20} className="mb-1 transition-transform group-hover:scale-110" />
                <span className="text-[8px] font-bold uppercase text-center leading-none">Mestra</span>
             </div>
        </div>

        <div className="w-8 h-px bg-zinc-800 mx-auto my-1"></div>

        <ToolGroup icon={Wallet} label="Financeiro">
            <DraggableItem type="investmentNode" label="Investimento" icon={Wallet} hoverColorClass="hover:bg-emerald-600/40" />
            <DraggableItem type="bidNode" label="Lance Máximo" icon={Gavel} hoverColorClass="hover:bg-emerald-600/40" />
        </ToolGroup>

        <ToolGroup icon={Smartphone} label="Canais">
            <DraggableItem type="channelNode" label="Feed" icon={Smartphone} meta={{ channelType: 'feed' }} hoverColorClass="hover:bg-purple-600/40" />
            <DraggableItem type="channelNode" label="Reels" icon={Clapperboard} meta={{ channelType: 'reels' }} hoverColorClass="hover:bg-pink-600/40" />
            <DraggableItem type="channelNode" label="Stories" icon={CircleDashed} meta={{ channelType: 'stories' }} hoverColorClass="hover:bg-orange-600/40" />
            <DraggableItem type="channelNode" label="One Tube" icon={MonitorPlay} meta={{ channelType: 'tube' }} hoverColorClass="hover:bg-red-600/40" />
            <DraggableItem type="channelNode" label="One Music" icon={Music} meta={{ channelType: 'music' }} hoverColorClass="hover:bg-cyan-600/40" />
        </ToolGroup>

        <ToolGroup icon={FileImage} label="Posts">
            <DraggableItem type="mediaVideoNode" label="Vídeo" icon={Video} meta={{ isAd: false }} hoverColorClass="hover:bg-blue-600/40" />
            <DraggableItem type="mediaImageNode" label="Imagem Única" icon={ImageIcon} meta={{ isAd: false }} hoverColorClass="hover:bg-pink-600/40" />
            <DraggableItem type="mediaCarouselNode" label="Carrossel" icon={Layers} meta={{ isAd: false }} hoverColorClass="hover:bg-orange-600/40" />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="quizNode" label="Quiz / Pesquisa" icon={ClipboardList} hoverColorClass="hover:bg-indigo-600/40" />
        </ToolGroup>

        <ToolGroup icon={Megaphone} label="Anúncios">
            <DraggableItem type="mediaVideoNode" label="Vídeo Ad" icon={Video} meta={{ isAd: true, label: "Vídeo Ad" }} hoverColorClass="hover:bg-blue-600/40" />
            <DraggableItem type="mediaImageNode" label="Imagem Ad" icon={ImageIcon} meta={{ isAd: true, label: "Imagem Ad" }} hoverColorClass="hover:bg-pink-600/40" />
            <DraggableItem type="mediaCarouselNode" label="Carrossel Ad" icon={Layers} meta={{ isAd: true, label: "Carrossel Ad" }} hoverColorClass="hover:bg-orange-600/40" />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="spotNode" label="Spot (One Music)" icon={Headphones} meta={{ isAd: true, label: "Spot de Áudio" }} hoverColorClass="hover:bg-purple-600/40" />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="quizNode" label="Quiz Ad" icon={ClipboardList} meta={{ isAd: true, label: "Quiz Ad" }} hoverColorClass="hover:bg-indigo-600/40" />
        </ToolGroup>

        <ToolGroup icon={Filter} label="Targeting">
            <DraggableItem type="segmentNode" label="Demográfico" icon={Users} meta={{ segmentType: 'demo' }} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="segmentNode" label="Semelhante" icon={CopyPlus} meta={{ segmentType: 'lookalike' }} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="segmentNode" label="Interação" icon={MousePointerClick} meta={{ segmentType: 'interaction' }} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="segmentNode" label="Wallet Power" icon={Wallet} meta={{ segmentType: 'wallet' }} hoverColorClass="hover:bg-amber-600/40" />
            <DraggableItem type="segmentNode" label="Target Quiz" icon={HelpCircle} meta={{ segmentType: 'quiz' }} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="segmentNode" label="Shop Behavior" icon={ShoppingBag} meta={{ segmentType: 'shop' }} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="segmentNode" label="Vibe / Music" icon={Music} meta={{ segmentType: 'mood' }} hoverColorClass="hover:bg-zinc-700/50" />
            <div className="h-px bg-zinc-900 my-1"></div>
            <DraggableItem type="segmentNode" label="Geolocalização" icon={MapPin} meta={{ segmentType: 'geo' }} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="segmentNode" label="Dispositivo" icon={Smartphone} meta={{ segmentType: 'device' }} hoverColorClass="hover:bg-zinc-700/50" />
        </ToolGroup>

        <ToolGroup icon={CalendarDays} label="Agenda">
            <DraggableItem type="dateNode" label="Data de Publicação" icon={CalendarDays} hoverColorClass="hover:bg-cyan-600/40" />
            <DraggableItem type="timeNode" label="Horário de Publicação" icon={Clock} hoverColorClass="hover:bg-teal-600/40" />
        </ToolGroup>

        <ToolGroup icon={Wand2} label="Ações">
            <DraggableItem type="actionNode" label="Público Alvo" icon={Users} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="actionNode" label="Pagamento" icon={DollarSign} hoverColorClass="hover:bg-zinc-700/50" />
            <DraggableItem type="actionNode" label="Mensagem" icon={MessageCircle} hoverColorClass="hover:bg-zinc-700/50" />
        </ToolGroup>

      </div>
    </aside>
  );
}