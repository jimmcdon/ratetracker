import { NextResponse } from 'next/server';

export async function GET() {
  const envInfo = {
    nodeEnv: process.env.NODE_ENV,
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyLength: process.env.RESEND_API_KEY?.length,
    resendKeyStart: process.env.RESEND_API_KEY?.substring(0, 4),
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('RESEND')),
  };

  return NextResponse.json(envInfo);
} 