import React, { useState } from 'react';
import ArchitectureDiagramEditor from './ArchitectureDiagramEditor';
import LogicalArchitectureEditor from './LogicalArchitectureEditor';
import RichTextEditor from './RichTextEditor';
import { Users, Network, HardDrive, Clock, ArrowRightLeft } from 'lucide-react';

export default function CombinedArchitectureEditor({ nodeId }: { nodeId: string }) {
  const [activeTab, setActiveTab] = useState('usecase');

  const tabs = [
    { id: 'usecase', label: '用例图', icon: Users },
    { id: 'logical', label: '逻辑架构图', icon: Network },
    { id: 'physical', label: '物理部署图', icon: HardDrive },
    { id: 'sequence', label: '处理流程时序图', icon: Clock },
    { id: 'dataflow', label: '数据流描述', icon: ArrowRightLeft },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center
              `}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-2 animate-in fade-in duration-300">
        {activeTab === 'usecase' && <ArchitectureDiagramEditor key={`${nodeId}-usecase`} nodeId={`${nodeId}-usecase`} />}
        {activeTab === 'logical' && <LogicalArchitectureEditor key={`${nodeId}-logical`} nodeId={`${nodeId}-logical`} />}
        {activeTab === 'physical' && <ArchitectureDiagramEditor key={`${nodeId}-physical`} nodeId={`${nodeId}-physical`} />}
        {activeTab === 'sequence' && <ArchitectureDiagramEditor key={`${nodeId}-sequence`} nodeId={`${nodeId}-sequence`} />}
        {activeTab === 'dataflow' && <RichTextEditor key={`${nodeId}-dataflow`} nodeId={`${nodeId}-dataflow`} />}
      </div>
    </div>
  );
}
