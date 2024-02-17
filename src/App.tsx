import { PrimeReactProvider } from "primereact/api"
import Layout from "./components/layout/Layout"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import TutorPage from "./pages/TutorPage/TutorPage"
import MessagesPage from "./pages/MessagesPage/MessagesPage"
import LessonsPage from "./pages/LessonsPage/LessonsPage"
import FullLessonPage from "./pages/FullLessonPage/FullLessonPage"
import CalendarPage from "./pages/CalendarPage/CalendarPage"
import SettingsPage from "./pages/SettingsPage/SettingsPage"

function App() {
  const value = {
    ripple: true,
  }

  return (
    <PrimeReactProvider value={value}>
      <BrowserRouter>
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
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
