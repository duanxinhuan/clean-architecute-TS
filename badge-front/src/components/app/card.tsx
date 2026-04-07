import React from "react"

type Props = {
  title?: string
  children: React.ReactNode
}

export default function Card({ title, children }: Props) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {title && (
        <div className="border-b px-4 py-2 font-medium">{title}</div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}
