// API endpoints
const API_BASE_URL = 'http://127.0.0.1:5000/api/v1';

export const fetchUserWalletInfo = async (walletAddress: string) =>
{
    try
    {
        const response = await fetch(`${API_BASE_URL}/users/wallet/${walletAddress}`);
        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error)
    {
        console.error('Error fetching user wallet info:', error);
        throw error;
    }
};

export const notifyTipSent = async (
    recipientAddress: string,
    amount: string,
    transactionId: string
) =>
{
    try
    {
        const response = await fetch(`${API_BASE_URL}/users/send-tip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipientAddress,
                amount,
                transactionId,
            }),
        });

        if (!response.ok)
        {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error)
    {
        console.error('Error notifying tip sent:', error);
        throw error;
    }
};