import FetchNfts from "./FetchNfts";
import MintNft from "./MintNft";

export default function LoggedIn() {
  return (
    <div>
      <MintNft />
      <FetchNfts />
    </div>
  );
}
