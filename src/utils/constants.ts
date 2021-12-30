import { Connectors } from "@binance-chain/bsc-use-wallet";
import BinanceLogo from "@assets/wallets/binance.svg";
import MetamaskLogo from "@assets/wallets/metamask.svg";
import TrustLogo from "@assets/wallets/trust.svg";
import { BigNumber } from "ethers";

export enum Action {
  Stake = 1,
  Unstake,
}

export enum Token {
  // PHB = "PHB",
  JIT = "KIK",
  JIT_DOGE = "DOGE",
  JIT_SHIB = "SHIBA INU",
  JIT_AKITA = "AKITA INU",
  // JIT_DOGE_DEPRECATED = "JIT-BNB LP Deprecated",
  // JIT_DOGE_LEGACY = "JIT-BNB LP Legacy",
}

export const TokenName = {
  [Token.JIT]: "KIK",
  [Token.JIT_DOGE]: "DOGE",
  [Token.JIT_SHIB]: "SHIBA INU",
  [Token.JIT_AKITA]: "AKITA INU",
};

export const TokenShortName = {
  [Token.JIT]: "KIK",
  [Token.JIT_DOGE]: "DOGE",
  [Token.JIT_SHIB]: "SHIB",
  [Token.JIT_AKITA]: "AKITA",
};

export enum SupportedWallet {
  Metamask = "Metamask",
  Binance = "Binance",
  Trust = "Trust",
}

declare global {
  type ActionEnum = Action;
  type TokenEnum = Token;
  type SupportedWalletEnum = SupportedWallet;

  interface WalletDetail {
    key: SupportedWalletEnum;
    label: string;
    logo: string;
    connectorId: keyof Connectors;
  }
}

export const SUPPORTED_WALLETS: WalletDetail[] = [
  {
    key: SupportedWallet.Metamask,
    label: "Metamask",
    logo: MetamaskLogo,
    connectorId: "injected",
  },
  {
    key: SupportedWallet.Binance,
    label: "Binance Wallet",
    logo: BinanceLogo,
    connectorId: "bsc",
  },
  {
    key: SupportedWallet.Trust,
    label: "Trust Wallet",
    logo: TrustLogo,
    connectorId: "injected",
  },
];

export const CHAIN_NAME_MAP: {
  [chain: number]: string;
} = {
  56: "BSC Mainnet",
  97: "BSC Testnet",
};

export const TOKEN_ADDRESS: {
  [chain: number]: {
    [t in Token]: string;
  };
} = {
  56: {
    [Token.JIT]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_DOGE]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_SHIB]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_AKITA]: "0x000000000000000000000000000000000000dead",
  },
  97: {
    [Token.JIT]: "0xf0b9a43bf91e8e476d70895d5b81643d2ae8f323",
    [Token.JIT_DOGE]: "0xf0b9a43bf91e8e476d70895d5b81643d2ae8f323",
    [Token.JIT_SHIB]: "0xf0b9a43bf91e8e476d70895d5b81643d2ae8f323",
    [Token.JIT_AKITA]: "0xf0b9a43bf91e8e476d70895d5b81643d2ae8f323",
  },
  1337: {
    [Token.JIT]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_DOGE]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_SHIB]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_AKITA]: "0x000000000000000000000000000000000000dead",
  },
};

// staking contract
export const STAKING_CONTRACT_ADDRESS: {
  [chain: number]: {
    [t in Token]: string;
  };
} = {
  56: {
    [Token.JIT]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_DOGE]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_SHIB]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_AKITA]: "0x000000000000000000000000000000000000dead",
  },
  97: {
    [Token.JIT]: "0x9AeB8613904B8B42999aD0A16E536a8ceE31b6FE",
    [Token.JIT_DOGE]: "0x9AeB8613904B8B42999aD0A16E536a8ceE31b6FE",
    [Token.JIT_SHIB]: "0x9AeB8613904B8B42999aD0A16E536a8ceE31b6FE",
    [Token.JIT_AKITA]: "0x9AeB8613904B8B42999aD0A16E536a8ceE31b6FE",
  },
  1337: {
    [Token.JIT]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_DOGE]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_SHIB]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_AKITA]: "0x000000000000000000000000000000000000dead",
  },
};

// const EnvChainId = parseInt(process.env.REACT_APP_CHAIN_ID);

export const ChainId = 97;//[56, 97].indexOf(EnvChainId) > -1 ? EnvChainId : 97;
export const ChainName = CHAIN_NAME_MAP[ChainId];
export const TokenAddresses = TOKEN_ADDRESS[ChainId];
export const StakingAddresses = STAKING_CONTRACT_ADDRESS[ChainId];

// BSC 3 seconds per block
export const BSC_BLOCK_TIME = 3;

// BSC Blocks per year
export const BLOCKS_PER_YEAR = BigNumber.from(
  (60 / BSC_BLOCK_TIME) * 60 * 24 * 365
); // 10512000

export const DEPRECATED_TOKENS = [
  // Token.JIT_DOGE_DEPRECATED,
  // Token.JIT_DOGE_LEGACY,
];