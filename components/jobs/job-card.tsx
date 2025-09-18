"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Clock, DollarSign, Users, Star, Bookmark } from "lucide-react"
import { cn } from "@/lib/utils"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: "Full-time" | "Part-time" | "Contract" | "Internship"
    experience: "Entry" | "Mid" | "Senior" | "Executive"
    salary?: {
      min: number
      max: number
      currency: string
    }
    description: string
    requirements: string[]
    benefits: string[]
    postedBy?: {
      name: string
      role: string
      isAlumni: boolean
    }
    postedDate: string
    applicants: number
    matchScore?: number
    isBookmarked?: boolean
    isUrgent?: boolean
  }
  onApply?: (jobId: string) => void
  onBookmark?: (jobId: string) => void
  onViewDetails?: (jobId: string) => void
  className?: string
}

export function JobCard({ job, onApply, onBookmark, onViewDetails, className }: JobCardProps) {
  const getTypeColor = () => {
    switch (job.type) {
      case "Full-time":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Part-time":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Contract":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Internship":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getExperienceColor = () => {
    switch (job.experience) {
      case "Entry":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Mid":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Senior":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Executive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatSalary = () => {
    if (!job.salary) return null
    const { min, max, currency } = job.salary
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {job.isUrgent && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
              <Badge className={getTypeColor()}>{job.type}</Badge>
              <Badge variant="outline" className={getExperienceColor()}>
                {job.experience}
              </Badge>
            </div>
            <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {job.matchScore && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{job.matchScore}%</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={() => onBookmark?.(job.id)}>
              <Bookmark className={cn("h-4 w-4", job.isBookmarked && "fill-current")} />
            </Button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

          <div className="flex items-center gap-4 text-sm">
            {job.salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium">{formatSalary()}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span>{job.applicants} applicants</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>{getTimeAgo(job.postedDate)}</span>
            </div>
          </div>

          {job.requirements.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Key Requirements</p>
              <div className="flex flex-wrap gap-1">
                {job.requirements.slice(0, 3).map((req, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {req}
                  </Badge>
                ))}
                {job.requirements.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.requirements.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {job.postedBy && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Posted by {job.postedBy.name}</span>
              {job.postedBy.isAlumni && (
                <Badge variant="outline" className="text-xs">
                  Alumni
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onApply?.(job.id)} className="flex-1">
            Apply Now
          </Button>
          <Button variant="outline" onClick={() => onViewDetails?.(job.id)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
