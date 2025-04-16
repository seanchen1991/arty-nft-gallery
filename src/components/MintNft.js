import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useWalletClient,
  usePublicClient,
} from "wagmi";
import { sepolia } from "viem/chains";
import NFT_ABI from "../wagmi/abi/ArtyNFT";
import styles from "../styles/Page.module.css";

const chainId = sepolia.id;
const nftContractAddress = "0x04fb34223Fb055c92eEDCf5A3988822ce0518f8F";
const tokenUri = "https://gateway.pinata.cloud/ipfs/bafkreih34fzsbejw4swpav5zdfrpyshdzkzmitpmv3rkjmnth2o2ic57gy";

export default function MintNft() {
  const [txDetails, setTxDetails] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { address: walletAddress } = useAccount();
  const { data: walletClient } = useWalletClient({
    chainId,
    account: walletAddress,
  });
  const publicClient = usePublicClient({
    chainId,
  });
  const { data: balance } = useBalance({
    address: walletAddress,
    chainId,
  });

  const isBalanceZero = balance?.value.toString() === "0";

  async function mintNft() {
    if (!walletClient || !publicClient || !walletAddress) return;

    try {
      setIsPending(true);
      setTxDetails("");

      const { request } = await publicClient.simulateContract({
        account: walletAddress,
        address: nftContractAddress,
        abi: NFT_ABI,
        functionName: "safeMint",
        args: [walletAddress, tokenUri],
      });

      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash });

      setTxDetails(`https://sepolia.etherscan.io/tx/${hash}`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    setTxDetails("");
  }, [walletAddress]);

  return !isBalanceZero ? (
    <div className={styles.rowChecker}>
      <button
        disabled={isPending || !walletAddress}
        className={styles.buttonAction}
        onClick={mintNft}
        type="button"
      >
        {isPending ? "Confirming..." : "Mint NFT"}
      </button>
      {txDetails && (
        <div className={styles.txDetails}>
          <span>🎉 Congrats! Your NFT has been minted 🐣 </span>
          <span>Refresh the page to re-populate the gallery</span>
          <a
            href={txDetails}
            target="_blank"
            rel="noreferrer"
            className={styles.txLink}
          >
            View transaction
          </a>
        </div>
      )}
    </div>
  ) : (    
    <div className={styles.rowChecker}>
      <span className={styles.textError}>
        You don't have enough ETH to mint an NFT!
      </span>
    </div>
  );
}
