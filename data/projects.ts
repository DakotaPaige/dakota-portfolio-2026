// data/projects.ts

export type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  // imageUrl?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Project Canopy',
    description: 'Real-time environmental data dashboard built for performance and clarity at scale.',
    longDescription:
      'An environmental monitoring dashboard that visualises live sensor data across multiple geographic regions. Built with React and D3.js for fluid chart transitions, with a Node.js backend streaming data via WebSockets.',
    tech: ['React', 'D3.js', 'Node'],
  },
  {
    id: 2,
    title: 'Mossy',
    description: 'Habit tracker with a calm, nature-inspired interface designed for gentle consistency.',
    longDescription:
      'A daily habit tracker built with a soft, nature-themed design system. Features streak tracking, custom habit categories, and a weekly calendar view. Prisma powers the data layer on a PostgreSQL database.',
    tech: ['Next.js', 'Tailwind', 'Prisma'],
  },
  {
    id: 3,
    title: 'Fieldwork',
    description: 'Freelance project management — proposals, invoicing, and client communication in one place.',
    longDescription:
      'An all-in-one tool for freelancers covering the full client lifecycle: proposal generation, contract signing, milestone tracking, time logging, and Stripe-powered invoicing. Built on React with Firebase for real-time sync.',
    tech: ['React', 'Firebase', 'Stripe'],
  },
  {
    id: 4,
    title: 'Shoreline',
    description: 'Headless CMS blog template with dark mode, full-text search, and tag filtering.',
    longDescription:
      'A production-ready blog starter built on Next.js and Sanity CMS. Ships with dark mode, full-text search powered by Sanity GROQ queries, tag-based filtering, and a custom rich-text renderer.',
    tech: ['Next.js', 'Sanity', 'TypeScript'],
  },
  {
    id: 5,
    title: 'Seedling',
    description: 'SaaS onboarding flow builder with drag-and-drop steps and conditional logic.',
    longDescription:
      'A no-code builder for SaaS onboarding flows. Product teams drag in steps, set conditions, and preview flows in real time. The backend stores flow definitions as JSON graphs in PostgreSQL.',
    tech: ['React', 'DnD Kit', 'PostgreSQL'],
  },
  {
    id: 6,
    title: 'Root & Branch',
    description: 'Family tree visualization with smooth zoom, search, and shareable snapshot exports.',
    longDescription:
      'A collaborative family tree app using D3.js for zoomable tree rendering on an HTML Canvas. Supports search across thousands of nodes, keyboard navigation, and PNG/SVG snapshot exports to share with family.',
    tech: ['React', 'D3.js', 'Canvas API'],
  },
  {
    id: 7,
    title: 'Clearwater',
    description: 'E-commerce storefront with advanced filtering and a fully custom checkout experience.',
    longDescription:
      'A Shopify-backed storefront built with Next.js and the Storefront GraphQL API. Features multi-faceted product filtering, cart persistence via localStorage, and a fully custom multi-step checkout without Shopify\'s default UI.',
    tech: ['Next.js', 'Shopify', 'GraphQL'],
  },
  {
    id: 8,
    title: 'Timber',
    description: 'Internal component library and design system, fully documented with Storybook.',
    longDescription:
      'A design system built for a product team of eight. Includes 40+ components built in React and Sass, documented in Storybook with live playground examples, accessibility annotations, and automated visual regression tests.',
    tech: ['React', 'Storybook', 'Sass'],
  },
  {
    id: 9,
    title: 'Watershed',
    description: 'Open source CLI for generating typed API clients from OpenAPI specs. 400+ GitHub stars.',
    longDescription:
      'A Node.js CLI that reads OpenAPI 3.x specs and outputs fully-typed TypeScript clients. Supports plugins for custom output templates. Published to npm and maintained as open source with 400+ GitHub stars.',
    tech: ['Node.js', 'TypeScript', 'OSS'],
  },
  {
    id: 10,
    title: 'Grove',
    description: 'Community platform for urban gardeners with real-time messaging and plant ID.',
    longDescription:
      'A community app for urban gardeners featuring posts, plant identification via an image API, neighbourhood maps, and real-time direct messaging via Socket.io. Built with React and an Express REST API.',
    tech: ['React', 'Socket.io', 'Express'],
  },
  {
    id: 11,
    title: 'Fern',
    description: 'Markdown editor with live preview, version history, and one-click GitHub Pages publishing.',
    longDescription:
      'A desktop Markdown editor built with Electron and CodeMirror. Features split-pane live preview, local version history stored in SQLite, and a one-click publish flow that pushes to a GitHub Pages repo via the GitHub REST API.',
    tech: ['Electron', 'CodeMirror', 'GitHub API'],
  },
  {
    id: 12,
    title: 'Underbrush',
    description: 'Browser extension for capturing dev notes, snippets, and bookmarks with tag-based search.',
    longDescription:
      'A Chrome extension for developers to capture notes, code snippets, and bookmarks while browsing. Data is stored in IndexedDB for offline access and synced across devices via Chrome\'s storage sync API. Built with React.',
    tech: ['Chrome API', 'React', 'IndexedDB'],
  },
]
