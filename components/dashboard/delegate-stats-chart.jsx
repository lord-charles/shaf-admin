"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const monthlyData = [
  { month: "Jan", physical: 30, virtual: 20, total: 50 },
  { month: "Feb", physical: 45, virtual: 25, total: 70 },
  { month: "Mar", physical: 60, virtual: 35, total: 95 },
  { month: "Apr", physical: 50, virtual: 40, total: 90 },
  { month: "May", physical: 75, virtual: 45, total: 120 },
  { month: "Jun", physical: 90, virtual: 55, total: 145 },
  { month: "Jul", physical: 100, virtual: 60, total: 160 },
  { month: "Aug", physical: 120, virtual: 70, total: 190 },
  { month: "Sep", physical: 110, virtual: 65, total: 175 },
  { month: "Oct", physical: 130, virtual: 75, total: 205 },
  { month: "Nov", physical: 140, virtual: 80, total: 220 },
  { month: "Dec", physical: 150, virtual: 90, total: 240 },
]

const weeklyData = [
  { week: "W1", physical: 20, virtual: 15, total: 35 },
  { week: "W2", physical: 25, virtual: 18, total: 43 },
  { week: "W3", physical: 35, virtual: 22, total: 57 },
  { week: "W4", physical: 40, virtual: 25, total: 65 },
  { week: "W5", physical: 30, virtual: 20, total: 50 },
  { week: "W6", physical: 45, virtual: 30, total: 75 },
  { week: "W7", physical: 50, virtual: 35, total: 85 },
  { week: "W8", physical: 55, virtual: 40, total: 95 },
]

const quarterlyData = [
  { quarter: "Q1 2023", physical: 135, virtual: 80, total: 215 },
  { quarter: "Q2 2023", physical: 215, virtual: 140, total: 355 },
  { quarter: "Q3 2023", physical: 330, virtual: 195, total: 525 },
  { quarter: "Q4 2023", physical: 420, virtual: 245, total: 665 },
  { quarter: "Q1 2024", physical: 248, virtual: 180, total: 428 },
]

export function DelegateStatsChart() {
  const [timeframe, setTimeframe] = useState("monthly")
  const [year, setYear] = useState("2024")

  // Select data based on timeframe
  const data = timeframe === "monthly" ? monthlyData : timeframe === "weekly" ? weeklyData : quarterlyData

  // X-axis key based on timeframe
  const xAxisKey = timeframe === "monthly" ? "month" : timeframe === "weekly" ? "week" : "quarter"

  return (
    <Card className="col-span-full lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Delegate Registration Trends</CardTitle>
          <CardDescription>Registration statistics over time by attendance mode</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="monthly" value={timeframe} onValueChange={setTimeframe} className="hidden sm:block">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            </TabsList>
          </Tabs>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="sm:hidden mb-4">
          <Tabs defaultValue="monthly" value={timeframe} onValueChange={setTimeframe}>
            <TabsList className="w-full">
              <TabsTrigger value="weekly" className="flex-1">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="flex-1">
                Quarterly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ChartContainer config={{}} className="aspect-[4/2] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorPhysical" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorVirtual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#E5E7EB" }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#E5E7EB" }}
                tickFormatter={(value) => value.toString()}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length && payload[0] && payload[1] && payload[2]) {
                    return (
                      <ChartTooltipContent
                        className="w-[200px]"
                        title={`${label} (${year})`}
                        content={
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-primary"></span>
                                <span>Physical</span>
                              </span>
                              <span>{payload[0]?.value || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-[#8884d8]"></span>
                                <span>Virtual</span>
                              </span>
                              <span>{payload[1]?.value || 0}</span>
                            </div>
                            <div className="flex items-center justify-between font-medium border-t pt-1 mt-1">
                              <span>Total</span>
                              <span>{payload[2]?.value || 0}</span>
                            </div>
                          </div>
                        }
                      />
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="physical"
                stackId="1"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorPhysical)"
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="virtual"
                stackId="1"
                stroke="#8884d8"
                strokeWidth={2}
                fill="url(#colorVirtual)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary"></div>
            <span className="text-sm text-muted-foreground">Physical Attendance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#8884d8]"></div>
            <span className="text-sm text-muted-foreground">Virtual Attendance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
