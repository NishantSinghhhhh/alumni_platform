"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Target, Users } from "lucide-react"

interface RecommendationEngineProps {
  userId: string
  userProfile: {
    role: "alumni" | "student" | "admin"
    interests: string[]
    skills: string[]
    goals: string[]
    location?: string
    industry?: string
  }
}

export function RecommendationEngine({ userId, userProfile }: RecommendationEngineProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [insights, setInsights] = useState<{
    networkStrength: number
    engagementLevel: number
    careerAlignment: number
    recommendations: number
  } | null>(null)

  const runAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setInsights({
      networkStrength: Math.floor(Math.random() * 30) + 70,
      engagementLevel: Math.floor(Math.random() * 25) + 75,
      careerAlignment: Math.floor(Math.random() * 20) + 80,
      recommendations: Math.floor(Math.random() * 10) + 15,
    })

    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  useEffect(() => {
    // Auto-run analysis on component mount
    runAnalysis()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Recommendation Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAnalyzing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Analyzing your profile and network...</p>
          </div>
        )}

        {analysisComplete && insights && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{insights.networkStrength}%</div>
                <div className="text-xs text-muted-foreground">Network Strength</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Zap className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{insights.engagementLevel}%</div>
                <div className="text-xs text-muted-foreground">Engagement Level</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{insights.careerAlignment}%</div>
                <div className="text-xs text-muted-foreground">Career Alignment</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Brain className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{insights.recommendations}</div>
                <div className="text-xs text-muted-foreground">New Recommendations</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Your Profile Analysis</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Interests:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userProfile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userProfile.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Goals:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {userProfile.goals.map((goal, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={runAnalysis} className="w-full" disabled={isAnalyzing}>
              Re-analyze Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
