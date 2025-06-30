'use client'

import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'
import Image from 'next/image'

import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'

interface TeamMember {
  name: string
  realName: string
  age: number
  education: string
  university: string
  specialty: string
  role: string
  description: string
  avatar: string
  pattern: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  >
}

const teamMembers: Array<TeamMember> = [
  {
    name: 'TablewareBox',
    realName: 'Chang J.',
    age: 27,
    education: '本博',
    university: '北京大学',
    specialty: '理论化学',
    role: '智能实验室全域深度开发',
    description:
      'Uni-Lab 智能实验室创始人，理论化学专业背景，在有机实验、自动化硬件和软件工程领域拥有丰富的实践经验，致力于推动智能实验室技术的发展。',
    avatar: '/team/Changjh.jpg',
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    name: 'Harvey',
    realName: 'Que H.',
    age: 27,
    education: '博士',
    university: '华东师范大学 & 上海创智学院',
    specialty: '材料学 → 计算机科学',
    role: 'AI for Science 与全栈开发',
    description:
      'Uni-Lab 智能实验室创始成员，材料学本硕背景，计算机应用技术博士在读，师从谢源、朱通导师。在AI4S（AI for Science）及全栈开发领域积累了丰富经验。',
    avatar: '/team/Quehh.jpg',
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
  {
    name: 'Chris',
    realName: 'Gao J.',
    age: 25,
    education: '博士',
    university: '上海交通大学 & 中关村学院',
    specialty: '应用化学 → 计算机科学',
    role: '大模型与具身智能',
    description:
      'Uni-Lab 智能实验室创始成员，应用化学本科、CS博士在读，师从严驰骏导师。专注于具身智能及软硬件协同技术，拥有丰富的跨学科研究经验。',
    avatar: '/team/Gaoj.jpg',
    pattern: {
      y: 24,
      squares: [
        [0, 1],
        [1, 2],
        [2, 3],
      ],
    },
  },
  {
    name: 'SJRnhqh',
    realName: 'Shen J.',
    age: 24,
    education: '博士',
    university: '复旦大学 & 上海创智学院',
    specialty: '有机化学',
    role: '有机与药物实验丰富实践',
    description:
      '复旦大学本科，上海创智学院联合培养博士，专注于理论化学与人工智能交叉领域，师从张俊良导师。',
    avatar: '/team/Shenjr.jpg',
    pattern: {
      y: 40,
      squares: [
        [1, 2],
        [2, 4],
      ],
    },
  },
  {
    name: 'Panzw',
    realName: 'Pan Z.',
    age: 26,
    education: '硕士',
    university: '中国科学院大学上海天文台',
    specialty: '电子信息',
    role: '硬件工程师',
    description:
      '中科院上海天文台电子信息硕士，北京大学极客实验室硬件讲师，国家级奖学金，在硬件设计与开发领域具备专业的技术能力。',
    avatar: '/team/Panzw.jpg',
    pattern: {
      y: 8,
      squares: [
        [0, 3],
        [1, 1],
        [2, 2],
      ],
    },
  },
]

function MemberAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full bg-zinc-100 shadow-lg ring-2 ring-white dark:bg-zinc-800 dark:ring-zinc-700">
      <Image
        src={src}
        alt={alt}
        width={64}
        height={64}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function MemberPattern({
  mouseX,
  mouseY,
  ...gridProps
}: TeamMember['pattern'] & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(200px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#EDF4FF] to-[#E8F5E8] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#1E2A3A] dark:to-[#1A2E1A]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function Member({ member }: { member: TeamMember }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={member.name}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <MemberPattern {...member.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-6 pb-6 pt-8">
        <div className="flex flex-col items-center text-center">
          <MemberAvatar src={member.avatar} alt={member.name} />

          <div className="mt-4">
            <h3 className="text-lg font-semibold leading-7 text-zinc-900 dark:text-white">
              {member.name}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {member.realName} · {member.age}岁
            </p>
          </div>

          <div className="mt-3 space-y-1 text-center">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {member.role}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {member.university}
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {member.education} · {member.specialty}
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function TeamMembers() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="team-members" anchor>
        核心成员
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Member key={member.name} member={member} />
        ))}
      </div>
    </div>
  )
}
