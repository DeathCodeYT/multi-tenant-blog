"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Loader2 } from "lucide-react";
import { clientPatch, clientPost } from "@/lib/service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const router = useRouter()
  const [signupData,setSignupData] = useState({
    email:"",
    username:"",
    name:"",
    password:"",
    confirmPassword:"",
  })
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await clientPost("/auth/signup",null,signupData)
    if(!res.success){
      setIsLoading(false);
      setError(res.msg);
      return
    }
    setIsLoading(false);
    setIsSignupSuccess(true);
    toast.success("Signup Successfull, Now Verify your account");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({...signupData,[name]:value})
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    setError("");

   const res = await clientPatch("/user/verifyOTP",null,{email:signupData.email,OTP:otp})
    if(!res.success){
      setIsLoading(false);
      setError(res.msg);
      return
    }
    setIsLoading(false);
    toast.success("User Created and Verified")
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSignupSuccess ? "Verify OTP" : "Sign Up"}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            {isSignupSuccess
              ? `Enter the OTP sent to ${signupData.email}`
              : "Create a new account to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Signup Form */}
          <form
            onSubmit={handleSignup}
            className={`space-y-4 transition-all duration-500 ${
              isSignupSuccess ? "opacity-0 -translate-y-10 h-0 overflow-hidden" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value = {signupData.username}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  value={signupData.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign Up"}
            </Button>
          </form>

          {/* OTP Verification Section */}
          {isSignupSuccess && (
            <div className="space-y-4 transition-all duration-500">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700 dark:text-gray-300">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
              )}

              {/* Verify OTP Button */}
              <Button
                onClick={handleVerifyOtp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify OTP"}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}