import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/quickstart',
    name: 'Quickstart',
    description:
      '快速开始熟悉 PROTIUM 的一切。通过简单的步骤轻松上手我们的平台功能。无需复杂配置，几分钟内即可开始您的第一个项目。',
  },
  {
    href: '/sdk',
    name: 'Use SDK',
    description:
      '使用 SDK 来自动化你的工作流管理。强大的API接口让您能够无缝集成现有系统。通过可定制的组件快速构建满足特定需求的解决方案。',
  },
  {
    href: '/mcps',
    name: 'MCPs',
    description:
      '发现使用 AI Agent 与 PROTIUM 集成的方法。了解如何利用 MCP(Model Context Protocol) 增强您的智能应用，打造更智能的交互体验。',
  },
  {
    href: '/development',
    name: 'Hi, Developer',
    description:
      '加入我们的开源项目，贡献你的想法和代码。参与活跃的开发者社区，共同塑造未来的功能和方向。通过Pull Request提交改进，让产品变得更好。',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides" anchor>
        Guides
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
