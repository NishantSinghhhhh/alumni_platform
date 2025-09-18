"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, Briefcase } from "lucide-react"

interface JobFiltersProps {
  onFiltersChange: (filters: any) => void
  totalResults: number
}

export function JobFilters({ onFiltersChange, totalResults }: JobFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [salaryRange, setSalaryRange] = useState([0, 200000])
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [alumniPosted, setAlumniPosted] = useState(false)
  const [urgentOnly, setUrgentOnly] = useState(false)

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]
  const experienceLevels = ["Entry", "Mid", "Senior", "Executive"]
  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Los Angeles, CA",
    "Seattle, WA",
    "Boston, MA",
    "Chicago, IL",
    "Austin, TX",
    "Remote",
  ]
  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Consulting",
    "Marketing",
    "Non-profit",
    "Government",
    "Entertainment",
    "Retail",
  ]

  const handleSearch = () => {
    const filters = {
      searchQuery,
      types: selectedTypes,
      experience: selectedExperience,
      locations: selectedLocations,
      industries: selectedIndustries,
      salaryRange,
      remoteOnly,
      alumniPosted,
      urgentOnly,
    }
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTypes([])
    setSelectedExperience([])
    setSelectedLocations([])
    setSelectedIndustries([])
    setSalaryRange([0, 200000])
    setRemoteOnly(false)
    setAlumniPosted(false)
    setUrgentOnly(false)
    onFiltersChange({})
  }

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "type":
        setSelectedTypes(selectedTypes.filter((t) => t !== value))
        break
      case "experience":
        setSelectedExperience(selectedExperience.filter((e) => e !== value))
        break
      case "location":
        setSelectedLocations(selectedLocations.filter((l) => l !== value))
        break
      case "industry":
        setSelectedIndustries(selectedIndustries.filter((i) => i !== value))
        break
    }
  }

  const activeFilters = [
    ...selectedTypes.map((t) => ({ type: "type", value: t, label: t })),
    ...selectedExperience.map((e) => ({ type: "experience", value: e, label: e })),
    ...selectedLocations.map((l) => ({ type: "location", value: l, label: l })),
    ...selectedIndustries.map((i) => ({ type: "industry", value: i, label: i })),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Job Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Bar */}
        <div className="space-y-2">
          <Label htmlFor="search">Search jobs</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Job Type Filter */}
        <div className="space-y-2">
          <Label>Job Type</Label>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTypes([...selectedTypes, type])
                    } else {
                      setSelectedTypes(selectedTypes.filter((t) => t !== type))
                    }
                  }}
                />
                <Label htmlFor={type} className="text-sm font-normal">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={level}
                  checked={selectedExperience.includes(level)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedExperience([...selectedExperience, level])
                    } else {
                      setSelectedExperience(selectedExperience.filter((e) => e !== level))
                    }
                  }}
                />
                <Label htmlFor={level} className="text-sm font-normal">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Select
            value=""
            onValueChange={(value) => {
              if (value && !selectedLocations.includes(value)) {
                setSelectedLocations([...selectedLocations, value])
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations
                .filter((location) => !selectedLocations.includes(location))
                .map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Industry Filter */}
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select
            value=""
            onValueChange={(value) => {
              if (value && !selectedIndustries.includes(value)) {
                setSelectedIndustries([...selectedIndustries, value])
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries
                .filter((industry) => !selectedIndustries.includes(industry))
                .map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Salary Range */}
        <div className="space-y-3">
          <Label>Salary Range</Label>
          <div className="px-2">
            <Slider
              value={salaryRange}
              onValueChange={setSalaryRange}
              max={200000}
              min={0}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${salaryRange[0].toLocaleString()}</span>
              <span>${salaryRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Special Filters */}
        <div className="space-y-3">
          <Label>Special Filters</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="remote" checked={remoteOnly} onCheckedChange={setRemoteOnly} />
              <Label htmlFor="remote" className="text-sm font-normal">
                Remote only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="alumni" checked={alumniPosted} onCheckedChange={setAlumniPosted} />
              <Label htmlFor="alumni" className="text-sm font-normal">
                Posted by alumni
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="urgent" checked={urgentOnly} onCheckedChange={setUrgentOnly} />
              <Label htmlFor="urgent" className="text-sm font-normal">
                Urgent positions only
              </Label>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <Label>Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {filter.label}
                  <button
                    onClick={() => removeFilter(filter.type, filter.value)}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1">
            <Briefcase className="h-4 w-4 mr-2" />
            Search ({totalResults})
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
