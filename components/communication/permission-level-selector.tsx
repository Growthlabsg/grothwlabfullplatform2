"use client"
import { ShieldCheck, Lock, ShieldAlert, Info } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type SecurityLevel = "standard" | "confidential" | "restricted"

interface PermissionLevelSelectorProps {
  value: SecurityLevel
  onChange: (value: SecurityLevel) => void
  className?: string
}

export function PermissionLevelSelector({ value, onChange, className }: PermissionLevelSelectorProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <RadioGroup value={value} onValueChange={(val) => onChange(val as SecurityLevel)} className="gap-4">
        <div
          className={cn(
            "flex items-start space-x-3 rounded-lg border p-3 transition-colors",
            value === "standard" ? "border-green-500 bg-green-50" : "hover:bg-muted",
          )}
        >
          <RadioGroupItem value="standard" id="standard" className="mt-1" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <Label htmlFor="standard" className="flex items-center font-medium">
                <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                Standard
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="w-80">
                    <div className="space-y-2">
                      <p className="font-medium">Standard Protection</p>
                      <ul className="list-disc pl-4 text-sm space-y-1">
                        <li>Basic access controls</li>
                        <li>Recipients can download, share and edit</li>
                        <li>Basic tracking of file access</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground">
              Basic protection for non-sensitive files. Standard sharing capabilities.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-start space-x-3 rounded-lg border p-3 transition-colors",
            value === "confidential" ? "border-yellow-500 bg-yellow-50" : "hover:bg-muted",
          )}
        >
          <RadioGroupItem value="confidential" id="confidential" className="mt-1" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <Label htmlFor="confidential" className="flex items-center font-medium">
                <Lock className="h-4 w-4 text-yellow-500 mr-2" />
                Confidential
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="w-80">
                    <div className="space-y-2">
                      <p className="font-medium">Confidential Protection</p>
                      <ul className="list-disc pl-4 text-sm space-y-1">
                        <li>Enhanced access controls</li>
                        <li>Comprehensive tracking and logging</li>
                        <li>All file interactions are recorded</li>
                        <li>Detailed audit trails with user identities</li>
                        <li>Downloads and views are tracked</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground">
              Enhanced protection with detailed tracking of all file interactions.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-start space-x-3 rounded-lg border p-3 transition-colors",
            value === "restricted" ? "border-red-500 bg-red-50" : "hover:bg-muted",
          )}
        >
          <RadioGroupItem value="restricted" id="restricted" className="mt-1" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center">
              <Label htmlFor="restricted" className="flex items-center font-medium">
                <ShieldAlert className="h-4 w-4 text-red-500 mr-2" />
                Restricted
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                      <Info className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="w-80">
                    <div className="space-y-2">
                      <p className="font-medium">Restricted Protection</p>
                      <ul className="list-disc pl-4 text-sm space-y-1">
                        <li>Maximum security controls</li>
                        <li>Prevents downloads or actions outside the platform</li>
                        <li>Watermarking and document protection</li>
                        <li>Time-limited access with auto-expiration</li>
                        <li>Comprehensive audit logging</li>
                        <li>Requires authentication for every access</li>
                      </ul>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground">
              Maximum protection. Files cannot be downloaded or accessed outside the platform.
            </p>
          </div>
        </div>
      </RadioGroup>

      {value === "confidential" && (
        <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 border border-yellow-200">
          <div className="flex">
            <Info className="h-4 w-4 text-yellow-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium">Confidential mode enabled</p>
              <p className="mt-1">
                All file interactions will be comprehensively tracked and logged. Users will be notified that their
                actions are being monitored.
              </p>
            </div>
          </div>
        </div>
      )}

      {value === "restricted" && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
          <div className="flex">
            <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-medium">Restricted mode enabled</p>
              <p className="mt-1">
                Recipients cannot download files or perform actions outside the platform. All access is strictly
                controlled and heavily audited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
