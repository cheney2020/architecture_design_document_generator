import React, { useState } from 'react';
import ServiceInterfacesEditor from './ServiceInterfacesEditor';
import RichTextEditor from './RichTextEditor';
import { Globe, Lock, AlertTriangle } from 'lucide-react';

export default function CombinedInterfacesEditor({ nodeId }: { nodeId: string }) {
  const [activeTab, setActiveTab] = useState('external');

  const tabs = [
    { id: 'external', label: '外部接口', icon: Globe },
    { id: 'internal', label: '内部接口', icon: Lock },
    { id: 'compatibility', label: '兼容/错误处理机制', icon: AlertTriangle },
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
        {activeTab === 'external' && <ServiceInterfacesEditor key={`${nodeId}-external`} nodeId={`${nodeId}-external`} title="外部接口" />}
        {activeTab === 'internal' && <ServiceInterfacesEditor key={`${nodeId}-internal`} nodeId={`${nodeId}-internal`} title="内部接口" />}
        {activeTab === 'compatibility' && <RichTextEditor key={`${nodeId}-compatibility`} nodeId={`${nodeId}-compatibility`} />}
      </div>
    </div>
  );
}
