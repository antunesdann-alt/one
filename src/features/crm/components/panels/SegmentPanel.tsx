import { Wallet, GitFork, Filter, Trash2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SegmentPanel({ data, nodeId, onChange, onClose }: any) {
  const updateField = (field: string, val: any) => onChange(nodeId, { [field]: val });
  const updateCondition = (bi: number, ci: number, f: string, v: any) => { const b=[...data.branches]; b[bi].conditions[ci][f]=v; updateField('branches', b); };
  
  const addLogicBlock = () => { const b = data.branches || []; if(b.some((x:any)=>x.logic==='else')) return; updateField('branches', [...b, { id: Date.now(), logic: b.length===0?'if':'elif', conditions: [{ id: Date.now(), operator: 'equal' }] }]); };
  const addElseBranch = () => { const b = data.branches || []; if(b.some((x:any)=>x.logic==='else')) return; updateField('branches', [...b, { id: Date.now(), logic: 'else' }]); };
  const removeBranch = (i: number) => { const b = [...(data.branches||[])]; b.splice(i,1); if(b.length>0 && b[0].logic==='elif') b[0].logic='if'; updateField('branches', b); };
  const addConditionToBranch = (bi: number) => { const b=[...data.branches]; b[bi].conditions.push({ id:Date.now(), operator:'equal', logicOp:'and' }); updateField('branches', b); };

  const segmentType = data.segmentType;
  const headerConfig: any = {
      quiz: { bg: 'bg-indigo-900/20', icon: GitFork, color: 'text-indigo-200', label: 'Lógica Condicional' },
      wallet: { bg: 'bg-emerald-900/20', icon: Wallet, color: 'text-emerald-200', label: 'Poder de Compra' },
      default: { bg: 'bg-zinc-800', icon: Filter, color: 'text-zinc-300', label: 'Segmentação' }
  };
  const theme = headerConfig[segmentType] || headerConfig.default;
  const Icon = theme.icon;

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className={`p-5 border-b border-zinc-800 flex justify-between items-center ${theme.bg}`}>
            <div className="flex items-center gap-2"><Icon size={18} className={theme.color}/><span className="text-sm font-bold uppercase text-blue-500">{theme.label}</span></div>
            <Button variant="ghost" size="icon" onClick={onClose}><X size={16}/></Button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-8">
            {segmentType === 'quiz' && (
                <div className="space-y-5">
                    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded text-xs text-indigo-300">Crie ramificações de campanha baseadas nas respostas do usuário.</div>
                    <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">QUIZ DE ORIGEM</Label><select className="w-full bg-black border border-zinc-800 rounded p-3 text-sm text-white outline-none focus:border-indigo-500"><option>Quiz: Perfil Investidor</option></select></div>
                    
                    <div className="space-y-4 relative pl-4 border-l border-zinc-800 ml-1">
                        {(data.branches || []).map((branch: any, bIdx: number) => (
                            <div key={branch.id} className="relative bg-zinc-900 border border-zinc-800 rounded-md p-4">
                                <div className="flex justify-between items-center mb-3">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${branch.logic === 'if' ? 'bg-blue-600 text-white' : branch.logic === 'elif' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300'}`}>{branch.logic.toUpperCase()} {branch.logic !== 'else' && '(SE)'}</span>
                                    <Trash2 size={14} className="text-zinc-600 hover:text-red-500 cursor-pointer" onClick={() => removeBranch(bIdx)}/>
                                </div>
                                {branch.logic !== 'else' ? (
                                    <div className="space-y-3">
                                        {branch.conditions.map((cond: any, cIdx: number) => (
                                            <div key={cond.id} className="space-y-2">
                                                {cIdx > 0 && <div className="text-center"><span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 uppercase font-bold">{cond.logicOp}</span></div>}
                                                <div className="p-3 bg-black/40 rounded border border-zinc-800/50 space-y-3">
                                                    <div className="flex gap-2">
                                                        <select className="bg-transparent border-b border-zinc-700 w-16 text-xs text-white" value={cond.question} onChange={(e) => updateCondition(bIdx, cIdx, 'question', e.target.value)}><option value="">Q?</option><option value="1">Q1</option><option value="2">Q2</option></select>
                                                        <select className="bg-transparent border-b border-zinc-700 w-12 text-xs text-zinc-400 text-center" value={cond.operator} onChange={(e) => updateCondition(bIdx, cIdx, 'operator', e.target.value)}><option value="equal">==</option><option value="not_equal">!=</option></select>
                                                        <select className="flex-1 bg-transparent border-b border-zinc-700 text-xs text-white" value={cond.answer} onChange={(e) => updateCondition(bIdx, cIdx, 'answer', e.target.value)}><option value="">Resp...</option><option value="A">Opção A</option></select>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-center pt-2"><button onClick={() => addConditionToBranch(bIdx)} className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold">+ E (AND)</button></div>
                                    </div>
                                ) : (<p className="text-xs text-zinc-500 italic text-center">Para todos os outros casos.</p>)}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button size="sm" variant="outline" className="h-9 text-xs border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700" onClick={addLogicBlock}>+ Condição</Button>
                        <Button size="sm" variant="outline" className="h-9 text-xs border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700" onClick={addElseBranch}>+ Else</Button>
                    </div>
                </div>
            )}
            {segmentType !== 'quiz' && (
                <div className="space-y-4">
                    <div className="space-y-2"><Label className="text-xs font-bold text-zinc-500">VALOR / PARÂMETRO</Label><Input className="bg-black border-zinc-800 text-white h-10" onChange={(e) => onChange(nodeId, { summary: e.target.value })}/></div>
                </div>
            )}
        </div>
        <div className="p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-10" onClick={onClose}>Salvar Lógica</Button></div>
    </aside>
  );
}