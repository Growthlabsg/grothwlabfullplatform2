"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MediaItem {
  id?: number;
  type: "image" | "video" | "document" | "link";
  url: string;
  title?: string;
  description?: string;
  isPending?: boolean;
}

interface MediaSliderProps {
  items: MediaItem[];
  baseUrl?: string;
  className?: string;
  pendingCount?: number; // Number of pending uploads to show as skeletons
}

// PDF Viewer component with page navigation
function PDFViewer({ url, title }: { url: string; title?: string }) {
  const [numPages, setNumPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // For PDF, we'll use an iframe with page navigation
  // In production, you might want to use pdf.js or react-pdf
  const pdfUrl = `${url}#page=${currentPage}`;

  return (
    <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <FileText className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {title || "PDF Document"}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-primary hover:underline flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            className="w-full h-full"
            title={title || "PDF Document"}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError("Failed to load PDF");
              setIsLoading(false);
            }}
          />

          {/* PDF Navigation */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 rounded-full px-3 py-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-white text-xs px-2">Page {currentPage}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

// Skeleton placeholder for pending uploads
function MediaSkeleton() {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-xs text-gray-500">Uploading...</span>
        </div>
      </div>
    </div>
  );
}

export function MediaSlider({
  items,
  baseUrl = "http://localhost:8888",
  className,
  pendingCount = 0,
}: MediaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [fullscreenItem, setFullscreenItem] = useState<MediaItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine real items with pending skeletons
  const allItems: (MediaItem | "pending")[] = [
    ...items,
    ...Array(pendingCount).fill("pending"),
  ];

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1); // Mobile
      } else if (width < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(3); // Desktop
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      Math.min(allItems.length - itemsPerPage, prev + itemsPerPage)
    );
  };

  const visibleItems = allItems.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const getFullUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `${baseUrl}${url}`;
  };

  const renderMediaItem = (item: MediaItem | "pending", index: number) => {
    if (item === "pending") {
      return (
        <div
          key={`pending-${index}`}
          className="flex-shrink-0"
          style={{ width: `${100 / itemsPerPage}%` }}
        >
          <div className="p-1 h-48 sm:h-56 lg:h-64">
            <MediaSkeleton />
          </div>
        </div>
      );
    }

    const fullUrl = getFullUrl(item.url);

    return (
      <div
        key={item.id || index}
        className="flex-shrink-0 cursor-pointer"
        style={{ width: `${100 / itemsPerPage}%` }}
        onClick={() => setFullscreenItem(item)}
      >
        <div className="p-1 h-48 sm:h-56 lg:h-64 relative group">
          {item.isPending ? (
            <MediaSkeleton />
          ) : item.type === "image" ? (
            <div className="relative w-full h-full">
              <img
                src={fullUrl}
                alt={item.title || "Post image"}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 className="h-6 w-6 text-white" />
              </div>
            </div>
          ) : item.type === "video" ? (
            <video
              src={fullUrl}
              className="w-full h-full object-cover rounded-lg"
              controls
              onClick={(e) => e.stopPropagation()}
            />
          ) : item.type === "document" ? (
            <PDFViewer url={fullUrl} title={item.title} />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
              <FileText className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {item.title || "Document"}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (allItems.length === 0) return null;

  // Single item - no slider needed
  if (allItems.length === 1) {
    const firstItem = allItems[0];
    if (firstItem === "pending" || !firstItem) {
      return (
        <div className={cn("w-full h-64", className)}>
          <MediaSkeleton />
        </div>
      );
    }

    const item = firstItem;
    const fullUrl = getFullUrl(item.url);

    return (
      <>
        <div
          className={cn("w-full cursor-pointer", className)}
          onClick={() => setFullscreenItem(item)}
        >
          {item.type === "image" ? (
            <img
              src={fullUrl}
              alt={item.title || "Post image"}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          ) : item.type === "video" ? (
            <video
              src={fullUrl}
              className="w-full max-h-96 object-cover rounded-lg"
              controls
              onClick={(e) => e.stopPropagation()}
            />
          ) : item.type === "document" ? (
            <div className="h-96">
              <PDFViewer url={fullUrl} title={item.title} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <FileText className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-sm">{item.title || "Document"}</span>
            </div>
          )}
        </div>

        {/* Fullscreen Dialog */}
        <Dialog
          open={!!fullscreenItem}
          onOpenChange={() => setFullscreenItem(null)}
        >
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
            <VisuallyHidden>
              <DialogTitle>Media Preview</DialogTitle>
            </VisuallyHidden>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
              onClick={() => setFullscreenItem(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            {fullscreenItem && (
              <div className="w-full h-full flex items-center justify-center bg-black">
                {fullscreenItem.type === "image" ? (
                  <img
                    src={getFullUrl(fullscreenItem.url)}
                    alt={fullscreenItem.title || "Post image"}
                    className="max-w-full max-h-[90vh] object-contain"
                  />
                ) : fullscreenItem.type === "video" ? (
                  <video
                    src={getFullUrl(fullscreenItem.url)}
                    className="max-w-full max-h-[90vh]"
                    controls
                    autoPlay
                  />
                ) : (
                  <div className="w-full h-[90vh]">
                    <PDFViewer
                      url={getFullUrl(fullscreenItem.url)}
                      title={fullscreenItem.title}
                    />
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <div className={cn("relative w-full", className)} ref={containerRef}>
        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-800 rounded-full h-8 w-8"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {currentIndex + itemsPerPage < allItems.length && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 shadow-md hover:bg-white dark:hover:bg-gray-800 rounded-full h-8 w-8"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}

        {/* Items Container */}
        <div className="flex overflow-hidden px-4">
          {visibleItems.map((item, index) =>
            renderMediaItem(item, currentIndex + index)
          )}
        </div>

        {/* Page Indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  currentPage === index
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                )}
                onClick={() => setCurrentIndex(index * itemsPerPage)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog
        open={!!fullscreenItem}
        onOpenChange={() => setFullscreenItem(null)}
      >
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Media Preview</DialogTitle>
          </VisuallyHidden>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={() => setFullscreenItem(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          {fullscreenItem && (
            <div className="w-full h-full flex items-center justify-center bg-black">
              {fullscreenItem.type === "image" ? (
                <img
                  src={getFullUrl(fullscreenItem.url)}
                  alt={fullscreenItem.title || "Post image"}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              ) : fullscreenItem.type === "video" ? (
                <video
                  src={getFullUrl(fullscreenItem.url)}
                  className="max-w-full max-h-[90vh]"
                  controls
                  autoPlay
                />
              ) : (
                <div className="w-full h-[90vh]">
                  <PDFViewer
                    url={getFullUrl(fullscreenItem.url)}
                    title={fullscreenItem.title}
                  />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
