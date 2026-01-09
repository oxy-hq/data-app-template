interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number | null | undefined
    color?: string
    dataKey?: string
    payload?: Record<string, unknown>
  }>
  label?: string | number
  labelFormatter?: (label: string | number) => string
  valueFormatter?: (value: number | null | undefined) => string
}

export function CustomTooltip({ active, payload, label, labelFormatter, valueFormatter }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const formatLabel = (value: string | number | undefined) => {
    if (value === undefined || value === null) return "N/A"
    if (labelFormatter) return labelFormatter(value)
    return String(value)
  }

  const formatValue = (value: number | null | undefined) => {
    if (value === undefined || value === null) return "N/A"
    if (valueFormatter) return valueFormatter(value)
    return value.toLocaleString()
  }

  return (
    <div className="rounded-lg border border-border bg-background p-3 shadow-lg">
      <p className="mb-2 font-medium text-foreground">{formatLabel(label)}</p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color || "hsl(var(--chart-1))" }} />
            <span className="text-sm text-muted-foreground">{entry.name}:</span>
            <span className="text-sm font-semibold text-foreground">{formatValue(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
