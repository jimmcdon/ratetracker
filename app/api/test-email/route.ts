import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BaseEmailTemplate } from '@/components/emails/BaseEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

// Using verified domain email address
const FROM_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'Rate Tracker <info@ratetracker.us>'
  : 'Rate Tracker <info@ratetracker.us>'; // Using production email for testing

export async function POST(req: Request) {
  try {
    const { to } = await req.json();
    
    if (!to) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    // Temporarily bypass development check for testing
    const recipientEmail = to;

    console.log('Sending email with Resend:', {
      from: FROM_EMAIL,
      to: [recipientEmail],
      subject: 'Test Email from Rate Tracker'
    });

    // Create email content using BaseEmailTemplate
    const htmlContent = BaseEmailTemplate({
      previewText: "Test Email from Rate Tracker",
      heading: "Test Email from Rate Tracker",
      bodyContent: `
        <p>This is a test email sent to verify our email configuration.</p>
        
        <div style="background-color: #f5f8ff; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0069ff;">Email Details:</h3>
          <ul style="margin-bottom: 0; padding-left: 20px;">
            <li><strong>Sent to:</strong> ${recipientEmail}</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
            <li><strong>Environment:</strong> ${process.env.NODE_ENV}</li>
          </ul>
        </div>
        
        <p>If you received this email, our email system is working correctly! 🎉</p>
      `,
      footerText: "© Rate Tracker. This is a test email."
    });

    // Send email
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: [recipientEmail],
      subject: 'Test Email from Rate Tracker',
      html: htmlContent,
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