"use client";

import { useState } from "react";
import CrmLayout from "@/features/crm/CrmLayout";
import MobileAppViewer from "@/features/mobile/MobileAppViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  // Estado para controlar qual visualização está ativa
  // 'crm' = Editor de Campanhas
  // 'mobile' = Visualizador do App do Usuário
  const [viewMode, setViewMode] = useState<'crm' | 'mobile'>('crm');

  return (
    <main className="h-screen w-screen bg-zinc-950 overflow-hidden relative">
      
      {/* Renderização Condicional */}
      {viewMode === 'crm' ? (
        // Se estiver no modo CRM, mostra o layout do editor
        // Passamos a função que muda o estado para 'mobile'
        <CrmLayout onSwitchToMobile={() => setViewMode('mobile')} />
      ) : (
        // Se estiver no modo Mobile, mostra o simulador de celular
        <div className="w-full h-full relative animate-in fade-in duration-300">
            {/* Botão para voltar ao CRM (útil para desenvolvimento/apresentação) */}
            <div className="absolute top-4 left-4 z-50">
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setViewMode('crm')}
                    className="bg-zinc-900/50 backdrop-blur border-zinc-700 text-zinc-300 hover:text-white gap-2"
                >
                    <ArrowLeft size={16} /> Voltar ao CRM
                </Button>
            </div>
            
            {/* O Componente do Celular */}
            <MobileAppViewer />
        </div>
      )}
    </main>
  );
}