import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TEMPLATE_STRUCTURE, flattenTree, TOTAL_LEAVES } from '../lib/template';
import { 
  CheckCircle2, Circle, ChevronRight, ChevronDown, Download, ArrowLeft, Save,
  Info, Layout, Database, Calendar, MessageSquare, Activity, Shield, CheckSquare, BookOpen,
  Edit2, Check, X
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Info, Layout, Database, Calendar, MessageSquare, Activity, Shield, CheckSquare, BookOpen
};
import RichTextEditor from '../components/editors/RichTextEditor';
import TableEditor from '../components/editors/TableEditor';
import CodeEditor from '../components/editors/CodeEditor';
import ProjectBackgroundEditor from '../components/editors/ProjectBackgroundEditor';
import TerminologyEditor from '../components/editors/TerminologyEditor';
import BusinessMetricsEditor from '../components/editors/BusinessMetricsEditor';
import RisksAssumptionsEditor from '../components/editors/RisksAssumptionsEditor';
import ArchitectureDiagramEditor from '../components/editors/ArchitectureDiagramEditor';
import ScheduledTasksEditor from '../components/editors/ScheduledTasksEditor';
import MessageListEditor from '../components/editors/MessageListEditor';
import MonitoringAlertingEditor from '../components/editors/MonitoringAlertingEditor';
import SecurityDesignEditor from '../components/editors/SecurityDesignEditor';
import ComplianceDesignEditor from '../components/editors/ComplianceDesignEditor';
import ReferenceListEditor from '../components/editors/ReferenceListEditor';
import CombinedDependenciesEditor from '../components/editors/CombinedDependenciesEditor';
import CombinedRequirementsEditor from '../components/editors/CombinedRequirementsEditor';
import CombinedArchitectureEditor from '../components/editors/CombinedArchitectureEditor';
import CombinedInterfacesEditor from '../components/editors/CombinedInterfacesEditor';
import CombinedResilienceEditor from '../components/editors/CombinedResilienceEditor';
import DataGrowthEditor from '../components/editors/DataGrowthEditor';
import CacheDesignEditor from '../components/editors/CacheDesignEditor';
import { mockDataStore } from '../lib/mockData';

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [activeNodeId, setActiveNodeId] = useState<string>('1.1');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isEditingBusinessUnit, setIsEditingBusinessUnit] = useState(false);
  const [tempBusinessUnit, setTempBusinessUnit] = useState('');

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    if (id && mockDataStore[id]) {
      setProject(mockDataStore[id]);
      setTempName(mockDataStore[id].name);
      setTempBusinessUnit(mockDataStore[id].businessUnit || '');
    } else {
      setProject({ name: '新建项目', businessUnit: '', content: {} });
      setTempName('新建项目');
      setTempBusinessUnit('');
    }
  }, [id]);

  if (!project) return <div>Loading...</div>;

  const leafNodeIds = new Set(flattenTree(TEMPLATE_STRUCTURE).map(n => n.id));
  const completedCount = Object.keys(project.content).filter(key => 
    leafNodeIds.has(key) && project.content[key].status === 'completed'
  ).length;
  const progressPercent = Math.round((completedCount / TOTAL_LEAVES) * 100);

  const toggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (node: any) => {
    if (node.children) {
      toggleExpand(node.id);
    } else {
      setActiveNodeId(node.id);
    }
  };

  const renderTree = (nodes: any[], level = 0) => {
    return nodes.map(node => {
      const isLeaf = !node.children;
      const isExpanded = expandedNodes.has(node.id);
      const isActive = activeNodeId === node.id;
      const isCompleted = project.content[node.id]?.status === 'completed';

      return (
        <div key={node.id}>
          <div
            className={`flex items-center py-2 px-3 cursor-pointer select-none transition-colors
              ${isActive ? 'bg-blue-50 text-blue-700 font-medium border-r-4 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}
              ${!isLeaf ? 'text-gray-500' : ''}
            `}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
            onClick={() => handleNodeClick(node)}
          >
            {!isLeaf && (
              <span className="mr-1 text-gray-400">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </span>
            )}
            {isLeaf && (
              <span className="mr-2">
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
              </span>
            )}
            {!isLeaf && node.icon && ICON_MAP[node.icon] && (
              <span className="mr-2 text-gray-400">
                {React.createElement(ICON_MAP[node.icon], { className: "w-4 h-4" })}
              </span>
            )}
            <span className={`truncate ${!isLeaf && level === 0 ? 'font-semibold' : ''}`}>{node.title}</span>
          </div>
          {node.children && isExpanded && (
            <div>{renderTree(node.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  const activeNode = flattenTree(TEMPLATE_STRUCTURE).find(n => n.id === activeNodeId);

  const handleSave = () => {
    // Mock save logic
    const updatedProject = {
      ...project,
      content: {
        ...project.content,
        [activeNodeId]: {
          ...project.content[activeNodeId],
          lastSaved: new Date().toISOString(),
          status: 'completed',
          hasData: true 
        }
      }
    };
    setProject(updatedProject);
    if (id) {
      mockDataStore[id] = updatedProject;
    }
    setToast({ message: '保存成功', type: 'success' });
  };

  const handleSaveAndNext = () => {
    handleSave();
    const allNodes = flattenTree(TEMPLATE_STRUCTURE);
    const currentIndex = allNodes.findIndex(n => n.id === activeNodeId);
    if (currentIndex < allNodes.length - 1) {
      const nextNode = allNodes[currentIndex + 1];
      setActiveNodeId(nextNode.id);
      
      // Ensure parent is expanded
      const parentId = nextNode.id.split('.')[0];
      if (!expandedNodes.has(parentId)) {
        const newExpanded = new Set(expandedNodes);
        newExpanded.add(parentId);
        setExpandedNodes(newExpanded);
      }
    } else {
      setToast({ message: '已是最后一项', type: 'success' });
    }
  };

  const handleSaveName = () => {
    if (!tempName.trim()) {
      setToast({ message: '项目名称不能为空', type: 'error' });
      return;
    }
    const updatedProject = { ...project, name: tempName };
    setProject(updatedProject);
    if (id) {
      mockDataStore[id] = updatedProject;
    }
    setIsEditingName(false);
    setToast({ message: '项目名称已更新', type: 'success' });
  };

  const handleSaveBusinessUnit = () => {
    const updatedProject = { ...project, businessUnit: tempBusinessUnit };
    setProject(updatedProject);
    if (id) {
      mockDataStore[id] = updatedProject;
    }
    setIsEditingBusinessUnit(false);
    setToast({ message: '所属业务已更新', type: 'success' });
  };

  const renderEditor = () => {
    if (!activeNode) return null;
    
    switch (activeNode.id) {
      case '1.1': return <ProjectBackgroundEditor nodeId={activeNode.id} />;
      case '1.2': return <TerminologyEditor nodeId={activeNode.id} />;
      case '1.3': return <BusinessMetricsEditor nodeId={activeNode.id} />;
      case '1.4': return <CombinedDependenciesEditor nodeId={activeNode.id} />;
      case '1.5': return <RisksAssumptionsEditor nodeId={activeNode.id} />;
      case '2.1': return <CombinedRequirementsEditor nodeId={activeNode.id} />;
      case '2.2': return <RichTextEditor nodeId={activeNode.id} />;
      case '2.3': return <CombinedArchitectureEditor nodeId={activeNode.id} />;
      case '2.4': return <CombinedInterfacesEditor nodeId={activeNode.id} />;
      case '2.5': return <CombinedResilienceEditor nodeId={activeNode.id} />;
      case '3.1': return <DataGrowthEditor nodeId={activeNode.id} />;
      case '3.2': return <ArchitectureDiagramEditor nodeId={activeNode.id} />;
      case '3.5': return <CacheDesignEditor nodeId={activeNode.id} />;
      case '4.1': return <ScheduledTasksEditor nodeId={activeNode.id} />;
      case '5.1': return <MessageListEditor nodeId={activeNode.id} />;
      case '6.1': return <MonitoringAlertingEditor nodeId={activeNode.id} />;
      case '7.1': return <SecurityDesignEditor nodeId={activeNode.id} />;
      case '8.1': return <ComplianceDesignEditor nodeId={activeNode.id} />;
      case '9.1': return <ReferenceListEditor nodeId={activeNode.id} />;
      default:
        if (activeNode.type.includes('rich-text')) return <RichTextEditor nodeId={activeNode.id} />;
        if (activeNode.type.includes('table')) return <TableEditor nodeId={activeNode.id} />;
        if (activeNode.type === 'code') return <CodeEditor nodeId={activeNode.id} />;
        return (
          <div className="text-gray-500 italic flex items-center justify-center h-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-md">
            [{activeNode.type}] 编辑器开发中...
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Toolbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md mr-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col ml-2">
            {isEditingName ? (
              <div className="flex items-center space-x-2 mb-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="px-2 py-1 border border-blue-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-64"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') {
                      setIsEditingName(false);
                      setTempName(project.name);
                    }
                  }}
                />
                <button onClick={handleSaveName} className="p-1 text-green-600 hover:bg-green-50 rounded-md">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => { setIsEditingName(false); setTempName(project.name); }} className="p-1 text-red-600 hover:bg-red-50 rounded-md">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center group mb-1">
                <h1 className="text-lg font-semibold text-gray-900 truncate max-w-xs">{project.name}</h1>
                <button 
                  onClick={() => setIsEditingName(true)}
                  className="ml-2 p-1 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {isEditingBusinessUnit ? (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">所属业务:</span>
                <input
                  type="text"
                  value={tempBusinessUnit}
                  onChange={(e) => setTempBusinessUnit(e.target.value)}
                  className="px-2 py-0.5 border border-blue-500 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-200 w-48"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveBusinessUnit();
                    if (e.key === 'Escape') {
                      setIsEditingBusinessUnit(false);
                      setTempBusinessUnit(project.businessUnit || '');
                    }
                  }}
                />
                <button onClick={handleSaveBusinessUnit} className="p-0.5 text-green-600 hover:bg-green-50 rounded-md">
                  <Check className="w-3 h-3" />
                </button>
                <button onClick={() => { setIsEditingBusinessUnit(false); setTempBusinessUnit(project.businessUnit || ''); }} className="p-0.5 text-red-600 hover:bg-red-50 rounded-md">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="flex items-center group">
                <span className="text-xs text-gray-500 mr-1">所属业务:</span>
                <span className="text-xs text-gray-700 truncate max-w-[200px]">{project.businessUnit || '未设置'}</span>
                <button 
                  onClick={() => setIsEditingBusinessUnit(true)}
                  className="ml-1 p-0.5 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          <div className="ml-6 flex items-center text-sm text-gray-500">
            <span className="mr-2">完成进度:</span>
            <div className="flex items-center">
              <span className="font-medium text-blue-600 mr-2">{progressPercent}% ({completedCount}/{TOTAL_LEAVES})</span>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => navigate(`/project/${id}/export`)} className="flex items-center px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-md text-sm transition-colors">
            <Download className="w-4 h-4 mr-1.5" />
            导出文档
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Tree Menu (30%) */}
        <aside className="w-[30%] min-w-[250px] max-w-[400px] bg-white border-r border-gray-200 overflow-y-auto py-4">
          {renderTree(TEMPLATE_STRUCTURE)}
        </aside>

        {/* Right Editor Area (70%) */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            {activeNode ? (
              <div key={activeNodeId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[500px]">
                {/* Module Header */}
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-start shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{activeNode.title}</h2>
                    <p className="text-sm text-gray-500">
                      {activeNode.id === '1.1' && '描述项目的起源、目标、核心价值以及参与项目的关键角色和职责。'}
                      {activeNode.id === '1.2' && '列出文档中使用的专业术语、缩写及其对应的详细定义，确保团队理解一致。'}
                      {activeNode.id === '1.3' && '明确项目的业务目标（如DAU提升）和关键产品指标（KPI），作为设计的基准。'}
                      {activeNode.id === '1.4' && '梳理项目运行所需的外部系统、中间件资源以及相关的业务流程依赖。'}
                      {activeNode.id === '1.5' && '识别项目实施过程中可能面临的风险、应对策略，以及设计所基于的假设条件。'}
                      {activeNode.id === '2.1' && '详细列出功能性需求和非功能性需求（如性能、安全性、可扩展性等质量要求）。'}
                      {activeNode.id === '2.2' && '对系统的整体设计思路、原则和关键决策进行概要说明。'}
                      {activeNode.id === '2.3' && '通过逻辑架构、物理部署、时序图等维度展示系统的整体技术架构。'}
                      {activeNode.id === '2.4' && '定义系统对外的API接口、内部服务调用接口以及相关的兼容性和错误处理机制。'}
                      {activeNode.id === '2.5' && '描述系统在面临高并发或异常情况下的降级、限流和熔断等自我保护机制。'}
                      {activeNode.id === '3.1' && '预估未来一段时间内的数据增长趋势，为数据库选型和容量规划提供依据。'}
                      {activeNode.id === '3.2' && '展示核心实体的逻辑模型，描述数据之间的关联关系。'}
                      {activeNode.id === '3.3' && '说明数据的存储引擎选择、分库分表策略、读写分离配置等。'}
                      {activeNode.id === '3.4' && '提供数据库表结构的定义脚本（SQL），包括字段类型、索引配置等。'}
                      {activeNode.id === '3.5' && '描述缓存的使用场景、存储策略、失效机制及数据一致性保障。'}
                      {activeNode.id === '4.1' && '列出系统中所有的定时任务、批处理作业及其调度周期和执行逻辑。'}
                      {activeNode.id === '5.1' && '定义系统间异步通信的消息主题（Topic）、生产者、消费者及消息格式。'}
                      {activeNode.id === '6.1' && '配置系统的监控指标（如QPS、延迟）、告警阈值及通知渠道。'}
                      {activeNode.id === '7.1' && '评估系统在身份认证、数据加密、访问控制等方面的安全性合规情况。'}
                      {activeNode.id === '8.1' && '确保系统设计符合法律法规、行业标准及公司内部的合规性要求。'}
                      {activeNode.id === '9.1' && '列出设计过程中参考的文档、标准、技术规范或其他相关资料。'}
                      {!['1.1', '1.2', '1.3', '1.4', '1.5', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2', '3.3', '3.4', '3.5', '4.1', '5.1', '6.1', '7.1', '8.1', '9.1'].includes(activeNode.id) && '请根据指引填写相关架构设计内容。'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={project.content[activeNode.id]?.status === 'completed'}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          
                          // If checking, verify content
                          if (isChecked) {
                            const nodeContent = project.content[activeNode.id];
                            // Check if there is any saved data or content
                            const hasData = nodeContent && (nodeContent.hasData || Object.keys(nodeContent).some(key => key !== 'status' && nodeContent[key]));
                            
                            if (!hasData) {
                              setToast({ message: '请先填写并保存内容后再标记完成', type: 'error' });
                              return;
                            }
                          }

                          const newContent = {
                            ...project.content,
                            [activeNode.id]: {
                              ...project.content[activeNode.id],
                              status: isChecked ? 'completed' : 'draft'
                            }
                          };
                          
                          setProject({
                            ...project,
                            content: newContent
                          });
                          
                          // Update mock store to persist across "navigation" in this session
                          mockDataStore[id!] = {
                            ...project,
                            content: newContent
                          };
                        }}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">标记完成</span>
                    </label>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6 flex-1 min-h-[280px]">
                  {renderEditor()}
                </div>

                {/* Module Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                  <span className="text-xs text-gray-400">已自动保存于 {new Date().toLocaleTimeString()}</span>
                  <div className="flex space-x-3">
                    <button 
                      onClick={handleSave}
                      className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-1.5" />
                      保存模块
                    </button>
                    <button 
                      onClick={handleSaveAndNext}
                      className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors flex items-center"
                    >
                      保存并下一项
                      <ChevronRight className="w-4 h-4 ml-1.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                请在左侧选择要编辑的模块
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl z-[100] flex items-center animate-in slide-in-from-bottom-4 duration-300 ${
          toast.type === 'success' ? 'bg-gray-900 text-white' : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
