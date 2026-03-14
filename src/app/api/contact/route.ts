import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // --- Validation ---
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // --- Check env vars ---
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'RESEND_API_KEY not set.' }, { status: 500 });
    }

    if (!process.env.CONTACT_EMAIL) {
      return NextResponse.json({ error: 'CONTACT_EMAIL not set.' }, { status: 500 });
    }

    // --- Send email with Resend ---
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      [process.env.CONTACT_EMAIL],
      subject: `Portfolio message from ${name}: ${subject || 'No subject'}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #00D4FF;">New message from your portfolio</h2>
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject || '(none)'}</p>
          <hr />
          <p>${message}</p>
        </div>
      `,
      replyTo: email,
    });

    console.log('Resend result:', JSON.stringify(result));

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error('[Contact API] Error:', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}