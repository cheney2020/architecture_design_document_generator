import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface ComplianceItem {
  id: string;
  category: string;
  requirement: string;
  example: string;
  result: 'compliant' | 'partial' | 'non-compliant' | 'na' | '';
  remediation: string;
}

const INITIAL_DATA: ComplianceItem[] = [
  { id: 'c1', category: '备案', requirement: 'APP/小程序备案', example: '需在工信部完成APP或小程序备案', result: '', remediation: '' },
  { id: 'c2', category: '备案', requirement: '公安联网备案', example: '涉及交互式服务需在公安机关备案', result: '', remediation: '' },
  { id: 'c3', category: '备案', requirement: '算法备案', example: '使用深度合成等算法需进行网信办备案', result: '', remediation: '' },
  { id: 'c4', category: '个人信息保护', requirement: '合法正当必要原则', example: '收集个人信息需有明确目的，不收集与服务无关的信息', result: '', remediation: '' },
  { id: 'c5', category: '个人信息保护', requirement: '明示同意', example: '收集前需通过弹窗等方式获取用户明示同意', result: '', remediation: '' },
  { id: 'c6', category: '用户权益响应', requirement: '账号注销功能', example: '需提供便捷的账号注销渠道，且注销后及时删除数据', result: '', remediation: '' },
  { id: 'c7', category: '用户权益响应', requirement: '撤回同意授权', example: '用户可以撤回对隐私政策或特定权限的授权', result: '', remediation: '' },
  { id: 'c8', category: '敏感个人信息', requirement: '儿童信息保护 (DCO)', example: '收集不满14周岁未成年人信息需专门的隐私规则和监护人同意', result: '', remediation: '' },
  { id: 'c9', category: '第三方合作', requirement: 'SDK 接入评估', example: '接入第三方 SDK 前需进行安全和隐私合规评估', result: '', remediation: '' },
  { id: 'c10', category: '协议及规则', requirement: '隐私政策展示', example: '首次启动需弹窗提示隐私政策，且在应用内常驻入口', result: '', remediation: '' },
];

export default function ComplianceDesignEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [items, setItems] = useState<ComplianceItem[]>(INITIAL_DATA);

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

  const updateItem = (id: string, field: keyof ComplianceItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ComplianceItem[]>);

  return (
    <div className="space-y-6">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h3 className="text-lg font-medium text-gray-900">合规检查清单</h3>
        <p className="text-sm text-gray-500 mt-1">请根据系统实际情况完成以下合规项的自查。部分符合或不符合的项必须填写整改计划。</p>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="space-y-2">
            <h4 className="font-medium text-gray-800">{category}</h4>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">合规要求</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">检查结果</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">偏差说明与整改计划</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryItems.map(item => {
                    const needsRemediation = item.result === 'partial' || item.result === 'non-compliant';
                    
                    return (
                      <tr key={item.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-start">
                            <span className="font-medium text-gray-900 text-sm">{item.requirement}</span>
                            <div className="ml-2 group/tooltip relative inline-block mt-0.5">
                              <Info className="w-4 h-4 text-gray-400 cursor-help" />
                              <div className="hidden group-hover/tooltip:block absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-800 rounded shadow-lg -left-2 top-full">
                                {item.example}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <select
                            value={item.result}
                            onChange={(e) => updateItem(item.id, 'result', e.target.value)}
                            className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="" disabled>请选择</option>
                            <option value="compliant">符合</option>
                            <option value="partial">部分符合</option>
                            <option value="non-compliant">不符合</option>
                            <option value="na">不涉及</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <textarea
                            value={item.remediation}
                            onChange={(e) => updateItem(item.id, 'remediation', e.target.value)}
                            rows={2}
                            disabled={!needsRemediation}
                            className={`w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                              needsRemediation 
                                ? 'border-orange-300 bg-orange-50 focus:ring-orange-500 focus:border-orange-500' 
                                : 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
                            }`}
                            placeholder={needsRemediation ? "请详细说明不符合的原因，以及具体的整改计划和预计完成时间..." : "无需整改"}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
