import { slugifyWithCounter } from '@sindresorhus/slugify'
import * as acorn from 'acorn'
import { toString } from 'mdast-util-to-string'
import { mdxAnnotations } from 'mdx-annotations'
import pinyin from 'pinyin'
import { getHighlighter } from 'shiki'
import { visit } from 'unist-util-visit'

function rehypeParseCodeBlocks() {
  return (tree) => {
    visit(tree, 'element', (node, _nodeIndex, parentNode) => {
      if (node.tagName === 'code' && node.properties.className) {
        parentNode.properties.language = node.properties.className[0]?.replace(
          /^language-/,
          '',
        )
      }
    })
  }
}

let highlighter

function rehypeShiki() {
  return async (tree) => {
    highlighter =
      highlighter ??
      (await getHighlighter({
        theme: 'css-variables',
        langs: [
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'json',
          'css',
          'html',
          'markdown',
          'yaml',
          'bash',
          'sh',
          'zsh',
          'fish',
          'powershell',
          'dockerfile',
          'python',
          'rust',
          'go',
          'java',
          'c',
          'cpp',
          'php',
          'ruby',
          'sql',
          'graphql',
          'xml',
          'toml',
          'ini',
          'diff',
          'git-commit',
          'git-rebase',
          'vue',
          'svelte',
          'astro',
          'mdx',
        ],
      }))

    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        let codeNode = node.children[0]
        let textNode = codeNode.children[0]

        node.properties.code = textNode.value

        if (node.properties.language) {
          // Normalize language names for better shell script support
          let language = node.properties.language
          if (language === 'sh' || language === 'shell') {
            language = 'bash'
          }

          try {
            let tokens = highlighter.codeToThemedTokens(
              textNode.value,
              language,
            )

            textNode.value = highlighter.renderToHtml(tokens, {
              elements: {
                pre: ({ children }) => children,
                code: ({ children }) => children,
                line: ({ children }) => `<span class="line">${children}</span>`,
              },
            })
          } catch (error) {
            // Fallback to plain text if language is not supported
            console.warn(
              `Language "${language}" not supported by Shiki, falling back to plain text`,
            )
          }
        }
      }
    })
  }
}

function rehypeSlugify() {
  return (tree) => {
    let slugify = slugifyWithCounter()
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2' && !node.properties.id) {
        // Get the text content of the heading
        const text = toString(node)

        // Convert Chinese characters to pinyin
        const pinyinText = pinyin(text, {
          style: pinyin.STYLE_NORMAL,
          heteronym: false,
        })
          .flat()
          .join('-')

        // Generate ID using the pinyin text or fall back to original text
        node.properties.id = slugify(pinyinText || text)
      }
    })
  }
}

function rehypeAddMDXExports(getExports) {
  return (tree) => {
    let exports = Object.entries(getExports(tree))

    for (let [name, value] of exports) {
      for (let node of tree.children) {
        if (
          node.type === 'mdxjsEsm' &&
          new RegExp(`export\\s+const\\s+${name}\\s*=`).test(node.value)
        ) {
          return
        }
      }

      let exportStr = `export const ${name} = ${value}`

      tree.children.push({
        type: 'mdxjsEsm',
        value: exportStr,
        data: {
          estree: acorn.parse(exportStr, {
            sourceType: 'module',
            ecmaVersion: 'latest',
          }),
        },
      })
    }
  }
}

function getSections(node) {
  let sections = []

  for (let child of node.children ?? []) {
    if (child.type === 'element' && child.tagName === 'h2') {
      sections.push(`{
        title: ${JSON.stringify(toString(child))},
        id: ${JSON.stringify(child.properties.id)},
        ...${child.properties.annotation}
      }`)
    } else if (child.children) {
      sections.push(...getSections(child))
    }
  }

  return sections
}

export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeSlugify,
  [
    rehypeAddMDXExports,
    (tree) => ({
      sections: `[${getSections(tree).join()}]`,
    }),
  ],
]
