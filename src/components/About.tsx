import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen bg-[#0D0118] relative overflow-hidden">
      {/* Ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-7xl font-bold bg-gradient-to-r from-white to-white bg-clip-text text-transparent mb-8">
              About Us
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We're building Elystra to revolutionize how you interact with your inbox.
              Our mission is to make email effortless — so you can focus on what actually matters.

            </p>
          </motion.div>
        </div>

        {/* Teamx Section */}
        <div className="min-h-screen py-20 px-4 relative">
          {/* First Profile - Left Aligned */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-40 flex items-center gap-20"
          >
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-white mb-6">Massimo</h2>
              <p className="text-lg text-violet-200/70 leading-relaxed">
                I started Elystra because my own inbox was driving me crazy with endless emails to manage. 
                As a privacy advocate and AI enthusiast, I wanted to create something that would make email 
                work faster and smarter for everyone, while keeping your data secure and private.
              </p>
            </div>
            <div className="w-[400px] h-[400px] rounded-full overflow-hidden ring-4 ring-violet-500/20 shadow-2xl shadow-violet-500/20">
              <div className="w-full h-full bg-gradient-to-br from-violet-900 to-fuchsia-900 flex items-center justify-center">
                <span className="text-2xl text-white">Massimo</span>
              </div>
            </div>
          </motion.div>

          {/* Second Profile - Right Aligned */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-40 flex items-center gap-20 flex-row-reverse"
          >
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-violet-200 mb-6">Nizaryt</h2>
              <p className="text-lg text-violet-200/70 leading-relaxed">
                With a deep passion for design and user experience, I ensure that Elystra isn't just 
                powerful, but a joy to use. Every interaction, every animation, and every interface 
                element is crafted to make your email experience seamless and intuitive.
              </p>
            </div>
            <div className="w-[400px] h-[400px] rounded-full overflow-hidden ring-4 ring-violet-500/20 shadow-2xl shadow-violet-500/20">
              <div className="w-full h-full bg-gradient-to-br from-violet-900 to-fuchsia-900 flex items-center justify-center">
                <span className="text-2xl text-violet-200">Nizaryt</span>
              </div>
            </div>
          </motion.div>

          {/* Team Together - Center Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <div className="w-[500px] h-[500px] rounded-full overflow-hidden ring-4 ring-violet-500/20 shadow-2xl shadow-violet-500/20 mx-auto mb-12">
              <div className="w-full h-full bg-gradient-to-br from-violet-900 to-fuchsia-900 flex items-center justify-center">
                <span className="text-2xl text-violet-200">Together</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-violet-200 mb-6">The Dream Team</h2>
            <p className="text-lg text-violet-200/70 leading-relaxed max-w-3xl mx-auto mb-12">
              United by our shared vision for privacy-first technology and ethical AI, 
              we're building Elystra to be the email assistant we always wished existed. 
              Our complementary skills and relentless pursuit of excellence make us the 
              perfect team to revolutionize email management.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-violet-950/50 text-violet-200 border-violet-500/30 hover:bg-violet-900/30 hover:border-violet-400/50 transition-all duration-300"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 