import { CalendarDays, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const formatBR = (isoDate: string) => {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export default function DatePanel({ data, nodeId, onChange, onClose }: any) {
  const mode = data.mode || 'single'; 
  const recurrence = data.recurrence || 'daily';
  const selectedWeekDays: number[] = data.selectedWeekDays || [];
  const customDates: string[] = data.customDates || [];

  const weekHeaders = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // LIMITE DE 35 DIAS (5 Semanas) APLICADO AQUI TAMBÉM
  const getCalendarDays = () => {
    if (!data.startDate || !data.endDate) return [];
    const days = [];
    let curr = new Date(data.startDate + 'T00:00:00');
    const last = new Date(data.endDate + 'T00:00:00');
    let count = 0;
    while (curr <= last && count < 35) { 
        days.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
        count++;
    }
    return days;
  };

  const days = mode === 'period' ? getCalendarDays() : [];
  const firstDayOffset = days.length > 0 ? days[0].getDay() : 0;

  const handleColumnClick = (dayIndex: number) => {
      if (recurrence !== 'weekly') return;
      if (selectedWeekDays.includes(dayIndex)) {
          onChange(nodeId, { selectedWeekDays: selectedWeekDays.filter((d: number) => d !== dayIndex) });
      } else {
          onChange(nodeId, { selectedWeekDays: [...selectedWeekDays, dayIndex] });
      }
  };

  const handleCellClick = (dateObj: Date) => {
      if (recurrence !== 'custom') return;
      const dStr = dateObj.toISOString().split('T')[0];
      if (customDates.includes(dStr)) {
          onChange(nodeId, { customDates: customDates.filter((d: string) => d !== dStr) });
      } else {
          onChange(nodeId, { customDates: [...customDates, dStr] });
      }
  };

  const isDaySelected = (dateObj: Date) => {
      if (recurrence === 'daily') return true;
      if (recurrence === 'weekly') return selectedWeekDays.includes(dateObj.getDay());
      if (recurrence === 'custom') {
          const dStr = dateObj.toISOString().split('T')[0];
          return customDates.includes(dStr);
      }
      return false;
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-cyan-600 selection:text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-cyan-700 shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <CalendarDays size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Configuração de Data</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
          <X size={16} className="text-white" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-8">
        
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <button onClick={() => onChange(nodeId, { mode: 'single' })} className={`flex-1 text-xs py-2 rounded-md font-bold transition-colors ${mode === 'single' ? 'bg-cyan-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Data Única</button>
            <button onClick={() => onChange(nodeId, { mode: 'period' })} className={`flex-1 text-xs py-2 rounded-md font-bold transition-colors ${mode === 'period' ? 'bg-cyan-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Período</button>
        </div>

        {mode === 'single' && (
            <div className="space-y-3">
                <Label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Data de Publicação</Label>
                <Input type="date" value={data.singleDate || ''} onChange={(e) => onChange(nodeId, { singleDate: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-10 text-sm [color-scheme:dark]" />
            </div>
        )}

        {mode === 'period' && (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label className="text-xs text-zinc-400">Data Inicial</Label>
                        <Input type="date" value={data.startDate || ''} onChange={(e) => onChange(nodeId, { startDate: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-10 text-xs [color-scheme:dark]" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs text-zinc-400">Data Final</Label>
                        <Input type="date" value={data.endDate || ''} onChange={(e) => onChange(nodeId, { endDate: e.target.value })} className="bg-zinc-900 border-zinc-800 text-white h-10 text-xs [color-scheme:dark]" />
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Repetição</Label>
                    <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                        <button onClick={() => onChange(nodeId, { recurrence: 'daily' })} className={`flex-1 text-[11px] py-1.5 rounded-md font-bold transition-colors ${recurrence === 'daily' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Diário</button>
                        <button onClick={() => onChange(nodeId, { recurrence: 'weekly' })} className={`flex-1 text-[11px] py-1.5 rounded-md font-bold transition-colors ${recurrence === 'weekly' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Semanal</button>
                        <button onClick={() => onChange(nodeId, { recurrence: 'custom' })} className={`flex-1 text-[11px] py-1.5 rounded-md font-bold transition-colors ${recurrence === 'custom' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Específico</button>
                    </div>
                </div>

                {days.length > 0 && (
                    <div className="space-y-2 bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl relative">
                        <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-2 text-center">Calendário de Veiculação</Label>
                        
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {weekHeaders.map((h, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleColumnClick(i)}
                                    className={`text-xs font-bold py-1 rounded transition-colors ${recurrence === 'weekly' ? 'cursor-pointer hover:bg-cyan-900/50' : 'cursor-default'} ${recurrence === 'weekly' && selectedWeekDays.includes(i) ? 'text-cyan-400 bg-cyan-900/30' : 'text-zinc-400'}`}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDayOffset }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-8"></div>
                            ))}
                            {days.map((d, i) => {
                                const selected = isDaySelected(d);
                                return (
                                    <button 
                                       key={i} 
                                       onClick={() => handleCellClick(d)}
                                       className={`h-8 rounded-md flex items-center justify-center text-xs font-bold transition-all border ${recurrence === 'custom' ? 'cursor-pointer hover:border-cyan-500' : 'cursor-default'} ${selected ? 'bg-cyan-600 border-cyan-500 text-white shadow-sm' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}
                                    >
                                        {d.getDate()}
                                    </button>
                                )
                            })}
                        </div>
                        {days.length === 35 && <p className="text-[9px] text-center text-zinc-500 mt-2">Exibindo as primeiras 05 semanas.</p>}
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
}