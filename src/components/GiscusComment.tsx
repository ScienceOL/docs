'use client'

import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function GiscusComment() {
  const { resolvedTheme } = useTheme()
  const pathname = usePathname()
  const [isGiscusLoaded, setIsGiscusLoaded] = useState(false)

  // 每当路径变化时，完全重载Giscus
  useEffect(() => {
    // 如果已加载，则先移除现有的Giscus元素
    if (isGiscusLoaded) {
      const giscusContainer = document.querySelector('.giscus')
      if (giscusContainer) {
        // 清空容器内容
        giscusContainer.innerHTML = ''
        // 重新设置标志位
        setIsGiscusLoaded(false)

        // 延迟重新加载Giscus脚本
        setTimeout(() => {
          loadGiscus()
        }, 300)
      }
    } else if (document.readyState === 'complete') {
      // 首次加载
      loadGiscus()
    }

    // 加载Giscus脚本的函数
    function loadGiscus() {
      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.setAttribute('data-repo', 'ScienceOL/docs')
      script.setAttribute('data-repo-id', 'R_kgDOOI9EFg')
      script.setAttribute('data-category', 'Announcements')
      script.setAttribute('data-category-id', 'DIC_kwDOOI9EFs4Cr9K0')
      script.setAttribute('data-mapping', 'pathname')
      script.setAttribute('data-strict', '0')
      script.setAttribute('data-reactions-enabled', '1')
      script.setAttribute('data-emit-metadata', '0')
      script.setAttribute('data-input-position', 'top')
      script.setAttribute('data-theme', 'preferred_color_scheme')
      script.setAttribute('data-loading', 'lazy')
      script.setAttribute('data-lang', 'en')
      script.crossOrigin = 'anonymous'
      script.async = true

      // 错误处理
      script.onerror = () => {
        console.error('Failed to load Giscus script')
      }

      // 找到Giscus容器并添加脚本
      const giscusContainer = document.querySelector('.giscus')
      if (giscusContainer) {
        giscusContainer.appendChild(script)
        setIsGiscusLoaded(true)
      }
    }

    // 监听DOM加载完成事件
    const handleDOMContentLoaded = () => {
      loadGiscus()
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded)
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded)
    } // 依赖 resolvedTheme 是正确的
  }, [pathname, resolvedTheme]) // eslint-disable-line react-hooks/exhaustive-deps

  // 使用 preferred_color_scheme 后，Giscus 会自动根据系统主题切换
  // 如果需要手动同步主题，可以保留以下代码
  useEffect(() => {
    if (!isGiscusLoaded) return

    const updateGiscusTheme = () => {
      const iframe = document.querySelector(
        'iframe.giscus-frame',
      ) as HTMLIFrameElement
      if (iframe && iframe.contentWindow) {
        // 使用 preferred_color_scheme 让 giscus 自动跟随系统主题
        iframe.contentWindow.postMessage(
          { giscus: { setConfig: { theme: 'preferred_color_scheme' } } },
          'https://giscus.app',
        )
      }
    }

    // 给 iframe 一些时间加载
    const timer = setTimeout(updateGiscusTheme, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [resolvedTheme, isGiscusLoaded])

  return <div className="giscus mt-8">{/* Giscus将在这里动态加载 */}</div>
}
