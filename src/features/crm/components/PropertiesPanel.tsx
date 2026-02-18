import { 
    X, Plus, Trash2, Filter, Wallet, HelpCircle, 
    Smartphone, MapPin, Music, ShoppingBag, Users, 
    GitFork, Repeat, CheckCircle2,
    Lock, BarChart3, Banknote, Image as ImageIcon, Link as LinkIcon, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea"; 
import { useState } from "react";

const formatBRL = (value: number | string) => {
    const num = parseFloat(value?.toString() || '0');
    return new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
};

export default function PropertiesPanel({ selectedNode, onChange, onClose }: any) {
  if (!selectedNode) return null;

  const { type, data } = selectedNode;
  const inputStyle = "bg-black border-zinc-800 text-white font-medium focus:border-blue-600 selection:bg-blue-600 selection:text-white placeholder:text-zinc-700";

  // --- HELPER: ATUALIZAÇÃO GENÉRICA ---
  const updateField = (field: string, value: any) => { onChange(selectedNode.id, { [field]: value }); };

  // --- STATES & HELPERS LOCAIS ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');

  // --- LÓGICA ESPECÍFICA: TARGET QUIZ (SEGMENTAÇÃO) ---
  const addLogicBranch = () => {
      const branches = data.branches || [];
      const logicType = branches.length === 0 ? 'if' : 'elif';
      if (branches.some((b: any) => b.logic === 'else')) return; // Bloqueia se já tiver Else
      const newBranch = { 
          id: Date.now(), 
          logic: logicType, 
          conditions: [{ id: Date.now(), question: '', operator: 'equal', answer: '', logicOp: null }],
          label: 'Nova Condição' 
      };
      updateField('branches', [...branches, newBranch]);
  };

  const addElseBranch = () => {
      const branches = data.branches || [];
      if (branches.some((b: any) => b.logic === 'else')) return;
      updateField('branches', [...branches, { id: Date.now(), logic: 'else', label: 'Outros (Resto)' }]);
  };

  const updateCondition = (branchIdx: number, condIdx: number, field: string, val: any) => {
      const branches = [...(data.branches || [])];
      branches[branchIdx].conditions[condIdx][field] = val;
      
      // Atualiza Label Visual do Node
      if (branches[branchIdx].logic !== 'else') {
          const first = branches[branchIdx].conditions[0];
          branches[branchIdx].label = `Q${first.question || '?'} ${first.operator === 'equal' ? '=' : '≠'} ${first.answer || '?'}`;
          if (branches[branchIdx].conditions.length > 1) branches[branchIdx].label += '...';
      }
      updateField('branches', branches);
  };

  const addConditionToBranch = (branchIdx: number) => {
      const branches = [...(data.branches || [])];
      branches[branchIdx].conditions.push({ id: Date.now(), question: '', operator: 'equal', answer: '', logicOp: 'and' });
      updateField('branches', branches);
  };

  const removeBranch = (idx: number) => {
      const branches = [...(data.branches || [])];
      branches.splice(idx, 1);
      if (branches.length > 0 && branches[0].logic === 'elif') branches[0].logic = 'if';
      updateField('branches', branches);
  };

  // --- LÓGICA ESPECÍFICA: MÍDIA & QUIZ FORM ---
  const handleSlideUpload = (e: any, idx: number) => { const file = e.target.files[0]; if (file) { const url = URL.createObjectURL(file); const newSlides = [...(data.slides || [])]; newSlides[idx] = { ...newSlides[idx], image: url }; updateField('slides', newSlides); } };
  const addSlide = () => { const s = data.slides || []; if (s.length < 5) { updateField('slides', [...s, { id: Date.now(), image: null }]); setCurrentSlide(s.length); }};
  const removeSlide = () => { const s = data.slides || []; if (s.length > 1) { const n = [...s]; n.splice(currentSlide, 1); updateField('slides', n); setCurrentSlide(0); }};
  
  // Quiz Form (Perguntas) - Limitado a 5
  const addQuestion = () => { const q = data.questions || []; if (q.length < 5) updateField('questions', [...q, { id: Date.now(), text: '', type: 'multiple', mandatory: false, options: ['Opção A', 'Opção B'] }]); };
  const updateQuestion = (i: number, f: string, v: any) => { const q = [...data.questions]; q[i][f] = v; updateField('questions', q); };
  const updateOption = (qi: number, oi: number, v: string) => { const q = [...data.questions]; q[qi].options[oi] = v; updateField('questions', q); };
  const addOption = (qi: number) => { const q = [...data.questions]; if (q[qi].options.length < 5) { q[qi].options.push('Nova Opção'); updateField('questions', q); }};
  
  // --- RENDERIZADORES ISOLADOS (SEGURANÇA MÁXIMA) ---

  // 1. Segmentação (Target Quiz, Wallet, etc)
  if (type === 'segmentNode') {
      const segType = data.segmentType;
      const headerColor = segType === 'quiz' ? 'bg-indigo-900/20 border-indigo-900/30' : 'bg-zinc-900 border-zinc-800';
      const HeaderIcon = segType === 'wallet' ? Wallet : segType === 'quiz' ? GitFork : Filter;
      const title = segType === 'wallet' ? 'Poder de Compra' : segType === 'quiz' ? 'Lógica Condicional' : 'Segmentação';

      return (
        <aside className="absolute right-0 top-0 h-full w-[340px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
            <div className={`p-4 border-b flex justify-between items-center ${headerColor}`}>
                <div className="flex items-center gap-2 text-zinc-300"><HeaderIcon size={16}/><span className="text-xs font-bold uppercase">{title}</span></div>
                <Button variant="ghost" size="icon" onClick={onClose}><X size={14}/></Button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-6">
                
                {/* LÓGICA DO TARGET QUIZ */}
                {segType === 'quiz' && (
                    <div className="space-y-4">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] text-indigo-300">
                            Crie ramificações de campanha baseadas nas respostas do usuário.
                        </div>
                        
                        <div className="space-y-2">
                            <Label className="text-[10px] text-zinc-500">QUIZ DE ORIGEM</Label>
                            <select className="w-full bg-black border border-zinc-800 rounded p-2 text-xs text-white">
                                <option>Quiz: Perfil de Investidor</option>
                                <option>Quiz: Tipo de Pele</option>
                            </select>
                        </div>

                        {/* LISTA DE BRANCHES */}
                        <div className="space-y-4 relative pl-3 border-l border-zinc-800 ml-1">
                            {(data.branches || []).map((branch: any, bIdx: number) => (
                                <div key={branch.id} className="relative bg-zinc-900 border border-zinc-800 rounded-md p-3">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${branch.logic === 'if' ? 'bg-blue-600 text-white' : branch.logic === 'elif' ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                                            {branch.logic.toUpperCase()} {branch.logic !== 'else' && '(SE)'}
                                        </span>
                                        <Trash2 size={12} className="text-zinc-600 hover:text-red-500 cursor-pointer" onClick={() => removeBranch(bIdx)}/>
                                    </div>

                                    {branch.logic !== 'else' ? (
                                        <div className="space-y-3">
                                            {branch.conditions.map((cond: any, cIdx: number) => (
                                                <div key={cond.id} className="space-y-2">
                                                    {cIdx > 0 && <div className="text-center"><span className="text-[9px] bg-zinc-800 px-1 rounded text-zinc-400 uppercase">{cond.logicOp}</span></div>}
                                                    <div className="p-2 bg-black/40 rounded border border-zinc-800/50 space-y-2">
                                                        <div className="flex gap-2">
                                                            <select className="bg-transparent border-b border-zinc-700 w-12 text-[10px] text-white" value={cond.question} onChange={(e) => updateCondition(bIdx, cIdx, 'question', e.target.value)}><option value="">Q?</option><option value="1">Q1</option><option value="2">Q2</option></select>
                                                            <select className="bg-transparent border-b border-zinc-700 w-12 text-[10px] text-zinc-400 text-center" value={cond.operator} onChange={(e) => updateCondition(bIdx, cIdx, 'operator', e.target.value)}><option value="equal">==</option><option value="not_equal">!=</option></select>
                                                            <select className="flex-1 bg-transparent border-b border-zinc-700 text-[10px] text-white" value={cond.answer} onChange={(e) => updateCondition(bIdx, cIdx, 'answer', e.target.value)}><option value="">Resposta...</option><option value="A">Opção A</option><option value="B">Opção B</option></select>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex justify-center pt-1"><button onClick={() => addConditionToBranch(bIdx)} className="text-[9px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1">+ E (AND)</button></div>
                                        </div>
                                    ) : (
                                        <p className="text-[10px] text-zinc-500 italic text-center">Para todos os outros casos.</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Button size="sm" variant="outline" className="h-7 text-[10px] border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700" onClick={addLogicBlock}>+ Condição</Button>
                            <Button size="sm" variant="outline" className="h-7 text-[10px] border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700" onClick={addElseBranch}>+ Else (Fim)</Button>
                        </div>
                    </div>
                )}

                {/* OUTROS TIPOS DE SEGMENTO */}
                {segType === 'wallet' && (
                    <div className="space-y-4">
                        <div className="space-y-2"><Label className="text-[10px]">SALDO MÍNIMO</Label><Input type="number" placeholder="0,00" className={inputStyle} onChange={(e) => updateField('summary', `Saldo > R$ ${e.target.value}`)}/></div>
                    </div>
                )}
                {segType === 'demo' && (
                    <div className="space-y-4">
                        <div className="space-y-2"><Label className="text-[10px]">IDADE / GÊNERO</Label><Input placeholder="Ex: 18-35, Mulheres" className={inputStyle} onChange={(e) => updateField('summary', e.target.value)}/></div>
                    </div>
                )}

            </div>
            <div className="p-4 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200">Salvar Lógica</Button></div>
        </aside>
      );
  }

  // 2. Campanha Mestra
  if (isCampaign) {
      return (
        <aside className="absolute right-0 top-0 h-full w-[340px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex justify-between items-center"><div className="flex items-center gap-2 text-amber-500"><Zap size={16}/><span className="text-xs font-bold uppercase text-white">Campanha</span></div><Button variant="ghost" size="icon" onClick={onClose}><X size={14}/></Button></div>
            <div className="flex-1 p-5 space-y-6">
                <div className="space-y-2"><Label className="text-[10px] text-amber-500 font-bold">NOME INTERNO</Label><Input value={data.label || ''} onChange={(e) => updateField('label', e.target.value)} className={`${inputStyle} border-amber-900/50`}/></div>
                <div className="bg-zinc-900/30 p-3 rounded border border-zinc-800 space-y-3">
                    <div className="flex justify-between"><span className="text-[10px] text-zinc-500">SALDO</span><span className="text-sm font-mono text-green-500">{formatBRL(data.balance)}</span></div>
                    <div className="flex gap-2"><Input type="number" placeholder="Valor" className="h-8 text-xs bg-black" value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)}/><Button size="sm" className="h-8 bg-green-600 hover:bg-green-500 text-[10px]" onClick={handleDeposit}>Depositar</Button></div>
                </div>
                <div className="space-y-1"><Label className="text-[10px] text-zinc-500">BUDGET TOTAL</Label><Input value={formatBRL(data.budget)} readOnly className="bg-black text-zinc-500 border-zinc-800 cursor-not-allowed"/></div>
            </div>
            <div className="p-4 border-t border-zinc-900"><Button className="w-full bg-white text-black">Concluir</Button></div>
        </aside>
      );
  }

  // 3. Lance Máximo
  if (isBid) {
      return (
        <aside className="absolute right-0 top-0 h-full w-[340px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
            <div className="p-4 border-b border-zinc-900 flex justify-between items-center"><span className="text-xs font-bold uppercase text-zinc-400">Lance Máximo</span><Button variant="ghost" size="icon" onClick={onClose}><X size={14}/></Button></div>
            <div className="p-5 space-y-4"><div className="space-y-2"><Label className="text-[10px] text-zinc-500">VALOR MÁXIMO (CPV)</Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">R$</span><Input type="number" value={data.value} onChange={(e)=>updateField('value', e.target.value)} className={`${inputStyle} pl-8`}/></div></div></div>
            <div className="mt-auto p-4 border-t border-zinc-900"><Button className="w-full bg-white text-black">Concluir</Button></div>
        </aside>
      );
  }

  // 4. Configuração de Mídia e Quiz (Conteúdo)
  // Se chegou aqui, é Mídia (Video, Imagem, Carrossel) ou Quiz de Pergunta
  const headerTitle = isQuiz ? 'Configuração de Pesquisa' : (isAd ? 'Anúncio (Criativo)' : 'Post (Criativo)');
  
  return (
    <aside className="absolute right-0 top-0 h-full w-[340px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
      <div className="p-4 border-b border-zinc-900 flex justify-between items-center">
        <div className="flex items-center gap-2"><span className="text-xs font-bold uppercase text-zinc-400">{headerTitle}</span></div>
        <Button variant="ghost" size="icon" onClick={onClose}><X size={14} /></Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-6">
        {/* NOME */}
        <div className="space-y-2"><Label className="text-[10px] text-zinc-500 font-bold">NOME DO NODE</Label><Input value={data.label || ''} onChange={(e) => updateField('label', e.target.value)} className={inputStyle} /></div>

        {/* --- CARROSSEL --- */}
        {isCarousel && (
            <div className="bg-zinc-900/50 p-3 rounded border border-zinc-900 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800"><span className="text-[10px] text-blue-500 font-bold">SLIDES ({currentSlide+1}/{slides.length})</span></div>
                
                {/* PREVIEW + UPLOAD */}
                <div className="aspect-video bg-black rounded border border-dashed border-zinc-700 relative group flex items-center justify-center overflow-hidden">
                    <input type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={(e) => handleSlideUpload(e, currentSlide)}/>
                    {slides[currentSlide]?.image ? <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${slides[currentSlide].image})`}}/> : <ImageIcon size={20} className="text-zinc-600"/>}
                    <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none z-20">
                        <button className="pointer-events-auto p-1 bg-black/50 rounded-full text-white disabled:opacity-30" onClick={(e)=>{e.preventDefault(); setCurrentSlide(c=>Math.max(0,c-1))}} disabled={currentSlide===0}><ChevronLeft size={16}/></button>
                        <button className="pointer-events-auto p-1 bg-black/50 rounded-full text-white disabled:opacity-30" onClick={(e)=>{e.preventDefault(); setCurrentSlide(c=>Math.min(slides.length-1,c+1))}} disabled={currentSlide===slides.length-1}><ChevronRight size={16}/></button>
                    </div>
                </div>

                {/* TEXTOS */}
                <div className="space-y-2">
                    <Input placeholder="Título (H1)" value={slides[currentSlide].h1} onChange={(e)=>updateSlide(currentSlide, 'h1', e.target.value)} className={`${inputStyle} text-xs font-bold`}/>
                    <Textarea placeholder="Parágrafo" value={slides[currentSlide].p} onChange={(e)=>updateSlide(currentSlide, 'p', e.target.value)} className={`${inputStyle} text-xs min-h-[60px]`}/>
                </div>

                {/* CTA & LINKS (AD vs ORGÂNICO) */}
                <div className={`p-2 rounded border ${isAd ? 'bg-red-900/10 border-red-900/30' : 'bg-blue-900/10 border-blue-900/30'} space-y-2`}>
                    <div className="flex gap-2">
                        <div className="flex-1 space-y-1"><Label className="text-[9px] text-zinc-500">CTA</Label><Input placeholder="Saiba Mais" className={`${inputStyle} text-[10px]`} value={slides[currentSlide].cta} onChange={(e)=>updateSlide(currentSlide, 'cta', e.target.value)}/></div>
                        {isAd && <div className="w-1/3 space-y-1"><Label className="text-[9px] text-zinc-500">Freq. Máx</Label><Input value={slides.length} readOnly className={`${inputStyle} text-[10px] text-center cursor-not-allowed`}/></div>}
                    </div>
                    <div className="relative">
                        {isAd ? <ExternalLink size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500"/> : <LinkIcon size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-500"/>}
                        <Input placeholder={isAd ? "URL Externa" : "Link Interno One Live"} className={`${inputStyle} text-[10px] pl-6`} value={slides[currentSlide].url} onChange={(e)=>updateSlide(currentSlide, 'url', e.target.value)}/>
                    </div>
                </div>

                {/* AÇÕES SLIDE */}
                <div className="flex gap-2 pt-2 border-t border-zinc-800">
                    <Button className="flex-1 h-8 bg-white text-black hover:bg-zinc-200 text-[10px]" onClick={addSlide}><Plus size={12} className="mr-1"/> Novo Slide</Button>
                    {slides.length > 1 && <Button size="icon" variant="destructive" className="h-8 w-8" onClick={removeSlide}><Trash2 size={14}/></Button>}
                </div>

                {/* PARCERIA PAGA */}
                <div className="flex items-center justify-between pt-2"><span className="text-[10px] text-zinc-400">Parceria Paga</span><Switch className="scale-75 data-[state=checked]:bg-blue-600"/></div>
                {isAd && <div className="text-center pt-2"><span className="text-[9px] text-zinc-500">Frequência Global: </span><span className="text-[9px] text-white font-bold">{data.frequency || 3}</span></div>}
            </div>
        )}

        {/* --- VIDEO / IMAGEM --- */}
        {(isVideo || isImageNode) && (
            <div className="space-y-2">
                <div className="aspect-video bg-zinc-900 rounded border border-dashed border-zinc-700 flex flex-col items-center justify-center cursor-pointer relative group">
                    <input type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={(e)=>handleFileUpload(e, 'thumbnail')}/>
                    {data.thumbnail ? <div className="absolute inset-0 bg-cover bg-center rounded" style={{backgroundImage: `url(${data.thumbnail})`}}/> : <div className="text-center"><Upload size={16} className="mx-auto mb-1 text-zinc-500"/><span className="text-[9px] text-zinc-500">Upload Mídia</span></div>}
                </div>
                <div className="space-y-2 pt-2">
                    <Label className="text-[10px] text-zinc-500">LEGENDA</Label>
                    <Textarea className={`${inputStyle} min-h-[80px]`} placeholder="Escreva a legenda..."/>
                </div>
                {/* Links unificados para Video/Imagem */}
                <div className={`p-2 rounded border mt-2 ${isAd ? 'bg-red-900/10 border-red-900/30' : 'bg-blue-900/10 border-blue-900/30'} space-y-2`}>
                    <div className="flex gap-2">
                        <div className="flex-1 space-y-1"><Label className="text-[9px] text-zinc-500">CTA</Label><Input placeholder="Saiba Mais" className={`${inputStyle} text-[10px]`}/></div>
                        {isAd && <div className="w-1/3 space-y-1"><Label className="text-[9px] text-zinc-500">Freq.</Label><Input type="number" className={`${inputStyle} text-[10px] text-center`} value={data.frequency || 3} onChange={(e)=>updateField('frequency', e.target.value)}/></div>}
                    </div>
                    <Input placeholder={isAd ? "URL Externa" : "Link Interno"} className={`${inputStyle} text-[10px]`}/>
                </div>
            </div>
        )}

        {/* --- QUIZ CREATION (FORMULÁRIO) --- */}
        {isQuiz && (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 h-24">
                    <div className="border border-dashed border-zinc-700 rounded bg-zinc-900/50 flex items-center justify-center relative cursor-pointer">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>handleFileUpload(e,'thumbnail')}/>
                        {data.thumbnail ? <div className="absolute inset-0 bg-cover bg-center rounded" style={{backgroundImage:`url(${data.thumbnail})`}}/> : <span className="text-[9px] text-zinc-500">Capa</span>}
                    </div>
                    <div className="space-y-2">
                       <Input placeholder="Título (H1)" className={`${inputStyle} text-xs`} value={data.label} onChange={(e)=>updateField('label', e.target.value)}/>
                       {isAd && <div className="flex items-center justify-between border border-zinc-800 rounded p-1"><span className="text-[9px] text-red-400 font-bold pl-1">Freq.</span><Input className="w-10 h-6 text-[10px] bg-black border-none text-center" value={data.frequency||3} onChange={(e)=>updateField('frequency', e.target.value)}/></div>}
                    </div>
                </div>
                
                <div className="h-px bg-zinc-800"></div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-zinc-500">PERGUNTAS ({data.questions?.length||0}/5)</span><Button size="sm" className="h-6 text-[10px]" onClick={addQuestion}>+ Add</Button></div>
                    {(data.questions || []).map((q: any, qIdx: number) => (
                        <div key={q.id} className="bg-zinc-900 border border-zinc-800 rounded p-3 space-y-3 relative">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold bg-zinc-800 px-2 rounded text-zinc-400">#{qIdx+1}</span>
                                <Trash2 size={12} className="text-zinc-600 hover:text-red-500 cursor-pointer" onClick={()=>removeQuestion(qIdx)}/>
                            </div>
                            
                            <Input placeholder="Digite a pergunta..." className="bg-black border-zinc-800 text-white text-xs" value={q.text} onChange={(e)=>updateQuestion(qIdx, 'text', e.target.value)}/>
                            
                            <div className="space-y-2 pl-2 border-l border-zinc-800">
                                {/* Cabeçalho Respostas + Obrigatória */}
                                {isAd && (
                                    <div className="flex justify-end items-center gap-2 mb-1">
                                        <span className="text-[8px] font-bold text-zinc-500 uppercase">Obrigatória?</span>
                                        <Switch className="scale-75 data-[state=checked]:bg-green-500" checked={q.mandatory} onCheckedChange={(v)=>updateQuestion(qIdx, 'mandatory', v)}/>
                                    </div>
                                )}
                                
                                {q.options.map((opt: string, oIdx: number) => (
                                    <Input key={oIdx} value={opt} onChange={(e)=>updateOption(qIdx, oIdx, e.target.value)} className="h-7 text-[10px] bg-zinc-950 border-zinc-800 text-zinc-400 focus:text-white"/>
                                ))}
                                <Button variant="ghost" className="h-6 text-[10px] text-zinc-500 w-full justify-start" onClick={()=>addOption(qIdx)}>+ Opção</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
      <div className="p-4 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold" onClick={onClose}>Concluir</Button></div>
    </aside>
  );
}