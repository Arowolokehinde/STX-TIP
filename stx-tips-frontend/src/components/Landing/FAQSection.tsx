import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How does TipStack work?",
    answer: "TipStack uses the Stacks blockchain to facilitate secure, instant tips between users. Connect your wallet, enter the recipient's address, choose an amount, and send your tip!"
  },
  {
    question: "What are the transaction fees?",
    answer: "Transaction fees are minimal and based on the current network conditions. We always display the exact fee before you confirm any transaction."
  },
  {
    question: "How do I earn rewards?",
    answer: "You earn points for every tip you send or receive. These points contribute to your ranking and unlock special badges and rewards as you reach different milestones."
  },
  {
    question: "Is my wallet secure?",
    answer: "Yes! We never store your private keys. All transactions are secured by the Stacks blockchain and require your explicit approval."
  }
];

export const FAQSection = () => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-violet-950 to-purple-950 py-16 rounded-lg">
      
      {/* Glowing orb effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-violet-200 text-sm font-medium mb-4 backdrop-blur-sm">
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions?
          </div>
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-violet-200 to-purple-200 bg-clip-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300/90 max-w-2xl mx-auto">
            Find quick answers to common questions about TipStack
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-white/10 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
                <button
                  className="w-full px-6 py-4 text-left font-medium flex items-center justify-between text-white hover:text-violet-200 transition-colors"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                >
                  <span className="flex-1">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: selectedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-violet-300" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {selectedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-300/90 border-t border-white/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;