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
  const isAd = data.isAd;

  // ROTEAMENTO ATÔMICO
  if (type === 'campaignNode') return <CampaignPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
  
  if (type === 'segmentNode') return <SegmentPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
  
  if (type === 'mediaCarouselNode') {
      return isAd 
        ? <CarouselAdPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />
        : <CarouselOrganicPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
  }
  
  if (type === 'mediaVideoNode' || type === 'mediaImageNode') {
      return isAd 
        ? <MediaAdPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} type={type} />
        : <MediaOrganicPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} type={type} />;
  }
  
  if (type === 'quizNode') {
      return isAd 
        ? <QuizAdPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />
        : <QuizOrganicPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} />;
  }
  
  if (type === 'bidNode' || type === 'investmentNode') return <FinancialPanel data={data} nodeId={selectedNode.id} onChange={onChange} onClose={onClose} type={type} />;
  
  if (type === 'channelNode') return <ChannelPanel data={data} onClose={onClose} />;

  return null;
}