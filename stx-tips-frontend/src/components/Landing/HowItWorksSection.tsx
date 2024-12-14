// import React from 'react';
// import { Wallet, Users, TrendingUp } from 'lucide-react';

// export const HowItWorksSection: React.FC = () => {
//   return (
//     <div className="py-16" id="features">
//       <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="text-center">
//           <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-6">
//             <Wallet className="h-8 w-8 text-violet-600" />
//           </div>
//           <h3 className="text-xl font-bold mb-4">1. Connect Wallet</h3>
//           <p className="text-gray-600">
//             Connect your Stacks wallet securely to start sending and receiving tips
//           </p>
//         </div>
//         <div className="text-center">
//           <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-6">
//             <Users className="h-8 w-8 text-violet-600" />
//           </div>
//           <h3 className="text-xl font-bold mb-4">2. Choose Recipient</h3>
//           <p className="text-gray-600">
//             Enter the recipient's address or search for their username
//           </p>
//         </div>
//         <div className="text-center">
//           <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-6">
//             <TrendingUp className="h-8 w-8 text-violet-600" />
//           </div>
//           <h3 className="text-xl font-bold mb-4">3. Send & Earn</h3>
//           <p className="text-gray-600">
//             Send your tip and earn rewards points for your contribution
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Wallet, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: Wallet,
      title: "Connect Wallet",
      description: "Connect your Stacks wallet securely to start sending and receiving tips",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Choose Recipient",
      description: "Enter the recipient's address or search for their username",
      gradient: "from-purple-500 to-fuchsia-500"
    },
    {
      icon: TrendingUp,
      title: "Send & Earn",
      description: "Send your tip and earn rewards points for your contribution",
      gradient: "from-fuchsia-500 to-violet-500"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent" />
      
      <motion.div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-900 to-purple-900 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start supporting your favorite creators in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-100/50 to-purple-100/50 rounded-3xl transform rotate-2 transition-transform group-hover:rotate-1" />
                <div className="relative bg-white p-8 rounded-3xl shadow-lg border border-gray-100 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${step.gradient} mb-6 text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-violet-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorksSection;