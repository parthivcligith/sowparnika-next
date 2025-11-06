"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PropertyFilters() {
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000000,
    bedrooms: 0,
    bathrooms: 0,
  })

  const handleReset = () => {
    setFilters({
      priceMin: 0,
      priceMax: 1000000,
      bedrooms: 0,
      bathrooms: 0,
    })
  }

  return (
    <Card className="p-6 sticky top-20">
      <h3 className="font-semibold text-lg text-foreground mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Price Range</Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
              className="text-sm"
            />
          </div>
          <div className="text-xs text-muted-foreground">
            ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Bedrooms */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Bedrooms</Label>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={filters.bedrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() => setFilters({ ...filters, bedrooms: num })}
              className="flex-1"
            >
              {num}
            </Button>
          ))}
          <Button
            variant={filters.bedrooms === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters({ ...filters, bedrooms: 0 })}
            className="flex-1"
          >
            Any
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Bathrooms */}
      <div className="mb-6">
        <Label className="text-base font-medium mb-3 block">Bathrooms</Label>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4].map((num) => (
            <Button
              key={num}
              variant={filters.bathrooms === num ? "default" : "outline"}
              size="sm"
              onClick={() => setFilters({ ...filters, bathrooms: num })}
              className="flex-1"
            >
              {num}
            </Button>
          ))}
          <Button
            variant={filters.bathrooms === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters({ ...filters, bathrooms: 0 })}
            className="flex-1"
          >
            Any
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Reset Button */}
      <Button variant="outline" className="w-full bg-transparent" onClick={handleReset}>
        Reset Filters
      </Button>
    </Card>
  )
}
