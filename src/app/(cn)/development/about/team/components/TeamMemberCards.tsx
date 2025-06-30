'use client'

import { Heading } from '@/components/Heading'
import MemberCard from '@/components/feature/MemberCard'
import { teamMembers } from './teamMembers'

export default function TeamMemberCards() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="team-members" anchor>
        核心成员
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  )
}
