// data/skills.ts

export type SkillCategory = {
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'CSS / Sass', 'Tailwind', 'Framer Motion', 'HTML5', 'Accessibility'],
  },
  {
    label: 'Backend & Data',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Firebase'],
  },
  {
    label: 'Tools & Workflow',
    skills: ['Git', 'Figma', 'Vite', 'Docker', 'CI/CD', 'Vercel'],
  },
]
