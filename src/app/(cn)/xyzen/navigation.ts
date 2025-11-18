import { NavGroup } from '@/@types/navigation'

const navigation: Array<NavGroup> = [
  {
    title: 'Xyzen 玄藏',
    links: [
      { title: '总览', href: `/xyzen` },
      { title: '快速开始', href: `/xyzen/quickstart` },
      { title: '示例演示', href: `/xyzen/demo` },
      {title:'路线图', href:`/xyzen/roadmap`},
      {title:'Xyzen 架构', href:`/xyzen/architecture`},
    ],
  },
  {
    title: '用户指南',
    links: [
      { title: '功能特性', href: `/xyzen/user_guide` },
      {title:'自定义 MCP 服务', href:`/xyzen/mcp`},
      {title:'常见问题', href:`/xyzen/faq`},
      {title:'高级功能', href:`/xyzen/advanced`},
    ],
  },
  {
    title: '私有化部署',
    links: [
      { title: '部署使用', href: `/xyzen/deploy/primary_deploy` },
      {title:'与前端项目集成', href:`/xyzen/deploy/frontend_integration`},
      {title:'创建图 Agent', href:`/xyzen/deploy/graph_agent`},
    ],
  },
  {
    title: 'Contribution',
    links: [
      { title: '贡献与开发', href: `/xyzen/dev` },
      {title:'API 参考', href:`/xyzen/api`},
      {title:'UI 设计规范',href:`/xyzen/design`},
    ],
  },
]

export default navigation
