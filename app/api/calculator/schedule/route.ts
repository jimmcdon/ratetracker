import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BaseEmailTemplate } from '@/components/emails/BaseEmailTemplate';

// Using verified domain email address
const FROM_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'Rate Tracker <info@ratetracker.us>'
  : 'Rate Tracker <info@ratetracker.us>'; // Using production email for testing

const TEST_EMAIL = 'delivered@resend.dev';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Get request data
    const { name, email, date, time } = await req.json();

    // Validate required data
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, date, and time are required' },
        { status: 400 }
      );
    }

    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    
    // Use production email in production, test email in development
    const recipientEmail = process.env.NODE_ENV === 'production' ? email : TEST_EMAIL;
    const adminEmail = process.env.NODE_ENV === 'production' ? 
      (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'newlead@ratetracker.us') : 
      TEST_EMAIL;
    const brokerEmail = process.env.NODE_ENV === 'production' ?
      (process.env.NEXT_PUBLIC_BROKER_EMAIL || 'broker@ratetracker.us') :
      TEST_EMAIL;

    console.log('Processing call scheduling:', {
      name,
      email: recipientEmail,
      date: formattedDate,
      time
    });

    // Create user email content
    const userEmailHtml = BaseEmailTemplate({
      previewText: `Your call with Rate Tracker is scheduled for ${formattedDate} at ${time}`,
      heading: `Your Call is Confirmed, ${name}! 👋`,
      bodyContent: `
        <div style="background-color: #f5f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0069ff;">Call Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;">📅 Date: ${formattedDate}</li>
            <li style="margin: 10px 0;">⏰ Time: ${time}</li>
            <li style="margin: 10px 0;">📞 Call Type: Phone Call</li>
          </ul>
          <p style="margin-top: 15px;">One of our mortgage experts will call you at the scheduled time. Please make sure you're available.</p>
        </div>

        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          In the meantime, we're tracking rates based on your goals and will notify you of any opportunities.
        </p>
      `,
      footerText: "Need to reschedule? Reply to this email or call us at (555) 123-4567."
    });

    // Create broker email content
    const brokerEmailHtml = BaseEmailTemplate({
      previewText: `New call scheduled with ${name} on ${formattedDate} at ${time}`,
      heading: "New Call Scheduled 📅",
      bodyContent: `
        <div style="background-color: #f5f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0069ff;">Call Details:</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;">👤 Name: ${name}</li>
            <li style="margin: 10px 0;">📧 Email: ${email}</li>
            <li style="margin: 10px 0;">📅 Date: ${formattedDate}</li>
            <li style="margin: 10px 0;">⏰ Time: ${time}</li>
          </ul>
        </div>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #444; margin-bottom: 15px;">Mortgage Details:</h3>
          <p>See the customer portal for full details of their mortgage calculation.</p>
        </div>
      `,
      footerText: "This is an automated notification from RateTracker."
    });

    // Create admin email content
    const adminEmailHtml = BaseEmailTemplate({
      previewText: `New call scheduled with ${name} on ${formattedDate} at ${time}`,
      heading: "Call Scheduled: New Lead Follow-up",
      bodyContent: `
        <div style="background-color: #f5f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p>A broker call has been scheduled with:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin: 10px 0;">👤 Name: ${name}</li>
            <li style="margin: 10px 0;">📧 Email: ${email}</li>
            <li style="margin: 10px 0;">📅 Date: ${formattedDate}</li>
            <li style="margin: 10px 0;">⏰ Time: ${time}</li>
          </ul>
        </div>
      `,
      footerText: "This is an automated notification from RateTracker."
    });

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [recipientEmail],
      subject: 'Your Call with Rate Tracker is Scheduled! 📅',
      html: userEmailHtml
    });

    // Send notification to broker
    const brokerEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [brokerEmail],
      subject: 'New Call Scheduled 📅',
      html: brokerEmailHtml
    });

    // Also send to admin
    const adminEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      subject: 'Call Scheduled: New Lead Follow-up',
      html: adminEmailHtml
    });

    console.log('Email sending results:', {
      userEmail: userEmailResponse,
      brokerEmail: brokerEmailResponse,
      adminEmail: adminEmailResponse
    });

    return NextResponse.json({ 
      success: true,
      data: {
        date: formattedDate,
        time,
        userEmailId: userEmailResponse.data?.id
      }
    });
  } catch (error) {
    console.error('Error scheduling call:', error);
    return NextResponse.json({ 
      error: 'Failed to schedule call',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}