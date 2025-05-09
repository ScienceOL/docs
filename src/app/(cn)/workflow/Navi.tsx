import { NavGroup } from '@/@types/navigation'

export const navigation: Array<NavGroup> = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: `/workflow` },
      { title: 'Quickstart', href: `/workflow/quickstart` },
      { title: 'Design', href: `/workflow/design` },
      { title: 'Roadmap', href: `/workflow/roadmap` },
      { title: 'FAQs', href: `/workflow/faq` },
    ],
  },
  {
    title: 'Interface',
    links: [{ title: 'Interface', href: `/workflow/interface` }],
  },
  {
    title: 'Execution',
    links: [
      { title: 'Execution', href: '/workflow/execution/how-it-works' },
      { title: 'Executor', href: '/workflow/execution' },
    ],
  },
  {
    title: 'Nodes',
    links: [
      { title: 'Node', href: '/workflow/nodes' },
      { title: 'ABACUS SIAB', href: '/workflow/nodes/abacus_siab' },
    ],
  },
  {
    title: 'Flociety',
    links: [
      { title: 'Node', href: '/workflow/nodes' },
      { title: 'Workflow', href: '/workflow/nodes/abacus_siab' },
    ],
  },
  {
    title: 'SDK',
    links: [
      { title: 'CLI', href: '/workflow/api/cli' },
      { title: 'API Token', href: '/workflow/api/api-token' },
      { title: 'File Format', href: '/workflow/api/file-format' },
      { title: 'API', href: '/workflow/api' },
    ],
  },
  {
    title: 'Integration',
    links: [
      { title: 'Xyzen', href: '/workflow/api/api-token' },
      { title: 'MCP Server', href: '/workflow/api/cli' },
    ],
  },
]
