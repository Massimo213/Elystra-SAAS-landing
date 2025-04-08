import { Shield, Lock, Zap, X, Database, Key, Bell, Cloud } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div id='privacy'>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Privacy Overview
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Elystra takes your privacy seriously. In an era where data protection is paramount, we're committed to maintaining the highest standards of security and transparency.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="prose prose-lg mx-auto max-w-2xl text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
            <p>
              The regulatory landscape governing privacy is undergoing significant change worldwide, and governments and consumers alike are demanding increased transparency and individual control. Elystra welcomes these changes. Our success depends on maintaining the trust of our users through secure, transparent, and ethical data practices.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Personal Data We Collect</h2>
            <p>
              Elystra's data collection is minimal and purposeful. By default, we do not collect or store the content of your personal email messages. To function properly, Elystra accesses:
            </p>
            <ul className="list-disc pl-6">
              <li>Your name and email address</li>
              <li>OAuth access tokens for supported email providers</li>
              <li>Basic account information necessary for service operation</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">How We Use Your Data</h2>
            <p>
              Your data is used exclusively to operate and maintain Elystra's services. We do not:
            </p>
            <ul className="list-disc pl-6">
              <li>Use cookies for advertising purposes</li>
              <li>Extract data from email content for tracking</li>
              <li>Share your data with third parties for marketing</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">AI and Data Processing</h2>
            <p>
              Elystra's AI features leverage state-of-the-art language models. Your data is:
            </p>
            <ul className="list-disc pl-6">
              <li>Processed in real-time only</li>
              <li>Never used to train or improve models</li>
              <li>Never stored for analysis or training purposes</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Security Measures</h2>
            <p>
              We implement rigorous security measures to protect your data:
            </p>
            <ul className="list-disc pl-6">
              <li>End-to-end encryption for all communications</li>
              <li>Regular security audits and updates</li>
              <li>Compliance with industry security standards</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of data collection</li>
              <li>Export your data at any time</li>
            </ul>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Secure Access</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Industry-standard OAuth2 authentication ensures your data remains secure and under your control.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Lock className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Data Control</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Your data is processed in real-time only, with no storage or training on personal information.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">Instant Revocation</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Revoke access instantly through your email provider's settings at any time.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <X className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No Data Mining</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Your inbox remains private, with no analysis or mining for unnecessary data.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-lg leading-8 text-gray-600">
                And if you ever feel even 1% uneasy, you're free to walk away—no commitment, no lock-in, no dark patterns. Just clarity, control, and choice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
} 