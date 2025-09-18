"use client"
import { Header } from "@/components/layout/header"
import { RecommendationsFeed } from "@/components/ai/recommendations-feed"

// Mock user data - in real app this would come from authentication
const mockUser = {
  name: "Sarah Johnson",
  role: "alumni" as const,
  graduationYear: "2018",
  major: "Computer Science",
  company: "Google",
  jobTitle: "Senior Software Engineer",
}

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">AI Recommendations</h1>
          <p className="text-muted-foreground">
            Discover personalized connections, opportunities, and experiences tailored just for you.
          </p>
        </div>
        <RecommendationsFeed userRole={mockUser.role} />
      </main>
    </div>
  )
}
