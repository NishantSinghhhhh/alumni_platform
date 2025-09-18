import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8">
            <TrendingUp className="mr-2 h-4 w-4" />
            AI-powered alumni engagement
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance mb-6">
            The better way to <span className="text-primary">connect</span> your alumni community
          </h1>

          {/* Subheading */}
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto mb-10">
            Intelligent networking that brings together alumni, students, and institutions. Building meaningful
            connections through AI-driven recommendations and personalized engagement.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/register">
                Get started free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 bg-transparent" asChild>
              <Link href="/demo">Book a demo</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-semibold mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Alumni connected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Match accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold mb-1">2.5M</div>
              <div className="text-sm text-muted-foreground">Connections made</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
