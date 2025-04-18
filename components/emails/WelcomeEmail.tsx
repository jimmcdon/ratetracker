import { BaseEmailTemplate } from './BaseEmailTemplate';

interface WelcomeEmailProps {
  firstName: string;
  signupDate?: string;
}

export const WelcomeEmail = ({
  firstName,
  signupDate = new Date().toLocaleDateString()
}: WelcomeEmailProps) => {
  const bodyContent = `
    <p>Hi ${firstName},</p>
    
    <p>Welcome to Rate Tracker! We're excited to have you on board.</p>
    
    <p>Rate Tracker helps you monitor mortgage rates and notifies you when it's the right time to refinance or make a move in the housing market.</p>
    
    <div style="margin: 30px 0; padding: 20px; background-color: #f5f8ff; border-radius: 6px;">
      <h3 style="margin-top: 0; color: #0069ff;">Getting Started:</h3>
      <ol style="margin-bottom: 0; padding-left: 20px;">
        <li><strong>Set up your profile</strong> with your current mortgage details</li>
        <li><strong>Configure your rate alerts</strong> to match your financial goals</li>
        <li><strong>Connect with experts</strong> when you're ready to make a move</li>
      </ol>
    </div>
    
    <p>If you have any questions, simply reply to this email. Our team is here to help you make the most of Rate Tracker.</p>
    
    <p>Best regards,<br>The Rate Tracker Team</p>
  `;

  return BaseEmailTemplate({
    previewText: `Welcome to Rate Tracker, ${firstName}!`,
    heading: "Welcome to Rate Tracker!",
    bodyContent,
    footerText: `© Rate Tracker. You signed up on ${signupDate}.`
  });
}; 