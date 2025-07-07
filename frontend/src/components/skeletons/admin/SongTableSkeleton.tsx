"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter } from "lucide-react"
function SongTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Search and Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search Input Skeleton */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
          <Skeleton className="h-10 w-full bg-zinc-800/50" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="h-4 w-4" />
            <span>Filter by:</span>
          </div>

          {/* Artist Filter Skeleton */}
          <Skeleton className="h-10 w-[140px] bg-zinc-800/50" />

          {/* Album Filter Skeleton */}
          <Skeleton className="h-10 w-[140px] bg-zinc-800/50" />
        </div>
      </div>

      {/* Results Info Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48 bg-zinc-800/50" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20 bg-zinc-800/50 rounded-full" />
          <Skeleton className="h-6 w-24 bg-zinc-800/50 rounded-full" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border border-zinc-700 bg-zinc-800/30">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-zinc-800/50 border-zinc-700">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Artist</TableHead>
              <TableHead className="text-white">Release Date</TableHead>
              <TableHead className="text-white">Album</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }, (_, index) => (
              <TableRow key={index} className="hover:bg-zinc-800/50 border-zinc-700">
                {/* Image Skeleton */}
                <TableCell>
                  <Skeleton className="size-10 rounded bg-zinc-700" />
                </TableCell>

                {/* Title Skeleton */}
                <TableCell>
                  <Skeleton className="h-4 w-32 bg-zinc-700" />
                </TableCell>

                {/* Artist Skeleton */}
                <TableCell>
                  <Skeleton className="h-4 w-24 bg-zinc-700" />
                </TableCell>

                {/* Release Date Skeleton */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 bg-zinc-700" />
                    <Skeleton className="h-4 w-20 bg-zinc-700" />
                  </div>
                </TableCell>

                {/* Album Skeleton */}
                <TableCell>
                  <Skeleton className="h-4 w-28 bg-zinc-700" />
                </TableCell>

                {/* Actions Skeleton */}
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Skeleton className="h-8 w-8 bg-zinc-700" />
                    <Skeleton className="h-8 w-8 bg-zinc-700" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-2 pt-4">
        {/* Previous Button Skeleton */}
        <Skeleton className="h-8 w-8 bg-zinc-700" />

        {/* Page Numbers Skeleton */}
        <Skeleton className="h-8 w-8 bg-zinc-700" />
        <Skeleton className="h-8 w-8 bg-zinc-700" />
        <Skeleton className="h-8 w-8 bg-zinc-700" />

        {/* Next Button Skeleton */}
        <Skeleton className="h-8 w-8 bg-zinc-700" />
      </div>
    </div>
  )
}
export default SongTableSkeleton;