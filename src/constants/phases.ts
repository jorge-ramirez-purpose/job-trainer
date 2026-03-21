export const PHASES = [
  { name: 'JS core', category: 'JavaScript', progress: '20/20', color: 'bg-purple-500' },
  { name: 'React', category: 'React', progress: '40/40', color: 'bg-emerald-500' },
  { name: 'TypeScript', category: 'TypeScript', progress: '24/24', color: 'bg-amber-500' },
  { name: 'Patterns', category: 'Patterns', progress: '16/16', color: 'bg-red-500' },
  { name: 'HTML/CSS & SQL', category: 'HTML/CSS & SQL', progress: '12/12', color: 'bg-blue-500' }
]

export const PHASE_TITLES: Record<string, string> = {
  'JavaScript': 'JS core mechanics',
  'React': 'React core mechanics',
  'TypeScript': 'TypeScript deep dive',
  'Patterns': 'Design patterns',
  'HTML/CSS & SQL': 'HTML, CSS & SQL fundamentals'
}
