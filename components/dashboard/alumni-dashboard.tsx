import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/ui/stats-card"
import { Users, Briefcase, Calendar, MessageSquare, TrendingUp, Star } from "lucide-react"

interface AlumniDashboardProps {
  user: {
    name: string
    graduationYear: string
    major: string
    company: string
    jobTitle: string
  }
}

export function AlumniDashboard({ user }: AlumniDashboardProps) {
  const stats = [
    {
      title: "Network Connections",
      value: "127",
      description: "Active connections",
      trend: { value: 12, label: "this month" },
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Mentoring Sessions",
      value: "8",
      description: "Students mentored",
      trend: { value: 3, label: "this quarter" },
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      title: "Job Referrals",
      value: "5",
      description: "Successful referrals",
      trend: { value: 25, label: "this year" },
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "Events Attended",
      value: "12",
      description: "This year",
      icon: <Calendar className="h-4 w-4" />,
    },
  ]

  const recentActivity = [
    {
      type: "connection",
      title: "New connection request from Sarah Chen",
      time: "2 hours ago",
      action: "Accept",
    },
    {
      type: "mentoring",
      title: "Mentoring session with Alex Johnson scheduled",
      time: "1 day ago",
      action: "View",
    },
    {
      type: "job",
      title: "Job opportunity shared: Senior Developer at TechCorp",
      time: "2 days ago",
      action: "Share",
    },
    {
      type: "event",
      title: "Alumni Networking Event - San Francisco",
      time: "3 days ago",
      action: "RSVP",
    },
  ]

  const aiRecommendations = [
    {
      type: "connection",
      title: "Connect with Maria Rodriguez",
      description: "Fellow Computer Science graduate working in AI/ML",
      compatibility: 95,
    },
    {
      type: "mentoring",
      title: "Mentor David Kim",
      description: "Current student interested in your career path",
      compatibility: 88,
    },
    {
      type: "opportunity",
      title: "Speaking Opportunity",
      description: "Tech conference looking for industry speakers",
      compatibility: 92,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back, {user.name}</h1>
          <p className="text-muted-foreground mt-1">
            {user.jobTitle} at {user.company} • Class of {user.graduationYear}
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button variant="outline">Update Profile</Button>
          <Button>Share Opportunity</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* AI Recommendations */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{rec.compatibility}% match</span>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    {activity.action}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
