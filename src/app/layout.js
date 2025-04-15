import { Header } from "../components/Header";
import { WalletProvider } from "../components/WalletProvider";
import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Header />
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
