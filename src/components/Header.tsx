/* eslint-disable @next/next/no-img-element */
import { type NavGroup } from '@/@types/navigation'
import { useAuthServiceContext } from '@/auth/AuthContext'
import { Button } from '@/components/Button'
import DropdownMenu from '@/components/DropdownMenu'
import { GridPattern } from '@/components/GridPattern'
import { Logo } from '@/components/Logo'
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { ThemeToggle } from '@/components/ThemeToggle'
import { MEDIA_URL, PrimarySite } from '@/config'
// Import icons
import { Menu } from '@headlessui/react'
import {
  BeakerIcon,
  BookOpenIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketIcon,
  RectangleGroupIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { forwardRef, useEffect, useState } from 'react'
import LangSwitch from './LangSwitch'

const navItems = [
  {
    name: 'Navi',
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
        href: `/uni-lab`,
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

function DropdownPattern({
  mouseX,
  mouseY,
  ...gridProps
}: {
  mouseX: any
  mouseY: any
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x={50}
          y={16}
          squares={[
            [0, 1],
            [1, 3],
          ]}
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-50 to-green-50 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x={50}
          y={16}
          squares={[
            [0, 1],
            [1, 3],
          ]}
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function TopLevelNavItem({ item }: { item: (typeof navItems)[0] }) {
  const [isHovered, setIsHovered] = useState(false)
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

  // Animation variants for dropdown menu
  const dropdownVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,

      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for smoother animation
        staggerChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,

      transition: {
        duration: 0.18,
        ease: 'easeIn',
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  }

  return (
    <li
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex items-center gap-1">
        <Link
          href={item.href}
          className="relative  px-1 py-2 text-xs font-medium leading-5 text-zinc-600
           transition group-hover:text-teal-600 dark:text-zinc-300 dark:group-hover:text-teal-400"
        >
          {item.name}
        </Link>
        {item.sub && (
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-zinc-500 group-hover:text-teal-500 dark:text-zinc-400 dark:group-hover:text-teal-400"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </motion.div>

      <AnimatePresence>
        {isHovered && item.sub && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            onMouseMove={onMouseMove}
            className={clsx(
              'absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2',
              'group rounded-xl bg-white/85 shadow-lg backdrop-blur-xl dark:bg-zinc-800/90',
              'border border-zinc-200/60 dark:border-zinc-700/60',
              'overflow-hidden transition dark:shadow-zinc-900/40',
            )}
          >
            <DropdownPattern
              mouseX={mouseX}
              mouseY={mouseY}
              {...item.pattern}
            />
            <div className="relative z-10 flex min-w-48 flex-col p-1">
              {item.sub?.map((subItem) => (
                <motion.div key={subItem.name} variants={itemVariants}>
                  <Link
                    href={subItem.href}
                    className="group/sub flex w-full cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium
                     text-zinc-700 transition-colors hover:bg-teal-800/5 hover:text-teal-600
                     dark:text-zinc-200 dark:hover:bg-zinc-700/40 dark:hover:text-teal-300"
                  >
                    {subItem.icon && (
                      <subItem.icon className="h-5 w-5 flex-none text-zinc-400 group-hover/sub:text-teal-600 dark:text-zinc-500 dark:group-hover/sub:text-teal-400" />
                    )}
                    {subItem.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export const Header = forwardRef<
  React.ElementRef<'div'>,
  { className?: string; navigation: NavGroup[]; dropdownMenuPosition?: string }
>(function Header({ className, navigation, dropdownMenuPosition }, ref) {
  const { isLogged, userInfo, checkIsLogged } = useAuthServiceContext()

  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  useEffect(() => {
    checkIsLogged()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
          'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]',
      )}
      style={
        {
          '--bg-opacity-light': bgOpacityLight,
          '--bg-opacity-dark': bgOpacityDark,
        } as React.CSSProperties
      }
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      <Search navigation={navigation} />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation navigation={navigation} />
        <Link href={`${PrimarySite}`} target="_blank" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            {navItems.map((item) => (
              <TopLevelNavItem key={item.name} item={item}></TopLevelNavItem>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4">
          <MobileSearch navigation={navigation} />
          <LangSwitch />
          <ThemeToggle />
        </div>
        <div className="hidden min-[416px]:contents">
          {isLogged ? (
            <DropdownMenu itemClassName={dropdownMenuPosition}>
              <Menu.Button
                className="-m-1.5 flex items-center rounded-md p-1 text-white
                 duration-300  ease-in-out hover:bg-zinc-100 
                   dark:text-emerald-400 dark:ring-emerald-400/20    dark:hover:bg-emerald-400/10
                    dark:hover:text-emerald-300"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className=" h-5 w-5 rounded-full"
                  src={`${MEDIA_URL}${userInfo?.avatar}`}
                  alt="avatar"
                />
              </Menu.Button>
            </DropdownMenu>
          ) : (
            <Button href={`${PrimarySite}/login/`} target="_blank">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
})
