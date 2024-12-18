import { NETWORK, CONTRACT_ADDRESS, CONTRACT_NAME } from '@/config/stacks';
import
    {
        fetchCallReadOnlyFunction as callReadOnlyFunction,
        standardPrincipalCV,
        uintCV,
        stringAsciiCV,
    } from '@stacks/transactions';


export async function getUserStats(userAddress: string)
{
    const functionName = 'get-user-tip-stats';

    try
    {
        const result = await callReadOnlyFunction({
            network:NETWORK,
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName,
            functionArgs: [standardPrincipalCV(userAddress)],
            senderAddress: userAddress,
        });

        return result;
    } catch (error)
    {
        console.error('Error fetching user stats:', error);
        return null;
    }
}

export async function getTipHistory(sender: string, recipient: string, amount: number, fee: number, tokenType: string)
{
    const functionName = 'get-transaction-logs';

    try
    {
        const result = await callReadOnlyFunction({
            network: NETWORK,
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName,
            functionArgs: [
                standardPrincipalCV(sender),
                standardPrincipalCV(recipient),
                uintCV(amount),
                uintCV(fee),
                stringAsciiCV(tokenType)
            ],
            senderAddress: sender,
        });

        return result;
    } catch (error)
    {
        console.error('Error fetching tip history:', error);
        return null;
    }
}

export async function sendTip(recipient: string, amount: number, tokenType: string = 'STX')
{
    const functionName = 'tip';

    try
    {
        const result = await callReadOnlyFunction({
            network: NETWORK,
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName,
            functionArgs: [
                standardPrincipalCV(recipient),
                uintCV(amount),
                stringAsciiCV(tokenType)
            ],
            senderAddress: CONTRACT_ADDRESS,
        });

        return result;
    } catch (error)
    {
        console.error('Error sending tip:', error);
        return null;
    }
}