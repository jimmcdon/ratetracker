import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Using verified domain email address
const FROM_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'Rate Tracker <info@ratetracker.us>'
  : 'Rate Tracker <info@ratetracker.us>'; // Using production email for testing

export async function POST(req: Request) {
  try {
    const { to, subject, content } = await req.json();

    // Log email attempt for monitoring
    console.log(`Sending email to ${to} with subject: ${subject}`);

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: subject,
      html: content,
    });

    console.log(`Email sent successfully. ID: ${data.data?.id}`);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error.message
    }, { status: 500 });
  }
} 