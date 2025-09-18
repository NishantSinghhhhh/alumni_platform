"use client"

import { useState, useMemo } from "react"
import { JobCard } from "./job-card"
import { JobFilters } from "./job-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Plus } from "lucide-react"

// Mock job data
const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time" as const,
    experience: "Senior" as const,
    salary: { min: 150000, max: 200000, currency: "$" },
    description:
      "Join our engineering team to build scalable web applications. Work with React, Node.js, and cloud technologies.",
    requirements: ["React", "Node.js", "TypeScript", "AWS", "5+ years experience"],
    benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options"],
    postedBy: { name: "Sarah Johnson", role: "Engineering Manager", isAlumni: true },
    postedDate: "2024-01-15",
    applicants: 23,
    matchScore: 94,
    isBookmarked: false,
    isUrgent: false,
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time" as const,
    experience: "Mid" as const,
    salary: { min: 120000, max: 160000, currency: "$" },
    description: "Lead product strategy and work with cross-functional teams to deliver innovative solutions.",
    requirements: ["Product Strategy", "Data Analysis", "User Research", "3+ years experience"],
    benefits: ["Health Insurance", "Unlimited PTO", "Remote Work", "Learning Budget"],
    postedBy: { name: "Michael Chen", role: "VP of Product", isAlumni: true },
    postedDate: "2024-01-12",
    applicants: 45,
    matchScore: 87,
    isBookmarked: true,
    isUrgent: true,
  },
  {
    id: "3",
    title: "Data Scientist Intern",
    company: "DataCorp",
    location: "New York, NY",
    type: "Internship" as const,
    experience: "Entry" as const,
    salary: { min: 25, max: 35, currency: "$" },
    description: "Summer internship opportunity to work on machine learning projects and data analysis.",
    requirements: ["Python", "Machine Learning", "Statistics", "SQL"],
    benefits: ["Mentorship", "Learning Opportunities", "Networking"],
    postedBy: { name: "Dr. Emily Rodriguez", role: "Data Science Lead", isAlumni: true },
    postedDate: "2024-01-10",
    applicants: 67,
    matchScore: 91,
    isBookmarked: false,
    isUrgent: false,
  },
  {
    id: "4",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Full-time" as const,
    experience: "Mid" as const,
    salary: { min: 90000, max: 130000, currency: "$" },
    description: "Create beautiful and intuitive user experiences for web and mobile applications.",
    requirements: ["Figma", "User Research", "Prototyping", "Design Systems", "3+ years experience"],
    benefits: ["Health Insurance", "Creative Freedom", "Conference Budget", "Flexible Hours"],
    postedDate: "2024-01-08",
    applicants: 34,
    matchScore: 82,
    isBookmarked: false,
    isUrgent: false,
  },
  {
    id: "5",
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Austin, TX",
    type: "Full-time" as const,
    experience: "Mid" as const,
    salary: { min: 80000, max: 110000, currency: "$" },
    description: "Drive marketing campaigns and growth initiatives for our B2B SaaS platform.",
    requirements: ["Digital Marketing", "Analytics", "Content Strategy", "B2B Experience"],
    benefits: ["Health Insurance", "Performance Bonus", "Professional Development"],
    postedDate: "2024-01-05",
    applicants: 28,
    isBookmarked: false,
    isUrgent: false,
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Contract" as const,
    experience: "Senior" as const,
    salary: { min: 80, max: 120, currency: "$" },
    description: "6-month contract to help migrate infrastructure to cloud and implement CI/CD pipelines.",
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Infrastructure as Code"],
    benefits: ["High Hourly Rate", "Remote Work", "Flexible Schedule"],
    postedDate: "2024-01-03",
    applicants: 19,
    matchScore: 88,
    isBookmarked: false,
    isUrgent: true,
  },
]

interface JobBoardProps {
  currentUser?: {
    id: string
    role: "alumni" | "student" | "admin"
  }
}

export function JobBoard({ currentUser }: JobBoardProps) {
  const [sortBy, setSortBy] = useState("relevance")
  const [filters, setFilters] = useState<any>({})

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = mockJobs

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.requirements.some((req) => req.toLowerCase().includes(query)),
      )
    }

    // Apply type filter
    if (filters.types?.length > 0) {
      filtered = filtered.filter((job) => filters.types.includes(job.type))
    }

    // Apply experience filter
    if (filters.experience?.length > 0) {
      filtered = filtered.filter((job) => filters.experience.includes(job.experience))
    }

    // Apply location filter
    if (filters.locations?.length > 0) {
      filtered = filtered.filter((job) => filters.locations.includes(job.location))
    }

    // Apply salary range filter
    if (filters.salaryRange) {
      filtered = filtered.filter((job) => {
        if (!job.salary) return true
        const jobMin = job.type === "Contract" ? job.salary.min * 2000 : job.salary.min // Convert hourly to annual
        return jobMin >= filters.salaryRange[0] && jobMin <= filters.salaryRange[1]
      })
    }

    // Apply special filters
    if (filters.remoteOnly) {
      filtered = filtered.filter((job) => job.location.includes("Remote"))
    }

    if (filters.alumniPosted) {
      filtered = filtered.filter((job) => job.postedBy?.isAlumni)
    }

    if (filters.urgentOnly) {
      filtered = filtered.filter((job) => job.isUrgent)
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "relevance":
          return (b.matchScore || 0) - (a.matchScore || 0)
        case "date":
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        case "salary":
          const aSalary = a.salary?.max || 0
          const bSalary = b.salary?.max || 0
          return bSalary - aSalary
        case "applicants":
          return a.applicants - b.applicants
        default:
          return 0
      }
    })

    return filtered
  }, [filters, sortBy])

  const handleApply = (jobId: string) => {
    console.log(`Applying to job ${jobId}`)
    // Handle job application logic
  }

  const handleBookmark = (jobId: string) => {
    console.log(`Bookmarking job ${jobId}`)
    // Handle bookmark logic
  }

  const handleViewDetails = (jobId: string) => {
    console.log(`Viewing details for job ${jobId}`)
    // Handle view details logic
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <JobFilters onFiltersChange={setFilters} totalResults={filteredAndSortedJobs.length} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Job Board ({filteredAndSortedJobs.length} positions)</h2>
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort by Relevance</SelectItem>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="salary">Sort by Salary</SelectItem>
                  <SelectItem value="applicants">Sort by Applicants</SelectItem>
                </SelectContent>
              </Select>

              {currentUser?.role === "alumni" && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
              )}
            </div>
          </div>

          {/* Jobs List */}
          {filteredAndSortedJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredAndSortedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  onBookmark={handleBookmark}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
