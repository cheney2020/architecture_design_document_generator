import { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function TableEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [rows, setRows] = useState([
    { id: '1', col1: '高并发处理', col2: 'P0', col3: true, col4: 10000 },
    { id: '2', col1: '数据加密', col2: 'P1', col3: false, col4: 5000 },
  ]);

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
    setRows([...rows, { id: Date.now().toString(), col1: '', col2: 'P2', col3: false, col4: 0 }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: string, value: any) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="flex flex-col h-full min-h-[280px]">
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-10 px-4 py-3"></th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">需求名称 (文本)</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">优先级 (下拉)</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">是否必须 (复选)</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">预估容量 (数值)</th>
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
                    value={row.col1}
                    onChange={(e) => updateRow(row.id, 'col1', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="输入名称"
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    value={row.col2}
                    onChange={(e) => updateRow(row.id, 'col2', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="P0">P0 - 核心</option>
                    <option value="P1">P1 - 重要</option>
                    <option value="P2">P2 - 普通</option>
                    <option value="P3">P3 - 优化</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={row.col3}
                    onChange={(e) => updateRow(row.id, 'col3', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={row.col4}
                    onChange={(e) => updateRow(row.id, 'col4', parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="数值"
                  />
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
