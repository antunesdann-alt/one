import { Handle, Position, NodeProps } from '@xyflow/react';
import { CalendarDays } from 'lucide-react';

const formatBR = (isoDate: string) => {
    if (!isoDate) return '';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export function DateNode({ data, selected }: NodeProps) {
  const containerStyle = selected 
    ? 'ring-1 ring-white border-cyan-500' 
    : 'border-zinc-800 hover:border-zinc-500';

  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  const mode = data.mode || 'single';
  const recurrence = data.recurrence || 'daily';
  const selectedWeekDays = data.selectedWeekDays || [];
  const customDates = data.customDates || [];

  // LIMITE ALTERADO PARA 35 DIAS (05 Semanas)
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
  const weekHeaders = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

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
    <div className={`relative min-w-[200px] flex flex-col group ${containerStyle} rounded-xl bg-zinc-950 border-2 transition-all duration-200`}>
      
      <div className={`bg-cyan-700 p-2 flex items-center gap-2 rounded-t-[10px] shrink-0`}>
        <CalendarDays size={14} className="text-white" />
        <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
            Data / Período
        </span>
      </div>

      <div className="p-3 flex flex-col gap-2 rounded-b-[10px]">
         <div className="flex flex-col mb-1">
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                {mode === 'single' ? 'Data Única' : 'Período'}
            </span>
            <span className="text-[11px] font-bold text-white">
                {mode === 'single' 
                    ? (data.singleDate ? formatBR(data.singleDate) : 'Não definida')
                    : (data.startDate ? `${formatBR(data.startDate)} a ${data.endDate ? formatBR(data.endDate) : '...'}` : 'Não definido')}
            </span>
         </div>

         {mode === 'period' && days.length > 0 && (
             <div className="flex flex-col gap-1 border-t border-zinc-800 pt-2">
                 <div className="grid grid-cols-7 gap-1 text-center mb-1">
                     {weekHeaders.map((h, i) => (
                         <span key={i} className={`text-[8px] font-bold ${recurrence === 'weekly' && selectedWeekDays.includes(i) ? 'text-cyan-400' : 'text-zinc-500'}`}>{h}</span>
                     ))}
                 </div>
                 <div className="grid grid-cols-7 gap-1">
                     {Array.from({ length: firstDayOffset }).map((_, i) => (
                         <div key={`empty-${i}`} className="w-4 h-4"></div>
                     ))}
                     {days.map((d, i) => {
                         const selected = isDaySelected(d);
                         return (
                             <div 
                                key={i} 
                                className={`w-4 h-4 rounded-[3px] flex items-center justify-center text-[7px] font-bold transition-colors ${selected ? 'bg-cyan-600 text-white' : 'bg-zinc-900 text-zinc-600'}`}
                             >
                                 {d.getDate()}
                             </div>
                         )
                     })}
                 </div>
                 {/* AVISO DO LIMITE */}
                 {days.length === 35 && <span className="text-[8px] text-zinc-500 text-center mt-1">Exibindo as primeiras 05 semanas...</span>}
             </div>
         )}
      </div>

      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-indigo-500 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-emerald-500 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}