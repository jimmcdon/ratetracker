# Form Submission to Database CRM Integration TODO

## Overview
This document outlines the tasks required to integrate form submissions into a database to create a lightweight CRM system for brokers to manage opportunities.

## Database Setup
- [ ] Choose appropriate database solution (options: MongoDB, Prisma with PostgreSQL, or Supabase)
- [ ] Create database schema for opportunity management
- [ ] Set up database connection in the Next.js application
- [ ] Configure environment variables for database access
- [ ] Implement database migration scripts

## Data Models
- [ ] Create Lead/Opportunity schema with fields:
  - Contact info (name, email, phone)
  - Source (form type)
  - Loan details (loan type, amount, term, rate)
  - Status (new, contacted, qualified, closed, etc.)
  - Notes
  - Timestamps (created, updated)
  - Assigned broker
- [ ] Implement validation for data models
- [ ] Create TypeScript interfaces for type safety

## API Development
- [ ] Create API route for form submission that sends to both email and database
- [ ] Implement CRUD endpoints for opportunity management
  - GET /api/opportunities - List all opportunities
  - GET /api/opportunities/:id - Get single opportunity
  - POST /api/opportunities - Create opportunity (from form)
  - PUT /api/opportunities/:id - Update opportunity
  - DELETE /api/opportunities/:id - Archive/delete opportunity
- [ ] Implement filtering and sorting for opportunities list
- [ ] Add authentication middleware to secure API endpoints

## Form Integration
- [ ] Modify existing form submission handlers to store data in database
- [ ] Update SignUpModal.tsx to support database submission
- [ ] Add PostHog event tracking for form submissions (using FORM_SUBMISSION enum)
- [ ] Implement proper error handling and validation
- [ ] Add success/failure notifications

## CRM Interface
- [ ] Create broker dashboard page
- [ ] Implement opportunities list view with filters
  - Status filter
  - Date range filter
  - Source filter
- [ ] Create opportunity detail view
- [ ] Add note-taking functionality
- [ ] Implement status update workflow
- [ ] Build email communication tracking

## Authentication
- [ ] Set up broker authentication system
- [ ] Create login page
- [ ] Implement session management
- [ ] Add role-based access control (Admin vs Broker)
- [ ] Secure all CRM routes

## Deployment & Testing
- [ ] Write unit tests for API endpoints
- [ ] Test form submission to database flow
- [ ] Create database backup strategy
- [ ] Configure production environment
- [ ] Deploy database and updated application

## Integration with Existing Features
- [ ] Connect with email notification system
- [ ] Ensure PostHog tracking is consistent
- [ ] Maintain existing functionality during integration 