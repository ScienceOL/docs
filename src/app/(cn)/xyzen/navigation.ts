import { NavGroup } from '@/@types/navigation'

const navigation: Array<NavGroup> = [
  {
    title: 'Xyzen 玄藏',
    links: [
      { title: '介绍', href: `/xyzen` },
      { title: '安装', href: `/xyzen/installation` },
      { title: '快速开始', href: `/xyzen/quickstart` },
    ],
  },
  {
    title: '用户手册',
    links: [
      { title: '用户指南', href: `/xyzen/guidance` },
    ],
  },
  {
    title: 'Self-Host',
    links: [
      { title: '部署与使用', href: `/xyzen/deploy` },
    ],
  },
  {
    title: 'Contribution',
    links: [
      { title: '贡献与开发', href: `/xyzen/dev` },
    ],
  },
]

export default navigation
