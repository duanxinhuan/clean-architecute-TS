import React from "react"
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import Header from "@/components/app/header"
import SidebarCustom from "@/components/app/sidebar-custom"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <div style={{ "--header-height": "56px" } as React.CSSProperties} className="w-full flex min-h-screen flex-col bg-background text-foreground">
        <Header />
        <div className="w-full flex flex-1">
          <Sidebar
            variant="floating"
            className="p-2"
            style={{ "--sidebar-width": "12rem" } as React.CSSProperties}
          >
            <SidebarCustom />
          </Sidebar>

          <SidebarInset>
            <main className="w-full flex-1 p-6">
                {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
