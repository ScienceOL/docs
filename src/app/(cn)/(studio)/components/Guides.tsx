import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/lab-setup',
    name: '实验室配置',
    description:
      '了解如何配置和管理您的智能实验室环境，包括硬件集成和系统部署。',
  },
  {
    href: '/compute-environment',
    name: '计算环境配置',
    description: '学习如何设置和优化计算资源，包括容器化部署和资源调度。',
  },
  {
    href: '/data-models',
    name: '数据模型',
    description:
      '深入了解 ScienceOL 的数据模型架构，包括实验数据和工作流数据结构。',
  },
  {
    href: '/api-reference',
    name: 'API 接口',
    description:
      '查看完整的 API 文档，了解如何通过编程方式与 ScienceOL 平台交互。',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
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
                了解更多
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
