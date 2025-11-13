import { render, screen } from "@testing-library/react"
import { CommunicationProvider } from "@/contexts/communication-context"
import { CommunicationCenterUI } from "@/components/communication-center/communication-center-ui"
import { WhatsAppCommunication } from "@/components/communication/whatsapp-communication"
import { ErrorBoundary } from "react-error-boundary"
import { useCommunication } from "@/contexts/communication-context"

// Mock the hooks
jest.mock("@/hooks/use-media-query", () => ({
  useMediaQuery: jest.fn(() => false), // Default to desktop view
}))

describe("Communication Components", () => {
  test("CommunicationCenterUI renders without crashing", () => {
    render(
      <CommunicationProvider>
        <CommunicationCenterUI />
      </CommunicationProvider>,
    )

    // Check that the component renders
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument()
  })

  test("WhatsAppCommunication renders chat interface", () => {
    render(
      <CommunicationProvider>
        <WhatsAppCommunication />
      </CommunicationProvider>,
    )

    // Check that the WhatsApp interface renders
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument()
    expect(screen.getByText(/Chats/i)).toBeInTheDocument()
    expect(screen.getByText(/Status/i)).toBeInTheDocument()
    expect(screen.getByText(/Calls/i)).toBeInTheDocument()
  })

  test("Error boundary catches errors", () => {
    // Create a component that throws an error
    const BuggyComponent = () => {
      throw new Error("Test error")
      return null
    }

    // Suppress console errors for this test
    const originalConsoleError = console.error
    console.error = jest.fn()

    render(
      <CommunicationProvider>
        <ErrorBoundary fallback={<div>Something went wrong. Try again.</div>}>
          <BuggyComponent />
        </ErrorBoundary>
      </CommunicationProvider>,
    )

    // Check that the error boundary caught the error
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/Try again/i)).toBeInTheDocument()

    // Restore console.error
    console.error = originalConsoleError
  })

  test("Communication provider provides context", () => {
    // Create a test component that uses the context
    const TestComponent = () => {
      const { currentUser } = useCommunication()
      return <div>User: {currentUser.name}</div>
    }

    render(
      <CommunicationProvider>
        <TestComponent />
      </CommunicationProvider>,
    )

    // Check that the context is provided
    expect(screen.getByText(/User: John Doe/i)).toBeInTheDocument()
  })
})
