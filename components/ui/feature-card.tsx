import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export function FeatureCard({ title, description, icon, className, children }: FeatureCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        {icon && <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">{icon}</div>}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {children}
      </CardContent>
    </Card>
  )
}
