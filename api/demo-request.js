/**
 * Vercel Serverless Function: Demo Request API
 * Sends automated onboarding emails via SendGrid
 * Production-ready with proper error handling
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are supported'
    });
  }

  try {
    const { email, source = 'website', trackingData = {} } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Invalid email',
        message: 'Please provide a valid email address'
      });
    }

    // SendGrid configuration
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'onboarding@elystra.online';
    
    if (!SENDGRID_API_KEY) {
      console.error('❌ SENDGRID_API_KEY missing from environment variables');
      return res.status(500).json({
        error: 'Email service unavailable',
        message: 'Please try again later or contact support'
      });
    }

    // Email content
    const emailSubject = 'Welcome to Elystra - Your Demo Video + Account Setup';
    const emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; font-size: 28px; margin-bottom: 10px;">Welcome to Elystra!</h1>
          <p style="color: #6b7280; font-size: 16px;">Your step-by-step demo video is ready</p>
        </div>

        <div style="background: linear-gradient(135deg, #f97316, #ec4899); border-radius: 12px; padding: 30px; margin-bottom: 30px; text-align: center;">
          <h2 style="color: white; font-size: 24px; margin-bottom: 15px;">🎥 Your Demo Video</h2>
          <p style="color: rgba(255,255,255,0.9); margin-bottom: 20px;">Watch exactly how to turn client calls into signed proposals in 60 seconds</p>
          <a href="https://vimeo.com/your-demo-video" style="display: inline-block; background: white; color: #1f2937; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">Watch Demo Video →</a>
        </div>

        <div style="background: #f9fafb; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; font-size: 20px; margin-bottom: 15px;">✅ What Happens Next:</h3>
          <ol style="color: #4b5563; line-height: 1.6; padding-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Watch the demo video above</strong> - See real proposal generation</li>
            <li style="margin-bottom: 10px;"><strong>Your account is being activated</strong> - Ready within 3 minutes</li>
            <li style="margin-bottom: 10px;"><strong>Login details coming</strong> - Separate email with credentials</li>
            <li style="margin-bottom: 10px;"><strong>Start your free cycle</strong> - Upload your first client call</li>
          </ol>
        </div>

        <div style="background: #ecfdf5; border: 1px solid #d1fae5; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
          <p style="color: #065f46; margin: 0; font-weight: 600;">🎯 Your Free Cycle Includes:</p>
          <ul style="color: #047857; margin: 10px 0 0 20px; line-height: 1.5;">
            <li>Complete proposal generation from one client call</li>
            <li>E-signature integration and payment collection</li>
            <li>Custom branding and template setup</li>
            <li>Full CRM integration (HubSpot, Salesforce, etc.)</li>
          </ul>
        </div>

        <div style="text-align: center; padding: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">Need help or have questions?</p>
          <p style="color: #6b7280; font-size: 14px;">Reply to this email or book a quick call: <a href="https://calendly.com/onboarding-elystra/30min" style="color: #f97316;">calendly.com/onboarding-elystra/30min</a></p>
        </div>
      </div>
    `;

    // Send email via SendGrid
    const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: email }],
          subject: emailSubject
        }],
        from: { 
          email: FROM_EMAIL,
          name: 'Elystra Onboarding Team'
        },
        content: [{
          type: 'text/html',
          value: emailContent
        }],
        // Tracking settings
        tracking_settings: {
          click_tracking: { enable: true },
          open_tracking: { enable: true }
        }
      })
    });

    if (!sendGridResponse.ok) {
      const errorBody = await sendGridResponse.text();
      console.error('❌ SendGrid API error:', {
        status: sendGridResponse.status,
        statusText: sendGridResponse.statusText,
        body: errorBody
      });
      
      return res.status(500).json({
        error: 'Email delivery failed',
        message: 'Please try again or contact support'
      });
    }

    // Log successful request (for analytics)
    console.log('✅ Demo request successful:', {
      email: email,
      source: source,
      timestamp: new Date().toISOString(),
      tracking: trackingData
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Demo video and setup instructions sent successfully',
      email: email,
      estimatedDelivery: '2 minutes'
    });

  } catch (error) {
    console.error('❌ Demo request handler error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Please try again later or contact support'
    });
  }
}
