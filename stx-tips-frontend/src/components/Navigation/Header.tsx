import React, { useState} from 'react';
import { Bell, Wallet, ChevronDown, Menu, Home, Layout, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';

// Add wallet interface types
declare global {
  interface Window {
    BitcoinProvider?: {
      connect: () => Promise<string[]>;
      requestAccounts: () => Promise<string[]>;
      getAccounts: () => Promise<string[]>;
      getNetwork: () => Promise<string>;
      signMessage: (message: string, address: string) => Promise<{ publicKey: string; signature: string }>;
    };
    lethalProvider?: {
      connect: () => Promise<{ address: string }>;
      sendTransaction: (params: { to: string; value: string }) => Promise<{ hash: string }>;
    };
  }
}

interface WalletInfo {
  name: string;
  type: string;
  address: string;
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectedWallets, setConnectedWallets] = useState<WalletInfo[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string>("");

  const {walletConnected, setWalletConnected, walletAddress, setWalletAddress, connectWallet, disconnectWallet} = useAppContext();

  const connectXverseWallet = async (): Promise<void> => {
    try {
      if (window.BitcoinProvider) {
        const accounts = await window.BitcoinProvider.connect();
        if (accounts && accounts.length > 0) {
          const walletInfo = {
            name: 'Xverse',
            type: 'bitcoin',
            address: accounts[0]
          };
          setConnectedWallets(prev => [...prev, walletInfo]);
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          setWalletModalOpen(false);
          setUsernameModalOpen(true);
        }
      } else {
        window.open('https://www.xverse.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting Xverse wallet:', error);
    }
  };

  const connectLethalWallet = async (): Promise<void> => {
    try {
      if (window.lethalProvider) {
        const { address } = await window.lethalProvider.connect();
        const walletInfo = {
          name: 'Lethal',
          type: 'lethal',
          address
        };
        setConnectedWallets(prev => [...prev, walletInfo]);
        setWalletAddress(address);
        setWalletConnected(true);
        setWalletModalOpen(false);
        setUsernameModalOpen(true);
      } else {
        window.open('https://lethal.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting Lethal wallet:', error);
    }
  };

  const handleUsernameSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !walletAddress) return;

    try {
      setIsLoading(true);
      const memoCode = Math.random().toString(36).substring(2, 15);
      
      const response = await fetch('/api/users/wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletAddress,
          username: username.trim(),
          memoCode,
          walletType: connectedWallets.find(w => w.address === walletAddress)?.type || 'unknown'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      setUsernameModalOpen(false);
    } catch (error) {
      console.error('Failed to save user data:', error);
      alert('Failed to save user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDashboard = () => {
    setCurrentPage(currentPage === 'home' ? 'dashboard' : 'home');
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b h-16 fixed top-0 right-0 left-0 z-20">
        <div className="h-full px-4 max-w-7xl mx-auto flex items-center justify-between">
          {/* Left section - Brand and Toggle */}
          <div className="flex items-center space-x-4">
            {currentPage !== 'home' && (
              <button onClick={() => setIsOpen(true)} className="lg:hidden hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-pointer">
                TipStack
              </div>
            </div>
            {walletConnected && (
              <button
                onClick={toggleDashboard}
                className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                {currentPage === 'home' ? (
                  <>
                    <Layout className="h-4 w-4" />
                    <span>Dashboard</span>
                  </>
                ) : (
                  <div className="flex gap-2 items-center justify-center ml-40">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* {currentPage === 'home' && (
              <nav className="hidden md:flex items-center space-x-8 mr-6">
                <a href="#features" className="text-sm font-medium relative group">
                  <span className="text-gray-700 group-hover:text-violet-600 transition-colors">Features</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-200"></span>
                </a>
                <a href="#about" className="text-sm font-medium relative group">
                  <span className="text-gray-700 group-hover:text-violet-600 transition-colors">About</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-200"></span>
                </a>
                <a href="#contact" className="text-sm font-medium relative group">
                  <span className="text-gray-700 group-hover:text-violet-600 transition-colors">Contact</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-200"></span>
                </a>
              </nav>
            )} */}

            {walletConnected && (
              <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {!walletConnected ? (
              <button
                onClick={() => setWalletModalOpen(true)}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200">
                <Wallet className="h-5 w-5 text-violet-600" />
                <span className="text-sm font-medium">{walletAddress?.slice(0, 4)}...{walletAddress?.slice(-4)}</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Wallet Selection Modal */}
      <Dialog open={isWalletModalOpen} onOpenChange={setWalletModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <p className="text-sm text-gray-500 text-center">Select your preferred wallet</p>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                onClick={connectXverseWallet}
                disabled={connectedWallets.some(w => w.name === 'Xverse')}
                className="w-full flex items-center justify-center space-x-2 p-4 border rounded-lg hover:border-violet-600 transition-all duration-200"
              >
                <span className="font-medium">Connect Xverse Wallet</span>
              </Button>
              <Button
                variant="outline"
                onClick={connectLethalWallet}
                disabled={connectedWallets.some(w => w.name === 'Lethal')}
                className="w-full flex items-center justify-center space-x-2 p-4 border rounded-lg hover:border-violet-600 transition-all duration-200"
              >
                <span className="font-medium">Connect Lethal Wallet</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Username Modal */}
      <Dialog open={isUsernameModalOpen} onOpenChange={setUsernameModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set Your Username</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUsernameSubmit} className="grid gap-4 py-4">
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !username.trim()}>
              {isLoading ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;