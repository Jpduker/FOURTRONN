import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const contactSubmission = {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    // Log to console (will be visible in terminal)
    console.log('📧 NEW CONTACT FORM SUBMISSION:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Name: ${contactSubmission.name}`);
    console.log(`Email: ${contactSubmission.email}`);
    console.log(`Phone: ${contactSubmission.phone}`);
    console.log(`Message: ${contactSubmission.message}`);
    console.log(`Time: ${contactSubmission.timestamp}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Send email notification (if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await sendContactNotification(contactSubmission);
        console.log('✅ Contact notification email sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send email (message still saved):', emailError);
      }
    } else {
      console.log('⚠️  Email notifications disabled - Set RESEND_API_KEY in .env.local to enable');
    }

    // TODO: Save to Supabase database
    // const { data: result, error } = await supabase
    //   .from('contact_submissions')
    //   .insert([contactSubmission]);

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
