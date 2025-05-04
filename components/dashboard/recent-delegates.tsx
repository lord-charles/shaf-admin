"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ChevronRight, Filter, MoreHorizontal, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

// Sample data
const recentDelegates = [
  {
    id: 1,
    name: "Michael Kariuki",
    email: "mgichure@strathmore.edu",
    organization: "Strathmore",
    country: "Kenya",
    category: "Delegate",
    status: "approved",
    attendance: "physical",
    registeredAt: "2024-05-01T10:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    event: "AGM Kigali",
  },
  {
    id: 2,
    name: "Eric Mulevu",
    email: "ericmwendwa@gmail.com",
    organization: "Ministry of Lands Kenya",
    country: "Kenya",
    category: "Advisor",
    status: "pending",
    attendance: "physical",
    registeredAt: "2024-05-02T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    event: "AGM Kigali",
  },
  {
    id: 3,
    name: "Zachariah Mwangi",
    email: "cslandskenya@gmail.com",
    organization: "Ministry of Lands Kenya",
    country: "Kenya",
    category: "Minister / Head of Delegation",
    status: "approved",
    attendance: "physical",
    registeredAt: "2024-05-02T14:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    event: "AGM Kigali",
  },
  {
    id: 4,
    name: "Charles Hinga",
    email: "mail.jameswahome@gmail.com",
    organization: "State Department for Housing",
    country: "Kenya",
    category: "Principal Secretary",
    status: "approved",
    attendance: "physical",
    registeredAt: "2024-05-03T11:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    event: "Housing Finance Forum",
  },
  {
    id: 5,
    name: "Kenneth Kithinji",
    email: "kkithinji@shelterafrique.org",
    organization: "Shelter Afrique",
    country: "Kenya",
    category: "SHAF Staff",
    status: "approved",
    attendance: "physical",
    registeredAt: "2024-05-03T16:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
    event: "Board Meeting Q4",
  },
]

export function RecentDelegates() {
  const [filter, setFilter] = useState("all")

  // Filter delegates based on status
  const filteredDelegates =
    filter === "all" ? recentDelegates : recentDelegates.filter((delegate) => delegate.status === filter)

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Recent Delegates</CardTitle>
          <CardDescription>Latest delegate registrations</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredDelegates.map((delegate, index) => (
            <div key={delegate.id} className="group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={delegate.avatar || "/placeholder.svg"} alt={delegate.name} />
                    <AvatarFallback>{getInitials(delegate.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{delegate.name}</p>
                      <Badge variant="outline" className="text-xs h-5 px-1.5 hidden sm:inline-flex">
                        {delegate.category}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-2">
                      <p className="text-xs text-muted-foreground">{delegate.organization}</p>
                      <span className="hidden sm:inline-block text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{delegate.event}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn(
                      "hidden sm:inline-flex",
                      delegate.status === "approved" && "bg-green-500 hover:bg-green-600",
                      delegate.status === "pending" && "bg-yellow-500 hover:bg-yellow-600",
                      delegate.status === "rejected" && "bg-red-500 hover:bg-red-600",
                    )}
                  >
                    {delegate.status.charAt(0).toUpperCase() + delegate.status.slice(1)}
                  </Badge>
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
                      <DropdownMenuLabel>Delegate Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Information</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Send Email</DropdownMenuItem>
                      <DropdownMenuItem>Generate Badge</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {index < filteredDelegates.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/delegates">
            View All Delegates
            <ChevronRight className="ml-auto h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
