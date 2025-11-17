import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface OrderEmailData {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  gst: number;
  total: number;
}

interface ServiceEmailData {
  ticketId: string;
  name: string;
  phone: string;
  email: string;
  productType: string;
  issueDescription: string;
  preferredDate: string;
  preferredTime?: string;
  address: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendOrderConfirmation(orderData: OrderEmailData) {
  if (!resend) {
    console.log('⚠️  Resend not configured - skipping email');
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    // Email to customer
    const customerEmail = await resend.emails.send({
      from: 'Fourtronn Energy Systems <onboarding@resend.dev>',
      to: [orderData.email],
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: generateOrderConfirmationHTML(orderData),
    });

    // Email to business owner
    const ownerEmail = await resend.emails.send({
      from: 'Fourtronn Orders <onboarding@resend.dev>',
      to: ['jayaprakashnis619@gmail.com'],
      subject: `🛒 New Order Received - ${orderData.orderId}`,
      html: generateOrderNotificationHTML(orderData),
    });

    return { success: true, customerEmail, ownerEmail };
  } catch (error) {
    console.error('Error sending order emails:', error);
    return { success: false, error };
  }
}

export async function sendServiceNotification(serviceData: ServiceEmailData) {
  if (!resend) {
    console.log('⚠️  Resend not configured - skipping email');
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    // Email to customer
    const customerEmail = await resend.emails.send({
      from: 'Fourtronn Service <onboarding@resend.dev>',
      to: [serviceData.email],
      subject: `Service Request Confirmed - ${serviceData.ticketId}`,
      html: generateServiceConfirmationHTML(serviceData),
    });

    // Email to business owner
    const ownerEmail = await resend.emails.send({
      from: 'Fourtronn Service <onboarding@resend.dev>',
      to: ['jayaprakashnis619@gmail.com'],
      subject: `🔧 New Service Request - ${serviceData.ticketId}`,
      html: generateServiceNotificationHTML(serviceData),
    });

    return { success: true, customerEmail, ownerEmail };
  } catch (error) {
    console.error('Error sending service emails:', error);
    return { success: false, error };
  }
}

export async function sendContactNotification(contactData: ContactEmailData) {
  if (!resend) {
    console.log('⚠️  Resend not configured - skipping email');
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    const ownerEmail = await resend.emails.send({
      from: 'Fourtronn Contact <onboarding@resend.dev>',
      to: ['jayaprakashnis619@gmail.com'],
      subject: `📧 New Contact Message from ${contactData.name}`,
      html: generateContactNotificationHTML(contactData),
    });

    return { success: true, ownerEmail };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error };
  }
}

// HTML Email Templates

function generateOrderConfirmationHTML(data: OrderEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Order Confirmed!</h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Thank you for choosing Fourtronn Energy Systems</p>
    </div>

    <!-- Order ID -->
    <div style="padding: 30px 20px; text-align: center; background-color: #eff6ff;">
      <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Order ID</p>
      <p style="margin: 0; color: #2563eb; font-size: 24px; font-weight: bold;">${data.orderId}</p>
    </div>

    <!-- Order Details -->
    <div style="padding: 30px 20px;">
      <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 20px;">Order Summary</h2>
      
      ${data.items.map(item => `
        <div style="padding: 15px 0; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="color: #374151; font-weight: 500;">${item.name} × ${item.quantity}</span>
            <span style="color: #111827; font-weight: 600;">₹${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
      `).join('')}

      <!-- Totals -->
      <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Subtotal:</span>
          <span style="color: #374151;">₹${data.subtotal.toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">GST (18%):</span>
          <span style="color: #374151;">₹${data.gst.toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #6b7280;">Shipping:</span>
          <span style="color: #10b981; font-weight: 600;">FREE</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 2px solid #e5e7eb;">
          <span style="color: #111827; font-size: 18px; font-weight: bold;">Total:</span>
          <span style="color: #2563eb; font-size: 20px; font-weight: bold;">₹${data.total.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <!-- Delivery Details -->
    <div style="padding: 0 20px 30px 20px;">
      <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 20px;">Delivery Details</h2>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Name:</strong> ${data.customerName}</p>
        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Phone:</strong> ${data.phone}</p>
        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 0; color: #374151;"><strong>Address:</strong> ${data.address}, ${data.city} - ${data.pincode}</p>
      </div>
    </div>

    <!-- Contact Info -->
    <div style="background-color: #eff6ff; padding: 30px 20px; text-align: center;">
      <p style="margin: 0 0 15px 0; color: #374151;">Need help with your order?</p>
      <p style="margin: 0 0 5px 0;">
        <a href="tel:+919047223355" style="color: #2563eb; text-decoration: none; font-weight: 600;">📞 +91 90472 23355</a>
      </p>
      <p style="margin: 0;">
        <a href="mailto:leninups@gmail.com" style="color: #2563eb; text-decoration: none; font-weight: 600;">✉️ leninups@gmail.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div style="padding: 20px; text-align: center; background-color: #1f2937; color: #9ca3af;">
      <p style="margin: 0 0 10px 0; font-size: 14px;">Fourtronn Energy Systems</p>
      <p style="margin: 0 0 10px 0; font-size: 12px;">No.1, Vaithilingam Street, Saminathapuram, Salem - 636009</p>
      <p style="margin: 0; font-size: 12px;">GST: 33AERPL6929E1Z8</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateOrderNotificationHTML(data: OrderEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 26px;">🛒 New Order Received!</h1>
    </div>

    <div style="padding: 30px 20px;">
      <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #047857; margin: 0 0 10px 0;">Order ID: ${data.orderId}</h2>
        <p style="margin: 0; color: #065f46; font-size: 18px; font-weight: bold;">Total: ₹${data.total.toLocaleString()}</p>
      </div>

      <h3 style="color: #111827; margin: 20px 0 15px 0;">Customer Details:</h3>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="padding: 8px 0; color: #374151;"><strong>Name:</strong> ${data.customerName}</li>
        <li style="padding: 8px 0; color: #374151;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></li>
        <li style="padding: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></li>
        <li style="padding: 8px 0; color: #374151;"><strong>Address:</strong> ${data.address}, ${data.city} - ${data.pincode}</li>
      </ul>

      <h3 style="color: #111827; margin: 25px 0 15px 0;">Items Ordered:</h3>
      ${data.items.map(item => `
        <div style="padding: 12px; background-color: #f9fafb; margin-bottom: 10px; border-radius: 6px;">
          <div style="font-weight: 600; color: #111827;">${item.name}</div>
          <div style="color: #6b7280; font-size: 14px;">Quantity: ${item.quantity} | Price: ₹${item.price.toLocaleString()}</div>
          <div style="color: #2563eb; font-weight: 600; margin-top: 5px;">Subtotal: ₹${(item.price * item.quantity).toLocaleString()}</div>
        </div>
      `).join('')}

      <div style="margin-top: 20px; padding: 20px; background-color: #dbeafe; border-radius: 8px;">
        <div style="font-size: 14px; color: #1e40af; margin-bottom: 8px;">Subtotal: ₹${data.subtotal.toLocaleString()}</div>
        <div style="font-size: 14px; color: #1e40af; margin-bottom: 8px;">GST (18%): ₹${data.gst.toLocaleString()}</div>
        <div style="font-size: 18px; color: #1e3a8a; font-weight: bold;">Total: ₹${data.total.toLocaleString()}</div>
      </div>

      <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="margin: 0; color: #92400e; font-weight: 600;">⚠️ Action Required:</p>
        <p style="margin: 5px 0 0 0; color: #92400e;">Please contact the customer to confirm delivery and process this order.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

function generateServiceConfirmationHTML(data: ServiceEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Service Request Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔧 Service Request Received!</h1>
    </div>

    <div style="padding: 30px 20px;">
      <div style="background-color: #f5f3ff; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
        <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Ticket ID</p>
        <p style="margin: 0; color: #7c3aed; font-size: 24px; font-weight: bold;">${data.ticketId}</p>
      </div>

      <p style="color: #374151; line-height: 1.6; margin-bottom: 25px;">
        Thank you for contacting Fourtronn Energy Systems. We have received your service request and our technical team will contact you shortly.
      </p>

      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
        <h3 style="margin: 0 0 15px 0; color: #111827;">Your Request Details:</h3>
        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Product Type:</strong> ${data.productType}</p>
        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p style="margin: 0 0 10px 0; color: #374151;"><strong>Preferred Time:</strong> ${data.preferredTime || 'Not specified'}</p>
        <p style="margin: 0; color: #374151;"><strong>Issue:</strong> ${data.issueDescription}</p>
      </div>

      <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; text-align: center;">
        <p style="margin: 0 0 15px 0; color: #374151; font-weight: 600;">Our service team will contact you at:</p>
        <p style="margin: 0 0 5px 0; color: #2563eb; font-size: 16px;">${data.phone}</p>
        <p style="margin: 0; color: #2563eb; font-size: 16px;">${data.email}</p>
      </div>
    </div>

    <div style="padding: 20px; text-align: center; background-color: #f9fafb;">
      <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Need immediate assistance?</p>
      <p style="margin: 0;">
        <a href="tel:+919047223355" style="color: #7c3aed; text-decoration: none; font-weight: 600;">📞 +91 90472 23355</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateServiceNotificationHTML(data: ServiceEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Service Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 26px;">🔧 New Service Request</h1>
    </div>

    <div style="padding: 30px 20px;">
      <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #c2410c; margin: 0 0 10px 0;">Ticket ID: ${data.ticketId}</h2>
        <p style="margin: 0; color: #9a3412; font-size: 16px;"><strong>Product:</strong> ${data.productType}</p>
      </div>

      <h3 style="color: #111827; margin: 20px 0 15px 0;">Customer Details:</h3>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="padding: 8px 0; color: #374151;"><strong>Name:</strong> ${data.name}</li>
        <li style="padding: 8px 0; color: #374151;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #ea580c;">${data.phone}</a></li>
        <li style="padding: 8px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #ea580c;">${data.email}</a></li>
        <li style="padding: 8px 0; color: #374151;"><strong>Address:</strong> ${data.address}</li>
        <li style="padding: 8px 0; color: #374151;"><strong>Preferred Date:</strong> ${data.preferredDate}</li>
        <li style="padding: 8px 0; color: #374151;"><strong>Preferred Time:</strong> ${data.preferredTime || 'Not specified'}</li>
      </ul>

      <div style="margin-top: 20px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <h3 style="margin: 0 0 10px 0; color: #111827;">Issue Description:</h3>
        <p style="margin: 0; color: #374151; line-height: 1.6;">${data.issueDescription}</p>
      </div>

      <div style="margin-top: 20px; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
        <p style="margin: 0; color: #92400e; font-weight: 600;">⚠️ Action Required:</p>
        <p style="margin: 5px 0 0 0; color: #92400e;">Please schedule a service visit and contact the customer.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

function generateContactNotificationHTML(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%); padding: 30px 20px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 26px;">📧 New Contact Message</h1>
    </div>

    <div style="padding: 30px 20px;">
      <h3 style="color: #111827; margin: 0 0 15px 0;">From:</h3>
      <div style="background-color: #f0fdfa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 8px 0; color: #115e59;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 0 0 8px 0; color: #115e59;"><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #0891b2;">${data.phone}</a></p>
        <p style="margin: 0; color: #115e59;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #0891b2;">${data.email}</a></p>
      </div>

      <h3 style="color: #111827; margin: 20px 0 10px 0;">Message:</h3>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #0891b2;">
        <p style="margin: 0; color: #374151; line-height: 1.6;">${data.message}</p>
      </div>

      <div style="margin-top: 25px; text-align: center;">
        <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 30px; background-color: #0891b2; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600;">Reply to Customer</a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
