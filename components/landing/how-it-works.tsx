import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Zap } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Connect your community",
      description: "Import your alumni database or let members sign up directly. Our AI learns from every interaction.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Get smart recommendations",
      description:
        "Our AI analyzes profiles, interests, and goals to suggest the most relevant connections and opportunities.",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Engage and grow",
      description: "Host events, share opportunities, and watch your community thrive with meaningful connections.",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">How it works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get your alumni community up and running in minutes, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
