import { useAccount } from "wagmi";
import axios from "axios";
import { useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import styles from "../styles/Home.module.css";
import Card from "./Card";

const FETCH_ENDPOINT = process.env.ENDPOINT;

export default function FetchNfts() {
  const [nfts, setNfts] = useState([]);
  const { address } = useAccount();
  const chain = sepolia.id;

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(FETCH_ENDPOINT, {
          params: { address, chain },
        })
        .then((resp) => {
          setNfts(resp.data.result);
          console.log(resp);
        });
    }

    fetchData();
  }, []);

  return nfts.length > 0 ? (
    <section className={styles.dataContainer}>
      {nfts.map((nft) => {
        return nft.metadata && <Card uri={nft} key={nft.token_id} />;
      })}
    </section>
  ) : (
    <div className={styles.rowBalance}>
      <span>You have no NFTs to display! Why not go mint some?</span>
    </div>
  );
}
