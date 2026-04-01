import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, FileText, Clock, MoreVertical } from 'lucide-react';
import { mockDataStore } from '../lib/mockData';

import { TEMPLATE_STRUCTURE, flattenTree, TOTAL_LEAVES } from '../lib/template';

export default function ProjectList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newBusinessUnit, setNewBusinessUnit] = useState('');

  // Mock data
  const [projects, setProjects] = useState(() => {
    const leafNodeIds = new Set(flattenTree(TEMPLATE_STRUCTURE).map(n => n.id));
    return Object.entries(mockDataStore).map(([id, data]) => ({
      id,
      name: data.name,
      businessUnit: data.businessUnit || '',
      owner: data.owner || '未知',
      updatedAt: data.lastModified || data.updatedAt || '未知',
      progress: {
        completed: Object.keys(data.content || {}).filter(key => 
          leafNodeIds.has(key) && data.content[key].status === 'completed'
        ).length,
        total: TOTAL_LEAVES
      }
    })).sort((a, b) => b.id.localeCompare(a.id));
  });

  const handleCreate = () => {
    if (!newProjectName.trim()) return;
    const newId = Date.now().toString();
    const newProject = { 
      id: newId, 
      name: newProjectName, 
      businessUnit: newBusinessUnit,
      owner: '当前用户', 
      updatedAt: new Date().toLocaleString(), 
      progress: { completed: 0, total: TOTAL_LEAVES } 
    };
    
    // Update shared mock store
    mockDataStore[newId] = {
      name: newProjectName,
      businessUnit: newBusinessUnit,
      content: {}
    };

    setProjects([newProject, ...projects]);
    setShowCreateModal(false);
    setNewProjectName('');
    setNewBusinessUnit('');
    navigate(`/project/${newId}`);
  };

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">架构设计协同工作台</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            新建项目
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索项目名称..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/project/${project.id}`)}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center flex-1 min-w-0">
                  <FileText className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 truncate" title={project.name}>{project.name}</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>所属业务: {project.businessUnit || '未设置'}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {project.updatedAt}</span>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">完成度</span>
                    <span className="font-medium text-blue-600">{Math.round((project.progress.completed / project.progress.total) * 100)}% ({project.progress.completed}/{project.progress.total})</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(project.progress.completed / project.progress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">新建架构设计项目</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">项目名称</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入项目名称"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">所属业务</label>
                <input
                  type="text"
                  value={newBusinessUnit}
                  onChange={(e) => setNewBusinessUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入所属业务"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
