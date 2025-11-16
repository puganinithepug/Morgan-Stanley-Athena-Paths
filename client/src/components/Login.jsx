
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/Dialog";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { X } from "lucide-react";

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
        <Card className="relative w-full max-w-md sm:max-w-lg mx-auto bg-white shadow-xl border-2 border-primary-dark rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="absolute right-4 top-4 rounded-full p-1 text-foreground/70 bg-highlight/80 shadow-highlight-glow hover:bg-highlight  hover:shadow-highlight-glow-strong focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>
          <CardHeader className="bg-gradient-to-r from-primary-dark to-primary text-white pb-5 pt-5 px-6">
            <CardTitle className="text-xl font-semibold flex items-center justify-between">
              <span>{mode === "login" ? "Welcome back" : "Join the community"}</span>
            </CardTitle>
            <p className="mt-1 text-xs text-white/80">
              {mode === "login"
                ? "Log in to track your impact, referrals and badges."
                : "Create an account to save your progress and earn rewards."}
            </p>
          </CardHeader>
          <CardContent className="pt-6 pb-6 px-6 sm:px-7 space-y-5 bg-background">
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

              <div className="space-y-1">
                <label className="block text-xs font-medium text-foreground/70">
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-white/90"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-foreground/70">
                  Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white/90"
                  required
                />
              </div>

              {mode === "signup" && (
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-foreground/70">
                    Confirm password
                  </label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-white/90"
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="unstyled"
                className="w-full mt-3 h-10 font-semibold bg-highlight/80 shadow-highlight-glow hover:bg-highlight  hover:shadow-highlight-glow-strong"
              >
                {mode === "login" ? "Login" : "Sign up"}
              </Button>
            </form>

            {error && (
              <p className="mt-2 text-xs text-red-600 text-center">{error}</p>
            )}
            {success && (
              <p className="mt-2 text-xs text-green-600 text-center">
                {mode === "login" ? "Login successful!" : "Signup successful!"}
              </p>
            )}

            <div className="mt-2 text-xs text-foreground/60 text-center">
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
