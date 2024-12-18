import { FC, useContext, useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authContext } from '@/context/AuthContext';

interface VerifyEmailModalProps
{
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userEmail?: string;
}

const VerifyEmailModal: FC<VerifyEmailModalProps> = ({
    isOpen,
    onOpenChange,
    userEmail,
}) =>
{
    const [verificationCode, setVerificationCode] = useState('');
    const { activationToken, activation_Code } = useContext(authContext);
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        if (!verificationCode.trim()) return;
        setIsLoading(true);

        try
        {
            const response = await fetch('http://127.0.0.1:5000/api/v1/users/verify-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activation_token: activationToken,
                    activation_Code: activation_Code
                }),
            });

            const result = await response.json();


            if (response.ok)
            {
                setIsLoading(false);
                toast.success(result.message);
                onOpenChange(false);
            }
            else
            { 
                toast.error(result.message);
                setIsLoading(false);
            }

            // Handle successful verification
        } catch (error: any)
        {
            console.error('Verification failed:', error);
            toast.error(error.message);
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md border border-violet-200/10 bg-white dark:bg-gray-900 shadow-2xl shadow-violet-500/10">
                <div className="relative overflow-hidden rounded-lg p-6">
                    {/* Animated gradient accent */}
                    {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500" /> */}

                    <div className="relative z-10 space-y-6">
                        {/* Header with icon */}
                        <div className="text-center space-y-2">
                            <div className="flex items-center justify-center mx-auto mb-4">
                                <div className="bg-violet-500 rounded-full p-1">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Verify Your Email
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300/90 text-sm px-4">
                                We've sent a verification code to{' '}
                                <span className="font-medium text-violet-600 dark:text-violet-300">
                                    {userEmail || 'your email'}
                                </span>. Enter it below to start tipping!
                            </p>
                        </div>

                        {/* Verification Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <Input
                                    placeholder="Enter verification code"
                                    value={verificationCode}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setVerificationCode(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-violet-500/20 
                           text-gray-900 dark:text-white placeholder:text-gray-400 
                           focus:border-violet-500 focus:ring-violet-500/20 
                           rounded-lg py-6 text-center text-lg tracking-widest"
                                    disabled={isLoading}
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || !verificationCode.trim()}
                                className="w-full bg-gradient-to-r from-violet-500 to-purple-500 
                         text-white py-6 rounded-lg font-medium
                         transform hover:scale-[1.02] transition-all duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         shadow-lg shadow-violet-500/25"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Sparkles className="w-5 h-5" />
                                        <span>Verify & Continue</span>
                                    </div>
                                )}
                            </Button>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Didn't receive the code?
                                </p>
                                <button
                                    type="button"
                                    className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 
                           dark:hover:text-violet-300 font-medium transition-colors"
                                    onClick={() => {/* Add resend code logic */ }}
                                >
                                    Click to resend
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VerifyEmailModal;