import { Zap, BarChart3, Banknote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Helpers locais (Atômicos)
const formatCurrency = (val: any) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(Number(val) || 0);
const maskCurrency = (val: string) => { const n = val.replace(/\D/g, ""); return (Number(n)/100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }); };
const parseCurrency = (val: string) => Number(val.replace(/\./g, "").replace(",", ".")) || 0;

export default function CampaignPanel({ data, nodeId, onChange, onClose }: any) {
  const [depositDisplay, setDepositDisplay] = useState('');

  const updateField = (field: string, val: any) => onChange(nodeId, { [field]: val });
  
  const handleDeposit = () => {
      const amount = parseCurrency(depositDisplay);
      if (amount > 0) {
          updateField('balance', (parseFloat(data.balance || 0) + amount));
          setDepositDisplay('');
      }
  };

  return (
    <aside className="absolute right-0 top-0 h-full w-[380px] bg-zinc-950 border-l border-zinc-900 flex flex-col z-50 shadow-2xl">
        {/* Header Laranja */}
        <div className="p-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-900">
            <div className="flex items-center gap-2 text-amber-500">
                <Zap size={18} fill="currentColor" />
                <span className="text-sm font-bold uppercase text-blue-500">{data.label || 'Campanha Mestra'}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}><X size={16}/></Button>
        </div>

        <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
            <div className="space-y-2">
                <Label className="text-xs text-amber-500 font-bold uppercase">NOME INTERNO</Label>
                <Input value={data.label || ''} onChange={(e) => updateField('label', e.target.value)} className="bg-black border-amber-900/50 focus:border-amber-500 text-white text-sm h-10" onFocus={(e)=>e.target.select()}/>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">SALDO DISPONÍVEL (R$)</Label>
                    <Input value={formatCurrency(data.balance)} readOnly className="bg-zinc-950 border-zinc-800 text-green-500 font-mono font-bold text-xl h-12 cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                    <Label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">VALOR DEPÓSITO</Label>
                    <div className="flex gap-2">
                        <Input placeholder="0,00" value={depositDisplay} onChange={(e) => setDepositDisplay(maskCurrency(e.target.value))} className="bg-black border-green-900/30 focus:border-green-600 text-white text-sm h-10" onFocus={(e)=>e.target.select()}/>
                        <Button className="bg-green-600 hover:bg-green-500 text-white font-bold uppercase text-xs h-10 px-4" onClick={handleDeposit}>
                            <Banknote size={16} className="mr-2" /> DEPOSITAR
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">ORÇAMENTO COMPROMETIDO (R$)</Label>
                <Input value={formatCurrency(data.budget)} readOnly className="bg-black border-zinc-800 text-zinc-500 font-mono font-bold cursor-not-allowed h-10" />
            </div>

            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-zinc-500"><BarChart3 size={16} /><Label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">PERFORMANCE (LIVE)</Label></div>
                <div className="bg-black rounded-lg border border-zinc-800 p-5 space-y-3">
                    <div className="flex justify-between items-center"><span className="text-xs text-zinc-500 font-medium">Impressões</span><span className="text-xs text-white font-bold font-mono">2.340</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-zinc-500 font-medium">CPM Médio</span><span className="text-xs text-white font-bold font-mono">R$ 14,20</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-zinc-500 font-medium">CPI</span><span className="text-xs text-white font-bold font-mono">R$ 0,01</span></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-zinc-500 font-medium">CPV (Vídeo)</span><span className="text-xs text-white font-bold font-mono">R$ 0,08</span></div>
                    <div className="h-px bg-zinc-800 my-2"></div>
                    <div className="flex justify-between items-center"><span className="text-xs text-amber-500 font-bold">CPE</span><span className="text-xs text-amber-500 font-bold font-mono">R$ 0,22</span></div>
                </div>
            </div>
        </div>
        <div className="p-5 border-t border-zinc-900"><Button className="w-full bg-white text-black h-12 font-bold hover:bg-zinc-200" onClick={onClose}>Concluir Edição</Button></div>
    </aside>
  );
}