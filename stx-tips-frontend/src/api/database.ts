import { UserWalletData } from "@/lib/type";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.yourbackend.com';
const API_BASE_URL = 'https://api.yourbackend.com';

export class APIError extends Error
{
    constructor(public status: number, message: string)
    {
        super(message);
        this.name = 'APIError';
    }
}

export async function submitUserWalletData(userData: UserWalletData): Promise<{ success: boolean; userId?: string }>
{
    try
    {
        const response = await fetch(`${API_BASE_URL}/api/users/wallet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok)
        {
            let errorMessage = 'Failed to submit user data';
            try
            {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e)
            {
                // If error response is not JSON, use status text
                errorMessage = response.statusText;
            }
            throw new APIError(response.status, errorMessage);
        }

        const data = await response.json();
        return {
            success: true,
            userId: data.userId,
        };
    } catch (error)
    {
        if (error instanceof APIError)
        {
            throw error;
        }
        // Handle network errors or other unexpected issues
        throw new APIError(500, 'Failed to connect to the server');
    }
}

// Optional: Add retry logic for better reliability
export async function submitUserWalletDataWithRetry(
    userData: UserWalletData,
    maxRetries = 3,
    delayMs = 1000
): Promise<{ success: boolean; userId?: string }>
{
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++)
    {
        try
        {
            return await submitUserWalletData(userData);
        } catch (error)
        {
            lastError = error as Error;

            // Only retry on network errors or 5xx server errors
            if (error instanceof APIError && error.status < 500)
            {
                throw error;
            }

            if (attempt < maxRetries - 1)
            {
                // Wait before retrying, with exponential backoff
                await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)));
                continue;
            }
        }
    }

    throw lastError || new Error('Failed to submit user data after multiple attempts');
}