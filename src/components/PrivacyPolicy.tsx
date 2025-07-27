/**
 * @copyright 2024 Elystra Technologies Ltd.
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'motion/react';
import { Book, Scale, Database, Key, Building2, Share2, Archive, ShieldCheck, Link as LinkIcon, Users, FileText as FileTextIcon, Info, Globe, Clock, Lock, AlertTriangle } from 'lucide-react';

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
            PRIVACY POLICY
          </motion.h1>
          <motion.div
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='space-y-2'
          >
            <p className='text-gray-600 text-lg font-medium'>Elystra Technologies Ltd.</p>
            <p className='text-gray-600'>Last Updated: 15 January 2025</p>
            <p className='text-gray-600'>GDPR Compliant</p>
          </motion.div>
        </div>
 
        {/* Quick Summary Card */}
        <motion.div
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='mb-12 max-w-4xl mx-auto'
        >
          <Card className='bg-blue-50 border-blue-200 shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center gap-3 mb-4'>
                <Info size={24} className='text-blue-600 flex-shrink-0' />
                <h2 className='text-xl font-semibold text-blue-800'>Your Data Rights Summary</h2>
              </div>
              <div className='grid md:grid-cols-2 gap-4 text-sm'>
                <div className='space-y-2'>
                  <p className='text-blue-700 font-medium'>🇪🇺 EU Data Protection</p>
                  <p className='text-blue-700'>Your data stays in EU servers by default, encrypted at rest, and is wiped after 30 days unless you generate a proposal.</p>
                </div>
                <div className='space-y-2'>
                  <p className='text-blue-700 font-medium'>🔒 Zero Training Policy</p>
                  <p className='text-blue-700'>We never train models on your data and use Standard Contractual Clauses for the few US services we rely on.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 md:mb-12 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data">Data Collection</TabsTrigger>
            <TabsTrigger value="processing">Processing & Rights</TabsTrigger>
            <TabsTrigger value="security">Security & Transfers</TabsTrigger>
            <TabsTrigger value="legal">Legal Details</TabsTrigger>
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
                                         <h3 id="introduction" className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>1. Introduction & Controller Information</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>This Privacy Policy explains how <strong>Elystra Technologies Ltd.</strong> ("we," "us," or "our") processes your personal data when you use our AI-powered proposal generation service.</p>
                    
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='font-medium text-gray-800 mb-2'>Data Controller Details:</h4>
                      <ul className='space-y-1 text-sm'>
                        <li><strong>Company:</strong> Elystra Technologies Ltd.</li>
                        <li><strong>Registration:</strong> Company Number 12345678, Republic of Ireland</li>
                        <li><strong>Address:</strong> Unit 3, Block C, Crescent Business Park, Dublin 24, D24 X0Y2, Ireland</li>
                        <li><strong>Data Protection Officer:</strong> Massimo Yahya Mounadi</li>
                        <li><strong>Contact:</strong> dpo@elystra.com</li>
                      </ul>
                    </div>
                    
                    <p>We are committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR) and other applicable data protection laws.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Scale size={20} />
                    </div>
                                         <h3 id="legal-basis" className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>2. Legal Basis for Processing</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>Under GDPR Article 6, we process your personal data on the following legal bases:</p>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full border border-gray-200 rounded-md'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Processing Activity</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Legal Basis</th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Account creation, authentication, support</td>
                            <td className='px-4 py-3'>Contract performance (Art. 6(1)(b))</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Proposal generation & document workflows</td>
                            <td className='px-4 py-3'>Contract performance (Art. 6(1)(b))</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Payment processing & fraud screening</td>
                            <td className='px-4 py-3'>Legal obligation (Art. 6(1)(c)) + Legitimate interests (Art. 6(1)(f))</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Product analytics & feature improvement</td>
                            <td className='px-4 py-3'>Legitimate interests (Art. 6(1)(f)) - you can opt-out in settings</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Marketing emails & product updates</td>
                            <td className='px-4 py-3'>Consent (Art. 6(1)(a)) - opt-in checkbox during signup</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Prospecting emails to business contacts</td>
                            <td className='px-4 py-3'>Legitimate interests (Art. 6(1)(f)) - unsubscribe link in first contact</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data Collection Tab */}
          <TabsContent value="data" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Database size={20} />
                    </div>
                                         <h3 id="data-collection" className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>3. Personal Data We Collect</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <h4 className='font-medium text-gray-800'>3.1 Information You Provide Directly</h4>
                    <ul className='list-disc list-outside pl-5 space-y-1 text-gray-600'>
                      <li><strong className='text-gray-700'>Account Information:</strong> Name, email address, password (hashed), company name, business address</li>
                      <li><strong className='text-gray-700'>Content Data:</strong> Audio/video files, text inputs, transcripts, branding assets (logos, colors), generated proposals</li>
                      <li><strong className='text-gray-700'>Payment Data:</strong> Billing name, address, VAT number (processed by Stripe - we never store full card details)</li>
                      <li><strong className='text-gray-700'>Communications:</strong> Support tickets, survey responses, feedback, chat messages</li>
                    </ul>
                    
                    <h4 className='font-medium text-gray-800 mt-4'>3.2 Information We Collect Automatically</h4>
                    <ul className='list-disc list-outside pl-5 space-y-1 text-gray-600'>
                      <li><strong className='text-gray-700'>Technical Data:</strong> IP address, browser type, operating system, device information</li>
                      <li><strong className='text-gray-700'>Usage Data:</strong> Pages visited, features used, session duration, click patterns (pseudonymized)</li>
                      <li><strong className='text-gray-700'>Performance Data:</strong> Error logs, response times, system metrics</li>
                    </ul>

                                         <h4 className='font-medium text-gray-800 mt-4'>3.3 Cookies & Similar Technologies</h4>
                     <p className='text-gray-600'>We use cookies for essential functionality and analytics. You can control cookie preferences through our cookie banner (powered by Cookiebot) or your browser settings. See full cookie list at <a href="/cookies" className="text-blue-600 hover:underline">/cookies</a>.</p>
                    
                    <div className='bg-yellow-50 p-4 rounded-lg border border-yellow-200'>
                      <div className='flex items-start gap-2'>
                        <AlertTriangle size={16} className='text-yellow-600 flex-shrink-0 mt-0.5' />
                        <div>
                          <p className='text-yellow-800 font-medium text-sm'>Special Category Data</p>
                          <p className='text-yellow-700 text-sm'>We do not intentionally collect special category data (health, biometric, political views, etc.). If such data is inadvertently included in your uploads, please contact us immediately.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Clock size={20} />
                    </div>
                                         <h3 id="data-retention" className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>4. Data Retention Schedule</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>We retain your personal data only as long as necessary for the purposes outlined in this policy:</p>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full border border-gray-200 rounded-md'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Data Category</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Retention Period</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Rationale</th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>User account (active)</td>
                            <td className='px-4 py-3'>Life of contract</td>
                            <td className='px-4 py-3'>Provide ongoing service</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>User account (inactive)</td>
                            <td className='px-4 py-3'>12 months then deletion</td>
                            <td className='px-4 py-3'>Re-activation grace period</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Raw audio/video uploads</td>
                            <td className='px-4 py-3'>30 days (configurable)</td>
                            <td className='px-4 py-3'>Processing then auto-purge</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Generated proposals/documents</td>
                            <td className='px-4 py-3'>5 years (default)</td>
                            <td className='px-4 py-3'>Client record-keeping</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Payment & invoicing data</td>
                            <td className='px-4 py-3'>7 years</td>
                            <td className='px-4 py-3'>Tax & audit compliance</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Marketing consents</td>
                            <td className='px-4 py-3'>Until opt-out or 24 months of inactivity</td>
                            <td className='px-4 py-3'>GDPR + ePrivacy compliance</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Product analytics (pseudonymized)</td>
                            <td className='px-4 py-3'>24 months rolling</td>
                            <td className='px-4 py-3'>Trend analysis</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className='text-gray-600 text-sm'>You can set stricter retention periods in your workspace settings or request earlier deletion at any time.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Processing & Rights Tab */}
          <TabsContent value="processing" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Key size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>5. How We Process Your Data</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <ul className='list-disc list-outside pl-5 space-y-2 text-gray-600'>
                      <li><strong className='text-gray-700'>Service Delivery:</strong> Process audio/video files, generate proposals, manage document templates</li>
                      <li><strong className='text-gray-700'>Account Management:</strong> Authenticate users, process payments, manage subscriptions</li>
                      <li><strong className='text-gray-700'>Customer Support:</strong> Respond to inquiries, troubleshoot issues, provide technical assistance</li>
                      <li><strong className='text-gray-700'>Product Improvement:</strong> Analyze usage patterns, fix bugs, develop new features</li>
                      <li><strong className='text-gray-700'>Legal Compliance:</strong> Meet regulatory requirements, prevent fraud, enforce terms of service</li>
                      <li><strong className='text-gray-700'>Marketing (with consent):</strong> Send product updates, newsletters, promotional content</li>
                    </ul>
                    
                                         <div className='bg-green-50 p-4 rounded-lg border border-green-200'>
                       <h4 className='font-medium text-green-800 mb-2'>Zero Training Policy</h4>
                       <p className='text-green-700 text-sm'>We never use your data to train AI models. We have a Zero-Retention agreement with OpenAI - your prompts and outputs are not stored or used for model training.</p>
                     </div>
                     <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                       <h4 className='font-medium text-gray-800 mb-2'>No Automated Decision-Making</h4>
                       <p className='text-gray-700 text-sm'>AI output is limited to draft text; it does not determine pricing or credit decisions.</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Users size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>6. Your Rights Under GDPR</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>As a data subject, you have the following rights under GDPR:</p>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='space-y-3'>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right of Access (Art. 15)</p>
                            <p className='text-sm text-gray-600'>Request a copy of your personal data</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Rectification (Art. 16)</p>
                            <p className='text-sm text-gray-600'>Correct inaccurate or incomplete data</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Erasure (Art. 17)</p>
                            <p className='text-sm text-gray-600'>Request deletion of your data</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Restrict Processing (Art. 18)</p>
                            <p className='text-sm text-gray-600'>Limit how we use your data</p>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Data Portability (Art. 20)</p>
                            <p className='text-sm text-gray-600'>Export your data in machine-readable format</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Object (Art. 21)</p>
                            <p className='text-sm text-gray-600'>Object to processing for direct marketing</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Withdraw Consent</p>
                            <p className='text-sm text-gray-600'>Revoke consent at any time</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <div className='w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0'></div>
                          <div>
                            <p className='font-medium text-gray-800'>Right to Lodge a Complaint</p>
                            <p className='text-sm text-gray-600'>Contact supervisory authority</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
                      <h4 className='font-medium text-blue-800 mb-2'>How to Exercise Your Rights</h4>
                      <p className='text-blue-700 text-sm mb-2'>Contact us via:</p>
                      <ul className='text-blue-700 text-sm space-y-1'>
                        <li>• Email: <strong>elystra.support@elystra.online</strong></li>
                        <li>• Data Subject Access Request portal (in your account settings)</li>
                        <li>• Response time: Verified within 3 days, fulfilled within 30 days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.15}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Scale size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>7. Children's Privacy</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>Our service is designed for business use and is not intended for individuals under 16 years of age. We do not knowingly collect personal data from children under 16.</p>
                    <p>If you become aware that a child under 16 has provided us with personal data, please contact us immediately at <strong>elystra.support@elystra.online</strong> and we will promptly delete such data.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security & Transfers Tab */}
          <TabsContent value="security" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>8. Security Measures</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>We implement appropriate technical and organizational measures to protect your personal data:</p>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='space-y-3'>
                        <div className='flex items-start gap-2'>
                          <Lock size={16} className='text-blue-600 flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium text-gray-800'>Encryption</p>
                            <p className='text-sm text-gray-600'>TLS 1.3 in transit, AES-256 at rest</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <Lock size={16} className='text-blue-600 flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium text-gray-800'>Access Controls</p>
                            <p className='text-sm text-gray-600'>Role-based access, IAM roles audited quarterly</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <Lock size={16} className='text-blue-600 flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium text-gray-800'>Monitoring</p>
                            <p className='text-sm text-gray-600'>24/7 security monitoring and incident response</p>
                          </div>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex items-start gap-2'>
                          <Lock size={16} className='text-blue-600 flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium text-gray-800'>Penetration Testing</p>
                            <p className='text-sm text-gray-600'>Third-party security audits twice yearly</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <Lock size={16} className='text-blue-600 flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium text-gray-800'>SOC 2 Type II</p>
                            <p className='text-sm text-gray-600'>Audit in progress, target completion Q4 2025</p>
                          </div>
                        </div>
                        <div className='flex items-start gap-2'>
                          <Lock size={16} className='text-blue-600 flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium text-gray-800'>Data Breach Response</p>
                            <p className='text-sm text-gray-600'>Internal escalation &lt;2h, DPA notification within 72h</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Globe size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>9. International Data Transfers</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>Your data is primarily stored and processed within the European Union:</p>
                    <div className='overflow-x-auto'>
                      <table className='min-w-full border border-gray-200 rounded-md'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Service Layer</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Location</th>
                            <th className='px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider'>Transfer Safeguard</th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 text-gray-700'>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Primary app & database (AWS)</td>
                            <td className='px-4 py-3'>EU-West-1 (Ireland)</td>
                            <td className='px-4 py-3'>Data stays in EU</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>File storage (S3)</td>
                            <td className='px-4 py-3'>EU-West-1 (Ireland)</td>
                            <td className='px-4 py-3'>Data stays in EU</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Encrypted backups</td>
                            <td className='px-4 py-3'>EU-West-2 (London)</td>
                            <td className='px-4 py-3'>Data stays in EU</td>
                          </tr>
                                                     <tr>
                             <td className='px-4 py-3 font-medium text-gray-800'>OpenAI (AI processing)</td>
                             <td className='px-4 py-3'>United States</td>
                             <td className='px-4 py-3'>Standard Contractual Clauses (2021) + <a href="https://openai.com/policies/enterprise-privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">DPA (zero-retention)</a></td>
                           </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Stripe (payments)</td>
                            <td className='px-4 py-3'>United States</td>
                            <td className='px-4 py-3'>Standard Contractual Clauses (2021) + ISO 27001</td>
                          </tr>
                          <tr>
                            <td className='px-4 py-3 font-medium text-gray-800'>Mailgun (email)</td>
                            <td className='px-4 py-3'>EU endpoints preferred</td>
                            <td className='px-4 py-3'>Standard Contractual Clauses (2021)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className='text-sm text-gray-600'>For transfers outside the EU, we use Standard Contractual Clauses (2021) approved by the European Commission to ensure adequate protection.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.15}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Share2 size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>10. Data Sharing & Third Parties</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>We only share your personal data in the following circumstances:</p>
                    <ul className='list-disc list-outside pl-5 space-y-2 text-gray-600'>
                      <li><strong className='text-gray-700'>Service Providers:</strong> AWS (hosting), OpenAI (AI processing), Stripe (payments), Mailgun (email) - all bound by strict data processing agreements</li>
                      <li><strong className='text-gray-700'>Legal Requirements:</strong> When required by law, court order, or to protect rights, property, or safety</li>
                      <li><strong className='text-gray-700'>Business Transfers:</strong> In connection with a merger, acquisition, or asset sale (with 30-day notice)</li>
                      <li><strong className='text-gray-700'>With Your Consent:</strong> When you explicitly authorize sharing with third parties</li>
                    </ul>
                                         <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
                       <h4 className='font-medium text-blue-800 mb-1'>Sub-processor Changes</h4>
                       <p className='text-blue-700 text-sm'>We will notify workspace owners at least 30 days before adding or replacing a sub-processor.</p>
                     </div>
                     <div className='bg-red-50 p-4 rounded-lg border border-red-200'>
                       <h4 className='font-medium text-red-800 mb-1'>What We Never Do</h4>
                       <p className='text-red-700 text-sm'>We never sell, rent, or trade your personal data to third parties for marketing purposes.</p>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Legal Details Tab */}
          <TabsContent value="legal" className="space-y-6 md:space-y-8">
            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Building2 size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>11. Supervisory Authority</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>As we are established in Ireland, the Irish Data Protection Commission (DPC) is our lead supervisory authority under GDPR.</p>
                    <div className='bg-gray-50 p-4 rounded-lg'>
                      <h4 className='font-medium text-gray-800 mb-2'>Irish Data Protection Commission:</h4>
                      <ul className='space-y-1 text-sm'>
                        <li><strong>Address:</strong> 21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland</li>
                        <li><strong>Phone:</strong> +353 57 868 4757</li>
                        <li><strong>Email:</strong> info@dataprotection.ie</li>
                        <li><strong>Website:</strong> www.dataprotection.ie</li>
                      </ul>
                    </div>
                    <p>You have the right to lodge a complaint with the DPC or your local supervisory authority if you believe we have not handled your personal data in accordance with data protection laws.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.1}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <FileTextIcon size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>12. Policy Changes</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements.</p>
                    <p>For material changes, we will:</p>
                    <ul className='list-disc list-outside pl-5 space-y-1 text-gray-600'>
                      <li>Notify you via email at least 30 days before the changes take effect</li>
                      <li>Display a prominent notice in our application</li>
                      <li>Update the "Last Updated" date at the top of this policy</li>
                    </ul>
                    <p>Your continued use of our services after the effective date constitutes acceptance of the updated policy.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.15}}>
              <Card className='bg-white border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-start md:items-center gap-4 mb-4'>
                    <div className='w-10 h-10 md:w-12 md:h-12 grid place-items-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0'>
                      <Users size={20} />
                    </div>
                    <h3 className='text-lg md:text-xl font-semibold text-gray-900 mt-1 md:mt-0'>13. Contact Information</h3>
                  </div>
                  <div className='space-y-4 text-gray-700 text-sm md:text-base'>
                    <p>For any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact:</p>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-800 mb-2'>Data Protection Officer</h4>
                        <ul className='space-y-1 text-sm'>
                          <li><strong>Name:</strong> Massimo Yahya Mounadi</li>
                          <li><strong>Email:</strong> elystra.support@elystra.online</li>
                          <li><strong>Response Time:</strong> Within 72 hours</li>
                        </ul>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <h4 className='font-medium text-gray-800 mb-2'>Company Details</h4>
                        <ul className='space-y-1 text-sm'>
                          <li><strong>Company:</strong> Elystra Technologies Ltd.</li>
                          <li><strong>Address:</strong> Unit 3, Block C, Crescent Business Park, Dublin 24, D24 X0Y2, Ireland</li>
                          <li><strong>Registration:</strong> 12345678 (Ireland)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={variants.fadeInUp} initial='start' whileInView='end' viewport={{ once: true }} transition={{delay: 0.2}}>
              <Card className='bg-blue-50 border border-blue-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='text-center'>
                    <h3 className='text-lg font-semibold text-blue-900 mb-2'>Effective Date</h3>
                    <p className='text-blue-700'>This Privacy Policy is effective as of <strong>15 January 2025</strong> and supersedes all prior versions.</p>
                    <p className='text-blue-700 text-sm mt-2'>This policy complies with the General Data Protection Regulation (GDPR) and other applicable data protection laws.</p>
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