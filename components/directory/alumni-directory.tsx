"use client"

import { useState, useMemo } from "react"
import { AlumniCard } from "./alumni-card"
import { SearchFilters } from "./search-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Users } from "lucide-react"

// Mock alumni data
const mockAlumni = [
  {
    id: "1",
    name: "Sarah Johnson",
    graduationYear: "2018",
    major: "Computer Science",
    currentRole: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    bio: "Passionate about AI/ML and building scalable systems. Love mentoring junior developers.",
    skills: ["Python", "Machine Learning", "React", "AWS", "Leadership"],
    interests: ["AI/ML", "Startups", "Mentoring", "Rock Climbing"],
    avatar: "/professional-woman-diverse.png",
    isAvailableForMentoring: true,
    isOpenToNetworking: true,
  },
  {
    id: "2",
    name: "Michael Chen",
    graduationYear: "2019",
    major: "Business Administration",
    currentRole: "Product Manager",
    company: "Meta",
    location: "Menlo Park, CA",
    bio: "Product leader focused on user experience and growth. Former startup founder.",
    skills: ["Product Strategy", "Data Analysis", "User Research", "SQL", "A/B Testing"],
    interests: ["Product Design", "Entrepreneurship", "Travel", "Photography"],
    avatar: "/professional-man.png",
    isAvailableForMentoring: false,
    isOpenToNetworking: true,
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    graduationYear: "2015",
    major: "Biology",
    currentRole: "Research Scientist",
    company: "Genentech",
    location: "South San Francisco, CA",
    bio: "Biotech researcher working on cancer therapeutics. PhD in Molecular Biology.",
    skills: ["Research", "Data Analysis", "Python", "R", "Scientific Writing"],
    interests: ["Biotech", "Healthcare", "Science Communication", "Hiking"],
    avatar: "/professional-woman-dean.jpg",
    isAvailableForMentoring: true,
    isOpenToNetworking: false,
  },
  {
    id: "4",
    name: "David Kim",
    graduationYear: "2020",
    major: "Economics",
    currentRole: "Investment Analyst",
    company: "Goldman Sachs",
    location: "New York, NY",
    bio: "Finance professional specializing in tech investments. CFA charterholder.",
    skills: ["Financial Modeling", "Valuation", "Excel", "Bloomberg", "Research"],
    interests: ["Finance", "Technology", "Basketball", "Cooking"],
    isAvailableForMentoring: true,
    isOpenToNetworking: true,
  },
  {
    id: "5",
    name: "Lisa Wang",
    graduationYear: "2017",
    major: "Psychology",
    currentRole: "UX Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    bio: "UX designer passionate about creating inclusive and accessible experiences.",
    skills: ["UX Design", "User Research", "Figma", "Prototyping", "Design Systems"],
    interests: ["Design", "Accessibility", "Travel", "Art"],
    isAvailableForMentoring: true,
    isOpenToNetworking: true,
  },
  {
    id: "6",
    name: "James Thompson",
    graduationYear: "2016",
    major: "Engineering",
    currentRole: "Engineering Manager",
    company: "Tesla",
    location: "Austin, TX",
    bio: "Engineering leader focused on sustainable technology and team development.",
    skills: ["Engineering Management", "Python", "Mechanical Engineering", "Leadership"],
    interests: ["Sustainability", "Electric Vehicles", "Team Building", "Golf"],
    isAvailableForMentoring: true,
    isOpenToNetworking: true,
  },
]

interface AlumniDirectoryProps {
  currentUser?: {
    id: string
    role: "alumni" | "student" | "admin"
  }
}

export function AlumniDirectory({ currentUser }: AlumniDirectoryProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [filters, setFilters] = useState<any>({})

  const filteredAndSortedAlumni = useMemo(() => {
    let filtered = mockAlumni

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(query) ||
          alumni.company.toLowerCase().includes(query) ||
          alumni.currentRole.toLowerCase().includes(query) ||
          alumni.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          alumni.interests.some((interest) => interest.toLowerCase().includes(query)),
      )
    }

    // Apply major filter
    if (filters.majors?.length > 0) {
      filtered = filtered.filter((alumni) => filters.majors.includes(alumni.major))
    }

    // Apply graduation year filter
    if (filters.years?.length > 0) {
      filtered = filtered.filter((alumni) => filters.years.includes(alumni.graduationYear))
    }

    // Apply location filter
    if (filters.locations?.length > 0) {
      filtered = filtered.filter((alumni) => filters.locations.includes(alumni.location))
    }

    // Apply availability filters
    if (filters.availableForMentoring) {
      filtered = filtered.filter((alumni) => alumni.isAvailableForMentoring)
    }

    if (filters.openToNetworking) {
      filtered = filtered.filter((alumni) => alumni.isOpenToNetworking)
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "year":
          return Number.parseInt(b.graduationYear) - Number.parseInt(a.graduationYear)
        case "company":
          return a.company.localeCompare(b.company)
        default:
          return 0
      }
    })

    return filtered
  }, [filters, sortBy])

  const handleConnect = (alumniId: string) => {
    console.log(`Connecting with alumni ${alumniId}`)
    // Handle connection logic
  }

  const handleMessage = (alumniId: string) => {
    console.log(`Messaging alumni ${alumniId}`)
    // Handle messaging logic
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <SearchFilters onFiltersChange={setFilters} totalResults={filteredAndSortedAlumni.length} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Alumni Directory ({filteredAndSortedAlumni.length} members)</h2>
            </div>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="year">Sort by Year</SelectItem>
                  <SelectItem value="company">Sort by Company</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Alumni Grid/List */}
          {filteredAndSortedAlumni.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredAndSortedAlumni.map((alumni) => (
                <AlumniCard key={alumni.id} alumni={alumni} onConnect={handleConnect} onMessage={handleMessage} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No alumni found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
