import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';
import RichTextEditor from './RichTextEditor';

interface MessageRole {
  id: string;
  role: 'producer' | 'consumer';
  systemName: string;
  remark: string;
}

interface MessageTopic {
  id: string;
  name: string;
  description: string;
  format: string;
  capacityValue: string;
  capacityUnit: string;
  roles: MessageRole[];
  faultTolerance: string;
}

export default function MessageListEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [topics, setTopics] = useState<MessageTopic[]>([]);
  const [editingTopic, setEditingTopic] = useState<MessageTopic | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.topics) setTopics(nodeData.topics);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], topics };
    }
  }, [topics, id, nodeId]);

  const openDrawer = (topic?: MessageTopic) => {
    if (topic) {
      setEditingTopic(topic);
    } else {
      setEditingTopic({
        id: Date.now().toString(),
        name: '',
        description: '',
        format: '{\n  "id": "string",\n  "timestamp": "number"\n}',
        capacityValue: '',
        capacityUnit: '条/秒',
        roles: [],
        faultTolerance: ''
      });
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTopic(null);
  };

  const saveTopic = () => {
    if (editingTopic) {
      const exists = topics.find(t => t.id === editingTopic.id);
      if (exists) {
        setTopics(topics.map(t => t.id === editingTopic.id ? editingTopic : t));
      } else {
        setTopics([...topics, editingTopic]);
      }
      closeDrawer();
    }
  };

  const removeTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const addRole = () => {
    if (editingTopic) {
      setEditingTopic({
        ...editingTopic,
        roles: [...editingTopic.roles, { id: Date.now().toString(), role: 'producer', systemName: '', remark: '' }]
      });
    }
  };

  const updateRole = (id: string, field: keyof MessageRole, value: string) => {
    if (editingTopic) {
      setEditingTopic({
        ...editingTopic,
        roles: editingTopic.roles.map(r => r.id === id ? { ...r, [field]: value } : r)
      });
    }
  };

  const removeRole = (id: string) => {
    if (editingTopic) {
      setEditingTopic({
        ...editingTopic,
        roles: editingTopic.roles.filter(r => r.id !== id)
      });
    }
  };

  return (
    <div className="space-y-4 relative h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map(topic => (
          <div key={topic.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-md font-bold text-gray-900 truncate pr-4">{topic.name || '未命名 Topic'}</h4>
              <div className="flex space-x-1 shrink-0">
                <button onClick={() => openDrawer(topic)} className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => removeTopic(topic.id)} className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-16 text-gray-500">容量:</span>
                <span className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs">{topic.capacityValue} {topic.capacityUnit}</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-gray-500">生产者:</span>
                <span className="truncate">{topic.roles.filter(r => r.role === 'producer').map(r => r.systemName).join(', ') || '-'}</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 text-gray-500">消费者:</span>
                <span className="truncate">{topic.roles.filter(r => r.role === 'consumer').map(r => r.systemName).join(', ') || '-'}</span>
              </div>
            </div>
          </div>
        ))}
        {topics.length === 0 && (
          <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 bg-gray-50">
            <p>暂无消息定义，请点击下方新增</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => openDrawer()}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增消息 Topic
        </button>
      </div>

      {/* Drawer */}
      {isDrawerOpen && editingTopic && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">消息详情配置</h3>
              <button onClick={closeDrawer} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic 名称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={editingTopic.name} 
                  onChange={e => setEditingTopic({...editingTopic, name: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                  placeholder="例如：topic_order_created"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">5.1 消息描述</label>
                <textarea 
                  value={editingTopic.description} 
                  onChange={e => setEditingTopic({...editingTopic, description: e.target.value})}
                  rows={2}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="描述该消息的业务含义..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">5.2 消息的格式</label>
                  <button className="text-xs text-blue-600 hover:text-blue-800">格式化 JSON</button>
                </div>
                <textarea 
                  value={editingTopic.format} 
                  onChange={e => setEditingTopic({...editingTopic, format: e.target.value})}
                  rows={6}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono bg-gray-50"
                  placeholder="JSON 格式..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">5.3 消息生产者和消费者</label>
                  <button onClick={addRole} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                    <Plus className="w-3 h-3 mr-1" /> 添加角色
                  </button>
                </div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">角色</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">系统名称</th>
                        <th className="px-4 py-3 text-sm font-medium text-gray-700 w-auto">备注说明</th>
                        <th className="w-12 px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {editingTopic.roles.map(role => (
                        <tr key={role.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                          <td className="px-4 py-3">
                            <select value={role.role} onChange={(e) => updateRole(role.id, 'role', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                              <option value="producer">生产者</option>
                              <option value="consumer">消费者</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input type="text" value={role.systemName} onChange={(e) => updateRole(role.id, 'systemName', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </td>
                          <td className="px-4 py-3">
                            <input type="text" value={role.remark} onChange={(e) => updateRole(role.id, 'remark', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => removeRole(role.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">5.4 消息的容量</label>
                <div className="flex space-x-2">
                  <input 
                    type="number" 
                    value={editingTopic.capacityValue} 
                    onChange={e => setEditingTopic({...editingTopic, capacityValue: e.target.value})}
                    className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="例如：1000"
                  />
                  <select 
                    value={editingTopic.capacityUnit} 
                    onChange={e => setEditingTopic({...editingTopic, capacityUnit: e.target.value})}
                    className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="条/秒">条/秒</option>
                    <option value="条/天">条/天</option>
                    <option value="MB/天">MB/天</option>
                    <option value="GB/天">GB/天</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">5.5 消息容错</label>
                <p className="text-xs text-gray-500 mb-2">请说明对一致性的要求，遇到错误或异常场景的处理等</p>
                <div className="border border-gray-200 rounded-md overflow-hidden h-48">
                  <RichTextEditor nodeId={`${nodeId}-fault`} />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button onClick={closeDrawer} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">取消</button>
              <button onClick={saveTopic} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">保存配置</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
