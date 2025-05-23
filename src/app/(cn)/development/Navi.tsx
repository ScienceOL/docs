import { NavGroup } from '@/@types/navigation'

export const navigation: Array<NavGroup> = [
  {
    title: '开发者手册',
    links: [{ title: '你好，开发者 👋', href: `/development` }],
  },
  {
    title: '版本部署',
    links: [
      { title: '开发版本部署', href: `/development/deploy-dev` },
      { title: '试用版本部署', href: `/development/deploy-local` },
    ],
  },
  {
    title: '撰写开发文档',
    links: [{ title: '如何撰写开发文档', href: `/development/dev-docs` }],
  },
]
