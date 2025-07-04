
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock } from "lucide-react"

export function AlbumDetailSkeleton() {
  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
                     to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              {/* Album Cover Skeleton */}
              <Skeleton className="w-[240px] h-[240px] shadow-xl rounded bg-gray-700" />

              <div className="flex flex-col justify-end">
                {/* Album Type */}
                <Skeleton className="w-12 h-4 mb-2 bg-gray-600" />

                {/* Album Title */}
                <Skeleton className="w-96 h-16 my-4 bg-gray-600" />

                {/* Album Info */}
                <div className="flex items-center gap-2 text-sm">
                  <Skeleton className="w-24 h-4 bg-gray-600" />
                  <span className="text-gray-500">•</span>
                  <Skeleton className="w-16 h-4 bg-gray-600" />
                  <span className="text-gray-500">•</span>
                  <Skeleton className="w-12 h-4 bg-gray-600" />
                </div>
              </div>
            </div>

            {/* Play Button Skeleton */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Skeleton className="w-14 h-14 rounded-full bg-gray-600" />
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Songs List Skeleton */}
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {Array.from({ length: 8 }, (_, index) => (
                    <div key={index} className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm rounded-md">
                      {/* Track Number */}
                      <div className="flex items-center justify-center">
                        <Skeleton className="w-3 h-4 bg-gray-600" />
                      </div>

                      {/* Song Info */}
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-10 bg-gray-600" />
                        <div className="space-y-1">
                          <Skeleton className="w-32 h-4 bg-gray-600" />
                          <Skeleton className="w-24 h-3 bg-gray-700" />
                        </div>
                      </div>

                      {/* Release Date */}
                      <div className="flex items-center">
                        <Skeleton className="w-20 h-4 bg-gray-600" />
                      </div>

                      {/* Duration */}
                      <div className="flex items-center">
                        <Skeleton className="w-8 h-4 bg-gray-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
