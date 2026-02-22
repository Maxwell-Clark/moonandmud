import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('subscribers').insert({ email: normalizedEmail });

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: "You're already subscribed!" }, { status: 200 });
      }
      console.error('Subscribe error:', error);
      return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
