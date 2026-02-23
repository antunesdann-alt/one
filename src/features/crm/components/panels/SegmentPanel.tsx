import { Users, X, Heart, Briefcase, CalendarDays, Globe2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SegmentPanel({ data, nodeId, onChange, onClose }: any) {
  const type = data.segmentType || 'demo';

  // Se for Demográfico, renderiza o layout específico:
  if (type === 'demo') {
      const demo = data.demo || {
          ageMin: 18, ageMax: 65,
          gender: 'ALL',
          relEnabled: false, marital: [],
          profEnabled: false, education: [],
          lifeEnabled: false, events: []
      };

      const updateDemo = (updates: any) => {
          onChange(nodeId, { demo: { ...demo, ...updates } });
      };

      const toggleArrayItem = (array: string[], item: string, key: string) => {
          const newArray = array.includes(item) ? array.filter(i => i !== item) : [...array, item];
          updateDemo({ [key]: newArray });
      };

      return (
        <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-zinc-700 selection:text-white">
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-800 shrink-0">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-zinc-300" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Demográfico</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
                <X size={16} className="text-zinc-300 hover:text-white" />
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-6">
            
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">NOME DO PÚBLICO</Label>
              <Input 
                 value={data.label || 'Público Demográfico'} 
                 onChange={(e) => onChange(nodeId, { label: e.target.value })} 
                 className="bg-zinc-900 border-zinc-800 text-white font-medium h-10 focus:ring-zinc-600" 
              />
            </div>

            {/* MÓDULO 1: DADOS PESSOAIS (Sempre visível) */}
            <div className="space-y-4 bg-zinc-900/40 border border-zinc-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Users size={14} className="text-zinc-400" />
                    <Label className="text-xs font-bold text-white uppercase">Dados Básicos</Label>
                </div>

                <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Faixa Etária</Label>
                    <div className="flex items-center gap-2">
                        <Input type="number" value={demo.ageMin} onChange={(e) => updateDemo({ ageMin: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-9 text-center" />
                        <span className="text-zinc-500 text-xs font-bold">até</span>
                        <Input type="number" value={demo.ageMax} onChange={(e) => updateDemo({ ageMax: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-9 text-center" />
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Gênero</Label>
                    <div className="grid grid-cols-3 gap-1">
                        <button onClick={() => updateDemo({ gender: 'ALL' })} className={`py-1.5 text-[10px] font-bold rounded-md border transition-colors ${demo.gender === 'ALL' ? 'bg-zinc-100 text-black border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>Todos</button>
                        <button onClick={() => updateDemo({ gender: 'M' })} className={`py-1.5 text-[10px] font-bold rounded-md border transition-colors ${demo.gender === 'M' ? 'bg-zinc-100 text-black border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>Homens</button>
                        <button onClick={() => updateDemo({ gender: 'F' })} className={`py-1.5 text-[10px] font-bold rounded-md border transition-colors ${demo.gender === 'F' ? 'bg-zinc-100 text-black border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>Mulheres</button>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1"><Globe2 size={12}/> Idioma Primário</Label>
                    <Input placeholder="Ex: Português, Inglês..." className="bg-zinc-900 border-zinc-800 text-white h-9 text-xs" />
                </div>
            </div>

            {/* MÓDULO 2: RELACIONAMENTO */}
            <div className={`border ${demo.relEnabled ? 'border-pink-900/50 bg-pink-950/10' : 'border-zinc-800 bg-zinc-900/20'} rounded-xl p-4 transition-colors`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart size={14} className={demo.relEnabled ? "text-pink-500" : "text-zinc-500"} />
                        <Label className={`text-xs font-bold uppercase ${demo.relEnabled ? "text-pink-400" : "text-zinc-400"}`}>Relacionamento</Label>
                    </div>
                    <Switch checked={demo.relEnabled} onCheckedChange={(c) => updateDemo({ relEnabled: c })} className="data-[state=checked]:bg-pink-600" />
                </div>

                {demo.relEnabled && (
                    <div className="space-y-3 pt-4 mt-2 border-t border-pink-900/30">
                        <Label className="text-[10px] font-bold text-pink-500/70 uppercase tracking-wider">Estado Civil</Label>
                        <div className="flex flex-wrap gap-2">
                            {['Solteiro(a)', 'Namorando', 'Noivo(a)', 'Casado(a)'].map(status => (
                                <button 
                                    key={status} 
                                    onClick={() => toggleArrayItem(demo.marital, status, 'marital')}
                                    className={`px-3 py-1.5 text-[10px] font-bold rounded-full border transition-all ${demo.marital.includes(status) ? 'bg-pink-600 border-pink-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-pink-900'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* MÓDULO 3: PROFISSÃO & CARREIRA */}
            <div className={`border ${demo.profEnabled ? 'border-blue-900/50 bg-blue-950/10' : 'border-zinc-800 bg-zinc-900/20'} rounded-xl p-4 transition-colors`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Briefcase size={14} className={demo.profEnabled ? "text-blue-500" : "text-zinc-500"} />
                        <Label className={`text-xs font-bold uppercase ${demo.profEnabled ? "text-blue-400" : "text-zinc-400"}`}>Profissão & Escolaridade</Label>
                    </div>
                    <Switch checked={demo.profEnabled} onCheckedChange={(c) => updateDemo({ profEnabled: c })} className="data-[state=checked]:bg-blue-600" />
                </div>

                {demo.profEnabled && (
                    <div className="space-y-4 pt-4 mt-2 border-t border-blue-900/30">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-blue-500/70 uppercase tracking-wider">Nível de Escolaridade</Label>
                            <div className="flex flex-wrap gap-2">
                                {['Ensino Médio', 'Ensino Superior', 'Pós/Mestrado'].map(edu => (
                                    <button 
                                        key={edu} 
                                        onClick={() => toggleArrayItem(demo.education, edu, 'education')}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-full border transition-all ${demo.education.includes(edu) ? 'bg-blue-600 border-blue-500 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-blue-900'}`}
                                    >
                                        {edu}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-blue-500/70 uppercase tracking-wider">Setor / Cargo</Label>
                            <Input placeholder="Ex: Engenharia, Médico, Varejo..." className="bg-zinc-900 border-zinc-800 text-white h-9 text-xs focus:ring-blue-500" />
                        </div>
                    </div>
                )}
            </div>

            {/* MÓDULO 4: MOMENTOS DE VIDA */}
            <div className={`border ${demo.lifeEnabled ? 'border-amber-900/50 bg-amber-950/10' : 'border-zinc-800 bg-zinc-900/20'} rounded-xl p-4 transition-colors`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={14} className={demo.lifeEnabled ? "text-amber-500" : "text-zinc-500"} />
                        <Label className={`text-xs font-bold uppercase ${demo.lifeEnabled ? "text-amber-400" : "text-zinc-400"}`}>Momentos de Vida</Label>
                    </div>
                    <Switch checked={demo.lifeEnabled} onCheckedChange={(c) => updateDemo({ lifeEnabled: c })} className="data-[state=checked]:bg-amber-600" />
                </div>

                {demo.lifeEnabled && (
                    <div className="space-y-3 pt-4 mt-2 border-t border-amber-900/30">
                        <Label className="text-[10px] font-bold text-amber-500/70 uppercase tracking-wider">Eventos Recentes / Próximos</Label>
                        <div className="flex flex-col gap-2">
                            {['Aniversário nos próximos 30 dias', 'Mudança de casa recente', 'Começou novo emprego', 'Pais de Recém-nascidos'].map(event => (
                                <button 
                                    key={event} 
                                    onClick={() => toggleArrayItem(demo.events, event, 'events')}
                                    className={`px-3 py-2 text-[10px] font-bold rounded-lg border text-left transition-all ${demo.events.includes(event) ? 'bg-amber-600/20 border-amber-500 text-amber-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-amber-900'}`}
                                >
                                    {event}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="h-4"></div>
          </div>

          <div className="p-4 bg-zinc-950 border-t border-zinc-900 shrink-0">
              <Button onClick={onClose} className="w-full bg-white hover:bg-zinc-200 text-black font-bold h-10 rounded-lg transition-colors">
                  Salvar Segmentação
              </Button>
          </div>
        </div>
      );
  }

  // Fallback para outros tipos de targeting (Semelhante, Interação, etc - serão desenvolvidos depois)
  return (
      <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 p-4">
          <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase text-zinc-400">Targeting: {type}</span>
              <button onClick={onClose} className="p-1"><X size={16}/></button>
          </div>
          <p className="text-sm text-zinc-500">Painel em desenvolvimento para este tipo.</p>
      </div>
  );
}