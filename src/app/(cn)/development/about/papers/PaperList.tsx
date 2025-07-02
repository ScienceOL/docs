'use client'

import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'
import { useState } from 'react'
import refBibs from './refBibs.json'

interface Creator {
  firstName: string
  lastName: string
  creatorType: string
}

interface PaperData {
  key: string
  title: string
  abstractNote?: string
  date: string
  creators: Creator[]
  itemType: string
  url?: string
  DOI?: string
  libraryCatalog?: string
  shortTitle?: string
  publisher?: string
  publicationTitle?: string
  journalAbbreviation?: string
  volume?: string
  issue?: string
  pages?: string
}

function formatAuthors(creators: Creator[]): string {
  if (!creators || creators.length === 0) return '未知作者'

  const authors = creators
    .filter((creator) => creator.creatorType === 'author')
    .map((creator) => `${creator.firstName} ${creator.lastName}`)

  if (authors.length <= 3) {
    return authors.join(', ')
  } else {
    return `${authors.slice(0, 3).join(', ')} 等`
  }
}

function formatCitation(paper: PaperData): string {
  const authors = formatAuthors(paper.creators)
  const year = paper.date ? new Date(paper.date).getFullYear() : '未知年份'
  const title = paper.title || '未知标题'

  let citation = `${authors} (${year}). ${title}.`

  if (paper.publicationTitle) {
    citation += ` ${paper.publicationTitle}`
  } else if (paper.libraryCatalog) {
    citation += ` ${paper.libraryCatalog}`
  }

  if (paper.volume) {
    citation += `, ${paper.volume}`
    if (paper.issue) {
      citation += `(${paper.issue})`
    }
  }

  if (paper.pages) {
    citation += `, ${paper.pages}`
  }

  if (paper.DOI) {
    citation += ` https://doi.org/${paper.DOI}`
  }

  return citation
}

function PaperPattern({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          y={24}
          squares={[
            [0, 2],
            [1, 3],
          ]}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          y={24}
          squares={[
            [0, 2],
            [1, 3],
          ]}
        />
      </motion.div>
    </div>
  )
}

function PaperCard({ paper }: { paper: PaperData }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
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

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleCopyCitation = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const citation = formatCitation(paper)
    try {
      await navigator.clipboard.writeText(citation)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy citation:', err)
    }
  }

  const getPublicationInfo = () => {
    const year = paper.date ? new Date(paper.date).getFullYear() : '未知年份'
    const journal = paper.publicationTitle || paper.libraryCatalog || '未知期刊'
    const volume = paper.volume ? `Vol. ${paper.volume}` : ''
    const issue = paper.issue ? `No. ${paper.issue}` : ''
    const pages = paper.pages ? `pp. ${paper.pages}` : ''

    return { year, journal, volume, issue, pages }
  }

  const { year, journal, volume, issue, pages } = getPublicationInfo()

  return (
    <motion.div
      layout
      onMouseMove={onMouseMove}
      className="group relative flex flex-col rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <PaperPattern mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />

      <motion.div layout className="relative rounded-2xl px-5 pb-5 pt-5">
        {/* Header with icons */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
            <DocumentTextIcon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
          </div>

          <div className="flex gap-2">
            {/* Copy citation button */}
            <button
              onClick={handleCopyCitation}
              title="复制引用"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 hover:bg-white/50 hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:hover:bg-emerald-300/10 dark:hover:ring-emerald-400"
            >
              {isCopied ? (
                <CheckIcon className="h-4 w-4 stroke-emerald-600 dark:stroke-emerald-400" />
              ) : (
                <ClipboardDocumentIcon className="h-4 w-4 stroke-zinc-700 transition-colors duration-300 hover:stroke-zinc-900 dark:stroke-zinc-400 dark:hover:stroke-emerald-400" />
              )}
            </button>

            {/* Expand button */}
            <button
              onClick={handleToggle}
              title={isExpanded ? '收起详情' : '展开详情'}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 hover:bg-white/50 hover:ring-zinc-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:hover:bg-emerald-300/10 dark:hover:ring-emerald-400"
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="h-4 w-4 stroke-zinc-700 transition-colors duration-300 hover:stroke-zinc-900 dark:stroke-zinc-400 dark:hover:stroke-emerald-400" />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Title */}
        <motion.div layout>
          <h3 className="mb-3 text-base font-semibold leading-6 text-zinc-900 dark:text-white">
            {paper.title}
          </h3>
        </motion.div>

        {/* Basic info in structured layout */}
        <motion.div layout className="space-y-3">
          {/* Authors */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 min-w-[50px] text-xs font-medium text-zinc-500 dark:text-zinc-400">
              作者
            </span>
            <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {formatAuthors(paper.creators)}
            </span>
          </div>

          {/* Publication info */}
          <div className="flex items-start gap-3">
            <span className="mt-0.5 min-w-[50px] text-xs font-medium text-zinc-500 dark:text-zinc-400">
              期刊
            </span>
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">{journal}</span>
              <span className="text-zinc-400 dark:text-zinc-500">•</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {year}
              </span>
              {volume && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-500">•</span>
                  <span>{volume}</span>
                </>
              )}
              {issue && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-500">•</span>
                  <span>{issue}</span>
                </>
              )}
              {pages && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-500">•</span>
                  <span>{pages}</span>
                </>
              )}
            </div>
          </div>

          {/* Type and quick links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="min-w-[50px] text-xs font-medium text-zinc-500 dark:text-zinc-400">
                类型
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20">
                {paper.itemType}
              </span>
            </div>

            {/* Quick access links */}
            <div className="flex gap-1">
              {paper.url && (
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  title="查看论文"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                >
                  <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                </a>
              )}

              {paper.DOI && (
                <a
                  href={`https://doi.org/${paper.DOI}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  title="查看DOI"
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                >
                  <span className="text-xs font-bold">DOI</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                {/* Abstract */}
                {paper.abstractNote && (
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      摘要
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {paper.abstractNote}
                    </p>
                  </div>
                )}

                {/* Full citation */}
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    完整引用
                  </h4>
                  <div className="relative">
                    <p className="rounded-lg bg-zinc-100 p-3 text-sm leading-relaxed text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {formatCitation(paper)}
                    </p>
                  </div>
                </div>

                {/* Extended links */}
                <div className="flex flex-wrap gap-3">
                  {paper.url && (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      查看论文
                    </a>
                  )}

                  {paper.DOI && (
                    <a
                      href={`https://doi.org/${paper.DOI}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      DOI: {paper.DOI}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function PaperList() {
  const papers = refBibs as PaperData[]

  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="papers" anchor>
        相关文献
      </Heading>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        以下是与我们研究相关的文献列表。点击复制按钮可复制引用格式，点击下拉按钮查看详细信息。
      </p>
      <div className="not-prose mt-6 grid grid-cols-1 gap-6 border-t border-zinc-900/5 pt-10 dark:border-white/5 lg:grid-cols-2">
        {papers.map((paper) => (
          <PaperCard key={paper.key} paper={paper} />
        ))}
      </div>
    </div>
  )
}
