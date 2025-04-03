"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { clientPatch, isEmail, isUsername } from "@/lib/service";

export default function Page() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBanUnban = async (action) => {
    setIsLoading(true);
    const identifier = usernameOrEmail;
    const isValidEmail = isEmail(identifier);
    const isValidUsername = isUsername(identifier);
    if (!isValidEmail && !isValidUsername) {
      toast.error("Invalid Email or Username");
      return;
    }
    const inputType = isValidEmail ? "email" : "username";
    let res;
    if (action == "unban") {
      res = await clientPatch("/admin/user/unBan", null, {
        [inputType]: usernameOrEmail,
      });
    } else {
      res = await clientPatch("/admin/user/ban", null, {
        [inputType]: usernameOrEmail,
      });
    }
    if (!res.success) {
      setIsLoading(false);
      toast.error(res.msg)
      return;
    }
    toast.success(`${action} - Successfully`)
    setIsLoading(false);
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
      <div className="flex gap-2">
        <Button
          onClick={() => handleBanUnban("ban")}
          disabled={!usernameOrEmail || isLoading}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isLoading ? "Processing..." : "Ban User"}
        </Button>
        <Button
          onClick={() => handleBanUnban("unban")}
          disabled={!usernameOrEmail || isLoading}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isLoading ? "Processing..." : "Unban User"}
        </Button>
      </div>
    </div>
  );
}
