import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Using verified domain email address
const FROM_EMAIL = process.env.NODE_ENV === 'production' 
  ? 'Rate Tracker <info@ratetracker.us>'
  : 'Rate Tracker <info@ratetracker.us>'; // Using production email for testing
const TEST_EMAIL = 'delivered@resend.dev';  // Resend's test recipient email

export async function POST(req: Request) {
  try {
    const { name, email, calculatorData, hasRealtor } = await req.json();
    
    // Use production email in production, test email in development
    const recipientEmail = process.env.NODE_ENV === 'production' ? email : TEST_EMAIL;
    const adminEmail = process.env.NODE_ENV === 'production' ? 
      (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'newlead@ratetracker.us') : 
      TEST_EMAIL;

    console.log('Processing calculator submission:', {
      name,
      email: recipientEmail,
      calculatorData,
      hasRealtor
    });

    // Send confirmation to user
    const userEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [recipientEmail],
      subject: 'Your Rate Tracking is Set Up! 🎯',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #333; margin-bottom: 20px;">Thanks for using RateTracker, ${name}! 👋</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin-bottom: 15px;">We'll keep you updated when rates match your target:</p>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">🎯 Target Rate: ${calculatorData.targetRate}%</li>
              <li style="margin: 10px 0;">💰 Monthly Payment Goal: ${calculatorData.targetPayment}</li>
              ${calculatorData.loanGoal ? `<li style="margin: 10px 0;">🏠 Loan Type: ${calculatorData.loanGoal}</li>` : ''}
            </ul>
          </div>

          <p style="color: #666; font-size: 14px; margin-top: 20px;">
            We'll monitor rates daily and notify you when there's an opportunity to save.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated message from RateTracker. Please do not reply to this email.</p>
          </div>
        </div>
      `
    });

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: FROM_EMAIL,
      to: [adminEmail],
      subject: 'New Rate Tracking Lead 🎯',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #333; margin-bottom: 20px;">New Rate Tracking Lead 🎯</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-bottom: 15px;">Lead Details:</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin: 10px 0;">👤 Name: ${name}</li>
              <li style="margin: 10px 0;">📧 Email: ${email}</li>
              <li style="margin: 10px 0;">🏠 Loan Type: ${calculatorData.loanType}</li>
              <li style="margin: 10px 0;">💰 Property Value: ${calculatorData.propertyValue}</li>
              ${calculatorData.downPayment ? `<li style="margin: 10px 0;">💵 Down Payment: ${calculatorData.downPayment}</li>` : ''}
              ${calculatorData.loanAmount ? `<li style="margin: 10px 0;">💵 Current Loan: ${calculatorData.loanAmount}</li>` : ''}
              ${calculatorData.cashAmount ? `<li style="margin: 10px 0;">💵 Cash Out: ${calculatorData.cashAmount}</li>` : ''}
              ${hasRealtor !== undefined ? `<li style="margin: 10px 0;">🏠 Working with realtor: ${hasRealtor ? 'Yes' : 'No'}</li>` : ''}
            </ul>
          </div>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #444; margin-bottom: 15px;">Rate Goals:</h3>
            <ul style="list-style: none; padding: 0;">
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
      adminEmail: adminEmailResponse
    });

    return NextResponse.json({ 
      success: true,
      data: {
        userEmailId: userEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id
      }
    });
  } catch (error) {
    console.error('Error processing calculator submission:', error);
    return NextResponse.json({ 
      error: 'Failed to process submission',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}