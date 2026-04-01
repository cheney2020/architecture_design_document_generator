import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface ResilienceStrategy {
  isNeeded: boolean;
  triggerCondition: string;
  strategy: string;
  recoveryMechanism: string;
}

export default function ResilienceDesignEditor({ nodeId, title }: { nodeId: string, title?: string }) {
  const { id } = useParams();
  const [data, setData] = useState<ResilienceStrategy>({
    isNeeded: false,
    triggerCondition: '',
    strategy: '',
    recoveryMechanism: ''
  });

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.strategy) setData(nodeData.strategy);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], strategy: data };
    }
  }, [data, id, nodeId]);

  const updateField = (field: keyof ResilienceStrategy, value: any) => {
    setData({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">是否需要{title}？</label>
          <div className="flex space-x-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={data.isNeeded === true}
                onChange={() => updateField('isNeeded', true)}
              />
              <span className="ml-2 text-sm text-gray-700">需要</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={data.isNeeded === false}
                onChange={() => updateField('isNeeded', false)}
              />
              <span className="ml-2 text-sm text-gray-700">不需要</span>
            </label>
          </div>
        </div>

        {data.isNeeded && (
          <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                触发条件 <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">描述在什么情况下会触发此{title}策略（例如：CPU使用率&gt;80%、接口错误率&gt;5%）</p>
              <textarea
                value={data.triggerCondition}
                onChange={(e) => updateField('triggerCondition', e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入触发条件..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                执行策略 <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">描述触发后具体执行的动作（例如：拒绝10%的请求、返回默认缓存数据、直接抛出异常）</p>
              <textarea
                value={data.strategy}
                onChange={(e) => updateField('strategy', e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入执行策略..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                恢复机制 <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">描述如何从{title}状态恢复到正常状态（例如：半开状态探测、错误率低于1%持续1分钟）</p>
              <textarea
                value={data.recoveryMechanism}
                onChange={(e) => updateField('recoveryMechanism', e.target.value)}
                rows={3}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="请输入恢复机制..."
              />
            </div>
          </div>
        )}

        {!data.isNeeded && (
          <div className="p-4 bg-gray-50 rounded-md border border-gray-100 text-sm text-gray-500 italic">
            已选择不需要{title}策略。如果系统对高可用有要求，建议重新评估。
          </div>
        )}
      </div>
    </div>
  );
}
