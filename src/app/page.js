"use client";

import { useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";
import LoggedIn from "../components/LoggedIn";
import LoggedOut from "../components/LoggedOut";
import styles from "../styles/Page.module.css";

export default function Home() {
  const chainId = sepolia.id;
  const { address: walletAddress } = useAccount();
  const isLoggedOut = !walletAddress;

  return (
    <div className={styles.container}>
      {isLoggedOut ? (
        <LoggedOut />
      ) : (
        <LoggedIn />
      )}
    </div>
  );
}
