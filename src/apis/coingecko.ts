import fetch from "cross-fetch";

const ENDPOINT =
  "https://api.coingecko.com/api/v3/simple/price?ids=red-pulse,horizon-protocol&vs_currencies=USD";

interface Result {
  "red-pulse": {
    usd: number;
  };
  "horizon-protocol"?: {
    usd: number;
  };
}

export async function fetchPrice(): Promise<{JIT: number }> { // phb: number; 
  try {
    const res = await fetch(ENDPOINT);
    const data: Result = await res.json();

    return {
      // phb: data["red-pulse"].usd,
      JIT: 1//data["horizon-protocol"]?.usd || 0,
    };
  } catch (error) {
    return { JIT: 0 }; //phb: 0,
  }
}
