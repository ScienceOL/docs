import { Layout } from '@/components/Layout'
import glob from 'fast-glob'
import path from 'path'

import { type Section } from '@/components/SectionProvider'

import { NavGroup } from '@/@types/navigation'

export const navigation: Array<NavGroup> = [
  {
    title: '概览',
    links: [
      { title: '介绍', href: '/' },
      {
        title: '快速开始',
        href: '/quickstart',
      },
      {
        title: '部署指南',
        href: 'https://scienceol.tech',
      },
      // {
      //   title: '设计理念',
      //   href: '/design',
      // },
      {
        title: '路线图',
        href: '/roadmap',
      },
      // {
      //   title: '常见问题',
      //   href: '/faqs',
      // },
    ],
  },
  {
    title: '实验环境',
    links: [
      { title: '概览', href: '/labs' },
      { title: '3D 模型', href: '/labs/experiment-data' },
      { title: '组态图', href: '/labs/workflow-data' },
      { title: '资源管理', href: '/labs/resources' },
      { title: '注册表', href: '/labs/registry' },
      { title: '动作节点', href: '/labs/action-nodes' },
      { title: '成员管理', href: '/labs/personnel' },
    ],
  },
  {
    title: '计算环境',
    links: [],
  },
  {
    title: '数据模型',
    links: [
      { title: '概览', href: '/data-models' },
      { title: '实验室模型', href: '/data-models/experiment-data' },
      { title: '资源模型', href: '/data-models/workflow-data' },
      { title: '动作节点', href: '/data-models/protium' },
    ],
  },
  {
    title: 'API 接口',
    links: [],
  },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentFilePath = path.basename(
    path.dirname(new URL(import.meta.url).pathname),
  )

  let pages = await glob('**/*.mdx', { cwd: `src/app/(cn)/${currentFilePath}` })

  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
      (await import(`./${filename}`)).sections,
    ]),
  )) as Array<[string, Array<Section>]>

  let allSections = Object.fromEntries(allSectionsEntries)

  return (
    <div className="w-full">
      <Layout navigation={navigation} allSections={allSections}>
        {children}
      </Layout>
    </div>
  )
}