import { NavGroup } from '@/@types/navigation'

export const navigation: Array<NavGroup> = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: `/workflow` },
      { title: 'Quickstart', href: `/workflow/quickstart` },
      { title: 'Design', href: `/workflow/design` },
    ],
  },
  {
    title: 'Nodes',
    links: [
      { title: 'Node', href: '/workflow/nodes' },
      // { title: 'Node - Mapping', href: '/workflow/nodes/mapping' },
      { title: 'ABACUS SIAB', href: '/workflow/nodes/abacus_siab' },
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
    title: 'CLI',
    links: [
      { title: 'CLI', href: '/workflow/api/cli' },
      { title: 'API Token', href: '/workflow/api/api-token' },
      { title: 'File Format', href: '/workflow/api/file-format' },
      { title: 'API', href: '/workflow/api' },
    ],
  },
]
