"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { clientGet, clientPatch, clientPost } from "@/lib/service";

export default function Page() {
  const [username, setUsername] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user permissions and all permissions based on username
  const fetchPermissions = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    setIsLoading(true);
    try {
      const userRes = await clientGet(`/admin/permission`, {
        username: username,
      });
      const allRes = await clientGet("/admin/permission");

      if (!userRes.success || !allRes.success) {
        throw new Error("Failed to fetch data");
      }

      const userData = userRes.data;
      const allData = allRes.data;

      setUserPermissions(userData);
      setAllPermissions(allData);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPermission = async (permission) => {
    setIsLoading(true);
    try {
      const response = await clientPost(
        `/admin/user/permission`,
        null,
        { username, permission }
      );

      if (!response.success) {
        throw new Error(response.msg);
      }

      setUserPermissions((prev) => [...prev, permission]);
      setAllPermissions((prev) => prev.filter((p) => p !== permission));
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePermission = async (permission) => {
    setIsLoading(true);
    try {
      const response = await clientPatch(
        `/admin/user/permission`,
        null,
        { username, permission }
      );

      if (!response.success) {
        throw new Error(response.msg);
      }

      setUserPermissions((prev) => prev.filter((p) => p !== permission));
      setAllPermissions((prev) => [...prev, permission]);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Username Input and Search Button */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
        <Button
          onClick={fetchPermissions}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* User Permissions and All Permissions Tables */}
      {userPermissions.length > 0 || allPermissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Permissions */}
          <div>
            <h3 className="text-lg font-bold mb-2">User Permissions</h3>
            <ul className="space-y-2">
              {userPermissions.map((permission,i) => (
                <li
                  key={permission+i+"U"}
                  className="flex items-center justify-between"
                >
                  <span>{permission}</span>
                  <Button
                    onClick={() => handleRemovePermission(permission)}
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    -
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* All Permissions */}
          <div>
            <h3 className="text-lg font-bold mb-2">All Permissions</h3>
            <ul className="space-y-2">
              {allPermissions.map((permission,i) => (
                <li
                  key={permission+i+"P"}
                  className="flex items-center justify-between"
                >
                  <span>{permission}</span>
                  <Button
                    onClick={() => handleAddPermission(permission)}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    +
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">
          Enter a username and click &quot;Search&quot; to fetch permissions.
        </p>
      )}
    </div>
  );
}
