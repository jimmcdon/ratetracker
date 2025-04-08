import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, content } = await req.json();

    const data = await resend.emails.send({
      from: 'RateTracker <onboarding@resend.dev>', // Update this with your verified domain
      to: [to],
      subject: subject,
      html: content,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 