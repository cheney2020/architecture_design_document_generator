import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface SecurityCheckItem {
  id: string;
  checkItem: string;
  result: 'yes' | 'no' | 'na' | '';
  remark: string;
}

interface SecurityCategory {
  id: string;
  name: string;
  items: SecurityCheckItem[];
}

const INITIAL_DATA: SecurityCategory[] = [
  {
    id: 'network',
    name: '网络安全',
    items: [
      { id: 'n1', checkItem: '系统是否提供对公网访问', result: '', remark: '' },
      { id: 'n2', checkItem: '管理后台需限制仅从内网访问', result: '', remark: '' },
      { id: 'n3', checkItem: '是否配置了限源访问策略', result: '', remark: '' },
    ]
  },
  {
    id: 'application',
    name: '应用安全',
    items: [
      { id: 'a1', checkItem: '登录防爆破机制（如验证码、锁定策略）', result: '', remark: '' },
      { id: 'a2', checkItem: '密码复杂度要求及加密存储', result: '', remark: '' },
      { id: 'a3', checkItem: '所有对外接口是否均有鉴权机制', result: '', remark: '' },
      { id: 'a4', checkItem: '权限控制是否遵循最小权限原则', result: '', remark: '' },
      { id: 'a5', checkItem: '应用进程是否避免以 ROOT 权限运行', result: '', remark: '' },
    ]
  },
  {
    id: 'data',
    name: '数据安全',
    items: [
      { id: 'd1', checkItem: '是否涉及用户个人信息等敏感数据', result: '', remark: '' },
      { id: 'd2', checkItem: '敏感数据是否加密存储', result: '', remark: '' },
      { id: 'd3', checkItem: '敏感数据在日志中是否脱敏', result: '', remark: '' },
    ]
  },
  {
    id: 'algorithm',
    name: '算法安全',
    items: [
      { id: 'al1', checkItem: '是否直接面向外部用户提供功能服务', result: '', remark: '' },
      { id: 'al2', checkItem: '是否使用深度合成/AI/推荐/过滤算法', result: '', remark: '' },
    ]
  }
];

export default function SecurityDesignEditor({ nodeId }: { nodeId: string }) {
  const { id } = useParams();
  const [categories, setCategories] = useState<SecurityCategory[]>(INITIAL_DATA);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.categories) setCategories(nodeData.categories);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], categories };
    }
  }, [categories, id, nodeId]);

  const updateItem = (categoryId: string, itemId: string, field: keyof SecurityCheckItem, value: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          items: cat.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
        };
      }
      return cat;
    }));
  };

  // Special Logic Checks
  const dataCat = categories.find(c => c.id === 'data');
  const involvesSensitiveData = dataCat?.items.find(i => i.id === 'd1')?.result === 'yes';
  const encryptedStorage = dataCat?.items.find(i => i.id === 'd2')?.result === 'yes';

  const algoCat = categories.find(c => c.id === 'algorithm');
  const externalService = algoCat?.items.find(i => i.id === 'al1')?.result === 'yes';
  const usesAlgorithm = algoCat?.items.find(i => i.id === 'al2')?.result === 'yes';
  const showAlgorithmAlert = externalService && usesAlgorithm;

  return (
    <div className="space-y-6">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h3 className="text-lg font-medium text-gray-900">安全检查清单</h3>
        <p className="text-sm text-gray-500 mt-1">请根据系统实际情况完成以下安全项的自查。部分涉及敏感数据或算法的项需详细说明。</p>
      </div>

      {showAlgorithmAlert && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-yellow-800">⚠️ 涉及算法合规</h4>
            <p className="text-sm text-yellow-700 mt-1">
              请联系 Legal 部门 <strong>Jenny Lin (林菁菁)</strong> 进行算法合规与安全评估。
            </p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category.id} className="space-y-2">
            <h4 className="font-medium text-gray-800">{category.name}</h4>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/3">安全检查项</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">检查结果</th>
                    <th className="px-4 py-3 text-sm font-medium text-gray-700 w-auto">补充说明</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map(item => {
                    const isD1Required = item.id === 'd1' && involvesSensitiveData;
                    const isD2Required = item.id === 'd2' && encryptedStorage;
                    const isRemarkRequired = isD1Required || isD2Required;

                    return (
                      <tr key={item.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                        <td className="px-4 py-3 align-top">
                          <span className="font-medium text-gray-900 text-sm">{item.checkItem}</span>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <select
                            value={item.result}
                            onChange={(e) => updateItem(category.id, item.id, 'result', e.target.value)}
                            className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="" disabled>请选择</option>
                            <option value="yes">是</option>
                            <option value="no">否</option>
                            <option value="na">不涉及</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <textarea
                            value={item.remark}
                            onChange={(e) => updateItem(category.id, item.id, 'remark', e.target.value)}
                            rows={2}
                            className={`w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                              isRemarkRequired
                                ? 'border-orange-300 bg-orange-50 focus:ring-orange-500 focus:border-orange-500'
                                : 'border-gray-300 bg-gray-50 focus:bg-white'
                            }`}
                            placeholder={
                              isD1Required ? "请说明相关字段 (例如：用户手机号、收货地址...)" :
                              isD2Required ? "请说明加密字段及算法 (例如：手机号使用 AES-256 加密...)" :
                              "补充说明 (选填)..."
                            }
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
