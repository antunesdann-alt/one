import { ClipboardList, X, ExternalLink, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function QuizAdPanel({ data, nodeId, onChange, onClose }: any) {
  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 shrink-0">
        <div className="flex items-center gap-2">
          <ClipboardList size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Quiz Ad</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded">AD</span>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors"><X size={16} className="text-white" /></button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-blue-400 uppercase">Capa & Identidade</Label>
          <Input value={data.name || ''} onChange={(e) => onChange(nodeId, { name: e.target.value })} onFocus={(e) => e.target.select()} className="bg-zinc-900 border-zinc-800 text-white h-10" placeholder="Nome do Anúncio de Quiz" />
        </div>

        <div className="h-32 bg-zinc-900 rounded-md border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-600 cursor-pointer hover:bg-zinc-800 transition-colors">
          <ImageIcon size={32} className="mb-2" />
          <span className="text-xs font-bold uppercase tracking-wider">Capa</span>
        </div>

        <div className="space-y-4 pt-2 border-t border-zinc-800">
          <div className="grid grid-cols-3 gap-2">
             <div className="col-span-2 space-y-2">
               <Label className="text-xs font-bold text-zinc-400 uppercase">CTA (Botão)</Label>
               <Input value={data.cta || ''} onChange={(e) => onChange(nodeId, { cta: e.target.value })} onFocus={(e) => e.target.select()} className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm" />
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-bold text-zinc-400 uppercase">Freq. Máx</Label>
               <Input type="number" value={data.maxFreq || ''} onChange={(e) => onChange(nodeId, { maxFreq: e.target.value })} onFocus={(e) => e.target.select()} className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm" />
             </div>
          </div>
          <div className="space-y-2">
             <div className="relative">
               <ExternalLink size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
               <Input value={data.url || ''} onChange={(e) => onChange(nodeId, { url: e.target.value })} onFocus={(e) => e.target.select()} className="pl-9 bg-zinc-900 border-zinc-800 text-white h-10 text-sm" placeholder="URL Externa (https://)" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}