export interface Stat {
    title: string;
    value: string;
    change: string;
    icon?: React.ReactNode;
  }
  
  export interface NavItem {
    name: string;
    icon: React.ReactNode;
    id: string;
  }
  
  export interface Transaction {
    id: string;
    sender: string;
    recipient: string;
    amount: number;
    timestamp: Date;
  }
  
  export interface ChartData {
    name: string;
    tips: number;
  }

  export interface UserWalletData {
    walletAddress: string;
    username: string;
    memoCode: string;
  }

  export interface UserData {
    profile: {
      stxAddress: {
        mainnet: string;
      };
    };
  }