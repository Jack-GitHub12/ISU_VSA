import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, major, year, dietary, interests, tier } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
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
    // 2. Send confirmation email
    // 3. Add to mailing list
    // 4. Create member record

    console.log('New membership registration:', {
      firstName,
      lastName,
      email,
      major,
      year,
      dietary,
      interests,
      tier,
      registeredAt: new Date().toISOString(),
    })

    // In production, you would send an email like:
    /*
    await sendEmail({
      to: email,
      subject: 'Welcome to ISU VSA!',
      html: `
        <h1>Welcome to ISU VSA, ${firstName}!</h1>
        <p>Thank you for joining the ISU Vietnamese Student Association.</p>
        <p>Your ${tier} membership has been confirmed.</p>
        <p>You'll receive updates about upcoming events and activities soon.</p>
        <p>Follow us on Instagram @isuvsa for the latest news!</p>
      `,
    })
    */

    return NextResponse.json(
      {
        success: true,
        message: `Welcome to ISU VSA, ${firstName}! Check your email for confirmation.`,
        membership: {
          tier,
          memberSince: new Date().toISOString(),
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Membership registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}