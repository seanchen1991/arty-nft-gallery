import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../styles/Header.module.css";

export function Header() {
  return (
     <header className={styles.wrapper}>
      <ConnectButton />
    </header>
  )
}
