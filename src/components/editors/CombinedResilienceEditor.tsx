import React, { useState } from 'react';
import ResilienceDesignEditor from './ResilienceDesignEditor';
import { TrendingDown, Activity, ZapOff } from 'lucide-react';

export default function CombinedResilienceEditor({ nodeId }: { nodeId: string }) {
  const [activeTab, setActiveTab] = useState('degradation');

  const tabs = [
    { id: 'degradation', label: '降级', icon: TrendingDown },
    { id: 'ratelimit', label: '限流', icon: Activity },
    { id: 'circuitbreaker', label: '熔断', icon: ZapOff },
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
        {activeTab === 'degradation' && <ResilienceDesignEditor key={`${nodeId}-degradation`} nodeId={`${nodeId}-degradation`} title="降级" />}
        {activeTab === 'ratelimit' && <ResilienceDesignEditor key={`${nodeId}-ratelimit`} nodeId={`${nodeId}-ratelimit`} title="限流" />}
        {activeTab === 'circuitbreaker' && <ResilienceDesignEditor key={`${nodeId}-circuitbreaker`} nodeId={`${nodeId}-circuitbreaker`} title="熔断" />}
      </div>
    </div>
  );
}
