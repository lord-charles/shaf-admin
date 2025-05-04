"use client"

import { useState } from "react"
import { Bell, ChevronDown, Mail, Search, Upload } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import delegate categories from the provided data
const delegatesCategories = [
  { id: 1, category_name_en: "Delegate", category_name_fr: "Délégué" },
  { id: 2, category_name_en: "Minister / Head of Delegation", category_name_fr: "Ministre / Chef de délégation" },
  { id: 3, category_name_en: "Board Member", category_name_fr: "Membre du Conseil d'administration" },
  { id: 4, category_name_en: "Participant", category_name_fr: "Participant" },
  { id: 5, category_name_en: "Observer", category_name_fr: "Observateur" },
  { id: 6, category_name_en: "Press", category_name_fr: "Presse" },
  { id: 7, category_name_en: "SHAF Staff", category_name_fr: "Personnel de SHAF" },
  { id: 8, category_name_en: "Ministry Staff", category_name_fr: "Personnel du Ministère" },
  { id: 9, category_name_en: "Other", category_name_fr: "Autre" },
]

// Import attendance modes from the provided data
const attendanceModes = [
  { id: 1, attendance_mode_en: "Physical", attendance_mode_fr: "Physique" },
  { id: 2, attendance_mode_en: "Virtual", attendance_mode_fr: "Virtuele" },
]

// Import events from the provided data
const events = [
  {
    id: 1,
    name: "EGM Algeria",
    description: "EGM Algeria",
    start_date: "1999-01-01 00:00:00",
    end_date: "1999-01-01 00:00:00",
    location: "Algiers, Algeria",
  },
  {
    id: 2,
    name: "AGM Kigali",
    description:
      "Thank you for registering and welcome to Shelter Afrique's 43rd Annual General Meeting in Kigali, Rwanda. We look forward to meeting you there. Please find attached your invitation and unique QR Code.",
    start_date: "2024-06-11 00:00:00",
    end_date: "2024-06-13 00:00:00",
    location: "Marriot Hotel, Kigali, Rwanda",
  },
]

// List of countries
const countries = [
  { id: 68, name: "Ghana" },
  { id: 91, name: "Kenya" },
  { id: 106, name: "Malawi" },
  { id: 195, name: "Zimbabwe" },
  { id: 3, name: "Algeria" },
  { id: 156, name: "Rwanda" },
  { id: 180, name: "Tanzania" },
  { id: 186, name: "Uganda" },
  { id: 160, name: "South Africa" },
  { id: 130, name: "Nigeria" },
]

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState("individual")

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Delegate Registration</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[260px] lg:w-[320px]" />
          </div>
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>
          <Button size="icon" variant="ghost">
            <Mail className="h-5 w-5" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
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
      </header>

      <main className="flex-1 p-6 pt-4">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Register Delegates</h2>
              <p className="text-muted-foreground">Register new delegates for Shelter Afrique events</p>
            </div>
          </div>

          <Tabs defaultValue="individual" className="space-y-4">
            <TabsList>
              <TabsTrigger value="individual" onClick={() => setActiveTab("individual")}>
                Individual Registration
              </TabsTrigger>
              <TabsTrigger value="bulk" onClick={() => setActiveTab("bulk")}>
                Bulk Registration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Delegate Information</CardTitle>
                  <CardDescription>Enter the delegate's personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="event">Event</Label>
                      <Select>
                        <SelectTrigger id="event">
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                        <SelectContent>
                          {events.map((event) => (
                            <SelectItem key={event.id} value={event.id.toString()}>
                              {event.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Delegate Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {delegatesCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.category_name_en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attendance">Attendance Mode</Label>
                      <Select>
                        <SelectTrigger id="attendance">
                          <SelectValue placeholder="Select attendance mode" />
                        </SelectTrigger>
                        <SelectContent>
                          {attendanceModes.map((mode) => (
                            <SelectItem key={mode.id} value={mode.id.toString()}>
                              {mode.attendance_mode_en}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="surname">Surname</Label>
                      <Input id="surname" placeholder="Enter surname" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firstname">First Name</Label>
                      <Input id="firstname" placeholder="Enter first name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="othernames">Other Names</Label>
                      <Input id="othernames" placeholder="Enter other names (optional)" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select>
                        <SelectTrigger id="nationality">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id.toString()}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter address" />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="profession">Profession/Job Title</Label>
                      <Input id="profession" placeholder="Enter profession or job title" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" placeholder="Enter organization name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position">Position Held</Label>
                      <Input id="position" placeholder="Enter position held" />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="arrival-date">Arrival Date</Label>
                      <Input id="arrival-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="departure-date">Departure Date</Label>
                      <Input id="departure-date" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accommodation">Hotel of Accommodation</Label>
                      <Input id="accommodation" placeholder="Enter hotel name (if known)" />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="passport-validity">Passport Validity Date</Label>
                      <Input id="passport-validity" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passport-upload">Upload ID/Passport Copy</Label>
                      <div className="flex items-center gap-4">
                        <Input id="passport-upload" type="file" className="hidden" />
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById("passport-upload")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Accepted formats: PDF, JPG, PNG (max 5MB)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profile-pic">Upload Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <Input id="profile-pic" type="file" className="hidden" />
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById("profile-pic")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Choose File
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">Accepted formats: JPG, PNG (max 2MB)</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Register Delegate</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Registration</CardTitle>
                  <CardDescription>Upload a CSV file with multiple delegates information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-bulk">Event</Label>
                    <Select>
                      <SelectTrigger id="event-bulk">
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.id} value={event.id.toString()}>
                            {event.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-lg border border-dashed p-10 text-center">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-2">
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">Upload CSV File</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your CSV file here or click to browse
                      </p>

                      <Input id="csv-upload" type="file" accept=".csv" className="hidden" />
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => document.getElementById("csv-upload")?.click()}
                      >
                        Choose File
                      </Button>

                      <p className="text-xs text-muted-foreground mt-2">
                        Download the{" "}
                        <a href="#" className="text-primary underline">
                          template CSV file
                        </a>{" "}
                        to ensure correct format
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Upload and Register</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
