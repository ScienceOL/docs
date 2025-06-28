/* eslint-disable @next/next/no-img-element */
import navItems from '@/app/navItems'
import { GridPattern } from '@/components/GridPattern'

import clsx from 'clsx'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

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

export default function Navbar() {
  return (
    <nav className="hidden md:block">
      <ul role="list" className="flex items-center gap-8">
        {navItems.map((item) => (
          <TopLevelNavItem key={item.name} item={item}></TopLevelNavItem>
        ))}
      </ul>
    </nav>
  )
}
