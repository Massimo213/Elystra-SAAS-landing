import { pricingData } from "@/constants";
import { CheckIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function Pricing() {
  return (
    <div id='pricing' className="bg-white">
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4"
            >
              <Sparkles className="h-4 w-4" />
              {pricingData.sectionSubtitle}
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              {pricingData.sectionTitle}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
            >
              {pricingData.sectionText}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3"
          >
            {pricingData.plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative flex flex-col rounded-2xl bg-white p-8 ${
                  plan.popular 
                    ? 'lg:z-10 lg:scale-110 lg:shadow-2xl lg:border-2 lg:border-primary/20' 
                    : 'lg:scale-95 shadow-lg border border-gray-200'
                }`}
              >
                {plan.badge && (
                  <Badge 
                    variant={plan.popular ? "default" : "secondary"}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    {plan.badge}
                  </Badge>
                )}
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold leading-8 ${
                    plan.popular ? 'text-primary' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {plan.tagline}
                  </p>
                  <div className="mt-6 flex items-baseline gap-x-1">
                    <span className={`text-4xl font-bold tracking-tight ${
                      plan.popular ? 'text-primary' : 'text-gray-900'
                    }`}>
                      ${plan.price}
                    </span>
                    {plan.isMonthly && (
                      <span className="text-sm font-semibold leading-6 text-gray-600">
                        /month
                      </span>
                    )}
                  </div>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                    {plan.features.map((feature) => (
                      <motion.li 
                        key={feature.name} 
                        className="flex gap-x-3"
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <CheckIcon className={`h-6 w-5 flex-none ${plan.popular ? 'text-primary' : 'text-gray-400'}`} aria-hidden="true" />
                        {feature.name}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <Button
                  className={`mt-8 w-full transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20' 
                      : 'bg-white text-primary hover:bg-gray-50 hover:shadow-md border border-gray-200'
                  }`}
                >
                  <a href="https://app.elystra.online/">
                  {plan.cta}
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 