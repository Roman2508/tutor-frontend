import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { store } from './redux/store'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import TutorPage from './pages/TutorPage/TutorPage'
import AppAlert from './components/AppAlert/AppAlert'
import LessonsPage from './pages/LessonsPage/LessonsPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import MessagesPage from './pages/MessagesPage/MessagesPage'
import FullLessonPage from './pages/FullLessonPage/FullLessonPage'

function App() {
  const value = {
    ripple: true,
  }

  return (
    <Provider store={store}>
      <PrimeReactProvider value={value}>
        <BrowserRouter>
          <>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/tutor" element={<TutorPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/lesson/:id" element={<FullLessonPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/auth" element={<AuthPage />} />
              </Route>
            </Routes>

            <AppAlert />
          </>
        </BrowserRouter>
      </PrimeReactProvider>
    </Provider>
  )
}

export default App
