import React, { useState } from 'react';
import DependentSystemsEditor from './DependentSystemsEditor';
import DependentMiddlewareEditor from './DependentMiddlewareEditor';
import DependentProcessesEditor from './DependentProcessesEditor';
import { Server, Database, GitBranch } from 'lucide-react';

export default function CombinedDependenciesEditor({ nodeId }: { nodeId: string }) {
  const [activeTab, setActiveTab] = useState('systems');

  const tabs = [
    { id: 'systems', label: '依赖系统', icon: Server },
    { id: 'middleware', label: '依赖中间件', icon: Database },
    { id: 'processes', label: '依赖流程', icon: GitBranch },
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
        {activeTab === 'systems' && <DependentSystemsEditor key={`${nodeId}-systems`} nodeId={`${nodeId}-systems`} />}
        {activeTab === 'middleware' && <DependentMiddlewareEditor key={`${nodeId}-middleware`} nodeId={`${nodeId}-middleware`} />}
        {activeTab === 'processes' && <DependentProcessesEditor key={`${nodeId}-processes`} nodeId={`${nodeId}-processes`} />}
      </div>
    </div>
  );
}
