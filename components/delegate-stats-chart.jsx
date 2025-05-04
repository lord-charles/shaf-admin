"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Jan", physical: 30, virtual: 20 },
  { month: "Feb", physical: 45, virtual: 25 },
  { month: "Mar", physical: 60, virtual: 35 },
  { month: "Apr", physical: 50, virtual: 40 },
  { month: "May", physical: 75, virtual: 45 },
  { month: "Jun", physical: 90, virtual: 55 },
  { month: "Jul", physical: 100, virtual: 60 },
  { month: "Aug", physical: 120, virtual: 70 },
  { month: "Sep", physical: 110, virtual: 65 },
  { month: "Oct", physical: 130, virtual: 75 },
  { month: "Nov", physical: 140, virtual: 80 },
  { month: "Dec", physical: 150, virtual: 90 },
]

export function DelegateStatsChart() {
  return (
    <ChartContainer className="aspect-[4/2] w-full" title="Delegate Registration Trends">
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="w-[200px]"
                    title={`${label}`}
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
                      </div>
                    }
                  />
                )
              }
              return null
            }}
          />
          <Area type="monotone" dataKey="physical" stackId="1" stroke="#10b981" fill="#10b981" />
          <Area type="monotone" dataKey="virtual" stackId="1" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
