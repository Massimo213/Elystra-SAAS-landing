/**
 * Sign In Page - Cinematic Design
 * Matches landing page aesthetic with Apple-grade interactions
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to app
    window.location.href = 'https://app.elystra.online/dashboard';
  };

  return (
    <div className="min-h-screen relative isolate overflow-hidden bg-black">
      {/* CINEMATIC BACKGROUND - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base atmospheric gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-600/20 via-rose-600/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-fuchsia-600/15 via-pink-600/10 to-transparent rounded-full blur-3xl" />
        
        {/* Dramatic bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] bg-gradient-to-t from-orange-500/10 via-rose-500/5 to-transparent blur-3xl" />
        
        {/* Aurora clouds */}
        <motion.div
          className="absolute top-20 right-1/3 w-[800px] h-[400px] bg-gradient-to-br from-orange-400/5 via-rose-400/8 to-fuchsia-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Energy particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#ec4899' : '#a855f7',
              boxShadow: i % 3 === 0
                ? '0 0 20px 4px rgba(249, 115, 22, 0.4)'
                : i % 3 === 1
                ? '0 0 20px 4px rgba(236, 72, 153, 0.4)'
                : '0 0 20px 4px rgba(168, 85, 245, 0.4)',
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
            className="w-full max-w-md"
          >
            {/* Card with glassmorphism */}
            <div className="relative">
              {/* Ambient glow behind card */}
              <motion.div
                className="absolute -inset-4 rounded-3xl opacity-0 blur-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(236, 72, 153, 0.3), rgba(168, 85, 245, 0.3))',
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
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                {/* Title */}
                <div className="text-center mb-8">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 text-sm"
                  >
                    Sign in to continue to Elystra
                  </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-300">
                        Password
                      </label>
                      <a href="#" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                        Forgot?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Apple-Grade Glass Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-2"
                  >
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
                          background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
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
                      <div className="relative px-6 py-4 rounded-xl overflow-hidden"
                           style={{
                             background: 'linear-gradient(135deg, #f97316, #ec4899, #a855f7)',
                             boxShadow: '0 10px 40px -10px rgba(249, 115, 22, 0.4), 0 0 20px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
                              Signing In...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              Sign In
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
                  </motion.div>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/5 text-slate-400">or</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center"
                >
                  <p className="text-slate-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/sign-up" className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                      Sign up for free
                    </Link>
                  </p>
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

export default SignIn;


