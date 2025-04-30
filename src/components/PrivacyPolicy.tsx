import { Shield,  Zap,  Mail, Globe, Settings, AlertCircle, Users, FileText, Cookie } from 'lucide-react';
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fafafa] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center" 
        >
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#666666]">
            At Elystra, we believe privacy is a fundamental human right. We're committed to maintaining the highest standards of security and transparency in how we handle your data.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <div className="prose prose-lg mx-auto max-w-2xl text-[#666666]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Mail className="h-6 w-6 text-[#1a1a1a]" />
                Introduction & Scope
              </h2>
              <p className="mt-4">
                Welcome to Elystra, an email productivity and AI-powered communication service operated by Elystra Technologies, Inc. ("Elystra", "we", "us", or "our"). We recognize that privacy is a fundamental human right. This Privacy Policy explains how we collect, use, disclose, and otherwise process your personal data when you access our website ("Site"), our application ("App"), and our services ("Service").
              </p>
              <p className="mt-4">
                References to "you" or "your" mean the individual whose data we process. Elystra is designed as a powerful productivity layer that integrates with your existing email services, such as Gmail, Outlook, and other supported providers.
              </p>
              <p className="mt-4">
                Rather than replacing your inbox, Elystra connects securely to your email accounts through industry-standard OAuth 2.0 authorization protocols, empowering you to manage and enhance your email experience with the help of cutting-edge AI technologies.
              </p>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-[#1a1a1a]">Through Elystra, you can:</h3>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li>Organize your inbox more intelligently</li>
                  <li>Draft high-quality emails faster using AI</li>
                  <li>Receive real-time suggestions and prioritization</li>
                  <li>Manage multiple accounts seamlessly in one modern interface</li>
                </ul>
                <p className="mt-4 font-semibold">Elystra does not replace your email provider — it supercharges it.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#1a1a1a]" />
                Information We Collect
              </h2>
              <div className="mt-6 space-y-6">
                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Personal Information You Provide</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>Account Information: When you sign up, we collect your name, email address, and OAuth tokens from email providers. Passwords are never stored.</li>
                    <li>Billing Information: Payment details handled securely by Stripe  
                      (https://stripe.com/privacy), not stored on Elystra servers.</li>
                    <li>Communication: If you contact support, respond to surveys, or interact with us, we collect your communications.</li>
                    <li>Marketing Preferences: Subscription preferences for promotional or product updates.</li>
                    <li>Email Metadata: Sender, recipient, timestamps, subject lines — but not email content unless needed for a requested action.</li>
                  </ul>
                </div>
                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Information Collected Automatically</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>Device Info: Type, OS, browser, system language, settings.</li>
                    <li>Usage Data: Features you use, app performance, session length.</li>
                    <li>Cookies and Similar Technologies: For authentication, analytics, improving functionality.</li>
                  </ul>
                </div>
                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Information From Third Parties</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>Social Media: Public info from LinkedIn, Twitter, etc. if you engage with our pages.</li>
                    <li>Third-Party Login Providers: Google, Microsoft — basic profile information.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Settings className="h-6 w-6 text-[#1a1a1a]" />
                How We Use Your Information
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Service Operations</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>Connect email accounts</li>
                    <li>Organize messages</li>
                    <li>Send AI-powered drafts</li>
                    <li>Authenticate and manage accounts</li>
                  </ul>
                </div>


          
          
                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Security & Improvement</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>Protect against unauthorized access</li>
                    <li>Detect and prevent fraud</li>
                    <li>Analyze usage trends</li>
                    <li>Send service communications</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 font-semibold text-[#1a1a1a]">We never sell your data to third parties.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Zap className="h-6 w-6 text-[#1a1a1a]" />
                AI Data Processing
              </h2>
              <div className="mt-6 space-y-6">
                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Our Commitment to Privacy-First AI</h3>
                  <p className="mt-4">
                    At Elystra, we believe in harnessing the power of AI while maintaining the highest standards of privacy and data protection. Our AI features are designed with your privacy as the top priority.
                  </p>
                </div>

                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">How We Process Your Data</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>
                      <span className="font-semibold">Real-Time Processing Only:</span> Your email content is processed in real-time by our AI models only when you request specific actions, such as composing replies or organizing threads. We never store or analyze your emails without your explicit request.
                    </li>
                    <li>
                      <span className="font-semibold">No Training on User Data:</span> We do not use your emails or any personal data to train or improve our AI models. Our models are trained on publicly available data and are regularly updated to maintain high performance without compromising your privacy.
                    </li>
                    <li>
                      <span className="font-semibold">Ephemeral Processing:</span> AI-generated outputs are temporary and only stored if you explicitly choose to save them. All intermediate processing data is automatically deleted after your request is completed.
                    </li>
                  </ul>
                </div>

              

                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Security Measures</h3>
                  <ul className="mt-4 space-y-2 list-disc pl-6">
                    <li>All AI processing is performed in secure, encrypted environments</li>
                    <li>We implement strict access controls to prevent unauthorized use of AI features</li>
                    <li>Regular security audits ensure our AI systems meet the highest privacy standards</li>
                    <li>We maintain detailed logs of AI processing activities for transparency and accountability</li>
                  </ul>
                </div>

                <div className="bg-[#f0e7ff] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">Transparency and Trust</h3>
                  <p className="mt-4">
                    We believe in being transparent about how our AI systems work. If you have any questions about our AI processing or would like to learn more about our privacy-first approach to AI, please don't hesitate to contact our privacy team at privacy@elystra.com.
                  </p>
                  <p className="mt-4">
                    Your trust is our top priority, and we're committed to ensuring that our AI features enhance your productivity while maintaining the highest standards of privacy and data protection.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Globe className="h-6 w-6 text-[#1a1a1a]" />
                International Data Transfers
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <ul className="space-y-2 list-disc pl-6">
                  <li>Your data may be processed outside your country (e.g., in the U.S.).</li>
                  <li>We comply with GDPR standard contractual clauses (SCCs) for international transfers.</li>
                  <li>If required, we will implement supplementary measures.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#1a1a1a]" />
                Third-Party Data Sharing
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <p className="mb-4">
                  Elystra shares user data only with essential third-party service providers that help us deliver our core functionalities. These providers do not have permission to use the data for any purpose outside of providing services to Elystra.
                </p>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mt-4">We share Google user data with the following third parties:</h3>
                <ul className="mt-4 space-y-2 list-disc pl-6">
                  <li>
                    <span className="font-semibold">OpenAI</span> – to generate AI-written email drafts and summaries. Email data is processed in real-time only and never stored.
                  </li>
                  <li>
                    <span className="font-semibold">Vercel / Hosting Provider</span> – for hosting the application infrastructure (non-email content such as UI assets and session metadata).
                  </li>
                  <li>
                    <span className="font-semibold">Stripe</span> – for handling payment processing and subscription management. Only necessary billing data is shared.
                  </li>
                  <li>
                    <span className="font-semibold">Google / Gmail API</span> – for accessing and managing emails on your behalf using OAuth 2.0, as requested by you.
                  </li>
                </ul>
                <p className="mt-4">
                  All providers are contractually bound to protect user data and comply with data protection laws, including GDPR and CCPA.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Settings className="h-6 w-6 text-[#1a1a1a]" />
                Data Retention and Deletion of Google User Data
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <p className="mb-4">
                  Elystra retains access tokens and metadata from your Google account only as long as your account remains active or until you revoke access.
                </p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>If you delete your Elystra account or revoke access via your Google account permissions page, all related Google data and tokens are deleted from our systems automatically.</li>
                  <li>We do not store the content of your emails on our servers.</li>
                  <li>You can request manual deletion of your data at any time by emailing: <a href="mailto:privacy@elystra.com" className="text-[#1a1a1a] hover:text-[#666666]">privacy@elystra.com</a></li>
                </ul>
                <p className="mt-4">
                  We permanently delete OAuth access tokens and any cached metadata within <span className="font-semibold">30 days</span> of account deletion or access revocation.
                </p>
                <p className="mt-4">
                  Elystra is committed to full compliance with Google API Services User Data Policy, including the Limited Use requirements.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Cookie className="h-6 w-6 text-[#1a1a1a]" />
                Cookie Policy
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <p className="mb-4">We use cookies to:</p>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Authenticate sessions</li>
                  <li>Analyze performance</li>
                  <li>Personalize user experience</li>
                  <li>Facilitate marketing (only if consented)</li>
                </ul>
                <p className="mt-4">You can manage cookies through your browser settings.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <Users className="h-6 w-6 text-[#1a1a1a]" />
                Children's Privacy
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <ul className="space-y-2 list-disc pl-6">
                  <li>Elystra is not intended for individuals under 16.</li>
                  <li>We do not knowingly collect personal data from children.</li>
                  <li>If you believe a child has provided data, contact us and we will promptly delete it.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <FileText className="h-6 w-6 text-[#1a1a1a]" />
                Changes to This Privacy Policy
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <ul className="space-y-2 list-disc pl-6">
                  <li>We may update this Privacy Policy to reflect changes in law or Service updates.</li>
                  <li>We will notify you via email or through the App if material changes occur.</li>
                  <li>Effective date and revision history will be posted at the top of this page.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-[#1a1a1a]" />
                Contact Us
              </h2>
              <div className="mt-6 bg-[#f0e7ff] p-6 rounded-lg">
                <p className="text-lg">
                  If you have questions, concerns, or complaints regarding privacy, you can contact us at:
                  <br />
                  <a href="mailto:elystrahelpmeteam@gmail.com" className="text-[#1a1a1a] hover:text-[#666666] font-semibold">
                    elystrahelpmeteam@gmail.com
                  </a>
                </p>
                <p className="mt-4">
                  We're committed to addressing your privacy concerns promptly and transparently. Your trust is our top priority, and we're here to help you understand and control your data.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 