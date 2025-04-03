"use client"; // Required for client-side interactivity

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CustomError({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Alert className="max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-red-500 dark:border-red-400">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          <AlertDescription className="text-red-600 dark:text-red-400">
            {message}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}