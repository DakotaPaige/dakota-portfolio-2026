import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dakota Mauza-Simeone — Frontend Developer',
    short_name: 'Dakota Mauza-Simeone',
    description:
      'Frontend-focused full stack developer building thoughtful interfaces and clean code.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1510',
    theme_color: '#0d1510',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
