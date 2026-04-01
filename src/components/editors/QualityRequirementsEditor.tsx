import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface QualityRequirement {
  id: string;
  dimension: string;
  description: string;
}

const PRESET_DIMENSIONS = [
  '时间特性 (性能、响应时间等)',
  '安全性 (数据加密、权限控制等)',
  '可扩展性 (系统容量、并发处理等)',
  '可靠性 (容错、恢复能力等)',
  '可用性 (SLA、故障时间等)',
  '可维护性 (日志、监控、部署等)',
  '易用性 (用户体验、接口友好度等)',
  '可移植性 (跨平台、环境迁移等)'
];

export default function QualityRequirementsEditor({ nodeId, title }: { nodeId: string, title?: string }) {
  const { id } = useParams();
  const [requirements, setRequirements] = useState<QualityRequirement[]>(
    PRESET_DIMENSIONS.map((dim, index) => ({
      id: index.toString(),
      dimension: dim,
      description: ''
    }))
  );

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.requirements) {
        // Merge saved requirements with preset dimensions to ensure all are shown
        const savedReqs = nodeData.requirements as QualityRequirement[];
        const mergedReqs = PRESET_DIMENSIONS.map((dim, index) => {
          const saved = savedReqs.find(r => r.dimension === dim);
          return saved || { id: index.toString(), dimension: dim, description: '' };
        });
        setRequirements(mergedReqs);
      }
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], requirements };
    }
  }, [requirements, id, nodeId]);

  const updateDescription = (id: string, value: string) => {
    setRequirements(requirements.map(req => req.id === id ? { ...req, description: value } : req));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requirements.map((req) => (
          <div key={req.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700">{req.dimension}</h4>
            </div>
            <div className="p-4 flex-1">
              <textarea
                value={req.description}
                onChange={(e) => updateDescription(req.id, e.target.value)}
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                placeholder={`请输入关于 ${req.dimension.split(' ')[0]} 的具体要求...`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
