'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function TestEmailPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [emailType, setEmailType] = useState<'test' | 'real'>('test');
  const [email, setEmail] = useState('delivered@resend.dev');

  const handleEmailTypeChange = (value: 'test' | 'real') => {
    console.log('Email type changed:', value);
    setEmailType(value);
    setEmail(value === 'test' ? 'delivered@resend.dev' : '');
  };

  const sendTestEmail = async () => {
    console.log('Send button clicked');
    
    if (!email) {
      console.log('No email provided');
      setStatus('error');
      setMessage('Please enter an email address');
      return;
    }

    try {
      console.log('Sending email to:', email);
      setStatus('loading');
      setMessage('Sending test email...');

      // Get the current hostname
      const baseUrl = window.location.origin;
      const apiUrl = `${baseUrl}/api/test-email`;
      console.log('Making request to:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
        }),
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));
      
      const data = await response.json();
      console.log('API Response data:', data);

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to send email');
      }

      setStatus('success');
      setMessage(`Test email sent successfully! ${emailType === 'test' ? 'Check the Resend dashboard' : 'Check your inbox'} for email ID: ${data.data?.emailId}`);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to send email');
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Test Email Configuration</h1>
        <div className="space-y-6">
          <RadioGroup
            value={emailType}
            onValueChange={(value) => handleEmailTypeChange(value as 'test' | 'real')}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem
                value="test"
                id="test"
                className="peer sr-only"
              />
              <Label
                htmlFor="test"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-semibold">Test Email</span>
                <span className="text-sm text-muted-foreground">
                  Using Resend's test address
                </span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="real"
                id="real"
                className="peer sr-only"
              />
              <Label
                htmlFor="real"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <span className="font-semibold">Real Email</span>
                <span className="text-sm text-muted-foreground">
                  Use your own email address
                </span>
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder={emailType === 'test' ? 'delivered@resend.dev' : 'Enter your email address'}
              value={email}
              onChange={(e) => {
                console.log('Email input changed:', e.target.value);
                setEmail(e.target.value);
              }}
            />
            {emailType === 'test' && (
              <p className="text-sm text-muted-foreground">
                Using Resend's test email address for verification
              </p>
            )}
          </div>

          <Button
            onClick={() => {
              console.log('Button clicked, current email:', email);
              sendTestEmail();
            }}
            disabled={status === 'loading'}
            className="w-full"
          >
            {status === 'loading' ? 'Sending...' : 'Send Test Email'}
          </Button>

          {message && (
            <div
              className={`p-4 rounded-md ${
                status === 'success'
                  ? 'bg-green-50 text-green-800'
                  : status === 'error'
                  ? 'bg-red-50 text-red-800'
                  : 'bg-blue-50 text-blue-800'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 