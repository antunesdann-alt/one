import { Video, Image as ImageIcon, X, Upload, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function MediaOrganicPanel({ data, nodeId, onChange, onClose, type }: any) {
  const isVideo = type === 'mediaVideoNode';
  const theme = isVideo ? { bg: 'bg-blue-600', icon: Video } : { bg: 'bg-pink-600', icon: ImageIcon };
  const Icon = theme.icon;
  const updateField = (f: string, v: any) => onChange(nodeId, { [f]: v });
  const handleUpload = (e: any) => { const f = e.target.files[0]; if (f) updateField('thumbnail', URL.createObjectURL(f)); };

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className={`p-5 border-b border-zinc-900 flex justify-between items-center ${theme.bg}`}>
            <div className="flex items-center gap-2 text-white"><Icon size={18}/><span className="text-sm font-bold uppercase">{data.label}</span></div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white"><X size={16}/></Button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
            <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">NOME DO POST</Label><Input value={data.label} onChange={(e)=>updateField('label',e.target.value)} className="bg-black border-zinc-800 text-white h-10" onFocus={(e)=>e.target.select()}/></div>
            
            <div className="space-y-4">
                <div className={`aspect-video bg-zinc-900 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer relative group hover:bg-zinc-800`}>
                    <input type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={handleUpload}/>
                    {data.thumbnail ? <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${data.thumbnail})`}}/> : <div className="text-center"><Upload size={20} className="mx-auto mb-2 text-zinc-500"/><span className="text-[10px] text-zinc-500 uppercase font-bold">Upload</span></div>}
                </div>
                <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">LEGENDA</Label><Textarea className="bg-black border-zinc-800 text-white min-h-[90px] text-xs" placeholder="Escreva uma legenda..." onFocus={(e)=>e.target.select()}/></div>
                
                <div className="p-3 rounded-lg border bg-blue-900/10 border-blue-900/30 space-y-3">
                    <Label className="text-[10px] text-blue-500 font-bold uppercase">Link Interno (Produto)</Label>
                    <div className="relative"><LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"/><Input placeholder="Cole o Link One Live..." className="bg-black border-zinc-800 text-white text-xs h-9 pl-8" onFocus={(e)=>e.target.select()}/></div>
                </div>
                <div className="space-y-3 border-t border-zinc-900 pt-4"><Label className="text-xs font-bold text-zinc-500">Social & Tags</Label><Input placeholder="Convidar Colaborador" className="bg-black border-zinc-800 text-white text-xs h-9"/><Input placeholder="#Tags" className="bg-black border-zinc-800 text-white text-xs h-9" /><div className="flex items-center justify-between bg-zinc-900 p-2 rounded border border-zinc-800"><span className="text-xs text-zinc-400 font-medium">Parceria Paga</span><Switch className="scale-75 data-[state=checked]:bg-blue-600" /></div></div>
            </div>
        </div>
        <div className="p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-10" onClick={onClose}>Concluir Edição</Button></div>
    </aside>
  );
}