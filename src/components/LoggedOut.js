import styles from "../styles/Page.module.css";

export default function LoggedOut() {
  return (
    <div className={styles.rowBalance}>
      <span>Please connect your wallet to fetch and display NFTs.</span>
    </div>
  );
}
