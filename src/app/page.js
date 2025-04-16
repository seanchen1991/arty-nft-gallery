"use client";

import { useAccount } from "wagmi";
import LoggedIn from "../components/LoggedIn";
import LoggedOut from "../components/LoggedOut";
import styles from "../styles/Page.module.css";

export default function Home() {
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
