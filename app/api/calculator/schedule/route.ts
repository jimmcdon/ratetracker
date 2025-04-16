import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Using verified domain email address
const FROM_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'Rate Tracker <info@ratetracker.us>'
  : 'Rate Tracker <onboarding@resend.dev>';
const TEST_EMAIL = 'delivered@resend.dev';  // Resend's test recipient email

export async function POST(req: Request) {
  try {
    const { name, email, date, time, calculatorData } = await req.json();

    // Use production email in production, test email in development
    const recipientEmail = process.env.NODE_ENV === 'production' ? email : TEST_EMAIL;
    const brokerEmail = process.env.NODE_ENV === 'production' ? 
      (process.env.BROKER_EMAIL || 'broker@ratetracker.us') : 
      TEST_EMAIL;

    console.log('Processing broker call scheduling:', {
      name,
      email: recipientEmail,
      date,
      time,
      calculatorData
    });

    // Format date for display
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [recipientEmail],
      subject: 'Your Broker Call is Scheduled! 📞',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #333; margin-bottom: 20px;">Your Call is Scheduled, ${name}! 🗓️</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-bottom: 15px;">Call Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">📅 Date: ${formattedDate}</li>
              <li style="margin: 10px 0;">⏰ Time: ${time}</li>
            </ul>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-bottom: 15px;">What to Expect:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">✓ A mortgage expert will call you at the scheduled time</li>
              <li style="margin: 10px 0;">✓ The call typically lasts 15-30 minutes</li>
              <li style="margin: 10px 0;">✓ They'll discuss your rate goals and options</li>
            </ul>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            Need to reschedule? Reply to this email or call us at (555) 123-4567.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated message from RateTracker.</p>
          </div>
        </div>
      `
    });

    // Send notification to broker
    const brokerEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [brokerEmail],
      subject: 'New Client Call Scheduled 📞',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #333; margin-bottom: 20px;">New Client Call Scheduled 📞</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-bottom: 15px;">Appointment Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">📅 Date: ${formattedDate}</li>
              <li style="margin: 10px 0;">⏰ Time: ${time}</li>
              <li style="margin: 10px 0;">👤 Client Name: ${name}</li>
              <li style="margin: 10px 0;">📧 Client Email: ${email}</li>
            </ul>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-bottom: 15px;">Loan Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">🏠 Loan Type: ${calculatorData.loanType}</li>
              <li style="margin: 10px 0;">💰 Property Value: ${calculatorData.propertyValue}</li>
              ${calculatorData.downPayment ? `<li style="margin: 10px 0;">💵 Down Payment: ${calculatorData.downPayment}</li>` : ''}
              ${calculatorData.loanAmount ? `<li style="margin: 10px 0;">💵 Current Loan: ${calculatorData.loanAmount}</li>` : ''}
              ${calculatorData.cashAmount ? `<li style="margin: 10px 0;">💵 Cash Out: ${calculatorData.cashAmount}</li>` : ''}
              <li style="margin: 10px 0;">🎯 Target Rate: ${calculatorData.targetRate}</li>
              <li style="margin: 10px 0;">💵 Target Payment: ${calculatorData.targetPayment}</li>
              <li style="margin: 10px 0;">⏱️ Loan Term: ${calculatorData.loanTerm}</li>
              ${calculatorData.currentRate ? `<li style="margin: 10px 0;">📊 Current Rate: ${calculatorData.currentRate}</li>` : ''}
              ${calculatorData.marketRate ? `<li style="margin: 10px 0;">📈 Market Rate: ${calculatorData.marketRate}</li>` : ''}
            </ul>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated notification from RateTracker.</p>
          </div>
        </div>
      `
    });

    console.log('Email sending results:', {
      userEmail: userEmailResponse,
      brokerEmail: brokerEmailResponse
    });

    return NextResponse.json({ 
      success: true,
      data: {
        userEmailId: userEmailResponse.data?.id,
        brokerEmailId: brokerEmailResponse.data?.id
      }
    });
  } catch (error) {
    console.error('Error scheduling broker call:', error);
    return NextResponse.json({ 
      error: 'Failed to schedule call',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}