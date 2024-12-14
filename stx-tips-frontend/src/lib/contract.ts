import { openContractCall } from '@stacks/connect';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { 
  AnchorMode, 
  PostConditionMode, 
  stringAsciiCV, 
  uintCV 
} from '@stacks/transactions';

const CONTRACT_ADDRESS = 'STNHKEPYEPJ8ET55ZZ0M5A34J0R3N5FM2CMMMAZ6';
const CONTRACT_NAME = 'tip-stacks';
const NETWORK = new StacksTestnet();

export const sendTip = async (recipient: string, amount: number, tokenType: string) => {
  const functionArgs = [
    stringAsciiCV(recipient),
    uintCV(amount),
    stringAsciiCV(tokenType)
  ];

  const options = {
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'tip',
    functionArgs,
    postConditionMode: PostConditionMode.Allow,
    onFinish: (data: any) => {
      console.log('Transaction:', data);
    },
  };

  await openContractCall(options);
};

export const getUserStats = async (userAddress: string) => {
  try {
    const response = await fetch(
      `https://api.platform.hiro.so/v1/ext/0833814e84b812825680a1419eb34308/stacks-blockchain-api/v1/addresses/${userAddress}/balances`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};