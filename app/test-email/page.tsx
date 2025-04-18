'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { sendEmail, EmailType } from '@/lib/email';
import { toast } from 'sonner';

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false);
  const [emailType, setEmailType] = useState<'welcome' | 'test'>('test');
  const [recipient, setRecipient] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleSendTest = async () => {
    if (!recipient) {
      toast.error('Please enter a recipient email address');
      return;
    }

    if (emailType === 'welcome' && !firstName) {
      toast.error('First name is required for welcome emails');
      return;
    }

    setLoading(true);
    
    try {
      if (emailType === 'welcome') {
        await sendEmail({
          type: 'welcome',
          to: recipient,
          data: {
            firstName
          }
        });
      } else {
        await sendEmail({
          type: 'test',
          to: recipient
        });
      }
      
      toast.success('Email sent successfully!');
    } catch (error: any) {
      toast.error(`Failed to send email: ${error.message}`);
      console.error('Email error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Test Email Functionality</CardTitle>
          <CardDescription>
            Send test emails to verify your email configuration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-type">Email Type</Label>
            <Select 
              value={emailType} 
              onValueChange={(value: 'welcome' | 'test') => setEmailType(value)}
            >
              <SelectTrigger id="email-type">
                <SelectValue placeholder="Select email type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="test">Test Email</SelectItem>
                <SelectItem value="welcome">Welcome Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Email</Label>
            <Input 
              id="recipient"
              type="email" 
              placeholder="recipient@example.com" 
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          {emailType === 'welcome' && (
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input 
                id="first-name"
                type="text" 
                placeholder="John" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSendTest} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send Test Email'}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Current environment: {process.env.NODE_ENV || 'development'}</p>
        <p className="mt-2">
          Note: In production, emails will be sent from info@ratetracker.us.
        </p>
      </div>
    </div>
  );
} 