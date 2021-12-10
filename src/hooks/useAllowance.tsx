import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { Erc20, JIT } from "@abis/types";
import { tokenAllowanceAtomFamily } from "@atoms/balance";
import { Token } from "@utils/constants";
import {
  // usePHB,
  useJIT,
  useLP,
  usePswapBnbLP,
  usePswapBusdPL,
  // useDeprecatedLP,
  // useLegacyLP,
} from "./useContract";
import useWallet from "./useWallet";

export const useTokenAllowance = (token: TokenEnum, spenderAddress: string) => {
  const { account } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [allowance, setAllowance] = useAtom(tokenAllowanceAtomFamily(token));

  // const phbContract = usePHB(true);
  const JITContract = useJIT(true);
  const lpContract = useLP(true);
  const lpContractPswapBnb = usePswapBnbLP(true);
  const lpContractPswapBusd = usePswapBusdPL(true);
  // const deprecatedLpContract = useDeprecatedLP(true);
  // const legacyLpContract = useLegacyLP(true);

  const tokenContract: Erc20 | JIT | null = useMemo(() => {
    switch (token) {
      // case Token.PHB:
      //   return phbContract;
      case Token.JIT:
        return JITContract;
      case Token.JIT_DOGE:
        return lpContract;
      case Token.JIT_SHIB:
        return lpContractPswapBnb;
      case Token.JIT_AKITA:
        return lpContractPswapBusd;
      // case Token.JIT_DOGE_DEPRECATED:
      //   return deprecatedLpContract;
      // case Token.JIT_DOGE_LEGACY:
      //   return legacyLpContract;
      default:
        break;
    }
    return null;
  }, [
    token,
    // phbContract,
    JITContract,
    lpContract,
    lpContractPswapBnb,
    lpContractPswapBusd
    // deprecatedLpContract,
    // legacyLpContract,
  ]);

  const fetchAllowance = useCallback(async () => {
    if (account && tokenContract) {
      setLoading(true);
      const allowance = await tokenContract.allowance(account, spenderAddress);
      console.log("allowance", token, allowance.toString());
      setAllowance(allowance);
      setLoading(false);
    }
  }, [account, tokenContract, setAllowance, spenderAddress, token]);

  const handleApprove = useCallback(async () => {
    if (account && tokenContract) {
      setLoading(true);
      try {
        const total = await tokenContract.totalSupply();
        const tx = await tokenContract.approve(spenderAddress, total);
        enqueueSnackbar(
          <>
            Approval request has been sent to blockchain,
            <br />
            waiting for confirmation...
          </>,
          { variant: "info" }
        );
        const res = await tx.wait(1);
        console.log("approve", res);
        setAllowance(total);
      } catch (e) {
        // enqueueSnackbar(e?.message || "Operation failed"!, {
        //   variant: "error",
        // });
      }
      setLoading(false);
    }
  }, [account, tokenContract, spenderAddress, enqueueSnackbar, setAllowance]);

  const checkApprove = useCallback(
    async (amount: BigNumber) => {
      if (amount.lte(allowance)) {
        console.log("already approved", allowance.toString());
        return;
      }

      handleApprove();
    },
    [allowance, handleApprove]
  );

  useEffect(() => {
    fetchAllowance();
  }, [fetchAllowance]);

  return {
    loading,
    needApprove: allowance.lte(0),
    allowance,
    handleApprove,
    checkApprove,
  };
};
