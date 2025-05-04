"use client"

import { useState, useEffect } from "react"
import { Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardWelcome() {
  const [greeting, setGreeting] = useState("Welcome back")
  const [userName, setUserName] = useState("Admin")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // In a real app, you would fetch the user's name from an API or context
    setUserName("Admin")
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {greeting}, {userName}
        </h2>
        <p className="text-muted-foreground">Here's an overview of your event management statistics</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
    </div>
  )
}
