"use client";

import { useState } from "react";
import { 
  Home, Play, Pause, SkipForward, Heart, MessageCircle, Share2, 
  ShoppingBag, Wallet, User, Settings, Megaphone, Radio, Tv, 
  ArrowLeft, Bell, Menu, TrendingUp, Download, Upload, DollarSign,
  ToggleLeft, ToggleRight, Music // <--- Adicionado o Music aqui
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OneLiveLogo } from "@/components/ui/OneLiveLogo";

// --- COMPONENTE: PLAYER PERSISTENTE (Rodapé) ---
const PersistentPlayerFooter = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className="shrink-0 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 p-3 flex items-center justify-between pb-6 z-50">
            {/* Info da Mídia */}
            <div className="flex items-center gap-3 flex-1 truncate">
                <div className="w-10 h-10 bg-zinc-800 rounded-lg overflow-hidden relative shadow-[0_0_10px_rgba(227,71,248,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-nostalgia-blue via-purple-500 to-nostalgia-pink opacity-80"></div>
                    <Radio size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                </div>
                <div className="flex flex-col truncate">
                    <span className="text-sm font-bold text-white truncate">Nostalgia Mix Vol. 1</span>
                    <span className="text-[10px] text-zinc-400 truncate uppercase tracking-wider">One Music • DJ Live</span>
                </div>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2 text-white">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-nostalgia-pink"><Heart size={18} /></Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 bg-white text-black hover:bg-zinc-200 hover:text-black rounded-full shadow-lg" 
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white"><SkipForward size={20} /></Button>
            </div>
        </div>
    )
}

// --- TELA: PAINEL DE ADS (Conforme Wireframe) ---
const AdsPanelScreen = ({ onBack }: { onBack: () => void }) => {
    return (
        <div className="flex-1 flex flex-col bg-zinc-950 text-white overflow-y-auto pb-20">
            {/* Header Wireframe */}
            <div className="p-4 flex items-center justify-between border-b border-zinc-900">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2"><ArrowLeft size={20}/></Button>
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                        <User size={16} className="text-zinc-400" />
                    </div>
                </div>
                <span className="font-bold text-lg tracking-tight">One <span className="text-[#E347F8]">Live</span></span>
                <div className="flex items-center gap-1">
                    <span className="text-[10px] font-bold uppercase text-zinc-500">ADS</span>
                    <ToggleRight size={24} className="text-green-500" />
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Nome */}
                <div>
                    <h2 className="text-xl font-bold uppercase tracking-wide">Olá, Investidor</h2>
                    <p className="text-xs text-zinc-500">Configurações de Monetização</p>
                </div>

                {/* Card Financeiro */}
                <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-nostalgia-blue/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                    
                    <div className="flex justify-between items-end mb-6 relative z-10">
                        <div>
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Saldo Total</p>
                            <h3 className="text-2xl font-mono font-bold text-white">R$ 800,00</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Disponível Saque</p>
                            <h3 className="text-lg font-mono font-bold text-green-500">R$ 500,00</h3>
                        </div>
                    </div>

                    <div className="flex gap-2 relative z-10">
                        <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs h-16 flex flex-col gap-1 rounded-xl border border-zinc-700/50">
                            <Upload size={16} className="text-nostalgia-blue"/>
                            Transferir
                        </Button>
                        <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs h-16 flex flex-col gap-1 rounded-xl border border-zinc-700/50">
                            <Download size={16} className="text-white"/>
                            Depositar
                        </Button>
                        <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs h-16 flex flex-col gap-1 rounded-xl border border-zinc-700/50">
                            <DollarSign size={16} className="text-green-500"/>
                            Saque
                        </Button>
                    </div>
                </div>

                {/* Gráfico Histórico (Simulado com SVG) */}
                <div className="space-y-2">
                    <h4 className="text-sm font-bold uppercase text-zinc-500">Histórico de Ganhos</h4>
                    <div className="h-40 w-full bg-zinc-900/50 rounded-xl border border-zinc-800 p-4 flex items-end justify-between relative">
                        {/* Linhas de grade */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none opacity-20">
                            <div className="w-full h-px bg-zinc-500"></div>
                            <div className="w-full h-px bg-zinc-500"></div>
                            <div className="w-full h-px bg-zinc-500"></div>
                        </div>
                        {/* Linha do Gráfico */}
                        <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,80 L20,60 L40,75 L60,30 L80,50 L100,10" fill="none" stroke="#E347F8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                            <path d="M0,80 L20,60 L40,75 L60,30 L80,50 L100,10 V100 H0 Z" fill="url(#grad)" opacity="0.2" />
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#E347F8" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#E347F8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Toggles de Anúncios */}
                <div className="space-y-4">
                    <h4 className="text-sm font-bold uppercase text-zinc-500 border-b border-zinc-800 pb-2">Anúncios do Feed</h4>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Imagens</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-nostalgia-blue">ON</span>
                            <ToggleRight size={24} className="text-nostalgia-blue cursor-pointer" />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Vídeos</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-nostalgia-blue">ON</span>
                            <ToggleRight size={24} className="text-nostalgia-blue cursor-pointer" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Carrossel</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-zinc-600">OFF</span>
                            <ToggleLeft size={24} className="text-zinc-600 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TELA: HOME HUB (O Menu Circular) ---
const HomeHubScreen = ({ navigateTo }: { navigateTo: (screen: string) => void }) => {
    
    // Botão circular grande
    const HubButton = ({ icon: Icon, label, colorClass, onClick, size = 'normal' }: any) => {
        const sizeClasses = size === 'large' ? 'w-24 h-24' : 'w-16 h-16';
        const iconSize = size === 'large' ? 32 : 20;
        return (
            <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={onClick}>
                <div className={`${sizeClasses} rounded-full bg-zinc-900/80 border-2 ${colorClass} flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_current] backdrop-blur-sm`}>
                    <Icon size={iconSize} strokeWidth={1.5} className="text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{label}</span>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col bg-zinc-950 relative overflow-hidden">
             {/* Background Nostálgico Abstrato */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#4387f6] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-[#ff66b3] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
             </div>

            {/* Header Simples */}
            <div className="p-6 flex justify-between items-center relative z-10 pt-8">
                 <OneLiveLogo size={36} showText={true} />
                 <div className="flex gap-3">
                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white"><Bell size={20} /></Button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-nostalgia-blue to-nostalgia-pink p-[2px]">
                        <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                            <User size={14} className="text-white"/>
                        </div>
                    </div>
                 </div>
            </div>

            {/* O HUB CENTRAL */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 pb-20">
                
                {/* Sistema Solar de Navegação */}
                <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                    
                    {/* Órbitas Decorativas */}
                    <div className="absolute inset-0 rounded-full border border-zinc-800/50 scale-75"></div>
                    <div className="absolute inset-0 rounded-full border border-zinc-800/30 scale-100"></div>

                    {/* Satélites Superiores */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-full flex justify-between px-4">
                        <HubButton icon={Megaphone} label="Painel Ads" colorClass="border-amber-500 text-amber-500 shadow-amber-900/20" onClick={() => navigateTo('adsPanel')} />
                        <HubButton icon={Wallet} label="Carteira" colorClass="border-green-500 text-green-500 shadow-green-900/20" onClick={() => navigateTo('wallet')} />
                    </div>

                    {/* Centro - FEED */}
                    <div className="relative z-20">
                        <HubButton icon={Home} label="Meu Feed" colorClass="border-[#E347F8] bg-gradient-to-b from-[#4387f6]/20 to-[#E347F8]/20" size="large" onClick={() => navigateTo('feed')} />
                    </div>

                    {/* Satélites Inferiores */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-full flex justify-between px-4">
                        <HubButton icon={Tv} label="One Tube" colorClass="border-red-500 text-red-500 shadow-red-900/20" onClick={() => navigateTo('tube')} />
                        <HubButton icon={ShoppingBag} label="Shopping" colorClass="border-nostalgia-blue text-nostalgia-blue shadow-blue-900/20" onClick={() => navigateTo('shop')} />
                    </div>
                    
                    {/* Satélites Laterais (Extra) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2">
                         <HubButton icon={Music} label="Music" colorClass="border-purple-500 text-purple-500" onClick={() => {}} />
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2">
                         <HubButton icon={Radio} label="Radio" colorClass="border-cyan-500 text-cyan-500" onClick={() => {}} />
                    </div>

                </div>

                <div className="mt-12 text-center">
                    <p className="text-white text-sm font-bold uppercase tracking-[0.2em] mb-1">One Ecosystem</p>
                    <p className="text-zinc-500 text-[10px]">v1.0.0 Alpha • Powered by Social One</p>
                </div>
            </div>
        </div>
    );
}

// --- COMPONENTE PRINCIPAL: O "CELULAR" ---
export default function MobileAppViewer() {
  const [currentScreen, setCurrentScreen] = useState<'hub' | 'feed' | 'wallet' | 'adsPanel' | 'tube' | 'shop'>('hub');

  const renderScreen = () => {
    switch (currentScreen) {
        case 'hub': return <HomeHubScreen navigateTo={(s: any) => setCurrentScreen(s)} />;
        case 'adsPanel': return <AdsPanelScreen onBack={() => setCurrentScreen('hub')} />;
        case 'feed': return (
            <div className="flex-1 bg-zinc-950 flex flex-col">
                <div className="p-4 border-b border-zinc-900 flex gap-2 items-center">
                     <Button variant="ghost" size="icon" onClick={() => setCurrentScreen('hub')}><ArrowLeft /></Button>
                     <span className="font-bold text-lg text-white">Meu Feed</span>
                </div>
                <div className="flex-1 flex items-center justify-center text-zinc-600 text-sm font-medium">
                    Feed Infinito em construção...
                </div>
            </div>
        );
        default: return <HomeHubScreen navigateTo={(s: any) => setCurrentScreen(s)} />;
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/90 p-4 font-sans">
        {/* Moldura do Celular */}
        <div className="w-full max-w-[400px] h-[850px] bg-zinc-950 border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative flex flex-col ring-1 ring-zinc-700">
            
            {/* Status Bar Fake */}
            <div className="shrink-0 h-10 bg-zinc-950 flex justify-between items-end px-6 pb-2 text-[12px] text-white font-medium z-50 select-none">
                <span>12:02</span>
                <div className="w-24 h-6 bg-black rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center">
                    <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
                </div>
                <div className="flex gap-1.5 items-center">
                    <div className="flex gap-0.5 items-end h-3">
                        <div className="w-0.5 h-1 bg-white"></div>
                        <div className="w-0.5 h-2 bg-white"></div>
                        <div className="w-0.5 h-3 bg-white"></div>
                        <div className="w-0.5 h-2.5 bg-zinc-600"></div>
                    </div>
                    <span>5G</span>
                </div>
            </div>

            {/* Conteúdo da Tela */}
            <div className="flex-1 relative flex flex-col overflow-hidden bg-zinc-950">
                {renderScreen()}
            </div>

            {/* Player Fixo */}
            <PersistentPlayerFooter />
            
            {/* Barra Home */}
            <div className="shrink-0 h-5 bg-zinc-950 flex justify-center items-start pt-2 absolute bottom-0 w-full pointer-events-none z-50">
                 <div className="w-32 h-1 bg-zinc-100/20 rounded-full"></div>
            </div>
        </div>
    </div>
  );
}