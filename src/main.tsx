import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.tsx'
import { QuizPage } from './pages/QuizPage.tsx'
import { ReviewPage } from './pages/ReviewPage.tsx'
import { MarkedPage } from './pages/MarkedPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz/all/1" replace />} />
        <Route path="/quiz" element={<Navigate to="/quiz/all/1" replace />} />
        <Route path="/quiz/:phaseSlug" element={<App />}>
          <Route index element={<QuizPage />} />
        </Route>
        <Route path="/quiz/:phaseSlug/:index" element={<App />}>
          <Route index element={<QuizPage />} />
        </Route>
        <Route path="/review" element={<App />}>
          <Route index element={<ReviewPage />} />
        </Route>
        <Route path="/review/:index" element={<App />}>
          <Route index element={<ReviewPage />} />
        </Route>
        <Route path="/marked" element={<App />}>
          <Route index element={<MarkedPage />} />
        </Route>
        <Route path="/marked/:index" element={<App />}>
          <Route index element={<MarkedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
