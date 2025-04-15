import styles from "../styles/Home.module.css";

export default function Card(props) {
  const nft = JSON.parse(props.uri.metadata);

  const handleClick = (nft) => {
    console.log(`Clicked on an NFT! ${nft}`);
  };

  return (
    <section className={styles.cardContainer} onClick={() => handleClick(nft)}>
      {nft?.name ? <h1>{nft.name}</h1> : <h1>No NFT title can be shown.</h1>}
      {nft?.image ? <img src={nft.image} /> : <p>No NFT image can be shown.</p>}
    </section>
  );
}
