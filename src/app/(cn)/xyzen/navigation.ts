import { NavGroup } from '@/@types/navigation'

const navigation: Array<NavGroup> = [
  {
    title: 'Xyzen 玄藏',
    links: [
      { title: '介绍', href: `/xyzen` },
      { title: '用户指南', href: `/xyzen/guidance` },
      { title: '部署与使用', href: `/xyzen/deploy` },
      { title: '贡献与开发', href: `/xyzen/dev` },
    ],
  },
]

export default navigation
