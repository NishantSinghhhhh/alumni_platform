import { Header } from "@/components/layout/header"
import { AlumniDirectory } from "@/components/directory/alumni-directory"

// Mock user data - in real app this would come from authentication
const mockUser = {
  id: "current-user",
  name: "Current User",
  role: "alumni" as const,
}

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground">
            Connect with fellow alumni, find mentors, and expand your professional network.
          </p>
        </div>
        <AlumniDirectory currentUser={mockUser} />
      </main>
    </div>
  )
}
