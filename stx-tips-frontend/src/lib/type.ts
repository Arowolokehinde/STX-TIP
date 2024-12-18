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


export interface UserStats {
  totalTipsSent: number;
  totalTipsReceived: number;
  rewardPoints: number;
}

export interface RawUserStats {
  'total-tips-sent': { value: bigint };
  'total-tips-received': { value: bigint };
  'reward-points': { value: bigint };
}

export interface TipHistoryEntry {
  amount: number;
  fee: number;
  tokenType: string;
  timestamp: number;
}

export interface RawTipHistoryEntry {
  amount: { value: bigint };
  fee: { value: bigint };
  'token-type': { value: string };
  timestamp: { value: bigint };
}

export interface SendTipParams {
  recipient: string;
  amount: number;
  tokenType?: string;
}