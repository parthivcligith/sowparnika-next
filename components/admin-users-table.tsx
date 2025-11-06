"use client"

import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  full_name: string
  email: string
  phone: string
  is_admin: boolean
  created_at: string
}

interface AdminUsersTableProps {
  users: User[]
}

export default function AdminUsersTable({ users }: AdminUsersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-3 px-4">
                <p className="font-medium text-foreground">{user.full_name || "No name set"}</p>
              </td>
              <td className="py-3 px-4">
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </td>
              <td className="py-3 px-4">
                <p className="text-muted-foreground text-sm">{user.phone || "-"}</p>
              </td>
              <td className="py-3 px-4">
                <Badge
                  className={user.is_admin ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}
                >
                  {user.is_admin ? "Admin" : "User"}
                </Badge>
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
