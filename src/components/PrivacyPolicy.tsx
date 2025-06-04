/**
 * @copyright 2024 Elystra Inc.
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'motion/react';
import { Book, Scale, Database, Key, Building2, Share2, Archive, ShieldCheck,Link as LinkIcon, Users, FileText as FileTextIcon, Info } from 'lucide-react';

/**
 * Components
 */
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

/**
 * Framer motion variants
 */
import * as variants from '@/lib/motionVariants';

const PrivacyPolicy = () => {
  return (
    <section className='section relative overflow-hidden bg-white py-16 md:py-20'>
      {/* Subtle Background Pattern */}
      <motion.div 
        className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50'
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <div className='container relative'>
        <div className='section-head text-center max-w-3xl mx-auto mb-12'>
          <motion.h1
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900'
          >
            ELYSTRA PRIVACY POLICY
          </motion.h1>
          <motion.div
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='space-y-1'
          >
            <p className='text-gray-600'>Last Updated: 3 June 2025</p>
            {/* Effective date is mentioned at the end, section 13 */}
          </motion.div>
        </div>

        {/* Quick Summary Card */}
        <motion.div
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='mb-12 max-w-3xl mx-auto'
        >
          <Card className='bg-blue-50 border-blue-200 shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-3 mb-3'>
                <Info size={24} className='text-blue-600 flex-shrink-0' />
                <h2 className='text-xl font-semibold text-blue-800'>In Plain Language</h2>
              </div>
              <p className='text-blue-700 text-sm md:text-base'>
                Your data is yours, it's encrypted, we only keep it as long as necessary, and we never sell it. If that ever changes, you'll be the first to know.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 md:mb-12 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview">Welcome</TabsTrigger>
            <TabsTrigger value="data">Data & Security</TabsTrigger>
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
            <TabsTrigger value="details">Policy Details</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Book size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>1. Welcome</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>Welcome to Elystra, the AI‑powered proposal generator operated by Elystra Inc. ("Elystra," "we," "us," or "our").</p>
                    <p>We transform call recordings, voice memos, and meeting notes into polished client proposals, scopes of work, and related documents in sixty seconds or less.</p>
                    <p>This Privacy Policy explains what data we collect, why we collect it, how we protect it, and the choices you have. By accessing www.elystra.online (the "Site"), using our web application (the "App"), or interacting with any service that links to this Policy (collectively, the "Service"), you agree to the practices described here.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data & Security Tab */}
          <TabsContent value="data" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Database size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>2. The Data We Collect</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <h4 className='font-medium text-gray-800'>2.1 Information You Provide Directly</h4>
                    <ul className='list-disc list-outside pl-5 space-y-1 text-gray-600'>
                      <li><strong className='text-gray-700'>Account details:</strong> name, email address, password hash, and company information when you create an account or upgrade to Pro.</li>
                      <li><strong className='text-gray-700'>Content inputs:</strong> audio/video files, transcripts, text prompts, and any branding assets (logos, color codes) you upload to generate documents.</li>
                      <li><strong className='text-gray-700'>Payment information:</strong> handled securely by our payment processor Stripe. Elystra never stores your full card number or CVC.</li>
                      <li><strong className='text-gray-700'>Communications:</strong> support requests, survey responses, or feedback you send us.</li>
                    </ul>
                    <h4 className='font-medium text-gray-800 mt-4'>2.2 Information We Collect Automatically</h4>
                    <ul className='list-disc list-outside pl-5 space-y-1 text-gray-600'>
                      <li><strong className='text-gray-700'>Usage data:</strong> timestamps, feature clicks, generation counts, and error logs—used strictly to improve performance and stability.</li>
                      <li><strong className='text-gray-700'>Device & log data:</strong> IP address, browser type, operating system, and referring URLs, captured via server logs and cookies.</li>
                      <li><strong className='text-gray-700'>Cookies & similar tech:</strong> small data files that remember preferences; you can disable them in your browser, although some core features may break.</li>
                    </ul>
                    <h4 className='font-medium text-gray-800 mt-4'>2.3 Information from Third Parties</h4>
                    <ul className='list-disc list-outside pl-5 space-y-1 text-gray-600'>
                      <li><strong className='text-gray-700'>Authentication tokens</strong> from Google, Microsoft, or other OAuth providers, stored in encrypted form for secure account linking.</li>
                      <li><strong className='text-gray-700'>Analytics summaries</strong> from tools like Plausible or Splitbee (aggregated, never tied to individual users).</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.05}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                     <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Key size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>3. How We Use Your Data</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <ul className='list-disc list-outside pl-5 space-y-2 text-gray-600'>
                      <li><strong className='text-gray-700'>Service delivery.</strong> Convert recordings into documents, store your files, and render your chosen templates.</li>
                      <li><strong className='text-gray-700'>Account management.</strong> Authenticate log‑ins, process payments, and maintain usage quotas (Free vs Pro).</li>
                      <li><strong className='text-gray-700'>Product improvement.</strong> Diagnose crashes, monitor latency, and prioritize features.</li>
                      <li><strong className='text-gray-700'>Security.</strong> Detect fraud, enforce our Terms, and protect Elystra and its users from malicious activity.</li>
                      <li><strong className='text-gray-700'>Legal compliance.</strong> Satisfy tax, accounting, and regulatory obligations (GDPR, PIPEDA, CCPA, etc.).</li>
                      <li><strong className='text-gray-700'>Marketing with consent.</strong> Send product updates or educational content—but never sell or rent your data, and you can opt‑out at any time.</li>
                    </ul>
                    <p className='pt-2 font-semibold text-gray-800'>No sale, no training.</p>
                    <p className='text-gray-600'>We do not sell personal data, and we have a Zero‑Retention agreement with OpenAI: your prompts and outputs are never stored or used to train their models.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Share2 size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>4. How We Share Your Data</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <ul className='list-disc list-outside pl-5 space-y-2 text-gray-600'>
                      <li><strong className='text-gray-700'>Service providers.</strong> Managed hosting (AWS), AI processing (OpenAI), payment (Stripe). All are bound by strict data‑processing agreements and the principle of least privilege.</li>
                      <li><strong className='text-gray-700'>Legal or safety reasons.</strong> Courts, regulators, or law enforcement when required by law or to protect rights, property, or safety.</li>
                      <li><strong className='text-gray-700'>Business transfers.</strong> In connection with a merger, acquisition, or asset sale; we will notify you and honour existing privacy commitments.</li>
                    </ul>
                    <p className='pt-2 text-gray-600'>We never share proposal content, recordings, or transcripts with advertisers or unknown third parties.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.15}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Archive size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>5. Data Retention</h3>
                  </div>
                  <div className='overflow-x-auto text-sm md:text-base'>
                    <table className='min-w-full border border-gray-200 rounded-md'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Data Category</th>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Free Plan</th>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Pro Plan</th>
                          <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Rationale</th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
                        <tr>
                          <td className='px-4 py-3 whitespace-nowrap font-medium text-gray-800'>Uploaded recordings & transcripts</td>
                          <td className='px-4 py-3'>Deleted 24 hours after generation</td>
                          <td className='px-4 py-3'>Deleted 48 hours after generation</td>
                          <td className='px-4 py-3'>Reduces storage cost & risk</td>
                        </tr>
                        <tr>
                          <td className='px-4 py-3 whitespace-nowrap font-medium text-gray-800'>Generated documents</td>
                          <td className='px-4 py-3'>Stored 7 days</td>
                          <td className='px-4 py-3'>Stored 14 days</td>
                          <td className='px-4 py-3'>Gives Pro users permanent history</td>
                        </tr>
                        <tr>
                          <td className='px-4 py-3 whitespace-nowrap font-medium text-gray-800'>Account & billing records</td>
                          <td className='px-4 py-3'>As long as the account is active </td>
                          <td className='px-4 py-3'>As long as the account is active </td>
                          <td className='px-4 py-3'>Tax & audit compliance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className='mt-4 text-gray-600 text-sm md:text-base'>You can delete individual files, purge your entire workspace, or close your account from the dashboard at any time.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.2}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>6. Security Measures</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <ul className='list-disc list-outside pl-5 space-y-2 text-gray-600'>
                      <li>Encryption in transit & at rest (TLS 1.3, AES‑256).</li>
                      <li>SOC 2‑aligned controls over infrastructure, access logging, and change management.</li>
                      <li>Role‑based access: only engineers with a need‑to‑know can touch production data.</li>
                      <li>Regular penetration testing by independent security firms.</li>
                      <li>Automated purges of dormant recordings and transcripts.</li>
                    </ul>
                    <p className='pt-2 text-gray-600'>No method is 100% foolproof, but we work relentlessly to guard your information.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.25}}>
             
            </motion.div>
          </TabsContent>

          {/* Your Rights Tab */}
          <TabsContent value="rights" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Scale size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>8. Your Rights & Choices</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>Depending on where you live, you may have the right to:</p>
                    <ul className='list-disc list-outside pl-5 space-y-3 text-gray-600'>
                      <li>Access a copy of your personal data.</li>
                      <li>Correct inaccurate or incomplete data.</li>
                      <li>Delete data we hold about you.</li>
                      <li>Port data to another service (machine‑readable format).</li>
                      <li>Object to or restrict certain processing.</li>
                      <li>Opt‑out of marketing communications.</li>
                    </ul>
                    <p className='pt-2'>To exercise any right, email <strong className='text-gray-800'>elystrahelpmeteam@gmail.com</strong>. We will respond within 30 days.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.05}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Users size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>9. Children</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>Elystra is not intended for children under 16. We do not knowingly collect personal data from anyone in that age group. If you believe a child has provided us data, contact us and we will promptly delete it.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Policy Details Tab */}
          <TabsContent value="details" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <LinkIcon size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>10. Third‑Party Links</h3>
                  </div>
                  <p className='text-gray-700 text-sm md:text-base'>Our Service may contain links to external sites (e.g., YouTube tutorials). We do not control their privacy practices; review their policies before sharing data.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.05}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <FileTextIcon size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>11. Changes to This Policy</h3>
                  </div>
                  <p className='text-gray-700 text-sm md:text-base'>We may update this Policy from time to time. If changes are material, we will notify you via email or prominent notice in the App at least 14 days in advance. Continued use after that date constitutes acceptance of the new terms.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Building2 size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>12. Contact & 13. Effective Date</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p className='font-medium text-gray-800'>Questions or concerns?</p>
                    <p>Email <strong className='text-gray-800'>elystrahelpmeteam@gmail.com</strong> </p>
                   
                    <p className='pt-2 font-medium text-gray-800'>Effective Date</p>
                    <p>This Policy is effective as of 3 June 2025 and supersedes all prior versions.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
};

export default PrivacyPolicy;