import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  googleWallet,
  githubWallet,
  discordWallet,
} from "@zerodevapp/wagmi/rainbowkit";
import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, Chain } from "wagmi";
import { optimismGoerli, baseGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/navbar";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../styles/progressBar.css"; //styles of nprogress

const zoraGoerli = {
    id: 999,
    name: "Zora Goerli",
    network: "zora-goerli",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      alchemy: {
        http: ["https://zora-testnet.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a"],
        webSocket: ["wss://opt-goerli.g.alchemy.com/v2"],
      },
      infura: {
        http: ["https://zora-testnet.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a"],
        webSocket: ["wss://optimism-goerli.infura.io/ws/v3"],
      },
      default: {
        http: ["https://zora-testnet.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a"],
      },
      public: {
        http: ["https://zora-testnet.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a"],
      },
    },
    blockExplorers: {
      etherscan: {
        name: "Etherscan",
        url: "https://goerli-optimism.etherscan.io",
      },
      default: {
        name: "Etherscan",
        url: "https://goerli-optimism.etherscan.io",
      },
    },
    testnet: true,
  };

const { chains, provider, webSocketProvider } = configureChains(
  [optimismGoerli, baseGoerli, zoraGoerli],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Login",
    wallets: [
      googleWallet({
        chains: chains,
        options: {
          projectIds: [
            "65d107b6-4c94-4c8d-b21d-395af484803d",
            "ccd0a72c-2755-4f4b-ace9-e4a9955076b1",
          ],
        },
      }),
      githubWallet({
        chains: chains,
        options: {
          projectIds: [
            "65d107b6-4c94-4c8d-b21d-395af484803d",
            "ccd0a72c-2755-4f4b-ace9-e4a9955076b1",
          ],
        },
      }),
      discordWallet({
        chains: chains,
        options: {
          projectIds: [
            "65d107b6-4c94-4c8d-b21d-395af484803d",
            "ccd0a72c-2755-4f4b-ace9-e4a9955076b1",
          ],
        },
      }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div data-theme="bumblebee">
      <Head>
        <title>StackRewards</title>
        <meta name="description" content="StackRewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#E0A82E",
            accentColorForeground: "white",
            fontStack: "system",
          })}
        >
          <Navbar />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
