import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "../ui/sidebar"

export default function Header() {
  return (
    <header
      style={{ "--header-height": "56px" } as React.CSSProperties}
      className="w-full z-20 flex items-center justify-between gap-4 border-b bg-[var(--header-bg)] text-[var(--header-foreground)] px-4 py-3"
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">SaaS Portal</h1>
        <nav className="hidden md:flex gap-2">
          <Button variant="ghost">Overview</Button>
          <Button variant="ghost">Reports</Button>
          <Button variant="ghost">Integrations</Button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <Input placeholder="Search users, projects..." />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">Jane Doe</div>
            <div className="text-xs text-muted-foreground">Acme Corp</div>
          </div>
          <Button variant="ghost" className="rounded-full size-10">JD</Button>
        </div>
      </div>
    </header>
  )
}
