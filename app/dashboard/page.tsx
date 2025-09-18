"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { AlumniDashboard } from "@/components/dashboard/alumni-dashboard"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

// Mock user data - in real app this would come from authentication
const mockUsers = {
  alumni: {
    name: "Sarah Johnson",
    role: "alumni" as const,
    graduationYear: "2018",
    major: "Computer Science",
    company: "Google",
    jobTitle: "Senior Software Engineer",
  },
  student: {
    name: "Alex Chen",
    role: "student" as const,
    major: "Computer Science",
    graduationYear: "2025",
    university: "Stanford University",
  },
  admin: {
    name: "Dr. Emily Watson",
    role: "admin" as const,
    institution: "Stanford University",
    jobTitle: "Alumni Relations Director",
  },
}

export default function DashboardPage() {
  const [currentUser] = useState(mockUsers.alumni) // Change this to test different roles

  const renderDashboard = () => {
    switch (currentUser.role) {
      case "alumni":
        return <AlumniDashboard user={currentUser} />
      case "student":
        return <StudentDashboard user={mockUsers.student} />
      case "admin":
        return <AdminDashboard user={mockUsers.admin} />
      default:
        return <AlumniDashboard user={currentUser} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderDashboard()}</main>
    </div>
  )
}
