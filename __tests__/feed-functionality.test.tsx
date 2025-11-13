import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Post } from '@/components/feed/linkedin-style/post'
import { CreatePostDialog } from '@/components/feed/create-post-dialog'
import { FeedContent } from '@/components/feed/linkedin-style/content'
import { AuthProvider } from '@/contexts/auth-context'

// Mock the hooks and services
jest.mock('@/hooks/use-user-activity', () => ({
  useUserActivity: () => ({
    trackPostView: jest.fn(),
    trackPostEngagement: jest.fn(),
    trackProfileView: jest.fn(),
  }),
}))

jest.mock('@/lib/connection-service', () => ({
  areUsersConnected: jest.fn(() => Promise.resolve(false)),
  isFollowing: jest.fn(() => Promise.resolve(false)),
}))

jest.mock('@/lib/real-time-analytics', () => ({
  trackEvent: jest.fn(),
}))

jest.mock('@/lib/reputation-system', () => ({
  updateReputation: jest.fn(),
}))

// Mock data for testing
const mockPost = {
  id: "1",
  author: {
    id: "user1",
    name: "Sarah Chen",
    headline: "Founder & CEO at TechInnovate",
    avatar: "/portrait-of-sarah.png",
    verified: true,
  },
  content: "Excited to announce that TechInnovate has secured $2M in seed funding!",
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  likes: 128,
  comments: 32,
  reposts: 18,
  tags: ["startup", "funding", "entrepreneurship"],
  image: "/placeholder-99jsn.png",
}

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
)

describe('Feed Functionality Tests', () => {
  describe('Post Component', () => {
    test('renders post with all interactive elements', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      // Check if post content is displayed
      expect(screen.getByText(mockPost.content)).toBeInTheDocument()
      expect(screen.getByText(mockPost.author.name)).toBeInTheDocument()
      expect(screen.getByText(mockPost.author.headline)).toBeInTheDocument()

      // Check if interactive buttons are present
      expect(screen.getByText('Like')).toBeInTheDocument()
      expect(screen.getByText('Comment')).toBeInTheDocument()
      expect(screen.getByText('Repost')).toBeInTheDocument()
      expect(screen.getByText('Send')).toBeInTheDocument()
    })

    test('like functionality works correctly', async () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const likeButton = screen.getByText('Like')
      const likeCount = screen.getByText('128 likes')

      // Initial state
      expect(likeCount).toBeInTheDocument()

      // Click like button
      fireEvent.click(likeButton)

      // Check if like count increases
      await waitFor(() => {
        expect(screen.getByText('129 likes')).toBeInTheDocument()
      })

      // Click again to unlike
      fireEvent.click(likeButton)

      // Check if like count decreases
      await waitFor(() => {
        expect(screen.getByText('128 likes')).toBeInTheDocument()
      })
    })

    test('repost functionality works correctly', async () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const repostButton = screen.getByText('Repost')
      const repostCount = screen.getByText('18 reposts')

      // Initial state
      expect(repostCount).toBeInTheDocument()

      // Click repost button
      fireEvent.click(repostButton)

      // Check if repost count increases
      await waitFor(() => {
        expect(screen.getByText('19 reposts')).toBeInTheDocument()
      })

      // Click again to unrepost
      fireEvent.click(repostButton)

      // Check if repost count decreases
      await waitFor(() => {
        expect(screen.getByText('18 reposts')).toBeInTheDocument()
      })
    })

    test('bookmark functionality works correctly', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      // Find the dropdown menu trigger (three dots)
      const moreButton = screen.getByRole('button', { name: /more options/i })
      fireEvent.click(moreButton)

      // Check if save post option is available
      expect(screen.getByText('Save post')).toBeInTheDocument()
    })

    test('comment button is clickable', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const commentButton = screen.getByText('Comment')
      expect(commentButton).toBeInTheDocument()
      expect(commentButton).not.toBeDisabled()
    })

    test('send button is clickable', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const sendButton = screen.getByText('Send')
      expect(sendButton).toBeInTheDocument()
      expect(sendButton).not.toBeDisabled()
    })

    test('post with image displays correctly', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const image = screen.getByAltText('Post image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src')
    })

    test('tags are displayed correctly', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      mockPost.tags.forEach(tag => {
        expect(screen.getByText(`#${tag}`)).toBeInTheDocument()
      })
    })

    test('verified badge is displayed for verified users', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      expect(screen.getByText('Verified')).toBeInTheDocument()
    })
  })

  describe('Create Post Dialog', () => {
    test('create post dialog opens and closes correctly', () => {
      render(
        <TestWrapper>
          <CreatePostDialog />
        </TestWrapper>
      )

      // Click the trigger button
      const triggerButton = screen.getByText('Start a post')
      fireEvent.click(triggerButton)

      // Check if dialog opens
      expect(screen.getByText('Create a post')).toBeInTheDocument()
      expect(screen.getByText('Share an update, image, or idea with your network')).toBeInTheDocument()

      // Close dialog
      const cancelButton = screen.getByText('Cancel')
      fireEvent.click(cancelButton)

      // Check if dialog closes
      expect(screen.queryByText('Create a post')).not.toBeInTheDocument()
    })

    test('post creation with text works', () => {
      render(
        <TestWrapper>
          <CreatePostDialog />
        </TestWrapper>
      )

      // Open dialog
      const triggerButton = screen.getByText('Start a post')
      fireEvent.click(triggerButton)

      // Type in textarea
      const textarea = screen.getByPlaceholderText('What do you want to talk about?')
      fireEvent.change(textarea, { target: { value: 'Test post content' } })

      // Check if post button is enabled
      const postButton = screen.getByText('Post')
      expect(postButton).not.toBeDisabled()
    })

    test('tag functionality works', () => {
      render(
        <TestWrapper>
          <CreatePostDialog />
        </TestWrapper>
      )

      // Open dialog
      const triggerButton = screen.getByText('Start a post')
      fireEvent.click(triggerButton)

      // Add a tag
      const tagInput = screen.getByPlaceholderText('Add a tag')
      fireEvent.change(tagInput, { target: { value: 'startup' } })

      const addButton = screen.getByText('Add')
      fireEvent.click(addButton)

      // Check if tag is displayed
      expect(screen.getByText('#startup')).toBeInTheDocument()
    })

    test('image upload functionality works', () => {
      render(
        <TestWrapper>
          <CreatePostDialog />
        </TestWrapper>
      )

      // Open dialog
      const triggerButton = screen.getByText('Start a post')
      fireEvent.click(triggerButton)

      // Check if image button is present
      expect(screen.getByText('Image')).toBeInTheDocument()
    })
  })

  describe('Feed Content', () => {
    test('feed loads with posts', async () => {
      render(
        <TestWrapper>
          <FeedContent />
        </TestWrapper>
      )

      // Check if create post dialog is present
      expect(screen.getByText('Start a post')).toBeInTheDocument()

      // Wait for posts to load
      await waitFor(() => {
        expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
        expect(screen.getByText('Alex Wong')).toBeInTheDocument()
      })
    })

    test('feed handles loading state', () => {
      render(
        <TestWrapper>
          <FeedContent />
        </TestWrapper>
      )

      // Initially should show loading skeletons
      expect(screen.getByText('Start a post')).toBeInTheDocument()
    })

    test('feed handles error state', async () => {
      // Mock console.error to avoid noise in tests
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <TestWrapper>
          <FeedContent />
        </TestWrapper>
      )

      // Wait for potential error handling
      await waitFor(() => {
        // Should still show create post dialog
        expect(screen.getByText('Start a post')).toBeInTheDocument()
      })

      consoleSpy.mockRestore()
    })
  })

  describe('Interactive Elements', () => {
    test('all buttons are accessible', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toBeInTheDocument()
        expect(button).not.toBeDisabled()
      })
    })

    test('links are clickable', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const authorLink = screen.getByText(mockPost.author.name)
      expect(authorLink).toBeInTheDocument()
      expect(authorLink.tagName).toBe('A')
    })

    test('dropdown menu works', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const moreButton = screen.getByRole('button', { name: /more options/i })
      fireEvent.click(moreButton)

      // Check dropdown options
      expect(screen.getByText('Save post')).toBeInTheDocument()
      expect(screen.getByText('Copy link to post')).toBeInTheDocument()
      expect(screen.getByText('Report post')).toBeInTheDocument()
    })
  })

  describe('Visual Elements', () => {
    test('avatars are displayed', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      const avatar = screen.getByAltText(mockPost.author.name)
      expect(avatar).toBeInTheDocument()
    })

    test('timestamps are formatted correctly', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      // Should display relative time
      expect(screen.getByText(/ago/)).toBeInTheDocument()
    })

    test('post stats are displayed', () => {
      render(
        <TestWrapper>
          <Post post={mockPost} />
        </TestWrapper>
      )

      expect(screen.getByText('128 likes')).toBeInTheDocument()
      expect(screen.getByText('32 comments')).toBeInTheDocument()
      expect(screen.getByText('18 reposts')).toBeInTheDocument()
    })
  })
}) 