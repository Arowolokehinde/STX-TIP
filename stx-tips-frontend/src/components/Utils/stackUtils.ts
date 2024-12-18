// import { stringUtf8CV, uintCV } from '@stacks/transactions';

// // Convert STX amount to microstacks
// export const toMicroStacks = (amount: string): number =>
// {
//     return Math.floor(parseFloat(amount) * 1000000);
// };

// // Prepare contract call arguments
// export const prepareTipArgs = (recipient: string, amount: string) =>
// {
//     try
//     {
//         const microStacks = toMicroStacks(amount);
//         return {
//             args: [
//                 stringUtf8CV(recipient),
//                 uintCV(microStacks),
//                 stringUtf8CV('STX')
//             ],
//             microStacks
//         };
//     } catch (error)
//     {
//         console.error('Error preparing tip arguments:', error);
//         throw new Error('Failed to prepare transaction arguments');
//     }
// };

import { stringAsciiCV, uintCV, ClarityValue, ClarityType } from '@stacks/transactions';

// Convert STX amount to microstacks with validation
export const toMicroStacks = (amount: string): number => {
  try {
    const value = parseFloat(amount);
    if (isNaN(value)) throw new Error('Invalid amount');
    if (value < 0) throw new Error('Amount must be positive');
    return Math.floor(value * 1000000);
  } catch (error) {
    console.error('Error converting to microStacks:', error);
    throw error;
  }
};

// Serialize Clarity Value to a format the contract expects
export const serializeCV = (cv: ClarityValue): any => {
  switch (cv.type) {
    case ClarityType.UInt:
      return cv.value.toString();
    case ClarityType.StringASCII:  // Changed from StringUTF8 to StringASCII
      return cv.value;
    default:
      throw new Error(`Unsupported Clarity type: ${cv.type}`);
  }
};

// Prepare contract call arguments with improved error handling
export const prepareTipArgs = (recipient: string, amount: string) => {
  try {
    if (!recipient || !amount) {
      throw new Error('Recipient and amount are required');
    }

    const microStacks = toMicroStacks(amount);
    
    // Create Clarity Values
    const recipientCV = stringAsciiCV(recipient);  // Changed from stringUtf8CV to stringAsciiCV
    const amountCV = uintCV(microStacks);
    const currencyCV = stringAsciiCV('STX');  // Changed from stringUtf8CV to stringAsciiCV

    // Create args array with serialized values
    const args = [recipientCV, amountCV, currencyCV].map(serializeCV);

    // Debug log
    console.log('Prepared arguments:', {
      recipient,
      amount,
      microStacks,
      args
    });

    return { 
      recipient,
      amount,
      microStacks,
      args
    };
  } catch (error: any) {
    console.error('Error preparing tip arguments:', error);
    throw new Error(`Failed to prepare transaction arguments: ${error.message}`);
  }
};