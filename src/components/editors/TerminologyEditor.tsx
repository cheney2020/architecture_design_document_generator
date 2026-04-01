import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Upload } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function TerminologyEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [rows, setRows] = useState<any[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');

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
    setRows([...rows, { id: Date.now().toString(), term: '', definition: '', remark: '' }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateRow = (id: string, field: string, value: string) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const lines = importText.split('\n');
    const newRows = lines.map((line, index) => {
      const parts = line.split('\t');
      return {
        id: `imported-${Date.now()}-${index}`,
        term: parts[0] || '',
        definition: parts[1] || '',
        remark: parts[2] || '',
      };
    }).filter(r => r.term || r.definition || r.remark);
    
    setRows([...rows, ...newRows]);
    setShowImport(false);
    setImportText('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowImport(true)}
          className="flex items-center px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          <Upload className="w-4 h-4 mr-1.5" />
          批量导入
        </button>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="w-10 px-4 py-3"></th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">术语</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/2">解释</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">备注</th>
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
                    value={row.term}
                    onChange={(e) => updateRow(row.id, 'term', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="术语"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={row.definition}
                    onChange={(e) => updateRow(row.id, 'definition', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="解释"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={row.remark}
                    onChange={(e) => updateRow(row.id, 'remark', e.target.value)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="备注"
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

      {showImport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">批量导入术语</h3>
            <p className="text-sm text-gray-500 mb-4">
              请粘贴内容，支持按行分割，每行内按 Tab 键分割（术语 [Tab] 解释 [Tab] 备注）。
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
              placeholder="DAU&#9;Daily Active Users&#9;日活跃用户数&#10;MAU&#9;Monthly Active Users&#9;月活跃用户数"
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowImport(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                确认导入
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
