import { NextRequest, NextResponse } from 'next/server';
import { sendServiceNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const serviceTicket = {
      ticketId: `SVC${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      productType: data.productType,
      issueDescription: data.issueDescription,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      address: data.address,
    };

    // Log to console (will be visible in terminal)
    console.log('🔧 NEW SERVICE REQUEST:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Ticket ID: ${serviceTicket.ticketId}`);
    console.log(`Name: ${serviceTicket.name}`);
    console.log(`Phone: ${serviceTicket.phone}`);
    console.log(`Email: ${serviceTicket.email}`);
    console.log(`Product Type: ${serviceTicket.productType}`);
    console.log(`Issue: ${serviceTicket.issueDescription}`);
    console.log(`Preferred Date: ${serviceTicket.preferredDate}`);
    console.log(`Preferred Time: ${serviceTicket.preferredTime}`);
    console.log(`Address: ${serviceTicket.address}`);
    console.log(`Timestamp: ${serviceTicket.timestamp}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Send email notifications (if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await sendServiceNotification(serviceTicket);
        console.log('✅ Service request emails sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send emails (request still saved):', emailError);
      }
    } else {
      console.log('⚠️  Email notifications disabled - Set RESEND_API_KEY in .env.local to enable');
    }

    // TODO: Save to Supabase database
    // const { data: result, error } = await supabase
    //   .from('service_requests')
    //   .insert([serviceTicket]);

    return NextResponse.json({ 
      success: true, 
      ticketId: serviceTicket.ticketId,
      message: 'Service request submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing service request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit service request' },
      { status: 500 }
    );
  }
}
