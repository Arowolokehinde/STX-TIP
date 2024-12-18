import { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { AnchorMode, PostConditionMode } from '@stacks/transactions';
import { NETWORK, CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/stacks';
import { prepareTipArgs } from '../components/Utils/stackUtils';
import { notifyTipSent } from '../services/apiService';

interface UseTipTransactionProps {
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const useTipTransaction = ({ onSuccess, onError }: UseTipTransactionProps) => {
  const { doContractCall } = useConnect();
  const [isProcessing, setIsProcessing] = useState(false);

  const processTip = async (recipient: string, amount: string) => {
    setIsProcessing(true);
    
    try {
      console.log('Starting tip transaction...');
      console.log('Contract details:', {
        address: CONTRACT_ADDRESS,
        name: CONTRACT_NAME,
        network: NETWORK
      });

      const { args, microStacks } = prepareTipArgs(recipient, amount);
      
      console.log('Prepared arguments:', {
        recipient,
        amount,
        microStacks,
        args: args.map(arg => arg.toString())
      });

      await doContractCall({
        network: NETWORK,
        anchorMode: AnchorMode.Any,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'tip',
        functionArgs: args,
        postConditionMode: PostConditionMode.Allow,
        onFinish: async (data: { txId: string }) => {
          console.log('Transaction successful:', data);
          try {
            await notifyTipSent(recipient, amount, data.txId);
            onSuccess();
          } catch (error) {
            console.error('Backend notification failed:', error);
            // Continue with success even if backend notification fails
            onSuccess();
          }
        },
        onCancel: () => {
          console.log('Transaction cancelled by user');
          setIsProcessing(false);
          onError('Transaction cancelled');
        }
      });
    } catch (error) {
      console.error('Transaction error:', error);
      onError(error instanceof Error ? error.message : 'Failed to process transaction');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processTip,
    isProcessing
  };
};