import { Video, Image as ImageIcon, X, Upload, Link2, BadgeCheck, CheckCircle2, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function MediaAdPanel({ data, nodeId, onChange, onClose, type }: any) {
  const isVideo = type === 'mediaVideoNode' || type === 'videoNode';
  
  const Icon = isVideo ? Video : ImageIcon;
  const title = isVideo ? "Vídeo Ad" : "Imagem Ad";
  
  const headerColor = isVideo ? "bg-blue-600" : "bg-pink-600";
  const textColor = isVideo ? "text-blue-400" : "text-pink-400";
  const focusRing = isVideo ? "focus:ring-blue-500" : "focus:ring-pink-500";
  const iconColor = isVideo ? "text-blue-500" : "text-pink-500";
  const switchClass = isVideo ? "data-[state=checked]:bg-blue-600" : "data-[state=checked]:bg-pink-600";

  const attentionOptions = Array.isArray(data.attentionOptions) && data.attentionOptions.length > 0
    ? data.attentionOptions.map((opt: any, i: number) => typeof opt === 'string' ? { id: i, text: opt } : opt)
    : [{ id: 1, text: '' }, { id: 2, text: '' }];

  const updateAttentionOption = (index: number, text: string) => {
      const newOpts = [...attentionOptions];
      newOpts[index].text = text;
      onChange(nodeId, { attentionOptions: newOpts });
  };
  const addAttentionOption = () => {
      onChange(nodeId, { attentionOptions: [...attentionOptions, { id: Date.now(), text: '' }] });
  };
  const removeAttentionOption = (index: number) => {
      onChange(nodeId, { attentionOptions: attentionOptions.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
      
      <div className={`flex items-center justify-between px-4 py-3 ${headerColor} shrink-0`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded">AD</span>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
             <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        
        <div>
           <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">POST (CRIATIVO)</Label>
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
           <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>
               ARQUIVO {isVideo ? '& CAPA' : ''}
           </Label>
           <div className={`grid ${isVideo ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
               <div className={`h-24 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:${textColor} transition-colors`}>
                   <Upload size={18} className="mb-1.5" />
                   <span className="text-[10px] font-medium uppercase">{isVideo ? 'Upload MP4' : 'Upload Imagem'}</span>
               </div>
               {isVideo && (
                   <div className={`h-24 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:${textColor} transition-colors`}>
                       <span className="text-[10px] font-medium uppercase text-center px-2">Trocar Capa</span>
                   </div>
               )}
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

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-3 space-y-4">
            <div className="space-y-2">
                <Label className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${textColor}`}>
                    <Link2 size={12}/> LINK DE DESTINO
                </Label>
                <Input 
                    value={data.url || ''} 
                    onChange={(e) => onChange(nodeId, { url: e.target.value })} 
                    className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                    placeholder="Cole a URL (Externa ou Smart Link)" 
                />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800/50">
                <div className="col-span-2 space-y-2">
                    <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>TEXTO DO CTA (BOTÃO)</Label>
                    <Input 
                        value={data.ctaText || ''} 
                        onChange={(e) => onChange(nodeId, { ctaText: e.target.value })} 
                        className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                        placeholder="Ex: Saiba Mais..." 
                    />
                </div>
                <div className="space-y-2">
                    <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>FREQ. MÁX</Label>
                    <Input 
                        type="number"
                        value={data.maxFreq || ''} 
                        onChange={(e) => onChange(nodeId, { maxFreq: e.target.value })} 
                        className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                    />
                </div>
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
               <Switch checked={data.isPaidPartnership || false} onCheckedChange={(checked) => onChange(nodeId, { isPaidPartnership: checked })} className={switchClass} />
           </div>
        </div>

        {/* VALIDAÇÃO DE ATENÇÃO: LAYOUT TIPO QUIZ */}
        <div className="bg-teal-950/20 border border-teal-900/50 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-teal-500" />
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Validação de Atenção</span>
                </div>
                {/* Switch agora acompanha a cor do Header (Azul ou Rosa) */}
                <Switch checked={data.attentionEnabled || false} onCheckedChange={(checked) => onChange(nodeId, { attentionEnabled: checked })} className={switchClass} />
            </div>

            {data.attentionEnabled && (
                <div className="space-y-4 pt-2 border-t border-teal-900/30">
                    <div className="flex items-center justify-between">
                        <select 
                            className="bg-zinc-900 border border-zinc-700 text-white text-xs rounded px-2 py-1 outline-none"
                            value={data.attentionType || 'single'}
                            onChange={(e) => onChange(nodeId, { attentionType: e.target.value })}
                        >
                            <option value="single">Escolha única</option>
                            <option value="multiple">Múltipla Escolha</option>
                        </select>
                    </div>
                    
                    <Input
                        value={data.attentionQuestion || ''}
                        onChange={(e) => onChange(nodeId, { attentionQuestion: e.target.value })}
                        placeholder="Digite a pergunta de validação..."
                        className="bg-zinc-950 border-zinc-800 text-white h-9 text-xs focus:ring-teal-500"
                    />

                    <div className="space-y-2 pt-1">
                        {attentionOptions.map((opt: any, oIndex: number) => (
                            <div key={opt.id || oIndex} className="flex items-center gap-3">
                                <Input 
                                    placeholder={`Opção ${oIndex + 1}`} 
                                    value={opt.text} 
                                    onChange={(e) => updateAttentionOption(oIndex, e.target.value)} 
                                    className="bg-zinc-950 border-zinc-800 text-white h-8 text-xs flex-1 focus:ring-teal-500" 
                                />
                                {attentionOptions.length > 2 && (
                                   <button onClick={() => removeAttentionOption(oIndex)} className="text-zinc-500 hover:text-red-500"><Trash2 size={14} /></button>
                                )}
                            </div>
                        ))}
                        <button onClick={addAttentionOption} className="text-[10px] text-teal-400 font-bold hover:text-teal-300 transition-colors">+ Nova Opção</button>
                    </div>
                    <p className="text-[9px] text-zinc-500 italic">Pesquisa bônus. O usuário só receberá recompensas se interagir.</p>
                </div>
            )}
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