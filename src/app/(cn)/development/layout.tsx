import { Layout } from '@/components/Layout'
import glob from 'fast-glob'

import { type Section } from '@/components/SectionProvider'
import { type Metadata } from 'next'
import path from 'path'

import { NavGroup } from '@/@types/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s - dev',
    default: 'Dev Docs',
  },
}

export const navigation: Array<NavGroup> = [
  {
    title: '开发者手册',
    links: [{ title: '你好，开发者 👋', href: `/development` }],
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
    links: [
      { title: "目录结构", href: `/development/web/fileStruc` },
    ],
  },
  {
    title: '后端技术文档',
    links: [
      { title: '目录结构', href: `/development/service/fileStruc` },
    ],
  },
  {
    title: '撰写开发文档',
    links: [{ title: '如何撰写开发文档', href: `/development/dev-docs` }],
  },
]

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 获取父文件夹名称
  const currentFilePath = path.basename(
    path.dirname(new URL(import.meta.url).pathname),
  )

  let pages = await glob('**/*.mdx', { cwd: `src/app/(cn)/${currentFilePath}` })

  let allSectionsEntries = (await Promise.all(
    pages.map(async (filename) => [
      '/' + currentFilePath + '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
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
