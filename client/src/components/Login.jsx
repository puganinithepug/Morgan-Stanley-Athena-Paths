
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/Dialog";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

const Login = ({ open, onClose, onSuccess }) => {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Reset form when popup closes
  useEffect(() => {
    if (!open) {
      setMode("login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
      setError("");
      setSuccess(false);
    }
  }, [open]);

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        onClose && onClose();
        setSuccess(false);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [success, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const isSignup = mode === "signup";
      const endpoint = isSignup
        ? "http://localhost:8000/signup"
        : "http://localhost:8000/login";

      const body = isSignup
        ? {
            email,
            password,
            confirmpass: confirmPassword,
            fname: firstName,
            lname: lastName,
          }
        : {
            email,
            password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.status === "ok") {
        setSuccess(true);
        if (onSuccess) {
          onSuccess(data.user || null);
        }
      } else {
        setError(data.message || (isSignup ? "Signup failed" : "Login failed"));
      }
    } catch (err) {
      setError("Could not connect to server");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(openState) => !openState && onClose && onClose()}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none">
        <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur shadow-2xl border border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-t-lg pb-4">
            <CardTitle className="flex items-center justify-between text-xl">
              <span>{mode === "login" ? "Welcome back" : "Create your account"}</span>
            </CardTitle>
            <div className="mt-3 inline-flex gap-2 bg-white/10 rounded-full p-1">
              <Button
                type="button"
                variant={mode === "login" ? "default" : "ghost"}
                size="sm"
                className="px-3 py-1 h-8 rounded-full"
                onClick={() => setMode("login")}
              >
                Login
              </Button>
              <Button
                type="button"
                variant={mode === "signup" ? "default" : "ghost"}
                size="sm"
                className="px-3 py-1 h-8 rounded-full"
                onClick={() => setMode("signup")}
              >
                Sign up
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 pb-6 px-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1">
                      First name
                    </label>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Alex"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/70 mb-1">
                      Last name
                    </label>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Thompson"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/70 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-medium text-foreground/70 mb-1">
                    Confirm password
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full mt-2 h-10 font-semibold">
                {mode === "login" ? "Login" : "Sign up"}
              </Button>
            </form>

            {error && (
              <p className="mt-2 text-xs text-red-600">{error}</p>
            )}
            {success && (
              <p className="mt-2 text-xs text-green-600">
                {mode === "login" ? "Login successful!" : "Signup successful!"}
              </p>
            )}

            <div className="mt-4 text-xs text-foreground/60 text-center">
              {mode === "login" ? (
                <span>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="text-primary underline-offset-2 hover:underline"
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-primary underline-offset-2 hover:underline"
                    onClick={() => setMode("login")}
                  >
                    Log in
                  </button>
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
