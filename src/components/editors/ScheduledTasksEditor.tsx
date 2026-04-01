import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Clock } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';
import RichTextEditor from './RichTextEditor';

interface ScheduledTask {
  id: string;
  name: string;
  purpose: string;
  scheduleType: string;
  scheduleValue: string;
  framework: string;
  logicDesc: string;
  exceptionHandling: string;
}

export default function ScheduledTasksEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [editingTask, setEditingTask] = useState<ScheduledTask | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.tasks) setTasks(nodeData.tasks);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], tasks };
    }
  }, [tasks, id, nodeId]);

  const openDrawer = (task?: ScheduledTask) => {
    if (task) {
      setEditingTask(task);
    } else {
      setEditingTask({
        id: Date.now().toString(),
        name: '',
        purpose: '',
        scheduleType: 'cron',
        scheduleValue: '',
        framework: 'XXL Job',
        logicDesc: '',
        exceptionHandling: ''
      });
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTask(null);
  };

  const saveTask = () => {
    if (editingTask) {
      const exists = tasks.find(t => t.id === editingTask.id);
      if (exists) {
        setTasks(tasks.map(t => t.id === editingTask.id ? editingTask : t));
      } else {
        setTasks([...tasks, editingTask]);
      }
      closeDrawer();
    }
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-4 relative h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-md font-bold text-gray-900 truncate pr-4">{task.name || '未命名任务'}</h4>
              <div className="flex space-x-1 shrink-0">
                <button onClick={() => openDrawer(task)} className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => removeTask(task.id)} className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="w-20 text-gray-500">调度策略:</span>
                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-xs">{task.scheduleType === 'cron' ? 'Cron' : task.scheduleType === 'fixed' ? '固定频率' : '事件触发'} {task.scheduleValue}</span>
              </div>
              <div className="flex items-center">
                <span className="w-20 text-gray-500">使用框架:</span>
                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-xs">{task.framework}</span>
              </div>
              <div className="mt-2 line-clamp-2 text-gray-500 text-xs">
                {task.purpose || '暂无目的描述'}
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 bg-gray-50">
            <p>暂无批处理任务，请点击下方新增</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={() => openDrawer()}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增批处理任务
        </button>
      </div>

      {/* Drawer */}
      {isDrawerOpen && editingTask && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">任务详情配置</h3>
              <button onClick={closeDrawer} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">任务名称 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={editingTask.name} 
                  onChange={e => setEditingTask({...editingTask, name: e.target.value})}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="例如：每日订单对账任务"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4.1 任务目的 <span className="text-red-500">*</span></label>
                <textarea 
                  value={editingTask.purpose} 
                  onChange={e => setEditingTask({...editingTask, purpose: e.target.value})}
                  rows={3}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="描述该任务的业务目的..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">4.2 调度策略 <span className="text-red-500">*</span></label>
                  <select 
                    value={editingTask.scheduleType} 
                    onChange={e => setEditingTask({...editingTask, scheduleType: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-2"
                  >
                    <option value="cron">Cron 表达式</option>
                    <option value="fixed">固定频率</option>
                    <option value="event">事件触发</option>
                  </select>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={editingTask.scheduleValue} 
                      onChange={e => setEditingTask({...editingTask, scheduleValue: e.target.value})}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
                      placeholder={editingTask.scheduleType === 'cron' ? '0 0 2 * * ?' : editingTask.scheduleType === 'fixed' ? '每 5 分钟' : 'Kafka Topic: xxx'}
                    />
                    {editingTask.scheduleType === 'cron' && (
                      <button className="absolute right-2 top-1.5 text-xs text-blue-600 hover:text-blue-800 flex items-center bg-blue-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 mr-1" /> 校验预览
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">4.3 使用框架 <span className="text-red-500">*</span></label>
                  <select 
                    value={editingTask.framework} 
                    onChange={e => setEditingTask({...editingTask, framework: e.target.value})}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="XXL Job">XXL Job</option>
                    <option value="Spring Batch">Spring Batch</option>
                    <option value="Quartz">Quartz</option>
                    <option value="自定义">自定义 / 其他</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4.4 逻辑/算法描述</label>
                <div className="border border-gray-200 rounded-md overflow-hidden h-64">
                  <RichTextEditor nodeId={`${nodeId}-logic`} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">4.5 异常处理及系统影响</label>
                <p className="text-xs text-gray-500 mb-2">填写失败重试策略、告警机制及对上下游的影响</p>
                <div className="border border-gray-200 rounded-md overflow-hidden h-48">
                  <RichTextEditor nodeId={`${nodeId}-exception`} />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button onClick={closeDrawer} className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">取消</button>
              <button onClick={saveTask} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">保存任务</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
