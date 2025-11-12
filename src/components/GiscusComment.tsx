'use client'

import { useEffect, useRef } from 'react'

export default function GiscusComment() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    // 获取当前完整路径（包括语言前缀等）
    const pathname = window.location.pathname
    console.log('[Giscus] Loading with pathname:', pathname)

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'ScienceOL/docs')
    script.setAttribute('data-repo-id', 'R_kgDOOI9EFg')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOOI9EFs4Cr9K0')
    script.setAttribute('data-mapping', 'url')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'preferred_color_scheme')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    script.onerror = (error) => {
      console.error('[Giscus] Failed to load script:', error)
    }

    script.onload = () => {
      console.log('[Giscus] Script loaded successfully')
    }

    ref.current.appendChild(script)
  }, [])

  return <div ref={ref} className="giscus mt-8" />
}
