import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div id='about'>
    <section className="min-h-screen bg-[#fafafa] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-[#1a1a1a] mb-16 text-center"
        >
          The Market Waits for No One. <br className="hidden md:block" /> Win with <span className="text-[#7c3aed]">Elystra's</span> Unmatched Speed.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <p className="text-xl lg:text-2xl leading-relaxed text-[#333333] max-w-3xl mx-auto">
            Tired of proposals taking <span className="font-semibold text-[#1a1a1a]">hours, not minutes?</span> 
            Frustrated by deals dragging on while you could be delivering impactful work? 
            In today's hyper-fast market, <span className="bg-[#f0e7ff] px-1">speed is your ultimate weapon.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 p-8 bg-white shadow-xl rounded-lg"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 text-center">
            Enter Elystra: Your Fast-Track to <span className="text-[#7c3aed]">Dominance</span>.
          </h2>
          <div className="space-y-6 text-center">
            <p className="text-xl lg:text-2xl leading-relaxed text-[#333333]">
              Create client-winning proposals in <strong className="text-[#7c3aed] bg-[#f0e7ff] px-1">under 60 seconds.</strong>
            </p>
            <p className="text-xl lg:text-2xl leading-relaxed text-[#333333]">
              Move from initial contact to delivering real work in <strong className="text-[#7c3aed] bg-[#f0e7ff] px-1">days, not weeks.</strong>
            </p>
            <p className="text-lg lg:text-xl leading-relaxed text-[#666666]">
              While others are still drafting cover letters, you're closing deals and focusing on what truly matters: your clients and your core work.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16 text-left"
        >
          {/* Freelancers & Agencies */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">For Freelancers & Agencies:</h3>
            <p className="text-lg leading-relaxed text-[#333333]">
              Stop drowning in admin. Start <span className="font-semibold text-[#7c3aed]">scaling your income.</span> Elystra reclaims countless billable hours. 
              Take on <span className="italic">more</span> clients, deliver <span className="italic">faster</span>, and see your earnings soar while peers are buried in paperwork. 
              Don't just compete; <strong className="bg-[#f0e7ff] px-1">dominate your niche.</strong>
            </p>
          </div>

          {/* Executives & Leaders */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">For Executives & Leaders:</h3>
            <p className="text-lg leading-relaxed text-[#333333]">
              Is your team equipped to win? Elystra empowers them to operate at <span className="font-semibold text-[#7c3aed]">peak velocity</span>, slashing turnaround times and boosting output. 
              Lead your industry, or risk being outpaced by those who've already embraced the future. <strong className="bg-[#f0e7ff] px-1">The market won't wait.</strong>
            </p>
          </div>

          {/* Sales Teams */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">For Sales Professionals:</h3>
            <p className="text-lg leading-relaxed text-[#333333]">
              Tired of hot leads going cold? Be <span className="font-semibold text-[#7c3aed]">first to the punch.</span> Generate compelling proposals on the fly and shorten your sales cycle dramatically. 
              Top performers are leveraging this speed. <strong className="bg-[#f0e7ff] px-1">Are you ready to join them?</strong>
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-xl lg:text-2xl leading-relaxed text-[#1a1a1a] max-w-3xl mx-auto font-semibold">
            The Elystra advantage is real. This isn't just efficiency; it's seizing a <span className="text-[#7c3aed]">rapidly closing window</span> to redefine what's possible.
          </p>
           <p className="text-lg lg:text-xl leading-relaxed text-[#666666] max-w-2xl mx-auto mt-4">
            Don't be the one wondering 'what if?'. The tools to outperform, outpace, and outmaneuver are here. The only question is, <span className="italic">will you use them?</span>
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <Button 
            variant="default" 
            size="lg"
            className="bg-[#7c3aed] text-white hover:bg-[#6b2db0] text-xl px-10 py-6 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Unlock Your Speed Advantage Now
          </Button>
        </motion.div>
      </div>
    </section>
    </div>
  );
};

export default About; 