"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { BarChart3, Calendar, Globe, TrendingUp, User, Users, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { CountUp } from "countup.js"

interface StatsCardProps {
  title: string
  value: number
  change: {
    value: number
    trend: "up" | "down" | "neutral"
    text: string
  }
  icon: React.ReactNode
  progressValue: number
  tooltip?: string
  formatter?: (value: number) => string
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  progressValue,
  tooltip,
  formatter = (val) => val.toString(),
}: StatsCardProps) {
  const countUpRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (countUpRef.current && mounted) {
      const countUp = new CountUp(countUpRef.current, value, {
        duration: 1.5,
        separator: ",",
        decimal: ".",
        decimalPlaces: value % 1 !== 0 ? 1 : 0,
        formattingFn: formatter,
      })

      if (!countUp.error) {
        countUp.start()
      }
    }
  }, [value, formatter, mounted])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <div className="rounded-full p-1.5 bg-muted/50">{icon}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold" ref={countUpRef}>
                  {formatter(0)}
                </div>
                <div
                  className={cn(
                    "flex items-center text-xs font-medium",
                    change.trend === "up" && "text-emerald-500",
                    change.trend === "down" && "text-rose-500",
                    change.trend === "neutral" && "text-muted-foreground",
                  )}
                >
                  {change.trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3" />}
                  {change.trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {change.value}%
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{change.text}</p>
              <Progress value={mounted ? progressValue : 0} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )
}

export function DashboardStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Delegates"
        value={248}
        change={{ value: 12, trend: "up", text: "+12% from last event" }}
        icon={<Users className="h-4 w-4 text-primary" />}
        progressValue={75}
        tooltip="Total number of registered delegates across all events"
      />
      <StatsCard
        title="Active Events"
        value={2}
        change={{ value: 0, trend: "neutral", text: "1 upcoming in 14 days" }}
        icon={<Calendar className="h-4 w-4 text-indigo-500" />}
        progressValue={40}
        tooltip="Number of currently active events"
      />
      <StatsCard
        title="Countries Represented"
        value={32}
        change={{ value: 4, trend: "up", text: "+4 new countries since last event" }}
        icon={<Globe className="h-4 w-4 text-sky-500" />}
        progressValue={65}
        tooltip="Number of countries with registered delegates"
      />
      <StatsCard
        title="Registration Rate"
        value={86}
        change={{ value: 2.5, trend: "up", text: "+2.5% from previous average" }}
        icon={<User className="h-4 w-4 text-amber-500" />}
        progressValue={86}
        formatter={(val) => `${val}%`}
        tooltip="Percentage of invited delegates who registered"
      />
    </div>
  )
}

export function DashboardSecondaryStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard
        title="Average Attendance"
        value={92.5}
        change={{ value: 3.2, trend: "up", text: "Higher than last quarter" }}
        icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
        progressValue={92}
        formatter={(val) => `${val}%`}
        tooltip="Percentage of registered delegates who attended events"
      />
      <StatsCard
        title="Response Time"
        value={1.4}
        change={{ value: 15, trend: "down", text: "Faster than previous month" }}
        icon={<Clock className="h-4 w-4 text-violet-500" />}
        progressValue={85}
        formatter={(val) => `${val} hrs`}
        tooltip="Average time to respond to delegate inquiries"
      />
      <StatsCard
        title="Analytics Engagement"
        value={68}
        change={{ value: 8, trend: "up", text: "Increased user engagement" }}
        icon={<BarChart3 className="h-4 w-4 text-orange-500" />}
        progressValue={68}
        formatter={(val) => `${val}%`}
        tooltip="Percentage of users engaging with analytics features"
      />
    </div>
  )
}
