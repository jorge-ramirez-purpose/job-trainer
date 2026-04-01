import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Sidebar } from './components/sidebar/Sidebar'
import { slugToCategory, categoryToSlug } from './constants/phases'

const App = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { phaseSlug } = useParams()
  const currentCategory = phaseSlug ? slugToCategory(phaseSlug) : null

  const handlePhaseSelect = (category: string | null) => {
    const slug = categoryToSlug(category)
    if (location.pathname.startsWith('/questions')) {
      navigate(`/questions/${slug}`)
    } else {
      navigate(`/quiz/${slug}/1`)
    }
  }

  return (
    <div className="flex h-screen text-sm bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPhase={currentCategory} onPhaseSelect={handlePhaseSelect} />
      <Outlet />
    </div>
  )
}

export default App
