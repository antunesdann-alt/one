import { Wallet, Gavel, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

const maskCurrency = (val: string) => { const n = val.replace(/\D/g, ""); return (Number(n)/100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }); };
const parseCurrency = (val: string) => Number(val.replace(/\./g, "").replace(",", ".")) || 0;

export default function FinancialPanel({ data, nodeId, onChange, onClose, type }: any) {
  const isBid = type === 'bidNode';
  const theme = isBid 
    ? { bg: 'bg-zinc-900', icon: Gavel, color: 'text-emerald-500', label: 'Lance Máximo' }
    : { bg: 'bg-zinc-900', icon: Wallet, color: 'text-green-500', label: 'Investimento' };
  
  const [displayValue, setDisplayValue] = useState('');
  useEffect(() => { if (data.value) setDisplayValue(maskCurrency(data.value.toString().replace('.',','))); }, [data.value]);

  const handleChange = (e: any) => {
      const masked = maskCurrency(e.target.value);
      setDisplayValue(masked);
      onChange(nodeId, { value: parseCurrency(masked) });
  };

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900">
            <span className="text-sm font-bold uppercase text-blue-500">{theme.label}</span>
            <Button variant="ghost" size="icon" onClick={onClose}><X size={16}/></Button>
        </div>
        <div className="p-6 space-y-6">
            <div className="space-y-3">
                <Label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{isBid ? 'VALOR MÁXIMO (CPV)' : 'VALOR A INVESTIR (R$)'}</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-lg">R$</span>
                    <Input type="text" value={displayValue} onChange={handleChange} className="bg-black border-zinc-800 text-white pl-10 text-xl font-mono h-12" onFocus={(e)=>e.target.select()}/>
                </div>
            </div>
        </div>
        <div className="mt-auto p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black hover:bg-zinc-200 font-bold h-10" onClick={onClose}>Concluir</Button></div>
    </aside>
  );
}