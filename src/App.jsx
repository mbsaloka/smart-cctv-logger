import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LogsPage from './pages/LogsPage';
import MonitoringPage from './pages/MonitoringPage';
import RegisterPage from './pages/RegisterPage';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('token'));

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const currentTime = Date.now();
  const expiresTime = new Date(token.expires).getTime();
  if (!expiresTime || currentTime > expiresTime) {
    localStorage.removeItem('token');
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