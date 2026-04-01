export const PHASES = [
  { name: 'JS core', category: 'JavaScript', slug: 'javascript', progress: '21/21', color: 'bg-purple-500' },
  { name: 'React', category: 'React', slug: 'react', progress: '42/42', color: 'bg-emerald-500' },
  { name: 'TypeScript', category: 'TypeScript', slug: 'typescript', progress: '27/27', color: 'bg-amber-500' },
  { name: 'Patterns', category: 'Patterns', slug: 'patterns', progress: '16/16', color: 'bg-red-500' },
  { name: 'HTML/CSS & SQL', category: 'HTML/CSS & SQL', slug: 'html-css-sql', progress: '12/12', color: 'bg-blue-500' },
  { name: 'Node.js & Express', category: 'Node.js & Express', slug: 'nodejs-express', progress: '16/16', color: 'bg-orange-500' }
]

export const PHASE_TITLES: Record<string, string> = {
  'JavaScript': 'JS core mechanics',
  'React': 'React core mechanics',
  'TypeScript': 'TypeScript deep dive',
  'Patterns': 'Design patterns',
  'HTML/CSS & SQL': 'HTML, CSS & SQL fundamentals',
  'Node.js & Express': 'Node.js & Express fundamentals'
}

export const slugToCategory = (slug: string): string | null => {
  if (slug === 'all') return null
  return PHASES.find(p => p.slug === slug)?.category ?? null
}

export const categoryToSlug = (category: string | null): string => {
  if (!category) return 'all'
  return PHASES.find(p => p.category === category)?.slug ?? 'all'
}
