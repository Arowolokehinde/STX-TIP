import React from 'react';
import { Gift, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { itemVariants } from './animations';

const benefits = [
  "Instant, secure transactions on Stacks blockchain",
  "Earn rewards and badges for your contributions",
  "Support your favorite content creators directly",
  "Track all your transactions in one place"
];

export const BenefitsList: React.FC = () => {
  return (
    <motion.div 
      className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100/50 backdrop-blur-sm"
      variants={itemVariants}
    >
      <h3 className="font-medium flex items-center gap-2 text-lg mb-6">
        <Gift className="h-5 w-5 text-violet-600" />
        <span>Why use TipStack?</span>
      </h3>
      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <motion.li 
            key={index}
            className="flex items-start gap-3 text-gray-600"
            variants={itemVariants}
          >
            <CheckCircle className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
            <span>{benefit}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};