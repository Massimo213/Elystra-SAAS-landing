# Domain Authentication Setup (Required)

## Why You Need This

SendGrid requires domain verification to send emails from `onboarding@elystra.online`.

Without this, emails will:
- Go to spam folders
- Show "via sendgrid.net" warning
- Have poor deliverability

## DNS Records to Add

Add these to your `elystra.online` DNS:

```dns
# SPF Record (TXT)
@ "v=spf1 include:sendgrid.net ~all"

# DKIM Records (get these from SendGrid dashboard)
s1._domainkey CNAME s1.domainkey.u[UNIQUE_ID].wl.sendgrid.net
s2._domainkey CNAME s2.domainkey.u[UNIQUE_ID].wl.sendgrid.net

# Domain Authentication (CNAME)
em[NUMBER].elystra.online CNAME u[UNIQUE_ID].wl.sendgrid.net
```

## Step-by-Step

1. **SendGrid Dashboard** → Sender Authentication
2. **Domain Authentication** → Add Domain → `elystra.online`
3. **Copy DNS records** → Add to your domain provider
4. **Verify** in SendGrid (takes 24-48 hours)

## Alternative: Use Verified Email

Quick fix: Change to an email you control:

```typescript
// In api/demo-request.ts
fromEmail: 'your-verified-email@gmail.com'  // Use your actual email
fromName: 'Elystra Team'
```

This works immediately but shows your personal email as sender.

