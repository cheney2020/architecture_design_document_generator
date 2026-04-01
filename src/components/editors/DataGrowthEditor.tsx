import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface DataRow {
  id: string;
  metric: string;
  required: string;
  baseline: {
    avgMin: string;
    peakMin: string;
    avgDay: string;
    peakDay: string;
  };
  forecast: {
    avgMin: string;
    peakMin: string;
    avgDay: string;
    peakDay: string;
  };
}

export default function DataGrowthEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [rows, setRows] = useState<DataRow[]>([]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.dataGrowth) setRows(nodeData.dataGrowth);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], dataGrowth: rows };
    }
  }, [rows, id, nodeId]);

  const addRow = () => {
    setRows([...rows, {
      id: Date.now().toString(),
      metric: '',
      required: '必须',
      baseline: { avgMin: '', peakMin: '', avgDay: '', peakDay: '' },
      forecast: { avgMin: '', peakMin: '', avgDay: '', peakDay: '' }
    }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, path: string, value: string) => {
    setRows(rows.map(r => {
      if (r.id !== id) return r;
      
      const newRow = { ...r };
      const parts = path.split('.');
      if (parts.length === 1) {
        (newRow as any)[parts[0]] = value;
      } else if (parts.length === 2) {
        (newRow as any)[parts[0]] = { ...(newRow as any)[parts[0]], [parts[1]]: value };
      }
      return newRow;
    }));
  };

  return (
    <div className="flex flex-col h-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th rowSpan={2} className="w-10 px-2 py-3 border-r border-gray-200"></th>
                <th rowSpan={2} className="px-4 py-3 text-sm font-semibold text-gray-700 border-r border-gray-200 min-w-[120px]">指标</th>
                <th rowSpan={2} className="px-4 py-3 text-sm font-semibold text-gray-700 border-r border-gray-200 min-w-[100px]">是否必须</th>
                <th colSpan={4} className="px-4 py-2 text-sm font-semibold text-gray-700 border-r border-gray-200 text-center">基线指标(上线前)</th>
                <th colSpan={4} className="px-4 py-2 text-sm font-semibold text-gray-700 text-center">上线后(流量预估)</th>
                <th rowSpan={2} className="w-12 px-2 py-3"></th>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每分钟平均</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每分钟峰值</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每天平均</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每天峰值</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每分钟平均</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每分钟峰值</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 border-r border-gray-200 text-center">每天平均</th>
                <th className="px-2 py-2 text-xs font-medium text-gray-500 text-center">每天峰值</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="px-2 py-3 text-gray-400 cursor-move border-r border-gray-200 text-center">
                    <GripVertical className="w-4 h-4 inline" />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="text"
                      value={row.metric}
                      onChange={(e) => updateRow(row.id, 'metric', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-sm"
                      placeholder="输入指标"
                    />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">
                    <select
                      value={row.required}
                      onChange={(e) => updateRow(row.id, 'required', e.target.value)}
                      className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-700"
                    >
                      <option value="必须">必须</option>
                      <option value="非必须">非必须</option>
                    </select>
                  </td>
                  {/* Baseline */}
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.baseline.avgMin} onChange={(e) => updateRow(row.id, 'baseline.avgMin', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.baseline.peakMin} onChange={(e) => updateRow(row.id, 'baseline.peakMin', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.baseline.avgDay} onChange={(e) => updateRow(row.id, 'baseline.avgDay', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.baseline.peakDay} onChange={(e) => updateRow(row.id, 'baseline.peakDay', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  {/* Forecast */}
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.forecast.avgMin} onChange={(e) => updateRow(row.id, 'forecast.avgMin', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.forecast.peakMin} onChange={(e) => updateRow(row.id, 'forecast.peakMin', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-1 py-2 border-r border-gray-200">
                    <input type="text" value={row.forecast.avgDay} onChange={(e) => updateRow(row.id, 'forecast.avgDay', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-1 py-2">
                    <input type="text" value={row.forecast.peakDay} onChange={(e) => updateRow(row.id, 'forecast.peakDay', e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-sm text-center" />
                  </td>
                  <td className="px-2 py-3 text-right">
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
