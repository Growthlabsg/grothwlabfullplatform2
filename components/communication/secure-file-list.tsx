"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { SecurityLevelBadge, type SecurityLevel } from "./file-permission-selector"
import { FileSharingDialog } from "./file-sharing-dialog"
import {
  Clock,
  Download,
  FileIcon,
  FileText,
  Filter,
  ImageIcon,
  Info,
  MoreHorizontal,
  Search,
  Share,
  ShieldAlert,
  Trash,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SecureFile {
  id: string
  name: string
  type: string
  size: string
  modified: string
  owner: string
  securityLevel: SecurityLevel
  sharedWith: {
    name: string
    email: string
    avatar?: string
  }[]
  accessControls?: {
    preventDownload?: boolean
    preventPrint?: boolean
    preventCopy?: boolean
    expirationDate?: Date
    watermark?: boolean
  }
}

export function SecureFileList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<SecureFile | null>(null)

  // Mock files data
  const files: SecureFile[] = [
    {
      id: "file1",
      name: "Q3_Financial_Report.pdf",
      type: "pdf",
      size: "2.4 MB",
      modified: "2023-10-15",
      owner: "You",
      securityLevel: "confidential",
      sharedWith: [
        { name: "Sarah Chen", email: "sarah.chen@example.com" },
        { name: "David Wong", email: "david.wong@example.com" },
      ],
      accessControls: {
        preventCopy: true,
        expirationDate: new Date("2023-12-31"),
      },
    },
    {
      id: "file2",
      name: "Product_Roadmap_2024.pptx",
      type: "pptx",
      size: "5.7 MB",
      modified: "2023-10-12",
      owner: "You",
      securityLevel: "restricted",
      sharedWith: [{ name: "Executive Team", email: "exec@example.com" }],
      accessControls: {
        preventDownload: true,
        preventPrint: true,
        preventCopy: true,
        watermark: true,
        expirationDate: new Date("2023-11-30"),
      },
    },
    {
      id: "file3",
      name: "Team_Photo.jpg",
      type: "jpg",
      size: "3.2 MB",
      modified: "2023-10-10",
      owner: "Sarah Chen",
      securityLevel: "standard",
      sharedWith: [{ name: "All Staff", email: "staff@example.com" }],
    },
    {
      id: "file4",
      name: "Marketing_Strategy.docx",
      type: "docx",
      size: "1.8 MB",
      modified: "2023-10-08",
      owner: "You",
      securityLevel: "confidential",
      sharedWith: [{ name: "Marketing Team", email: "marketing@example.com" }],
      accessControls: {
        preventCopy: true,
      },
    },
    {
      id: "file5",
      name: "Project_Timeline.xlsx",
      type: "xlsx",
      size: "980 KB",
      modified: "2023-10-05",
      owner: "David Wong",
      securityLevel: "standard",
      sharedWith: [{ name: "Project Team", email: "project@example.com" }],
    },
  ]

  // Filter files based on search query
  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "jpg":
      case "png":
      case "gif":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "xlsx":
        return <FileText className="h-4 w-4 text-green-500" />
      case "pptx":
        return <FileText className="h-4 w-4 text-orange-500" />
      default:
        return <FileIcon className="h-4 w-4 text-gray-500" />
    }
  }

  // Handle share button click
  const handleShare = (file: SecureFile) => {
    setSelectedFile(file)
    setShareDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Secure Files</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Security Level</TableHead>
              <TableHead>Shared With</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No files found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <SecurityLevelBadge level={file.securityLevel} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="w-80">
                          <div className="space-y-2">
                            <p className="font-medium capitalize">{file.securityLevel} Protection</p>
                            <p className="text-sm">
                              {file.securityLevel === "standard" && "Basic protection. Accessible to all team members."}
                              {file.securityLevel === "confidential" &&
                                "Enhanced protection with comprehensive tracking of all file interactions."}
                              {file.securityLevel === "restricted" &&
                                "Maximum protection. Files cannot be downloaded or accessed outside the platform."}
                            </p>
                            {file.accessControls && (
                              <div className="pt-1 border-t text-xs">
                                <p className="font-medium">Access Controls:</p>
                                <ul className="list-disc pl-4 text-xs mt-1 space-y-1">
                                  {file.accessControls.preventDownload && <li>Downloads prevented</li>}
                                  {file.accessControls.preventPrint && <li>Printing prevented</li>}
                                  {file.accessControls.preventCopy && <li>Copying prevented</li>}
                                  {file.accessControls.watermark && <li>Watermarking enabled</li>}
                                  {file.accessControls.expirationDate && (
                                    <li>Expires on {file.accessControls.expirationDate.toLocaleDateString()}</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {file.accessControls?.expirationDate && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                              <Clock className="h-3 w-3 mr-1" />
                              Expires
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              Expires on {file.accessControls.expirationDate.toLocaleDateString()}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-sm">{file.sharedWith.length} users</span>
                    </div>
                  </TableCell>
                  <TableCell>{file.owner}</TableCell>
                  <TableCell>{file.modified}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleShare(file)}>
                          <Share className="h-4 w-4 mr-2" /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={file.securityLevel === "restricted" && file.accessControls?.preventDownload}
                          className={cn(
                            file.securityLevel === "restricted" && file.accessControls?.preventDownload
                              ? "text-muted-foreground cursor-not-allowed"
                              : "",
                          )}
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                          {file.securityLevel === "restricted" && file.accessControls?.preventDownload && (
                            <ShieldAlert className="h-4 w-4 ml-2 text-red-500" />
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Info className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* File sharing dialog */}
      {selectedFile && (
        <FileSharingDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          file={{
            id: selectedFile.id,
            name: selectedFile.name,
            type: selectedFile.type,
            size: Number.parseInt(selectedFile.size.replace(/[^0-9]/g, "")),
          }}
        />
      )}
    </div>
  )
}
