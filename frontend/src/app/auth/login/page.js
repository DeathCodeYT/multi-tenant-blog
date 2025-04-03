"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { clientPost, isEmail, isUsername } from "@/lib/service";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setVerifyEmail, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const { identifier, password } = formData;
    if (!identifier) {
      toast.error("Email or Username is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    const isValidEmail = isEmail(identifier);
    const isValidUsername = isUsername(identifier);
    if (!isValidEmail && !isValidUsername) {
      toast.error("Invalid Email or Username");
      return;
    }
    const inputType = isValidEmail ? "email" : "username";
    setLoading(true);
    const res = await clientPost("/auth/login", null, {
      [inputType]: identifier,
      password,
    });
    if (!res.success) {
      setLoading(false);
      if (res.msg == "User is not verified") {
        if (inputType == "email") {
          setVerifyEmail(identifier);
        }
        router.push("/auth/verify");
        return;
      }
      toast.error(res.msg);
      return;
    } else {
      setLoading(false);
      setUser({...res.data,isLoggined:true})
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Log In
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Welcome back! Please log in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="identifier"
                className="text-gray-700 dark:text-gray-300"
              >
                Email or Username
              </Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="Email or Username"
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
