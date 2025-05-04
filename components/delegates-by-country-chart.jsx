"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

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
  return (
    <ChartContainer config={{
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length && payload[0]) {
                return (
                  <ChartTooltipContent
                    className="w-[150px]"
                    title={payload[0].name || ""}
                    content={
                      <div className="flex items-center justify-between">
                        <span>Delegates:</span>
                        <span>{payload[0].value || 0}</span>
                      </div>
                    }
                  />
                )
              }
              return null
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
