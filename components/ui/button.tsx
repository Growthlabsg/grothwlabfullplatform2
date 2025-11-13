"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  labelKey?: string
  autoTranslate?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, labelKey, autoTranslate = true, children, ...props }, ref) => {
    // Optional auto-translation of simple text labels
    let resolvedChildren: React.ReactNode = children
    // For icon-only buttons, derive an accessible label if none provided
    const propsAny = props as Record<string, unknown>
    const hasAriaLabel: boolean = typeof propsAny["aria-label"] === "string" && propsAny["aria-label"].length > 0
    const hasTitle: boolean = typeof propsAny.title === "string" && propsAny.title.length > 0
    let derivedIconLabel: string | undefined

    function humanize(name: string): string {
      const spaced = name
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[._-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
      return spaced.toLowerCase()
    }

    try {
      // useLanguage is only valid in client, and Button is a client component by usage
      // We avoid throwing on SSR by wrapping in try/catch
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t, tp } = useLanguage() as { t: (key: string) => string; tp: (text: string) => string }
      if (labelKey) {
        resolvedChildren = t(labelKey)
        // If an explicit labelKey is provided and this is an icon button, prefer it for accessibility
        derivedIconLabel = typeof resolvedChildren === "string" ? resolvedChildren : undefined
      } else if (autoTranslate && typeof children === "string") {
        resolvedChildren = tp(children)
      }
    } catch {
      // no-op if language context not available
    }

    // If still no derived label, and looks like an icon element, try to infer from child component name
    if (!derivedIconLabel && React.isValidElement(resolvedChildren)) {
      const childType = resolvedChildren.type as { displayName?: string; name?: string }
      const iconName: string | undefined = childType?.displayName || childType?.name
      if (iconName && /^[A-Z]/.test(iconName)) {
        derivedIconLabel = humanize(iconName)
      }
    }
    const Comp = asChild ? Slot : "button"

    // Ensure native button defaults to type="button" to avoid accidental form submissions
    const forwardedProps = asChild
      ? props
      : ({ type: type ?? "button", ...props } as Omit<ButtonProps, "type"> & {
          type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
        })

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        // Provide accessibility fallbacks for icon-only buttons
        {...(size === "icon" && !hasAriaLabel && !hasTitle
          ? {
              "aria-label": derivedIconLabel ?? "button",
              title: (derivedIconLabel ?? "Button").replace(/^\w/, (c) => c.toUpperCase()),
            }
          : null)}
        ref={ref}
        {...forwardedProps}
      >
        {resolvedChildren}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
