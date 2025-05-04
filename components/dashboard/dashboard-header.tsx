"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bell, Calendar, ChevronDown, Search, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { SidebarTrigger } from "../ui/sidebar"

export function DashboardHeader() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New delegate registration", time: "5 min ago", read: false },
    { id: 2, title: "Event update: AGM Kigali", time: "1 hour ago", read: false },
    { id: 3, title: "System maintenance", time: "Yesterday", read: true },
  ])
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    if (!pathname) return [{ name: "Dashboard", path: "/" }]

    const paths = pathname.split("/").filter(Boolean)
    if (paths.length === 0) return [{ name: "Dashboard", path: "/" }]

    return [
      { name: "Dashboard", path: "/" },
      ...paths.map((path, i) => ({
        name: path.charAt(0).toUpperCase() + path.slice(1),
        path: `/${paths.slice(0, i + 1).join("/")}`,
      })),
    ]
  }

  const breadcrumbs = generateBreadcrumbs()

  // Handle notification click
  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length

  if (!mounted) {
    return (
      <div className="flex items-center justify-between w-full p-4 border-b">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-[200px]" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">

      <div className="flex items-center gap-4 mb-2 sm:mb-0">
        <SidebarTrigger />

        <div className="flex items-center gap-2">
          {breadcrumbs.map((breadcrumb, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <span className="mx-2 text-muted-foreground">/</span>}
              <Button variant="link" className="p-0 h-auto" asChild>
                <a href={breadcrumb.path}>{breadcrumb.name}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] pl-8 md:w-[260px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
          />
          {showSearchResults && searchQuery && (
            <Card className="absolute top-full mt-1 w-full z-50">
              <CardContent className="p-2">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start text-sm h-auto py-1.5" asChild>
                    <a href="/delegates">
                      <User className="mr-2 h-4 w-4" />
                      <span>Search delegates: {searchQuery}</span>
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm h-auto py-1.5" asChild>
                    <a href="/events">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Search events: {searchQuery}</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {notifications.map((notification) => (
                <Button
                  key={notification.id}
                  variant="ghost"
                  className="w-full justify-start p-4 h-auto border-b last:border-0"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div
                      className={`h-2 w-2 mt-1.5 rounded-full flex-shrink-0 ${notification.read ? "bg-muted" : "bg-primary"
                        }`}
                    />
                    <div className="text-left">
                      <p className={`text-sm ${notification.read ? "" : "font-medium"}`}>{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full" asChild>
                <a href="/notifications">View all notifications</a>
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-flex">Admin User</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
