# Email System Testing

## 1. API Endpoint Tests

### Test Email API (`/api/test-email`)
```bash
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```
Expected result: Success response with email ID

### General Email API (`/api/emails`)
```bash
curl -X POST http://localhost:3000/api/emails \
  -H "Content-Type: application/json" \
  -d '{
    "type": "test",
    "to": "your-email@example.com",
    "subject": "Test from API"
  }'
```
Expected result: Success response with email sent confirmation

### Welcome Email API
```bash
curl -X POST http://localhost:3000/api/emails \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome",
    "to": "your-email@example.com",
    "data": {
      "firstName": "Test User"
    }
  }'
```
Expected result: Success response and welcome email received

### Form Submission Email API
```bash
curl -X POST http://localhost:3000/api/emails \
  -H "Content-Type: application/json" \
  -d '{
    "type": "form_submission",
    "to": "admin@example.com",
    "subject": "New Form Submission",
    "data": {
      "name": "Test User",
      "email": "user@example.com",
      "message": "This is a test message",
      "formType": "Contact Form"
    }
  }'
```
Expected result: Success response and form submission email received

## 2. UI Form Tests

### Sign-up Modal Test
1. Navigate to homepage: http://localhost:3000/
2. Click "Track your rate" button
3. Fill out the form with test data:
   - Name: Test User
   - Email: your-email@example.com
   - Select a mortgage type
4. Click "Track Your Rate" button

Expected result: 
- Success toast notification
- Welcome email sent to the provided email
- Admin notification email sent to admin email

### Calculator Flow Test
1. Navigate to homepage: http://localhost:3000/
2. Complete the calculator steps with test data
3. Enter contact information:
   - Name: Test User
   - Email: your-email@example.com
   - (If applicable) Select "Yes" or "No" for realtor question
4. Continue to broker preference screen
5. Select "Yes, schedule a call with me"
6. Select a date and time
7. Click "Schedule Call"

Expected result:
- Success screen displayed
- Confirmation email received by user
- Notification emails received by admin and broker

## 3. Inbox Verification

After running the tests, check these inboxes for the test emails:

1. **User inbox** (your-email@example.com):
   - Welcome email
   - Test email
   - Call scheduling confirmation

2. **Admin inbox** (newlead@ratetracker.us):
   - Form submission notification
   - Call scheduling notification

3. **Broker inbox** (broker@ratetracker.us):
   - Call scheduling details

## 4. Error Testing

### Missing Required Fields
```bash
curl -X POST http://localhost:3000/api/emails \
  -H "Content-Type: application/json" \
  -d '{
    "type": "welcome"
  }'
```
Expected result: Error response with "recipient is required" message

### Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/emails \
  -H "Content-Type: application/json" \
  -d '{
    "type": "test",
    "to": "invalid-email"
  }'
```
Expected result: Error response about invalid email format

## 5. Production Testing

Once development testing is successful, repeat the critical tests in the production environment:

1. Send a test email in production
2. Complete a sign-up form submission in production
3. Verify correct sender domain (info@ratetracker.us) in production
4. Check email delivery and formatting in multiple email clients

## Notes
- For development testing, emails might be sent to test recipient (delivered@resend.dev)
- Check Resend dashboard to verify email delivery status
- Verify that the email templates render correctly in different email clients 