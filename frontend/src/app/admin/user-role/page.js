"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clientPatch, clientPost, isEmail, isUsername } from "@/lib/service";
import { toast } from "react-toastify";

export default function Page() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAssignRole = async () => {
    setIsLoading(true);
    const identifier = usernameOrEmail;
    const isValidEmail = isEmail(identifier);
    const isValidUsername = isUsername(identifier);
    if (!isValidEmail && !isValidUsername) {
      toast.error("Invalid Email or Username");
      return;
    }
    const inputType = isValidEmail ? "email" : "username";
    const res = await clientPost("admin/user/role", null,{[inputType]:usernameOrEmail});
    if(!res.success){
      setIsLoading(false);
      toast.error(res.msg);
      return
    }
    setIsLoading(false);
    toast.success("Role is Assigned")
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter username or email"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
      />
      <Input
        type="text"
        placeholder="Enter role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
      />
      <Button
        onClick={handleAssignRole}
        disabled={!usernameOrEmail || !role || isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? "Assigning..." : "Assign Role"}
      </Button>
    </div>
  );
}
