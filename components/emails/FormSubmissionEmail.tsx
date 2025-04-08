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
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Form Submission - ${formType}</h2>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <div style="margin-top: 20px; color: #666; font-size: 12px;">
        <p>This is an automated message from RateTracker.</p>
      </div>
    </div>
  `;
}; 