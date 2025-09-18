"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Briefcase, Calendar, MessageSquare, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecommendationCardProps {
  type: "connection" | "mentor" | "job" | "event" | "opportunity"
  title: string
  description: string
  compatibility: number
  metadata?: {
    name?: string
    company?: string
    location?: string
    date?: string
    skills?: string[]
    experience?: string
  }
  onAction?: () => void
  actionLabel?: string
  className?: string
}

export function RecommendationCard({
  type,
  title,
  description,
  compatibility,
  metadata,
  onAction,
  actionLabel = "Connect",
  className,
}: RecommendationCardProps) {
  const getIcon = () => {
    switch (type) {
      case "connection":
        return <Users className="h-4 w-4" />
      case "mentor":
        return <MessageSquare className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "connection":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "mentor":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "job":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "event":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "opportunity":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getCompatibilityColor = () => {
    if (compatibility >= 90) return "text-green-600"
    if (compatibility >= 80) return "text-blue-600"
    if (compatibility >= 70) return "text-yellow-600"
    return "text-gray-600"
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={getTypeColor()}>
              {getIcon()}
              <span className="ml-1 capitalize">{type}</span>
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Star className={cn("h-4 w-4", getCompatibilityColor())} />
            <span className={cn("text-sm font-medium", getCompatibilityColor())}>{compatibility}%</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          {metadata && (
            <div className="space-y-2">
              {metadata.name && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Name:</span>
                  <span>{metadata.name}</span>
                </div>
              )}
              {metadata.company && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Company:</span>
                  <span>{metadata.company}</span>
                </div>
              )}
              {metadata.location && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Location:</span>
                  <span>{metadata.location}</span>
                </div>
              )}
              {metadata.date && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Date:</span>
                  <span>{metadata.date}</span>
                </div>
              )}
              {metadata.experience && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Experience:</span>
                  <span>{metadata.experience}</span>
                </div>
              )}
              {metadata.skills && metadata.skills.length > 0 && (
                <div className="space-y-1">
                  <span className="text-sm font-medium">Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {metadata.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {metadata.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{metadata.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Button onClick={onAction} className="w-full">
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
