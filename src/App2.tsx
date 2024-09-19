import Web3 from 'web3';
import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import './App.css';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import VideoNews from './components/VideoNews';
import BinanceNews from './components/BinanceNews';
import About from './components/About';
import FearGreedIndex from './components/FearGreedIndex';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './components/About.css'; // CSS dosyasını dahil ediyoruz
import './components/BinanceNews.css'; // CSS dosyasını dahil ediyoruz
import './components/Contact.css';
import './components/FearGreedIndex.css';
import './components/Footer.css';
import './components/Navbar.css';
import './components/PolicyModal.css';
import './components/Preloader.css';
import './components/VideoNews.css';



// Ankr RPC URL'si ve API anahtarı
const ANKR_RPC_URL = 'https://rpc.ankr.com/avalanche';
const ANKR_API_KEY = '0f6738e20578cde89ec50ec225f14195f19306f60b716d97d29b22bd3d6f02d1';

// Web3 instance'ını Ankr RPC URL'si ile başlatıyoruz
const web3 = new Web3(new Web3.providers.HttpProvider(`${ANKR_RPC_URL}/${ANKR_API_KEY}`));



// Sözleşme bilgileri
// Sözleşme bilgileri
const contractAddress = '0x27ad61e183A52Dc205EC8a249f3ea696095f14C0';
const contractABI =  [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "additionalTime",
				"type": "uint256"
			}
		],
		"name": "extendSubscription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newDuration",
				"type": "uint256"
			}
		],
		"name": "setSubscriptionDuration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newFeeUSD",
				"type": "uint256"
			}
		],
		"name": "setSubscriptionFeeUSD",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subscribe",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_priceFeed",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endTime",
				"type": "uint256"
			}
		],
		"name": "Subscribed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newEndTime",
				"type": "uint256"
			}
		],
		"name": "SubscriptionExtended",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newFeeUSD",
				"type": "uint256"
			}
		],
		"name": "SubscriptionFeeChanged",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getLatestAVAXPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSubscriptionFeeInAVAX",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "isSubscribed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "subscribers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subscriptionDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "subscriptionEndTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "subscriptionFeeUSD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]




// Web3 ve sözleşme instance'larını başlatıyoruz
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

function App() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [walletAddress, setWalletAddress] = useState<string>(''); // Cüzdan adresi
  const [subscriptionFee, setSubscriptionFee] = useState<string>('Fetching fee...');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);


const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const walletAddress = Web3.utils.toChecksumAddress(accounts[0]);
        console.log("Cüzdan bağlandı:", walletAddress);
        return walletAddress;
      } else {
        console.error('Cüzdan bağlanmadı.');
      }
    } catch (error) {
      console.error("Cüzdan bağlanırken hata:", error);
    }
  } else {
    alert('MetaMask gibi bir Web3 sağlayıcısı bulunamadı. Lütfen cüzdan kurun.');
  }
};

const switchToAvalanche = async () => {
  const avalancheChainId = '0xa86a'; // Avalanche ana ağ zincir kimliği (43114)
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: avalancheChainId }],
    });
    console.log('Avalanche ağına geçildi.');
  } catch (error) {
    console.error('Ağa geçilirken hata oluştu:', error);
    alert('Lütfen doğru ağa geçin.');
  }
};

const getProvider = () => {
  const provider = window.ethereum;
  if (!provider) {
    console.error("Web3 sağlayıcısı bulunamadı.");
    alert("Lütfen MetaMask veya başka bir Web3 cüzdan sağlayıcısı kurun.");
    return null;
  }
  return provider;
};

const initializeWeb3WithProvider = async () => {
  const provider = getProvider();
  if (provider) {
    const web3 = new Web3(provider);
    return web3;
  }
  return null;
};

  // Cüzdan adresi alındığında kontrol ve abonelik işlemleri
  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts)
        if (accounts.length > 0) {
          const checksumAddress = Web3.utils.toChecksumAddress(accounts[0]);
          setWalletAddress(checksumAddress);
        }
      } catch (error) {
        console.error("Cüzdan adresi alınırken hata:", error);
      }
    };
    initializeWeb3();
  }, []);

  useEffect(() => {
      console.log(contractInstance)
      console.log(walletAddress)
    if (walletAddress && contractInstance) {
      // Hem cüzdan adresi hem de sözleşme instance'ı varsa abonelik durumu kontrol ediliyor
      checkSubscription();
      updateSubscriptionFee();
    }
  }, [walletAddress, contractInstance]);

  // Abonelik ücretini güncelleme fonksiyonu
  const updateSubscriptionFee = async () => {
    try {
      setSubscriptionFee('Fetching fee...');
      const subscriptionFeeInAVAX = await contractInstance.methods.getSubscriptionFeeInAVAX().call();
      const avaxPriceResponse = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=AVAXUSDT');
      const avaxPriceData = await avaxPriceResponse.json();
      const avaxPriceInUSD = parseFloat(avaxPriceData.price).toFixed(2);

      const subscriptionFeeInUSD = (parseFloat(Web3.utils.fromWei(subscriptionFeeInAVAX, 'ether')) * parseFloat(avaxPriceInUSD)).toFixed(2);
      setSubscriptionFee(`${parseFloat(Web3.utils.fromWei(subscriptionFeeInAVAX, 'ether')).toFixed(2)} AVAX (~$${subscriptionFeeInUSD})`);
    } catch (error) {
      console.error('Abonelik ücreti alınırken hata:', error);
      setSubscriptionFee('Error fetching subscription fee');
    }
  };

  // Abonelik kontrol fonksiyonu
  const checkSubscription = async () => {
    try {
      if (!walletAddress) return;
      const isSubscribedResult = await contractInstance.methods.isSubscribed(walletAddress).call();
      setIsSubscribed(isSubscribedResult);
    } catch (error) {
      console.error('Abonelik kontrol edilirken hata:', error);
      throw error;
    }
  };

  // Cüzdan ile abonelik fonksiyonu
  const handleSubscribe = async () => {
  const walletAddress = await connectWallet();
  if (!walletAddress) {
    alert('Cüzdan bağlanmadı!');
    return;
  }

  const web3 = await initializeWeb3WithProvider();
  if (!web3) {
    alert('Web3 başlatılamadı.');
    return;
  }

  try {
    const subscriptionFeeInAVAX = await contractInstance.methods.getSubscriptionFeeInAVAX().call();
    const balance = await web3.eth.getBalance(walletAddress);

    if (parseFloat(Web3.utils.fromWei(balance, 'ether')) < parseFloat(Web3.utils.fromWei(subscriptionFeeInAVAX, 'ether'))) {
      alert('Yeterli AVAX yok.');
      return;
    }

    const gasEstimate = await contractInstance.methods.subscribe().estimateGas({
      from: walletAddress,
      value: subscriptionFeeInAVAX,
    });

    await contractInstance.methods.subscribe().send({
      from: walletAddress,
      value: subscriptionFeeInAVAX,
      gas: gasEstimate,
    });

    console.log('Abonelik işlemi başarıyla tamamlandı.');
  } catch (error) {
    console.error('Abonelik işlemi sırasında hata oluştu:', error);
    alert('Abonelik işlemi başarısız oldu.');
  }
};

  // Kullanıcı cüzdanını bağladığında abone olup olmadığını kontrol eden ve ilgili işlemleri yapan ana yapı
  return (
    <div className="App">
      {isLoading ? <Preloader /> : <Navbar />}
      <VideoNews />

      {isConnected && (
        <div className="card">
          <div className="card-header">Wallet Selection</div>
          <div className="card-body">
            <div>
              Cüzdan: {walletAddress}
            </div>
          </div>
          {!isSubscribed ? (
            <div className="card-footer">
              <div>Subscription Fee: {subscriptionFee}</div>
              <button onClick={handleSubscribe} disabled={isLoading}>
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          ) : (
            <div className="card-footer">
              <button onClick={() => alert('Abone oldunuz!')}>Login</button>
            </div>
          )}
        </div>
      )}

      {!isConnected && (
        <div className="card">
          <div className="card-header">Wallet Not Connected</div>
          <div className="card-body">
            <button onClick={() => open({ view: 'Networks' })}>Connect Wallet</button>
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
