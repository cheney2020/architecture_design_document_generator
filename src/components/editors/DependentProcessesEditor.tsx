import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

export default function DependentProcessesEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [isDependent, setIsDependent] = useState<boolean | null>(null);
  const [detail, setDetail] = useState('');

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.dependentProcesses) {
        setIsDependent(nodeData.dependentProcesses.isDependent === 'yes');
        setDetail(nodeData.dependentProcesses.detail || '');
      }
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = {
        ...mockDataStore[id].content[nodeId],
        dependentProcesses: {
          isDependent: isDependent === true ? 'yes' : isDependent === false ? 'no' : '',
          detail
        }
      };
    }
  }, [isDependent, detail, id, nodeId]);

  return (
    <div className="flex flex-col space-y-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-900 font-medium">
          <Info className="w-5 h-5 text-blue-500" />
          <span>是否依赖流程中心？</span>
        </div>
        
        <div className="flex items-center space-x-8 pl-7">
          <label className="flex items-center cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="isDependent"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-blue-600 transition-all"
                checked={isDependent === true}
                onChange={() => setIsDependent(true)}
              />
              <div className="absolute w-3 h-3 rounded-full bg-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">是，需要接入流程中心</span>
          </label>

          <label className="flex items-center cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name="isDependent"
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-blue-600 transition-all"
                checked={isDependent === false}
                onChange={() => setIsDependent(false)}
              />
              <div className="absolute w-3 h-3 rounded-full bg-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
            </div>
            <span className="ml-3 text-gray-700 group-hover:text-gray-900">否，不接入流程中心</span>
          </label>
        </div>
      </div>

      {isDependent !== null && (
        <div className="space-y-3 pl-7 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-sm font-medium text-gray-700">
            {isDependent ? '接入的流程信息' : '不接入理由'}
            <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={isDependent ? '请详细描述接入的流程名称、节点及相关配置信息...' : '请详细说明不接入流程中心的原因，例如：业务逻辑简单、已有独立审批系统等...'}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
          {!detail.trim() && (
            <p className="text-xs text-red-500">此项为必填项</p>
          )}
        </div>
      )}
    </div>
  );
}
