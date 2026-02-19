import { FileText, X, ImageIcon, Type, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function QuizOrganicPanel({ data, nodeId, onChange, onClose }: any) {
  const updateField = (f: string, v: any) => onChange(nodeId, { [f]: v });
  const updateQuestion = (i: number, f: string, v: any) => { const q = [...(data.questions||[])]; q[i][f] = v; updateField('questions', q); };
  const addQuestion = () => { const q = data.questions || []; if(q.length < 5) updateField('questions', [...q, { id: Date.now(), text: '', options: ['Opção A'] }]); };
  const removeQuestion = (i: number) => { const q = [...(data.questions||[])]; q.splice(i, 1); updateField('questions', q); };
  const handleUpload = (e: any, f: string) => { const file = e.target.files[0]; if (file) updateField(f, URL.createObjectURL(file)); };

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-indigo-600">
            <div className="flex items-center gap-2 text-white"><FileText size={18}/><span className="text-sm font-bold uppercase">{data.label || 'Pesquisa'}</span></div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white"><X size={16}/></Button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
            <div className="space-y-6">
                <div className="space-y-2"><Label className="text-xs text-blue-500 font-bold uppercase">CAPA & IDENTIDADE</Label></div>
                <Input value={data.label} onChange={(e) => updateField('label', e.target.value)} className="bg-black border-zinc-800 text-white h-10" placeholder="Nome da Pesquisa" onFocus={(e)=>e.target.select()}/>
                
                <div className="grid grid-cols-2 gap-3 h-32">
                    <div className="border border-dashed border-zinc-700 rounded-lg bg-zinc-900/50 flex items-center justify-center relative cursor-pointer">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>handleUpload(e,'thumbnail')}/>
                        {data.thumbnail ? <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{backgroundImage:`url(${data.thumbnail})`}}/> : <div className="flex flex-col items-center"><ImageIcon size={20} className="text-zinc-600 mb-1"/><span className="text-[10px] text-zinc-600 font-bold uppercase">Capa</span></div>}
                    </div>
                    {/* (Omiti logo/bg por brevidade, mas pode manter se quiser) */}
                </div>

                <div className="h-px bg-zinc-800"></div>
                <div className="space-y-5">
                    <div className="flex justify-between items-center"><span className="text-xs font-bold text-zinc-500 uppercase">PERGUNTAS ({data.questions?.length||0}/5)</span><Button size="sm" className="h-7 text-[10px] px-3 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 font-bold uppercase" onClick={addQuestion}>+ Adicionar</Button></div>
                    {(data.questions || []).map((q: any, qIdx: number) => (
                        <div key={q.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-4 relative">
                            <div className="flex justify-between items-center"><span className="text-[10px] font-bold bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">#{qIdx+1}</span><Trash2 size={14} className="text-zinc-600 hover:text-red-500 cursor-pointer" onClick={()=>removeQuestion(qIdx)}/></div>
                            <Input placeholder="Pergunta..." className="bg-black border-zinc-800 text-white text-sm h-10" value={q.text} onChange={(e)=>updateQuestion(qIdx, 'text', e.target.value)} onFocus={(e)=>e.target.select()}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-10" onClick={onClose}>Concluir Edição</Button></div>
    </aside>
  );
}