import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { Route, Routes, useNavigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from './redux/store'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import TutorPage from './pages/TutorPage/TutorPage'
import AppAlert from './components/AppAlert/AppAlert'
import { authMe } from './redux/auth/authAsyncActions'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import MessagesPage from './pages/MessagesPage/MessagesPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import FullLessonPage from './pages/FullLessonPage/FullLessonPage'
import ReservedLessonsPage from './pages/ReservedLessonsPage/ReservedLessonsPage'

const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = window.localStorage.getItem('tutor-token')

    if (token) {
      dispatch(authMe({ token }))
    } else {
      navigate('/auth')
    }
  }, [])

  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutor/:id" element={<TutorPage />} />
            <Route path="/tutor/me/:id" element={<TutorPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/messages/:id" element={<MessagesPage />} />
            <Route path="/lessons" element={<ReservedLessonsPage />} />
            <Route path="/lesson/:id" element={<FullLessonPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Routes>

        <AppAlert />
      </>
    </PrimeReactProvider>
  )
}

export default App
