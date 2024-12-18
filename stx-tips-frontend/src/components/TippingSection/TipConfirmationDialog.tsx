// import React from 'react';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// interface TipConfirmationDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   amount: string;
//   recipientInput: string;
//   userInfo: {
//     email?: string;
//     found?: boolean;
//   };
//   onConfirm: () => Promise<void>;
//   transactionInProgress: boolean;
// }

// export const TipConfirmationDialog: React.FC<TipConfirmationDialogProps> = ({
//   open,
//   onOpenChange,
//   amount,
//   recipientInput,
//   userInfo,
//   onConfirm,
//   transactionInProgress,
// }) => {
//   return (
//     <AlertDialog open={open} onOpenChange={onOpenChange}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Confirm Tip</AlertDialogTitle>
//           <AlertDialogDescription>
//             {userInfo.found ? (
//               `You're about to send ${amount} STX to ${userInfo.email} (${recipientInput}). This will initiate a blockchain transaction.`
//             ) : (
//               `You're about to send ${amount} STX to an unverified address (${recipientInput}). This will initiate a blockchain transaction. Please verify the address is correct before proceeding.`
//             )}
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction 
//             onClick={onConfirm}
//             disabled={transactionInProgress}
//           >
//             {transactionInProgress ? 'Processing...' : 'Confirm'}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };


import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TipConfirmationDialogProps
{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  recipientInput: string;
  userInfo: {
    email?: string;
    found?: boolean;
  };
  onConfirm: () => Promise<void>;
  transactionInProgress: boolean;
}


const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.2
    }
  }
};

export const TipConfirmationDialog: React.FC<TipConfirmationDialogProps> = ({
  open,
  onOpenChange,
  amount,
  recipientInput,
  userInfo,
  onConfirm,
  transactionInProgress,
}) =>
{
  return (
    <div className='absolute -top-64 left-0  '>
    <AlertDialog open={open} onOpenChange={onOpenChange} >
      <AnimatePresence>
        {open && (
          <AlertDialogContent asChild>
            
            <div
              className="max-w-md bg-white/95 backdrop-blur-lg border border-violet-100 shadow-xl"
            >
              <AlertDialogHeader>
                <motion.div variants={contentVariants} initial="hidden" animate="visible">
                  <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-900 to-purple-900 bg-clip-text text-transparent">
                    Confirm Tip
                  </AlertDialogTitle>
                </motion.div>

                <AlertDialogDescription className="space-y-4">
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100"
                  >
                    <span className="text-lg font-medium text-violet-900">
                      {amount} STX
                    </span>
                  </motion.div>

                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-2"
                  >
                    {userInfo.found ? (
                      <div className="flex items-start space-x-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <p>
                          Sending to verified user{' '}
                          <span className="font-medium text-violet-900">{userInfo.email}</span>
                          <br />
                          <span className="text-sm text-gray-500">{recipientInput}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2 text-gray-700">
                        <AlertCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                        <p>
                          Sending to unverified address
                          <br />
                          <span className="text-sm font-medium">{recipientInput}</span>
                          <br />
                          <span className="text-sm text-amber-600">
                            Please verify the address is correct before proceeding.
                          </span>
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
              >
                <AlertDialogFooter className="gap-3 sm:gap-0">
                  <AlertDialogCancel className="w-full sm:w-auto border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 transition-all duration-200">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) =>
                    {
                      e.preventDefault();
                      onConfirm();
                    }}
                    disabled={transactionInProgress}
                    className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {transactionInProgress ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm'
                      )}
                    </span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </motion.div>
            </div> 
            {/* </div> */}
          </AlertDialogContent>
        )}
      </AnimatePresence>
    </AlertDialog>
    </div>
  );
};

export default TipConfirmationDialog;