import React, { createContext, useContext, useState } from 'react';
import { useWallet } from '../hooks/useWallet';

interface AppContextType
{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  currentPage: string;
  setCurrentPage: (value: string) => void;
  walletConnected: boolean;
  setWalletConnected: (value: boolean) => void;
  walletAddress: string | null;
  setWalletAddress: (value: string | null) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  wallet: ReturnType<typeof useWallet>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>
{
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { connectWallet, disconnectWallet } = useWallet();
  const wallet = useWallet();

  return (
    <AppContext.Provider value={{
      isOpen,
      setIsOpen,
      currentPage,
      setCurrentPage,
      walletConnected,
      setWalletConnected,
      walletAddress,
      setWalletAddress,
      wallet,
      connectWallet,
      disconnectWallet
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () =>
{
  const context = useContext(AppContext);
  if (context === undefined)
  {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
