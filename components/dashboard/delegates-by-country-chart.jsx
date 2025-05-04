"use client"

import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Download } from "lucide-react"

// Sample data
const data = [
  { name: "Kenya", value: 45, color: "#8884d8" },
  { name: "Rwanda", value: 32, color: "#82ca9d" },
  { name: "Ghana", value: 28, color: "#ffc658" },
  { name: "Zimbabwe", value: 22, color: "#ff8042" },
  { name: "Nigeria", value: 20, color: "#0088fe" },
  { name: "South Africa", value: 18, color: "#00C49F" },
  { name: "Algeria", value: 15, color: "#FFBB28" },
  { name: "Cameroon", value: 12, color: "#FF8042" },
  { name: "Tanzania", value: 10, color: "#0088FE" },
  { name: "Uganda", value: 8, color: "#00C49F" },
]

export function DelegatesByCountryChart() {
  const [sortBy, setSortBy] = useState<"value" | "name">("value")

  // Sort data based on sortBy state
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === "value") {
      return b.value - a.value
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  const toggleSort = () => {
    setSortBy(sortBy === "value" ? "name" : "value")
  }

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Delegates by Country</CardTitle>
          <CardDescription>Top 10 countries by delegate count</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleSort}>
            <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
            Sort by {sortBy === "value" ? "Name" : "Count"}
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <ChartContainer className="aspect-square w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sortedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    {sortedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0 && payload[0] && payload[0].payload) {
                        const data = payload[0].payload
                        return (
                          <ChartTooltipContent
                            className="w-[150px]"
                            title={data.name || ""}
                            content={
                              <div className="flex items-center justify-between">
                                <span>Delegates:</span>
                                <span className="font-medium">{data.value || 0}</span>
                              </div>
                            }
                          />
                        )
                      }
                      return null
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <div className="space-y-4">
              {sortedData.map((country, index) => (
                <div key={country.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: country.color }} />
                    <span className="text-sm">{country.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(country.value / sortedData[0].value) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{country.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
