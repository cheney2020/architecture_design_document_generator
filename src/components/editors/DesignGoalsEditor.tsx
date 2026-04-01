import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface DesignGoal {
  id: string;
  metric: string;
  target: string;
  remark: string;
}

const PRESET_GOALS: DesignGoal[] = [
  { id: '1', metric: '吞吐率 (Throughput)', target: '', remark: '' },
  { id: '2', metric: '响应时间 (Response Time)', target: '', remark: '' },
  { id: '3', metric: '存储量 (Storage Capacity)', target: '', remark: '' },
];

export default function DesignGoalsEditor({ nodeId, title }: { nodeId: string, title?: string }) {
  const { id } = useParams();
  const [goals, setGoals] = useState<DesignGoal[]>(PRESET_GOALS);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.goals) setGoals(nodeData.goals);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], goals };
    }
  }, [goals, id, nodeId]);

  const addGoal = () => {
    setGoals([...goals, { id: Date.now().toString(), metric: '', target: '', remark: '' }]);
  };

  const updateGoal = (id: string, field: keyof DesignGoal, value: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">目标指标</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">目标值</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-2/4">备注</th>
              <th className="w-16 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={goal.metric}
                    onChange={(e) => updateGoal(goal.id, 'metric', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：并发用户数"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={goal.target}
                    onChange={(e) => updateGoal(goal.id, 'target', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="例如：10000 QPS"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={goal.remark}
                    onChange={(e) => updateGoal(goal.id, 'remark', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="补充说明..."
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeGoal(goal.id)}
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
          onClick={addGoal}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增目标
        </button>
      </div>
    </div>
  );
}
