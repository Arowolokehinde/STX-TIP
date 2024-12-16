import { useState, useCallback } from 'react';
import { showConnect } from '@stacks/connect';
// import { StacksTestnet } from '@stacks/network';
import { APP_CONFIG } from '@/lib/constants';

export const useWallet = () =>
{
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const connectWallet = useCallback(async () =>
    {
        showConnect({
            appDetails: {
                name: APP_CONFIG.NAME,
                icon: window.location.origin + APP_CONFIG.ICON,
            },
            onFinish: () =>
            {
                // setWalletAddress(data.stacksAddress);
                setWalletConnected(true);
            },
            userSession: undefined,
            // network: new StacksTestnet(),
        });
    }, []);

    const disconnectWallet = useCallback(() =>
    {
        setWalletAddress(null);
        setWalletConnected(false);
    }, []);

    return {
        walletConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
    };
};