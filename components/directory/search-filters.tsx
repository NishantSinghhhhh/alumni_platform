"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void
  totalResults: number
}

export function SearchFilters({ onFiltersChange, totalResults }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMajors, setSelectedMajors] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [availableForMentoring, setAvailableForMentoring] = useState(false)
  const [openToNetworking, setOpenToNetworking] = useState(false)

  const majors = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Economics",
    "Biology",
    "Mathematics",
    "English",
    "Political Science",
    "Art & Design",
  ]

  const graduationYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"]

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
      majors: selectedMajors,
      years: selectedYears,
      locations: selectedLocations,
      industries: selectedIndustries,
      availableForMentoring,
      openToNetworking,
    }
    onFiltersChange(filters)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedMajors([])
    setSelectedYears([])
    setSelectedLocations([])
    setSelectedIndustries([])
    setAvailableForMentoring(false)
    setOpenToNetworking(false)
    onFiltersChange({})
  }

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "major":
        setSelectedMajors(selectedMajors.filter((m) => m !== value))
        break
      case "year":
        setSelectedYears(selectedYears.filter((y) => y !== value))
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
    ...selectedMajors.map((m) => ({ type: "major", value: m, label: m })),
    ...selectedYears.map((y) => ({ type: "year", value: y, label: `Class of ${y}` })),
    ...selectedLocations.map((l) => ({ type: "location", value: l, label: l })),
    ...selectedIndustries.map((i) => ({ type: "industry", value: i, label: i })),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Bar */}
        <div className="space-y-2">
          <Label htmlFor="search">Search alumni</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Major Filter */}
        <div className="space-y-2">
          <Label>Major</Label>
          <Select
            value=""
            onValueChange={(value) => {
              if (value && !selectedMajors.includes(value)) {
                setSelectedMajors([...selectedMajors, value])
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select major" />
            </SelectTrigger>
            <SelectContent>
              {majors
                .filter((major) => !selectedMajors.includes(major))
                .map((major) => (
                  <SelectItem key={major} value={major}>
                    {major}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Graduation Year Filter */}
        <div className="space-y-2">
          <Label>Graduation Year</Label>
          <Select
            value=""
            onValueChange={(value) => {
              if (value && !selectedYears.includes(value)) {
                setSelectedYears([...selectedYears, value])
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {graduationYears
                .filter((year) => !selectedYears.includes(year))
                .map((year) => (
                  <SelectItem key={year} value={year}>
                    Class of {year}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
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

        {/* Availability Filters */}
        <div className="space-y-3">
          <Label>Availability</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="mentoring" checked={availableForMentoring} onCheckedChange={setAvailableForMentoring} />
              <Label htmlFor="mentoring" className="text-sm font-normal">
                Available for mentoring
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="networking" checked={openToNetworking} onCheckedChange={setOpenToNetworking} />
              <Label htmlFor="networking" className="text-sm font-normal">
                Open to networking
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
