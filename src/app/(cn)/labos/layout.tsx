import { Layout } from '@/components/Layout'
import glob from 'fast-glob'

import { type Section } from '@/components/SectionProvider'
import { type Metadata } from 'next'
import path from 'path'

import { NavGroup } from '@/@types/navigation'

export const metadata: Metadata = {
  title: {
    template: '%s - Docs',
    default: 'LabOS',
  },
}

export const navigation: Array<NavGroup> = [
  {
    title: 'LabOS',
    links: [{ title: 'Uni-Lab-OS', href: `/labos` }],
  }
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
