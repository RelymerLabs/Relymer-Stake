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
  JIT = "PEPES",
  JIT_PEPE = "PEPE",
  JIT_BOB = "BOB",
  JIT_WOJAK = "WOJAK",
  // JIT_PEPE_DEPRECATED = "JIT-BNB LP Deprecated",
  // JIT_PEPE_LEGACY = "JIT-BNB LP Legacy",
}

export const TokenName = {
  [Token.JIT]: "PEPES",
  [Token.JIT_PEPE]: "PEPE",
  [Token.JIT_BOB]: "BOB",
  [Token.JIT_WOJAK]: "WOJAK",
};

export const TokenShortName = {
  [Token.JIT]: "PEPES",
  [Token.JIT_PEPE]: "PEPE",
  [Token.JIT_BOB]: "BOB",
  [Token.JIT_WOJAK]: "WOJAK",
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
    [Token.JIT]: "0xfef234c90b01b121c636e3c06e24cadca9d6404f",
    [Token.JIT_PEPE]: "0xfef234c90b01b121c636e3c06e24cadca9d6404f",
    [Token.JIT_BOB]: "0xfef234c90b01b121c636e3c06e24cadca9d6404f",
    [Token.JIT_WOJAK]: "0xfef234c90b01b121c636e3c06e24cadca9d6404f",
  },
  97: {
    [Token.JIT]: "0x81d22dccDA6CC1798EEe88A9928B2c8C854e9d74",
    [Token.JIT_PEPE]: "0x81d22dccDA6CC1798EEe88A9928B2c8C854e9d74",
    [Token.JIT_BOB]: "0x81d22dccDA6CC1798EEe88A9928B2c8C854e9d74",
    [Token.JIT_WOJAK]: "0x81d22dccDA6CC1798EEe88A9928B2c8C854e9d74",
  },
  1337: {
    [Token.JIT]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_PEPE]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_BOB]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_WOJAK]: "0x000000000000000000000000000000000000dead",
  },
};

// staking contract
export const STAKING_CONTRACT_ADDRESS: {
  [chain: number]: {
    [t in Token]: string;
  };
} = {
  56: {
    [Token.JIT]: "0xd4F8C272BD412d3964622Ce20Cd44f7FCe9c6AdD",
    [Token.JIT_PEPE]: "0xd4F8C272BD412d3964622Ce20Cd44f7FCe9c6AdD",
    [Token.JIT_BOB]: "0xd4F8C272BD412d3964622Ce20Cd44f7FCe9c6AdD",
    [Token.JIT_WOJAK]: "0xd4F8C272BD412d3964622Ce20Cd44f7FCe9c6AdD",
  },
  97: {
    [Token.JIT]: "0x0936836BfFc5fF796bD25AD126f3da79dD17dcc2",
    [Token.JIT_PEPE]: "0x0936836BfFc5fF796bD25AD126f3da79dD17dcc2",
    [Token.JIT_BOB]: "0x0936836BfFc5fF796bD25AD126f3da79dD17dcc2",
    [Token.JIT_WOJAK]: "0x0936836BfFc5fF796bD25AD126f3da79dD17dcc2",
  },
  1337: {
    [Token.JIT]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_PEPE]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_BOB]: "0x000000000000000000000000000000000000dead",
    [Token.JIT_WOJAK]: "0x000000000000000000000000000000000000dead",
  },
};

// const EnvChainId = parseInt(process.env.REACT_APP_CHAIN_ID);

export const ChainId = 97 ;//[56, 97].indexOf(EnvChainId) > -1 ? EnvChainId : 97;
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
  // Token.JIT_PEPE_DEPRECATED,
  // Token.JIT_PEPE_LEGACY,
];
