// data/skills.ts

export type SkillCategory = {
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'CSS / Sass', 'Redux', 'React Native', 'Vue', 'GSAP'],
  },
  {
    label: 'Backend & Data',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'GraphQL', 'PHP', 'Python', 'SQL', 'MongoDB'],
  },
  {
    label: 'Tools & Workflow',
    skills: ['Git', 'Webpack', 'Styled Components', 'WordPress', 'Storybook', 'Electron', 'Apache Cordova'],
  },
]
