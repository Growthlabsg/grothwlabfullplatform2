"use client";

import { Search, Star, StarOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SidebarSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterFavorites: boolean;
  setFilterFavorites: (filter: boolean) => void;
}

export function SidebarSearchBar({
  searchQuery,
  setSearchQuery,
  filterFavorites,
  setFilterFavorites,
}: SidebarSearchBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search navigation..."
          className="pl-10 h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#0F7377] dark:focus:border-[#0F7377] focus:ring-[#0F7377] dark:focus:ring-[#0F7377] transition-all duration-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 transition-all duration-300 ${
            filterFavorites
              ? "text-[#F59E0B] hover:text-[#F59E0B]/80"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          }`}
          onClick={() => setFilterFavorites(!filterFavorites)}
          title={filterFavorites ? "Show all" : "Show favorites only"}
        >
          {filterFavorites ? (
            <Star className="h-4 w-4" />
          ) : (
            <StarOff className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
