import { NavGroup } from '@/@types/navigation'

export const navigation: Array<NavGroup> = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: `/protium` },
      { title: 'Quickstart', href: `/protium/quickstart` },
      { title: 'Design', href: `/protium/design` },
      { title: 'Roadmap', href: `/protium/roadmap` },
      { title: 'FAQs', href: `/protium/faq` },
    ],
  },
  {
    title: 'Interface',
    links: [{ title: 'Interface', href: `/protium/interface` }],
  },
  {
    title: 'Execution',
    links: [
      { title: 'Execution', href: '/protium/execution/how-it-works' },
      { title: 'Executor', href: '/protium/execution' },
    ],
  },
  {
    title: 'Nodes',
    links: [
      { title: 'Node', href: '/protium/nodes' },
      { title: 'ABACUS SIAB', href: '/protium/nodes/abacus_siab' },
    ],
  },
  {
    title: 'Flociety',
    links: [
      { title: 'Node', href: '/protium/nodes' },
      { title: 'Workflow', href: '/protium/nodes/abacus_siab' },
    ],
  },
  {
    title: 'SDK',
    links: [
      { title: 'CLI', href: '/protium/api/cli' },
      { title: 'File Format', href: '/protium/api/file-format' },
      { title: 'API Token', href: '/protium/api/api-token' },
      { title: 'API', href: '/protium/api' },
    ],
  },
  {
    title: 'Integration',
    links: [
      { title: 'Xyzen', href: '/protium/api/api-token' },
      { title: 'MCP Server', href: '/protium/api/cli' },
    ],
  },
]
