"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "AGM Kigali",
    ministers: 15,
    boardMembers: 22,
    delegates: 85,
    observers: 30,
    press: 12,
    staff: 25,
  },
  {
    name: "EGM Algeria",
    ministers: 12,
    boardMembers: 18,
    delegates: 65,
    observers: 25,
    press: 10,
    staff: 20,
  },
  {
    name: "Board Q3",
    ministers: 0,
    boardMembers: 20,
    delegates: 10,
    observers: 5,
    press: 0,
    staff: 15,
  },
  {
    name: "Housing Forum",
    ministers: 8,
    boardMembers: 12,
    delegates: 120,
    observers: 40,
    press: 18,
    staff: 22,
  },
]

export function EventsOverviewChart() {
  return (
    <ChartContainer className="aspect-[4/2] w-full" title="Event Attendance by Category">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="w-[200px]"
                    title={label}
                    content={
                      <div className="flex flex-col gap-2">
                        {payload.map((entry, index) => (
                          <div key={`item-${index}`} className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry?.color || "#ccc" }}
                              ></span>
                              <span>{entry?.name || ""}</span>
                            </span>
                            <span>{entry?.value || 0}</span>
                          </div>
                        ))}
                      </div>
                    }
                  />
                )
              }
              return null
            }}
          />
          <Legend />
          <Bar dataKey="ministers" fill="#8884d8" />
          <Bar dataKey="boardMembers" fill="#82ca9d" />
          <Bar dataKey="delegates" fill="#ffc658" />
          <Bar dataKey="observers" fill="#ff8042" />
          <Bar dataKey="press" fill="#0088fe" />
          <Bar dataKey="staff" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
