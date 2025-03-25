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
    title: 'Interface',
    links: [{ title: 'Interface', href: `/workflow/interface` }],
  },
  {
    title: 'Execution',
    links: [
      { title: 'Execution', href: '/workflow/execution/how-it-works' },
      { title: 'NodeExecutor', href: '/workflow/execution' },
      { title: 'IOExecutor', href: '/workflow/execution' },
      { title: 'SolverExecutor', href: '/workflow/execution' },
      { title: 'ILabExecutor', href: '/workflow/execution' },
    ],
  },
  {
    title: 'Nodes',
    links: [
      { title: 'Node', href: '/workflow/nodes' },
      { title: 'VASP Node', href: '/workflow/execution' },
    ],
  },
  {
    title: 'CLI',
    links: [
      { title: 'CLI', href: '/workflow/api/cli' },
      { title: 'File Format', href: '/workflow/api/file-format' },
      { title: 'API Token', href: '/workflow/api/api-token' },
      { title: 'API', href: '/workflow/api' },
    ],
  },
  {
    title: 'Society',
    links: [{ title: 'Society', href: '/workflow/society' }],
  },
  {
    title: 'Integration',
    links: [{ title: 'Integration', href: '/workflow/integration' }],
  },
]
