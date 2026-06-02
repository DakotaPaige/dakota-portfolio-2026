// data/projects.ts

export type MediaItem = { src: string; video: boolean }

export type Project = {
  title: string
  description: string
  longDescription: string
  tech: string[]
  liveUrl?: string
  liveUrl2?: string
  githubUrl?: string
  images?: Array<string | MediaItem>
  featured?: boolean
}

export const projects: Project[] = [
   {
    title: 'Landmark District',
    description: 'A bold visual website populated by a headless Wordpress CMS.',
    longDescription:
      'Landmark District pairs a bold, visual-forward front end with a headless WordPress backend, decoupling content management from the presentation layer so editors can update everything in WordPress while the site renders through a fast custom front end. It features a searchable directory that lets users filter and find listings instantly, and real-time unit availability pulled in from an external API. Subtle, considered animations tie the experience together, adding polish without ever getting in the way of the bold visuals.',
    tech: ['React', 'Typescript', 'Website', 'Headless Wordpress'],
    liveUrl: 'https://landmarkdistrict.ca/',
    images: [
      '/assets/projects/landmark-district/landmark-district-1.png',
      '/assets/projects/landmark-district/landmark-district-2.png',
      '/assets/projects/landmark-district/landmark-district-3.png',
      '/assets/projects/landmark-district/landmark-district-4.png',
      '/assets/projects/landmark-district/landmark-district-5.png',
    ],
    featured: true,
  },
  {
    title: 'The Amazing Brentwood - Tower Six',
    description: 'A stunning and smooth front-end experience with gorgeous animations to showcase a new tower in the Brentwood development.',
    longDescription:
      'The Amazing Brentwood - Tower Six is a gorgeous website built to showcase the newest tower in the Brentwood development. Anchored by a stunning visual brand, it leans on rich animations and smooth transitions to guide users through the experience, with every interaction crafted to feel polished and effortless. The site is fully localized across multiple languages, making the same elevated experience accessible to a wider audience without compromising on the design or the animation work that ties it all together.',
    tech: ['React', 'Website', 'GSAP', 'Animations', 'Localized'],
    liveUrl: 'https://homes.theamazingbrentwood.com/',
    images: [
      '/assets/projects/tab/tab-1.png',
      { src: '/assets/projects/tab/tab-home-video-compressed.mp4', video: true },
      '/assets/projects/tab/tab-2.png',
      '/assets/projects/tab/tab-3.png',
      '/assets/projects/tab/tab-4.png',
    ],
    featured: true,
  },
  {
    title: 'Gryphon House',
    description: 'Multi-platform experience spanning a localized website, sales centre TV app, and iPad remote app.',
    longDescription:
      'Gryphon House is a multi-platform application experience built to include a localized website, sales center TV app, and a standalone iPad app which also works as a remote for the sales center application. While the website focuses on seamless animations and stunning visuals, the apps include an integrated sales experience with real-time unit data from an API.',
    tech: ['React', 'Localized Website', 'TV App', 'iPad App', 'API'],
    liveUrl: 'https://gryphonhousevancouver.com/',
    images: [
      '/assets/projects/gryphon/gryphon-house-landing.png',
      '/assets/projects/gryphon/gryphon-house-home.png',
      '/assets/projects/gryphon/gryphon-house-menu.png',
      '/assets/projects/gryphon/gryphon-house-menu-hover.png',
    ],
    featured: true,
  },
  {
    title: 'Cedar Creek Touchscreen',
    description: 'Touchscreen TV app with an interactive floorplan unit selector and sleek animations.',
    longDescription:
      'Cedar Creek is a Touchscreen TV application built to showcase a new phase of buildings. With a sleek, easy to follow layout, it features an interactive floorplan unit selector, where the user can explore and compare units between various phases. They can also explore the neighbourhood, amenities, and any information that might be needed all while enjoying subtle yet exciting animations.',
    tech: ['React', 'Touchscreen TV App', 'Animations'],
    images: [
      '/assets/projects/cedar-creek/cedar-creek-1.png',
      { src: '/assets/projects/cedar-creek/cedar-creek-walkthrough.mp4', video: true },
      '/assets/projects/cedar-creek/cedar-creek-2.png',
      '/assets/projects/cedar-creek/cedar-creek-3.png',
      '/assets/projects/cedar-creek/cedar-creek-4.png',
      '/assets/projects/cedar-creek/cedar-creek-5.png',
    ],
    featured: true,
  },
  {
    title: 'Combine Cafe',
    description: 'A one-page website with stunning scroll animations.',
    longDescription:
      "Combine Cafe's website is a sleek one-page platform, designed to spotlight the cafe with captivating scrolling animations that engage users. Utilizing GSAP, the animations are crafted to be smooth and responsive across all devices, enriching the visitor's experience. This approach not only showcases the cafe's highlights but also immerses users in the brand's essence, ensuring a memorable interaction with Combine Cafe's online presence.",
    tech: ['React', 'TypeScript', 'GSAP', 'Smooth Transitions'],
    liveUrl: 'https://combinecafe.ca/',
    images: [
      '/assets/projects/combine/combine-1.png',
      '/assets/projects/combine/combine-2.png',
    ],
  },
  {
    title: 'Locale',
    description: 'Bold and bright website and touchscreen app.',
    longDescription:
      "Locale's vibrant branding inspired a user-friendly website and touchscreen app for the sales centre, featuring a sleek and straightforward design enriched by playful animations, like content fade-ins and button hover effects, to engage users. The site is component-based, showcasing distinctive features such as a custom map on the Location page and seamless gallery animations on the Amenities page via GSAP. Additionally, the Floorplans page offers real-time unit availability, courtesy of an external API, integrated with an intuitive building selection tool.",
    tech: ['React', 'TypeScript', 'Bold Styling', 'API', 'Touchscreen App'],
    liveUrl: 'https://localerentals.ca/',
    images: [
      '/assets/projects/locale/locale-1.png',
      '/assets/projects/locale/locale-2.png',
      { src: '/assets/projects/locale/locale-home.mp4', video: true },
      { src: '/assets/projects/locale/locale-gallery.mp4', video: true },
    ],
  },
  {
    title: 'Gardena',
    description: 'Stunning smooth-scrolling website.',
    longDescription:
      "Gardena's website features smooth scrolling animations, providing a visually appealing experience. I led the project alongside a two-member development team, focusing on designing the site's structure and animations using GSAP. We also integrated an external API to keep the floorplan information up-to-date. This practical and straightforward approach ensured the website is not only attractive but also functional.",
    tech: ['React', 'TypeScript', 'Website', 'GSAP'],
    liveUrl: 'https://intracorphomes.com/gardena/',
    images: [
      '/assets/projects/gardena/gardena-1.png',
      '/assets/projects/gardena/gardena-2.png',
    ],
  },
  {
    title: '1818 Alberni',
    description: 'A beautiful website with smooth transitions showcasing a high end building.',
    longDescription:
      '1818 Alberni is a beautiful website to showcase a high end building in the heart of downtown Vancouver. It features smooth transitions to tie together the collage layout and subtle interactions for the user to enjoy. I also helped to create an iPad and TV app for the sales centre, where the iPad can be used as a standalone app or as a remote to display to the TV app. This is used as a helpful sales tool and a way to create more interaction between the user and the building.',
    tech: ['React', 'Website', 'iPad & TV App', 'Component Architecture'],
    liveUrl: 'https://landaglobal.com/1818alberni/',
    images: [
      '/assets/projects/1818/1818-1.png',
      { src: '/assets/projects/1818/1818-vid-1.mp4', video: true },
      '/assets/projects/1818/1818-2.png',
      '/assets/projects/1818/1818-3.png',
      '/assets/projects/1818/1818-4.png',
    ],
  },
  {
    title: 'Dorian',
    description: 'Sleek website to showcase a rental building with exciting interactions and API integration.',
    longDescription:
      'Dorian is a polished multi-page website built with a component-based architecture. Shared components like the menu header, testimonials section, floorplans page, and neighbourhood map give the site a cohesive feel throughout. The floorplans page pulls real-time unit availability from an external API, integrated with an intuitive building selection tool.',
    tech: ['React', 'Website', 'Component Architecture', 'API'],
    liveUrl: 'https://www.dorianseattle.com/',
    images: [
      '/assets/projects/dorian/dorian-1.png',
      '/assets/projects/dorian/dorian-2.png',
      '/assets/projects/dorian/dorian-3.png',
    ],
  },
  {
    title: 'Kutak Design Configurator',
    description: 'A seamless, unique sales experience to design your dream unit.',
    longDescription:
      'The Kutak design configurator is built to provide users with a seamless sales experience. Users can configure and design their dream unit, preview, print and save the data, and receive a customized email allowing them to register further or link back to their unique chosen settings.',
    tech: ['React', 'Website', 'Design Configurator', 'PHP'],
    liveUrl: 'https://kutakdevelopment.com/design/',
    images: [
      '/assets/projects/kutak/kutak-landing.png',
      '/assets/projects/kutak/kutak-2.png',
      '/assets/projects/kutak/kutak-3.png',
      '/assets/projects/kutak/kutak-4.png',
    ],
  },
  {
    title: 'Gryphon Living Royal Curator',
    description: 'A short multi-page site with stunning visuals and animations.',
    longDescription:
      'The Gryphon Royal Curator is built as a subsite to provide customers with an easily accessible personalized home experience. It features multiple SVG and scrolling animations, and an elevated responsive design.',
    tech: ['React', 'TypeScript', 'Website', 'SVG Animations'],
    liveUrl: 'https://gryphonliving.com/royalcurator',
    images: [
      '/assets/projects/gryphon/royalcurator1.png',
      '/assets/projects/gryphon/royalcurator2.png',
      '/assets/projects/gryphon/royalcurator3.png',
      '/assets/projects/gryphon/royalcurator4.png',
    ],
  },
  {
    title: 'Raphael',
    description: 'High end touchscreen application with smooth transitions.',
    longDescription:
      'Raphael is a high end touchscreen application designed to sell luxury low-rise condos. It features a unit floorplan selection experience, custom interactive google map, and custom gallery all tied together with smooth transitions.',
    tech: ['React', 'Touchscreen App'],
    images: [
      '/assets/projects/raphael/raphael-landing.png',
      '/assets/projects/raphael/raphael-2.png',
      '/assets/projects/raphael/raphael-3.png',
      '/assets/projects/raphael/raphael-4.png',
      '/assets/projects/raphael/raphael-5.png',
    ],
  },
  {
    title: 'Smith & Farrow',
    description: 'Multi-page website with smooth transitions.',
    longDescription:
      'Smith and Farrow is a multipage website with sleek animations and a unique design. It was built in multiple phases, to ultimately include the building, community and neighbourhood information in a clear and modern way.',
    tech: ['React', 'Website'],
    liveUrl: 'https://boffo.ca/smithandfarrow/',
    images: [
      '/assets/projects/smithandfarrow/smithandfarrow_landing.png',
      '/assets/projects/smithandfarrow/smithandfarrow2.png',
      '/assets/projects/smithandfarrow/smithandfarrow3.png',
    ],
  },
  {
    title: 'Highpoint',
    description: 'Touchscreen and iPad application to showcase multiple residential towers.',
    longDescription:
      'Highpoint was built as both a touchscreen application and iPad app to be used to promote sales in their presentation centre. It features floorplan selections, interactive views to experience, a neighbourhood map to explore and more.',
    tech: ['React', 'Touchscreen App', 'iPad App', 'Interactive Map'],
    images: [
      '/assets/projects/highpoint/highpoint-menu.png',
      '/assets/projects/highpoint/highpoint-2.png',
      '/assets/projects/highpoint/highpoint-3.png',
      '/assets/projects/highpoint/highpoint-4.png',
      '/assets/projects/highpoint/highpoint-5.png',
      '/assets/projects/highpoint/highpoint-6.png',
    ],
  },
  {
    title: 'Arbutus',
    description: 'Stunning website showcasing a new building by the Arbutus greenway.',
    longDescription:
      "The Arbutus is a gorgeous multipage website showcasing a new building next to the Arbutus greenway. It's smooth animations and natural graphics lend to its calming feeling, while featuring multiple interactive elements to keep the user clicking through the site to find more.",
    tech: ['React', 'Website', 'Smooth Animations'],
    liveUrl: 'https://thearbutus.com/',
    images: [
      '/assets/projects/arbutus/arbutus-landing.png',
      '/assets/projects/arbutus/arbutus-2.png',
      '/assets/projects/arbutus/arbutus-3.png',
      '/assets/projects/arbutus/arbutus-4.png',
      '/assets/projects/arbutus/arbutus-5.png',
      '/assets/projects/arbutus/arbutus-6.png',
    ],
  },
]
