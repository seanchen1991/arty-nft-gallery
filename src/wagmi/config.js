import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "viem/chains";

const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT;

export const WAGMI_CONFIG = getDefaultConfig({
  appName: "NFT Display",
  projectId: reownProjectId,
  chains: [sepolia],
  ssr: true,
});
