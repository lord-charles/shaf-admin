"use client"

import { useState } from "react"
import { Bell, ChevronDown, Download, Filter, Mail, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Import delegates from the provided data
const delegates = [
  {
    id: 1,
    surname: "KARIUKI",
    firstname: "MICHAEL",
    othernames: "GICHURE",
    email_address: "MGICHURE@STRATHMORE.EDU",
    phone_number: "2540725 165078",
    nationality_id: 91,
    address: "222222",
    profession_job_title: "DIGITAL LEARNING MANAGER",
    name_of_organization: "STRATHMORE",
    position_held: "Manager",
    language_spoken: "en",
    event_id: 1,
    category_id: 1,
    attendance_mode_id: 1,
    status: "Approved",
  },
  {
    id: 2,
    surname: "MULEVU",
    firstname: "ERIC",
    email_address: "ERICMWENDWA@GMAIL.COM",
    phone_number: "254724428415",
    nationality_id: 91,
    address: "30450-00100",
    profession_job_title: "LAWYER",
    name_of_organization: "MINISTRY OF LANDS KENYA",
    position_held: "ADVISOR TO THE CABINET SECRETARY.",
    language_spoken: "en",
    event_id: 1,
    category_id: 8,
    attendance_mode_id: 1,
    status: "Pending",
  },
  {
    id: 3,
    surname: "MWANGI",
    firstname: "ZACHARIAH",
    othernames: "NJERU",
    email_address: "CSLANDSKENYA@GMAIL.COM",
    phone_number: "2540722 770472",
    nationality_id: 91,
    address: "30450-00100",
    profession_job_title: "CABINET SECRETARY",
    name_of_organization: "MINISTRY OF LANDS KENYA",
    position_held: "CABINET SECRETARY",
    language_spoken: "en",
    event_id: 1,
    category_id: 2,
    attendance_mode_id: 1,
    status: "Approved",
  },
  {
    id: 4,
    surname: "HINGA",
    firstname: "CHARLES",
    othernames: "M.",
    email_address: "MAIL.JAMESWAHOME@GMAIL.COM",
    phone_number: "254720841295",
    nationality_id: 91,
    address: "6TH FLOOR ARDHI HOUSE",
    profession_job_title: "PRINCIPAL SECRETARY",
    name_of_organization: "STATE DEPARTMENT FOR HOUSING AND URBAN DEVELOPMENT",
    position_held: "Principal Secretary",
    language_spoken: "en",
    event_id: 1,
    category_id: 2,
    attendance_mode_id: 1,
    status: "Approved",
  },
  {
    id: 5,
    surname: "KITHINJI",
    firstname: "KENNETH",
    othernames: "KITHINJI",
    email_address: "KKITHINJI@SHELTERAFRIQUE.ORG",
    phone_number: "254725979704",
    nationality_id: 91,
    address: "41479 00100 NAIROBI",
    profession_job_title: "ICT MANAGER",
    name_of_organization: "SHELTER AFRIQUE",
    position_held: "ICT Manager",
    language_spoken: "en",
    event_id: 1,
    category_id: 7,
    attendance_mode_id: 1,
    status: "Approved",
  },
  {
    id: 6,
    surname: "KIMATA",
    firstname: "MOSES",
    email_address: "MKIMATA@SHELTERAFRIQUE.ORG",
    phone_number: "254724560864",
    nationality_id: 91,
    address: "41479-00100",
    profession_job_title: "ICT EXPERT",
    name_of_organization: "SHELTER AFRIQUE",
    position_held: "ICT Infrastructure",
    language_spoken: "en",
    event_id: 1,
    category_id: 7,
    attendance_mode_id: 1,
    status: "Approved",
  },
  {
    id: 7,
    surname: "MANDA",
    firstname: "GEORGE",
    othernames: "PATIENCE",
    email_address: "GMANDA@SHELTERAFRIQUE.ORG",
    phone_number: "254754447994",
    nationality_id: 106,
    address: "BOX 41479 00100",
    profession_job_title: "BUSINESS APPLICATIONS",
    name_of_organization: "SHELTER AFRIQUE",
    position_held: "Business Applications",
    language_spoken: "en",
    event_id: 1,
    category_id: 7,
    attendance_mode_id: 2,
    status: "Pending",
  },
  {
    id: 8,
    surname: "KOLI",
    firstname: "NATASHA",
    othernames: "MWENDE",
    email_address: "NATASHA.KOLI@GMAIL.COM",
    phone_number: "254720737597",
    nationality_id: 91,
    address: "SHELTER AFRIQUE CENTRE 4TH FLOOR",
    profession_job_title: "ADVOCATE",
    name_of_organization: "SHELTER AFRIQUE",
    position_held: "Deputy Company Secretary",
    language_spoken: "en",
    event_id: 1,
    category_id: 7,
    attendance_mode_id: 1,
    status: "Approved",
  },
  {
    id: 9,
    surname: "ABBEY",
    firstname: "CHRIS",
    othernames: "POBEE",
    email_address: "CHRIS.ABBEY@MWH.GOV.GH",
    phone_number: "233244603468",
    nationality_id: 68,
    address: "P.O.BOX M43 MINISTRIES, ACCRA",
    profession_job_title: "ARCHITECT",
    name_of_organization: "MINISTRY OF WORKS AND HOUSING",
    position_held: "Principal Architect",
    language_spoken: "en",
    event_id: 1,
    category_id: 1,
    attendance_mode_id: 2,
    status: "Rejected",
  },
  {
    id: 10,
    surname: "SHERENI",
    firstname: "NYASHA",
    email_address: "NYASHASHERENISTAR@GMAIL.COM",
    phone_number: "254779338670",
    nationality_id: 195,
    address: "6 MUKONONO MUFAKOSE, HARARE",
    profession_job_title: "LEGAL OFFICER",
    name_of_organization: "MINISTRY OF NATIONAL HOUSING AND SOCIAL AMENITIES",
    position_held: "Legal Officer",
    language_spoken: "en",
    event_id: 1,
    category_id: 8,
    attendance_mode_id: 1,
    status: "Approved",
  },
]

// Map category IDs to names
const getCategoryName = (categoryId: number) => {
  const category = delegatesCategories.find((cat) => cat.id === categoryId)
  return category ? category.category_name_en : "Unknown"
}

// Map attendance mode IDs to names
const getAttendanceMode = (modeId: number) => {
  const mode = attendanceModes.find((mode) => mode.id === modeId)
  return mode ? mode.attendance_mode_en : "Unknown"
}

export default function DelegatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedAttendance, setSelectedAttendance] = useState("")

  // Filter delegates based on search and filters
  const filteredDelegates = delegates.filter((delegate) => {
    const fullName = `${delegate.firstname} ${delegate.surname}`.toLowerCase()
    const matchesSearch =
      searchTerm === "" ||
      fullName.includes(searchTerm.toLowerCase()) ||
      delegate.email_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delegate.name_of_organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "" || delegate.category_id === Number.parseInt(selectedCategory)

    const matchesStatus = selectedStatus === "" || delegate.status.toLowerCase() === selectedStatus.toLowerCase()

    const matchesAttendance =
      selectedAttendance === "" || delegate.attendance_mode_id === Number.parseInt(selectedAttendance)

    return matchesSearch && matchesCategory && matchesStatus && matchesAttendance
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Delegates Management</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search delegates..."
              className="w-[200px] pl-8 md:w-[260px] lg:w-[320px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <h2 className="text-2xl font-bold tracking-tight">Delegates</h2>
              <p className="text-muted-foreground">Manage and view all delegates for Shelter Afrique events</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="default">
                <Plus className="mr-2 h-4 w-4" />
                Add Delegate
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>All Delegates</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
              <CardDescription>
                Showing {filteredDelegates.length} of {delegates.length} delegates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {delegatesCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.category_name_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="attendance" className="text-sm font-medium">
                      Attendance Mode
                    </label>
                    <Select value={selectedAttendance} onValueChange={setSelectedAttendance}>
                      <SelectTrigger id="attendance">
                        <SelectValue placeholder="All Modes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Modes</SelectItem>
                        {attendanceModes.map((mode) => (
                          <SelectItem key={mode.id} value={mode.id.toString()}>
                            {mode.attendance_mode_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("")
                        setSelectedStatus("")
                        setSelectedAttendance("")
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDelegates.map((delegate) => (
                      <TableRow key={delegate.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32`}
                                alt={`${delegate.firstname} ${delegate.surname}`}
                              />
                              <AvatarFallback>
                                {delegate.firstname.charAt(0)}
                                {delegate.surname.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span>
                                {delegate.firstname} {delegate.surname}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {delegate.email_address.toLowerCase()}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{delegate.name_of_organization}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{getCategoryName(delegate.category_id)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={delegate.attendance_mode_id === 1 ? "default" : "secondary"}>
                            {getAttendanceMode(delegate.attendance_mode_id)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              delegate.status === "Approved"
                                ? "default"
                                : delegate.status === "Pending"
                                  ? "destructive"
                                  : "destructive"
                            }
                          >
                            {delegate.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
