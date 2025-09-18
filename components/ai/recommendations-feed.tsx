"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecommendationCard } from "./recommendation-card"
import { Brain, Filter, RefreshCw } from "lucide-react"

interface Recommendation {
  id: string
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
  actionLabel?: string
}

interface RecommendationsFeedProps {
  userRole: "alumni" | "student" | "admin"
}

export function RecommendationsFeed({ userRole }: RecommendationsFeedProps) {
  const [filter, setFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock recommendations data - in real app this would come from AI service
  const mockRecommendations: Recommendation[] = [
    {
      id: "1",
      type: "connection",
      title: "Connect with Maria Rodriguez",
      description: "Fellow Computer Science graduate working in AI/ML at Meta",
      compatibility: 95,
      metadata: {
        name: "Maria Rodriguez",
        company: "Meta",
        location: "Menlo Park, CA",
        skills: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
        experience: "5 years",
      },
      actionLabel: "Send Connection Request",
    },
    {
      id: "2",
      type: "mentor",
      title: "Mentor David Kim",
      description: "Current CS student interested in your career path in tech leadership",
      compatibility: 88,
      metadata: {
        name: "David Kim",
        company: "Stanford University",
        location: "Stanford, CA",
        skills: ["JavaScript", "React", "Node.js"],
        experience: "Student - Junior year",
      },
      actionLabel: "Offer Mentorship",
    },
    {
      id: "3",
      type: "job",
      title: "Senior Software Engineer",
      description: "Perfect match for your skills at a growing fintech startup",
      compatibility: 92,
      metadata: {
        company: "FinTech Innovations",
        location: "San Francisco, CA",
        skills: ["React", "Node.js", "AWS", "TypeScript"],
      },
      actionLabel: "View Job Details",
    },
    {
      id: "4",
      type: "event",
      title: "AI in Healthcare Symposium",
      description: "Speaking opportunity at a conference aligned with your expertise",
      compatibility: 89,
      metadata: {
        date: "March 15, 2024",
        location: "San Francisco, CA",
        company: "Healthcare Innovation Hub",
      },
      actionLabel: "Apply to Speak",
    },
    {
      id: "5",
      type: "opportunity",
      title: "Board Advisory Position",
      description: "Startup seeking technical advisor with your background",
      compatibility: 91,
      metadata: {
        company: "EduTech Startup",
        location: "Remote",
        skills: ["Technical Leadership", "Product Strategy", "EdTech"],
      },
      actionLabel: "Learn More",
    },
  ]

  const filteredRecommendations = mockRecommendations.filter((rec) => {
    if (filter === "all") return true
    return rec.type === filter
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleAction = (id: string) => {
    console.log(`Action triggered for recommendation ${id}`)
    // Handle specific actions based on recommendation type
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Recommendations
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="connection">Connections</SelectItem>
                  <SelectItem value="mentor">Mentoring</SelectItem>
                  <SelectItem value="job">Jobs</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                  <SelectItem value="opportunity">Opportunities</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Personalized recommendations powered by AI analysis of your profile, interests, and network.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                type={recommendation.type}
                title={recommendation.title}
                description={recommendation.description}
                compatibility={recommendation.compatibility}
                metadata={recommendation.metadata}
                actionLabel={recommendation.actionLabel}
                onAction={() => handleAction(recommendation.id)}
              />
            ))}
          </div>

          {filteredRecommendations.length === 0 && (
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No recommendations found</h3>
              <p className="text-muted-foreground">Try adjusting your filter or refresh to get new recommendations.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
