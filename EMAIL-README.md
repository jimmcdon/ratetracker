# Rate Tracker Email System

This document provides a comprehensive guide to the Rate Tracker email system.

## Overview

The Rate Tracker email system is built on [Resend](https://resend.com) and provides a flexible, type-safe way to send various types of emails from the application. The system includes:

- Type-safe email sending utilities
- Reusable email templates with consistent styling
- Comprehensive error handling and validation
- Consistent logging for monitoring and debugging

## Setup and Configuration

### Environment Variables

The email system requires the following environment variables:

```
RESEND_API_KEY=your_resend_api_key
```

### DNS Configuration

For production, ensure your domain (ratetracker.us) is properly configured in the Resend dashboard with the following records:

1. SPF record
2. DKIM record
3. DMARC record

## Using the Email System

### Sending Emails

The system provides a simple, type-safe API for sending emails:

```typescript
import { sendEmail } from '@/lib/email';

// Send a welcome email
await sendEmail({
  type: 'welcome',
  to: 'user@example.com',
  data: {
    firstName: 'John'
  }
});

// Send a custom email
await sendEmail({
  type: 'custom',
  to: 'user@example.com',
  subject: 'Custom Subject',
  data: {
    htmlContent: '<p>Custom HTML content</p>',
    textContent: 'Custom plain text content'
  }
});
```

### Convenience Functions

For common email types, convenience functions are available:

```typescript
import { sendWelcomeEmail, sendTestEmail } from '@/lib/email';

// Send welcome email
await sendWelcomeEmail('user@example.com', 'John');

// Send test email
await sendTestEmail('user@example.com');
```

## Email Templates

### Base Template

All emails use the `BaseEmailTemplate` component that provides consistent styling and responsive layout. This template handles:

- Responsive design that works across email clients
- Proper HTML email structure with appropriate meta tags
- Consistent branding and styling

### Available Templates

1. **Welcome Email** (`WelcomeEmail.tsx`)
   - Sent when a user signs up
   - Personalized with user's first name
   - Includes getting started information

2. **Form Submission Email** (`FormSubmissionEmail.tsx`)
   - Sent when a user submits a form
   - Includes form data for review

## Testing

A testing interface is available at `/test-email` to verify email functionality:

1. Navigate to the test page
2. Select the email type
3. Enter recipient email
4. Fill in required fields based on email type
5. Send test email

## API Endpoints

### `/api/emails`

Main email sending endpoint that supports all email types.

**Request:**
```json
{
  "type": "welcome | test | form_submission | custom",
  "to": "user@example.com",
  "subject": "Optional custom subject",
  "data": {
    // Data specific to the email type
  },
  "replyTo": "optional@example.com"
}
```

### `/api/test-email`

Legacy endpoint that sends a simple test email.

**Request:**
```json
{
  "to": "user@example.com"
}
```

## Adding New Email Types

To add a new email type:

1. Create a new template in `components/emails/`
2. Update the `EmailType` type in `lib/email.ts`
3. Add a new interface for the email parameters
4. Add the email type handling in the `/api/emails` endpoint
5. Create a convenience function if needed

## Troubleshooting

Common issues and solutions:

1. **Emails not sending**
   - Check Resend API key in environment variables
   - Verify domain setup in Resend dashboard
   - Check error logs for detailed error messages

2. **Emails going to spam**
   - Ensure proper SPF, DKIM, and DMARC records
   - Avoid spam trigger words in subject lines
   - Use a consistent sender address

## Monitoring

All email activities are logged with:
- Success/failure status
- Email ID for tracking
- Recipient information
- Timestamp

Review logs for email-related issues and monitor delivery status.

## Future Enhancements

Planned improvements:
- Rate limiting to prevent abuse
- Click and open tracking
- Additional email templates for user engagement
- A/B testing framework for email content 