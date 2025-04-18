import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import { FormSubmissionEmail } from '@/components/emails/FormSubmissionEmail';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Using verified domain email address
const FROM_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'Rate Tracker <info@ratetracker.us>'
  : 'Rate Tracker <info@ratetracker.us>'; // Using production email for testing

type EmailType = 'welcome' | 'rate_alert' | 'form_submission' | 'test' | 'custom';

export async function POST(req: Request) {
  try {
    const { type, to, subject, data, replyTo } = await req.json();

    if (!type || !to) {
      return NextResponse.json(
        { error: 'Email type and recipient are required' },
        { status: 400 }
      );
    }

    // Track email metrics with appropriate logging
    console.log(`Sending ${type} email to: ${Array.isArray(to) ? to.join(', ') : to}`);

    let htmlContent = '';
    let textContent = '';
    let emailSubject = subject;

    // Generate email content based on type
    switch (type as EmailType) {
      case 'welcome':
        if (!data.firstName) {
          return NextResponse.json(
            { error: 'First name is required for welcome emails' },
            { status: 400 }
          );
        }
        htmlContent = WelcomeEmail({ 
          firstName: data.firstName,
          signupDate: data.signupDate
        });
        textContent = `Welcome to Rate Tracker, ${data.firstName}! We're excited to have you on board.`;
        emailSubject = emailSubject || `Welcome to Rate Tracker, ${data.firstName}!`;
        break;

      case 'form_submission':
        htmlContent = FormSubmissionEmail({
          name: data.name,
          email: data.email,
          message: data.message,
          formType: data.formType
        });
        textContent = `New form submission from ${data.name} (${data.email}): ${data.message}`;
        emailSubject = emailSubject || `New ${data.formType} Form Submission`;
        break;

      case 'test':
        htmlContent = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Test Email from Rate Tracker</h2>
            <p>This is a test email sent at ${new Date().toLocaleString()}</p>
            <p>If you received this email, our email system is working correctly! 🎉</p>
          </div>
        `;
        textContent = 'This is a test email from Rate Tracker. If you received this, our email system is working correctly!';
        emailSubject = emailSubject || 'Test Email from Rate Tracker';
        break;

      case 'custom':
        if (!data.htmlContent) {
          return NextResponse.json(
            { error: 'HTML content is required for custom emails' },
            { status: 400 }
          );
        }
        htmlContent = data.htmlContent;
        textContent = data.textContent || 'Please view this email with an HTML email client';
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    // Send the email
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
      reply_to: replyTo || undefined,
    });

    // Log success or failure
    if (response.error) {
      console.error('Failed to send email:', response.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: response.error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', response.data?.id);
    return NextResponse.json({ 
      success: true, 
      data: {
        id: response.data?.id,
        message: `${type} email sent successfully`
      }
    });

  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process email request',
        details: error.message
      },
      { status: 500 }
    );
  }
} 