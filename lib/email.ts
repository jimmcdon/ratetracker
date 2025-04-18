// Email types supported by the application
export type EmailType = 'welcome' | 'rate_alert' | 'form_submission' | 'test' | 'custom';

interface BaseEmailParams {
  to: string | string[]; // Support multiple recipients
  subject?: string;
  replyTo?: string; // Optional reply-to address
}

// Welcome email parameters
interface WelcomeEmailParams extends BaseEmailParams {
  type: 'welcome';
  data: {
    firstName: string;
    signupDate?: string;
  };
}

// Form submission email parameters
interface FormSubmissionEmailParams extends BaseEmailParams {
  type: 'form_submission';
  data: {
    name: string;
    email: string;
    message: string;
    formType: string;
  };
}

// Rate alert email parameters
interface RateAlertEmailParams extends BaseEmailParams {
  type: 'rate_alert';
  data: {
    firstName: string;
    currentRate: number;
    newRate: number;
    potentialSavings?: number;
  };
}

// Test email parameters
interface TestEmailParams extends BaseEmailParams {
  type: 'test';
  data?: Record<string, any>;
}

// Custom email parameters
interface CustomEmailParams extends BaseEmailParams {
  type: 'custom';
  data: {
    htmlContent: string;
    textContent?: string;
  };
}

// Union type of all email parameter types
export type EmailParams = 
  | WelcomeEmailParams
  | FormSubmissionEmailParams
  | RateAlertEmailParams
  | TestEmailParams
  | CustomEmailParams;

// Basic email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validate email addresses
function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Send an email using the application's email API
 * @param params Email parameters
 * @returns API response
 */
export async function sendEmail(params: EmailParams) {
  try {
    // Validate recipients
    const recipients = Array.isArray(params.to) ? params.to : [params.to];
    
    if (recipients.length === 0) {
      throw new Error('At least one recipient is required');
    }
    
    // Validate email format for all recipients
    recipients.forEach(email => {
      if (!validateEmail(email)) {
        throw new Error(`Invalid email format: ${email}`);
      }
    });
    
    // Validate reply-to if provided
    if (params.replyTo && !validateEmail(params.replyTo)) {
      throw new Error(`Invalid reply-to email format: ${params.replyTo}`);
    }

    // Make the API request
    const response = await fetch('/api/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.details || 'Failed to send email');
    }

    return data;
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Convenience function to send a welcome email
 * @param to Recipient email
 * @param firstName Recipient's first name
 * @param signupDate Optional signup date
 * @returns API response
 */
export function sendWelcomeEmail(
  to: string | string[], 
  firstName: string, 
  signupDate?: string
) {
  return sendEmail({
    type: 'welcome',
    to,
    data: {
      firstName,
      signupDate
    }
  });
}

/**
 * Convenience function to send a test email
 * @param to Recipient email
 * @returns API response
 */
export function sendTestEmail(to: string | string[]) {
  return sendEmail({
    type: 'test',
    to,
    subject: 'Test Email from Rate Tracker'
  });
} 