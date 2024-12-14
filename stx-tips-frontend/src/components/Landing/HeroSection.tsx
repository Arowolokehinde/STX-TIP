import React, { useState } from 'react';
import { ArrowRight, Sparkles, Users, Shield, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';

export const HeroSection = () => {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isUsernameModalOpen, setUsernameModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {walletConnected, setWalletConnected, walletAddress, setWalletAddress} = useAppContext();

  const connectXverseWallet = async () => {
    try {
      if (window.BitcoinProvider) {
        const accounts = await window.BitcoinProvider.connect();
        if (accounts && accounts.length > 0) {
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

  const connectLethalWallet = async () => {
    try {
      if (window.lethalProvider) {
        const { address } = await window.lethalProvider.connect();
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-violet-950 to-purple-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-full opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center justify-center">
          {/* Left column - Text content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Instant Blockchain Transfers
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-transparent bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text">
                Empower Communities
              </span>
              <br />
              <span className="text-white/90">
                Through Digital Giving
              </span>
            </h1>
            
            <p className="text-lg text-gray-300/90 max-w-xl">
              Send instant tips and rewards to anyone, anywhere. Support creators, 
              contribute to communities, or show appreciation - all powered by 
              secure blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {!walletConnected ? (
                <Button
                  onClick={() => setWalletModalOpen(true)}
                  className="group bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-6 rounded-xl text-lg hover:opacity-90 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-violet-500/25"
                >
                  Start Giving
                  <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button
                  className="bg-green-500/90 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-green-500/25"
                  disabled
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Wallet Connected
                </Button>
              )}
            </div>

            {/* Feature highlights */}
            <div className="grid sm:grid-cols-2 justify-center  items-center gap-6 mt-8">
              <div className="flex items-center justify-center space-x-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <Users className="h-5 w-5 text-violet-300" />
                <span className="text-gray-200">Global Community</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                <Shield className="h-5 w-5 text-violet-300" />
                <span className="text-gray-200">Secure Transfers</span>
              </div>
            </div>
          </div>

          {/* Right column - Decorative element */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-purple-500/20 rounded-3xl transform rotate-3 animate-pulse" />
            <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/10">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="animate-bounce mb-4">
                    <Sparkles className="h-12 w-12 text-violet-300 mx-auto" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-white">Secure Transactions</h3>
                    <p className="text-gray-300">Powered by Stacks Blockchain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                className="w-full flex items-center justify-center space-x-2 p-4 border rounded-lg hover:border-violet-600 transition-all duration-200"
              >
                <span className="font-medium">Connect Xverse Wallet</span>
              </Button>
              <Button
                variant="outline"
                onClick={connectLethalWallet}
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
          <form className="grid gap-4 py-4">
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
            <Button disabled={isLoading || !username.trim()}>
              {isLoading ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeroSection;