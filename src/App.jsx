import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogsPage from './pages/LogsPage';
import MonitoringPage from './pages/MonitoringPage';
import LogsDashboard from './components/LogsDashboard';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="dashboard" element={<LogsDashboard />} />
            <Route path="monitoring" element={<MonitoringPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}