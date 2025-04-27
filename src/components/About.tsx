import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="min-h-screen bg-[#fafafa] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold text-[#1a1a1a] mb-20"
        >
          About Us
        </motion.h1>

        {/* First Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-16 items-start mb-32"
        >
          <div className="w-[240px] h-[240px] rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-[#f0e7ff] flex items-center justify-center">
              <span className="text-2xl text-[#1a1a1a]">Massimo</span>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-2">Massimo</h2>
              <p className="text-lg text-[#666666]">Founder & CEO</p>
            </div>
            <div className="space-y-4">
              <p className="text-xl leading-relaxed">
                <span className="bg-[#f0e7ff] px-1">
                  I started Elystra because my own inbox was driving me crazy with endless emails to manage.
                </span>
              </p>
              <p className="text-xl leading-relaxed text-[#666666]">
                As a privacy advocate and AI enthusiast, I wanted to create something that would make email 
                work faster and smarter for everyone, while keeping your data secure and private.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Second Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-16 items-start mb-32"
        >
          <div className="w-[240px] h-[240px] rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-[#f0e7ff] flex items-center justify-center">
              <span className="text-2xl text-[#1a1a1a]">Nizaryt</span>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-2">Nizaryt</h2>
              <p className="text-lg text-[#666666]">Co-founder & CTO</p>
            </div>
            <div className="space-y-4">
              <p className="text-xl leading-relaxed">
                <span className="bg-[#f0e7ff] px-1">
                  With a deep passion for design and user experience, I ensure that Elystra isn't just 
                  powerful, but a joy to use.
                </span>
              </p>
              <p className="text-xl leading-relaxed text-[#666666]">
                Every interaction, every animation, and every interface element is crafted to make 
                your email experience seamless and intuitive.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Team Together */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex gap-16 items-start"
        >
          <div className="w-[240px] h-[240px] rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-[#f0e7ff] flex items-center justify-center">
              <span className="text-2xl text-[#1a1a1a]">Team</span>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-2">Together</h2>
              <p className="text-lg text-[#666666]">The Dream Team</p>
            </div>
            <div className="space-y-4">
              <p className="text-xl leading-relaxed">
                <span className="bg-[#f0e7ff] px-1">
                  United by our shared vision for privacy-first technology and ethical AI,
                  we're building Elystra to be the email assistant we always wished existed.
                </span>
              </p>
              <p className="text-xl leading-relaxed text-[#666666]">
                Our complementary skills and relentless pursuit of excellence make us the 
                perfect team to revolutionize email management.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="text-[#1a1a1a] border-[#1a1a1a] hover:bg-[#f0e7ff] hover:text-[#1a1a1a] transition-all duration-300"
          >
            Get in Touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 