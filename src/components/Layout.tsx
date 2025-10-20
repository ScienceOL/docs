'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type NavGroup } from '@/@types/navigation'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { type Section, SectionProvider } from '@/components/SectionProvider'
import { PrimarySite } from '@/config'

export function Layout({
  children,
  allSections,
  navigation,
}: {
  children: React.ReactNode
  allSections: Record<string, Array<Section>>
  navigation: Array<NavGroup>
}) {
  let pathname = usePathname()
  
  // 添加调试日志（同时支持开发和生产环境）
  if (typeof window !== 'undefined') {
    console.log('[Layout Debug]', {
      pathname,
      allSectionsKeys: Object.keys(allSections),
      currentPageSections: allSections[pathname],
    })
  }

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        {/* 侧边栏 + 顶部导航 */}
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400/60 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500/60 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-0.5">
            <div className="hidden lg:flex">
              <Link href={`${PrimarySite}`} aria-label="Home">
                <Logo className="h-6" />
              </Link>
            </div>
            <Header navigation={navigation} />
            <Navigation
              navigation={navigation}
              className="hidden lg:mt-10 lg:block"
            />
          </div>
        </motion.header>

        {/* 主体 */}
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer navigation={navigation} />
        </div>
      </div>
    </SectionProvider>
  )
}
