import { Layers, Image as ImageIcon, X, Link2, BadgeCheck, Plus, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CarouselOrganicPanel({ data, nodeId, onChange, onClose }: any) {
  const headerColor = "bg-orange-600";
  const textColor = "text-orange-500";
  const focusRing = "focus:ring-orange-500";
  const iconColor = "text-orange-500";
  const switchClass = "data-[state=checked]:bg-orange-600";

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = Array.isArray(data.slides) && data.slides.length > 0 
    ? data.slides 
    : [{ id: 1, caption: '' }, { id: 2, caption: '' }, { id: 3, caption: '' }];

  const handleAddSlide = () => {
    const newSlides = [...slides, { id: Date.now(), caption: '' }];
    onChange(nodeId, { slides: newSlides });
    setActiveSlide(newSlides.length - 1);
  };

  const handleRemoveSlide = () => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((_: any, i: number) => i !== activeSlide);
    onChange(nodeId, { slides: newSlides });
    if (activeSlide >= newSlides.length) {
        setActiveSlide(newSlides.length - 1);
    }
  };

  const handlePrevSlide = () => { if (activeSlide > 0) setActiveSlide(activeSlide - 1); };
  const handleNextSlide = () => { if (activeSlide < slides.length - 1) setActiveSlide(activeSlide + 1); };

  const handleCaptionChange = (val: string) => {
    const newSlides = [...slides];
    newSlides[activeSlide] = { ...newSlides[activeSlide], caption: val };
    onChange(nodeId, { slides: newSlides });
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
      
      <div className={`flex items-center justify-between px-4 py-3 ${headerColor} shrink-0`}>
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Carrossel</span>
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
            <div className="flex items-center justify-between mb-2">
                <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>GERENCIAR SLIDES</Label>
                <button 
                    onClick={handleAddSlide}
                    className={`text-[10px] font-bold uppercase ${textColor} hover:text-white transition-colors flex items-center gap-1`}
                >
                    <Plus size={12}/> Adicionar
                </button>
            </div>
            
            <div className="relative w-full aspect-[4/5] max-h-[220px] bg-zinc-900/80 rounded-lg border border-dashed border-zinc-700 flex items-center justify-between px-3 group">
                <button onClick={handlePrevSlide} disabled={activeSlide === 0} className="p-1.5 bg-black/40 rounded-full text-zinc-400 hover:text-white disabled:opacity-0 transition-all z-10">
                    <ChevronLeft size={24} />
                </button>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <ImageIcon size={48} className={`${iconColor} mb-3 opacity-40`} />
                    <span className="text-sm font-bold uppercase text-white tracking-wider bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">Slide {activeSlide + 1} / {slides.length}</span>
                    
                    {slides.length > 1 && (
                        <button onClick={(e) => { e.stopPropagation(); handleRemoveSlide(); }} className="mt-3 text-zinc-400 hover:text-red-400 transition-colors pointer-events-auto flex items-center gap-1.5 bg-black/60 hover:bg-black/80 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                            <Trash2 size={14} /> Excluir
                        </button>
                    )}
                </div>

                <button onClick={handleNextSlide} disabled={activeSlide === slides.length - 1} className="p-1.5 bg-black/40 rounded-full text-zinc-400 hover:text-white disabled:opacity-0 transition-all z-10">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
              <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">LEGENDA DO SLIDE {activeSlide + 1}</Label>
          </div>
          <textarea 
             value={slides[activeSlide]?.caption || ''} 
             onChange={(e) => handleCaptionChange(e.target.value)} 
             className={`w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg p-3 text-xs min-h-[80px] resize-none focus:outline-none focus:ring-1 ${focusRing} placeholder:text-zinc-600`} 
             placeholder={`Escreva a legenda específica para o Slide ${activeSlide + 1}...`}
          />
        </div>

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
                <p className="text-[9px] text-zinc-500 italic">*Links externos e CTAs customizados são bloqueados em posts orgânicos.</p>
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