import { PrimeReactProvider } from "primereact/api"
import Layout from "./components/layout/Layout"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import AuthPage from "./pages/AuthPage/AuthPage"
import TutorPage from "./pages/TutorPage/TutorPage"
import MessagesPage from "./pages/MessagesPage/MessagesPage"

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
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
