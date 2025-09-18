"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Calendar, MessageSquare, UserPlus } from "lucide-react"

interface AlumniCardProps {
  alumni: {
    id: string
    name: string
    graduationYear: string
    major: string
    currentRole: string
    company: string
    location: string
    bio?: string
    skills: string[]
    interests: string[]
    avatar?: string
    isAvailableForMentoring: boolean
    isOpenToNetworking: boolean
  }
  onConnect?: (id: string) => void
  onMessage?: (id: string) => void
}

export function AlumniCard({ alumni, onConnect, onMessage }: AlumniCardProps) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={alumni.avatar || "/placeholder.svg?height=60&width=60"}
            alt={alumni.name}
            className="w-15 h-15 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{alumni.name}</h3>
            <p className="text-muted-foreground text-sm">{alumni.currentRole}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Building className="h-3 w-3" />
              <span className="truncate">{alumni.company}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              Class of {alumni.graduationYear} • {alumni.major}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{alumni.location}</span>
          </div>
        </div>

        {alumni.bio && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{alumni.bio}</p>}

        <div className="space-y-3 mb-4">
          {alumni.skills.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {alumni.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {alumni.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{alumni.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {alumni.interests.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Interests</p>
              <div className="flex flex-wrap gap-1">
                {alumni.interests.slice(0, 2).map((interest, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {alumni.interests.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{alumni.interests.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {alumni.isAvailableForMentoring && (
            <Badge variant="default" className="text-xs">
              Available for Mentoring
            </Badge>
          )}
          {alumni.isOpenToNetworking && (
            <Badge variant="secondary" className="text-xs ml-1">
              Open to Networking
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => onConnect?.(alumni.id)}>
            <UserPlus className="h-3 w-3 mr-1" />
            Connect
          </Button>
          <Button size="sm" variant="outline" onClick={() => onMessage?.(alumni.id)}>
            <MessageSquare className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
