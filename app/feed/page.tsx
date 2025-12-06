"use client";

import { useState, useRef } from "react";
import { ApiFeedContent } from "@/components/feed/api-feed-content";
import { FeedSidebar } from "@/components/feed/linkedin-style/sidebar";
import { FeedRightSidebar } from "@/components/feed/linkedin-style/right-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bell, Plus, Home, Search, Users } from "lucide-react";

// Metadata is handled by the layout for client components

export default function FeedPage() {
  const createPostRef = useRef<HTMLButtonElement>(null);

  const handleCreatePost = () => {
    // Find the create post button in the ApiFeedContent component
    const createPostButton = document.querySelector(
      '[data-testid="create-post-trigger"]'
    ) as HTMLButtonElement;
    if (createPostButton) {
      createPostButton.click();
    } else {
      // Fallback: try to find any button with "Start a post" text
      const startPostButton = Array.from(
        document.querySelectorAll("button")
      ).find((button) =>
        button.textContent?.includes("Start a post")
      ) as HTMLButtonElement;
      if (startPostButton) {
        startPostButton.click();
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header Section - Desktop */}
      <div className="hidden md:block bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0F7377] to-[#00A884] bg-clip-text text-transparent">
                  GrowthLab Feed
                </h1>
              </div>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Updates
              </Badge>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  const aiSection = document.querySelector(
                    '[class*="AI-Powered"]'
                  );
                  if (aiSection) {
                    aiSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Bell className="h-4 w-4" />
                Notifications
                <Badge className="ml-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
              <Button
                className="bg-gradient-to-r from-[#0F7377] to-[#00A884] hover:from-[#0F7377]/90 hover:to-[#00A884]/90 text-white gap-2"
                onClick={handleCreatePost}
              >
                <Plus className="h-4 w-4" />
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile App-Style Header */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-3 py-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900 truncate">
                  GrowthLab
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Live Updates
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="relative p-2 rounded-full hover:bg-gray-100"
                onClick={() => {
                  const aiSection = document.querySelector(
                    '[class*="AI-Powered"]'
                  );
                  if (aiSection) {
                    aiSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center font-bold">
                  3
                </Badge>
              </Button>
              <Button
                className="bg-gradient-to-r from-[#0F7377] to-[#00A884] hover:from-[#0F7377]/90 hover:to-[#00A884]/90 text-white h-10 w-10 rounded-full shadow-lg"
                onClick={handleCreatePost}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block container py-6 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-24 max-w-full overflow-hidden">
              <FeedSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <div className="space-y-6">
              <ApiFeedContent />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-24 max-w-full overflow-hidden">
              <FeedRightSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile App Layout */}
      <div className="lg:hidden">
        {/* Mobile Main Content with Proper Alignment */}
        <div className="min-h-screen bg-gray-50">
          <div className="px-3 py-4 pb-24">
            <div className="space-y-4">
              {/* Mobile Feed Content with Better Alignment */}
              <div className="w-full">
                <ApiFeedContent />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Right Sidebar - Hidden by default, can be toggled */}
        <div className="hidden">
          <div className="px-4 py-4">
            <FeedRightSidebar />
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Navigation for Mobile - Modern App Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/98 backdrop-blur-xl border-t border-gray-200 md:hidden z-50 shadow-2xl">
        <div className="flex items-center justify-between py-3 px-2 max-w-sm mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl active:bg-[#0F7377]/10 transition-all duration-200 flex-1"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Home className="h-5 w-5 text-[#0F7377]" />
            <span className="text-xs font-semibold text-[#0F7377]">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl active:bg-gray-100 transition-all duration-200 flex-1"
            onClick={() => {
              const searchInput = document.querySelector(
                'input[placeholder*="Search"]'
              ) as HTMLInputElement;
              if (searchInput) {
                searchInput.focus();
                searchInput.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Search className="h-5 w-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Search</span>
          </Button>
          <Button
            className="flex flex-col items-center gap-1 h-auto py-3 px-4 rounded-2xl bg-gradient-to-r from-[#0F7377] to-[#00A884] shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 flex-shrink-0"
            onClick={handleCreatePost}
          >
            <Plus className="h-5 w-5 text-white" />
            <span className="text-xs font-bold text-white">Create</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl active:bg-gray-100 transition-all duration-200 relative flex-1"
            onClick={() => {
              // Scroll to AI Features section
              const aiSection = document.querySelector('[class*="AI-Powered"]');
              if (aiSection) {
                aiSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Alerts</span>
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center font-bold shadow-lg">
              3
            </Badge>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-xl active:bg-gray-100 transition-all duration-200 flex-1"
            onClick={() => {
              // Scroll to networking section or open network page
              window.location.href = "/network";
            }}
          >
            <Users className="h-5 w-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Network</span>
          </Button>
        </div>
      </div>

      {/* Mobile Floating Action Button - Better Positioned */}
      <div className="fixed bottom-24 right-4 md:hidden z-40">
        <Button
          className="h-12 w-12 rounded-full bg-gradient-to-r from-[#0F7377] to-[#00A884] shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
          onClick={handleCreatePost}
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Mobile Status Bar Spacer */}
      <div className="h-6 md:hidden"></div>
    </div>
  );
}
