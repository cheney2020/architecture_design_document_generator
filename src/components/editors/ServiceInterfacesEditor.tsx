import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, Settings } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockDataStore } from '../../lib/mockData';

interface InterfaceParameter {
  id: string;
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ErrorCode {
  id: string;
  code: string;
  message: string;
  solution: string;
}

interface ServiceInterface {
  id: string;
  name: string;
  method: string;
  path: string;
  description: string;
  requestParams: InterfaceParameter[];
  responseParams: InterfaceParameter[];
  errorCodes: ErrorCode[];
}

export default function ServiceInterfacesEditor({ nodeId, title }: { nodeId: string, title?: string }) {
  const { id } = useParams();
  const [interfaces, setInterfaces] = useState<ServiceInterface[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (id && mockDataStore[id]?.content?.[nodeId]) {
      const nodeData = mockDataStore[id].content[nodeId];
      if (nodeData.interfaces) setInterfaces(nodeData.interfaces);
    }
  }, [id, nodeId]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      if (!mockDataStore[id].content) mockDataStore[id].content = {};
      mockDataStore[id].content[nodeId] = { ...mockDataStore[id].content[nodeId], interfaces };
    }
  }, [interfaces, id, nodeId]);

  const addInterface = () => {
    const newInterface: ServiceInterface = {
      id: Date.now().toString(),
      name: '新建接口',
      method: 'GET',
      path: '/api/v1/resource',
      description: '',
      requestParams: [],
      responseParams: [],
      errorCodes: []
    };
    setInterfaces([...interfaces, newInterface]);
    setExpandedId(newInterface.id);
  };

  const updateInterface = (id: string, field: keyof ServiceInterface, value: any) => {
    setInterfaces(interfaces.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const removeInterface = (id: string) => {
    setInterfaces(interfaces.filter(i => i.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const addParam = (interfaceId: string, type: 'requestParams' | 'responseParams') => {
    setInterfaces(interfaces.map(i => {
      if (i.id === interfaceId) {
        return {
          ...i,
          [type]: [...i[type], { id: Date.now().toString(), name: '', type: 'string', required: true, description: '' }]
        };
      }
      return i;
    }));
  };

  const updateParam = (interfaceId: string, paramType: 'requestParams' | 'responseParams', paramId: string, field: keyof InterfaceParameter, value: any) => {
    setInterfaces(interfaces.map(i => {
      if (i.id === interfaceId) {
        return {
          ...i,
          [paramType]: i[paramType].map(p => p.id === paramId ? { ...p, [field]: value } : p)
        };
      }
      return i;
    }));
  };

  const removeParam = (interfaceId: string, paramType: 'requestParams' | 'responseParams', paramId: string) => {
    setInterfaces(interfaces.map(i => {
      if (i.id === interfaceId) {
        return {
          ...i,
          [paramType]: i[paramType].filter(p => p.id !== paramId)
        };
      }
      return i;
    }));
  };

  const addErrorCode = (interfaceId: string) => {
    setInterfaces(interfaces.map(i => {
      if (i.id === interfaceId) {
        return {
          ...i,
          errorCodes: [...i.errorCodes, { id: Date.now().toString(), code: '', message: '', solution: '' }]
        };
      }
      return i;
    }));
  };

  const updateErrorCode = (interfaceId: string, codeId: string, field: keyof ErrorCode, value: string) => {
    setInterfaces(interfaces.map(i => {
      if (i.id === interfaceId) {
        return {
          ...i,
          errorCodes: i.errorCodes.map(c => c.id === codeId ? { ...c, [field]: value } : c)
        };
      }
      return i;
    }));
  };

  const removeErrorCode = (interfaceId: string, codeId: string) => {
    setInterfaces(interfaces.map(i => {
      if (i.id === interfaceId) {
        return {
          ...i,
          errorCodes: i.errorCodes.filter(c => c.id !== codeId)
        };
      }
      return i;
    }));
  };

  const renderParamsTable = (interf: ServiceInterface, type: 'requestParams' | 'responseParams', tableTitle: string) => (
    <div className="mt-6">
      <div className="mb-2">
        <h5 className="text-sm font-medium text-gray-700">{tableTitle}</h5>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/4">参数名</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/6">类型</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 text-center w-16">必填</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-auto">描述</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {interf[type].map(param => (
              <tr key={param.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                <td className="px-4 py-3">
                  <input type="text" value={param.name} onChange={(e) => updateParam(interf.id, type, param.id, 'name', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </td>
                <td className="px-4 py-3">
                  <select value={param.type} onChange={(e) => updateParam(interf.id, type, param.id, 'type', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="object">Object</option>
                    <option value="array">Array</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  <input type="checkbox" checked={param.required} onChange={(e) => updateParam(interf.id, type, param.id, 'required', e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </td>
                <td className="px-4 py-3">
                  <input type="text" value={param.description} onChange={(e) => updateParam(interf.id, type, param.id, 'description', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => removeParam(interf.id, type, param.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={() => addParam(interf.id, type)}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加参数
        </button>
      </div>
    </div>
  );

  const renderErrorCodesTable = (interf: ServiceInterface) => (
    <div className="mt-6">
      <div className="mb-2">
        <h5 className="text-sm font-medium text-gray-700">错误码表</h5>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-1/5">错误码</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-2/5">错误信息</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 w-2/5">解决方案</th>
              <th className="w-12 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {interf.errorCodes.map(code => (
              <tr key={code.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 group">
                <td className="px-4 py-3">
                  <input type="text" value={code.code} onChange={(e) => updateErrorCode(interf.id, code.id, 'code', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </td>
                <td className="px-4 py-3">
                  <input type="text" value={code.message} onChange={(e) => updateErrorCode(interf.id, code.id, 'message', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </td>
                <td className="px-4 py-3">
                  <input type="text" value={code.solution} onChange={(e) => updateErrorCode(interf.id, code.id, 'solution', e.target.value)} className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => removeErrorCode(interf.id, code.id)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={() => addErrorCode(interf.id)}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加错误码
        </button>
      </div>
    </div>
  );

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-orange-100 text-orange-800';
      case 'RPC': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {interfaces.map(interf => (
          <div key={interf.id} className={`border rounded-lg overflow-hidden transition-colors ${expandedId === interf.id ? 'border-blue-300 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}>
            {/* List Item Header */}
            <div 
              className={`flex items-center justify-between p-4 cursor-pointer select-none ${expandedId === interf.id ? 'bg-blue-50/50' : 'bg-white'}`}
              onClick={() => toggleExpand(interf.id)}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-gray-400">
                  {expandedId === interf.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 flex-1">
                  <div className="font-medium text-gray-900 w-48 truncate">{interf.name || '未命名接口'}</div>
                  <div className="flex items-center space-x-3 flex-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${getMethodColor(interf.method)}`}>
                      {interf.method}
                    </span>
                    <span className="text-sm text-gray-600 font-mono truncate">{interf.path}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); removeInterface(interf.id); }}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Expanded Details */}
            {expandedId === interf.id && (
              <div className="p-5 border-t border-gray-200 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">接口名称</label>
                    <input type="text" value={interf.name} onChange={(e) => updateInterface(interf.id, 'name', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-1/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">请求方式</label>
                      <select value={interf.method} onChange={(e) => updateInterface(interf.id, 'method', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                        <option value="RPC">RPC</option>
                      </select>
                    </div>
                    <div className="w-2/3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">接口路径</label>
                      <input type="text" value={interf.path} onChange={(e) => updateInterface(interf.id, 'path', e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">接口描述</label>
                    <textarea value={interf.description} onChange={(e) => updateInterface(interf.id, 'description', e.target.value)} rows={2} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="简要描述接口功能..." />
                  </div>
                </div>

                {renderParamsTable(interf, 'requestParams', '请求参数')}
                {renderParamsTable(interf, 'responseParams', '响应参数')}
                {renderErrorCodesTable(interf)}
              </div>
            )}
          </div>
        ))}
        {interfaces.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 bg-gray-50">
            <Settings className="w-8 h-8 mx-auto text-gray-400 mb-2" />
            <p>暂无接口定义，请点击下方新增</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={addInterface}
          className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-dashed border-blue-300 w-full justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          新增接口
        </button>
      </div>
    </div>
  );
}
