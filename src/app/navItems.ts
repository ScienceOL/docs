// Import icons
import {
  BeakerIcon,
  BookOpenIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketIcon,
  RectangleGroupIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  {
    name: '导航',
    href: `/`,
    icon: BookOpenIcon,
    sub: [
      {
        name: '工作室 Studio',
        href: `/`,
        icon: Square3Stack3DIcon,
      },
      {
        name: '工作流 Protium',
        href: `/protium`,
        icon: RectangleGroupIcon,
      },
      {
        name: '智能体 Xyzen',
        href: `/xyzen`,
        icon: ChatBubbleOvalLeftEllipsisIcon,
      },
      {
        name: '实验室 LabOS',
        href: `/labos`,
        icon: BeakerIcon,
      },
      {
        name: '工具集 SDK',
        href: `/sdk`,
        icon: CodeBracketIcon,
      },
      {
        name: '开发 Development',
        href: `/development`,
        icon: RocketLaunchIcon,
      },
    ],
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
]

export default navItems
