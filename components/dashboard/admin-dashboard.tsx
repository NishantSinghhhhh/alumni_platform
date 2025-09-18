import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/ui/stats-card"
import { Users, TrendingUp, Calendar, DollarSign, Activity, AlertCircle } from "lucide-react"

interface AdminDashboardProps {
  user: {
    name: string
    institution: string
    role: string
  }
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const stats = [
    {
      title: "Total Alumni",
      value: "12,847",
      description: "Registered members",
      trend: { value: 8, label: "this month" },
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Active Connections",
      value: "3,421",
      description: "Monthly active users",
      trend: { value: 15, label: "vs last month" },
      icon: <Activity className="h-4 w-4" />,
    },
    {
      title: "Events This Month",
      value: "24",
      description: "Scheduled events",
      trend: { value: 12, label: "vs last month" },
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Fundraising Goal",
      value: "$2.1M",
      description: "85% of annual target",
      trend: { value: 23, label: "this quarter" },
      icon: <DollarSign className="h-4 w-4" />,
    },
  ]

  const engagementMetrics = [
    { metric: "Profile Completion Rate", value: "78%", change: "+5%" },
    { metric: "Monthly Active Users", value: "3,421", change: "+12%" },
    { metric: "Event Attendance Rate", value: "64%", change: "+8%" },
    { metric: "Job Board Engagement", value: "892", change: "+18%" },
    { metric: "Mentorship Matches", value: "156", change: "+25%" },
  ]

  const recentAlerts = [
    {
      type: "warning",
      title: "Low engagement in Engineering alumni",
      description: "Consider targeted outreach campaign",
      time: "2 hours ago",
    },
    {
      type: "success",
      title: "Fundraising milestone reached",
      description: "Q1 target exceeded by 15%",
      time: "1 day ago",
    },
    {
      type: "info",
      title: "New feature: AI job matching",
      description: "Ready for beta testing with select users",
      time: "2 days ago",
    },
  ]

  const topPerformingEvents = [
    { name: "Tech Alumni Networking", attendees: 156, satisfaction: 4.8 },
    { name: "Career Fair 2024", attendees: 342, satisfaction: 4.6 },
    { name: "Alumni Mentorship Launch", attendees: 89, satisfaction: 4.9 },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {user.role} • {user.institution}
          </p>
        </div>
        <div className="flex gap-3 mt-4 lg:mt-0">
          <Button variant="outline">Export Data</Button>
          <Button>Create Event</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Engagement Metrics */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Engagement Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{metric.metric}</p>
                      <p className="text-2xl font-semibold">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{metric.change}</span>
                      <p className="text-xs text-muted-foreground">vs last period</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === "warning"
                          ? "bg-yellow-500"
                          : alert.type === "success"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing Events */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {topPerformingEvents.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{event.name}</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attendees</span>
                    <span className="font-medium">{event.attendees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Satisfaction</span>
                    <span className="font-medium">{event.satisfaction}/5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
