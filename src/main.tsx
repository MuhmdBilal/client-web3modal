import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App1";
import "./index.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains"; // Import only bscTestnet
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient for react-query
const queryClient = new QueryClient();

// WalletConnect projectId
const projectId = "9205d575da21f29d8e41a0abaaba6f0d";

// Supported chains (BSC Testnet in this case)
const chains = [bscTestnet];

// Metadata for Web3Modal
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Create wagmiConfig for WagmiConfig
const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  
});

// Initialize Web3Modal
createWeb3Modal({
  chains,
  projectId,
  wagmiConfig, // pass wagmiConfig correctly here
  metadata,
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4",
    "15c8b91ade1a4e58f3ce4e7a0dd7f42b47db0c8df7e0d84f63eb39bcb96c4e0f"
  ]
});

// Render the app
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
);


// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App1";
// import "./index.css";

// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
// import { WagmiConfig } from "wagmi";
// import { arbitrum, mainnet, zkSyncTestnet, avalanche, bsc, polygon } from "wagmi/chains";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// // Projenizin ana dosyasına ekleyin (örneğin, main.ts veya index.ts)


// // QueryClient oluşturuluyor
// const queryClient = new QueryClient();

// // WalletConnect'ten alınan projectId
// const projectId = "9205d575da21f29d8e41a0abaaba6f0d";

// // Desteklenen zincirler
// const chains = [mainnet, arbitrum, zkSyncTestnet, avalanche, bsc, polygon];

// // wagmiConfig oluşturuluyor
// const wagmiConfig = defaultWagmiConfig({
//   projectId,
//   chains,
//   metadata: {
//     name: "PredatorAiBot",
//     description: "Trading Ai Signal Bot",
//     url: "https://www.predatoraibot.com", // Domain adresinizle eşleşmeli
//     icons: ["https://www.predatoraibot.com/vite.svg"], // Uygulama ikonu
//   },
// });

// // Web3Modal oluşturuluyor
// createWeb3Modal({
//   chains,
//   projectId,
//   wagmiConfig,


// });

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <WagmiConfig config={wagmiConfig}>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </WagmiConfig>
//   </React.StrictMode>
// );
