import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import { BigNumber, constants } from "ethers";
import { tokenStatAtomFamily } from "@atoms/stat";
import { BSC_BLOCK_TIME, Token } from "@/utils/constants";
import { useRpcStaking } from "./useStaking";
import useFetchPrice from "./useFetchPrice";

export function useFetchStat(token: TokenEnum) {
  const stakingContract = useRpcStaking(token);

  // stat
  const setStat = useUpdateAtom(tokenStatAtomFamily(token));

  const fetchData = useCallback(async () => {
    let res: BigNumber[] = [];
    if (stakingContract) {
      res = await Promise.all([
        stakingContract.totalSupply(), // total staked
        stakingContract.periodFinish(), // finish time
        stakingContract.rewardRate(), // rewards per second
        // stakingContract.rewardsDuration(), // rewardDuration in seconds
        stakingContract.lockDownDuration(), // lockDownDuration in seconds
      ]); 
    }

    const [
      totalStaked = constants.Zero,
      periodFinish = constants.Zero,
      rewardsPerSecond = constants.Zero,
      // rewardsDurationSeconds = constants.Zero,
      lockDownSeconds = constants.Zero,
    ] = res;
    const finishTimestamp = periodFinish.toNumber();
    const now = Date.now() / 1000;
    // console.log('res', now, finishTimestamp, periodFinish.toNumber());

    setStat({
      isRoundActive: finishTimestamp > 0 && now < finishTimestamp,
      total: totalStaked,
      rewardsPerBlock: rewardsPerSecond.mul(BSC_BLOCK_TIME),
      // rewardsDurationSeconds,
      lockDownSeconds,
    });

    return constants.Zero;
  }, [setStat, stakingContract]);

  return fetchData;
}

export default function useFetchStats() {
  // const phb = useFetchStat(Token.PHB);
  const JIT = useFetchStat(Token.JIT);
  const lp = useFetchStat(Token.JIT_BNB);
  const lpContractPswapBnb = useFetchStat(Token.JIT_BUSD);
  const lpContractPswapBusd = useFetchStat(Token.JIT_DOGE);
  // const lpDeprecated = useFetchStat(Token.JIT_BNB_DEPRECATED);
  // const lpLegacy = useFetchStat(Token.JIT_BNB_LEGACY);

  // price
  const fetchPrice = useFetchPrice();

  const fetch = useCallback(
    () =>
      Promise.all([
        fetchPrice(),
        // phb(),
        JIT(),
        lp(),
        lpContractPswapBnb(),
        lpContractPswapBusd(),
        // lpDeprecated(),
        // lpLegacy(),
      ]),
    [fetchPrice, JIT, lp, lpContractPswapBnb, lpContractPswapBusd] //phb, , lpDeprecated, lpLegacy
  );

  return fetch;
}
