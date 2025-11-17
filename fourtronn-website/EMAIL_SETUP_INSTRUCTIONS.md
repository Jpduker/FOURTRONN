# ⚠️ CRITICAL: Email Setup Instructions

## Current Issue
Customer emails are NOT being delivered because we're using Resend's test domain (`onboarding@resend.dev`).

### Test Domain Limitations
The `onboarding@resend.dev` domain can ONLY send to these test addresses:
- ✅ `delivered@resend.dev`
- ✅ `bounced@resend.dev`
- ✅ `complained@resend.dev`

It CANNOT send to:
- ❌ Real Gmail addresses
- ❌ .edu email addresses
- ❌ Any customer email addresses

## Solution: Verify Your Own Domain

### Step 1: Choose Your Domain
Use either:
- **Root domain**: `fourtronn.com` (not recommended)
- **Subdomain**: `mail.fourtronn.com` or `noreply.fourtronn.com` (recommended)

### Step 2: Add Domain to Resend
1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `mail.fourtronn.com`)

### Step 3: Configure DNS Records
Resend will provide DNS records to add:

**SPF Record** (TXT):
```
Type: TXT
Name: mail.fourtronn.com (or @ for root)
Value: v=spf1 include:amazonses.com ~all
```

**DKIM Record** (TXT):
```
Type: TXT
Name: resend._domainkey.mail.fourtronn.com
Value: [Provided by Resend]
```

**MX Record**:
```
Type: MX
Name: mail.fourtronn.com
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

### Step 4: Wait for Verification
- DNS propagation: 10 minutes to 72 hours
- Resend will automatically verify

### Step 5: Update Code
Once domain is verified, update `/lib/email.ts`:

**Before:**
```typescript
from: 'Fourtronn Service <onboarding@resend.dev>'
```

**After:**
```typescript
from: 'Fourtronn Service <service@mail.fourtronn.com>'
```

## Temporary Testing
To test the email system NOW before domain verification:

1. Use test customer email: `delivered@resend.dev`
2. This will receive the customer confirmation email
3. Business owner email (jayaprakashnis619@gmail.com) should continue working

## Files to Update After Domain Verification
1. `/lib/email.ts` - Update all `from:` addresses
2. Update environment variable if needed

## Current API Key
```
RESEND_API_KEY=re_KnysHRQ6_2G6BH2kvusoek1tzRgcut9Xt
```

---

**Next Steps:**
1. ✅ Purchase/access domain (fourtronn.com)
2. ⏳ Add domain to Resend dashboard
3. ⏳ Configure DNS records
4. ⏳ Wait for verification
5. ⏳ Update code with verified domain
6. ⏳ Test with real customer emails
