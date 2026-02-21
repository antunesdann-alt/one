import { Layers, X, Plus, ChevronLeft, ChevronRight, Hash, BadgeCheck, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function CarouselOrganicPanel({ data, nodeId, onChange, onClose }: any) {
  const slides = Array.isArray(data.slides) && data.slides.length > 0 ? data.slides : [{ id: 1, title: '', text: '' }];
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeIndex = currentSlide >= slides.length ? Math.max(0, slides.length - 1) : currentSlide;

  const handleAddSlide = () => {
    const newSlides = [...slides, { id: Date.now(), title: '', text: '' }];
    onChange(nodeId, { slides: newSlides });
    setCurrentSlide(newSlides.length - 1);
  };

  const handleSlideChange = (field: string, value: string) => {
    const newSlides = [...slides];
    newSlides[activeIndex] = { ...newSlides[activeIndex], [field]: value };
    onChange(nodeId, { slides: newSlides });
  };

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100">
      {/* CORREÇÃO VISUAL: bg-orange-600 igual ao AD, py-3 para altura elegante, Tag Orgânico preservada */}
      <div className="flex items-center justify-between px-4 py-3 bg-orange-600 shrink-0">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Carrossel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">ORGÂNICO</span>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors"><X size={16} className="text-white" /></button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-zinc-400 uppercase">Nome da Publicação</Label>
          <Input value={data.name || ''} onChange={(e) => onChange(nodeId, { name: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-10" />
        </div>

        <div className="space-y-4 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-bold text-blue-400 uppercase">Slides ({activeIndex + 1}/{slides.length})</Label>
          </div>

          <div className="relative h-28 bg-zinc-900 rounded-md border border-dashed border-zinc-700 flex items-center justify-between px-2">
            <button onClick={prevSlide} disabled={activeIndex === 0} className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"><ChevronLeft size={20} /></button>
            <div className="flex flex-col items-center text-zinc-600">
              <ImageIcon size={24} className="mb-2" />
              <span className="text-[10px]">Upload de Imagem</span>
            </div>
            <button onClick={nextSlide} disabled={activeIndex === slides.length - 1} className="p-1 text-zinc-500 hover:text-white disabled:opacity-30"><ChevronRight size={20} /></button>
          </div>

          <Input value={slides[activeIndex]?.title || ''} onChange={(e) => handleSlideChange('title', e.target.value)} className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm" placeholder="Título (H1)" />
          <Textarea value={slides[activeIndex]?.text || ''} onChange={(e) => handleSlideChange('text', e.target.value)} className="bg-zinc-900 border-zinc-800 text-white min-h-[60px] text-sm" placeholder="Texto do Slide (P)" />

          <Button onClick={handleAddSlide} variant="secondary" className="w-full bg-white text-black hover:bg-zinc-200 h-10 text-xs font-bold">
            <Plus size={16} className="mr-2" /> NOVO SLIDE
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
             <Label className="text-xs font-bold text-zinc-400 uppercase">Smart Link Interno (CTA)</Label>
             <Input readOnly value="socialone://post/internal-link" className="bg-zinc-900/50 border-zinc-800 text-zinc-500 italic focus-visible:ring-0 cursor-default h-10 text-sm" />
          </div>
          <div className="space-y-2 pt-2 border-t border-zinc-800">
             <Label className="text-xs font-bold text-zinc-400 uppercase flex items-center gap-1"><Hash size={14} /> Social & Tags</Label>
             <Input value={data.tags || ''} onChange={(e) => onChange(nodeId, { tags: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm" placeholder="Ex: #novidade" />
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