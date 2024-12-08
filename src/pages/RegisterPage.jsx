import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

function RegisterPage() {
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(BACKEND_API_URL + '/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setErrorMessage(result.message);
        console.error(result.message);
      }
    } catch (error) {
      setErrorMessage('Failed to register. Please try again.');
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account to access the logs.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username (Email)</Label>
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/login">Back to Login</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;

