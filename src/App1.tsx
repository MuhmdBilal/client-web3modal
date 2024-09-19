declare global {
  interface Window {
    web3?: any; // TypeScript uyumluluğu için web3'ü ekliyoruz
  }
}

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
} from "wagmi";
import "./App.css";

import "./styles/globals.css";
import Web3 from "web3";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import VideoNews from "./components/VideoNews";
import BinanceNews from "./components/BinanceNews";
import About from "./components/About";
import FearGreedIndex from "./components/FearGreedIndex";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
//import ConnectWalletConnection from './components/ConnectWallet'; // EnterAppButton bileşenini içe aktarın
import "./components/About.css"; // CSS dosyasını dahil ediyoruz
import "./components/BinanceNews.css"; // CSS dosyasını dahil ediyoruz
import "./components/Contact.css";
import "./components/FearGreedIndex.css";
import "./components/Footer.css";
import "./components/Navbar.css";
import "./components/PolicyModal.css";
import "./components/Preloader.css";
import "./components/VideoNews.css";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// Sözleşme ;
// const contractAddress = "0x27ad61e183A52Dc205EC8a249f3ea696095f14C0";
// const contractABI = [
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "user",
//         type: "address",
//       },
//       {
//         internalType: "uint256",
//         name: "additionalTime",
//         type: "uint256",
//       },
//     ],
//     name: "extendSubscription",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "newDuration",
//         type: "uint256",
//       },
//     ],
//     name: "setSubscriptionDuration",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "newFeeUSD",
//         type: "uint256",
//       },
//     ],
//     name: "setSubscriptionFeeUSD",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "subscribe",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "_priceFeed",
//         type: "address",
//       },
//     ],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "user",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "endTime",
//         type: "uint256",
//       },
//     ],
//     name: "Subscribed",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "user",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "newEndTime",
//         type: "uint256",
//       },
//     ],
//     name: "SubscriptionExtended",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "newFeeUSD",
//         type: "uint256",
//       },
//     ],
//     name: "SubscriptionFeeChanged",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "withdraw",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "owner",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "Withdrawn",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "getLatestAVAXPrice",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getSubscriptionFeeInAVAX",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "user",
//         type: "address",
//       },
//     ],
//     name: "isSubscribed",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "subscribers",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "subscriptionDuration",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "subscriptionEndTime",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "subscriptionFeeUSD",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
// ];
const contractAddress = "0x9337Eb4c8B7Ecac68d7243D2604f83dE8DbA740E";
const contractABI = [
  {
    inputs: [{ internalType: "address", name: "_priceFeed", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "Subscribed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "newEndTime",
        type: "uint256",
      },
    ],
    name: "SubscriptionExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFeeUSD",
        type: "uint256",
      },
    ],
    name: "SubscriptionFeeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "additionalTime", type: "uint256" },
    ],
    name: "extendSubscription",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLatestAVAXPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubscriptionFeeInAVAX",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "isSubscribed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newDuration", type: "uint256" }],
    name: "setSubscriptionDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "newFeeUSD", type: "uint256" }],
    name: "setSubscriptionFeeUSD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscribe",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscribers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionDuration",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "subscriptionEndTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "subscriptionFeeUSD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }
function App() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string>(""); // Cüzdan adresini EIP-55 formatında saklayacağız
  const [subscriptionFee, setSubscriptionFee] =
    useState<string>("Fetching fee...");
  const [status, setStatus] = useState("Not Connected");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [walletType, setWalletType] = useState<string>(""); // Kullanıcının seçtiği cüzdan tipini saklar
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      
      if (window.ethereum && window.ethereum.isMetaMask) {
        const accounts = await (window.ethereum as any).request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
          setWalletAddress(checksumAddress); // Cüzdan adresini EIP-55 formatında kaydediyoruz
        }
      }
    };
    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      (window.ethereum as any).on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
          setWalletAddress(checksumAddress); // Hesap değiştiğinde adresi EIP-55 formatında güncelle
        } else {
          setWalletAddress(""); // Hesap yoksa adresi boş yap
        }
      });

      (window.ethereum as any).on("disconnect", () => {
        setWalletAddress("");
      });
    }
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log("Cüzdan Bağlı:", walletAddress);
    } else {
      console.log("Cüzdan Bağlı Değil");
    }
  }, [walletAddress]);

  useEffect(() => {
    if (walletAddress && contract) {
      // Hem cüzdan adresi hem de kontrat mevcutsa bu işlemleri yap
      checkSubscription();
      updateSubscriptionFee(contract);
    }
  }, [walletAddress, contract]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cüzdan tipi seçimi
  const handleWalletTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedWalletType = event.target.value;
    setWalletType(selectedWalletType);

    if (selectedWalletType) {
      const result = await initializeWeb3(selectedWalletType);
      if (result) {
        await checkSubscription();
        await updateSubscriptionFee(result.contractInstance);
      }
    }
  };

  const initializeWeb3 = async (walletType: string) => {
    let provider;

    if (!walletType) {
      console.error("Wallet type is not defined");
      return null;
    }

    try {
      if (walletType === "MetaMask") {
        // window.ethereum.providers varsa, MetaMask'ın olup olmadığını kontrol ediyoruz

        const ethereum = window.ethereum as any;
        if (Array.isArray(ethereum.providers)) {
          // window.ethereum.providers bir dizi ise MetaMask sağlayıcısını buluyoruz
          provider = ethereum.providers.find((prov: any) => prov.isMetaMask);
        } else {
          provider = ethereum;
        }

        if (!provider || !provider.isMetaMask) {
          console.error(
            "MetaMask not found or another wallet extension is active"
          );
          alert(
            "MetaMask is not installed or active. Please install MetaMask or switch to MetaMask if another wallet is active."
          );
          return null;
        }

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          console.error("No accounts found");
          return null;
        }

        const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
        setWalletAddress(checksumAddress); // Cüzdan adresini EIP-55 formatında kaydediyoruz
      } else if (walletType === "TrustWallet") {
        provider = window.ethereum;
        if (!provider || !(provider as any).isTrust) {
          console.error("Trust Wallet not found");
          return null;
        }

        const accounts = await (provider as any).request({
          method: "eth_requestAcontractccounts",
        });
        if (accounts.length === 0) {
          console.error("No accounts found");
          return null;
        }

        const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
        setWalletAddress(checksumAddress); // Cüzdan adresini EIP-55 formatında kaydediyoruz
      } else if (walletType === "Others") {
        // window.ethereum.providers varsa, MetaMask'ın olup olmadığını kontrol ediyoruz

        const ethereum = window.ethereum as any;
        if (Array.isArray(ethereum.providers)) {
          // window.ethereum.providers bir dizi ise MetaMask sağlayıcısını buluyoruz
          provider = ethereum.providers.find((prov: any) => prov.isMetaMask);
        } else {
          provider = ethereum;
        }

        if (!provider || !provider.isMetaMask) {
          console.error(
            "MetaMask not found or another wallet extension is active"
          );
          alert(
            "MetaMask is not installed or active. Please install MetaMask or switch to MetaMask if another wallet is active."
          );
          return null;
        }

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length === 0) {
          console.error("No accounts found");
          return null;
        }

        const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
        setWalletAddress(checksumAddress); // Cüzdan adresini EIP-55 formatında kaydediyoruz
      } else {
        console.error("Unsupported wallet type");
        return null;
      }

      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      const contractInstance = new web3Instance.eth.Contract(
        contractABI,
        contractAddress
      );
      setContract(contractInstance);

      console.log("Web3 initialized with wallet type:", walletType);
      return { web3Instance, contractInstance };
    } catch (error) {
      console.error("Web3 initialization error:", error);
      return null;
    }
  };

  const updateSubscriptionFee = async (contractInstance: any) => {
    try {
      setSubscriptionFee("Fetching fee...");
      if (!contractInstance) return;

      const subscriptionFeeInAVAX = await contractInstance.methods
        .getSubscriptionFeeInAVAX()
        .call();
      const avaxPriceResponse = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=AVAXUSDT"
      );
      const avaxPriceData = await avaxPriceResponse.json();
      const avaxPriceInUSD = parseFloat(avaxPriceData.price).toFixed(2);

      const subscriptionFeeInUSD = (
        parseFloat(Web3.utils.fromWei(subscriptionFeeInAVAX, "ether")) *
        parseFloat(avaxPriceInUSD)
      ).toFixed(2);
      setSubscriptionFee(
        `${parseFloat(
          Web3.utils.fromWei(subscriptionFeeInAVAX, "ether")
        ).toFixed(2)} AVAX (~$${subscriptionFeeInUSD})`
      );
    } catch (error) {
      console.error("Error fetching subscription fee:", error);
      setSubscriptionFee("Error fetching subscription fee");
    }
  };

  const checkSubscription = async () => {
    try {
      if (!walletAddress || !contract) return;
      const response = await fetch(
        `https://predatoraibot.com:5000/check_subscription?address=${walletAddress}`
      );
      const result = await response.json();
      setIsSubscribed(result.is_subscribed);
    } catch (error) {
      console.error("Error checking subscription:", error);
      throw error;
    }
  };

  const handleSubscribe = async () => {
    if (!isConnected) {
      try {
        await connect({ connector: connectors[0] });
      } catch (error) {
        if (walletType === "MetaMask") {
          window.location.href =
            "https://metamask.app.link/dapp/predatoraibot.com";
        } else if (walletType === "TrustWallet") {
          window.location.href =
            "https://link.trustwallet.com/open_url?coin_id=60&url=https://predatoraibot.com";
        } else {
          // Diğer cüzdanlar için farklı yönlendirmeler yapılabilir
          alert("Please open the dApp in your wallet browser.");
        }

        console.error("Wallet connection failed:", error);
        alert("Failed to connect wallet. Please try again.");
        return;
      }
    }

    if (walletAddress && contract) {
      try {
        setIsLoading(true);
        console.log("22222222222", contract.methods);
        const subscriptionFeeInAVAX = await contract.methods
          .getSubscriptionFeeInAVAX()
          .call();
        console.log("subscriptionFeeInAVAX", subscriptionFeeInAVAX);
        const balance = await web3.eth.getBalance(walletAddress);
        console.log("balance", balance);
        if (
          parseFloat(Web3.utils.fromWei(balance, "ether")) <
          parseFloat(Web3.utils.fromWei(subscriptionFeeInAVAX, "ether"))
        ) {
          alert("Not enough AVAX.");
          setIsLoading(false);
          return;
        }
        const gasEstimate = await contract.methods.subscribe().estimateGas({
          from: walletAddress,
          value: subscriptionFeeInAVAX,
        });
        console.log("balance", gasEstimate);

        await contract.methods.subscribe().send({
          from: walletAddress,
          to: "0x3753C4B8cBfa8D0DF390D7B0d2dE5AbEDC9da63f",
          value: subscriptionFeeInAVAX,
          gas: gasEstimate,
        });

        await fetch("https://predatoraibot.com:5000/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: walletAddress }),
        });

        setIsSubscribed(true);
      } catch (error) {
        console.error("Subscription failed:", error);
        alert(
          "Subscription process failed. Redirecting to your wallet dApp browser."
        );
        if (walletType === "MetaMask") {
          window.location.href =
            "https://metamask.app.link/dapp/predatoraibot.com";
        } else if (walletType === "TrustWallet") {
          window.location.href =
            "https://link.trustwallet.com/open_url?coin_id=60&url=https://predatoraibot.com";
        } else {
          // Diğer cüzdanlar için farklı yönlendirmeler yapılabilir
          alert("Please open the dApp in your wallet browser.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    if (isConnected && address) {
      window.location.href = `/app.html?address=${address}`;
    } else {
      alert("Please connect your wallet.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="App">
      {isLoading ? <Preloader /> : <Navbar />}{" "}
      {/* Preloader yüklenme durumu true iken gösterilir */}
      <VideoNews />
      {isConnected && (
        <div className="card">
          <div className="card-header">Wallet Selection</div>
          <div className="card-body">
            <select
              id="walletType"
              value={walletType}
              onChange={handleWalletTypeChange}
              className="wallet-select"
            >
              <option className="wallet-option" value="">
                Select a wallet
              </option>
              <option className="wallet-option" value="MetaMask">
                MetaMask
              </option>
              <option className="wallet-option" value="TrustWallet">
                Trust Wallet
              </option>
              <option className="wallet-option" value="Coinbase">
                Others
              </option>
            </select>
          </div>
          {isConnected && (
            <div className="card-body">
              <w3m-button />
            </div>
          )}
          {!isSubscribed ? (
            <div className="card-footer">
              <div>Subscription Fee: {subscriptionFee}</div>
              <button onClick={handleSubscribe} disabled={isLoading}>
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          ) : (
            <div className="card-footer">
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
      )}
      {!isConnected && (
        <div className="card">
          <div className="card-header">Wallet Not Connected</div>
          <div className="card-body">
            <button onClick={() => open({ view: "Networks" })}>
              Connect Wallet
            </button>
          </div>
        </div>
      )}
      <BinanceNews />
      <About />
      <FearGreedIndex />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
