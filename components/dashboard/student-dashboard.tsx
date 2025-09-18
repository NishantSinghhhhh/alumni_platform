import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/ui/stats-card"
import { Users, Briefcase, GraduationCap, MessageSquare, TrendingUp, Star } from "lucide-react"

interface StudentDashboardProps {
  user: {
    name: string
    major: string
    graduationYear: string
    university: string
  }
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const stats = [
    {
      title: "Mentor Connections",
      value: "3",
      description: "Active mentors",
      trend: { value: 1, label: "this month" },
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Job Applications",
      value: "12",
      description: "Through platform",
      trend: { value: 4, label: "this week" },
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Skills Developed",
      value: "8",
      description: "New competencies",
      trend: { value: 2, label: "this month" },
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      title: "Networking Events",
      value: "5",
      description: "Attended this year",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  const mentorRecommendations = [
    {
      name: "Dr. Sarah Johnson",
      title: "Senior Software Engineer at Google",
      experience: "10+ years in tech",
      compatibility: 96,
      expertise: ["Machine Learning", "Career Development", "Technical Leadership"],
    },
    {
      name: "Michael Chen",
      title: "Product Manager at Meta",
      experience: "8 years in product",
      compatibility: 89,
      expertise: ["Product Strategy", "User Research", "Team Management"],
    },
    {
      name: "Emily Rodriguez",
      title: "Data Scientist at Netflix",
      experience: "6 years in data science",
      compatibility: 92,
      expertise: ["Data Analysis", "Python", "Statistical Modeling"],
    },
  ]

  const jobOpportunities = [
    {
      title: "Software Engineering Intern",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Internship",
      posted: "2 days ago",
      match: 94,
    },
    {
      title: "Product Management Trainee",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      match: 87,
    },
    {
      title: "Data Analyst Intern",
      company: "DataCorp",
      location: "New York, NY",
      type: "Internship",
      posted: "3 days ago",
      match: 91,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            {user.major} • Class of {user.graduationYear} • {user.university}
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button variant="outline">Update Profile</Button>
          <Button>Find Mentors</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recommended Mentors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recommended Mentors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mentorRecommendations.map((mentor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{mentor.name}</h4>
                    <p className="text-sm text-muted-foreground">{mentor.title}</p>
                    <p className="text-xs text-muted-foreground">{mentor.experience}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{mentor.compatibility}%</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.expertise.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {mentor.expertise.length > 2 && (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                      +{mentor.expertise.length - 2} more
                    </span>
                  )}
                </div>
                <Button size="sm" className="w-full">
                  Request Mentorship
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Job Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jobOpportunities.map((job, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {job.company} • {job.location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                        {job.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{job.posted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{job.match}%</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Apply Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
