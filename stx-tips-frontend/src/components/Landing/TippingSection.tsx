import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Gift, CheckCircle, UserCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
};

export const TippingSection: React.FC = () => {
  const { walletConnected } = useAppContext();
  const [recipientInput, setRecipientInput] = useState('');
  const [amount, setAmount] = useState('');
  const [userInfo, setUserInfo] = useState<{
    username?: string;
    walletAddress?: string;
    avatar?: string;
    found?: boolean;
    error?: string;
  }>({});
  const [inputType, setInputType] = useState<'username' | 'address'>('address');
  const [searching, setSearching] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateStacksAddress = (address: string) => {
    return address.startsWith('ST') && address.length === 34;
  };

  const validateUsername = (username: string) => {
    return /^[a-zA-Z0-9_-]{1,20}$/.test(username);
  };

  const searchUserDatabase = async (input: string) => {
    setSearching(true);
    setValidationError('');
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (input.startsWith('ST')) {
        if (!validateStacksAddress(input)) {
          setValidationError('Invalid Stacks address format');
          setUserInfo({ error: 'Invalid address' });
          return;
        }
        // Mock address search
        const mockUserResult = {
          username: input === 'ST123456789012345678901234567890123456' ? 'cryptoCreator' : '',
          walletAddress: input,
          avatar: '/api/placeholder/32/32',
          found: input === 'ST123456789012345678901234567890123456'
        };
        setUserInfo(mockUserResult);
        setInputType('address');
      } else {
        if (!validateUsername(input)) {
          setValidationError('Invalid username format');
          setUserInfo({ error: 'Invalid username' });
          return;
        }
        // Mock username search
        const mockAddressResult = {
          username: input,
          walletAddress: input === 'cryptoCreator' ? 'ST123456789012345678901234567890123456' : '',
          avatar: '/api/placeholder/32/32',
          found: input === 'cryptoCreator'
        };
        setUserInfo(mockAddressResult);
        setInputType('username');
      }
    } catch (error) {
      setUserInfo({ error: 'Search failed' });
      setValidationError('Failed to search user');
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (recipientInput && recipientInput.length > 2) {
        searchUserDatabase(recipientInput);
      } else {
        setUserInfo({});
        setValidationError('');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [recipientInput]);

  const handleSendTip = async () => {
    if (!userInfo.found || !amount) {
      setValidationError('Please verify recipient and amount');
      return;
    }
    
    try {
      // Simulate transaction
      setSearching(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Tip sent:', { 
        recipientAddress: userInfo.walletAddress, 
        recipientUsername: userInfo.username, 
        amount 
      });
      // Reset form after success
      setRecipientInput('');
      setAmount('');
      setUserInfo({});
    } catch (error) {
      setValidationError('Transaction failed');
    } finally {
      setSearching(false);
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="send-tip"
    >
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-violet-100/20 to-purple-100/20 blur-3xl transform rotate-12" />
      
      <motion.h2 
        className="text-3xl font-bold bg-gradient-to-r from-violet-900 to-purple-900 bg-clip-text text-transparent mb-8"
        variants={itemVariants}
      >
        Send a Tip
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <motion.div className="lg:col-span-3 space-y-6" variants={itemVariants}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Recipient Address or Username
            </label>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-violet-500 transition-colors" />
              <input
                type="text"
                placeholder="Enter Stacks address or BNS username"
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                value={recipientInput}
                onChange={(e) => setRecipientInput(e.target.value)}
              />
              <AnimatePresence>
                {searching && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <Loader2 className="h-5 w-5 text-violet-600 animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {validationError && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-red-500 flex items-center gap-1 mt-1"
                >
                  <AlertCircle className="h-4 w-4" />
                  {validationError}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {userInfo.found && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white">
                      <UserCircle className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {inputType === 'username' ? 'Wallet Address' : 'Username'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {inputType === 'username' ? userInfo.walletAddress : userInfo.username}
                      </p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Amount (STX)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Enter amount to tip"
                className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            onClick={handleSendTip}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25"
            disabled={!walletConnected || !userInfo.found || searching}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              {searching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <span>Send Tip</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </motion.button>
        </motion.div>

        <motion.div 
          className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          <h3 className="font-medium flex items-center gap-2 text-lg mb-6">
            <Gift className="h-5 w-5 text-violet-600" />
            <span>Why use TipStack?</span>
          </h3>
          <ul className="space-y-4">
            {[
              "Instant, secure transactions on Stacks blockchain",
              "Earn rewards and badges for your contributions",
              "Support your favorite content creators directly",
              "Track all your transactions in one place"
            ].map((benefit, index) => (
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
      </div>
    </motion.div>
  );
};

export default TippingSection;