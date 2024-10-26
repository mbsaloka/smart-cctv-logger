import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "./components/ThemeProvider"
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import LogPage from './pages/LogPage'
import StarredLogsPage from './pages/StarredLogsPage'

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logs" element={<LogPage />} />
            <Route path="starred" element={<StarredLogsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}