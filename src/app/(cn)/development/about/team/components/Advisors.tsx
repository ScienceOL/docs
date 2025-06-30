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

interface Advisor {
  name: string
  title: string
  institution: string
  department: string
  specialization: string
  achievements: string[]
  description: string
  avatar: string
  pattern: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  >
}

const advisors: Array<Advisor> = [
  {
    name: '谢源',
    title: '教授',
    institution: '华东师范大学 & 上海创智学院',
    department: '计算机科学与技术学院',
    specialization: '计算机视觉 | 机器学习 | 低层视觉 | 跨模态学习',
    achievements: [
      '国家优秀青年基金获得者',
      'IEEE TIP期刊编委',
      'CVPR2020挑战赛双料冠军',
      '吴文俊人工智能科学技术奖获得者',
    ],
    description:
      '国家优青，闽江学者讲座教授，香江学者。国家优秀青年基金获得者，IEEE TIP期刊编委，CVPR2020挑战赛双料冠军，吴文俊人工智能科学技术奖获得者。专注计算机视觉和机器学习研究，发表CCF A类论文80余篇，Google引用近万次。提出的从向量到张量的正则化理论获得国际广泛认可。',
    avatar: '/advisors/xieyuan.jpg',
    pattern: {
      y: 6,
      squares: [
        [0, 2],
        [1, 1],
        [2, 3],
      ],
    },
  },
  {
    name: '严骏驰',
    title: '教授',
    institution: '上海交通大学 & 上海创智学院',
    department: '人工智能学院',
    specialization: '机器学习 | 深度学习 | 人工智能交叉应用',
    achievements: [
      '国际科学智能联盟副秘书长',
      'ICML/NeurIPS/ICLR领域主席',
      'TPAMI、PRJ编委',
      'IEEE-CS AI2Watch新星奖获得者',
    ],
    description:
      '国家级青年人才，前IBM研究院首席研究员。国际科学智能联盟副秘书长，ICML/NeurIPS/ICLR领域主席，TPAMI、PRJ编委，IEEE-CS AI2Watch新星奖获得者。长期从事机器学习及交叉应用研究，学术引用近三万次。获最具影响力顶会论文两次、CVPR24最佳论文候选。指导的5名博士毕业生任交大、复旦长聘轨教职。',
    avatar: '/advisors/yanjunchi.jpg',
    pattern: {
      y: 8,
      squares: [
        [0, 1],
        [1, 2],
        [2, 4],
      ],
    },
  },
  {
    name: '张林峰',
    title: '深势科技首席科学家、AISI 院长',
    institution: '深势科技 & 北京科学智能研究院',
    department: '---',
    specialization: '机器学习物理模型 | 分子动力学 | 高性能计算',
    achievements: [
      'ACM戈登贝尔奖获得者',
      'DeePMD-kit主要开发者',
      'DeepModeling开源社区推动者',
      '普林斯顿大学博士',
    ],
    description:
      'ACM戈登贝尔奖获得者，DeePMD-kit主要开发者，DeepModeling开源社区推动者，普林斯顿大学博士。专注于机器学习驱动的分子模拟技术，通过深度学习将分子动力学模拟极限提高到1亿原子规模，在保持从头算精度的前提下大幅提升计算效率。极大推动 AI4S 开源社区的发展，助力科学智能的普及和应用。',
    avatar: '/advisors/zhanglinf.jpg',
    pattern: {
      y: 12,
      squares: [
        [0, 2],
        [1, 3],
        [2, 1],
      ],
    },
  },
  {
    name: '朱通',
    title: '教授',
    institution: '华东师范大学 & 上海创智学院',
    department: '化学与分子工程学院',
    specialization: '分子反应动力学 | 量子化学计算 | 生物分子模拟',
    achievements: [
      'ACM戈登贝尔奖获得者',
      '神经网络力场方法(NN/MM-RESP)发明者',
      'Metal-MFCC方法开发者',
      'ReacNetGenerator软件开发者',
    ],
    description:
      '神经网络力场方法(NN/MM-RESP)发明者，Metal-MFCC方法开发者，ReacNetGenerator软件开发者。十余年专注分子反应动力学研究，发展了神经网络力场方法实现精确分子模拟，在量子化学计算和生物分子模拟领域取得重要突破，截至目前已发表SCI论文78篇。',
    avatar: '/advisors/zhutong.jpg',
    pattern: {
      y: 20,
      squares: [
        [0, 1],
        [1, 2],
        [2, 3],
      ],
    },
  },
]

function AdvisorAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-20 w-20 overflow-hidden rounded-full bg-zinc-100 shadow-xl ring-4 ring-white/90 dark:bg-zinc-800 dark:ring-zinc-700/90">
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function AdvisorPattern({
  mouseX,
  mouseY,
  ...gridProps
}: Advisor['pattern'] & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-3xl transition-opacity duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-40">
        <GridPattern
          width={80}
          height={64}
          x="50%"
          className="stroke-black/3 dark:fill-white/0.5 dark:stroke-white/1.5 absolute inset-x-0 inset-y-[-35%] h-[170%] w-full skew-y-[-12deg] fill-black/[0.015]"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#334155]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={80}
          height={64}
          x="50%"
          className="dark:fill-white/2 dark:stroke-white/8 absolute inset-x-0 inset-y-[-35%] h-[170%] w-full skew-y-[-12deg] fill-black/40 stroke-black/60"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function Advisor({ advisor }: { advisor: Advisor }) {
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
      key={advisor.name}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-3xl bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/10 dark:bg-zinc-900/50 dark:hover:shadow-black/20"
    >
      <AdvisorPattern {...advisor.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-zinc-900/5 transition-all duration-300 group-hover:ring-zinc-900/15 dark:ring-white/5 dark:group-hover:ring-white/15" />
      <div className="relative rounded-3xl px-8 pb-8 pt-10">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center space-x-4">
            <AdvisorAvatar src={advisor.avatar} alt={advisor.name} />
            <div>
              <h3 className="text-xl font-bold leading-8 text-zinc-900 dark:text-white">
                {advisor.name}
              </h3>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {advisor.title}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                {advisor.institution}
              </p>
            </div>
            <p className="ml-3.5 text-sm text-zinc-600 dark:text-zinc-400">
              {advisor.department}
            </p>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              研究领域
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {advisor.specialization}
            </p>
          </div>

          <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-700">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {advisor.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Advisors() {
  return (
    <div className="my-20 xl:max-w-none">
      <Heading level={2} id="advisors" anchor>
        专家顾问
      </Heading>

      <div className="not-prose mt-6 grid grid-cols-1 gap-10 border-t border-zinc-900/5 pt-12 dark:border-white/5 lg:grid-cols-2">
        {advisors.map((advisor) => (
          <Advisor key={advisor.name} advisor={advisor} />
        ))}
      </div>
      <p className="text-right text-sm text-zinc-400 dark:text-zinc-400">
        按姓氏首字母排序
      </p>
    </div>
  )
}
