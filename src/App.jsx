import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import LogsPage from './pages/LogsPage';
import MonitoringPage from './pages/MonitoringPage';
import LogsDashboard from './components/LogsDashboard';
import RegisterPage from './pages/RegisterPage';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="logs" element={
              <RequireAuth>
                <LogsPage />
              </RequireAuth>
            } />
            <Route path="monitoring" element={
              <RequireAuth>
                <MonitoringPage />
              </RequireAuth>
            } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}