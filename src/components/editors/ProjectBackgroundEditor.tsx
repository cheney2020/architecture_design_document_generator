import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import { Plus, Trash2, GripVertical, FileText, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function ProjectBackgroundEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('background');
  const [roles, setRoles] = useState([
    { id: '1', role: '架构负责人', name: '', remark: '' },
    { id: '2', role: '产品负责人', name: '', remark: '' },
    { id: '3', role: '开发负责人', name: '', remark: '' },
    { id: '4', role: '业务线', name: '', remark: '' },
  ]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.roles) setRoles(nodeData.roles);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], roles };
    }
  }, [roles, id, nodeId]);

  const tabs = [
    { id: 'background', label: '背景描述', icon: FileText },
    { id: 'roles', label: '角色信息', icon: Users },
  ];

  const addRole = () => {
    setRoles([...roles, { id: Date.now().toString(), role: '', name: '', remark: '' }]);
  };

  const removeRole = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
  };

  const updateRole = (id: string, field: string, value: string) => {
    setRoles(roles.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

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
        {activeTab === 'background' && (
          <div>
            <RichTextEditor key={`${nodeId}-background`} nodeId={`${nodeId}-background`} />
          </div>
        )}
        
        {activeTab === 'roles' && (
          <div>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="w-10 px-4 py-3"></th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">角色</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">姓名</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700">备注</th>
                    <th className="w-16 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((row) => (
                    <tr key={row.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                      <td className="px-4 py-3 text-gray-400 cursor-move">
                        <GripVertical className="w-4 h-4" />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={row.role}
                          onChange={(e) => updateRole(row.id, 'role', e.target.value)}
                          className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="输入角色"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) => updateRole(row.id, 'name', e.target.value)}
                          className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="输入姓名"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={row.remark}
                          onChange={(e) => updateRole(row.id, 'remark', e.target.value)}
                          className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="输入备注"
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => removeRole(row.id)}
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
                onClick={addRole}
                className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                新增角色
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
