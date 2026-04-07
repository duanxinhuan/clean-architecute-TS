import React from "react"
import {
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function SidebarCustom() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2">
          <h2 className="text-lg font-semibold">SaaS Portal</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Users</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Settings</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>


      <SidebarFooter>
        <div className="px-3 py-2">
          <Button variant="logout" className="w-full">Logout</Button>
        </div>
      </SidebarFooter>
    </Sidebar>

  )
}
