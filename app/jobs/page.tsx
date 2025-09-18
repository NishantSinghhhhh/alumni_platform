import { Header } from "@/components/layout/header"
import { JobBoard } from "@/components/jobs/job-board"

// Mock user data - in real app this would come from authentication
const mockUser = {
  id: "current-user",
  name: "Current User",
  role: "student" as const,
}

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Job Board</h1>
          <p className="text-muted-foreground">
            Discover exclusive job opportunities shared by alumni and partner companies in your network.
          </p>
        </div>
        <JobBoard currentUser={mockUser} />
      </main>
    </div>
  )
}
