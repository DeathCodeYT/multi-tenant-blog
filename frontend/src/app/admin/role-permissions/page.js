"use client"; // Required for client-side interactivity

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RolePermissions() {
  const [role, setRole] = useState("");
  const [rolePermissions, setRolePermissions] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch role permissions and all permissions based on role
  const fetchPermissions = async () => {
    if (!role) {
      alert("Please enter a role");
      return;
    }

    setIsLoading(true);
    try {
      const roleRes = await clientGet(`/admin/permission`, {
        username: username,
      });
      const allRes = await clientGet("/admin/permission");

      if (!roleRes.success || !allRes.success) {
        throw new Error("Failed to fetch data");
      }

      const roleData =  roleRes.data;
      const allData =  allRes.data

      setRolePermissions(roleData);
      setAllPermissions(allData);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPermission = async (permission) => {
    setIsLoading(true);
    try {
      const response = await clientPost(`/admin/role/permission`, null, {
        roleValue:role,
        permission,
      });

      if (!response.success) {
        throw new Error("Failed to add permission");
      }

      setRolePermissions((prev) => [...prev, permission]);
      setAllPermissions((prev) => prev.filter((p) => p !== permission));
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePermission = async (permission) => {
    setIsLoading(true);
    try {
      const response = await clientPatch(
              `/admin/role/permission`,
              null,
              { roleValue:role, permission }
            );
      
            if (!response.success) {
              throw new Error(response.msg);
            }

      setRolePermissions((prev) => prev.filter((p) => p !== permission));
      setAllPermissions((prev) => [...prev, permission]);
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Role Input and Search Button */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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

      {/* Role Permissions and All Permissions Tables */}
      {rolePermissions.length > 0 || allPermissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Role Permissions */}
          <div>
            <h3 className="text-lg font-bold mb-2">Role Permissions</h3>
            <ul className="space-y-2">
              {rolePermissions.map((permission, i) => (
                <li
                  key={permission + i + "R"}
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
              {allPermissions.map((permission, i) => (
                <li
                  key={permission + i + "P"}
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
          Enter a role and click &quot;Search&quot; to fetch permissions.
        </p>
      )}
    </div>
  );
}
