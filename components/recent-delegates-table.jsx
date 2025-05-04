"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Check, X, Eye } from "lucide-react"

const recentDelegates = [
  {
    id: 1,
    name: "Michael Kariuki",
    email: "mgichure@strathmore.edu",
    organization: "Strathmore",
    country: "Kenya",
    category: "Delegate",
    status: "Approved",
    attendance: "Physical",
  },
  {
    id: 2,
    name: "Eric Mulevu",
    email: "ericmwendwa@gmail.com",
    organization: "Ministry of Lands Kenya",
    country: "Kenya",
    category: "Advisor",
    status: "Pending",
    attendance: "Physical",
  },
  {
    id: 3,
    name: "Zachariah Mwangi",
    email: "cslandskenya@gmail.com",
    organization: "Ministry of Lands Kenya",
    country: "Kenya",
    category: "Minister / Head of Delegation",
    status: "Approved",
    attendance: "Physical",
  },
  {
    id: 4,
    name: "Charles Hinga",
    email: "mail.jameswahome@gmail.com",
    organization: "State Department for Housing",
    country: "Kenya",
    category: "Principal Secretary",
    status: "Approved",
    attendance: "Physical",
  },
  {
    id: 5,
    name: "Kenneth Kithinji",
    email: "kkithinji@shelterafrique.org",
    organization: "Shelter Afrique",
    country: "Kenya",
    category: "SHAF Staff",
    status: "Approved",
    attendance: "Physical",
  },
]

export function RecentDelegatesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentDelegates.map((delegate) => (
          <TableRow key={delegate.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={delegate.name} />
                  <AvatarFallback>{delegate.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{delegate.name}</span>
                  <span className="text-xs text-muted-foreground">{delegate.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{delegate.category}</Badge>
            </TableCell>
            <TableCell>{delegate.country}</TableCell>
            <TableCell>
              <Badge
                variant={
                  delegate.status === "Approved" ? "success" : delegate.status === "Pending" ? "warning" : "destructive"
                }
              >
                {delegate.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
