import { useState, useEffect, useMemo } from "react";
import { Contract, ContractInterface } from "ethers";
import erc20Abi from "@abis/erc20.json";
import JITAbi from "@abis/JIT.json";
import { Erc20, JIT } from "@abis/types";
import useWallet from "@hooks/useWallet";
import { TokenAddresses, Token } from "@utils/constants";
import useRpcProvider from "./useRpcProvider";

const useContract = (
  address: string,
  abi: ContractInterface,
  writable: boolean = false
) => {
  const { provider } = useWallet();

  const [contract, setContract] = useState<Contract>();

  useEffect(() => {
    if (address && provider) {
      if (writable) {
        setContract(new Contract(address, abi, provider.getSigner()));
      } else {
        setContract(new Contract(address, abi, provider));
      }
    }
  }, [address, abi, provider, writable]);

  return contract;
};

export const useRpcContract = (address: string, abi: ContractInterface) => {
  const rpcProvider = useRpcProvider();
  const contract = useMemo(() => new Contract(address, abi, rpcProvider), [
    abi,
    address,
    rpcProvider,
  ]);

  return contract;
};

export const useERC20 = (address: string, writable: boolean = false) => {
  return useContract(address, erc20Abi, writable) as Erc20;
};

// export const usePHB = (writable: boolean = false) => {
//   return useERC20(TokenAddresses[Token.PHB], writable);
// };

export const useJIT = (writable: boolean = false) => {
  return useContract(TokenAddresses[Token.JIT], JITAbi, writable) as JIT;
};

export const useLP = (writable: boolean = false) => {
  return useContract(
    TokenAddresses[Token.JIT_DOGE],
    erc20Abi,
    writable
  ) as Erc20;
};

export const usePswapBnbLP = (writable: boolean = false) => {
  return useContract(
    TokenAddresses[Token.JIT_SHIB],
    erc20Abi,
    writable
  ) as Erc20;
};


export const usePswapBusdPL = (writable: boolean = false) => {
  return useContract(
    TokenAddresses[Token.JIT_AKITA],
    erc20Abi,
    writable
  ) as Erc20;
};

// export const useLegacyLP = (writable: boolean = false) => {
//   return useContract(
//     TokenAddresses[Token.JIT_DOGE_LEGACY],
//     erc20Abi,
//     writable
//   ) as Erc20;
// };

export default useContract;
