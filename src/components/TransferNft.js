import React, { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import NFT_ABI from "../wagmi/abi/ArtyNFT";

export default function TransferNft({ nftContractAddress, tokenId }) {
  const { address: senderAddress } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState('');

  const { data: writeData, write } = useWriteContract({
    address: nftContractAddress,
    abi: NFT_ABI,
    functionName: 'transferFrom',
    args: [senderAddress, recipientAddress, BigInt(tokenId)],
  });

  const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: writeData?.hash,
  });

  const handleRecipientAddressChange = (event) => {
    setRecipientAddress(event.target.value);
  };

  const handleTransferNFT = () => {
    write?.();
  };

  return (
    <div>
      <h2>Transfer NFT</h2>
      <p>NFT Contract Address: {nftContractAddress}</p>
      <p>Token ID: {tokenId}</p>
      {senderAddress ? (
        <div>
          <label htmlFor="recipient">Recipient Address:</label>
          <input
            type="text"
            id="recipient"
            value={recipientAddress}
            onChange={handleRecipientAddressChange}
            placeholder="Enter recipient address"
          />
          <button
            onClick={handleTransferNFT}
            disabled={!write || isLoading}
          >
            {isLoading ? 'Transferring...' : 'Transfer NFT'}
          </button>

          {isSuccess && (
            <div style={{ marginTop: '10px', color: 'green' }}>
              Transaction successful!{' '}
              <a
                href={`https://etherscan.io/tx/${writeData?.hash}`} // Replace with your network's explorer
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Etherscan
              </a>
            </div>
          )}

          {isError && (
            <div style={{ marginTop: '10px', color: 'red' }}>
              Error transferring NFT: {error?.message}
            </div>
          )}
        </div>
      ) : (
        <p>Connect your wallet to transfer.</p>
      )}
    </div>
  );
}

