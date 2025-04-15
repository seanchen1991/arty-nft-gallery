"use client";

import { WAGMI_CONFIG } from "@/wagmi/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";

const client = new QueryClient();

export function WalletProvider({ children }) {
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider initialChain={sepolia}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
