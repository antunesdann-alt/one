import { Video, Image as ImageIcon, X, Upload, Link2, BadgeCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function MediaOrganicPanel({ data, nodeId, onChange, onClose, type }: any) {
  const isVideo = type === 'mediaVideoNode' || type === 'videoNode';
  
  const Icon = isVideo ? Video : ImageIcon;
  const title = isVideo ? "Vídeo" : "Imagem Única";
  
  const headerColor = isVideo ? "bg-blue-600" : "bg-pink-600";
  const textColor = isVideo ? "text-blue-400" : "text-pink-400";
  const focusRing = isVideo ? "focus:ring-blue-500" : "focus:ring-pink-500";
  const iconColor = isVideo ? "text-blue-500" : "text-pink-500";

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
      
      {/* HEADER SEM A TAG "AD" */}
      <div className={`flex items-center justify-between px-4 py-3 ${headerColor} shrink-0`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{title}</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
            <X size={16} className="text-white" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        
        <div>
           <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">POST (ORGÂNICO)</Label>
        </div>

        <div className="space-y-2">
          <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>NOME DO NODE</Label>
          <Input 
             value={data.label || ''} 
             onChange={(e) => onChange(nodeId, { label: e.target.value })} 
             className={`bg-zinc-900 border-zinc-800 text-white font-medium h-10 ${focusRing}`} 
          />
        </div>

        <div className="space-y-2">
           <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>ARQUIVO & CAPA</Label>
           <div className="grid grid-cols-2 gap-2">
               <div className={`h-24 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:${textColor} transition-colors`}>
                   <Upload size={18} className="mb-1.5" />
                   <span className="text-[10px] font-medium uppercase">{isVideo ? 'Upload MP4' : 'Upload Imagem'}</span>
               </div>
               <div className={`h-24 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:${textColor} transition-colors`}>
                   <span className="text-[10px] font-medium uppercase text-center px-2">Trocar Capa</span>
               </div>
           </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">LEGENDA</Label>
          <textarea 
             value={data.caption || ''} 
             onChange={(e) => onChange(nodeId, { caption: e.target.value })} 
             className={`w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg p-3 text-xs min-h-[80px] resize-none focus:outline-none focus:ring-1 ${focusRing} placeholder:text-zinc-600`} 
             placeholder="Escreva uma legenda engajadora..."
          />
        </div>

        {/* ÁREA DE LINK: Post Orgânico TRAVADO em Smart Link */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-3 space-y-4">
            <div className="space-y-2">
                <Label className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${textColor}`}>
                    <Link2 size={12}/> SMART LINK (INTERNO)
                </Label>
                <Input 
                    value={data.url || ''} 
                    onChange={(e) => onChange(nodeId, { url: e.target.value })} 
                    className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                    placeholder="Cole o Link One Live (Produto/Conteúdo)" 
                />
                <p className="text-[9px] text-zinc-500 italic">*Links externos bloqueados em posts orgânicos.</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800/50">
                <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>TEXTO DO CTA (BOTÃO)</Label>
                <Input 
                    value={data.ctaText || ''} 
                    onChange={(e) => onChange(nodeId, { ctaText: e.target.value })} 
                    className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                    placeholder="Ex: Saiba Mais, Comprar Agora..." 
                />
            </div>
        </div>

        <div className="space-y-3 pt-2">
           <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">SOCIAL & TAGS</Label>
           <Input 
               value={data.collab || ''} 
               onChange={(e) => onChange(nodeId, { collab: e.target.value })} 
               className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
               placeholder="Convidar Colaborador" 
           />
           <Input 
               value={data.tagsUser || ''} 
               onChange={(e) => onChange(nodeId, { tagsUser: e.target.value })} 
               className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
               placeholder="Marcar Pessoas" 
           />
           <Input 
               value={data.hashtags || ''} 
               onChange={(e) => onChange(nodeId, { hashtags: e.target.value })} 
               className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
               placeholder="#Tags" 
           />
           
           <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
               <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                   <BadgeCheck size={14} className={iconColor} />
                   Parceria Paga
               </span>
               <Switch checked={data.isPaidPartnership || false} onCheckedChange={(checked) => onChange(nodeId, { isPaidPartnership: checked })} />
           </div>
        </div>

        <div className="h-4"></div>
      </div>

      <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0">
          <Button onClick={onClose} className="w-full bg-white hover:bg-zinc-200 text-black font-bold h-10 rounded-lg transition-colors">
              Concluir Edição
          </Button>
      </div>
    </div>
  );
}