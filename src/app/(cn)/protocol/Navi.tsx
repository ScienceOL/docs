import { NavGroup } from '@/@types/navigation'

export const navigation: Array<NavGroup> = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: '/protocol' },
      { title: 'Quickstart', href: '/protocol/quickstart' },
      { title: 'SDKs', href: '/protocol/sdks' },
      { title: 'Authentication', href: '/protocol/authentication' },
      { title: 'Pagination', href: '/protocol/pagination' },
      { title: 'Errors', href: '/protocol/errors' },
      { title: 'Webhooks', href: '/protocol/webhooks' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Contacts', href: '/protocol/contacts' },
      { title: 'Conversations', href: '/protocol/conversations' },
      { title: 'Messages', href: '/protocol/messages' },
      { title: 'Groups', href: '/protocol/groups' },
      { title: 'Attachments', href: '/protocol/attachments' },
    ],
  },
]
