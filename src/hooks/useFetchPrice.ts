import { useCallback, useState } from "react";
import { BigNumber, constants, utils } from "ethers";
import { useUpdateAtom } from "jotai/utils";
import { fetchPrice } from "@/apis/coingecko";
import { fetchTotalLiquidity } from "@/apis/pancakeswap";
import { tokenPriceAtomFamily } from "@atoms/price";
import erc20Abi from "@abis/erc20.json";
import { Erc20 } from "@abis/types";
import { TokenAddresses, Token } from "@utils/constants";
import { useRpcContract } from "./useContract";

const lpDisabled = false;

export default function useFetchPrice() {
  const [timestamp, setTimestamp] = useState<number>(0);

  const lpToken = useRpcContract(
    TokenAddresses[Token.JIT_PEPE],
    erc20Abi
  ) as Erc20;
  const lpToken1 = useRpcContract(
    TokenAddresses[Token.JIT_BOB],
    erc20Abi
  ) as Erc20;
  const lpToken2 = useRpcContract(
    TokenAddresses[Token.JIT_WOJAK],
    erc20Abi
  ) as Erc20;

  const setJITPrice = useUpdateAtom(tokenPriceAtomFamily(Token.JIT));
  const setLpPrice = useUpdateAtom(tokenPriceAtomFamily(Token.JIT_PEPE));
  const setLpPrice1 = useUpdateAtom(tokenPriceAtomFamily(Token.JIT_BOB));
  const setLpPrice2 = useUpdateAtom(tokenPriceAtomFamily(Token.JIT_WOJAK));

  const run = useCallback(async () => {
    const now = Date.now() / 1000;

    if (now - timestamp < 5) {
      return;
    }
    setTimestamp(now);
    const [{ JIT },
      totalLiquidityPCS,
      lpTotalSupplyPCS,
      totalLiquidityPSBnb,
      lpTotalSupplyPSbnb,
      totalLiquidityPSBusd,
      lpTotalSupplyPsBusd,
    ] = await Promise.all([
      fetchPrice(),
      lpDisabled ? 0 : fetchTotalLiquidity("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0xe55072ab00eeccd4ed5b581849e578fd54585ff8"),
      !lpDisabled && lpToken ? lpToken.totalSupply() : constants.Zero,
      lpDisabled ? 0 : fetchTotalLiquidity("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x651475bb871b2668f91d3d58cb815efa030e518b"),
      !lpDisabled && lpToken1 ? lpToken1.totalSupply() : constants.Zero,
      lpDisabled ? 0 : fetchTotalLiquidity("0xe9e7cea3dedca5984780bafc599bd69add087d56", "0x65723b6b0b808d9f2bD7ED6232a814b4919D1923"),
      !lpDisabled && lpToken2 ? lpToken2.totalSupply() : constants.Zero,
    ]);
    const lpPrice = lpTotalSupplyPCS.gt(0)
      ? utils.parseEther(totalLiquidityPCS.toString()).div(lpTotalSupplyPCS)
      : BigNumber.from(0);
    const lpPrice1 = lpTotalSupplyPSbnb.gt(0)
      ? utils.parseEther(totalLiquidityPSBnb.toString()).div(lpTotalSupplyPSbnb)
      : BigNumber.from(0);
    const lpPrice2 = lpTotalSupplyPsBusd.gt(0)
      ? utils.parseEther(totalLiquidityPSBusd.toString()).div(lpTotalSupplyPsBusd)
      : BigNumber.from(0);
    console.log('lpPrice',lpPrice.toNumber())
    console.log('lpPrice1',lpPrice1.toNumber())
    console.log('lpPrice2',lpPrice2.toNumber())

    setJITPrice(JIT);
    setLpPrice(lpPrice.toNumber());
    setLpPrice1(lpPrice1.toNumber());
    setLpPrice2(parseFloat('1'));//lpPrice2.toNumber()

  }, [lpToken, setJITPrice, setLpPrice, setLpPrice1, setLpPrice2, timestamp]);

  return run;
}
