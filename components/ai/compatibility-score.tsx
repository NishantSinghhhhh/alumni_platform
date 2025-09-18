import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CompatibilityScoreProps {
  score: number
  factors?: {
    name: string
    weight: number
    match: number
  }[]
  className?: string
}

export function CompatibilityScore({ score, factors, className }: CompatibilityScoreProps) {
  const getScoreColor = () => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-gray-600"
  }

  const getScoreLabel = () => {
    if (score >= 90) return "Excellent Match"
    if (score >= 80) return "Great Match"
    if (score >= 70) return "Good Match"
    return "Fair Match"
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className={cn("h-5 w-5", getScoreColor())} />
          <span className="font-semibold">Compatibility Score</span>
        </div>
        <div className="text-right">
          <div className={cn("text-2xl font-bold", getScoreColor())}>{score}%</div>
          <div className="text-sm text-muted-foreground">{getScoreLabel()}</div>
        </div>
      </div>

      <Progress value={score} className="h-2" />

      {factors && factors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Matching Factors
          </div>
          {factors.map((factor, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{factor.name}</span>
                <span className="font-medium">{factor.match}%</span>
              </div>
              <Progress value={factor.match} className="h-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
