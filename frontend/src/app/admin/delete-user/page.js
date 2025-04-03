"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { clientDelete, clientPatch, isEmail, isUsername } from "@/lib/service";
import { toast } from "react-toastify";

export default function Page() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const identifier = usernameOrEmail;
    const isValidEmail = isEmail(identifier);
    const isValidUsername = isUsername(identifier);
    if (!isValidEmail && !isValidUsername) {
      toast.error("Invalid Email or Username");
      return;
    }
    const inputType = isValidEmail ? "email" : "username";
    const res = await clientPatch("/admin/user", null, {
      [inputType]: usernameOrEmail,
    });
    if (!res.success) {
      setIsLoading(false);
      setIsDialogOpen(false);
      toast.error(res.msg);
      return;
    }
    toast.success("User Deleted");
    setIsLoading(false);
    setIsDialogOpen(false);
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
      <Button
        onClick={() => setIsDialogOpen(true)}
        disabled={!usernameOrEmail || isLoading}
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        {isLoading ? "Deleting..." : "Delete User"}
      </Button>

      {/* Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
