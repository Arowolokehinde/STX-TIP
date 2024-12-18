import React from 'react';
import { Search, Loader2, UserCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RecipientInputProps {
  recipientInput: string;
  setRecipientInput: (value: string) => void;
  searching: boolean;
  validationError: string;
  userInfo: {
    email?: string;
    found?: boolean;
  };
  disabled?: boolean;
}

export const RecipientInput: React.FC<RecipientInputProps> = ({
  recipientInput,
  setRecipientInput,
  searching,
  validationError,
  userInfo,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Recipient Stacks Address
      </label>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-violet-500 transition-colors" />
        <input
          type="text"
          placeholder="Enter Stacks address"
          className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
          value={recipientInput}
          onChange={(e) => setRecipientInput(e.target.value)}
          disabled={disabled}
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          </motion.div>
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
                <p className="text-sm font-medium text-gray-900">Verified User</p>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};