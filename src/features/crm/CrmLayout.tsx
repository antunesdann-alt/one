import Sidebar from "./components/Sidebar";
import FlowEditor from "./components/FlowEditor";

interface CrmLayoutProps {
  onSwitchToMobile: () => void;
}

export default function CrmLayout({ onSwitchToMobile }: CrmLayoutProps) {
  return (
    <main className="flex h-screen w-screen bg-zinc-950 overflow-hidden">
      {/* Passamos a função de troca para a Sidebar */}
      <Sidebar onSwitchToMobile={onSwitchToMobile} />
      <div className="flex-1 h-full relative">
        <FlowEditor />
      </div>
    </main>
  );
}