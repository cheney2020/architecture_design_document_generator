import React, { useState } from 'react';
import DesignGoalsEditor from './DesignGoalsEditor';
import RichTextEditor from './RichTextEditor';
import QualityRequirementsEditor from './QualityRequirementsEditor';
import { Target, FileText, ShieldCheck } from 'lucide-react';

export default function CombinedRequirementsEditor({ nodeId }: { nodeId: string }) {
  const [activeTab, setActiveTab] = useState('goals');

  const tabs = [
    { id: 'goals', label: '设计目标', icon: Target },
    { id: 'functional', label: '功能需求', icon: FileText },
    { id: 'quality', label: '质量需求', icon: ShieldCheck },
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
        {activeTab === 'goals' && <DesignGoalsEditor key={`${nodeId}-goals`} nodeId={`${nodeId}-goals`} />}
        {activeTab === 'functional' && <RichTextEditor key={`${nodeId}-functional`} nodeId={`${nodeId}-functional`} />}
        {activeTab === 'quality' && <QualityRequirementsEditor key={`${nodeId}-quality`} nodeId={`${nodeId}-quality`} />}
      </div>
    </div>
  );
}
