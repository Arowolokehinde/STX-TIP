import React, { useContext, useEffect, useState } from 'react';
import { Bell, Menu, Home, Layout, LogOutIcon, WalletIcon } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import {
  authenticate,
  getUserData,
  signUserOut,
  userSession,
} from '@/lib/auth';
import { UserData } from '@/lib/type';
import toast from 'react-hot-toast';
import { authContext } from '@/context/AuthContext';
import EmailModal from '../Utils/EmailModal';
import VerifyEmailModal from '../Utils/VerifyEmailModal';

export const Header = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  console.log(userData);
  
  const {walletAddress, setWalletAddress, currentPage, setCurrentPage, setWalletConnected } = useAppContext();
  const { dispatch } = useContext(authContext);

  useEffect(() =>
    {
      const checkAuth = async () =>
      {
        if (userSession.isSignInPending())
        {
          const userData = await userSession.handlePendingSignIn();
          setIsAuthenticated(true);
          setUserData(userData);
          setWalletAddress(userData?.profile?.stxAddress?.testnet ?? null);
          setWalletConnected(true);
          await checkUserExists(userData?.profile?.stxAddress?.testnet);
        } else if (userSession.isUserSignedIn())
        {
          const userData = getUserData();
          setIsAuthenticated(true);
          setUserData(userData);
          setWalletAddress(userData?.profile?.stxAddress?.testnet ?? null);
          setWalletConnected(true);
          await checkUserExists(userData?.profile?.stxAddress?.testnet);
        }
      };
  
      checkAuth();
    }, []);

    const checkUserExists = async (walletAddress: string | null) =>
      {
        if (!walletAddress) return;
    
        try
        {
          const response = await fetch(`http://127.0.0.1:5000/api/v1/users/exists?wallet=${walletAddress.toLowerCase()}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
    
          if (!response.ok)
          {
            throw new Error('Failed to check user existence');
          }
    
          const data = await response.json();
          if (!data.exists)
          {
            setIsEmailModalOpen(true);
          }
        } catch (error)
        {
          console.error('Failed to check user existence:', error);
        }
      };

  const handleAuth = () => {
    if (isAuthenticated) {
      signUserOut();
      setWalletAddress(null);
      setIsAuthenticated(false);
    } else {
      authenticate();
    }
  };

  const toggleDashboard = () => {
    setCurrentPage(currentPage === 'home' ? 'dashboard' : 'home');
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
      e.preventDefault();
      if (!email.trim().toLowerCase() || !walletAddress?.toLowerCase()) return;
  
      console.log('email:', email);
      console.log('wallet:', walletAddress);
  
      try
      {
        setIsLoading(true);
  
        const response = await fetch('http://127.0.0.1:5000/api/v1/users/connect-wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            wallet: walletAddress
          }),
        });
  
        const result = await response.json();
  
        if (response.ok)
        {
          dispatch({
            type: "ACTIVATE_USER",
            payload: {
              activationToken: result.verificationToken,
              activation_Code: result.activationCode
            }
          })
  
          console.log(result.activationCode)
  
          setIsLoading(false);
          setIsVerifyModalOpen(true);
        }
        else
        {
          toast.error(result.message);
          setIsLoading(false);
        }
  
        setIsEmailModalOpen(false);
      } catch (error: any)
      {
        console.error('Failed to save user data:', error);
        toast.error(error.message);
      } finally
      {
        setIsLoading(false);
      }
    };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b h-16 fixed top-0 right-0 left-0 z-20">
        <div className="h-full px-4 max-w-7xl mx-auto flex items-center justify-between">
          {/* Left section - Brand and Navigation */}
          <div className="flex items-center space-x-4">
            {currentPage !== 'home' && (
              <button className="lg:hidden hover:bg-gray-100 p-2 rounded-full transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            )}
            
            <div className="flex items-center space-x-2">
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-pointer">
                TipStack
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={toggleDashboard}
                className={`flex items-center space-x-2 px-2 py-1 rounded-lg transition-all duration-200  ${
                  currentPage === (currentPage === 'home' ? 'dashboard' : 'home')
                    ? 'bg-gradient-to-r from-violet-600/10 to-purple-600/10 text-purple-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {currentPage === 'home' ? (
                  <>
                    <Layout className="h-6 w- text-purple-600" />
                    <span className="md:flex hidden ">Dashboard</span>
                  </>
                ) : (
                  <div className="flex gap-2 items-center justify-center lg:ml-[200px]">
                    <Home className="h-4 w-4 text-purple-600" />
                    <span className="md:flex hidden">Home</span>
                  </div>
                )}
              </button>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-lg border border-purple-100">
                  <WalletIcon className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium text-purple-700">
                    {formatWalletAddress(walletAddress || '')}
                  </span>
                </div>
              </>
            )}

            <button
              onClick={handleAuth}
              className="text-sm md:text-base bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 shadow-md flex items-center"
            >
              {isAuthenticated ? (
                <>
                  <LogOutIcon className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Disconnect</span>
                </>
              ) : (
                <>
                  <WalletIcon className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Connect Wallet</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onOpenChange={setIsEmailModalOpen}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleEmailSubmit}
        isLoading={isLoading}
      />

      {/* Verify Email Modal */}
      <VerifyEmailModal
        isOpen={isVerifyModalOpen}
        onOpenChange={setIsVerifyModalOpen}
        userEmail={email}
      />
    </>
  );
};

export default Header;