import { Wallet, Gavel, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const formatCurrency = (val: any) => {
  const num = Number(val) || 0;
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function FinancialPanel({ data, nodeId, onChange, onClose, type }: any) {
  const isInvestment = type === 'investmentNode';
  
  const config = {
    title: isInvestment ? "INVESTIMENTO" : "LANCE MÁXIMO",
    icon: isInvestment ? Wallet : Gavel,
    headerColor: isInvestment ? "bg-green-600" : "bg-emerald-600",
    label: isInvestment ? "VALOR A INVESTIR (R$)" : "VALOR MÁXIMO (CPV)",
  };

  const Icon = config.icon;
  const [localValue, setLocalValue] = useState(() => formatCurrency(data?.value));

  useEffect(() => {
    setLocalValue(formatCurrency(data?.value));
  }, [nodeId, data?.value]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    setLocalValue(formatCurrency(realValue)); 
    onChange(nodeId, { value: realValue }); 
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      <div className={`flex items-center justify-between px-4 py-3 ${config.headerColor} shrink-0`}>
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{config.title}</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
          <X size={16} className="text-white" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        <div className="space-y-3">
          <Label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{config.label}</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">R$</span>
            <Input 
              value={localValue}
              onChange={handleCurrencyChange}
              onFocus={(e) => e.target.select()}
              className="pl-9 bg-zinc-900 border-zinc-800 text-white font-medium focus:ring-1 focus:ring-zinc-600 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}