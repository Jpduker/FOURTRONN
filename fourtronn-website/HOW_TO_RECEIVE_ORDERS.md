# 📧 How Orders & Forms Are Received

## Current Setup (Development Mode)

Currently, all customer interactions (orders, service requests, and contact forms) are logged to the **terminal/console** where you run `npm run dev`.

### What Happens When:

#### 1. **Customer Places an Order** 🛒
- Customer fills out checkout form at `/order`
- Submits order with items from cart
- **Order details are logged to terminal** with:
  - Order ID (e.g., `FES1731849372123`)
  - Customer name, phone, email
  - Delivery address
  - All items ordered with quantities
  - Subtotal, GST, and total amount
- Customer sees confirmation page with order number
- Cart is cleared

**To see orders:** Watch your terminal while running `npm run dev`

#### 2. **Customer Requests Service** 🔧
- Customer fills service request form at `/service`
- Submits with product type, issue description, preferred date
- **Service ticket is logged to terminal** with:
  - Ticket ID (e.g., `SVC1731849372123`)
  - Customer details
  - Product type and issue
  - Preferred service date and address
- Customer receives success toast with ticket number

**To see service requests:** Watch your terminal while running `npm run dev`

#### 3. **Customer Sends Contact Message** 📧
- Customer fills contact form at `/contact`
- **Message is logged to terminal** with:
  - Customer name, email, phone
  - Message content
  - Timestamp
- Customer receives success alert

**To see messages:** Watch your terminal while running `npm run dev`

---

## How to Check Terminal Output

### When you run the development server:
\`\`\`bash
npm run dev
\`\`\`

You'll see output like this in your terminal:

\`\`\`
🛒 NEW ORDER PLACED:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: FES1731849372123
Customer: Rajesh Kumar
Phone: 9876543210
Email: rajesh@example.com
Address: 123 Main Street, Salem - 636009

Items:
  1. Fourtronn Hybrid Solar UPS × 2 = ₹31998
  2. PRIYA 150AH Battery × 1 = ₹17750

Subtotal: ₹49748
GST (18%): ₹8954
Total: ₹58702
Time: 2024-11-17T10:30:15.123Z
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
\`\`\`

---

## ⚠️ Important: For Production Use

**This terminal logging is ONLY for development/testing!** For real business use, you need to:

### Option 1: Email Notifications (Easiest)
Use an email service to receive orders and forms at **leninups@gmail.com**

**Recommended services:**
- **[Resend](https://resend.com)** - Modern, easy to use (FREE tier: 100 emails/day)
- **[SendGrid](https://sendgrid.com)** - Popular choice (FREE tier: 100 emails/day)
- **Gmail SMTP** - Use your existing Gmail

### Option 2: Database Storage (Best)
Store all data in Supabase database (already configured in the project)

**What you get:**
- Permanent record of all orders
- Search and filter capabilities
- Order history and analytics
- Customer database

### Option 3: WhatsApp Notifications
Send order notifications directly to WhatsApp Business

**Services:**
- **Twilio WhatsApp API**
- **WhatsApp Business API**

### Option 4: Google Sheets
Automatically add each order/form to a Google Sheet

**Tool:** Use **Zapier** or **Make.com** to connect

---

## 🚀 Next Steps for Production

### 1. Set up email notifications:

Install Resend (recommended):
\`\`\`bash
npm install resend
\`\`\`

Create account at [resend.com](https://resend.com) and get API key.

Update the API route files:
- \`/app/api/orders/route.ts\`
- \`/app/api/service/route.ts\`
- \`/app/api/contact/route.ts\`

Add email sending code (example provided in comments).

### 2. Connect Supabase database:

1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Create tables:
   - \`orders\`
   - \`service_requests\`
   - \`contact_submissions\`
4. Update \`.env.local\` with Supabase credentials
5. Uncomment database code in API routes

### 3. Test thoroughly before going live!

---

## 📱 Contact Information

All forms will send data to these endpoints:
- **Phone:** +91 90472 23355
- **Email:** leninups@gmail.com
- **Address:** No.1, Vaithilingam Street, Saminathapuram, Salem - 636009

---

## 🔐 Security Notes

- All API routes validate input data
- Forms use proper validation (required fields, email format, phone pattern)
- Production should use HTTPS
- Consider adding CAPTCHA for spam protection
- Rate limiting recommended for production

---

## 💡 Quick Start Checklist

- [x] Website running locally
- [x] All pages functional (home, products, cart, checkout, contact, service)
- [x] Orders logged to terminal
- [x] Forms logged to terminal
- [ ] Email notifications set up
- [ ] Database connected
- [ ] Domain purchased
- [ ] Deployed to production
- [ ] Payment gateway integrated (future)

---

For questions or setup help, contact the developer or refer to Next.js documentation.
