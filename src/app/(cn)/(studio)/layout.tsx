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

/**
 * 正则表达式解释：
 *
 * - `(` 和 `)`：这是一个捕获组的开始和结束。捕获组是一种用于将正则表达式的一部分括起来，以便对该部分进行操作（例如，使用 `|` 操作符实现“或”逻辑）的方式。在这个例子中，捕获组包含了两种可能的匹配：字符串开头 `^` 或 `/` 字符。
 * - `^`：这个符号表示字符串的开头。当它出现在正则表达式的开始位置时，它要求匹配只能发生在字符串的开头。在这个例子中，它表示我们希望在字符串开头处找到 `page.mdx`。
 * - `|`：这个符号表示“或”操作，在正则表达式中，它表示我们希望匹配两个或多个可能的选项中的任意一个。在这个例子中，我们希望匹配字符串开头 `^` 或 `/` 字符。
 * - `\/`：这里的 `/` 字符表示字面上的斜线字符。由于斜线 `/` 通常用于表示正则表达式的边界，因此在这里需要使用反斜线 `\` 对其进行转义，以表示我们实际上想要匹配的是斜线字符本身。
 *
 * 总结一下，`(^|\/)` 这个捕获组的意义是：我们希望建立一个捕获组，以便在字符串开头或斜线字符之后找到 `page.mdx`。这样，当我们使用 `replace` 函数时，我们可以删除匹配到的部分（即 `page.mdx` 以及可能存在的前导斜线），从而将文件名转换为对应的路由路径。
 */
