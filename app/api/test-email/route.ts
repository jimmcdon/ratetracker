import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Using Resend's test email address for all environments until domain is verified
const FROM_EMAIL = 'Rate Tracker <delivered@resend.dev>';

export async function POST(req: Request) {
  try {
    // Parse request body
    const { to } = await req.json();
    
    if (!to) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    console.log('Sending email with Resend:', {
      from: FROM_EMAIL,
      to: [to],
      subject: 'Test Email from Rate Tracker'
    });

    // Send email
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: 'Test Email from Rate Tracker',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email from Rate Tracker</h2>
          <p>This is a test email sent to verify our email configuration.</p>
          <p>Details:</p>
          <ul>
            <li>Sent to: ${to}</li>
            <li>Time: ${new Date().toLocaleString()}</li>
            <li>Environment: ${process.env.NODE_ENV}</li>
          </ul>
          <p>If you received this email, our email system is working correctly! 🎉</p>
        </div>
      `,
      text: 'This is a test email from Rate Tracker. If you received this, our email system is working correctly!',
    });

    // Log the complete response for debugging
    console.log('Complete Resend response:', JSON.stringify(response, null, 2));

    return NextResponse.json({ 
      success: true, 
      data: {
        emailId: response.data?.id || 'unknown',
        message: 'Email sent successfully',
        debug: response // Include full response for debugging
      }
    });

  } catch (error: any) {
    // Log the complete error object
    console.error('Complete Email Error:', JSON.stringify(error, null, 2));
    console.error('Error stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error.message,
        code: error.code,
        debug: {
          name: error.name,
          message: error.message,
          code: error.code,
          response: error.response
        }
      },
      { status: error.status || 500 }
    );
  }
} 