"use client";
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'

import { Feedback } from '@/components/Feedback'
import { Heading } from '@/components/Heading'
import { Mermaid } from '@/components/Mermaid'
import { Prose } from '@/components/Prose'
import { StackedVideosLayout } from '@/components/StackedVideosLayout'
import { Video } from '@/components/Video'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useState, useRef, useEffect } from 'react'

export const a = Link
export { Button } from '@/components/Button'
export { Code as code, CodeGroup, Pre as pre } from '@/components/Code'
export { Mermaid, StackedVideosLayout, Video }

// 覆盖 Markdown 图片语法，使其使用 Img 组件样式
export function img({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null
  return <Img src={src} alt={alt || ''} />
}

export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-full flex-col pb-10 pt-16">
      <Prose className="flex-auto">{children}</Prose>
      <footer className="mx-auto mt-16 w-full max-w-2xl lg:max-w-5xl">
        <Feedback />
      </footer>
    </article>
  )
}

export const h2 = function H2(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={2} {...props} />
}

export const h3 = function H3(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={3} {...props} />
}

export const h4 = function H4(
  props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>,
) {
  return <Heading level={4} {...props} />
}

function InfoIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Img({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      <Image
        src={src}
        alt={alt || ''}
        className="my-4 h-auto w-full max-w-3xl rounded-lg border border-gray-200/60 shadow-md 
                   transition-all duration-200 
                   hover:border-gray-300/80 hover:shadow-lg
                   dark:border-gray-700/80 dark:shadow-gray-900/30
                   dark:hover:border-gray-600"
        loading="lazy"
        decoding="async"
      />
      {alt && (
        <span className="block text-center text-sm font-light italic text-gray-500 dark:text-gray-400">
          {alt}
        </span>
      )}
    </>
  )
}

export function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-yellow-500/20 bg-yellow-50/50 p-4 leading-6 text-yellow-900 dark:border-yellow-500/30 dark:bg-yellow-500/5 dark:text-yellow-200 dark:[--tw-prose-links-hover:theme(colors.yellow.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <ExclamationTriangleIcon className="mt-1 h-4 w-4 flex-none fill-yellow-500 stroke-white dark:fill-yellow-200/20 dark:stroke-yellow-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  )
}

export function Col({
  children,
  sticky = false,
}: {
  children: React.ReactNode
  sticky?: boolean
}) {
  return (
    <div
      className={clsx(
        '[&>:first-child]:mt-0 [&>:last-child]:mb-0',
        sticky && 'xl:sticky xl:top-24',
      )}
    >
      {children}
    </div>
  )
}

export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

export function Property({
  name,
  children,
  type,
}: {
  name: string
  children: React.ReactNode
  type?: string
}) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {type}
            </dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}

export function ImageGallery({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [minHeight, setMinHeight] = useState<number | null>(null)
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])
  
  // 提取所有 img 元素并添加样式
  const images = React.Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === 'img'
  )
  
  const imageCount = images.length
  
  // 计算多张图片的最小高度
  useEffect(() => {
    if (imageCount < 2 || imageCount > 3) return
    
    const updateMinHeight = () => {
      const validRefs = imageRefs.current.filter((ref): ref is HTMLImageElement => ref !== null)
      if (validRefs.length === imageCount) {
        // 获取实际渲染的高度，而不是原始高度
        const heights = validRefs.map(img => img.getBoundingClientRect().height)
        const minH = Math.min(...heights)
        if (minH > 0) {
          setMinHeight(minH)
        }
      }
    }
    
    // 延迟执行，确保图片已经渲染
    const timer = setTimeout(updateMinHeight, 100)
    
    // 监听窗口resize
    window.addEventListener('resize', updateMinHeight)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateMinHeight)
    }
  }, [imageCount])
  
  if (imageCount === 0) return null
  
  // 统一的图片样式类
  const imageClasses = `
    rounded-lg border border-gray-200/60 shadow-md 
    transition-all duration-200 
    hover:border-gray-300/80 hover:shadow-lg
    dark:border-gray-700/80 dark:shadow-gray-900/30
    dark:hover:border-gray-600
    w-full h-auto object-cover
  `.trim()
  
  // 为图片添加样式
  const styledImages = images.map((img, idx) => 
    React.cloneElement(img, {
      ...img.props,
      className: clsx(img.props.className, imageClasses),
      key: idx,
    })
  )
  
  // 轮播控制
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1))
  }
  
  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1))
  }
  
  // 1张图：居中展示
  if (imageCount === 1) {
    return (
      <div className="my-4 flex justify-center">
        <div className="max-w-3xl w-full">
          {styledImages[0]}
        </div>
      </div>
    )
  }
  
  // 2张图:并排展示，保持高度一致且图片内容完整
  if (imageCount === 2) {
    return (
      <div className="my-4 flex justify-center items-end" style={{gap: '12px'}}>
        {styledImages.map((img, idx) => {
          const imgProps = img.props as React.ImgHTMLAttributes<HTMLImageElement>
          return (
            <div key={idx} className="flex items-center justify-center">
              {React.cloneElement(img, {
                ...imgProps,
                ref: (el: HTMLImageElement | null) => {
                  imageRefs.current[idx] = el
                  // 图片加载完成后计算最小高度
                  if (el && el.complete && el.naturalHeight > 0) {
                    setTimeout(() => {
                      const validRefs = imageRefs.current.filter((ref): ref is HTMLImageElement => ref !== null && ref.complete)
                      if (validRefs.length === 2) {
                        const heights = validRefs.map(img => img.getBoundingClientRect().height)
                        const minH = Math.min(...heights)
                        if (minH > 0 && Math.abs(minH - (minHeight || 0)) > 1) {
                          setMinHeight(minH)
                        }
                      }
                    }, 50)
                  }
                },
                onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget
                  setTimeout(() => {
                    if (target) {
                      const validRefs = imageRefs.current.filter((ref): ref is HTMLImageElement => ref !== null && ref.complete)
                      if (validRefs.length === 2) {
                        const heights = validRefs.map(img => img.getBoundingClientRect().height)
                        const minH = Math.min(...heights)
                        if (minH > 0) {
                          setMinHeight(minH)
                        }
                      }
                    }
                  }, 50)
                  // 调用原有的onLoad
                  if (imgProps.onLoad) {
                    imgProps.onLoad(e)
                  }
                },
                className: clsx(imgProps.className, 'h-auto w-auto'),
                style: minHeight ? { 
                  height: `${minHeight}px`,
                  width: 'auto',
                  maxWidth: '100%'
                } : { 
                  maxHeight: '900px', 
                  width: 'auto',
                  height: 'auto'
                }
              })}
            </div>
          )
        })}
      </div>
    )
  }
  
  // 3张图：三列展示，保持高度一致
  if (imageCount === 3) {
    return (
      <div className="my-4 flex justify-center items-end" style={{gap: '12px'}}>
        {styledImages.map((img, idx) => {
          const imgProps = img.props as React.ImgHTMLAttributes<HTMLImageElement>
          return (
            <div key={idx} className="flex items-center justify-center">
              {React.cloneElement(img, {
                ...imgProps,
                ref: (el: HTMLImageElement | null) => {
                  imageRefs.current[idx] = el
                  // 图片加载完成后计算最小高度
                  if (el && el.complete && el.naturalHeight > 0) {
                    setTimeout(() => {
                      const validRefs = imageRefs.current.filter((ref): ref is HTMLImageElement => ref !== null && ref.complete)
                      if (validRefs.length === 3) {
                        const heights = validRefs.map(img => img.getBoundingClientRect().height)
                        const minH = Math.min(...heights)
                        if (minH > 0 && Math.abs(minH - (minHeight || 0)) > 1) {
                          setMinHeight(minH)
                        }
                      }
                    }, 50)
                  }
                },
                onLoad: (e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.currentTarget
                  setTimeout(() => {
                    if (target) {
                      const validRefs = imageRefs.current.filter((ref): ref is HTMLImageElement => ref !== null && ref.complete)
                      if (validRefs.length === 3) {
                        const heights = validRefs.map(img => img.getBoundingClientRect().height)
                        const minH = Math.min(...heights)
                        if (minH > 0) {
                          setMinHeight(minH)
                        }
                      }
                    }
                  }, 50)
                  // 调用原有的onLoad
                  if (imgProps.onLoad) {
                    imgProps.onLoad(e)
                  }
                },
                className: clsx(imgProps.className, 'h-auto w-auto'),
                style: minHeight ? { 
                  height: `${minHeight}px`,
                  width: 'auto',
                  maxWidth: '100%'
                } : { 
                  maxHeight: '900px', 
                  width: 'auto',
                  height: 'auto'
                }
              })}
            </div>
          )
        })}
      </div>
    )
  }
  
  // 4张及以上：轮播展示
  return (
    <div className="my-4 max-w-4xl mx-auto">
      <div className="relative group">
        {/* 主图区域 */}
        <div className="relative overflow-hidden rounded-lg">
          {styledImages[currentIndex]}
        </div>
        
        {/* 左右箭头 */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
          aria-label="上一张"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
          aria-label="下一张"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        </button>
        
        {/* 指示器 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {styledImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={clsx(
                'h-2 rounded-full transition-all duration-200',
                idx === currentIndex
                  ? 'w-8 bg-white dark:bg-gray-200'
                  : 'w-2 bg-white/50 dark:bg-gray-400/50 hover:bg-white/75 dark:hover:bg-gray-300/75'
              )}
              aria-label={`跳转到第 ${idx + 1} 张`}
            />
          ))}
        </div>
        
        {/* 图片计数 */}
        <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
          {currentIndex + 1} / {imageCount}
        </div>
      </div>
      
      {/* 缩略图 */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {styledImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={clsx(
              'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200',
              idx === currentIndex
                ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            )}
          >
            <div className="w-full h-full">
              {img}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export function VideoGallery({ children }: { children: React.ReactNode }) {
  const [minHeight, setMinHeight] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  
  // 提取所有 video 元素
  const videos = React.Children.toArray(children).filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && child.type === 'video'
  )
  
  const videoCount = videos.length
  
  // 计算视频的最小高度
  useEffect(() => {
    if (videoCount < 2 || videoCount > 3) return
    
    const updateMinHeight = () => {
      const validRefs = videoRefs.current.filter((ref): ref is HTMLVideoElement => ref !== null && ref.videoHeight > 0)
      if (validRefs.length === videoCount) {
        const heights = validRefs.map(video => {
          const rect = video.getBoundingClientRect()
          return rect.height
        })
        const minH = Math.min(...heights)
        if (minH > 0) {
          setMinHeight(minH)
        }
      }
    }
    
    const timer = setTimeout(updateMinHeight, 200)
    window.addEventListener('resize', updateMinHeight)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateMinHeight)
    }
  }, [videoCount])
  
  if (videoCount === 0) return null
  
  // 1个视频：居中展示
  if (videoCount === 1) {
    const videoProps = videos[0].props as any
    const alt = videoProps.alt || ''
    return (
      <div className="my-4 flex justify-center">
        <div className="max-w-3xl w-full">
          <div className="overflow-hidden rounded-xl">
            <video
              {...videoProps}
              className="w-full h-auto rounded-xl border border-gray-200/60 shadow-lg dark:border-gray-700/80"
              controls
            />
          </div>
          {alt && (
            <span className="block text-center text-sm font-light italic text-gray-500 dark:text-gray-400 mt-2">
              {alt}
            </span>
          )}
        </div>
      </div>
    )
  }
  
  // 2个视频：并排展示，保持高度一致
  if (videoCount === 2) {
    return (
      <div className="my-4 flex justify-center items-end" style={{gap: '12px'}}>
        {videos.map((video, idx) => {
          const videoProps = video.props as any
          const alt = videoProps.alt || ''
          return (
            <div key={idx} className="flex flex-col items-center">
              <div className="overflow-hidden rounded-xl">
                <video
                  {...videoProps}
                  ref={(el: HTMLVideoElement | null) => {
                    videoRefs.current[idx] = el
                    if (el && el.readyState >= 1) {
                      setTimeout(() => {
                        const validRefs = videoRefs.current.filter((ref): ref is HTMLVideoElement => ref !== null && ref.videoHeight > 0)
                        if (validRefs.length === 2) {
                          const heights = validRefs.map(v => v.getBoundingClientRect().height)
                          const minH = Math.min(...heights)
                          if (minH > 0 && Math.abs(minH - (minHeight || 0)) > 1) {
                            setMinHeight(minH)
                          }
                        }
                      }, 100)
                    }
                  }}
                  onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                    setTimeout(() => {
                      const validRefs = videoRefs.current.filter((ref): ref is HTMLVideoElement => ref !== null && ref.videoHeight > 0)
                      if (validRefs.length === 2) {
                        const heights = validRefs.map(v => v.getBoundingClientRect().height)
                        const minH = Math.min(...heights)
                        if (minH > 0) {
                          setMinHeight(minH)
                        }
                      }
                    }, 100)
                    if (videoProps.onLoadedMetadata) {
                      videoProps.onLoadedMetadata(e)
                    }
                  }}
                  className="rounded-xl border border-gray-200/60 shadow-lg 
                            transition-all duration-200 
                            hover:border-gray-300/80 hover:shadow-xl
                            dark:border-gray-700/80 dark:shadow-gray-900/30
                            dark:hover:border-gray-600"
                  style={minHeight ? { 
                    height: `${minHeight}px`,
                    width: 'auto',
                    maxWidth: '100%'
                  } : { 
                    maxHeight: '800px', 
                    width: 'auto',
                    height: 'auto'
                  }}
                  controls
                />
              </div>
              {alt && (
                <span className="block text-center text-sm font-light italic text-gray-500 dark:text-gray-400 mt-2">
                  {alt}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }
  
  // 3个视频：三列展示，保持高度一致
  if (videoCount === 3) {
    return (
      <div className="my-4 flex justify-center items-end" style={{gap: '12px'}}>
        {videos.map((video, idx) => {
          const videoProps = video.props as React.VideoHTMLAttributes<HTMLVideoElement>
          return (
            <div key={idx} className="flex items-center justify-center overflow-hidden rounded-xl">
              <video
                {...videoProps}
                ref={(el: HTMLVideoElement | null) => {
                  videoRefs.current[idx] = el
                  if (el && el.readyState >= 1) {
                    setTimeout(() => {
                      const validRefs = videoRefs.current.filter((ref): ref is HTMLVideoElement => ref !== null && ref.videoHeight > 0)
                      if (validRefs.length === 3) {
                        const heights = validRefs.map(v => v.getBoundingClientRect().height)
                        const minH = Math.min(...heights)
                        if (minH > 0 && Math.abs(minH - (minHeight || 0)) > 1) {
                          setMinHeight(minH)
                        }
                      }
                    }, 100)
                  }
                }}
                onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
                  setTimeout(() => {
                    const validRefs = videoRefs.current.filter((ref): ref is HTMLVideoElement => ref !== null && ref.videoHeight > 0)
                    if (validRefs.length === 3) {
                      const heights = validRefs.map(v => v.getBoundingClientRect().height)
                      const minH = Math.min(...heights)
                      if (minH > 0) {
                        setMinHeight(minH)
                      }
                    }
                  }, 100)
                  if (videoProps.onLoadedMetadata) {
                    videoProps.onLoadedMetadata(e)
                  }
                }}
                className="rounded-xl border border-gray-200/60 shadow-lg 
                          transition-all duration-200 
                          hover:border-gray-300/80 hover:shadow-xl
                          dark:border-gray-700/80 dark:shadow-gray-900/30
                          dark:hover:border-gray-600"
                style={minHeight ? { 
                  height: `${minHeight}px`,
                  width: 'auto',
                  maxWidth: '100%'
                } : { 
                  maxHeight: '600px', 
                  width: 'auto',
                  height: 'auto'
                }}
                controls
              />
            </div>
          )
        })}
      </div>
    )
  }
  
  // 4个及以上：垂直堆叠
  return (
    <div className="my-4 flex flex-col gap-4 max-w-4xl mx-auto">
      {videos.map((video, idx) => (
        <div key={idx} className="overflow-hidden rounded-xl">
          <video
            {...video.props}
            className="w-full h-auto rounded-xl border border-gray-200/60 shadow-lg 
                      dark:border-gray-700/80"
            controls
          />
        </div>
      ))}
    </div>
  )
}
