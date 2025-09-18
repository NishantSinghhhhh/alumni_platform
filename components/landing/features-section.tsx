import { FeatureCard } from "@/components/ui/feature-card"
import { Brain, Users, Briefcase, Calendar, Shield, BarChart3 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect alumni and students based on shared interests, career paths, and goals.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Alumni Directory",
      description: "Comprehensive searchable directory with advanced filters for finding the right connections.",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Job Board",
      description: "Exclusive job opportunities shared by alumni and partner companies in your network.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Event Management",
      description: "Create, discover, and manage alumni events with integrated RSVP and calendar sync.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Granular privacy controls and data protection compliance built into every feature.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Dashboard",
      description: "Track engagement metrics and measure the success of your alumni programs.",
    },
  ]

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Everything you need for alumni engagement</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to strengthen connections and drive meaningful engagement across your entire
            alumni community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  )
}
