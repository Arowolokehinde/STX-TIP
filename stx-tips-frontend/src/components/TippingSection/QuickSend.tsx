// import React, { useState, useEffect } from 'react';
// import { ArrowRight, Loader2 } from 'lucide-react';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
// import { validateStacksAddress } from '../../components/Utils/validation';
// import { fetchUserWalletInfo } from '../../services/apiService';
// import { useTipTransaction } from '../../hooks/useTipTransaction';
// import { TipConfirmationDialog } from './TipConfirmationDialog';
// import { useAppContext } from '@/context/AppContext';
// import { RecipientInput } from './RecipientInput';

// interface UserInfo
// {
//     email?: string;
//     walletAddress?: string;
//     found?: boolean;
//     error?: string;
// }

// export const QuickSend: React.FC = () =>
// {
//     const { walletConnected } = useAppContext();
//     const [recipientInput, setRecipientInput] = useState<string>('');
//     const [amount, setAmount] = useState<string>('');
//     const [userInfo, setUserInfo] = useState<UserInfo>({});
//     const [searching, setSearching] = useState<boolean>(false);
//     const [validationError, setValidationError] = useState<string>('');
//     const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

//     const resetForm = () =>
//     {
//         setRecipientInput('');
//         setAmount('');
//         setUserInfo({});
//         setShowConfirmDialog(false);
//         setValidationError('');
//     };

//     const { processTip, isProcessing } = useTipTransaction({
//         onSuccess: () =>
//         {
//             resetForm();
//         },
//         onError: (error) =>
//         {
//             setValidationError(error);
//             setShowConfirmDialog(false);
//         }
//     });

//     const fetchUserInfo = async (input: string) =>
//     {
//         setSearching(true);
//         setValidationError('');

//         try
//         {
//             if (validateStacksAddress(input))
//             {
//                 const data = await fetchUserWalletInfo(input);
//                 setUserInfo({
//                     email: data.data.email,
//                     walletAddress: input,
//                     found: !!data.data.email
//                 });
//             } else
//             {
//                 setValidationError('Invalid Stacks address format');
//             }
//         } catch (error)
//         {
//             setUserInfo({ error: 'Failed to fetch user info' });
//             if (!walletConnected)
//             {
//                 setValidationError('Please connect your wallet first to continue');
//             } else
//             {
//                 setValidationError('Unverified wallet address');
//             }
//         } finally
//         {
//             setSearching(false);
//         }
//     };

//     useEffect(() =>
//     {
//         const timeoutId = setTimeout(() =>
//         {
//             if (recipientInput && recipientInput.length > 2)
//             {
//                 fetchUserInfo(recipientInput);
//             } else
//             {
//                 setUserInfo({});
//                 setValidationError('');
//             }
//         }, 500);

//         return () => clearTimeout(timeoutId);
//     }, [recipientInput]);

//     const handleSendTip = () =>
//     {
//         if (!recipientInput || !amount)
//         {
//             setValidationError('Please verify recipient and amount');
//             return;
//         }

//         if (!validateStacksAddress(recipientInput))
//         {
//             setValidationError('Invalid wallet address');
//             return;
//         }

//         setShowConfirmDialog(true);
//     };

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Quick Send</CardTitle>
//                 <CardDescription>Send tips to your favorite creators</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <div className="space-y-4">
//                     {/* <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recipient Address
//             </label>
//             <input
//               type="text"
//               className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
//               placeholder="Enter STX address"
//               value={recipientInput}
//               onChange={(e) => setRecipientInput(e.target.value)}
//             />
//             {validationError && (
//               <p className="mt-1 text-sm text-red-600">{validationError}</p>
//             )}
//             {userInfo.found && (
//               <p className="mt-1 text-sm text-green-600">Verified recipient</p>
//             )}
//           </div> */}
//                     <RecipientInput
//                         recipientInput={recipientInput}
//                         setRecipientInput={setRecipientInput}
//                         searching={searching}
//                         validationError={validationError}
//                         userInfo={userInfo}
//                     />
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Amount (STX)
//                         </label>
//                         <input
//                             type="number"
//                             min="0"
//                             step="0.1"
//                             className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
//                             placeholder="0.00"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                         />
//                     </div>
//                     <button
//                         onClick={handleSendTip}
//                         className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25"
//                         disabled={!walletConnected || !recipientInput || !amount || searching || isProcessing}
//                     >
//                         <span className="flex items-center justify-center gap-2">
//                             {isProcessing ? (
//                                 <>
//                                     <Loader2 className="h-5 w-5 animate-spin" />
//                                     Confirming Transaction...
//                                 </>
//                             ) : searching ? (
//                                 <>
//                                     <Loader2 className="h-5 w-5 animate-spin" />
//                                     Processing...
//                                 </>
//                             ) : (
//                                 <>
//                                     <span>Send Tip</span>
//                                     <ArrowRight className="h-5 w-5" />
//                                 </>
//                             )}
//                         </span>
//                     </button>
//                 </div>
//             </CardContent>

//             <TipConfirmationDialog
//                 open={showConfirmDialog}
//                 onOpenChange={setShowConfirmDialog}
//                 amount={amount}
//                 recipientInput={recipientInput}
//                 userInfo={userInfo}
//                 onConfirm={() => processTip(recipientInput, amount)}
//                 transactionInProgress={isProcessing}
//             />
//         </Card>
//     );
// };

// export default QuickSend;

import React, { useState, useEffect } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { validateStacksAddress } from '../../components/Utils/validation';
import { fetchUserWalletInfo } from '../../services/apiService';
import { useTipTransaction } from '../../hooks/useTipTransaction';
import { TipConfirmationDialog } from './TipConfirmationDialog';
import { useAppContext } from '@/context/AppContext';
import { RecipientInput } from './RecipientInput';

interface UserInfo {
    email?: string;
    walletAddress?: string;
    found?: boolean;
    error?: string;
}

interface QuickSendProps {
    initialAddress?: string;
}

export const QuickSend: React.FC<QuickSendProps> = ({ initialAddress }) => {
    const { walletConnected } = useAppContext();
    const [recipientInput, setRecipientInput] = useState<string>(initialAddress || '');
    const [amount, setAmount] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo>({});
    const [searching, setSearching] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<string>('');
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

    useEffect(() => {
        if (initialAddress) {
            fetchUserInfo(initialAddress);
        }
    }, [initialAddress]);

    const resetForm = () => {
        setRecipientInput(initialAddress || '');
        setAmount('');
        setUserInfo({});
        setShowConfirmDialog(false);
        setValidationError('');
    };

    const { processTip, isProcessing } = useTipTransaction({
        onSuccess: () => {
            resetForm();
        },
        onError: (error) => {
            setValidationError(error);
            setShowConfirmDialog(false);
        }
    });

    const fetchUserInfo = async (input: string) => {
        setSearching(true);
        setValidationError('');

        try {
            if (validateStacksAddress(input)) {
                const data = await fetchUserWalletInfo(input);
                setUserInfo({
                    email: data.data.email,
                    walletAddress: input,
                    found: !!data.data.email
                });
            } else {
                setValidationError('Invalid Stacks address format');
            }
        } catch (error) {
            setUserInfo({ error: 'Failed to fetch user info' });
            if (!walletConnected) {
                setValidationError('Please connect your wallet first to continue');
            } else {
                setValidationError('Unverified wallet address');
            }
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (recipientInput && recipientInput.length > 2) {
                fetchUserInfo(recipientInput);
            } else {
                setUserInfo({});
                setValidationError('');
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [recipientInput]);

    const handleSendTip = () => {
        if (!recipientInput || !amount) {
            setValidationError('Please verify recipient and amount');
            return;
        }

        if (!validateStacksAddress(recipientInput)) {
            setValidationError('Invalid wallet address');
            return;
        }

        setShowConfirmDialog(true);
    };

    return (
        <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
                <CardTitle>Quick Send</CardTitle>
                <CardDescription>Send tips to your favorite creators</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <RecipientInput
                        recipientInput={recipientInput}
                        setRecipientInput={setRecipientInput}
                        searching={searching}
                        validationError={validationError}
                        userInfo={userInfo}
                        disabled={!!initialAddress}
                    />
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Amount (STX)
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            className="block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSendTip}
                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25"
                        disabled={!walletConnected || !recipientInput || !amount || searching || isProcessing}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {isProcessing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Confirming Transaction...
                                </>
                            ) : searching ? (
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
                    </button>
                </div>
            </CardContent>

            <TipConfirmationDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                amount={amount}
                recipientInput={recipientInput}
                userInfo={userInfo}
                onConfirm={() => processTip(recipientInput, amount)}
                transactionInProgress={isProcessing}
            />
        </Card>
    );
};

export default QuickSend;