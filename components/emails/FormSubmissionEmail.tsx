import { BaseEmailTemplate } from './BaseEmailTemplate';

interface FormSubmissionEmailProps {
  name: string;
  email: string;
  message: string;
  formType: string;
}

export const FormSubmissionEmail = ({
  name,
  email,
  message,
  formType,
}: FormSubmissionEmailProps) => {
  const bodyContent = `
    <div style="background-color: #f5f8ff; padding: 20px; border-radius: 6px; margin-top: 20px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background-color: #ffffff; padding: 10px; border-radius: 4px; border: 1px solid #e0e0e0;">${message}</p>
    </div>
  `;

  return BaseEmailTemplate({
    previewText: `New ${formType} Submission from ${name}`,
    heading: `New Form Submission - ${formType}`,
    bodyContent,
    footerText: `© Rate Tracker. Submitted on ${new Date().toLocaleDateString()}.`
  });
}; 