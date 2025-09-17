import { cn } from '../../lib/utils'

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
  })

  it('handles conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
    expect(result).toContain('base-class')
    expect(result).toContain('conditional-class')
    expect(result).not.toContain('hidden-class')
  })

  it('handles undefined and null values', () => {
    const result = cn('valid-class', undefined, null, 'another-class')
    expect(result).toContain('valid-class')
    expect(result).toContain('another-class')
  })

  it('merges tailwind conflicting classes correctly', () => {
    // This assumes tailwind-merge is working correctly
    const result = cn('px-4 px-2') // px-2 should override px-4
    expect(result).toBe('px-2')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
    expect(result).toContain('class3')
  })

  it('handles objects with conditional classes', () => {
    const result = cn({
      active: true,
      inactive: false,
      highlighted: true,
    })
    expect(result).toContain('active')
    expect(result).toContain('highlighted')
    expect(result).not.toContain('inactive')
  })
})
