import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Cctv, Moon, Sun } from 'lucide-react';

function Layout() {
  const { theme, setTheme } = useTheme();

  const location = useLocation();
  const isLoggedIn = location.pathname !== "/login" && location.pathname !== "/";

  return (
    <div className="flex flex-col min-h-screen">
      <nav className={`fixed w-full z-20 top-0 start-0 border-b ${theme === "light" ? "bg-primary text-primary-foreground" : "bg-background text-primary"}`}>
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={isLoggedIn ? "/home" : "/"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <Cctv size={32} className="text-orange-400" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">CCTV Logger</span>
          </Link>

          <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
            {isLoggedIn && (
              <div className="space-x-3 md:space-x-4">
                <Button variant="ghost" asChild>
                  <Link to="/home">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/logs">Logs</Link>
                </Button>
              </div>
            )}
            <Button variant="ghost" asChild>
              <Link to={isLoggedIn ? "/" : "/login"}>{isLoggedIn ? "Logout" : "Login"}</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
      </nav>
      <main className="flex-grow w-full transform translate-y-16">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-muted w-full mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2024 CCTV Logger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;