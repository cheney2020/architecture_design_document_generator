export const TEMPLATE_STRUCTURE = [
  {
    id: '1',
    title: '1. 引言',
    icon: 'Info',
    children: [
      { id: '1.1', title: '1.1 项目背景', type: 'rich-text-form' },
      { id: '1.2', title: '1.2 术语定义', type: 'table' },
      { id: '1.3', title: '1.3 业务目标及产品指标', type: 'table' },
      { id: '1.4', title: '1.4 项目依赖', type: 'combined-dependencies' },
      { id: '1.5', title: '1.5 需求风险及假设', type: 'table' },
    ],
  },
  {
    id: '2',
    title: '2. 总体设计',
    icon: 'Layout',
    children: [
      { id: '2.1', title: '2.1 需求规定', type: 'combined-requirements' },
      { id: '2.2', title: '2.2 总体设计说明', type: 'rich-text' },
      { id: '2.3', title: '2.3 总体架构设计', type: 'combined-architecture' },
      { id: '2.4', title: '2.4 服务接口设计', type: 'combined-interfaces' },
      { id: '2.5', title: '2.5 弹性设计', type: 'combined-resilience' },
    ],
  },
  {
    id: '3',
    title: '3. 数据模型设计',
    icon: 'Database',
    children: [
      { id: '3.1', title: '3.1 数据量增长', type: 'table' },
      { id: '3.2', title: '3.2 数据逻辑结构设计', type: 'image-rich-text' },
      { id: '3.3', title: '3.3 数据库存储及访问策略', type: 'checkbox-rich-text' },
      { id: '3.4', title: '3.4 DDL', type: 'code' },
      { id: '3.5', title: '3.5 缓存设计', type: 'rich-text-table' },
    ],
  },
  {
    id: '4',
    title: '4. 定时任务及批处理',
    icon: 'Calendar',
    children: [
      { id: '4.1', title: '4.1 任务列表', type: 'task-list' },
    ],
  },
  {
    id: '5',
    title: '5. 消息设计',
    icon: 'MessageSquare',
    children: [
      { id: '5.1', title: '5.1 消息列表', type: 'message-list' },
    ],
  },
  {
    id: '6',
    title: '6. 监控及告警',
    icon: 'Activity',
    children: [
      { id: '6.1', title: '6.1 监控及告警配置', type: 'combined-monitoring' },
    ],
  },
  {
    id: '7',
    title: '7. 安全性设计',
    icon: 'Shield',
    children: [
      { id: '7.1', title: '7.1 安全检查清单', type: 'checklist' },
    ],
  },
  {
    id: '8',
    title: '8. 合规性设计',
    icon: 'CheckSquare',
    children: [
      { id: '8.1', title: '8.1 合规检查清单', type: 'checklist' },
    ],
  },
  {
    id: '9',
    title: '9. 参考资料',
    icon: 'BookOpen',
    children: [
      { id: '9.1', title: '9.1 资料列表', type: 'reference-list' },
    ],
  },
];

export const flattenTree = (nodes: any[]): any[] => {
  let result: any[] = [];
  nodes.forEach(node => {
    if (node.children) {
      result = result.concat(flattenTree(node.children));
    } else {
      result.push(node);
    }
  });
  return result;
};

export const TOTAL_LEAVES = flattenTree(TEMPLATE_STRUCTURE).length;
