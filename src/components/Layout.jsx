import { Outlet, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { useTheme } from "./ThemeProvider"
import { Moon, Sun } from 'lucide-react'

export default function Layout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground w-full">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold">CCTV Logger</Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/logs">Logs</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/starred">Starred</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-grow w-full">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      <footer className="bg-muted w-full">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2024 CCTV Logger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}