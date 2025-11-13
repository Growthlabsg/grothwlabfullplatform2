import * as React from "react"
import { cn } from "@/lib/utils"

const StepIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-6 w-6 items-center justify-center rounded-full border bg-muted", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
StepIndicator.displayName = "StepIndicator"

const StepStatus = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex h-6 w-6 items-center justify-center rounded-full border", className)}
        {...props}
      >
        {children}
      </div>
    )
  },
)
StepStatus.displayName = "StepStatus"

const Step = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-center", className)} {...props}>
        {children}
      </div>
    )
  },
)
Step.displayName = "Step"

const StepTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("text-sm font-medium", className)} {...props} />
  },
)
StepTitle.displayName = "StepTitle"

const StepDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />
  },
)
StepDescription.displayName = "StepDescription"

const StepSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("h-px w-full bg-border", className)} {...props} />
  },
)
StepSeparator.displayName = "StepSeparator"

const Stepper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center space-x-2", className)} {...props}>
        {children}
      </div>
    )
  },
)
Stepper.displayName = "Stepper"

export { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepSeparator }
