import React, { useState } from "react";
import {
  BaseError,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";
import styles from "../styles/Home.module.css";
import NFT_ABI from "../wagmi/abi/ArtyNFT";

export default function Card(props) {
  const tokenId = props.uri.token_id;
  const nftContractAddress = props.uri.token_address;
  const metadata  = JSON.parse(props.uri.metadata);

  const { address: senderAddress } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleClick = () => {
    const recipientAddress = prompt("Enter wallet address to transfer to:");

    if (recipientAddress !== null) {
      writeContract({
        address: nftContractAddress,
        abi: NFT_ABI,
        functionName: 'transferFrom',
        args: [senderAddress, recipientAddress, BigInt(tokenId)],
      });
    }
  };

  return (
    <section className={styles.cardContainer}>
      {metadata?.name ? <h1>{metadata.name}-{tokenId}</h1> : <h1>No NFT title can be shown.</h1>}
      {metadata?.image ? <img src={metadata.image} /> : <p>No NFT image can be shown.</p>}
      {metadata ? (
        <div>
          <button
            disabled={isPending}
            onClick={handleClick}
          >
            {isPending ? "Transferring..." : "Transfer"}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>Error: {error.shortMessage || error.message}</div>
          )}
        </div>
        ) : (
        <div />
      )}
    </section>
  );
}
