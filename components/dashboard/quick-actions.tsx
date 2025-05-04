"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { CalendarPlus, Download, FileText, Mail, Plus, QrCode, Settings, Upload, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  description: string
  href?: string
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  disabled?: boolean
}

function QuickAction({ icon, label, description, href, onClick, variant = "outline", disabled }: QuickActionProps) {
  const content = (
    <div className="flex flex-col items-center text-center p-4 h-full">
      <div
        className={cn(
          "mb-3 rounded-full p-2",
          variant === "default" && "bg-primary/10 text-primary",
          variant === "secondary" && "bg-secondary/20 text-secondary-foreground",
          variant === "outline" && "bg-background border-2 text-muted-foreground",
          variant === "ghost" && "bg-muted/50 text-muted-foreground",
        )}
      >
        {icon}
      </div>
      <h3 className="text-sm font-medium mb-1">{label}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors",
          disabled && "opacity-50 pointer-events-none",
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors w-full",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {content}
    </button>
  )
}

export function QuickActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("delegate")

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              icon={<UserPlus className="h-5 w-5" />}
              label="Add Delegate"
              description="Register a new delegate"
              onClick={() => setIsDialogOpen(true)}
              variant="default"
            />
            <QuickAction
              icon={<CalendarPlus className="h-5 w-5" />}
              label="Create Event"
              description="Schedule a new event"
              href="/events/new"
              variant="default"
            />
            <QuickAction
              icon={<Mail className="h-5 w-5" />}
              label="Send Invitations"
              description="Email event invitations"
              href="/communications"
            />
            <QuickAction
              icon={<QrCode className="h-5 w-5" />}
              label="Generate QR Codes"
              description="For delegate badges"
              href="/delegates/qr-codes"
            />
            <QuickAction
              icon={<Upload className="h-5 w-5" />}
              label="Bulk Import"
              description="Import delegate data"
              href="/delegates/import"
            />
            <QuickAction
              icon={<FileText className="h-5 w-5" />}
              label="Generate Report"
              description="Create event reports"
              href="/reports/new"
            />
            <QuickAction
              icon={<Download className="h-5 w-5" />}
              label="Export Data"
              description="Download event data"
              href="/exports"
            />
            <QuickAction
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              description="Configure system"
              href="/settings"
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New</DialogTitle>
            <DialogDescription>Create a new delegate or event in the system.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="delegate" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="delegate">Delegate</TabsTrigger>
              <TabsTrigger value="event">Event</TabsTrigger>
            </TabsList>
            <TabsContent value="delegate" className="mt-4">
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Enter full name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="Enter email address" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="organization" className="text-right">
                    Organization
                  </Label>
                  <Input id="organization" placeholder="Enter organization" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event" className="text-right">
                    Event
                  </Label>
                  <Input id="event" placeholder="Select event" className="col-span-3" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="event" className="mt-4">
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-name" className="text-right">
                    Name
                  </Label>
                  <Input id="event-name" placeholder="Enter event name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" placeholder="Enter location" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Start Date
                  </Label>
                  <Input id="start-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-date" className="text-right">
                    End Date
                  </Label>
                  <Input id="end-date" type="date" className="col-span-3" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              {activeTab === "delegate" ? "Add Delegate" : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
