import { Layout } from '@/components/Layout'
import glob from 'fast-glob'
import path from 'path'

import { type Section } from '@/components/SectionProvider'
import { type Metadata } from 'next'
import { navigation } from './Navi'

export const metadata: Metadata = {
  title: {
    template: '%s - Protium Reference',
    default: 'Protium Reference',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentFilePath = path.basename(
    path.dirname(new URL(import.meta.url).pathname),
  )

  // glob 函数是一个异步函数，它接受一个 glob 模式和一个选项对象，返回一个 Promise，
  // 这个 Promise 在解析完所有匹配的文件后会被 resolve 为一个字符串数组。
  let pages = await glob('**/*.mdx', { cwd: `src/app/${currentFilePath}` })

  let allSectionsEntries = (await Promise.all(
    // allSectionsEntries 是一个数组，其中的每个元素都是一个包含两个元素的数组：
    // 1. 一个字符串，表示路由路径。
    // 2. 一个数组，表示页面的所有 sections。

    pages.map(async (filename) => [
      // 使用 `pages.map()` 方法遍历 `pages`，并对每个文件名执行以下操作：
      // a. 将文件名转换为相应的路由路径（例如，将 `page.mdx` 转换为 `/`）。
      // b. 使用动态 `import()` 语句导入文件并获取其导出的 `sections` 数据。
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
