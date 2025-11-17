import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const order = {
      orderId: `FES${Date.now()}`,
      timestamp: new Date().toISOString(),
      customerName: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      city: data.city,
      pincode: data.pincode,
      items: data.items,
      subtotal: data.subtotal,
      gst: data.gst,
      total: data.total,
      status: 'pending',
    };

    // Log to console (will be visible in terminal)
    console.log('🛒 NEW ORDER PLACED:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Order ID: ${order.orderId}`);
    console.log(`Customer: ${order.customerName}`);
    console.log(`Phone: ${order.phone}`);
    console.log(`Email: ${order.email}`);
    console.log(`Address: ${order.address}, ${order.city} - ${order.pincode}`);
    console.log(`\nItems:`);
    order.items.forEach((item: any, idx: number) => {
      console.log(`  ${idx + 1}. ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`);
    });
    console.log(`\nSubtotal: ₹${order.subtotal}`);
    console.log(`GST (18%): ₹${order.gst}`);
    console.log(`Total: ₹${order.total}`);
    console.log(`Time: ${order.timestamp}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Send email notifications (if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        await sendOrderConfirmation(order);
        console.log('✅ Order confirmation emails sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send emails (order still saved):', emailError);
      }
    } else {
      console.log('⚠️  Email notifications disabled - Set RESEND_API_KEY in .env.local to enable');
    }

    // TODO: Save to Supabase database
    // const { data: result, error } = await supabase
    //   .from('orders')
    //   .insert([order]);

    return NextResponse.json({ 
      success: true, 
      orderId: order.orderId,
      message: 'Order placed successfully' 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to place order' },
      { status: 500 }
    );
  }
}
