"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { clientPost } from "@/lib/service";
import { toast } from "react-toastify";

export default function Page() {
  const [roleName, setRoleName] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateRole = async () => {
    if (!roleName || !roleValue || !description) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await clientPost("/admin/role",null,{roleValue,roleName,description})
      if(!res.success){
        throw new Error(res.msg)
      }
      toast.success("Role created successfully!");
      setRoleName("");
      setRoleValue("");
      setDescription("");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
      />
      <Input
        type="text"
        placeholder="Role Value"
        value={roleValue}
        onChange={(e) => setRoleValue(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
      />
      <Button
        onClick={handleCreateRole}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? "Creating..." : "Create Role"}
      </Button>
    </div>
  );
}