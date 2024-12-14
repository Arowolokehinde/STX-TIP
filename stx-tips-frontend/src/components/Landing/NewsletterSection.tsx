import { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
    
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-100 via-indigo-200 to-violet-300 py-16 rounded-lg">
      {/* Compact background effects */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl animate-pulse delay-700" />

      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 text-sm font-medium mb-3 backdrop-blur-sm">
            <Mail className="w-3 h-3 mr-1" />
            Newsletter
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text mb-2">
            Stay Updated with TipStack
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Join our community to receive the latest updates about new features, tips, and exclusive rewards
          </p>
        </div>

        <motion.form 
          onSubmit={handleSubscribe}
          className="max-w-lg mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-lg transform transition-transform group-hover:scale-105 opacity-0 group-hover:opacity-100" />
            <div className="relative flex rounded-lg backdrop-blur-sm bg-white/50 p-1 hover:bg-white/60 transition-colors border border-indigo-200">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
                disabled={isSubmitting || isSuccess}
              />
              <button
                type="submit"
                disabled={isSubmitting || isSuccess || !email}
                className="px-4 py-1.5 rounded-md bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSuccess ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <Send className="w-3 h-3 ml-1.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default NewsletterSection;