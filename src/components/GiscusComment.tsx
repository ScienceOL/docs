'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { useTheme } from 'next-themes'
import Script from 'next/script'

export default function GiscusComment() {
  const { theme, resolvedTheme } = useTheme()
  const pathname = usePathname()

  // 动态更新 Giscus 主题和路径
  useEffect(() => {
    const updateGiscusConfig = (config: any) => {
      const iframe = document.querySelector(
        'iframe.giscus-frame',
      ) as HTMLIFrameElement
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: config } },
          'https://giscus.app',
        )
        return true
      }
      return false
    }

    const updateGiscusTheme = () => {
      const giscusTheme = resolvedTheme
        ? resolvedTheme === 'dark'
          ? 'transparent_dark'
          : 'light'
        : 'preferred_color_scheme'

      return updateGiscusConfig({ theme: giscusTheme })
    }

    // 等待 Giscus 加载完成后更新主题
    const waitForGiscus = () => {
      let attempts = 0
      const maxAttempts = 50 // 最多等待 5 秒

      const checkInterval = setInterval(() => {
        attempts++
        if (updateGiscusTheme() || attempts >= maxAttempts) {
          clearInterval(checkInterval)
        }
      }, 100)
    }

    // 监听 Giscus 消息，确保加载完成后更新主题
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://giscus.app') {
        // Giscus 发送消息表示已加载，更新主题
        setTimeout(updateGiscusTheme, 100)
      }
    }

    window.addEventListener('message', handleMessage)

    // // 延迟执行，确保 DOM 已更新
    // setTimeout(waitForGiscus, 100)
    updateGiscusTheme()

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [resolvedTheme])

  // 监听路径变化，更新 Giscus 评论
  useEffect(() => {
    const updateGiscusPath = () => {
      const iframe = document.querySelector(
        'iframe.giscus-frame',
      ) as HTMLIFrameElement
      if (iframe) {
        // 重新配置 Giscus 以使用新的路径
        iframe.contentWindow?.postMessage(
          {
            giscus: {
              setConfig: {
                term: pathname,
                // 使用完整的配置重新初始化
                repo: 'ScienceOL/docs',
                repoId: 'R_kgDOOI9EFg',
                category: 'Announcements',
                categoryId: 'DIC_kwDOOI9EFs4Cr9K0',
                mapping: 'pathname',
                reactionsEnabled: '1',
                emitMetadata: '0',
                inputPosition: 'top',
                dataLang: 'zh-CN',
              },
            },
          },
          'https://giscus.app',
        )
      }
    }
    updateGiscusPath()
    // // 延迟执行，确保页面已完全切换
    // const timer = setTimeout(updateGiscusPath, 200)

    // return () => clearTimeout(timer)
  }, [pathname])

  const giscusTheme = resolvedTheme
    ? resolvedTheme === 'dark'
      ? 'dark'
      : 'light'
    : 'preferred_color_scheme'

  return (
    <>
      {/* Giscus 评论区 */}
      <div className="giscus mt-8"></div>
      <Script
        src="https://giscus.app/client.js"
        data-repo="ScienceOL/docs"
        data-repo-id="R_kgDOOI9EFg"
        data-category="Announcements"
        data-category-id="DIC_kwDOOI9EFs4Cr9K0"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme={giscusTheme}
        data-loading="lazy"
        data-lang="zh-CN"
        crossOrigin="anonymous"
        async
      />
    </>
  )
}
