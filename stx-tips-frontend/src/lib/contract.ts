import { openContractCall } from '@stacks/connect';
// import { StacksTestnet } from '@stacks/network';
import { 
  AnchorMode, 
  PostConditionMode, 
  stringAsciiCV, 
  uintCV 
} from '@stacks/transactions';
import { CONTRACT_CONFIG } from './constants';

// const NETWORK = new StacksTestnet();

interface TipOptions {
  recipient: string;
  amount: number;
  tokenType: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const sendTip = async ({
  recipient,
  amount,
  tokenType,
  onSuccess,
  onError
}: TipOptions) => {
  try {
    const functionArgs = [
      stringAsciiCV(recipient),
      uintCV(amount),
      stringAsciiCV(tokenType)
    ];

    const options = {
    //   network: NETWORK,
      anchorMode: AnchorMode.Any,
      contractAddress: CONTRACT_CONFIG.ADDRESS,
      contractName: CONTRACT_CONFIG.NAME,
      functionName: 'tip',
      functionArgs,
      postConditionMode: PostConditionMode.Allow,
      onFinish: (data: any) => {
        console.log('Transaction:', data);
        onSuccess?.(data);
      },
    };

    await openContractCall(options);
  } catch (error) {
    console.error('Error sending tip:', error);
    onError?.(error);
  }
};