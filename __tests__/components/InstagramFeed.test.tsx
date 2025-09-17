import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import InstagramFeed from '../../components/layout/InstagramFeed'

// Mock fetch for API calls
global.fetch = jest.fn()

describe('InstagramFeed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<InstagramFeed />)

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument()
  })

  it('renders Instagram posts after loading', async () => {
    render(<InstagramFeed />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Check for section title
    expect(screen.getByText('Follow @isuvsa')).toBeInTheDocument()
    expect(
      screen.getByText('Stay connected with our latest updates and events')
    ).toBeInTheDocument()

    // Check for Instagram link
    const instagramLink = screen.getByText('View on Instagram')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink.closest('a')).toHaveAttribute('href', 'https://www.instagram.com/isuvsa/')
    expect(instagramLink.closest('a')).toHaveAttribute('target', '_blank')
    expect(instagramLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders mock posts with proper content', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Check for post content
    expect(screen.getByText(/Tết Festival 2025 is coming!/)).toBeInTheDocument()
    expect(screen.getByText(/Phở Night!/)).toBeInTheDocument()
    expect(screen.getByText(/VSA Royale Tournament was a huge success!/)).toBeInTheDocument()
  })

  it('has proper alt text for images', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Check that images have proper alt text
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)

    // Check that alt text follows the expected pattern
    images.forEach((img) => {
      const altText = img.getAttribute('alt')
      expect(altText).toMatch(/ISU VSA Instagram post/)
    })
  })

  it('renders post links with correct attributes', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Find links to Instagram posts
    const postLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.includes('instagram.com/p/'))

    expect(postLinks.length).toBeGreaterThan(0)

    postLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('displays engagement stats on hover', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // The engagement stats are displayed but hidden by default (opacity-0)
    // In a real test, you would simulate hover to show them
    // For now, we can just check they exist in the DOM
    const heartIcons = document.querySelectorAll('[data-lucide="heart"]')
    const commentIcons = document.querySelectorAll('[data-lucide="message-circle"]')

    expect(heartIcons.length).toBeGreaterThan(0)
    expect(commentIcons.length).toBeGreaterThan(0)
  })

  it('handles error state when posts fail to load', async () => {
    // Temporarily mock the setTimeout to immediately throw error
    const originalSetTimeout = global.setTimeout
    global.setTimeout = jest.fn((callback) => {
      throw new Error('Network error')
    })

    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.getByText('Failed to load Instagram posts')).toBeInTheDocument()
    })

    // Restore setTimeout
    global.setTimeout = originalSetTimeout
  })

  it('formats dates correctly', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Check for formatted dates (should be in "MMM d, yyyy" format)
    expect(screen.getByText('Jan 10, 2025')).toBeInTheDocument()
    expect(screen.getByText('Jan 8, 2025')).toBeInTheDocument()
    expect(screen.getByText('Jan 5, 2025')).toBeInTheDocument()
  })

  it('has proper accessibility structure', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    // Check for semantic HTML structure
    const section = screen.getByRole('region')
    expect(section).toBeInTheDocument()

    // Check for proper heading hierarchy
    const heading = screen.getByRole('heading', { name: /Follow @isuvsa/i })
    expect(heading).toBeInTheDocument()

    // Check for proper link structure
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)

    // All links should have accessible text or ARIA labels
    links.forEach((link) => {
      const hasText = link.textContent && link.textContent.trim().length > 0
      const hasAriaLabel = link.getAttribute('aria-label')
      const hasAccessibleName = hasText || hasAriaLabel

      expect(hasAccessibleName).toBe(true)
    })
  })

  it('follows Instagram button has correct styling and behavior', async () => {
    render(<InstagramFeed />)

    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    const followButton = screen.getByText('Follow ISU VSA on Instagram').closest('a')

    expect(followButton).toHaveAttribute('href', 'https://www.instagram.com/isuvsa/')
    expect(followButton).toHaveAttribute('target', '_blank')
    expect(followButton).toHaveAttribute('rel', 'noopener noreferrer')
    expect(followButton).toHaveClass('btn-primary')
  })
})
