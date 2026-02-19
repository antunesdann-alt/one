import { Smartphone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChannelPanel({ data, onClose }: any) {
  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/50">
            <div className="flex items-center gap-2 text-zinc-400"><Smartphone size={18}/><span className="text-sm font-bold uppercase text-blue-500">{data.channelType || 'Canal'}</span></div>
            <Button variant="ghost" size="icon" onClick={onClose}><X size={16}/></Button>
        </div>
        <div className="p-6 space-y-6">
            <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 text-center space-y-2">
                <div className="text-zinc-500 text-xs uppercase font-bold">Destino Selecionado</div>
                <div className="text-xl text-white font-black uppercase tracking-widest">{data.channelType || 'Feed'}</div>
            </div>
            <p className="text-sm text-zinc-500 text-center">Este node define onde o conteúdo será publicado.<br/>Não requer configurações adicionais.</p>
        </div>
    </aside>
  );
}