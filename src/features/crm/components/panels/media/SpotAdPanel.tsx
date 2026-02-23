import { Headphones, X, ExternalLink, Mic, Hash, BadgeCheck, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SpotAdPanel({ data, nodeId, onChange, onClose }: any) {
  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-purple-600 selection:text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-purple-600 shrink-0">
        <div className="flex items-center gap-2">
          <Headphones size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Spot (One Music)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded">AD</span>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors"><X size={16} className="text-white" /></button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-zinc-400 uppercase">Nome do Anúncio</Label>
          <Input value={data.name || ''} onChange={(e) => onChange(nodeId, { name: e.target.value })} onFocus={(e) => e.target.select()} className="bg-zinc-900 border-zinc-800 text-white h-10 focus:ring-purple-500" />
        </div>

        <div className="space-y-4 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
          <div className="h-28 bg-zinc-900 rounded-md border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:text-purple-400 transition-colors">
            <Mic size={28} className="mb-2" />
            <span className="text-xs font-bold uppercase tracking-wider">Upload de Áudio (.mp3, .wav)</span>
          </div>
          
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-zinc-400 uppercase">Tempo de Duração</Label>
            <div className="relative">
              <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <Input 
                 readOnly 
                 value="Calculado auto. no upload" 
                 className="pl-9 bg-zinc-900/50 border-zinc-800 text-zinc-500 italic focus-visible:ring-0 cursor-default h-9 text-xs" 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-zinc-800">
          <div className="grid grid-cols-3 gap-2">
             <div className="col-span-2 space-y-2">
               <Label className="text-[10px] font-bold text-zinc-400 uppercase">CTA (Botão)</Label>
               <Input 
                 value={data.cta || ''} 
                 onChange={(e) => onChange(nodeId, { cta: e.target.value })} 
                 onFocus={(e) => e.target.select()} 
                 className="bg-zinc-900 border-zinc-800 text-white h-10 text-xs focus:ring-purple-500" 
                 placeholder="Ex: Ouça Agora, Assinar Premium..." 
               />
             </div>
             <div className="space-y-2">
               <Label className="text-[10px] font-bold text-zinc-400 uppercase">Freq. Máx</Label>
               <Input 
                 type="number" 
                 value={data.maxFreq || ''} 
                 onChange={(e) => onChange(nodeId, { maxFreq: e.target.value })} 
                 onFocus={(e) => e.target.select()} 
                 className="bg-zinc-900 border-zinc-800 text-white h-10 text-xs focus:ring-purple-500" 
               />
             </div>
          </div>
          
          <div className="space-y-2">
             <Label className="text-[10px] font-bold text-zinc-400 uppercase">Link de Destino</Label>
             <div className="relative">
               <ExternalLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
               <Input 
                 value={data.url || ''} 
                 onChange={(e) => onChange(nodeId, { url: e.target.value })} 
                 onFocus={(e) => e.target.select()} 
                 className="pl-9 bg-zinc-900 border-zinc-800 text-white h-10 text-sm focus:ring-purple-500" 
                 placeholder="URL Externa ou Interna" 
               />
             </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-800">
             <Label className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1"><Hash size={14} /> Social & Tags</Label>
             <Input 
                value={data.tags || ''} 
                onChange={(e) => onChange(nodeId, { tags: e.target.value })} 
                onFocus={(e) => e.target.select()} 
                className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm focus:ring-purple-500" 
                placeholder="Ex: #lancamento #podcast" 
             />
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-purple-500" />
              <div className="flex flex-col"><span className="text-sm font-medium text-white">Parceria Paga</span></div>
            </div>
            <Switch checked={data.isPaidPartnership || false} onCheckedChange={(checked) => onChange(nodeId, { isPaidPartnership: checked })} className="data-[state=checked]:bg-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}