import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Alumni Relations Director",
      company: "Stanford University",
      content:
        "AlumniConnect transformed how we engage with our graduates. The AI recommendations are incredibly accurate.",
      rating: 5,
      avatar: "/professional-woman-diverse.png",
    },
    {
      name: "Michael Rodriguez",
      role: "Class of 2018",
      company: "Tech Startup Founder",
      content: "Found my co-founder through AlumniConnect. The platform made networking feel natural and meaningful.",
      rating: 5,
      avatar: "/professional-man.png",
    },
    {
      name: "Dr. Emily Watson",
      role: "Dean of Student Affairs",
      company: "MIT",
      content:
        "Our engagement rates increased by 300% after implementing AlumniConnect. Students love the mentorship matching.",
      rating: 5,
      avatar: "/professional-woman-dean.jpg",
    },
  ]

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-4">Trusted by leading institutions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how universities and alumni communities are transforming engagement with AlumniConnect.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
