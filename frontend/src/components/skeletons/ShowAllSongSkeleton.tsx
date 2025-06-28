import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, ChevronLeft, ChevronRight } from "lucide-react"

export function ShowAllSongSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col rounded-md">
      <div className="flex-1 flex flex-col px-6 py-4">
        {/* Header Skeleton */}
        <div className="mb-2">
          <div className="h-10 w-80 bg-gray-700 rounded-md animate-pulse mb-2"></div>
          <div className="h-5 w-96 bg-gray-600 rounded-md animate-pulse"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="mb-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[300px]">{/* Empty space for search if needed */}</div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400 mr-2" />
              <Select disabled>
                <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700 text-white opacity-50">
                  <SelectValue placeholder="Loading..." />
                </SelectTrigger>
              </Select>
            </div>
          </div>
        </div>

        {/* Songs Grid Skeleton */}
        <div className="h-[calc(90vh-240px)] w-full rounded-md border border-gray-700 bg-gray-900/50 flex items-center justify-center">
          <ScrollArea className="h-full w-full p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <Card key={i} className="bg-gray-800/50 border-gray-700 transition-all duration-300">
                  <CardContent className="p-3">
                    <div className="relative mb-3">
                      {/* Image Skeleton */}
                      <div className="w-full aspect-square bg-gray-700 rounded-md animate-pulse"></div>

                      {/* Badge Skeleton */}
                      <div className="absolute top-1.5 left-1.5 h-5 w-8 bg-gray-600 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-1.5">
                      {/* Title Skeleton */}
                      <div className="h-4 w-full bg-gray-600 rounded animate-pulse"></div>

                      {/* Artist Skeleton */}
                      <div className="h-3 w-3/4 bg-gray-700 rounded animate-pulse"></div>

                      {/* Album Skeleton */}
                      <div className="h-3 w-2/3 bg-gray-700 rounded animate-pulse"></div>

                      <div className="flex items-center justify-between pt-1.5">
                        {/* Duration Skeleton */}
                        <div className="h-3 w-8 bg-gray-700 rounded animate-pulse"></div>

                        {/* Action Buttons Skeleton */}
                        <div className="flex items-center gap-0.5">
                          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                          <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-6 pb-4 px-6 rounded-md">
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" disabled className="bg-gray-800 border-gray-700 opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-800 border border-gray-700 rounded-md animate-pulse"></div>
          ))}

          <Button variant="outline" size="icon" disabled className="bg-gray-800 border-gray-700 opacity-50">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
