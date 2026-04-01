import React, { useState, useEffect } from 'react';
import ArchitectureDiagramEditor from './ArchitectureDiagramEditor';
import { Plus, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface ApplicationItem {
  id: string;
  name: string;
  description: string;
  owner: string;
}

export default function LogicalArchitectureEditor({ nodeId, title }: { nodeId: string, title?: string }) {
  const { id } = useParams();
  const [apps, setApps] = useState<ApplicationItem[]>([]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.apps) setApps(nodeData.apps);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], apps };
    }
  }, [apps, id, nodeId]);

  const addApp = () => {
    setApps([...apps, { id: Date.now().toString(), name: '', description: '', owner: '' }]);
  };

  const updateApp = (id: string, field: keyof ApplicationItem, value: string) => {
    setApps(apps.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeApp = (id: string) => {
    setApps(apps.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8">
      <ArchitectureDiagramEditor nodeId={nodeId} />

      <div className="pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium text-gray-900">应用列表</h4>
        </div>

        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">应用名称</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 w-2/4">应用描述</th>
                <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">负责人</th>
                <th className="w-16 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={app.name}
                      onChange={(e) => updateApp(app.id, 'name', e.target.value)}
                      className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="应用名称"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={app.description}
                      onChange={(e) => updateApp(app.id, 'description', e.target.value)}
                      className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="应用职责描述"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={app.owner}
                      onChange={(e) => updateApp(app.id, 'owner', e.target.value)}
                      className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="负责人"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => removeApp(app.id)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button
            onClick={addApp}
            className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增应用
          </button>
        </div>
      </div>
    </div>
  );
}
