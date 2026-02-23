import { Clock, X, Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TimePanel({ data, nodeId, onChange, onClose }: any) {
  const [newTime, setNewTime] = useState("");
  const times: string[] = data.times || [];

  // Máscara perfeita para Horário: Digita sem se preocupar com os "dois pontos"
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value.replace(/\D/g, ''); // Tira tudo que não é número
      if (val.length > 4) val = val.slice(0, 4); // Limita a 4 dígitos
      if (val.length > 2) {
          val = val.slice(0, 2) + ':' + val.slice(2, 4); // Bota o ":" no meio
      }
      setNewTime(val);
  };

  const handleAddTime = () => {
    // Só adiciona se estiver completo (5 chars) e bater a validação básica de horas
    if (newTime && newTime.length === 5 && !times.includes(newTime) && times.length < 5) {
      const [hh, mm] = newTime.split(':');
      if (Number(hh) < 24 && Number(mm) < 60) {
          onChange(nodeId, { times: [...times, newTime].sort() });
          setNewTime("");
      } else {
          alert("Por favor, insira um horário válido.");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTime();
    }
  };

  const handleRemoveTime = (timeToRemove: string) => {
    onChange(nodeId, { times: times.filter((t: string) => t !== timeToRemove) });
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-teal-600 selection:text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-teal-700 shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Configuração de Hora</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
          <X size={16} className="text-white" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">Adicionar Horário</Label>
                {/* LIMITE MÁXIMO DE 5 HORAS */}
                <span className="text-[10px] text-zinc-500 font-bold">{times.length}/5</span>
            </div>
            
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    {/* INPUT COM MÁSCARA AUTOMÁTICA EM VEZ DE TYPE="TIME" */}
                    <Input 
                        type="text" 
                        placeholder="Ex: 08:30"
                        value={newTime} 
                        onChange={handleTimeChange} 
                        onKeyDown={handleKeyDown}
                        disabled={times.length >= 5}
                        className="pl-9 bg-zinc-900 border-zinc-800 text-white font-mono font-bold text-sm h-10 w-full" 
                    />
                </div>
                <Button 
                    onClick={handleAddTime} 
                    disabled={times.length >= 5 || newTime.length !== 5}
                    className="bg-teal-700 hover:bg-teal-600 text-white font-bold h-10 px-4 transition-colors"
                >
                    <Plus size={16} />
                </Button>
            </div>

            <div className="space-y-2 mt-4">
                {times.length === 0 ? (
                    <p className="text-[10px] text-zinc-600 text-center py-4 border border-dashed border-zinc-800 rounded-lg">
                        Nenhum horário cadastrado.
                    </p>
                ) : (
                    times.map(time => (
                        <div key={time} className="flex justify-between items-center bg-zinc-900 border border-zinc-800 p-2 rounded-lg group">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
                                <span className="text-sm font-mono font-bold text-white">{time}</span>
                            </div>
                            <button onClick={() => handleRemoveTime(time)} className="text-zinc-600 hover:text-red-500 transition-colors p-1">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
}