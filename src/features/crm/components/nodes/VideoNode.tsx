import { Handle, Position, NodeProps } from '@xyflow/react';
import { Video, Image as ImageIcon, Layers } from 'lucide-react';

export function VideoNode({ data, selected, type }: NodeProps) {
  const isAd = data.isAd;

  let Icon = Video;
  let headerColor = "bg-blue-600";
  let borderColor = isAd ? "border-blue-500" : "border-zinc-700";
  let labelText = "Vídeo";

  if (type === 'mediaImageNode') {
      Icon = ImageIcon;
      headerColor = "bg-pink-600";
      borderColor = isAd ? "border-pink-500" : "border-zinc-700";
      labelText = "Imagem Única";
  }
  if (type === 'mediaCarouselNode') {
      Icon = Layers;
      headerColor = "bg-orange-600";
      borderColor = isAd ? "border-orange-500" : "border-zinc-700";
      labelText = "Carrossel";
  }

  // Estilo do Container
  const containerStyle = selected 
    ? `ring-1 ring-white shadow-[0_0_15px_rgba(255,255,255,0.3)] ${borderColor}` 
    : `${borderColor} hover:border-zinc-500`;

  // Controle de visibilidade dos Handles
  const handleOpacity = selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100';

  return (
    // CONTAINER PRINCIPAL (Relativo para posicionar handles)
    <div className={`relative w-40 h-64 group ${containerStyle} rounded-xl bg-zinc-950 border-2 transition-all duration-200`}>
      
      {/* FLAG AD (Com border radius ajustado para não vazar) */}
      {isAd && (
        <div className="absolute -top-[1px] -right-[1px] z-50 overflow-hidden rounded-tr-lg">
            <div className="bg-white text-black text-[8px] font-black px-1.5 py-0.5 rounded-bl-lg shadow-sm">
                AD
            </div>
        </div>
      )}

      {/* CONTEÚDO VISUAL (Overflow Hidden para cortar imagem arredondada) */}
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[10px] pointer-events-none">
          {/* Header */}
          <div className={`${headerColor} p-2 flex items-center gap-2 h-8 shrink-0`}>
            <Icon size={14} className="text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                {labelText}
            </span>
          </div>

          {/* Corpo */}
          <div className="flex-1 bg-zinc-900 relative flex items-center justify-center overflow-hidden">
            {data.thumbnail ? (
                <>
                    <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: `url(${data.thumbnail})` }} />
                    <div className="absolute bottom-1 right-1 bg-black/70 p-1 rounded-md backdrop-blur-sm">
                        <Icon size={10} className="text-white/80"/>
                    </div>
                </>
            ) : (
                <Icon size={24} className="text-zinc-800" />
            )}
          </div>
          
          {/* Rodapé */}
          <div className="px-2 py-2 border-t border-zinc-800 bg-zinc-950 h-12 flex flex-col justify-center shrink-0">
            <p className="text-[8px] text-zinc-500 font-bold uppercase mb-0.5">Título</p>
            <p className="text-[10px] font-medium text-white line-clamp-2 leading-tight">{data.label || labelText}</p>
          </div>
      </div>

      {/* HANDLES (4 Lados - IDs Únicos para evitar erro de conexão) */}
      <Handle type="target" position={Position.Left} id="left" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="target" position={Position.Top} id="top" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 -translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Right} id="right" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-x-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
      <Handle type="source" position={Position.Bottom} id="bottom" className={`w-3 h-3 bg-zinc-400 border-2 border-zinc-950 translate-y-1.5 z-50 transition-opacity duration-200 ${handleOpacity}`} />
    </div>
  );
}