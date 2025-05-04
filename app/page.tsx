"use client"

import { useState, useEffect } from "react"
import { Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStatsCards } from "@/components/dashboard/stats-cards"
import { DelegateStatsChart } from "@/components/dashboard/delegate-stats-chart"
import { DelegatesByCountryChart } from "@/components/dashboard/delegates-by-country-chart"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"
import { RecentDelegates } from "@/components/dashboard/recent-delegates"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { DashboardStatsSkeleton } from "@/components/dashboard/dashboard-skeleton"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues by ensuring components only render after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-6 pt-4">
          <div className="space-y-6">
            <DashboardStatsSkeleton />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 p-6 pt-4">
        <DashboardHeader />

        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Welcome back, Admin</h2>
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

          <DashboardStatsCards />

          <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="overview" className="flex-1 sm:flex-none">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-1 sm:flex-none">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="delegates" className="flex-1 sm:flex-none">
                Delegates
              </TabsTrigger>
              <TabsTrigger value="events" className="flex-1 sm:flex-none">
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-0">
              <div className="grid gap-4 md:grid-cols-12">
                <DelegateStatsChart />
                <DelegatesByCountryChart />
              </div>

              <div className="grid gap-4 md:grid-cols-12">
                <div className="md:col-span-5">
                  <UpcomingEvents />
                </div>
                <div className="md:col-span-7">
                  <RecentDelegates />
                </div>
              </div>

              <QuickActions />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-0">
              <div className="grid gap-4 md:grid-cols-12">
                <DelegateStatsChart />
                <DelegatesByCountryChart />
              </div>
            </TabsContent>

            <TabsContent value="delegates" className="space-y-4 mt-0">
              <RecentDelegates />
            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-0">
              <UpcomingEvents />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
