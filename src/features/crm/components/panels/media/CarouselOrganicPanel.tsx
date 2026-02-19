import { Layers, X, ChevronLeft, ChevronRight, ImageIcon, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function CarouselOrganicPanel({ data, nodeId, onChange, onClose }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data.slides || [{ id: 1, image: null, h1: '', p: '' }];
  const updateField = (f: string, v: any) => onChange(nodeId, { [f]: v });
  
  const addSlide = () => { if (slides.length >= 5) return; updateField('slides', [...slides, { id: Date.now(), image: null, h1: '', p: '' }]); setCurrentSlide(slides.length); };
  const removeSlide = () => { if (slides.length <= 1) return; const n = [...slides]; n.splice(currentSlide, 1); updateField('slides', n); setCurrentSlide(Math.max(0, currentSlide - 1)); };
  const updateSlide = (f: string, v: string) => { const n = [...slides]; n[currentSlide] = { ...n[currentSlide], [f]: v }; updateField('slides', n); };
  const handleUpload = (e: any) => { const f = e.target.files[0]; if (f) { const n = [...slides]; n[currentSlide].image = URL.createObjectURL(f); updateField('slides', n); } };

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-orange-600">
            <div className="flex items-center gap-2 text-white"><Layers size={18}/><span className="text-sm font-bold uppercase">{data.label || 'Carrossel Post'}</span></div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white"><X size={16}/></Button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
            <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">NOME DO POST</Label><Input value={data.label} onChange={(e)=>updateField('label',e.target.value)} className="bg-black border-zinc-800 text-white h-10" onFocus={(e)=>e.target.select()}/></div>
            
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-900 space-y-5">
                <div className="aspect-video bg-black rounded-lg border border-dashed border-zinc-700 relative group flex items-center justify-center overflow-hidden">
                    <input type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={handleUpload}/>
                    {slides[currentSlide]?.image ? <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${slides[currentSlide].image})`}}/> : <ImageIcon size={24} className="text-zinc-600"/>}
                    <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none z-20">
                        <button className="pointer-events-auto p-1 bg-black/60 rounded-full text-white hover:bg-black" onClick={()=>setCurrentSlide(Math.max(0,currentSlide-1))} disabled={currentSlide===0}><ChevronLeft size={18}/></button>
                        <button className="pointer-events-auto p-1 bg-black/60 rounded-full text-white hover:bg-black" onClick={()=>setCurrentSlide(Math.min(slides.length-1,currentSlide+1))} disabled={currentSlide===slides.length-1}><ChevronRight size={18}/></button>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <Input placeholder="Título (H1)" value={slides[currentSlide].h1} onChange={(e)=>updateSlide('h1', e.target.value)} className="bg-black border-zinc-800 text-white font-bold h-10" onFocus={(e)=>e.target.select()}/>
                    <Textarea placeholder="Parágrafo (P)" value={slides[currentSlide].p} onChange={(e)=>updateSlide('p', e.target.value)} className="bg-black border-zinc-800 text-white min-h-[70px] text-xs" onFocus={(e)=>e.target.select()}/>
                </div>

                <div className="p-3 rounded-lg border bg-blue-900/10 border-blue-900/30 space-y-3">
                    <Label className="text-[10px] text-blue-500 font-bold uppercase">Link Interno (Produto)</Label>
                    <div className="relative"><LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"/><Input placeholder="Cole o Link One Live..." className="bg-black border-zinc-800 text-white text-xs h-9 pl-8" value={slides[currentSlide].url} onChange={(e)=>updateSlide('url', e.target.value)} onFocus={(e)=>e.target.select()}/></div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-zinc-800"><Button className="flex-1 h-9 bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase" onClick={addSlide}><Plus size={14} className="mr-1"/> Novo Slide</Button>{slides.length > 1 && <Button size="icon" variant="destructive" className="h-9 w-9" onClick={removeSlide}><Trash2 size={16}/></Button>}</div>
                <div className="flex items-center justify-between pt-2 px-1"><span className="text-xs text-zinc-400 font-medium">Parceria Paga</span><Switch className="scale-75 data-[state=checked]:bg-blue-600"/></div>
            </div>
        </div>
        <div className="p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-10" onClick={onClose}>Concluir Edição</Button></div>
    </aside>
  );
}