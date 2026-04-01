import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function RisksAssumptionsEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.tableData) setRows(nodeData.tableData);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], tableData: rows };
    }
  }, [rows, id, nodeId]);

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), risk: '', plan: '', probability: '中', importance: '中' }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: string, value: string) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-10 px-4 py-3"></th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">风险/假设</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">应对计划</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">可能性</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">重要性</th>
              <th className="w-16 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                <td className="px-4 py-3 text-gray-400 cursor-move">
                  <GripVertical className="w-4 h-4" />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={row.risk}
                    onChange={(e) => updateRow(row.id, 'risk', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="描述风险或假设"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={row.plan}
                    onChange={(e) => updateRow(row.id, 'plan', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="应对计划"
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    value={row.probability}
                    onChange={(e) => updateRow(row.id, 'probability', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="高">高</option>
                    <option value="中">中</option>
                    <option value="低">低</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={row.importance}
                    onChange={(e) => updateRow(row.id, 'importance', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="高">高</option>
                    <option value="中">中</option>
                    <option value="低">低</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeRow(row.id)}
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
          onClick={addRow}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增一行
        </button>
      </div>
    </div>
  );
}
