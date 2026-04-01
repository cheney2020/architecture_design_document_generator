import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Link as LinkIcon, FileText, Upload } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface ReferenceItem {
  id: string;
  type: 'wiki' | 'external' | 'attachment';
  name: string;
  address: string;
}

export default function ReferenceListEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [items, setItems] = useState<ReferenceItem[]>([]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.items) setItems(nodeData.items);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], items };
    }
  }, [items, id, nodeId]);

  const addItem = () => setItems([...items, { id: Date.now().toString(), type: 'wiki', name: '', address: '' }]);
  const updateItem = (id: string, field: keyof ReferenceItem, value: string) => setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  const removeItem = (id: string) => setItems(items.filter(item => item.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h3 className="text-lg font-medium text-gray-900">资料列表</h3>
      </div>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">资料类型</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">资料名称</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">地址/文件</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                <td className="px-4 py-3">
                  <select
                    value={item.type}
                    onChange={(e) => updateItem(item.id, 'type', e.target.value as any)}
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="wiki">Wiki 链接</option>
                    <option value="external">外部链接</option>
                    <option value="attachment">附件上传</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="如：需求文档、API 规范..."
                    className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-4 py-3">
                  {item.type === 'attachment' ? (
                    <div className="flex items-center">
                      <label className="cursor-pointer flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Upload className="w-4 h-4 mr-2 text-gray-500" />
                        <span>选择文件</span>
                        <input type="file" className="sr-only" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateItem(item.id, 'address', file.name);
                        }} />
                      </label>
                      {item.address && <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">{item.address}</span>}
                    </div>
                  ) : (
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={item.address}
                        onChange={(e) => updateItem(item.id, 'address', e.target.value)}
                        placeholder="https://"
                        className="w-full bg-transparent border border-gray-300 rounded pl-10 px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => removeItem(item.id)}
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
          onClick={addItem}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加参考资料
        </button>
      </div>
    </div>
  );
}
