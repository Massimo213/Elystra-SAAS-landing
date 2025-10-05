# Email Automation Setup Guide

## ✅ Problem Fixed: Automated Emails Now Working

**Before**: `mailto:` links only opened user's email client - no automation
**After**: Real API calls to SendGrid - fully automated email delivery

## 🔧 Required Environment Variables

Add these to your **Vercel Environment Variables**:

```bash
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=onboarding@elystra.online
SENDGRID_FROM_NAME=Elystra Onboarding Team
```

## 📧 SendGrid Setup Steps

1. **Create SendGrid Account** (if not done)
   - Go to [sendgrid.com](https://sendgrid.com)
   - Create account or login

2. **Generate API Key**
   - Settings → API Keys → Create API Key
   - Name: "Elystra Onboarding"
   - Permissions: "Full Access" (or "Mail Send" minimum)
   - Copy the API key (starts with `SG.`)

3. **Domain Authentication**
   - Settings → Sender Authentication → Domain Authentication
   - Add domain: `elystra.online`
   - Follow DNS setup instructions
   - ⚠️ **Critical**: This prevents emails going to spam

4. **Add Environment Variables to Vercel**
   - Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add each variable above
   - Redeploy project

## 🧪 Testing the Fix

1. **Fill out form on website**
2. **Check Vercel function logs**:
   ```bash
   vercel logs
   ```
3. **Look for**:
   ```
   ✅ Demo request successful: { email: "test@example.com" }
   ```

## 🚨 Troubleshooting

### No emails arriving?
1. Check Vercel logs for API errors
2. Verify SendGrid API key is correct
3. Check SendGrid Activity Feed for delivery status
4. Ensure domain authentication is complete

### SendGrid errors?
- `401 Unauthorized` = Wrong API key
- `403 Forbidden` = Domain not authenticated
- `422 Unprocessable` = Invalid email format

### Network errors?
- Check API endpoint is accessible: `/api/demo-request`
- Verify Vercel deployment succeeded

## 📊 Email Content

The automated email includes:
- ✅ Step-by-step demo video link
- ✅ Account activation timeline
- ✅ Free cycle details
- ✅ Next steps checklist
- ✅ Support contact information

## 🔄 Flow Now Working

```
User submits email → Frontend calls /api/demo-request → SendGrid sends email → User receives demo video + instructions
```

**No more manual email sending required!**
