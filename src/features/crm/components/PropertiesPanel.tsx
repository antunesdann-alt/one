import CampaignPanel from "./panels/CampaignPanel";
import SegmentPanel from "./panels/SegmentPanel";
import CarouselAdPanel from "./panels/media/CarouselAdPanel";
import CarouselOrganicPanel from "./panels/media/CarouselOrganicPanel";
import MediaAdPanel from "./panels/media/MediaAdPanel";
import MediaOrganicPanel from "./panels/media/MediaOrganicPanel";
import QuizAdPanel from "./panels/quiz/QuizAdPanel";
import QuizOrganicPanel from "./panels/quiz/QuizOrganicPanel";
import FinancialPanel from "./panels/FinancialPanel";
import ChannelPanel from "./panels/ChannelPanel";

export default function PropertiesPanel({ selectedNode, onChange, onClose }: any) {
  if (!selectedNode) return null;

  const { type, data } = selectedNode;
  const isAd = data?.isAd === true || data?.isAd === 'true';

  // Lógica do roteador separada para não misturar com a moldura
  const renderPanel = () => {
    switch (type) {
      case 'campaignNode': return <CampaignPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
      case 'segmentNode': return <SegmentPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
      case 'mediaCarouselNode':
      case 'carouselNode':
        return isAd ? <CarouselAdPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} /> : <CarouselOrganicPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
      case 'mediaVideoNode':
      case 'videoNode':
      case 'mediaImageNode':
      case 'imageNode':
        return isAd ? <MediaAdPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} type={type} /> : <MediaOrganicPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} type={type} />;
      case 'quizNode':
        return isAd ? <QuizAdPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} /> : <QuizOrganicPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
      case 'bidNode':
      case 'investmentNode':
        return <FinancialPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} type={type} />;
      case 'channelNode':
        return <ChannelPanel data={data} onClose={onClose} />;
      default:
        return <div className="p-4 text-red-500 font-bold">Erro: Painel {type} não encontrado.</div>;
    }
  };

  return (
    // AQUI ESTÁ A CORREÇÃO: Esta div "absolute" agarra o painel no canto direito, por cima do canvas!
    <div className="absolute top-0 right-0 h-full w-[350px] z-[100] bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col">
       {renderPanel()}
    </div>
  );
}