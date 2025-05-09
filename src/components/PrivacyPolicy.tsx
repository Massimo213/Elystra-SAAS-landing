/**
 * @copyright 2024 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { motion } from 'motion/react';
import {  Book, Scale, Database, Key, Building2 } from 'lucide-react';

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
    <section className='section relative overflow-hidden bg-white'>
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
            className='text-4xl font-bold mb-4 text-gray-900'
          >
            Privacy Policy
          </motion.h1>
          <motion.div
            variants={variants.fadeInUp}
            initial='start'
            whileInView='end'
            viewport={{ once: true }}
            className='space-y-2'
          >
            <p className='text-gray-600'>Version 1.0 – Effective 28 May 2025</p>
            <p className='text-sm text-gray-500'>Last updated: 9 May 2025</p>
          </motion.div>
        </div>

        {/* Quick Summary Card */}
        <motion.div
          variants={variants.fadeInUp}
          initial='start'
          whileInView='end'
          viewport={{ once: true }}
          className='mb-12'
        >
          <Card className='bg-blue-50 border-blue-100'>
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold text-blue-900 mb-4'>Short-form Summary</h2>
              <p className='text-blue-800'>
                We keep your recordings private, delete them fast, encrypt everything, never sell data, and let you wipe anything with one click. Questions? Email us.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data">Data & Security</TabsTrigger>
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <motion.div
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
            >
              <Card className='bg-white border border-gray-200'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 grid place-items-center rounded-full bg-blue-50 text-blue-600'>
                      <Book size={24} />
                    </div>
                    <h3 className='text-xl font-medium text-gray-900'>Purpose and Scope</h3>
                  </div>
                  <p className='text-gray-600 mb-4'>
                    This Privacy Policy sets forth the lawful, fair, and transparent treatment of all personal information processed by C2P Software Inc. in connection with our cloud-based service that converts audiovisual meeting recordings into structured business proposals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className='bg-white border border-gray-200'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 grid place-items-center rounded-full bg-blue-50 text-blue-600'>
                      <Scale size={24} />
                    </div>
                    <h3 className='text-xl font-medium text-gray-900'>Definitions</h3>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full border border-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Term</th>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Meaning</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Personal Data</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Any information relating to an identified or identifiable natural person.</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Processing</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Any operation performed on Personal Data, whether automated or manual.</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Controller</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>The entity that determines the purposes and means of Processing.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="data" className="space-y-8">
            <motion.div
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
            >
              <Card className='bg-white border border-gray-200'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 grid place-items-center rounded-full bg-blue-50 text-blue-600'>
                      <Database size={24} />
                    </div>
                    <h3 className='text-xl font-medium text-gray-900'>Data Inventory</h3>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full border border-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Category</th>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Retention</th>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Purpose</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Account Data</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Life of account + 30 days</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Authentication & support</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Recording Data</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>24h (default)</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Transcription & proposal generation</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Transcript Data</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>180 days</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Proposal drafting, audit trail</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="rights" className="space-y-8">
            <motion.div
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
            >
              <Card className='bg-white border border-gray-200'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 grid place-items-center rounded-full bg-blue-50 text-blue-600'>
                      <Key size={24} />
                    </div>
                    <h3 className='text-xl font-medium text-gray-900'>Your Rights</h3>
                  </div>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full border border-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Right</th>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>How to Exercise</th>
                          <th className='px-6 py-3 text-left text-sm font-medium text-gray-900'>Timeline</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Access / Portability</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Email privacy@c2p.app</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>30 days</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Erasure</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Delete account in dashboard</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Immediate to 30 days</td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>Rectification</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>Edit profile or email request</td>
                          <td className='px-6 py-4 text-sm text-gray-600'>14 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <motion.div
              variants={variants.fadeInUp}
              initial='start'
              whileInView='end'
              viewport={{ once: true }}
            >
              <Card className='bg-white border border-gray-200'>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 grid place-items-center rounded-full bg-blue-50 text-blue-600'>
                      <Building2 size={24} />
                    </div>
                    <h3 className='text-xl font-medium text-gray-900'>Contact Information</h3>
                  </div>
                  <div className='space-y-4 text-gray-600'>
                    <p className='font-medium text-gray-900'>Elystra Inc.</p>
                    <div className='pt-4'>
                      <p className='font-medium text-gray-900'>Contact Us :</p>
                      <p>elystrahelpmeteam@gmail.com</p>  
                    </div>
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