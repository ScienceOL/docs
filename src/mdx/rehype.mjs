import { slugifyWithCounter } from '@sindresorhus/slugify'
import * as acorn from 'acorn'
import { toString } from 'mdast-util-to-string'
import { mdxAnnotations } from 'mdx-annotations'
import pinyin from 'pinyin'
import { createHighlighter } from 'shiki'
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
      (await createHighlighter({
        themes: ['github-dark-default'],
        langs: [
          'javascript',
          'typescript',
          'jsx',
          'tsx',
          'css',
          'html',
          'json',
          'markdown',
          'mdx',
          'bash',
          'shell',
          'sh',
          'zsh',
          'python',
          'java',
          'go',
          'rust',
          'php',
          'ruby',
          'yaml',
          'yml',
          'xml',
          'sql',
          'mermaid',
          'dockerfile',
          'docker',
          'c',
          'cpp',
          'csharp',
          'swift',
          'kotlin',
          'scala',
          'r',
          'lua',
          'perl',
          'powershell',
          'vim',
          'toml',
          'ini',
          'graphql',
          'svelte',
          'vue',
          'nginx',
          'apache',
          'makefile',
          'cmake',
          'diff',
          'git-commit',
          'git-rebase',
          'tex',
          'latex',
          'bibtex',
        ],
      }))

    visit(tree, 'element', (node) => {
      if (node.tagName === 'pre' && node.children[0]?.tagName === 'code') {
        let codeNode = node.children[0]
        let textNode = codeNode.children[0]

        node.properties.code = textNode.value

        if (node.properties.language) {
          let html = highlighter.codeToHtml(textNode.value, {
            lang: node.properties.language,
            theme: 'github-dark-default',
          })

          // Extract the content from the generated HTML
          const match = html.match(
            /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/,
          )
          if (match) {
            textNode.value = match[1]
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
