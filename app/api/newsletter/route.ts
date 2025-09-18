import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, preferences } = body

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Add to mailing list (Mailchimp, SendGrid, etc.)
    // 2. Save preferences to database
    // 3. Send welcome email

    console.log('Newsletter signup:', {
      email,
      name: name || 'Not provided',
      preferences: preferences || [],
      subscribedAt: new Date().toISOString(),
    })

    // In production:
    /*
    await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
      },
    })
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the ISU VSA newsletter!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}