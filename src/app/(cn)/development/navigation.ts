import { NavGroup } from '@/@types/navigation'

const navigation: Array<NavGroup> = [
  {
    title: '开发者手册',
    links: [
      { title: '你好，开发者 👋', href: `/development` },
      { title: '产品架构图', href: `/development/product-architecture` },
      { title: '技术架构图', href: `/development/architecture` },
    ],
  },
  {
    title: '版本部署',
    links: [
      { title: '开发版本部署', href: `/development/deploys/deploy-dev` },
      { title: '试用版本部署', href: `/development/deploys/deploy-local` },
      { title: '实验室端侧部署', href: `/development/deploys/deploy-edge` },
      // {
      //   title: '标签自动上线流程',
      //   href: `/development/tag-deploy`,
      // },
    ],
  },
  {
    title: '前端技术文档',
    links: [{ title: '目录结构', href: `/development/web/fileStruc` }],
  },
  {
    title: '后端技术文档',
    links: [{ title: '目录结构', href: `/development/service/fileStruc` }],
  },
  {
    title: '撰写开发文档',
    links: [{ title: '如何撰写开发文档', href: `/development/dev-docs` }],
  },
  {
    title: '关于我们',
    links: [
      { title: '团队成员', href: `/development/about/team` },
      {
        title: '案例经历',
        href: `/development/about/cases`,
      },
      {
        title: '相关论文',
        href: `/development/about/papers`,
      },
    ],
  },
]

export default navigation