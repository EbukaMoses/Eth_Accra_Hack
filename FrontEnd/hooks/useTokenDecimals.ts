// hooks/useTokenDecimals.ts
import { useReadContract } from "wagmi";
import { useState, useEffect } from "react";
import erc20ABI from "../abi/erc20ABI.json"; // Adjust path to your ERC-20 ABI

export function useTokenDecimals(tokenAddress: string) {
  const [cachedDecimals, setCachedDecimals] = useState<number | undefined>(undefined);

  const { data, isError, isLoading } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: "decimals",
    query: {
      enabled: !!tokenAddress && tokenAddress !== "0x0" && tokenAddress.length === 42, // Only fetch for valid addresses
      retry: 1, // Retry once on failure
    },
  });

  useEffect(() => {
    if (data !== undefined && !isError) {
      setCachedDecimals(Number(data));
    }
  }, [data, isError]);

  return {
    decimals: cachedDecimals ?? 18, // Default to 18 if undefined
    isLoading,
    isError,
  };
}