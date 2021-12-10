import { useCallback } from "react";
import { constants } from "ethers";
import { useUpdateAtom } from "jotai/utils";
import { useSnackbar } from "notistack";
import { loadingAllAtom } from "@atoms/loading";
import { availableAtomFamily } from "@atoms/balance";
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
import useFetchStakingData from "./useFetchStakingData";

export default function useFetchState() {
  const { account } = useWallet();

  const { enqueueSnackbar } = useSnackbar();

  // token available
  // const phbToken = usePHB();
  const JITToken = useJIT();
  const lpToken = useLP();
  const lpContractPswapBnb = usePswapBnbLP();
  const lpContractPswapBusd = usePswapBusdPL();
  // const deprecatedLpToken = useDeprecatedLP();
  // const legacyLpToken = useLegacyLP();

  // all loading
  const setLoading = useUpdateAtom(loadingAllAtom);

  // available atoms
  // const setAvailablePHB = useUpdateAtom(availableAtomFamily(Token.PHB));
  const setAvailableJIT = useUpdateAtom(availableAtomFamily(Token.JIT));
  const setAvailableLP = useUpdateAtom(availableAtomFamily(Token.JIT_DOGE));
  const setAvailableLP1 = useUpdateAtom(availableAtomFamily(Token.JIT_SHIB));
  const setAvailableLP2 = useUpdateAtom(availableAtomFamily(Token.JIT_AKITA));

  // const setAvailableDeprecatedLP = useUpdateAtom(
  //   availableAtomFamily(Token.JIT_DOGE_DEPRECATED)
  // );
  // const setAvailableLegacyLP = useUpdateAtom(
  //   availableAtomFamily(Token.JIT_DOGE_LEGACY)
  // );

  // fetch token staking data
  // const fetchPHBStakingData = useFetchStakingData(Token.PHB);
  const fetchJITStakingData = useFetchStakingData(Token.JIT);
  const fetchLPStakingData = useFetchStakingData(Token.JIT_DOGE);
  const fetchLPStakingData1 = useFetchStakingData(Token.JIT_SHIB);
  const fetchLPStakingData2 = useFetchStakingData(Token.JIT_AKITA);

  // const fetchDeprecatedLPStakingData = useFetchStakingData(
  //   Token.JIT_DOGE_DEPRECATED
  // );
  // const fetchLegacyLPStakingData = useFetchStakingData(Token.JIT_DOGE_LEGACY);

  const fetchBalances = useCallback(async () => {
    try {
      setLoading(true);
      const [JIT, lp, lp1, lp2] = await Promise.all([ //phb, deprecatedLp, legacyLp
        // account && phbToken ? phbToken.balanceOf(account) : constants.Zero,
        account && JITToken
          ? JITToken.balanceOf(account)
          : constants.Zero,
        account && lpToken 
          ? lpToken.balanceOf(account) 
          : constants.Zero,
        account && lpContractPswapBnb
          ? lpContractPswapBnb.balanceOf(account)
          : constants.Zero,
        account && lpContractPswapBusd
          ? lpContractPswapBusd.balanceOf(account)
          : constants.Zero,
        // fetchPHBStakingData(),
        fetchJITStakingData(),
        fetchLPStakingData(),
        fetchLPStakingData1(),
        fetchLPStakingData2(),
        // fetchDeprecatedLPStakingData(),
        // fetchLegacyLPStakingData(),
      ]);

      // setAvailablePHB(phb);
      setAvailableJIT(JIT);
      setAvailableLP(lp);
      setAvailableLP1(lp1);
      setAvailableLP2(lp2);
      // setAvailableDeprecatedLP(deprecatedLp);
      // setAvailableLegacyLP(legacyLp);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Failed to loading balances", { variant: "error" });
    }
    setLoading(false);
  }, [
    setLoading,
    account,
    JITToken,
    lpToken,
    lpContractPswapBnb,
    lpContractPswapBusd,
    // deprecatedLpToken,
    // legacyLpToken,
    // fetchPHBStakingData,
    fetchJITStakingData,
    fetchLPStakingData,
    fetchLPStakingData1,
    fetchLPStakingData2,
    // fetchDeprecatedLPStakingData,
    // fetchLegacyLPStakingData,
    // setAvailablePHB,
    setAvailableJIT,
    setAvailableLP,
    setAvailableLP1,
    setAvailableLP2,
    // setAvailableDeprecatedLP,
    enqueueSnackbar,
  ]);

  return fetchBalances;
}
