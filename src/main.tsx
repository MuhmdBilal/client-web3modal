import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App1";
import "./index.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { bscTestnet } from "wagmi/chains"; // Import only bscTestnet
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// QueryClient oluşturuluyor
const queryClient = new QueryClient();

// WalletConnect'ten alınan projectId
const projectId = "9205d575da21f29d8e41a0abaaba6f0d";

// Desteklenen zincirler (Only BSC Testnet now)
const chains = [bscTestnet];
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// wagmiConfig oluşturuluyor
const wagmiConfig = defaultWagmiConfig({
  projectId,
  chains,
  // metadata: {
  //   name: "PredatorAiBot",
  //   description: "Trading Ai Signal Bot",
  //   url: "https://web3modal.com", // Domain adresinizle eşleşmeli
  //   icons: ["https://www.predatoraibot.com/vite.svg"], // Uygulama ikonu
  // },
});

createWeb3Modal({
  chains,
  projectId,
  wagmiConfig: wagmiConfig,
  metadata,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
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
