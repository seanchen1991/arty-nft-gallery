import { useAccount } from "wagmi";
import axios from "axios";
import { useEffect, useState } from "react";
import { sepolia } from "viem/chains";
import styles from "../styles/Home.module.css";
import Card from "./Card";

const GET_URL = "https://nft-server-ojnx.onrender.com/fetchnfts";

export default function FetchNfts() {
  const [nfts, setNfts] = useState([]);
  const { address } = useAccount();
  const chain = sepolia.id;

  console.log("Fetching NFTs...");

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(GET_URL, {
          params: { address, chain },
        })
        .then((resp) => {
          setNfts(resp.data.result);
          console.log(`Got NFTs! ${resp}`);
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
