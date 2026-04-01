export const mockDataStore: Record<string, any> = {
  '1': {
    name: 'DOP 数据运营平台',
    businessUnit: '大数据中心',
    content: {
      '1.1': { status: 'completed', richText: '<p>这是项目背景...</p>' }
    }
  },
  '2': {
    id: '2',
    name: '智能营销系统 (AI Marketing System)',
    description: '基于机器学习的精准营销投放与自动化运营系统',
    status: 'in-progress',
    progress: 65,
    lastModified: '2026-03-31',
    owner: '李四',
    businessUnit: '营销事业部',
    content: {
      '1.1': { 
        status: 'completed', 
        roles: [
          { id: 'r1', role: '架构负责人', name: '张三', remark: '负责整体架构设计与技术选型' },
          { id: 'r2', role: '产品负责人', name: '李四', remark: '负责业务需求定义与产品规划' },
          { id: 'r3', role: '开发负责人', name: '王五', remark: '负责核心代码开发与质量把控' },
          { id: 'r4', role: '业务线', name: '营销部', remark: '业务方需求提供与验收' }
        ],
        hasData: true 
      },
      '1.1-background': { 
        status: 'completed',
        richText: '本项目旨在通过AI算法提升营销活动的转化率，实现精准投放。系统将整合多渠道数据，利用深度学习模型预测用户偏好，并自动触发最优营销策略。',
        hasData: true
      },
      '1.2': { 
        status: 'completed', 
        tableData: [
          { id: 't1', term: 'QPS', definition: '每秒查询率，衡量系统吞吐量', remark: '核心性能指标' },
          { id: 't2', term: 'CTR', definition: '点击通过率，营销效果核心指标', remark: '业务核心指标' },
          { id: 't3', term: 'SLA', definition: '服务等级协议，系统可用性承诺', remark: '运维核心指标' }
        ], 
        hasData: true 
      },
      '1.3': { 
        status: 'completed', 
        tableData: [
          { id: 'm1', name: '日活用户 (DAU)', required: '是', baseline: '50万', target: '100万+' },
          { id: 'm2', name: '营销转化率', required: '是', baseline: '5%', target: '提升至 15%' },
          { id: 'm3', name: '系统可用性', required: '是', baseline: '99.9%', target: '99.99%' }
        ], 
        hasData: true 
      },
      '1.4': { status: 'completed', hasData: true },
      '1.4-systems': { 
        status: 'completed', 
        tableData: [
          { id: 's1', appId: 'CRM-001', name: '客户关系管理系统', desc: '获取用户基础画像数据', owner: '王五' },
          { id: 's2', appId: 'PROD-002', name: '商品中心', desc: '获取推荐商品详情', owner: '赵六' }
        ], 
        hasData: true 
      },
      '1.4-middleware': { 
        status: 'completed', 
        tableData: [
          { id: 'm1', type: 'Redis', deployment: '双侧独立', version: '6.2' }, 
          { id: 'm2', type: 'Kafka', deployment: '单侧', version: '2.8.0' }
        ], 
        hasData: true 
      },
      '1.4-processes': { 
        status: 'completed', 
        dependentProcesses: { isDependent: 'yes', detail: '依赖用户画像同步流程及推荐引擎模型更新流程' }, 
        hasData: true 
      },
      '1.5': { 
        status: 'completed', 
        tableData: [
          { id: 'risk1', risk: '算法模型过拟合', plan: '引入正则化、交叉验证及AB测试', probability: '中', importance: '高' },
          { id: 'risk2', risk: '高并发下的延迟', plan: '多级缓存及异步处理', probability: '低', importance: '高' }
        ], 
        hasData: true 
      },
      '2.1': { status: 'completed', hasData: true },
      '2.1-goals': { 
        status: 'completed',
        goals: [
          { id: 'g1', metric: '吞吐率 (Throughput)', target: '>= 5000 QPS', remark: '核心投放引擎指标' },
          { id: 'g2', metric: '响应时间 (Response Time)', target: '< 100ms', remark: 'P99 延迟要求' }
        ],
        hasData: true
      },
      '2.1-functional': { 
        status: 'completed',
        richText: '系统需支持多维度的用户画像分析、自动化的营销活动编排、实时的投放效果监控以及基于AI的策略优化建议。',
        hasData: true
      },
      '2.1-quality': { 
        status: 'completed',
        requirements: [
          { id: 'q1', dimension: '时间特性 (性能、响应时间等)', description: '核心接口响应时间 P99 < 100ms' },
          { id: 'q2', dimension: '安全性 (数据加密、权限控制等)', description: '所有用户敏感数据需加密存储，接口调用需鉴权' },
          { id: 'q3', dimension: '可扩展性 (系统容量、并发处理等)', description: '支持水平扩展，单节点支持1000并发' },
          { id: 'q4', dimension: '可靠性 (容错、恢复能力等)', description: '核心服务支持多可用区部署，具备自动容灾切换能力' },
          { id: 'q5', dimension: '可用性 (SLA、故障时间等)', description: '系统整体可用性达到 99.99%' },
          { id: 'q6', dimension: '可维护性 (日志、监控、部署等)', description: '提供完整的链路追踪日志，支持自动化CI/CD部署' },
          { id: 'q7', dimension: '易用性 (用户体验、接口友好度等)', description: '提供标准RESTful API，具备完善的接口文档' },
          { id: 'q8', dimension: '可移植性 (跨平台、环境迁移等)', description: '基于Docker容器化部署，不依赖特定云厂商底层服务' }
        ],
        hasData: true
      },
      '2.2': { 
        status: 'completed', 
        richText: '采用云原生微服务架构，基于 Spring Cloud Alibaba 体系，使用 K8s 进行容器化部署。数据层采用读写分离，应用层无状态设计。', 
        hasData: true 
      },
      '2.3': { status: 'completed', hasData: true },
      '2.3-usecase': { 
        status: 'completed', 
        imageUrl: 'https://picsum.photos/seed/usecase/800/600', 
        hasData: true 
      },
      '2.3-usecase-desc': { 
        status: 'completed',
        richText: '展示了营销人员、系统管理员与系统的交互场景。',
        hasData: true
      },
      '2.3-logical': { 
        status: 'completed', 
        imageUrl: 'https://picsum.photos/seed/logical/800/600',
        apps: [
          { id: 'a1', name: 'Marketing-Gateway', description: '统一入口，负责鉴权与路由', owner: '张三' },
          { id: 'a2', name: 'Campaign-Service', description: '营销活动管理核心服务', owner: '李四' }
        ],
        hasData: true 
      },
      '2.3-logical-desc': { 
        status: 'completed',
        richText: '逻辑架构分为接入层、业务层、算法层和数据层。',
        hasData: true
      },
      '2.3-physical': { 
        status: 'completed', 
        imageUrl: 'https://picsum.photos/seed/physical/800/600', 
        hasData: true 
      },
      '2.3-physical-desc': { 
        status: 'completed',
        richText: '物理部署采用双机房高可用方案。',
        hasData: true
      },
      '2.3-sequence': { 
        status: 'completed', 
        imageUrl: 'https://picsum.photos/seed/sequence/800/600', 
        hasData: true 
      },
      '2.3-sequence-desc': { 
        status: 'completed',
        richText: '描述了用户触发营销活动时的完整调用链路。',
        hasData: true
      },
      '2.3-dataflow': { 
        status: 'completed', 
        richText: '展示了从埋点采集到离线计算再到实时反馈的数据流向。', 
        hasData: true 
      },
      '2.4': { status: 'completed', hasData: true },
      '2.4-external': {
        status: 'completed',
        hasData: true,
        interfaces: [
          {
            id: 'ext-1',
            name: '获取推荐活动',
            method: 'GET',
            path: '/api/v1/recommendations',
            description: '根据用户ID获取个性化营销活动列表',
            requestParams: [
              { id: 'p1', name: 'userId', type: 'string', required: true, description: '用户唯一标识' }
            ],
            responseParams: [
              { id: 'p2', name: 'activities', type: 'array', required: true, description: '活动列表' }
            ],
            errorCodes: [
              { id: 'e1', code: '404', message: 'User Not Found', solution: '检查用户ID是否正确' }
            ]
          }
        ]
      },
      '2.4-internal': {
        status: 'completed',
        hasData: true,
        interfaces: [
          {
            id: 'int-1',
            name: '上报用户行为',
            method: 'POST',
            path: '/internal/v1/events',
            description: '内部服务调用，上报用户点击、浏览等行为',
            requestParams: [
              { id: 'p3', name: 'eventId', type: 'string', required: true, description: '事件ID' }
            ],
            responseParams: [],
            errorCodes: []
          }
        ]
      },
      '2.4-compatibility': {
        status: 'completed',
        hasData: true,
        richText: '系统采用标准HTTP状态码进行错误处理。对于业务异常，返回统一的JSON格式：{ "code": "ERROR_CODE", "message": "错误描述" }。支持重试机制，对于5xx错误自动重试3次。'
      },
      '2.5': { status: 'completed', hasData: true },
      '2.5-degradation': { 
        status: 'completed', 
        strategy: {
          isNeeded: true,
          triggerCondition: '核心依赖服务不可用或响应超时',
          strategy: '返回默认推荐列表或静态配置内容',
          recoveryMechanism: '依赖服务恢复正常后自动切回'
        },
        hasData: true 
      },
      '2.5-ratelimit': { 
        status: 'completed', 
        strategy: {
          isNeeded: true,
          triggerCondition: '单机 QPS 超过 2000',
          strategy: '直接拒绝请求并返回 429 状态码',
          recoveryMechanism: '流量回落后自动恢复'
        },
        hasData: true 
      },
      '2.5-circuitbreaker': { 
        status: 'completed', 
        strategy: {
          isNeeded: true,
          triggerCondition: '接口错误率超过 50%',
          strategy: '熔断 30 秒，期间所有请求直接返回错误',
          recoveryMechanism: '半开状态探测成功后恢复'
        },
        hasData: true 
      },
      '3.1': { 
        status: 'completed', 
        dataGrowth: [
          { 
            id: 'dg1',
            metric: '用户画像表', 
            required: '必须', 
            baseline: { avgMin: '100', peakMin: '500', avgDay: '10w', peakDay: '50w' }, 
            forecast: { avgMin: '200', peakMin: '1000', avgDay: '20w', peakDay: '100w' } 
          }
        ], 
        hasData: true 
      },
      '3.2': { 
        status: 'completed', 
        imageUrl: 'https://picsum.photos/seed/er/800/600', 
        hasData: true 
      },
      '3.2-desc': { 
        status: 'completed',
        richText: 'ER图详细描述了用户、标签、活动、触达记录之间的关联关系。',
        hasData: true
      },
      '3.3': { 
        status: 'completed', 
        richText: '使用 MySQL 存储结构化业务数据，Elasticsearch 存储用户标签与日志，Redis 存储热点缓存。', 
        hasData: true 
      },
      '3.4': { 
        status: 'completed', 
        code: 'CREATE TABLE marketing_campaign (\n  id BIGINT PRIMARY KEY AUTO_INCREMENT,\n  name VARCHAR(100) NOT NULL,\n  status TINYINT DEFAULT 0,\n  start_time DATETIME,\n  end_time DATETIME\n);', 
        hasData: true 
      },
      '3.5': { status: 'completed', hasData: true },
      '3.5-scenarios': { 
        status: 'completed', 
        richText: '主要用于缓存用户画像数据、活动规则配置以及热点商品信息，减少数据库访问压力。', 
        hasData: true 
      },
      '3.5-capacity': { 
        status: 'completed', 
        richText: '预计单节点缓存容量需求为 50GB，采用 3 主 3 从的 Redis Cluster 架构，总容量 150GB。', 
        hasData: true 
      },
      '3.5-availability': { 
        status: 'completed', 
        richText: 'Redis Cluster 提供自动故障转移能力。当主节点宕机时，从节点自动升级为主节点，保证缓存服务高可用。', 
        hasData: true 
      },
      '3.5-structure': { 
        status: 'completed', 
        richText: '用户画像：Hash 结构，Key 为 user:profile:{userId}。活动规则：String 结构，Key 为 campaign:rule:{campaignId}。', 
        hasData: true 
      },
      '4.1': { 
        status: 'completed', 
        tasks: [
          { id: 't1', name: '每日报表统计', purpose: '统计前一日营销转化数据', scheduleType: 'cron', scheduleValue: '0 0 * * *', framework: 'XXL Job', logicDesc: '从订单表聚合数据并写入报表表', exceptionHandling: '失败重试3次，告警' }, 
          { id: 't2', name: '过期活动自动下线', purpose: '自动更新活动状态', scheduleType: 'cron', scheduleValue: '*/10 * * * *', framework: 'Spring Task', logicDesc: '扫描过期活动，更新状态为下线', exceptionHandling: '记录错误日志' }
        ], 
        hasData: true 
      },
      '5.1': { 
        status: 'completed', 
        topics: [
          { 
            id: 'top1', 
            name: 'topic_order_created', 
            description: '订单创建消息', 
            format: 'JSON', 
            capacityValue: '1000', 
            capacityUnit: '条/秒', 
            roles: [{ id: 'r1', role: 'producer', systemName: 'Order-Service', remark: '' }],
            faultTolerance: '支持幂等处理'
          }
        ], 
        hasData: true 
      },
      '6.1': { 
        status: 'completed', 
        tableData: [
          { id: 'm1', name: 'CPU使用率', impact: '高负载导致响应变慢', solution: '扩容或优化算法' },
          { id: 'm2', name: '接口错误率', impact: '影响用户体验', solution: '检查下游服务' }
        ], 
        hasData: true 
      },
      '6.2': { 
        status: 'completed', 
        tableData: [
          { id: 'm3', name: '模型预测准确率', logic: 'TP / (TP + FP)', source: '算法中心日志' }
        ], 
        hasData: true 
      },
      '6.3': { 
        status: 'completed', 
        tableData: [
          { id: 'a1', item: '接口错误率 > 1%', level: 'P1', condition: '连续5分钟触发', channels: ['企业微信', '邮件'] }
        ], 
        hasData: true 
      },
      '7.1': { 
        status: 'completed', 
        categories: [
          {
            id: 'network',
            name: '网络安全',
            items: [
              { id: 'n1', checkItem: '系统是否提供对公网访问', result: 'yes', remark: '通过 WAF 接入' },
              { id: 'n2', checkItem: '管理后台需限制仅从内网访问', result: 'yes', remark: 'VPN 接入' },
              { id: 'n3', checkItem: '是否配置了限源访问策略', result: 'yes', remark: '已配置' }
            ]
          },
          {
            id: 'application',
            name: '应用安全',
            items: [
              { id: 'a1', checkItem: '登录防爆破机制（如验证码、锁定策略）', result: 'yes', remark: '已实现' },
              { id: 'a2', checkItem: '密码复杂度要求及加密存储', result: 'yes', remark: 'bcrypt加密' },
              { id: 'a3', checkItem: '所有对外接口是否均有鉴权机制', result: 'yes', remark: 'JWT鉴权' },
              { id: 'a4', checkItem: '权限控制是否遵循最小权限原则', result: 'yes', remark: 'RBAC模型' },
              { id: 'a5', checkItem: '应用进程是否避免以 ROOT 权限运行', result: 'yes', remark: '非root用户运行' }
            ]
          },
          {
            id: 'data',
            name: '数据安全',
            items: [
              { id: 'd1', checkItem: '是否涉及用户个人信息等敏感数据', result: 'yes', remark: '包含手机号等' },
              { id: 'd2', checkItem: '敏感数据是否加密存储', result: 'yes', remark: 'AES加密' },
              { id: 'd3', checkItem: '敏感数据在日志中是否脱敏', result: 'yes', remark: '已脱敏' }
            ]
          },
          {
            id: 'algorithm',
            name: '算法安全',
            items: [
              { id: 'al1', checkItem: '是否直接面向外部用户提供功能服务', result: 'yes', remark: '推荐服务' },
              { id: 'al2', checkItem: '是否使用深度合成/AI/推荐/过滤算法', result: 'yes', remark: '协同过滤推荐' }
            ]
          }
        ], 
        hasData: true 
      },
      '8.1': { 
        status: 'completed', 
        items: [
          { id: 'c1', category: '备案', requirement: 'APP/小程序备案', example: '需在工信部完成APP或小程序备案', result: 'compliant', remediation: '已完成' },
          { id: 'c2', category: '备案', requirement: '公安联网备案', example: '涉及交互式服务需在公安机关备案', result: 'compliant', remediation: '已完成' },
          { id: 'c3', category: '备案', requirement: '算法备案', example: '使用深度合成等算法需进行网信办备案', result: 'na', remediation: '不涉及' },
          { id: 'c4', category: '个人信息保护', requirement: '合法正当必要原则', example: '收集个人信息需有明确目的，不收集与服务无关的信息', result: 'compliant', remediation: '已落实' },
          { id: 'c5', category: '个人信息保护', requirement: '明示同意', example: '收集前需通过弹窗等方式获取用户明示同意', result: 'compliant', remediation: '已落实' },
          { id: 'c6', category: '用户权益响应', requirement: '账号注销功能', example: '需提供便捷的账号注销渠道，且注销后及时删除数据', result: 'compliant', remediation: '已落实' },
          { id: 'c7', category: '用户权益响应', requirement: '撤回同意授权', example: '用户可以撤回对隐私政策或特定权限的授权', result: 'compliant', remediation: '已落实' },
          { id: 'c8', category: '敏感个人信息', requirement: '儿童信息保护 (DCO)', example: '收集不满14周岁未成年人信息需专门的隐私规则和监护人同意', result: 'na', remediation: '不涉及' },
          { id: 'c9', category: '第三方合作', requirement: 'SDK 接入评估', example: '接入第三方 SDK 前需进行安全和隐私合规评估', result: 'compliant', remediation: '已落实' },
          { id: 'c10', category: '协议及规则', requirement: '隐私政策展示', example: '首次启动需弹窗提示隐私政策，且在应用内常驻入口', result: 'compliant', remediation: '已落实' }
        ], 
        hasData: true 
      },
      '9.1': { 
        status: 'completed', 
        hasData: true,
        items: [
          { id: 'ref-1', type: 'wiki', name: '智能营销系统需求文档', address: 'http://wiki.example.com/ai-marketing-req' },
          { id: 'ref-2', type: 'external', name: 'Google AI 营销最佳实践', address: 'https://ai.google/marketing' }
        ]
      }
    }
  },
  '3': {
    name: '高并发秒杀系统架构设计 (High-Concurrency Flash Sale System)',
    content: {
      '1.1': { status: 'completed', richText: '<p>本项目旨在设计一个能够支撑百万级并发的秒杀系统，确保在高负载下的系统稳定性与数据一致性。</p>', hasData: true },
      '1.2': { status: 'completed', tableData: [{ term: 'QPS', definition: 'Queries Per Second' }, { term: 'TPS', definition: 'Transactions Per Second' }, { term: 'Hot Key', definition: '缓存热点Key' }], hasData: true },
      '1.3': { status: 'completed', tableData: [{ metric: '并发支撑', target: '100万 QPS' }, { metric: '响应延迟', target: '< 100ms' }], hasData: true },
      '1.4': { status: 'completed', dependentProcesses: { isDependent: 'yes', detail: '依赖支付网关、库存中心、风控系统' }, hasData: true },
      '1.5': { status: 'completed', tableData: [{ risk: '数据库瞬间过载', strategy: '引入消息队列削峰填谷' }, { risk: '超卖问题', strategy: 'Redis预减库存 + Lua脚本原子操作' }], hasData: true },
      '2.1': { status: 'completed', richText: '<p>系统需具备极高的可用性，支持多机房容灾。</p>', hasData: true },
      '2.2': { status: 'completed', richText: '<p>采用分层架构：接入层（Nginx/LVS）、逻辑层（Golang微服务）、存储层（Redis/MySQL）。</p>', hasData: true },
      '2.3': { status: 'completed', richText: '<p>核心流程：用户请求 -> 验证码校验 -> 预减库存 -> 异步下单 -> 支付回调。</p>', hasData: true },
      '2.4': { status: 'completed', richText: '<p>接口设计：/api/v1/seckill/execute (POST)，返回下单结果。</p>', hasData: true },
      '2.5': { status: 'completed', richText: '<p>Resilience: 采用Sentinel进行流量控制，Hystrix进行服务降级。</p>', hasData: true },
      '3.1': { status: 'completed', dataGrowth: [{ metric: '订单流水表', isRequired: 'yes', baseline: { avgMin: '10', peakMin: '50', avgDay: '1w', peakDay: '5w' }, forecast: { avgMin: '1w', peakMin: '10w', avgDay: '100w', peakDay: '500w' } }], hasData: true },
      '3.2': { status: 'completed', richText: '<p>架构图展示了从CDN分发到后端异步处理的完整链路。</p>', hasData: true },
      '3.3': { status: 'completed', richText: '<p>存储策略：MySQL分库分表，Redis Cluster集群模式。</p>', hasData: true },
      '3.4': { status: 'completed', code: 'CREATE TABLE seckill_orders (order_id BIGINT PRIMARY KEY, user_id BIGINT, product_id BIGINT, status TINYINT);', hasData: true },
      '3.5': { status: 'completed', richText: '<p>缓存设计：多级缓存（本地缓存 + 分布式缓存），防止缓存击穿。</p>', hasData: true },
      '4.1': { status: 'completed', tableData: [{ taskName: '库存回滚脚本', schedule: '每5分钟执行一次' }], hasData: true },
      '5.1': { status: 'completed', tableData: [{ topic: 'seckill_order_topic', consumer: 'order_service' }], hasData: true },
      '6.1': { status: 'completed', richText: '<p>监控：Prometheus + Grafana，实时观测QPS与错误率。</p>', hasData: true },
      '7.1': { status: 'completed', checklist: [{ item: '防刷攻击校验', status: 'checked' }, { item: '接口签名验证', status: 'checked' }], hasData: true },
      '8.1': { status: 'completed', checklist: [{ item: '等保三级认证', status: 'checked' }], hasData: true },
      '9.1': { status: 'completed', tableData: [{ title: '秒杀系统最佳实践', link: 'http://wiki.example.com/seckill' }], hasData: true }
    }
  }
};
