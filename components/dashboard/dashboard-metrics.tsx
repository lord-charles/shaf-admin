"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowUpRight, Calendar, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function DashboardMetrics() {
  const [timeframe, setTimeframe] = useState("weekly")
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Animate progress bars on mount
  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setProgress(78), 500)
    return () => clearTimeout(timer)
  }, [])

  // Sample metrics data
  const metrics = {
    weekly: {
      registrations: 42,
      attendance: 38,
      satisfaction: 96,
      change: "+12%",
    },
    monthly: {
      registrations: 186,
      attendance: 164,
      satisfaction: 92,
      change: "+8%",
    },
    yearly: {
      registrations: 2450,
      attendance: 2105,
      satisfaction: 89,
      change: "+15%",
    },
  }

  const currentMetrics = metrics[timeframe as keyof typeof metrics]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key event management statistics</CardDescription>
          </div>
          <Tabs defaultValue="weekly" value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Registrations</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.registrations}</span>
            </div>
            <Progress value={mounted ? 78 : 0} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Target: 50</span>
              <span className="flex items-center text-emerald-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                {currentMetrics.change}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Attendance</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.attendance}</span>
            </div>
            <Progress value={mounted ? 85 : 0} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Target: 45</span>
              <span className="flex items-center text-emerald-500">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +5%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Satisfaction</span>
              </div>
              <span className="text-sm font-medium">{currentMetrics.satisfaction}%</span>
            </div>
            <Progress value={mounted ? currentMetrics.satisfaction : 0} className="h-1.5" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Target: 90%</span>
              <span
                className={cn(
                  "flex items-center",
                  currentMetrics.satisfaction >= 90 ? "text-emerald-500" : "text-amber-500",
                )}
              >
                <ArrowUpRight className="mr-1 h-3 w-3" />
                {currentMetrics.satisfaction >= 90 ? "Above target" : "Near target"}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Performance</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Previous: 72%</span>
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +6%
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href="/analytics">
            View Detailed Analytics
            <ArrowRight className="ml-auto h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
