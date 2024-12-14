import { NETWORK_CONFIG } from "@/lib/constants";

export const fetchUserBalance = async (userAddress: string) => {
  try {
    const response = await fetch(
      `${NETWORK_CONFIG.API_URL}/v1/addresses/${userAddress}/balances`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching user balance:', error);
    return null;
  }
};

export const fetchUserStats = async (userAddress: string) => {
  try {
    const response = await fetch(
      `${NETWORK_CONFIG.API_URL}/v1/addresses/${userAddress}/transactions`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
};