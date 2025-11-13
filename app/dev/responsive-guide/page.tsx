import { ResponsiveContainer } from "@/components/layout/responsive-container"
import { ResponsiveText } from "@/components/ui/responsive-text"
import { ResponsiveSpacer } from "@/components/ui/responsive-spacer"
import { ResponsiveCard } from "@/components/ui/responsive-card"

export default function ResponsiveGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <ResponsiveContainer>
        <ResponsiveText as="h1" size="3xl" mdSize="4xl" lgSize="5xl" weight="bold" className="mb-4">
          Responsive Design Guide
        </ResponsiveText>

        <ResponsiveText size="lg" mdSize="xl" className="mb-8 text-muted-foreground">
          Best practices for creating responsive interfaces in the GrowthLab project
        </ResponsiveText>

        <ResponsiveCard className="mb-8">
          <ResponsiveText as="h2" size="xl" mdSize="2xl" weight="semibold" className="mb-4">
            Responsive Components
          </ResponsiveText>

          <ResponsiveText className="mb-4">
            The project includes several responsive components that automatically adapt to different screen sizes:
          </ResponsiveText>

          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <code>ResponsiveContainer</code> - A container that adapts its width and padding based on screen size
            </li>
            <li>
              <code>ResponsiveGrid</code> - A grid layout that changes column count based on screen size
            </li>
            <li>
              <code>ResponsiveText</code> - Text that changes size based on screen size
            </li>
            <li>
              <code>ResponsiveCard</code> - A card component with adaptive padding
            </li>
            <li>
              <code>ResponsiveSpacer</code> - A spacer that changes height based on screen size
            </li>
            <li>
              <code>ResponsiveImage</code> - An image component with responsive loading and sizing
            </li>
            <li>
              <code>ResponsiveTabs</code> - Tabs that transform into a dropdown on mobile
            </li>
            <li>
              <code>ResponsiveTable</code> - A table that transforms into cards on mobile
            </li>
          </ul>

          <ResponsiveText className="mb-2">Example usage:</ResponsiveText>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm mb-4">
            {`<ResponsiveGrid cols={1} mdCols={2} lgCols={3} gap="md">
  {items.map((item) => (
    <ResponsiveCard key={item.id}>
      <ResponsiveText size="lg" mdSize="xl" weight="semibold">
        {item.title}
      </ResponsiveText>
      <ResponsiveText size="sm" mdSize="base">
        {item.description}
      </ResponsiveText>
    </ResponsiveCard>
  ))}
</ResponsiveGrid>`}
          </pre>
        </ResponsiveCard>

        <ResponsiveCard className="mb-8">
          <ResponsiveText as="h2" size="xl" mdSize="2xl" weight="semibold" className="mb-4">
            Responsive Hooks
          </ResponsiveText>

          <ResponsiveText className="mb-4">
            Use the <code>useResponsive</code> hook to conditionally render components or apply different styles based
            on screen size:
          </ResponsiveText>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm mb-4">
            {`import { useResponsive } from "@/hooks/use-responsive"

function MyComponent() {
  const { isMobile, isTablet, isDesktop, breakpoint } = useResponsive()
  
  return (
    <div>
      {isMobile ? (
        <MobileView />
      ) : isTablet ? (
        <TabletView />
      ) : (
        <DesktopView />
      )}
    </div>
  )
}`}
          </pre>

          <ResponsiveText className="mb-2">Available properties:</ResponsiveText>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <code>isMobile</code> - True when screen width is less than 768px
            </li>
            <li>
              <code>isTablet</code> - True when screen width is between 768px and 1024px
            </li>
            <li>
              <code>isDesktop</code> - True when screen width is between 1024px and 1536px
            </li>
            <li>
              <code>isLargeDesktop</code> - True when screen width is greater than 1536px
            </li>
            <li>
              <code>breakpoint</code> - Current breakpoint (&ldquo;xs&rdquo;, &ldquo;sm&rdquo;, &ldquo;md&rdquo;, &ldquo;lg&rdquo;, &ldquo;xl&rdquo;, &ldquo;2xl&rdquo;)
            </li>
            <li>
              <code>width</code> - Current viewport width in pixels
            </li>
            <li>
              <code>height</code> - Current viewport height in pixels
            </li>
            <li>
              <code>orientation</code> - Current device orientation (&ldquo;portrait&rdquo; or &ldquo;landscape&rdquo;)
            </li>
          </ul>
        </ResponsiveCard>

        <ResponsiveCard className="mb-8">
          <ResponsiveText as="h2" size="xl" mdSize="2xl" weight="semibold" className="mb-4">
            CSS Utilities
          </ResponsiveText>

          <ResponsiveText className="mb-4">
            The project includes several CSS utility classes for responsive design:
          </ResponsiveText>

          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>
              <code>responsive-heading-1</code>, <code>responsive-heading-2</code>, <code>responsive-heading-3</code> -
              Responsive heading styles
            </li>
            <li>
              <code>responsive-body</code> - Responsive body text
            </li>
            <li>
              <code>responsive-section</code> - Responsive section padding
            </li>
            <li>
              <code>responsive-container</code> - Responsive container with adaptive padding
            </li>
            <li>
              <code>touch-target</code> - Ensures elements are large enough for touch interaction
            </li>
            <li>
              <code>responsive-grid-1</code>, <code>responsive-grid-2</code>, etc. - Responsive grid layouts
            </li>
            <li>
              <code>responsive-flex</code> - Flex layout that changes direction on mobile
            </li>
            <li>
              <code>responsive-p</code>, <code>responsive-px</code>, <code>responsive-py</code> - Responsive padding
            </li>
            <li>
              <code>responsive-m</code>, <code>responsive-mx</code>, <code>responsive-my</code> - Responsive margin
            </li>
            <li>
              <code>responsive-card</code> - Responsive card styling
            </li>
            <li>
              <code>responsive-form-control</code>, <code>responsive-form-label</code>,{" "}
              <code>responsive-form-input</code> - Responsive form elements
            </li>
            <li>
              <code>responsive-button</code> - Responsive button sizing
            </li>
          </ul>

          <ResponsiveText className="mb-2">Example usage:</ResponsiveText>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {`<section className="responsive-section">
  <div className="responsive-container">
    <h1 className="responsive-heading-1">Welcome to GrowthLab</h1>
    <p className="responsive-body">Building the future of startups in Asia</p>
    
    <div className="responsive-grid-3">
      {/* Grid items */}
    </div>
  </div>
</section>`}
          </pre>
        </ResponsiveCard>

        <ResponsiveCard className="mb-8">
          <ResponsiveText as="h2" size="xl" mdSize="2xl" weight="semibold" className="mb-4">
            Testing Responsive Designs
          </ResponsiveText>

          <ResponsiveText className="mb-4">
            Use the <code>ResponsiveDebugger</code> component during development to visualize the current breakpoint and
            screen dimensions:
          </ResponsiveText>

          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm mb-4">
            {`import { ResponsiveDebugger } from "@/components/dev/responsive-debugger"

export default function MyPage() {
  return (
    <div>
      {/* Page content */}
      
      {process.env.NODE_ENV === "development" && <ResponsiveDebugger />}
    </div>
  )
}`}
          </pre>

          <ResponsiveText className="mb-4">
            Visit the{" "}
            <a href="/dev/responsive-test" className="text-primary underline">
              Responsive Test Page
            </a>{" "}
            to see how components adapt to different screen sizes.
          </ResponsiveText>
        </ResponsiveCard>

        <ResponsiveCard>
          <ResponsiveText as="h2" size="xl" mdSize="2xl" weight="semibold" className="mb-4">
            Best Practices
          </ResponsiveText>

          <ul className="list-disc pl-6 space-y-2">
            <li>Always design for mobile first, then enhance for larger screens</li>
            <li>Use the responsive components provided by the project</li>
            <li>Test on real devices or use browser dev tools to simulate different screen sizes</li>
            <li>Ensure touch targets are at least 44x44 pixels for mobile users</li>
            <li>Use relative units (rem, em, %) instead of fixed units (px) where possible</li>
            <li>Consider both portrait and landscape orientations</li>
            <li>
              Optimize images for different screen sizes using the <code>ResponsiveImage</code> component
            </li>
            <li>
              Use the <code>useResponsive</code> hook for conditional rendering
            </li>
            <li>Test keyboard navigation and screen reader compatibility</li>
            <li>Consider network conditions and optimize for performance on mobile devices</li>
          </ul>
        </ResponsiveCard>

        <ResponsiveSpacer size="xl" />
      </ResponsiveContainer>
    </div>
  )
}
