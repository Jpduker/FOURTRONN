# 📧 Email Notifications Setup Guide

## ✅ What's Already Done

Your website now has **complete email functionality** built in! Here's what happens when you enable it:

### When a customer places an order:
1. **Customer receives**: Beautiful order confirmation email with receipt
2. **You (Lenin) receive**: Order notification email at `leninups@gmail.com` with:
   - Order ID
   - Customer details (name, phone, email, address)
   - All ordered items with quantities and prices
   - Total amount with GST
   - "Action Required" reminder to process the order

### When a customer requests service:
1. **Customer receives**: Service confirmation email with ticket ID
2. **You (Lenin) receive**: Service request email with:
   - Ticket ID
   - Customer contact info
   - Product type and issue description
   - Preferred service date
   - Customer address

### When someone contacts you:
1. **You (Lenin) receive**: Contact message email with:
   - Customer name, phone, and email
   - Their message
   - Direct reply button

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Free Resend Account

1. Go to **[resend.com](https://resend.com/signup)**
2. Sign up with your email (FREE plan includes 3,000 emails/month - more than enough!)
3. Verify your email

### Step 2: Get Your API Key

1. After logging in, click **"API Keys"** in the sidebar
2. Click **"Create API Key"**
3. Name it: `Fourtronn Website`
4. Click **"Add"**
5. **COPY the API key** (starts with `re_...`) - you'll only see this once!

### Step 3: Add API Key to Your Website

1. Open the file: `.env.local` in your project folder
2. Add this line at the bottom:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
   Replace `re_your_api_key_here` with the actual key you copied

3. **Save the file**

### Step 4: Verify Your Domain (Important!)

By default, Resend sends from `onboarding@resend.dev` which works for testing but may go to spam.

**For professional emails (highly recommended):**

1. In Resend dashboard, click **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `fourtronnenergy.com`)
4. Follow the instructions to add DNS records
5. Once verified, emails will come from `orders@fourtronnenergy.com`

**Don't have a domain yet?** That's okay! The default sender works fine for now.

### Step 5: Test It!

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Place a test order on your website

3. Check:
   - ✅ Terminal shows: "✅ Order confirmation emails sent successfully"
   - ✅ Check `leninups@gmail.com` inbox
   - ✅ Check spam folder (first time might go there)

---

## 📧 Email Templates Included

All emails are professionally designed with:
- ✅ Fourtronn branding colors (blue gradient)
- ✅ Mobile-responsive design
- ✅ Clear order/service details
- ✅ Contact information
- ✅ Company GST number
- ✅ Call-to-action buttons

### Order Confirmation Email (to Customer):
- Order ID in large, easy-to-read format
- Itemized list with quantities and prices
- Subtotal, GST breakdown, and total
- Delivery address confirmation
- Your contact info for questions

### Order Notification Email (to You):
- Bold "NEW ORDER RECEIVED" header
- Customer's full contact details (clickable phone/email)
- List of all items ordered
- Total amount highlighted
- **Yellow alert box**: "Action Required - Contact customer"

### Service Confirmation Email (to Customer):
- Service ticket ID
- Request details confirmation
- Expected contact timeline
- Your phone number for urgent issues

### Service Notification Email (to You):
- Customer details with clickable contact links
- Product type and issue description
- Preferred service date
- Customer's address
- **Orange alert box**: "Schedule service visit"

### Contact Message Email (to You):
- Customer's full message
- Contact information
- "Reply to Customer" button

---

## 🔒 Security & Privacy

- ✅ API key stored in `.env.local` (never committed to Git)
- ✅ All emails sent via secure Resend servers
- ✅ Customer data never exposed
- ✅ Compliant with email best practices

---

## 💰 Pricing

**FREE Plan (Perfect for you):**
- 3,000 emails per month
- 100 emails per day
- No credit card required
- Full API access

**Your estimated usage:**
- ~10-20 orders/day = 40-60 emails/day (customer + you)
- Well within free limits! 

If business grows beyond 3,000 emails/month, paid plan is only $20/month for 50,000 emails.

---

## 🆘 Troubleshooting

### Emails not sending?

1. **Check terminal output**: Look for error messages
2. **Verify API key**: Make sure it's correct in `.env.local`
3. **Restart server**: After adding API key, restart `npm run dev`
4. **Check spam folder**: Gmail might filter first emails

### Emails going to spam?

1. **Verify your domain** in Resend (Step 4 above)
2. **Add Resend to contacts** in Gmail
3. Once verified domain is set up, emails come from your domain = less likely spam

### Still having issues?

Check the terminal - error messages will show exactly what's wrong:
- `RESEND_API_KEY not found` → Add to .env.local
- `Invalid API key` → Check the key is correct
- `Rate limit exceeded` → You've sent too many test emails (wait a bit)

---

## 📱 Alternative: Gmail SMTP (Not Recommended)

If you prefer to send from your Gmail account directly:

**Pros:**
- Emails come from your actual Gmail
- No third-party service

**Cons:**
- ❌ Gmail blocks automated emails easily
- ❌ Limited to 500 emails/day
- ❌ Requires "App Password" setup (complex)
- ❌ May get flagged as spam
- ❌ Account risk if sending too many

**Verdict**: Use Resend instead - it's designed for this!

---

## 🎯 Next Steps After Email Setup

Once emails are working:

1. **Test all forms**:
   - Place test order → Check both emails
   - Submit service request → Check emails
   - Send contact message → Check email

2. **Train staff**:
   - Show them how to check email for orders
   - Explain order notification format
   - Set up email filters/labels in Gmail

3. **Monitor**:
   - Check Resend dashboard for email analytics
   - See delivery rates, opens (if enabled)
   - Track any bounces or issues

4. **Optional enhancements**:
   - Add SMS notifications (Twilio)
   - Set up WhatsApp Business API
   - Create admin dashboard to view all orders

---

## 📊 Current Status

- ✅ Email code fully implemented
- ✅ Professional email templates ready
- ✅ API routes updated to send emails
- ✅ Fallback to terminal logging if no API key
- ⏳ **Needs**: Resend API key in `.env.local`

**Time to go live with emails**: 5 minutes  
**Cost**: FREE (3,000 emails/month)

---

## 💡 Pro Tips

1. **Mark Resend as "Not Spam"** when you get first email
2. **Create Gmail filter** for orders@fourtronnenergy.com → Label as "Website Orders"
3. **Enable Gmail notifications** on your phone for order emails
4. **Keep Resend API key secret** - never share or commit to Git
5. **Monitor Resend dashboard** weekly to check email delivery

---

## 🚀 Ready to Enable Email?

1. Create Resend account: https://resend.com/signup
2. Copy API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
4. Restart server: `npm run dev`
5. Test with a real order!

**Questions?** Check Resend docs: https://resend.com/docs

---

**That's it! Once you add the API key, your dad will receive ALL orders via email at `leninups@gmail.com`! 📧✨**
