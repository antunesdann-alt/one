import { ClipboardList, X, Hash, BadgeCheck, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function QuizOrganicPanel({ data, nodeId, onChange, onClose }: any) {
  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 shrink-0">
        <div className="flex items-center gap-2">
          <ClipboardList size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Quiz / Pesquisa</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">ORGÂNICO</span>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors"><X size={16} className="text-white" /></button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-blue-400 uppercase">Capa & Identidade</Label>
          <Input value={data.name || ''} onChange={(e) => onChange(nodeId, { name: e.target.value })} onFocus={(e) => e.target.select()} className="bg-zinc-900 border-zinc-800 text-white h-10" placeholder="Nome da Pesquisa" />
        </div>

        <div className="h-32 bg-zinc-900 rounded-md border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-600 cursor-pointer hover:bg-zinc-800 transition-colors">
          <ImageIcon size={32} className="mb-2" />
          <span className="text-xs font-bold uppercase tracking-wider">Capa</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
             <Label className="text-xs font-bold text-zinc-400 uppercase">Smart Link Interno (CTA)</Label>
             <Input readOnly value="socialone://post/internal-link" onFocus={(e) => e.target.select()} className="bg-zinc-900/50 border-zinc-800 text-zinc-500 italic focus-visible:ring-0 cursor-default h-10 text-sm" />
          </div>
          <div className="space-y-2 pt-2 border-t border-zinc-800">
             <Label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1"><Hash size={14} /> Social & Tags</Label>
             <Input value={data.tags || ''} onChange={(e) => onChange(nodeId, { tags: e.target.value })} onFocus={(e) => e.target.select()} className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm" placeholder="Ex: #pesquisa" />
          </div>
          <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} className="text-blue-500" />
              <div className="flex flex-col"><span className="text-sm font-medium text-white">Parceria Paga</span></div>
            </div>
            <Switch checked={data.isPaidPartnership || false} onCheckedChange={(checked) => onChange(nodeId, { isPaidPartnership: checked })} />
          </div>
        </div>
      </div>
    </div>
  );
}