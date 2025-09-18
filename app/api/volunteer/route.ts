import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      year,
      availability,
      interests,
      experience,
      motivation,
    } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Notify volunteer coordinator
    // 3. Send confirmation email

    console.log('New volunteer application:', {
      name,
      email,
      phone,
      year,
      availability,
      interests,
      experience,
      motivation,
      appliedAt: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: `Thank you for volunteering, ${name}! We'll contact you soon about opportunities.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Volunteer application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}