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
import Script from 'next/script'

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

  return (
    <SectionProvider sections={allSections[pathname] ?? []}>
      <div className="h-full lg:ml-72 xl:ml-80">
        {/* 侧边栏 + 顶部导航 */}
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
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
