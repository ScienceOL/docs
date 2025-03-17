import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:32235',
  ),
  title: {
    template: '%s - Doc',
    default: 'Protium Documentation',
  },
  icons: [
    { rel: 'icon', url: '/@brand/logo/Logo.png' },
    {
      rel: 'icon',
      media: '(prefers-color-scheme: dark)',
      url: '/@brand/logo/Logo-Dark.png',
    },
    { rel: 'apple-touch-icon', url: '/@brand/logo/Logo.png' },
    {
      rel: 'apple-touch-icon',
      media: '(prefers-color-scheme: dark)',
      url: '/@brand/logo/Logo-Dark.png',
    },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

/**
 * 正则表达式解释：
 *
 * - `(` 和 `)`：这是一个捕获组的开始和结束。捕获组是一种用于将正则表达式的一部分括起来，以便对该部分进行操作（例如，使用 `|` 操作符实现“或”逻辑）的方式。在这个例子中，捕获组包含了两种可能的匹配：字符串开头 `^` 或 `/` 字符。
 * - `^`：这个符号表示字符串的开头。当它出现在正则表达式的开始位置时，它要求匹配只能发生在字符串的开头。在这个例子中，它表示我们希望在字符串开头处找到 `page.mdx`。
 * - `|`：这个符号表示“或”操作，在正则表达式中，它表示我们希望匹配两个或多个可能的选项中的任意一个。在这个例子中，我们希望匹配字符串开头 `^` 或 `/` 字符。
 * - `\/`：这里的 `/` 字符表示字面上的斜线字符。由于斜线 `/` 通常用于表示正则表达式的边界，因此在这里需要使用反斜线 `\` 对其进行转义，以表示我们实际上想要匹配的是斜线字符本身。
 *
 * 总结一下，`(^|\/)` 这个捕获组的意义是：我们希望建立一个捕获组，以便在字符串开头或斜线字符之后找到 `page.mdx`。这样，当我们使用 `replace` 函数时，我们可以删除匹配到的部分（即 `page.mdx` 以及可能存在的前导斜线），从而将文件名转换为对应的路由路径。
 */
