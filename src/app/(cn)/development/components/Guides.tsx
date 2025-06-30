import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/development/deploy-dev',
    name: '开发版本部署',
    description:
      '本地部署 ScienceOL Studio 开发版本，支持代码热更新。适合开发者进行功能开发、调试和测试，提供完整的开发环境配置指南。',
  },
  {
    href: '/development/deploy-local',
    name: '试用版本部署',
    description:
      '快速部署 ScienceOL 试用版本，面向有本地试用需求的非开发人员。提供简单易懂的部署步骤，快速体验 SciOL 的功能。',
  },
  {
    href: '/development/deploy-edge',
    name: '实验室端侧部署',
    description:
      '部署 LabOS 开发环境，支持实验室端侧的本地部署。适合需要创建实验室环境的用户，提供详细的配置和使用指南。',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides" anchor>
        指南
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
