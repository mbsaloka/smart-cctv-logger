import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { Cctv, Menu, Moon, Sun } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Layout() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isLoggedIn = location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/register";

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const handleLogout = () => {
    localStorage.removeItem('token');
  }

  const LogoutDialog = ({ isMobile = false }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="justify-start">Logout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          After logging out, you&apos;ll need to login again to access the application.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            {isMobile ? (
              <SheetClose asChild>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </SheetClose>
            ) : (
              <Link to="/" onClick={handleLogout}>Logout</Link>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <nav className={`fixed w-full z-20 top-0 start-0 border-b ${theme === "light" ? "bg-primary text-primary-foreground" : "bg-background text-primary"}`}>
        <div className="max-w-screen-2xl flex items-center justify-between mx-auto p-4">
          <Link to={isLoggedIn ? "/home" : "/"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <Cctv size={28} className="text-orange-400" />
            <span className="sm:text-2xl self-center text-xl font-semibold whitespace-nowrap bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">CCTV Logger</span>
          </Link>

          <div className="hidden md:flex items-center space-x-3 md:space-x-4 rtl:space-x-reverse flex-1 justify-center">
            {isLoggedIn && (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/home">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/monitoring">Monitoring</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/logs">Logs</Link>
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3 md:order-2">
            {!isLoggedIn && (
              <Button variant="default" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
            <div className="hidden md:flex">
              {isLoggedIn && <LogoutDialog />}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col space-y-1 p-4 pt-10">
                {isLoggedIn ? (
                  <>
                    <SheetClose asChild>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/home">Home</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/logs">Logs</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/monitoring">Monitoring</Link>
                      </Button>
                    </SheetClose>
                    <LogoutDialog isMobile />
                  </>
                ) : (
                  <SheetClose asChild>
                    <Button variant="default" asChild className="justify-start">
                      <Link to="/login">Login</Link>
                    </Button>
                  </SheetClose>
                )}
                <Button variant="ghost" className="justify-start" onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
                      Light mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />
                      Dark mode
                    </>
                  )}
                </Button>
              </SheetContent>
            </Sheet>
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