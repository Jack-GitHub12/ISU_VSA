import DOMPurify from 'dompurify'

export function sanitizeHTML(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: return empty string or basic sanitization
    // In production, you'd want to use a server-side DOM implementation
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }

  // Client-side: use DOMPurify
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['iframe', 'blockquote', 'div', 'p', 'a', 'br', 'span'],
    ALLOWED_ATTR: [
      'src',
      'width',
      'height',
      'frameborder',
      'allowfullscreen',
      'allow',
      'class',
      'style',
      'href',
      'target',
      'rel',
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?:)?\/\/)(?:www\.)?(?:instagram\.com|facebook\.com)\//i,
    ADD_ATTR: ['target', 'rel'],
  })
}

export function isValidInstagramEmbed(html: string): boolean {
  // Check if it's a valid Instagram embed code
  const instagramPattern = /^<(?:blockquote|iframe)[^>]*(?:instagram\.com)[^>]*>[\s\S]*$/i
  return instagramPattern.test(html.trim())
}

export function sanitizeInstagramEmbed(html: string): string {
  if (!isValidInstagramEmbed(html)) {
    return ''
  }
  return sanitizeHTML(html)
}
