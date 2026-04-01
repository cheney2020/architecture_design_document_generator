import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BarChart2, PlusSquare, Bell } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface ImpactMetric {
  id: string;
  name: string;
  impact: string;
  solution: string;
}

interface NewMetric {
  id: string;
  name: string;
  logic: string;
  source: string;
}

interface AlertDefinition {
  id: string;
  item: string;
  level: string;
  condition: string;
  channels: string[];
}

export default function MonitoringAlertingEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string>('6.1');

  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([]);
  const [newMetrics, setNewMetrics] = useState<NewMetric[]>([]);
  const [alerts, setAlerts] = useState<AlertDefinition[]>([]);

  useEffect(() => {
    if (['6.1', '6.2', '6.3'].includes(nodeId)) {
      setActiveTab(nodeId);
    }
  }, [nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]?.content) {
      const content = mockDataStore[id].content;
      if (content['6.1']) setImpactMetrics(content['6.1'].tableData || []);
      if (content['6.2']) setNewMetrics(content['6.2'].tableData || []);
      if (content['6.3']) setAlerts(content['6.3'].tableData || []);
    }
  }, [id]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content['6.1'] = { ...mockDataStore[id].content['6.1'], tableData: impactMetrics };
      mockDataStore[id].content['6.2'] = { ...mockDataStore[id].content['6.2'], tableData: newMetrics };
      mockDataStore[id].content['6.3'] = { ...mockDataStore[id].content['6.3'], tableData: alerts };
    }
  }, [impactMetrics, newMetrics, alerts, id]);

  // Impact Metrics Handlers
  const addImpactMetric = () => setImpactMetrics([...impactMetrics, { id: Date.now().toString(), name: '', impact: '', solution: '' }]);
  const updateImpactMetric = (id: string, field: keyof ImpactMetric, value: string) => setImpactMetrics(impactMetrics.map(m => m.id === id ? { ...m, [field]: value } : m));
  const removeImpactMetric = (id: string) => setImpactMetrics(impactMetrics.filter(m => m.id !== id));

  // New Metrics Handlers
  const addNewMetric = () => setNewMetrics([...newMetrics, { id: Date.now().toString(), name: '', logic: '', source: '' }]);
  const updateNewMetric = (id: string, field: keyof NewMetric, value: string) => setNewMetrics(newMetrics.map(m => m.id === id ? { ...m, [field]: value } : m));
  const removeNewMetric = (id: string) => setNewMetrics(newMetrics.filter(m => m.id !== id));

  // Alerts Handlers
  const addAlert = () => setAlerts([...alerts, { id: Date.now().toString(), item: '', level: 'P2', condition: '', channels: [] }]);
  const updateAlert = (id: string, field: keyof AlertDefinition, value: any) => setAlerts(alerts.map(a => a.id === id ? { ...a, [field]: value } : a));
  const removeAlert = (id: string) => setAlerts(alerts.filter(a => a.id !== id));
  const toggleChannel = (id: string, channel: string) => {
    setAlerts(alerts.map(a => {
      if (a.id === id) {
        const channels = a.channels.includes(channel) ? a.channels.filter(c => c !== channel) : [...a.channels, channel];
        return { ...a, channels };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('6.1')}
            className={`${activeTab === '6.1' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <BarChart2 className="w-4 h-4 mr-2" />
            影响的监控指标
          </button>
          <button
            onClick={() => setActiveTab('6.2')}
            className={`${activeTab === '6.2' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <PlusSquare className="w-4 h-4 mr-2" />
            新监控指标
          </button>
          <button
            onClick={() => setActiveTab('6.3')}
            className={`${activeTab === '6.3' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Bell className="w-4 h-4 mr-2" />
            告警定义
          </button>
        </nav>
      </div>

      <div className="pt-4">
        {activeTab === '6.1' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">指标名称</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">影响说明</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">应对/更新方案</th>
                    <th className="w-16 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {impactMetrics.map(metric => (
                    <tr key={metric.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                      <td className="px-4 py-3"><input type="text" value={metric.name} onChange={e => updateImpactMetric(metric.id, 'name', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3"><input type="text" value={metric.impact} onChange={e => updateImpactMetric(metric.id, 'impact', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3"><input type="text" value={metric.solution} onChange={e => updateImpactMetric(metric.id, 'solution', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3 text-right"><button onClick={() => removeImpactMetric(metric.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button onClick={addImpactMetric} className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> 新增指标
              </button>
            </div>
          </div>
        )}

        {activeTab === '6.2' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">指标名称</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">指标口径/逻辑</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">数据来源</th>
                    <th className="w-16 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {newMetrics.map(metric => (
                    <tr key={metric.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                      <td className="px-4 py-3"><input type="text" value={metric.name} onChange={e => updateNewMetric(metric.id, 'name', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3"><input type="text" value={metric.logic} onChange={e => updateNewMetric(metric.id, 'logic', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3"><input type="text" value={metric.source} onChange={e => updateNewMetric(metric.id, 'source', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3 text-right"><button onClick={() => removeNewMetric(metric.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button onClick={addNewMetric} className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> 新增指标
              </button>
            </div>
          </div>
        )}

        {activeTab === '6.3' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">告警项</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-32">告警级别</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">触发条件</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-auto">通知渠道</th>
                    <th className="w-16 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map(alert => (
                    <tr key={alert.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                      <td className="px-4 py-3"><input type="text" value={alert.item} onChange={e => updateAlert(alert.id, 'item', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3">
                        <select value={alert.level} onChange={e => updateAlert(alert.id, 'level', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          <option value="P0">🔴 P0</option>
                          <option value="P1">🟠 P1</option>
                          <option value="P2">🟡 P2</option>
                          <option value="P3">🔵 P3</option>
                        </select>
                      </td>
                      <td className="px-4 py-3"><input type="text" value={alert.condition} onChange={e => updateAlert(alert.id, 'condition', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" /></td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {['企业微信', '邮件', '短信', '电话'].map(ch => (
                            <label key={ch} className="inline-flex items-center">
                              <input type="checkbox" checked={alert.channels.includes(ch)} onChange={() => toggleChannel(alert.id, ch)} className="h-3 w-3 text-blue-600 rounded border-gray-300" />
                              <span className="ml-1 text-xs text-gray-600">{ch}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right"><button onClick={() => removeAlert(alert.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button onClick={addAlert} className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center">
                <Plus className="w-4 h-4 mr-2" /> 新增告警
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
