"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

import { Check, X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { debounce } from "lodash";
import { useUserStore } from "@/stores/userStore";
import Image from "next/image";
import { clientGet, clientPatch, clientPost } from "@/lib/service";

export default function ProfilePage() {
  const { user: loggedInUser, setUser } = useUserStore(); // Get logged-in user from Zustand store
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(loggedInUser.name);
  const [email, setEmail] = useState(loggedInUser?.email);
  const [photo, setPhoto] = useState(loggedInUser?.photo);
  const [usernameInput, setUsernameInput] = useState(loggedInUser?.username);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [isUsernameChecking, setIsUsernameChecking] = useState(false);

  // Debounced username availability check
  const checkUsernameAvailability = debounce(async (username) => {
    if (username === loggedInUser?.username) {
      setIsUsernameAvailable(true);
      return;
    }

    setIsUsernameChecking(true);
    const res = await clientGet(`/user/checkUsername/${username}`);
    if(!res.success){
        setIsUsernameChecking(false);
        setIsUsernameAvailable(false);
        return
    }
    setIsUsernameAvailable(true);
    setIsUsernameChecking(false);
  }, 500);

  // Handle username input change
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsernameInput(newUsername);
    checkUsernameAvailability(newUsername);
  };

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    setIsLoading(true);
    setError("");

    const res = await clientPatch("/user/profilePhoto",null,formData)
    if(!res.success){
        setError(res.msg)
        setIsLoading(false);
        return
    }
    setIsLoading(false);
    setPhoto(res.data.photo);
    setUser({photo:res.data.photo})
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    setIsLoading(true);
    setError("");

   const res = await clientPatch('/user',null,{username:usernameInput,name:name})
   if(!res.success){
    setError(res.msg)
    return
   }
   setIsLoading(false);
   setUser({name,username:usernameInput})
  };
 useEffect(()=>{
    async function getUserDetails(){
          const res = await clientGet("/user")
          if(!res.success){
            console.log("LOGINERROR")
            const logoutUser = await clientPost('/auth/logout')
          }else{
            setUser({...res.data,isLoggined:true})
            setName(res.data.name)
            setPhoto(res.data.photo)
            setEmail(res.data.email)
            setUsernameInput(res.data.username)
          }
        }
    getUserDetails()
 },[])
  if (!loggedInUser.isLoggined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Your profile details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Photo */}
          <div className="flex flex-col items-center space-y-4">
            <Image height={720} width={1080}
              src={photo || "/default-avatar.png"}
              alt="Profile Photo"
              className="h-24 w-24 rounded-full object-cover"
            />
            <div className="relative">
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              <Label
                htmlFor="photo-upload"
                className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
              >
                Upload Photo
              </Label>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2 mt-6">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Username */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
              Username
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                value={usernameInput}
                onChange={handleUsernameChange}
                disabled={!isEditing}
                className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white pr-10"
              />
              {isUsernameChecking ? (
                <Loader2 className="h-5 w-5 animate-spin absolute right-2 top-2 text-gray-500 dark:text-gray-400" />
              ) : isUsernameAvailable !== null ? (
                isUsernameAvailable ? (
                  <Check className="h-5 w-5 absolute right-2 top-2 text-green-500" />
                ) : (
                  <X className="h-5 w-5 absolute right-2 top-2 text-red-500" />
                )
              ) : null}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 mt-4">{error}</p>
          )}

          {/* Edit/Update Buttons */}
          <div className="mt-6">
            {isEditing ? (
              <Button
                onClick={handleProfileUpdate}
                disabled={!isUsernameAvailable || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Profile"}
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}