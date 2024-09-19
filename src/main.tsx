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
