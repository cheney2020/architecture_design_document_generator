import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { mockDataStore } from '../lib/mockData';
import { TEMPLATE_STRUCTURE, flattenTree, TOTAL_LEAVES } from '../lib/template';

export default function ExportPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = id ? mockDataStore[id] : null;
  
  if (!project) {
    return <div className="p-8">项目不存在</div>;
  }

  const leafNodeIds = new Set(flattenTree(TEMPLATE_STRUCTURE).map(n => n.id));
  const completedCount = Object.keys(project.content || {}).filter(key => 
    leafNodeIds.has(key) && project.content[key].status === 'completed'
  ).length;
  const progressPercent = Math.round((completedCount / TOTAL_LEAVES) * 100);

  const handleExportWord = () => {
    const element = document.getElementById('export-content');
    if (!element) {
      alert('找不到导出内容');
      return;
    }
    
    // Add basic CSS to ensure tables and other elements render correctly in Word
    const styles = `
      <style>
        body { font-family: 'Microsoft YaHei', sans-serif; line-height: 1.5; color: #000; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 16px; font-size: 14px; table-layout: fixed; word-wrap: break-word; }
        th, td { border: 1px solid #d1d5db; padding: 8px 16px; text-align: left; vertical-align: top; word-wrap: break-word; word-break: break-all; }
        th { background-color: #f3f4f6; font-weight: bold; }
        h1 { font-size: 24px; margin-bottom: 16px; text-align: center; }
        h2 { font-size: 20px; border-bottom: 2px solid #111827; padding-bottom: 8px; margin-bottom: 16px; margin-top: 24px; }
        h3 { font-size: 18px; margin-bottom: 12px; }
        h4 { font-size: 16px; font-weight: bold; margin-bottom: 8px; color: #374151; }
        p { margin-bottom: 8px; }
        .bg-gray-50 { background-color: #f9fafb; padding: 16px; border-radius: 6px; }
        pre { background-color: #f9fafb; padding: 16px; white-space: pre-wrap; word-wrap: break-word; font-family: monospace; }
        img { max-width: 100%; height: auto; }
      </style>
    `;
    
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export</title>${styles}</head><body>`;
    const footer = "</body></html>";
    const sourceHTML = header + element.innerHTML + footer;
    
    // Add BOM for UTF-8 encoding in Word
    const blob = new Blob(['\ufeff', sourceHTML], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.name || 'project'}-架构设计说明书.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderData = (data: any) => {
    if (!data) return null;
    
    const elements = [];
    
    if (data.richText) {
      elements.push(<div key="richText" dangerouslySetInnerHTML={{ __html: data.richText }} className="prose max-w-none text-sm" />);
    }
    if (data.code) {
      elements.push(<pre key="code" className="bg-gray-50 p-4 rounded-md text-sm font-mono overflow-x-auto whitespace-pre-wrap">{data.code}</pre>);
    }
    
    const arrayKeys = ['tableData', 'roles', 'goals', 'requirements', 'interfaces', 'dataGrowth', 'topics', 'tasks', 'checklist', 'apps', 'categories', 'items'];
    for (const key of arrayKeys) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        const arr = data[key];
        
        // Define column mapping for better display
        const columnMap: { [key: string]: string } = {
          category: '分类',
          requirement: '要求',
          example: '示例',
          result: '结果',
          remediation: '整改措施/备注',
          checkitem: '检查项',
          remark: '备注',
          name: '名称',
          method: '请求方法',
          path: '路径',
          description: '描述',
          requestparams: '请求参数',
          responseparams: '响应参数',
          errorcodes: '错误码',
          metric: '指标',
          target: '目标',
          dimension: '维度',
          role: '角色',
          taskname: '任务名称',
          schedule: '调度周期',
          topic: '主题',
          consumer: '消费者',
          producer: '生产者',
          isneeded: '是否需要',
          triggercondition: '触发条件',
          strategy: '策略',
          recoverymechanism: '恢复机制',
          title: '标题',
          link: '链接',
          type: '类型',
          address: '地址',
          isrequired: '是否必须',
          required: '是否必须',
          baseline: '基线',
          forecast: '预测',
          current: '当前值',
          dependentprocesses: '依赖进程',
          items: '检查项',
          term: '术语',
          definition: '定义',
          risk: '风险',
          plan: '应对计划',
          impact: '影响',
          mitigation: '缓解措施',
          goal: '目标',
          datatype: '数据类型',
          cachestrategy: '缓存策略',
          invalidation: '失效机制',
          solution: '解决方案',
          logic: '计算逻辑',
          source: '数据来源',
          item: '告警项',
          level: '级别',
          condition: '触发条件',
          channels: '通知渠道',
          deployment: '部署方式',
          version: '版本',
          appid: '应用ID',
          desc: '描述',
          owner: '负责人',
          probability: '概率',
          importance: '重要程度',
          purpose: '目的',
          scheduletype: '调度类型',
          schedulevalue: '调度值',
          framework: '使用框架',
          logicdesc: '逻辑描述',
          exceptionhandling: '异常处理',
          format: '格式',
          capacityvalue: '容量值',
          capacityunit: '容量单位',
          roles: '角色',
          faulttolerance: '容错机制',
          col1: '需求名称',
          col2: '优先级',
          col3: '是否必须',
          col4: '预估容量',
        };

        const resultTranslationMap: Record<string, string> = {
          'yes': '是',
          'no': '否',
          'na': '不涉及',
          'compliant': '符合',
          'partial': '部分符合',
          'non-compliant': '不符合'
        };

        // Determine columns based on data keys
        let columns = Object.keys(arr[0]).filter(k => k !== 'id' && k !== 'key');
        
        // If it's a checklist-like structure, map to specific columns
        const isChecklist = Array.isArray(arr[0].items);
        const displayColumns = isChecklist 
          ? ['name', 'items'] // This is just for table rendering logic, we handle items differently
          : columns;
        
        elements.push(
          <div key={key} className="overflow-x-auto w-full">
            <table className="w-full border-collapse border border-gray-300 my-4 text-sm table-fixed break-words">
              <thead>
                <tr className="bg-gray-100">
                  {isChecklist ? (
                    <>
                      <th className="border border-gray-300 px-4 py-2 text-left w-1/4">名称</th>
                      <th className="border border-gray-300 px-4 py-2 text-left w-1/4">要求/检查项</th>
                      <th className="border border-gray-300 px-4 py-2 text-left w-1/4">结果</th>
                      <th className="border border-gray-300 px-4 py-2 text-left w-1/4">备注/整改</th>
                    </>
                  ) : (
                    displayColumns.map(col => (
                      <th key={col} className="border border-gray-300 px-4 py-2 text-left capitalize">
                        {columnMap[col.toLowerCase()] || col}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {arr.map((row: any, i: number) => {
                  // If it's a checklist, expand items into multiple rows
                  if (Array.isArray(row.items)) {
                    return row.items.map((item: any, j: number) => (
                      <tr key={`${i}-${j}`}>
                        {j === 0 && <td rowSpan={row.items.length} className="border border-gray-300 px-4 py-2 font-semibold break-words">{row.name}</td>}
                        <td className="border border-gray-300 px-4 py-2 break-words">{item.checkItem || item.checkitem || item.requirement}</td>
                        <td className="border border-gray-300 px-4 py-2 break-words">{resultTranslationMap[item.result] || item.result}</td>
                        <td className="border border-gray-300 px-4 py-2 break-words">{item.remediation || item.remark}</td>
                      </tr>
                    ));
                  }
                  
                  // Default rendering for other tables
                  return (
                    <tr key={i}>
                      {displayColumns.map(col => {
                        let val = row[col];
                        
                        // Translate result and isRequired columns
                        if ((col.toLowerCase() === 'result' || col.toLowerCase() === 'isrequired') && typeof val === 'string') {
                          val = resultTranslationMap[val] || val;
                        }

                        // Handle nested objects recursively to flatten them into readable strings
                        const flattenObject = (obj: any): string => {
                          if (typeof obj !== 'object' || obj === null) return String(obj);
                          
                          const nestedKeyMap: Record<string, string> = {
                            avgMin: '平均(分钟)',
                            peakMin: '峰值(分钟)',
                            avgDay: '平均(天)',
                            peakDay: '峰值(天)',
                            baseline: '基线指标',
                            forecast: '流量预估',
                            role: '角色',
                            systemName: '系统名称',
                            remark: '备注'
                          };
                          
                          return Object.entries(obj)
                            .filter(([k]) => k !== 'id')
                            .map(([k, v]) => `${nestedKeyMap[k] || k}: ${typeof v === 'object' ? flattenObject(v) : v}`)
                            .join(', ');
                        };
                        
                        if (typeof val === 'object' && val !== null) {
                          val = flattenObject(val);
                        }
                        return <td key={col} className="border border-gray-300 px-4 py-2 break-words">{String(val || '')}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    }
    
    const objKeys = ['strategy', 'dependentProcesses'];
    const objKeyTranslationMap: Record<string, string> = {
      strategy: '策略',
      dependentProcesses: '依赖进程',
      isNeeded: '是否需要',
      triggerCondition: '触发条件',
      recoveryMechanism: '恢复机制',
      isDependent: '是否依赖',
      detail: '详情'
    };

    for (const key of objKeys) {
      if (data[key] && typeof data[key] === 'object' && !Array.isArray(data[key])) {
        const obj = data[key];
        const keys = Object.keys(obj);
        
        elements.push(
          <div key={key} className="overflow-x-auto w-full">
            <table className="w-full border-collapse border border-gray-300 my-4 text-sm table-fixed break-words">
              <thead>
                <tr className="bg-gray-100">
                  {keys.map(k => (
                    <th key={k} className="border border-gray-300 px-4 py-2 text-left capitalize">
                      {objKeyTranslationMap[k] || k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {keys.map(k => {
                    const v = obj[k];
                    const displayValue = typeof v === 'object' && v !== null 
                      ? Object.entries(v).map(([subK, subV]) => {
                          let translatedSubV = subV;
                          if (subV === 'yes' || subV === 'true') translatedSubV = '是';
                          if (subV === 'no' || subV === 'false') translatedSubV = '否';
                          return `${objKeyTranslationMap[subK] || subK}: ${translatedSubV}`;
                        }).join(', ') 
                      : String(v);
                    
                    let finalDisplayValue = displayValue;
                    if (displayValue === 'true' || displayValue === 'yes') finalDisplayValue = '是';
                    if (displayValue === 'false' || displayValue === 'no') finalDisplayValue = '否';
                    
                    return (
                      <td key={k} className="border border-gray-300 px-4 py-2 break-words">
                        {finalDisplayValue}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
    }
    
    if (data.imageUrl) {
      elements.push(<img key="img" src={data.imageUrl} alt="Diagram" className="max-w-full h-auto my-4 rounded-md border border-gray-200" />);
    }
    
    if (elements.length === 0) {
      return null;
    }
    
    return <div className="space-y-4">{elements}</div>;
  };

  const renderNode = (node: any) => {
    const tabOrder: Record<string, { id: string, label: string }[]> = {
      '1.1': [{ id: 'background', label: '背景描述' }, { id: '1.1', label: '角色信息' }],
      '1.4': [{ id: 'systems', label: '依赖系统' }, { id: 'middleware', label: '依赖中间件' }, { id: 'processes', label: '依赖流程' }],
      '2.1': [{ id: 'goals', label: '设计目标' }, { id: 'functional', label: '功能需求' }, { id: 'quality', label: '质量需求' }],
      '2.3': [
        { id: 'usecase', label: '用例图' },
        { id: 'usecase-desc', label: '用例图描述' },
        { id: 'logical', label: '逻辑架构图' },
        { id: 'logical-desc', label: '逻辑架构图描述' },
        { id: 'physical', label: '物理部署图' },
        { id: 'physical-desc', label: '物理部署图描述' },
        { id: 'sequence', label: '处理流程时序图' },
        { id: 'sequence-desc', label: '处理流程时序图描述' },
        { id: 'dataflow', label: '数据流描述' }
      ],
      '2.4': [{ id: 'external', label: '外部接口' }, { id: 'internal', label: '内部接口' }, { id: 'compatibility', label: '兼容/错误处理机制' }],
      '2.5': [{ id: 'degradation', label: '降级' }, { id: 'ratelimit', label: '限流' }, { id: 'circuitbreaker', label: '熔断' }],
      '3.2': [{ id: '3.2', label: '数据逻辑结构设计' }, { id: 'desc', label: '描述' }],
      '3.5': [{ id: 'scenarios', label: '缓存使用场景' }, { id: 'capacity', label: '缓存容量规划' }, { id: 'availability', label: '缓存高可用' }, { id: 'structure', label: '缓存数据结构' }],
      '6.1': [{ id: '6.1', label: '影响的监控指标' }, { id: '6.2', label: '新监控指标' }, { id: '6.3', label: '告警定义' }]
    };

    const orderedTabs = tabOrder[node.id] || [];
    
    // Sort keys based on tabOrder, node.id comes first
    const contentKeys = Object.keys(project.content || {})
      .filter(k => {
        if (node.id === '6.1') return ['6.1', '6.2', '6.3'].includes(k);
        return k === node.id || k.startsWith(`${node.id}-`);
      })
      .sort((a, b) => {
        const tabA = a === node.id ? node.id : a.replace(`${node.id}-`, '');
        const tabB = b === node.id ? node.id : b.replace(`${node.id}-`, '');
        
        const indexA = orderedTabs.findIndex(t => t.id === tabA);
        const indexB = orderedTabs.findIndex(t => t.id === tabB);
        
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
    
    let hasContent = false;
    const contentElements = contentKeys.map((key, index) => {
      const data = project.content[key];
      const rendered = renderData(data);
      if (rendered) {
        hasContent = true;
        // Determine numbering: 1.1 -> 1.1.1, 1.1.2
        const numbering = key === node.id ? `${node.id}.1` : `${node.id}.${index + 1}`;
        
        const tabId = key === node.id ? node.id : key.replace(`${node.id}-`, '');
        const tabLabel = orderedTabs.find(t => t.id === tabId)?.label;
        const displayTitle = tabLabel || (key === node.id ? node.title.split(' ').slice(1).join(' ') : tabId);
        
        return (
          <div key={key} className="mb-6">
            {contentKeys.length > 1 && node.id !== '1.1' && (
              <h4 className="text-md font-medium text-gray-700 mb-2">
                {numbering} {displayTitle}
              </h4>
            )}
            {rendered}
          </div>
        );
      }
      return null;
    });

    return (
      <section key={node.id} className="mb-8">
        <h3 className="text-xl font-semibold mb-3">{node.title}</h3>
        {hasContent ? contentElements : <p className="text-gray-400 italic text-sm">暂无内容</p>}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col print:bg-white">
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10 print:hidden">
        <div className="flex items-center">
          <button onClick={() => navigate(`/project/${id}`)} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md mr-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">导出预览</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={handleExportWord} className="flex items-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium transition-colors shadow-sm">
            <FileText className="w-4 h-4 mr-2" />
            导出 Word
          </button>
        </div>
      </header>

      {progressPercent < 100 && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 flex items-center justify-center print:hidden">
          <span className="text-yellow-800 text-sm font-medium">
            ⚠️ 注意：当前项目完成度仅为 {progressPercent}%，存在未填写的必填项，导出的文档可能不完整。
          </span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-8 flex justify-center print:p-0 print:overflow-visible">
        <div id="export-content" className="w-[210mm] min-h-[297mm] bg-white shadow-lg border border-gray-200 p-16 print:shadow-none print:border-none print:w-full print:p-0">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold mb-4">{project.name}<br/>架构设计说明书</h1>
            <div className="text-gray-500 mt-8">
              <p>最后更新日期：{project.lastModified || new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          <div className="space-y-12">
            {TEMPLATE_STRUCTURE.map(section => (
              <div key={section.id}>
                <h2 className="text-2xl font-bold border-b-2 border-gray-900 pb-2 mb-6">{section.title}</h2>
                {section.children?.map(child => renderNode(child))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
