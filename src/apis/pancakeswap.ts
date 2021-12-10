import fetch from "cross-fetch";

// const ENDPOINT = "https://api.pancakeswap.info/api/v2/pairs/";
const API = "https://api.example.finance/lpInfo"

interface Pair {
  pair_address: string;
  base_name: string;
  base_symbol: string;
  base_address: string;
  quote_name: string;
  quote_symbol: string;
  quote_address: string;
  price: string;
  base_volume: string;
  quote_volume: string;
  liquidity: string;
  liquidity_BNB: string;
}
const jitAddress = "0x000000000000000000000000000000000000dead";

export async function fetchTotalLiquidity(address1: string, address2: string): Promise<number> {
  const url = `${API}/${address1}/${jitAddress}/${address2}?${Math.random()}`

  try {
    const res = await fetch(url);
    const jsonData: Pair = await res.json();
    // console.log(address2, parseFloat(jsonData.liquidity))
    return parseFloat(jsonData.liquidity);
  } catch (error) {
    console.log(error);
    return 0;
  }
}
