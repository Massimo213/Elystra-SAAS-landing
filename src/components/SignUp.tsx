/**
 * Sign Up Page - Cinematic Design
 * Matches landing page aesthetic with Apple-grade interactions
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Building, ArrowRight, Sparkles, Check } from 'lucide-react';
import Logo from '@/components/Logo';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to app
    window.location.href = 'https://app.elystra.online/onboarding';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    'First proposal completely free',
    'No credit card required',
    '4-minute setup',
  ];

  return (
    <div className="min-h-screen relative isolate overflow-hidden bg-black">
      {/* CINEMATIC BACKGROUND - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-fuchsia-600/20 via-rose-600/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-orange-600/15 via-pink-600/10 to-transparent rounded-full blur-3xl" />
        
        {/* Dramatic bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-t from-fuchsia-500/10 via-rose-500/5 to-transparent blur-3xl" />
        
        {/* Aurora clouds */}
        <motion.div
          className="absolute top-32 left-1/3 w-[900px] h-[500px] bg-gradient-to-br from-fuchsia-400/5 via-rose-400/8 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Energy particles */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#ec4899' : '#f97316',
              boxShadow: i % 3 === 0
                ? '0 0 20px 4px rgba(168, 85, 245, 0.4)'
                : i % 3 === 1
                ? '0 0 20px 4px rgba(236, 72, 153, 0.4)'
                : '0 0 20px 4px rgba(249, 115, 22, 0.4)',
            }}
            animate={{
              y: [0, Math.random() * -100 - 50, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
        </div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/60" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full py-6 px-6">
          <Link to="/" className="inline-block">
            <Logo className="h-8" />
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6 max-md:text-center"
              >
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Start Free
                  </h1>
                  <p className="text-slate-400 text-lg">
                    Join 145+ agencies closing $4.1M/quarter
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-300 text-base">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <p className="text-slate-500 text-sm">
                    Already have an account?{' '}
                    <Link to="/sign-in" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              </motion.div>

              {/* Right Side - Form */}
              <div className="relative">
                {/* Ambient glow behind card */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 245, 0.3), rgba(236, 72, 153, 0.3), rgba(249, 115, 22, 0.3))',
                  }}
                  animate={{
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Main card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Company Input */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Inc."
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Apple-Grade Glass Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full group disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Pulsing glow behind button */}
                        <motion.div
                          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"
                          style={{
                            background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)',
                          }}
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />

                        {/* Button base */}
                        <div className="relative px-6 py-3.5 rounded-xl overflow-hidden"
                             style={{
                               background: 'linear-gradient(135deg, #a855f7, #ec4899, #f97316)',
                               boxShadow: '0 10px 40px -10px rgba(168, 85, 245, 0.4), 0 0 20px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                             }}>
                          {/* Glass shine overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                          
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-200%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: 'easeInOut',
                            }}
                          />

                          {/* Button content */}
                          <span className="relative flex items-center justify-center gap-2 font-bold text-white text-base">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Creating Account...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-5 h-5" />
                                Create Account
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </span>

                          {/* Inner glow on hover */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                               style={{
                                 background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 70%)',
                               }} />
                        </div>

                        {/* Bottom reflection */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </motion.button>
                    </div>

                    {/* Terms */}
                    <p className="text-slate-500 text-xs text-center pt-2">
                      By signing up, you agree to our{' '}
                      <Link to="/privacy" className="text-slate-400 hover:text-slate-300 underline">
                        Terms & Privacy Policy
                      </Link>
                    </p>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="py-6 text-center text-slate-500 text-sm">
          <p>© 2025 Elystra. Built with precision.</p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;


