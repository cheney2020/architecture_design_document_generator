import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { Layout, Database, ShieldCheck, Zap } from 'lucide-react';

export default function CacheDesignEditor({ nodeId }: { nodeId: string }) {
  const [activeTab, setActiveTab] = useState('scenarios');

  const tabs = [
    { id: 'scenarios', label: '缓存使用场景', icon: Zap },
    { id: 'capacity', label: '缓存容量规划', icon: Layout },
    { id: 'availability', label: '缓存高可用', icon: ShieldCheck },
    { id: 'structure', label: '缓存数据结构', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-gray-100/50 p-1 rounded-lg border border-gray-200">
        <nav className="flex space-x-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-medium rounded-md transition-all
                ${activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }
              `}
            >
              <tab.icon className={`w-4 h-4 mr-2 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Editor Content */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
        <div key={activeTab}>
          <RichTextEditor nodeId={`${nodeId}-${activeTab}`} />
        </div>
      </div>
    </div>
  );
}
