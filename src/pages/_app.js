import "@/styles/globals.css";
import { IBM_Plex_Sans } from "@next/font/google";
import StoreProvider from "store/store-context";

const ibm_font = IBM_Plex_Sans({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={ibm_font.className}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}
