'use client'

import AdvisorCard from '@/components/feature/AdvisorCard'
import { Heading } from '@/components/Heading'
import { advisors } from './advisors'

export default function AdvisorCards() {
  return (
    <div className="my-20 xl:max-w-none">
      <Heading level={2} id="advisors" anchor>
        专家顾问
      </Heading>

      <div className="not-prose mt-6 grid grid-cols-1 gap-10 border-t border-zinc-900/5 pt-12 dark:border-white/5 lg:grid-cols-2">
        {advisors.map((advisor) => (
          <AdvisorCard key={advisor.name} advisor={advisor} />
        ))}
      </div>
      <p className="text-right text-sm text-zinc-400 dark:text-zinc-400">
        按姓氏首字母排序
      </p>
    </div>
  )
}
