import React from "react"
import Card from "@/components/app/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type User = {
  id: string
  name: string
  email: string
  role: string
}

const sample: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "Member" },
  { id: "3", name: "Carol", email: "carol@example.com", role: "Member" },
]

export default function DataTable() {
  return (
    <Card title="Users">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sample.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="edit">Edit</Button>
                  <Button size="sm" variant="delete">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
