import { Video, Image as ImageIcon, X, Upload, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function MediaAdPanel({ data, nodeId, onChange, onClose, type }: any) {
  const isVideo = type === 'mediaVideoNode';
  const theme = isVideo ? { bg: 'bg-blue-600', icon: Video } : { bg: 'bg-pink-600', icon: ImageIcon };
  const Icon = theme.icon;
  const updateField = (f: string, v: any) => onChange(nodeId, { [f]: v });
  const handleUpload = (e: any) => { const f = e.target.files[0]; if (f) updateField('thumbnail', URL.createObjectURL(f)); };

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className={`p-5 border-b border-zinc-900 flex justify-between items-center ${theme.bg}`}>
            <div className="flex items-center gap-2 text-white"><Icon size={18}/><span className="text-sm font-bold uppercase">{data.label}</span></div>
            <div className="bg-white text-black text-[9px] font-black px-2 py-0.5 rounded shadow-sm mr-2">AD</div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white"><X size={16}/></Button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
            <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">NOME DO ANÚNCIO</Label><Input value={data.label} onChange={(e)=>updateField('label',e.target.value)} className="bg-black border-zinc-800 text-white h-10" onFocus={(e)=>e.target.select()}/></div>
            
            <div className="space-y-4">
                <div className={`aspect-video bg-zinc-900 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer relative group hover:bg-zinc-800`}>
                    <input type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={handleUpload}/>
                    {data.thumbnail ? <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${data.thumbnail})`}}/> : <div className="text-center"><Upload size={20} className="mx-auto mb-2 text-zinc-500"/><span className="text-[10px] text-zinc-500 uppercase font-bold">Upload</span></div>}
                </div>
                <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">LEGENDA</Label><Textarea className="bg-black border-zinc-800 text-white min-h-[90px] text-xs" placeholder="Escreva uma legenda..." onFocus={(e)=>e.target.select()}/></div>
                
                <div className="p-3 rounded-lg border bg-red-900/10 border-red-900/30 space-y-3">
                    <div className="flex gap-3">
                        <div className="flex-1 space-y-1"><Label className="text-[10px] text-zinc-500 uppercase font-bold">CTA</Label><Input placeholder="Saiba Mais" className="bg-black border-zinc-800 text-white text-xs h-9" onFocus={(e)=>e.target.select()}/></div>
                        <div className="w-1/3 space-y-1"><Label className="text-[10px] text-zinc-500 uppercase font-bold">Freq.</Label><Input type="number" className="bg-black border-zinc-800 text-white text-xs h-9 text-center" value={data.frequency||3} onChange={(e)=>updateField('frequency', e.target.value)} onFocus={(e)=>e.target.select()}/></div>
                    </div>
                    <div className="relative"><ExternalLink size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"/><Input placeholder="URL Externa" className="bg-black border-zinc-800 text-white text-xs h-9 pl-8" onFocus={(e)=>e.target.select()}/></div>
                </div>
            </div>
        </div>
        <div className="p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-10" onClick={onClose}>Concluir Edição</Button></div>
    </aside>
  );
}