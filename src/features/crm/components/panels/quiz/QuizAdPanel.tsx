import { ClipboardList, X, Image as ImageIcon, Plus, Trash2, BadgeCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function QuizAdPanel({ data, nodeId, onChange, onClose }: any) {
  const headerColor = "bg-indigo-600";
  const textColor = "text-indigo-400";
  const focusRing = "focus:ring-indigo-500";
  const switchClass = "data-[state=checked]:bg-indigo-600"; // COR DINÂMICA DO SWITCH

  const questions = data.questions || [];

  const handleAddQuestion = () => {
    if (questions.length >= 5) return;
    onChange(nodeId, { 
        questions: [...questions, { id: Date.now(), text: '', type: 'single', options: [{ id: 1, text: '', mandatory: false }, { id: 2, text: '', mandatory: false }] }] 
    });
  };

  const handleRemoveQuestion = (qIndex: number) => {
      const newQ = questions.filter((_: any, i: number) => i !== qIndex);
      onChange(nodeId, { questions: newQ });
  };

  const updateQuestionText = (qIndex: number, text: string) => {
      const newQ = [...questions];
      newQ[qIndex].text = text;
      onChange(nodeId, { questions: newQ });
  };

  const updateQuestionType = (qIndex: number, type: string) => {
      const newQ = [...questions];
      newQ[qIndex].type = type;
      onChange(nodeId, { questions: newQ });
  };

  const updateOptionText = (qIndex: number, oIndex: number, text: string) => {
      const newQ = [...questions];
      newQ[qIndex].options[oIndex].text = text;
      onChange(nodeId, { questions: newQ });
  };

  const updateOptionMandatory = (qIndex: number, oIndex: number, checked: boolean) => {
      const newQ = [...questions];
      newQ[qIndex].options[oIndex].mandatory = checked;
      onChange(nodeId, { questions: newQ });
  };

  const addOption = (qIndex: number) => {
      const newQ = [...questions];
      newQ[qIndex].options.push({ id: Date.now(), text: '', mandatory: false });
      onChange(nodeId, { questions: newQ });
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-indigo-600 selection:text-white">
      
      <div className={`flex items-center justify-between px-4 py-3 ${headerColor} shrink-0`}>
        <div className="flex items-center gap-2">
          <ClipboardList size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Quiz Ad</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded">AD</span>
          <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
             <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        
        <div className="space-y-3">
          <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>CAPA & IDENTIDADE (INTRO)</Label>
          <Input 
             value={data.label || ''} 
             onChange={(e) => onChange(nodeId, { label: e.target.value })} 
             className={`bg-zinc-900 border-zinc-800 text-white font-medium h-10 ${focusRing}`} 
             placeholder="Quiz / Pesquisa Ad"
          />

          <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="h-24 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:text-indigo-400 transition-colors">
                  <ImageIcon size={18} className="mb-1" />
                  <span className="text-[9px] font-medium uppercase">Capa / Thumb</span>
              </div>
              <div className="flex flex-col gap-2">
                  <div className="flex-1 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:text-indigo-400 transition-colors">
                      <span className="text-[9px] font-medium uppercase">Logo</span>
                  </div>
                  <div className="flex-1 bg-zinc-900/50 rounded-lg border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500 cursor-pointer hover:bg-zinc-800 hover:text-indigo-400 transition-colors">
                      <span className="text-[9px] font-medium uppercase">Background</span>
                  </div>
              </div>
          </div>

          <div className="space-y-2 mt-2">
              <Input value={data.h1 || ''} onChange={(e) => onChange(nodeId, { h1: e.target.value })} placeholder="T Título Principal (H1)" className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs ${focusRing}`} />
              <Input value={data.h2 || ''} onChange={(e) => onChange(nodeId, { h2: e.target.value })} placeholder="T Subtítulo ou Chamada (H2)" className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs ${focusRing}`} />
          </div>
        </div>

        <div className="border-t border-zinc-800/50"></div>

        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">PERGUNTAS ({questions.length}/5)</Label>
                <button onClick={handleAddQuestion} disabled={questions.length >= 5} className="flex items-center gap-1 text-[10px] font-bold bg-zinc-800 hover:bg-zinc-700 text-white px-2 py-1 rounded transition-colors disabled:opacity-50">
                    <Plus size={12} /> Adicionar
                </button>
            </div>

            <div className="space-y-4">
                {questions.map((q: any, qIndex: number) => (
                    <div key={q.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-zinc-500">#{qIndex + 1}</span>
                                <select 
                                    value={q.type || 'single'}
                                    onChange={(e) => updateQuestionType(qIndex, e.target.value)}
                                    className="bg-zinc-900 border border-zinc-700 text-white text-xs rounded px-2 py-1 outline-none"
                                >
                                    <option value="single">Escolha única</option>
                                    <option value="multiple">Múltipla Escolha</option>
                                </select>
                            </div>
                            <button onClick={() => handleRemoveQuestion(qIndex)} className="text-zinc-500 hover:text-red-500"><Trash2 size={14} /></button>
                        </div>
                        <Input placeholder="Digite a pergunta..." value={q.text} onChange={(e) => updateQuestionText(qIndex, e.target.value)} className="bg-zinc-950 border-zinc-800 text-white h-9 text-xs" />
                        
                        <div className="space-y-2 pt-1">
                            <div className="flex justify-end pr-1">
                                <span className="text-[8px] font-black uppercase tracking-wider text-zinc-400">OBRIGATÓRIA</span>
                            </div>
                            {q.options.map((opt: any, oIndex: number) => (
                                <div key={opt.id} className="flex items-center gap-3">
                                    <Input placeholder={`Opção ${oIndex + 1}`} value={opt.text} onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)} className="bg-zinc-950 border-zinc-800 text-white h-8 text-xs flex-1" />
                                    <Switch checked={opt.mandatory || false} onCheckedChange={(c) => updateOptionMandatory(qIndex, oIndex, c)} className={`scale-75 origin-right ${switchClass}`} />
                                </div>
                            ))}
                            <button onClick={() => addOption(qIndex)} className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300 transition-colors">+ Nova Opção</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t border-zinc-800/50"></div>

        <div className="space-y-4">
            <div className="space-y-2">
                <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>LINK DE DESTINO</Label>
                <Input 
                    value={data.url || ''} 
                    onChange={(e) => onChange(nodeId, { url: e.target.value })} 
                    className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                    placeholder="Cole a URL de destino final" 
                />
            </div>
            
            <div className="space-y-2">
                <Label className={`text-[10px] font-bold uppercase tracking-wider ${textColor}`}>TEXTO DO CTA (BOTÃO)</Label>
                <Input 
                    value={data.ctaText || ''} 
                    onChange={(e) => onChange(nodeId, { ctaText: e.target.value })} 
                    className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
                    placeholder="Ex: Começar Agora..." 
                />
            </div>
        </div>

        <div className="space-y-3 pt-2">
           <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider"># SOCIAL & TAGS</Label>
           <Input 
               value={data.hashtags || ''} 
               onChange={(e) => onChange(nodeId, { hashtags: e.target.value })} 
               className={`bg-zinc-900 border-zinc-800 text-white h-10 text-xs placeholder:text-zinc-600 ${focusRing}`} 
               placeholder="Ex: #pesquisa" 
           />
           
           <div className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800">
               <span className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                   <BadgeCheck size={14} className="text-indigo-500" />
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