"use client"

import { useState } from "react"
import { Calendar, ChevronRight, Clock, MapPin, MoreHorizontal, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample data
const events = [
  {
    id: 1,
    name: "AGM Kigali",
    description: "Annual General Meeting in Kigali, Rwanda",
    startDate: "2024-06-11",
    endDate: "2024-06-13",
    location: "Marriott Hotel, Kigali, Rwanda",
    delegateCount: 180,
    status: "upcoming",
    organizer: {
      name: "Kenneth Kithinji",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Annual Meeting", "Rwanda"],
  },
  {
    id: 2,
    name: "Housing Finance Forum",
    description: "Annual forum on housing finance solutions across Africa",
    startDate: "2024-09-15",
    endDate: "2024-09-17",
    location: "Nairobi, Kenya",
    delegateCount: 150,
    status: "upcoming",
    organizer: {
      name: "Natasha Koli",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Forum", "Kenya"],
  },
  {
    id: 3,
    name: "Board Meeting Q4",
    description: "Quarterly board meeting for Shelter Afrique",
    startDate: "2024-11-22",
    endDate: "2024-11-23",
    location: "Virtual",
    delegateCount: 25,
    status: "upcoming",
    organizer: {
      name: "George Manda",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    tags: ["Board", "Virtual"],
  },
]

export function UpcomingEvents() {
  const [view, setView] = useState<"list" | "calendar">("list")

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }).toUpperCase(),
      year: date.getFullYear(),
      formatted: date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    }
  }

  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const eventDate = new Date(dateString)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Next scheduled events for Shelter Afrique</CardDescription>
        </div>
        <Tabs defaultValue="list" value={view} onValueChange={(v) => setView(v as "list" | "calendar")}>
          <TabsList>
            <TabsTrigger value="list">List</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => {
            const startDate = formatDate(event.startDate)
            const endDate = formatDate(event.endDate)
            const daysRemaining = getDaysRemaining(event.startDate)

            return (
              <div key={event.id} className="group relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg border bg-muted transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
                    <span className="text-xs font-medium">{startDate.month}</span>
                    <span className="text-lg font-bold">{startDate.day}</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">{event.name}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Event</DropdownMenuItem>
                          <DropdownMenuItem>Manage Delegates</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Add to Calendar</DropdownMenuItem>
                          <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>
                        {startDate.formatted} - {endDate.formatted}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{event.delegateCount}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            daysRemaining <= 14 ? "bg-amber-50 text-amber-700 border-amber-200" : "",
                          )}
                        >
                          {daysRemaining === 0
                            ? "Today"
                            : daysRemaining === 1
                              ? "Tomorrow"
                              : `In ${daysRemaining} days`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-lg border border-transparent transition-colors group-hover:border-primary/20 pointer-events-none" />
                {event.id !== events.length && <Separator className="my-4" />}
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Calendar className="mr-2 h-4 w-4" />
          View All Events
          <ChevronRight className="ml-auto h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
