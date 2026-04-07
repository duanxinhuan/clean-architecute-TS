import React, { useState } from "react"
import Card from "@/components/app/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // placeholder: wire to your API
    // eslint-disable-next-line no-console
    console.log({ name, email })
    setName("")
    setEmail("")
  }

  return (
    <Card title="Create user">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col text-sm">
          <span className="text-sm">Name</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
            required
          />
        </label>

        <label className="flex flex-col text-sm">
          <span className="text-sm">Email</span>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
            required
          />
        </label>

        <div className="flex justify-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Card>
  )
}
