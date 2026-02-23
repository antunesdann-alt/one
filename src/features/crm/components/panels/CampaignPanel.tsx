import { Zap, X, BarChart3, Banknote } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const formatCurrency = (val: any) => {
  const num = Number(val) || 0;
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatNumber = (val: any) => {
    const num = Number(val) || 0;
    return new Intl.NumberFormat('pt-BR').format(num);
}

export default function CampaignPanel({ data, nodeId, onChange, onClose }: any) {
  const [depositValue, setDepositValue] = useState("0,00");
  const [localBudget, setLocalBudget] = useState(() => formatCurrency(data?.budget));

  useEffect(() => {
    setLocalBudget(formatCurrency(data?.budget));
  }, [nodeId, data?.budget]);

  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setDepositValue(formatCurrency(Number(digits) / 100));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    setLocalBudget(formatCurrency(realValue));
    onChange(nodeId, { budget: realValue }); 
  };

  const handleDeposit = () => {
    const digits = depositValue.replace(/\D/g, "");
    const amount = Number(digits) / 100;
    if (amount > 0) {
      const currentBalance = Number(data.balance) || 0;
      onChange(nodeId, { balance: currentBalance + amount });
      setDepositValue("0,00");
    }
  };

  const isOverBudget = (data.allocatedBudget || 0) > (data.balance || 0);

  const metrics = {
      impressions: { est: 10000, current: 2340 },
      cpm: { est: 15.50, current: 14.20 },
      cpi: { est: 0.02, current: 0.01 },
      cpv: { est: 0.10, current: 0.08 },
      cpe: { est: 0.25, current: 0.22 },
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 shrink-0 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-amber-500" />
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Campanha Mestra</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-md transition-colors">
          <X size={16} className="text-zinc-400 hover:text-white" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-8">
        <div className="space-y-3">
          <Label className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Nome Interno</Label>
          <Input 
            value={data.label || ''} 
            onChange={(e) => onChange(nodeId, { label: e.target.value })} 
            onFocus={(e) => e.target.select()}
            className="bg-zinc-900 border-zinc-800 text-white font-medium focus:ring-1 focus:ring-amber-500 h-10" 
          />
        </div>

        <div className="space-y-4 pt-2">
          
          {/* DESTAQUE PRINCIPAL NO BUDGET */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
                <Label className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Valor da Campanha (R$)</Label>
                {(data.allocatedBudget || 0) > 0 && (
                   <span className={`text-[10px] font-bold uppercase ${isOverBudget ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`}>
                      Alocado: R$ {formatCurrency(data.allocatedBudget)}
                   </span>
                )}
            </div>
            <Input 
              value={localBudget}
              onChange={handleBudgetChange}
              onFocus={(e) => e.target.select()}
              className={`bg-amber-500/10 border text-xl font-bold h-12 ${isOverBudget ? 'border-red-500/50 text-red-500' : 'border-amber-500/30 text-amber-500'} focus:ring-amber-500`}
            />
            {isOverBudget && (
              <div className="text-[10px] text-red-400 font-medium bg-red-950/30 p-2 rounded border border-red-900/50">
                  ⚠️ <strong>Atenção:</strong> O valor alocado excede o saldo em conta. O faturamento será restrito.
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-800/50">
            <Label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Valor Depósito</Label>
            <div className="flex gap-2">
              <Input 
                value={depositValue}
                onChange={handleDepositChange}
                onFocus={(e) => e.target.select()}
                className="bg-zinc-900 border-zinc-800 text-white flex-1 h-10"
              />
              <Button onClick={handleDeposit} className="bg-green-600 hover:bg-green-700 text-white font-bold h-10 px-4">
                <Banknote size={16} className="mr-2" /> DEPOSITAR
              </Button>
            </div>
          </div>

          {/* SALDO EM CONTA COMO INFORMAÇÃO SECUNDÁRIA */}
          <div className="space-y-2">
            <div className="bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg flex justify-between items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Saldo em Conta</span>
              <span className={`text-lg font-bold ${data.balance < 0 ? 'text-red-500' : 'text-zinc-300'}`}>
                R$ {formatCurrency(data.balance)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={14} className="text-zinc-400" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Performance (Live)</span>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                <span>Métrica</span>
                <span className="text-right">Estimado</span>
                <span className="text-right">Atual</span>
            </div>

            <div className="grid grid-cols-3 text-xs items-center py-1 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">Impressões</span>
                <span className="text-right text-zinc-600">{formatNumber(metrics.impressions.est)}</span>
                <span className="text-right text-white font-bold">{formatNumber(metrics.impressions.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-1 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">CPM</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpm.est)}</span>
                <span className="text-right text-white font-bold">{formatCurrency(metrics.cpm.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-1 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">CPI</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpi.est)}</span>
                <span className="text-right text-white font-bold">{formatCurrency(metrics.cpi.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-1 border-t border-zinc-800/30">
                <span className="text-zinc-400 font-medium">CPV (Vídeo)</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpv.est)}</span>
                <span className="text-right text-white font-bold">{formatCurrency(metrics.cpv.current)}</span>
            </div>
            <div className="grid grid-cols-3 text-xs items-center py-1 border-t border-zinc-800/30">
                <span className="text-amber-500 font-bold">CPE</span>
                <span className="text-right text-zinc-600">{formatCurrency(metrics.cpe.est)}</span>
                <span className="text-right text-amber-500 font-bold">{formatCurrency(metrics.cpe.current)}</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-t border-zinc-800 mt-2">
              <span className="text-sm text-zinc-300 font-bold uppercase tracking-wider">Valor Utilizado</span>
              <span className="text-sm text-pink-500 font-bold">R$ {formatCurrency(data.usedBudget || 124.50)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}