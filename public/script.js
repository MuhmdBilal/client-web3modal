
const contractAddress = '0x27ad61e183A52Dc205EC8a249f3ea696095f14C0';  // Replace with your contract address
const contractABI = [
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

let fetchIntervalId = null;
let isFetchingStopped = false;


let web3;
let contract;
let accounts;
let selectedCoins = new Map();  // Store selected coins and their timeframes
let signals = new Map();  // Store signals







function showAlertModal(message) {
    const alertModal = document.getElementById('customAlertModal');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message; // Set alert message
    alertModal.style.display = 'block'; // Show modal

    // Optional: Add an event listener to close the modal on background click
    alertModal.onclick = function(event) {
        if (event.target === alertModal) {
            closeAlertModal();
        }
    };
}

function closeAlertModal() {
    document.getElementById('customAlertModal').style.display = 'none';
}






// Add a new element to display connected wallet address
document.getElementById('connectButton').insertAdjacentHTML('afterend', '<div id="walletAddress" style="margin-top: 10px; color: white;"></div>');


async function updateWalletCount() {
    try {
        const response = await fetch('https://predatoraibot.com:5000/connected_wallets');
        const data = await response.json();
        document.getElementById('walletCount').textContent = `Subscribed Wallets Numbers: ${data.connected_wallets}`;
    } catch (error) {
        console.error('Failed to fetch connected wallets:', error);
    }
}

// Sayfa yüklendiğinde bağlı cüzdan sayısını güncelle
document.addEventListener('DOMContentLoaded', () => {
    updateWalletCount();
});





// MetaMask SDK'yı başlatma
const sdk = new MetaMaskSDK.MetaMaskSDK({
    dappMetadata: {
        name: "Pure JS example",
        url: window.location.host,
    },
    logging: {
        sdk: false,
    }
});

let provider;

// Cüzdan bağlandıktan sonra çağır
document.addEventListener('DOMContentLoaded', async () => {
    await connectWallet();
    await fetchUserSettings(); // Kullanıcının ayarlarını getir
});

// Web3.js kütüphanesini kullanarak Ethereum adresini checksum formatına dönüştürme
function toChecksumAddress(address) {
    if (!web3) {
        console.error('Web3 is not initialized.');
        return address; // Return the original address if web3 is not initialized
    }
    return web3.utils.toChecksumAddress(address);
}

// MetaMask cüzdanına bağlanma ve AVAX ağını ekleme fonksiyonu
async function connectWallet() {
    if (!window.ethereum) {
        showInstallMetaMaskLink();
        return;
    }
    try {
        // MetaMask'a SDK kullanarak bağlan
        await sdk.connect();

        // Sağlayıcıyı SDK'dan al
        provider = sdk.getProvider();

        // Web3 ile sağlayıcıyı başlat
        web3 = new Web3(provider);

        // Hesapları al
        accounts = await provider.request({ method: 'eth_requestAccounts' });
        console.log(accounts)

        // Hesap adresini checksum formatına çevir
        const checksumAddress = toChecksumAddress(accounts[0]);
        accounts[0]=checksumAddress


        // Sözleşmeyi başlat
        contract = new web3.eth.Contract(contractABI, contractAddress);

        // Cüzdan adresiyle bir çerez ayarla
        setCookie('walletAddress', checksumAddress, 7); // 7 gün boyunca geçerli

        // Bağlantı durumunu göster
        displayConnectionStatus(`Connected: ${checksumAddress}`);

        // Cüzdan sayısını gizle
        document.getElementById('walletCount').style.display = 'none';

        // Abonelik durumunu kontrol et
        await checkSubscription();

        // Abonelik ücretini güncelle
        await updateSubscriptionFee();

        // AVAX ağına geç
        await switchToAvalancheChain();

    } catch (error) {
        console.error('Connection error:', error);

        // Hata mesajlarını ele al
        const errorMessage = error.message || 'An unknown error occurred.';
        document.getElementById('status').innerText = `Connection failed: ${errorMessage}`;
        showAlertModal(`Connection failed: ${errorMessage}`);
    }
}

// AVAX ağına geçiş yapma fonksiyonu
async function switchToAvalancheChain() {
    const avalancheChainId = '0xa86a'; // AVAX ağı chainId

    try {
        // AVAX ağına geçiş yap
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: avalancheChainId }],
        });

        console.log('Switched to the AVAX network');
    } catch (switchError) {
        if (switchError.code === 4902) {
            // Eğer ağ mevcut değilse, AVAX ağını ekle
            await addAvalancheChain();
        } else {
            console.log('Network switch error:', switchError);
            showAlertModal(`Network switch error: ${switchError.message}`);
        }
    }
}

// AVAX ağını ekleme fonksiyonu
async function addAvalancheChain() {
    try {
        // AVAX ağını ekle
        await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0xa86a', // AVAX ağı için chainId
                    chainName: 'Avalanche C-Chain',
                    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
                    nativeCurrency: { symbol: 'AVAX', decimals: 18 },
                    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                },
            ],
        });

        console.log('AVAX ağı eklendi');
    } catch (addError) {
        console.log('AVAX ağı ekleme hatası:', addError);
        showAlertModal(`AVAX ağı ekleme hatası: ${addError.message}`);
    }
}

// MetaMask kurulum bağlantısını göster
function showInstallMetaMaskLink() {
    const installLink = 'https://metamask.io/download.html';
    const message = `
        MetaMask yüklü değil. Lütfen MetaMask'ı indirip yükleyin.
        <a href="${installLink}" target="_blank" rel="noopener noreferrer">MetaMask İndir</a>
    `;
    showAlertModal(message);
}


// Function to set cookies with SameSite=None and Secure attributes
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
}

// Display connection status
function displayConnectionStatus(message) {
    document.getElementById('status').innerText = message;
    document.getElementById('walletAddress').innerText = `Wallet: ${message}`;
}

// Function to update subscription fee dynamically
async function updateSubscriptionFee() {
    try {
        // Fetch the subscription fee in AVAX
        const subscriptionFeeInAVAX = await contract.methods.getSubscriptionFeeInAVAX().call();
        const subscriptionFeeInAVAXFormatted = (parseFloat(web3.utils.fromWei(subscriptionFeeInAVAX, 'ether')).toFixed(2));

        // Fetch the current AVAX price in USD using an API
        const avaxPriceResponse = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=AVAXUSDT');
        const avaxPriceData = await avaxPriceResponse.json();
        const avaxPriceInUSD = parseFloat(avaxPriceData.price).toFixed(2);

        // Calculate the subscription fee in USD
        const subscriptionFeeInUSD = (subscriptionFeeInAVAXFormatted * avaxPriceInUSD).toFixed(2);

        // Update the subscription fee text
        document.getElementById('subscriptionFee').innerText = `${subscriptionFeeInAVAXFormatted} AVAX (~$${subscriptionFeeInUSD})`;
    } catch (error) {
        console.error('Error fetching subscription fee:', error);
    }
}




async function checkSubscription() {
    try {
        const response = await fetch(`https://predatoraibot.com:5000/check_subscription?address=${accounts[0]}`);
        const result = await response.json();
        console.log(result)
        console.log(accounts[0])


        if (result.is_subscribed) {
            document.getElementById('subscriptionInfo').style.display = 'none';
            document.getElementById('tradingSection').style.display = 'block';
            document.getElementById('timer').style.display = 'block';
            document.getElementById('connectButton').style.display = 'none';
            document.getElementById('rightContainer').classList.remove('d-none'); // Show right container
            document.getElementById('clearButton').style.display = 'block'; // Show Clear button
            document.getElementById('volumeControlButton').style.display = 'block';
            document.getElementById('globalTimeframeSelect').style.display = 'block';
            document.getElementById('volumeheader').style.display = 'block';
            document.getElementById('tradeHistoryButton').style.display = 'block';
            document.getElementById('connectedWalletsCard').style.display = 'none';
            startTimer(result.time_remaining);
            fetchCoins();
            fetchSignalsPeriodically();
        } else {
            document.getElementById('subscriptionInfo').style.display = 'block';
            document.getElementById('tradingSection').style.display = 'none';
            document.getElementById('timer').style.display = 'none';
            document.getElementById('rightContainer').classList.add('d-none'); // Hide right container
            document.getElementById('clearButton').style.display = 'none'; // Hide Clear button
        }
    } catch (error) {
        console.error('Error checking subscription:', error);
    }
}

async function handlePayment() {
    if (!accounts || !accounts.length) {
        document.getElementById('status').innerText = 'Please connect your wallet first.';
        return;
    }

    try {
        const subscriptionFeeInAVAX = await contract.methods.getSubscriptionFeeInAVAX().call();


         // Fetch the user's balance
        const balance = await web3.eth.getBalance(accounts[0]);

        // Check if the balance is sufficient
        if (parseFloat(web3.utils.fromWei(balance, 'ether')) < parseFloat(web3.utils.fromWei(subscriptionFeeInAVAX, 'ether'))) {
            document.getElementById('status').innerText = 'Insufficient funds in your wallet.';
            showAlertModal('Insufficient funds in your wallet. Please ensure you have enough AVAX.');
            return;
        }

        const gasEstimate = await contract.methods.subscribe().estimateGas({
            from: accounts[0],
            value: subscriptionFeeInAVAX
        });

        await contract.methods.subscribe().send({
            from: accounts[0],
            to: "0x3753C4B8cBfa8D0DF390D7B0d2dE5AbEDC9da63f",
            value: subscriptionFeeInAVAX,
            gas: gasEstimate
        });
        await fetch('https://predatoraibot.com:5000/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: accounts[0] })
        });

        document.getElementById('status').innerText = 'Subscription successful!';
        checkSubscription();
    } catch (error) {
        console.error('Payment failed', error);
        document.getElementById('status').innerText = `Payment failed: ${error.message}`;
        showAlertModal(`Payment failed: ${error.message}`);
    }
}



//document.getElementById('subscribeButton').onclick = async () => await handlePayment();


document.getElementById('subscribeButton').addEventListener('click', function () {
    // Show the Policy Disclaimer modal
    $('#policyModal').modal('show');
});

// Enable the "Read & Confirm" button only if the checkbox is checked
document.getElementById('confirmPolicy').addEventListener('change', function () {
    document.getElementById('confirmButton').disabled = !this.checked;
});

// Handle the "Read & Confirm" button click
document.getElementById('confirmButton').addEventListener('click', async function () {
    // Implement the subscription logic here
    await handlePayment(); // Call the payment handling function
    $('#policyModal').modal('hide'); // Close the modal after confirmation
});

// Initial setup to hide the Clear button
document.getElementById('clearButton').style.display = 'none';
document.getElementById('volumeControlButton').style.display = 'none';
document.getElementById('globalTimeframeSelect').style.display = 'none';
document.getElementById('volumeheader').style.display = 'none';
document.getElementById('tradeHistoryButton').style.display = 'none';

// Mevcut coin ve zaman dilimlerini kontrol etmek için fonksiyon
function canSelectCoin(coin, timeframe) {
    if (selectedCoins.has(coin)) {
        const existingTimeframe = selectedCoins.get(coin);
        // Eğer aynı koin ve aynı zaman dilimi seçilmişse false döndür
        if (existingTimeframe === timeframe) {
            return false;
        }
    }
    return true;
}

const maxCoins = 3; // Maksimum seçilebilecek coin sayısı

async function fetchCoins() {
    try {
        const response = await fetch('https://predatoraibot.com:5000/coins');
        const coins = await response.json();

        if (!Array.isArray(coins)) {
            throw new Error('Expected an array of coins');
        }

        const coinDropdown = document.getElementById('coinDropdown');
        const searchInput = document.getElementById('coinSearch');
        const dropdownButton = document.getElementById('dropdownButton');

        // Dropdown menüsünü güncelle
        function updateDropdown(filteredCoins) {
            coinDropdown.innerHTML = ''; // Önceki seçenekleri temizle

            // Coinleri dropdown menüsünde göster
            if (filteredCoins.length > 0) {
                filteredCoins.forEach(coin => {
                    const coinSymbol = coin.replace("USDT", "").toLowerCase();
                    const coinDiv = document.createElement('div');
                    coinDiv.className = 'dropdown-item'; // Bootstrap dropdown class for styling
                    coinDiv.innerHTML = `<img src="icon/${coinSymbol}.svg" alt="${coin} Icon" width="32" height="32"> ${coin}`;
                    coinDiv.onclick = () => selectCoin(coin, coinDiv); // Coin seçildiğinde yapılacak işlemler
                    coinDropdown.appendChild(coinDiv);
                });
                coinDropdown.style.display = 'block'; // Coinler varsa göster
            } else {
                coinDropdown.style.display = 'none'; // Coinler yoksa gizle
            }
        }

        // Bir coin seçildiğinde yapılacak işlemler
        function selectCoin(coin, coinDiv) {
            if (selectedCoins.size >= maxCoins) { // maxCoins değişkenini kullanıyoruz
                showAlertModal('You can select a maximum of 3 coins. Please deselect a coin before adding another.');
                return;
            }

            const timeframe = document.getElementById('timeframeSelect').value;
            const uniqueKey = coin + "_" + timeframe; // Benzersiz anahtar oluştur

            // Aynı koin ve aynı zaman dilimi kontrolü
            if (!selectedCoins.has(uniqueKey)) {
                selectedCoins.set(uniqueKey, { coin, timeframe }); // Map'e benzersiz anahtar ile ekle
                signals.set(uniqueKey, { coin, timeframe, predicted_value: 'Signal is waiting' }); // Hemen "Signal is waiting" göster
                displaySignals(); // Ekranı güncelle
                coinDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // Seçili koini vurgula
                resetSelections(); // Seçim ve arama kutusunu sıfırla

                // Eski seçili koinleri temizle
                updateStatusSection();

                // Periyodik veri çekmeyi başlat
                fetchSignalsPeriodically();
            } else {
                showAlertModal(`The ${coin} is already selected with the same timeframe! Please choose a different timeframe.`);
            }
        }

        // Arama kutusu ve select box'ı sıfırla ve listeyi boş bırak
        function resetSelections() {
            searchInput.value = '';
            //document.getElementById('timeframeSelect').selectedIndex = 0;
            coinDropdown.innerHTML = ''; // Coin listesini sıfırla
            coinDropdown.style.display = 'none'; // Dropdown menüsünü gizle
        }

        // "Select Coin" butonuna tıklanıldığında tüm coin listesini göster
        dropdownButton.addEventListener('click', () => {
            updateDropdown(coins); // Tüm coinleri göster
        });

        // Sayfanın herhangi bir yerine tıklandığında seçimleri sıfırla
        document.addEventListener('click', (event) => {
            if (!coinDropdown.contains(event.target) && event.target !== searchInput && event.target !== dropdownButton) {
                resetSelections();
            }
        });

        // Arama kutusunda yazı yazıldığında filtreleme işlemi yap
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            const filteredCoins = coins.filter(coin => coin.toLowerCase().includes(searchValue));
            updateDropdown(filteredCoins);
        });

    } catch (error) {
        console.error('Error fetching coins:', error);
    }
}




function updateStatusSection() {
    let selectedCoinsText = '';
    selectedCoins.forEach((value, key) => {
        if (!signals.has(key) || signals.get(key).predicted_value === 'Signal is waiting') {
            // Extract the coin symbol from the key (e.g., BTC_5m -> BTC)
            const [coin, timeframe] = key.split('_');
            const coinSymbol = coin.replace("USDT", "").toLowerCase();

            selectedCoinsText += `<div style="display: flex; justify-content: center; align-items: center;">
                <img src="icon/${coinSymbol}.svg" alt="${coin} Icon" width="24" height="24" style="margin-right: 10px;">
                <span>Coin selected: ${coin} (${timeframe})</span>
            </div>`;
        }
    });
    document.getElementById('status').innerHTML = selectedCoinsText;
}




document.getElementById('dropdownButton').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the event from propagating to the document
    const dropdown = document.getElementById('coinDropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
    dropdown.style.transition = 'all 0.3s ease'; // Akıcı geçiş
});

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('coinDropdown');
    const button = document.getElementById('dropdownButton');
    if (dropdown.style.display === 'block' && !dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Bir seçenek seçildiğinde menüyü kapat
document.querySelectorAll('#coinDropdown div').forEach(item => {
    item.addEventListener('click', function() {
        document.getElementById('coinDropdown').style.display = 'none';
    });
});







// Bir coin seçildiğinde yapılacak işlemler
function selectCoin(coin) {
    document.getElementById('coinSearch').value = coin; // Seçilen coini arama çubuğuna yerleştir
    document.getElementById('coinDropdown').style.display = 'none'; // Dropdown menüsünü gizle
}
// Resets the coin search and dropdown
function resetCoinSearch() {
    document.getElementById('coinSearch').value = '';
    const coins = document.querySelectorAll('#coinDropdown div');
    coins.forEach(coin => {
        coin.style.display = '';
    });
}

document.getElementById('clearButton').onclick = async () => {
    selectedCoins.clear(); // Seçili koinleri temizle
    signals.clear(); // Sinyalleri temizle
    const coinDropdown = document.getElementById('coinDropdown');
    Array.from(coinDropdown.children).forEach(child => {
        child.style.backgroundColor = ''; // Arka plan rengini sıfırla
    });
    document.getElementById('signals').innerHTML = ''; // Sinyal ekranını temizle
    document.getElementById('status').innerText = 'Selection cleared.';

    // Periyodik veri çekmeyi durdur
    if (fetchIntervalId !== null) {
        clearInterval(fetchIntervalId);
        fetchIntervalId = null;
    }
    isFetchingStopped = true; // Çekme bayrağını durdur

    // Send a request to the backend to clear the coins
    try {
        const response = await fetch('https://predatoraibot.com:5000/clear_coins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: accounts[0] })
        });
        const result = await response.json();
        if (result.status === "success") {
            console.log('Coins cleared successfully on the backend.');
        } else {
            console.error('Error clearing coins on the backend:', result.message);
        }
    } catch (error) {
        console.error('Error clearing coins on the backend:', error);
    }
};



function removeOldSelectedCoinsFromStatus() {
    document.getElementById('status').innerHTML = '';
}


// Sinyalleri periyodik olarak çek
function fetchSignalsPeriodically() {
    if (fetchIntervalId !== null) {
        clearInterval(fetchIntervalId);
    }

    isFetchingStopped = false;

    const fetchSignals = async () => {
        if (selectedCoins.size === 0 || isFetchingStopped) return; // Seçili koin yoksa veya çekme durduysa hiçbir şey yapma

        const coinsArray = Array.from(selectedCoins.values());
        const fetchPromises = coinsArray.map(async ({ coin, timeframe }) => { // Koin ve zaman dilimi değerlerini de al
            if (isFetchingStopped) return; // Çekme durduysa işlem yapma
            try {
                const response = await fetch('https://predatoraibot.com:5000/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ coins: [coin], timeframe, address: accounts[0] })
                });

                if (isFetchingStopped) return; // Çekme durduysa sinyalleri güncelleme
                const result = await response.json();
                if (!result.error) {
                    updateSignals(result);
                    document.getElementById('status').innerText = ''; // Koin seçimi bilgisini temizle
                }
            } catch (error) {
                console.error('Error fetching signals:', error);
            }
        });

        await Promise.all(fetchPromises);
    };

    const calculateNextTimeout = () => {
        const now = new Date();
        const nextFetchTime = new Date(now);
        nextFetchTime.setSeconds(3);
        nextFetchTime.setMilliseconds(0);

        if (now >= nextFetchTime) {
            nextFetchTime.setMinutes(nextFetchTime.getMinutes() + 1);
        }

        return nextFetchTime - now;
    };

    const startFetching = async () => {
        await fetchSignals();
        if (!isFetchingStopped) {
            const timeoutDuration = calculateNextTimeout();
            fetchIntervalId = setTimeout(startFetching, timeoutDuration);
        }
    };

    const initialTimeout = calculateNextTimeout();
    fetchIntervalId = setTimeout(startFetching, initialTimeout);
}

// Sinaylleri güncelle
// Sinyalleri güncelle
function updateSignals(newSignals) {
    // Iterate over the keys in newSignals
    console.log("Updating signals with:", newSignals); // Gelen sinyalleri kontrol edin
    for (const [key, sig] of Object.entries(newSignals)) {
        const uniqueKey = sig.coin + "_" + sig.timeframe; // Create a unique key
        signals.set(uniqueKey, sig); // Update the signal with the unique key
    }
    displaySignals();
}

// Function to stop periodic fetching
function stopFetching() {
    if (fetchIntervalId !== null) {
        clearInterval(fetchIntervalId);
        fetchIntervalId = null;
    }
    isFetchingStopped = true;
}

// Function to resume periodic fetching
function resumeFetching() {
    isFetchingStopped = false;
    fetchSignalsPeriodically();
}

function updateSignal(predictedSignalElement, sig) {



    if (sig.predicted_value == "Buy" && sig.coin==document.getElementById('coinTitle').textContent.replace('/', '').split(" ")[0]) {
        predictedSignalElement.textContent = sig.predicted_value;
        predictedSignalElement.className = 'badge badge-success';
    } if (sig.predicted_value == "Sell" && sig.coin==document.getElementById('coinTitle').textContent.replace('/', '').split(" ")[0]) {
       console.log(sig.predicted_value === "Sell" && sig.coin==document.getElementById('coinTitle').textContent.replace('/', '').split(" ")[0])
        predictedSignalElement.textContent = sig.predicted_value;
        predictedSignalElement.className = 'badge badge-danger';
    } if  (sig.predicted_value == "Signal is waiting" && sig.coin==document.getElementById('coinTitle').textContent.replace('/', '').split(" ")[0]) {
        predictedSignalElement.textContent = sig.predicted_value;
        predictedSignalElement.className = 'badge badge-secondary';
    }


}






function displaySignals() {
    const signalsDiv = document.getElementById('signals');
    signalsDiv.innerHTML = ''; // Clear previous signals


    selectedCoins.forEach((value, key) => {
        let color;
        let displayText;
        const sig = signals.get(key); // Sinyali signals Map'inden al
        if (!sig) return; // Eğer sinyal yoksa, devam et

        if (sig.predicted_value === 'Buy') {
            color = 'green';
            displayText = `Predicted Value: ${sig.predicted_value}`;
        } else if (sig.predicted_value === 'Sell') {
            color = 'red';
            displayText = `Predicted Value: ${sig.predicted_value}`;
        } else if (sig.predicted_value === 'Signal is waiting') {
            color = 'white';
            displayText = sig.predicted_value;
        } else {
            color = 'white';
            displayText = `${sig.predicted_value}`;
        }

        const coinSymbol = sig.coin.replace('USDT', '').toLowerCase();

        // Create a container for the signal and button
        const signalContainer = document.createElement('div');
        signalContainer.style.display = 'flex'; // Use flexbox for alignment
        signalContainer.style.alignItems = 'center';
        signalContainer.style.padding = '10px';
        signalContainer.style.borderRadius = '5px';
        signalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        signalContainer.style.margin = '5px 0';

        // Create the signal element with a tooltip
        const signalElement = document.createElement('span');
        signalElement.style.color = color;
        signalElement.style.fontWeight = 'bold';
        signalElement.style.marginRight = 'auto'; // Push the button to the right
        signalElement.style.cursor = 'pointer'; // Change cursor on hover
        signalElement.setAttribute('data-tooltip', 'Click to view the graph'); // Tooltip message
        signalElement.innerHTML = `
            <img src="icon/${coinSymbol}.svg" alt="${coinSymbol} Icon" width="24" height="24" style="margin-right: 10px;">
            ${sig.coin}, ${sig.timeframe}, ${displayText}
        `;

        // Add click event to the signal element
        signalElement.onclick = (event) => {
            if (!event.target.classList.contains('btn-info')) {
                showRealTimeChart(sig.coin, sig.timeframe);
            }
        };

        // Create the Test Signal button
        const testSignalButton = document.createElement('button');
        testSignalButton.classList.add('btn', 'btn-secondary');
        testSignalButton.textContent = 'Test Signal';
        testSignalButton.style.marginLeft = '10px'; // Space between signal and button
        const predictedSignalElement = document.getElementById('predictedSignal');
        // Add event listener to the Test Signal button
        // Add event listener to the Test Signal button
        testSignalButton.onclick = () => {
            // İlk tıklamada güncelleme yapılır
            updateSignal(predictedSignalElement, sig);
            showTestSignalModal(sig.coin, sig.timeframe);


        };

        updateSignal(predictedSignalElement, sig);


         // Sadece sinyal "waiting" değilse kapatma butonunu oluştur
        if (sig.predicted_value !== 'Signal is waiting') {
            const removeButton = document.createElement('button');
            removeButton.innerHTML = '&times;';
            removeButton.style.color = 'white';
            removeButton.style.backgroundColor = 'red';
            removeButton.style.border = 'none';
            removeButton.style.borderRadius = '50%';
            removeButton.style.padding = '5px 10px';
            removeButton.style.cursor = 'pointer';

            removeButton.onclick = async () => {
                selectedCoins.delete(key); // Seçili koini listeden çıkar
                signals.delete(key); // Sinyali listeden çıkar

                // Backend'e istek göndererek veritabanından da silme işlemi yap
                try {
                    const response = await fetch('https://predatoraibot.com:5000/remove_coin', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ address: accounts[0], coin: sig.coin, timeframe: sig.timeframe })
                    });

                    const result = await response.json();
                    if (result.status === "success") {
                        console.log('Coin successfully removed from the backend.');
                    } else {
                        console.error('Failed to remove the coin from the backend:', result.message);
                    }
                } catch (error) {
                    console.error('Error removing coin from backend:', error);
                }

                displaySignals(); // Ekranı güncelle
            };

            // Kapatma butonunu sadece sinyal "waiting" değilse ekle
            signalContainer.appendChild(removeButton);

        }





        // Append elements to the container
        signalContainer.appendChild(signalElement);
        signalContainer.appendChild(testSignalButton);
        //signalContainer.appendChild(removeButton);

        // Append container to signals div
        signalsDiv.appendChild(signalContainer);












    });
}


let currentPosition = null; // Track the current position







// Function to show the test signal modal
function showTestSignalModal(coin, timeframe) {
    //stopFetching(); // Stop periodic fetching when modal is opened
    document.getElementById('entryPrice').textContent = '0.0000';
    document.getElementById('currentPrice').textContent = '0.0000';
    document.getElementById('marginDisplay').textContent = '0.0000';
    document.getElementById('sizeDisplay').textContent = '0.0000';
    document.getElementById('pnlDisplay').textContent = '0.0000 [0.00%]';
    testSignalModal.querySelector('.modal-content').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    testSignalModal.querySelector('.modal-content').style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
    $('#testSignalModal').modal('show');

     // Apply styling to the modal for transparency and 3D effect


    // Set the selected coin in the title
    document.getElementById('coinTitle').textContent = `${coin.replace('USDT', '/USDT')} Sürekli`;

    // Event listener for closing modal
    //$('#testSignalModal').on('hidden.bs.modal', function () {
     //   resumeFetching(); // Resume periodic fetching when modal is closed
    //});

    document.getElementById('longButton').onclick = () => openPosition('long', coin, timeframe);
    document.getElementById('shortButton').onclick = () => openPosition('short', coin, timeframe);
    document.getElementById('closePositionButton').onclick = () => closePosition(coin, timeframe);

    // Initialize TradingView Chart
    initializeTradingViewChart(coin, timeframe);
     displaySignals()
}
var order=""
// Function to open a position
async function openPosition(type, coin, timeframe) {
    const leverage = parseFloat(document.getElementById('leverageInput').value);
    const investedAmount = parseFloat(document.getElementById('amountInput').value);
    const commissionRate = parseFloat(document.getElementById('fee').value)/100; // Example commission rate (0.1%)
    order=type

    if (isNaN(leverage) || isNaN(investedAmount)) {
        alert('Please enter valid leverage and amount');
        return;
    }

    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coin}`);
        const priceData = await response.json();
        const entryPrice = parseFloat(priceData.price);

        // Calculate the number of units
        const units = investedAmount*leverage / entryPrice;

        // Calculate margin and size
        const margin = (investedAmount ).toFixed(4);
        const size = (units * entryPrice).toFixed(4);

        // Update UI
        document.getElementById('entryPrice').textContent = entryPrice.toFixed(4);
        document.getElementById('marginDisplay').textContent = margin;
        document.getElementById('sizeDisplay').textContent = margin*leverage;
        //document.getElementById('leverageBadge').textContent = "Isolation."+leverage+"X";



        // Set current position
        currentPosition = {
            type,
            entryPrice,
            units,
            investedAmount,
            leverage,
            commissionRate
        };

        // Enable the close position button
        document.getElementById('closePositionButton').disabled = false;

        // Start monitoring PnL
        monitorPnL(coin);
    } catch (error) {
        console.error('Error opening position:', error);
    }
}

// Function to monitor PnL
function monitorPnL(coin) {
    const pnlDisplay = document.getElementById('pnlDisplay');
    const currentPriceInput = document.getElementById('currentPrice');

    const intervalId = setInterval(async () => {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${coin}`);
            const priceData = await response.json();
            const currentPrice = parseFloat(priceData.price);

            // Update the current price
            currentPriceInput.textContent = currentPrice.toFixed(4);

            // Calculate PnL
            const { entryPrice, units, type, commissionRate, investedAmount } = currentPosition;
            let pnl;

            if (type === 'long') {
                pnl = ((currentPrice * units) - (entryPrice * units) - (entryPrice * units * commissionRate) - (currentPrice * units * commissionRate)).toFixed(4);
            } else {
                pnl = ((entryPrice * units) - (currentPrice * units) - (entryPrice * units * commissionRate) - (currentPrice * units * commissionRate)).toFixed(4);
            }

            // Calculate PnL percentage
            const pnlPercentage = ((pnl / investedAmount) * 100).toFixed(2);

            // Update PnL display
            pnlDisplay.textContent = `${pnl} [${pnlPercentage}%]`;
            pnlDisplay.className = pnl < 0 ? 'text-danger' : 'text-success';
            displaySignals()
        } catch (error) {
            console.error('Error fetching price for PnL calculation:', error);
        }
    }, 1000); // Update every 5 seconds

    // Stop monitoring when the modal is closed
    $('#testSignalModal').on('hidden.bs.modal', function () {
        clearInterval(intervalId);
    });

    // Stop monitoring when the position is closed
    document.getElementById('closePositionButton').addEventListener('click', function () {
        clearInterval(intervalId);
    });
}

// Function to show the PnL modal
function showPnlModal(pnl) {
    const pnlModal = document.getElementById('pnlModal');
    const pnlResult = document.getElementById('pnlResult');

    // Update the PnL result text
    pnlResult.textContent = pnl >= 0 ? `Profit: $${pnl.toFixed(2)}` : `Loss: $${pnl.toFixed(2)}`;
    pnlResult.className = pnl >= 0 ? 'pnl-text text-success' : 'pnl-text text-danger';

    // Show the modal
    pnlModal.style.display = 'flex';
    setTimeout(() => {
        pnlModal.classList.add('show'); // Add the show class for animation
    }, 10); // Delay to ensure the animation applies

    // Close modal when the button is clicked
    document.getElementById('closePnlModal').onclick = () => {
        pnlModal.classList.remove('show'); // Remove show class
        setTimeout(() => {
            pnlModal.style.display = 'none'; // Hide modal after transition
        }, 300); // Delay matches the CSS transition duration
    };
    displaySignals()
}

// Example function call
// showPnlModal(50); // Call this function with the PnL value to display the modal


function closePosition(coin, timeframe) {
    const pnlDisplay = parseFloat(document.getElementById('pnlDisplay').textContent);
    const entryPrice = parseFloat(document.getElementById('entryPrice').textContent);
    const currentPrice = parseFloat(document.getElementById('currentPrice').textContent);
    const leverage = parseFloat(document.getElementById('leverageInput').value);
    const amount = parseFloat(document.getElementById('amountInput').value);
    const address = accounts[0]; // Kullanıcının adresini buraya ekleyin
    const tradeType = order; // Ya da ilgili trade türü
    const symbol=document.getElementById('coinTitle').textContent.replace('/', '').split(" ")[0].replace('USDT', '')

    // Trade geçmişini veritabanına kaydet
    const data = {
        address: address,
        symbol:symbol,
        trade_type: tradeType,
        entry_price: entryPrice,
        exit_price: currentPrice,
        amount: amount,
        leverage: leverage,
        pnl: pnlDisplay
    };

    fetch('https://predatoraibot.com:5000/close_position', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    // PnL modal gösterme
    showPnlModal(pnlDisplay);

    // Current position sıfırlama
    currentPosition = null;

    // Close position butonunu devre dışı bırak
    document.getElementById('closePositionButton').disabled = true;

    // UI sıfırlama
    document.getElementById('entryPrice').textContent = '0.0000';
    document.getElementById('currentPrice').textContent = '0.0000';
    document.getElementById('marginDisplay').textContent = '0.0000';
    document.getElementById('sizeDisplay').textContent = '0.0000';
    document.getElementById('pnlDisplay').textContent = '0.0000 [0.00%]';
    document.getElementById('leverageInput').value="";
    document.getElementById('amountInput').value="";
    document.getElementById('fee').value="";
    displaySignals();
}


// Example function to show the alert modal with OK and No buttons
function showAlertModal1(message, callback) {
    const modal = document.getElementById("alertModal");
    const modalBody = modal.querySelector(".modal-body");
    modalBody.textContent = message;
    overlay.style.display = 'block'; // Show the overlay
    $('#alertModal').modal('show');

    // Confirm button
    document.getElementById('confirmButton1').onclick = function() {
        callback(); // Execute the callback to clear history
        $('#alertModal').modal('hide');
    };

    // Cancel button
    document.getElementById('cancelButton').onclick = function() {
        $('#alertModal').modal('hide');
    };
}




function showTradeHistory() {
    const address = accounts[0]; // Kullanıcının adresini buraya ekleyin

    fetch(`https://predatoraibot.com:5000/get_trade_history?address=${address}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const trades = data.trades;
                let totalAmount = 0;
                let totalPnL = 0;
                let successfulTrades = 0;

                trades.forEach(trade => {
                    const pnl = parseFloat(trade[7]);
                    if (pnl > 0) {
                        successfulTrades += 1;
                    }
                });

                const successRate = (successfulTrades / trades.length) * 100 || 0;
                const totalTrades = trades.length;

                let tradeHistoryHtml = `
                    <div style="display: block; overflow-x: auto; overflow-y: auto; max-height: 400px;">
                        <table style="width: 100%; border-collapse: collapse; border-spacing: 0;">
                            <thead style="position: sticky; top: 0; background-color: rgba(0, 0, 0, 0.8); color: white; margin: 0; padding: 0;">
                                <tr>
                                    <th style="padding: 8px; text-align: left;" colspan="8">
                                        Trade History <span style="font-weight: normal; font-size: 14px;">(Success Rate: ${successRate.toFixed(2)}% | Total Trades: ${totalTrades})</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th style="padding: 8px; text-align: center;">Time</th>
                                    <th style="padding: 8px; text-align: center;">Symbol</th>
                                    <th style="padding: 8px; text-align: center;">Type</th>
                                    <th style="padding: 8px; text-align: center;">Entry Price</th>
                                    <th style="padding: 8px; text-align: center;">Exit Price</th>
                                    <th style="padding: 8px; text-align: center;">Amount</th>
                                    <th style="padding: 8px; text-align: center;">Leverage</th>
                                    <th style="padding: 8px; text-align: center;">PnL</th>
                                </tr>
                            </thead>
                            <tbody>`;

                trades.forEach(trade => {
                    const formattedDateTime = formatDateTime(trade[0]);
                    const type = trade[2];
                    const amount = parseFloat(trade[5]);
                    const pnl = parseFloat(trade[7]);
                    let pnlColor = 'white';  // Default color
                    let typeColor = type === 'long' ? 'green' : 'red';  // Green for long, red for short

                    if (pnl > 0) {
                        pnlColor = 'green';
                    } else if (pnl < 0) {
                        pnlColor = 'red';
                    }

                    totalAmount += amount;
                    totalPnL += pnl;

                    tradeHistoryHtml += `
                                <tr>
                                    <td style="padding: 8px;">${formattedDateTime}</td>
                                    <td style="padding: 8px;">
                                    <img src="icon/${trade[1]}.svg" alt="${trade[1]} Icon" width="24" height="24" style="margin-right: 10px;">
                                    ${trade[1]}</td>
                                    <td style="padding: 8px; background-color: ${typeColor};">${type}</td>
                                    <td style="padding: 8px;">${trade[3]}</td>
                                    <td style="padding: 8px;">${trade[4]}</td>
                                    <td style="padding: 8px;">$${amount.toFixed(2)}</td>
                                    <td style="padding: 8px;">${trade[6]}</td>
                                    <td style="padding: 8px; color: ${pnlColor};">$${pnl.toFixed(4)}</td>
                                </tr>`;
                });

                tradeHistoryHtml += `
                            </tbody>
                            <tfoot style="background-color: rgba(0, 0, 0, 0.8); color: white;">
                                <tr>
                                    <td colspan="5" style="padding: 8px; text-align: right;"><strong>Total:</strong></td>
                                    <td style="padding: 8px;"><strong>$${totalAmount.toFixed(2)}</strong></td>
                                    <td style="padding: 8px;"></td>
                                    <td style="padding: 8px; color: ${totalPnL < 0 ? 'red' : totalPnL > 0 ? 'green' : 'white'};"><strong>$${totalPnL.toFixed(4)}</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>`;

                document.getElementById('tradeHistoryContent').innerHTML = tradeHistoryHtml;

                // Show the modal
                const modal = document.getElementById("tradeHistoryModal");
                modal.style.display = "flex"; // Flexbox ile ortalamayı sağlamak için 'block' yerine 'flex' kullanılmalı
                modal.classList.add("show");

                // Close modal if user clicks outside the modal content
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

                // Clear History button functionality
                document.getElementById('clearHistoryButton').onclick = function() {
                    showAlertModal1("Are you sure you want to clear the trade history?", function() {
                        clearTradeHistory(address);
                    });
                };
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




// Tarih ve zaman formatlama fonksiyonu burada kullanılmalı
function formatDateTime(dateTimeString) {
    const [datePart, timePart] = dateTimeString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.split(":");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function clearTradeHistory() {
    const address = accounts[0]; // Kullanıcının adresini buraya ekleyin

    fetch(`https://predatoraibot.com:5000/clear_trade_history?address=${address}`, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Tablodaki tüm satırları temizleyin
            const tbody = document.querySelector("#tradeHistoryContent table tbody");
            if (tbody) {
                tbody.innerHTML = ''; // Tbody içeriğini tamamen temizler
            }

            // Toplam Amount, PnL, başarı yüzdesi ve toplam trade sayısı hücrelerini sıfırla
            const totalAmountCell = document.querySelector("#tradeHistoryContent table tfoot tr td:nth-child(2)");
            const totalPnLCell = document.querySelector("#tradeHistoryContent table tfoot tr td:nth-child(4)");
            const successRateSpan = document.querySelector("#tradeHistoryContent table thead tr th span");

            if (totalAmountCell) {
                totalAmountCell.textContent = "$0.00";
            }

            if (totalPnLCell) {
                totalPnLCell.textContent = "$0.0000";
                totalPnLCell.style.color = "white"; // PnL rengini sıfır durumunda beyaz yap
            }

            if (successRateSpan) {
                successRateSpan.textContent = "(Success Rate: 0.00% | Total Trades: 0)";
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}




// Close modal function
function closeModal() {
    const modal = document.getElementById("tradeHistoryModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// Initialize TradingView chart
function initializeTradingViewChart(coin, timeframe) {
    const coinSymbol = coin.replace('USDT', '');
    new TradingView.widget({
        "width": "100%",
        "height":"100%",
        "symbol": `BINANCE:${coinSymbol}USDT`,
        "interval": getTradingViewInterval(timeframe),
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "8",
        "locale": "tr",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "tradingViewChart",

    });
}

// Convert your timeframe to TradingView interval
function getTradingViewInterval(timeframe) {
    const intervals = {
        "1m": "1",
        "5m": "5",
        "15m": "15",
        "30m": "30",
        "1h": "60",
        "4h": "240",
        "1d": "D"
    };
    return intervals[timeframe] || "60"; // default to 1 hour if not found
}





function showRealTimeChart(coin, timeframe) {
    document.getElementById('mainContainer').style.filter = 'blur(5px)';
    document.getElementById('realTimeChartContainer').style.display = 'flex';
    initializeTradingViewChart1(coin, timeframe);
}

// Initialize TradingView chart
function initializeTradingViewChart1(coin, timeframe) {
    const coinSymbol = coin.replace('USDT', '');
    new TradingView.widget({
        "width": "100%",

        "symbol": `BINANCE:${coinSymbol}USDT`,
        "interval": getTradingViewInterval1(timeframe),
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "8",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "realTimeChart",
        "studies": [
            "RSI@tv-basicstudies",
            "MACD@tv-basicstudies"
        ],
    });
}

// Convert your timeframe to TradingView interval
function getTradingViewInterval1(timeframe) {
    const intervals = {
        "1m": "1",
        "5m": "5",
        "15m": "15",
        "30m": "30",
        "1h": "60",
        "4h": "240",
        "1d": "D"
    };
    return intervals[timeframe] || "60"; // default to 1 hour if not found
}

// Close real-time chart
document.getElementById('closeChartButton').onclick = () => {
    document.getElementById('mainContainer').style.filter = 'none';
    document.getElementById('realTimeChartContainer').style.display = 'none';
    document.getElementById('realTimeChart').innerHTML = '';  // Clear TradingView chart
};


// Timer function
function startTimer(duration) {
    let timer = duration, hours, minutes, seconds;
    const countdownElement = document.getElementById('countdown');
    const interval = setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        countdownElement.textContent = `${hours}:${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            document.getElementById('status').innerText = 'Subscription expired!';
            document.getElementById('tradingSection').style.display = 'none';
            document.getElementById('subscriptionInfo').style.display = 'block';
            document.getElementById('connectButton').style.display = 'block';
            document.getElementById('timer').style.display = 'none';
            document.getElementById('rightContainer').classList.add('d-none'); // Hide right container
            // Abonelik süresi bittiğinde uyarı ver
            showAlertModal("Your subscription has expired! Please renew your subscription.");

            // Clear butonunu gizle
            document.getElementById('clearButton').style.display = 'none';
            document.getElementById('volumeControlButton').style.display = 'none';
            document.getElementById('globalTimeframeSelect').style.display = 'none';
            document.getElementById('volumeheader').style.display = 'none';
            document.getElementById('tradeHistoryButton').style.display = 'none';
        }
    }, 1000);
}

// Function to start trading for a user
async function startTrading(userAddress, coins) {
    try {
        await fetch('https://predatoraibot.com:5000/start_trading', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_address: userAddress, coins: coins })
        });
    } catch (error) {
        console.error('Error starting trading:', error);
    }
}


document.getElementById('aboutButton').addEventListener('click', function () {
    const aboutSection = document.getElementById('aboutSection');
    const aboutVideo = document.getElementById('aboutVideo');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (aboutSection.style.display === 'none' || aboutSection.style.display === '') {
        aboutSection.style.display = 'block';
        aboutSection.style.height = '0';
        setTimeout(() => {
            aboutSection.style.height = '70%'; // Smoothly expand to 60% of the screen height
            aboutVideo.play(); // Play the video when the section is opened
        }, 10);
        backgroundMusic.pause(); // Stop the music when the section is opened
        overlay.style.display = 'block'; // Show the overlay
    }
});

// Close button functionality for About section
document.getElementById('closeAboutButton').addEventListener('click', function () {
    const aboutSection = document.getElementById('aboutSection');
    const aboutVideo = document.getElementById('aboutVideo');
    const backgroundMusic = document.getElementById('backgroundMusic');


    aboutVideo.pause(); // Pause the video when the section is closed
    setTimeout(() => {
        aboutSection.style.display = 'none';
        backgroundMusic.play(); // Resume the music when the section is closed
        overlay.style.display = 'none'; // Hide the overlay
    }, 500); // Wait for the height transition to finish
});



document.getElementById('usageButton').addEventListener('click', function () {
    const usageSection = document.getElementById('usageSection');
    const backgroundMusic = document.getElementById('backgroundMusic');

    if (usageSection.style.display === 'none' || usageSection.style.display === '') {
        usageSection.style.display = 'block';
        usageSection.style.height = '0';
        setTimeout(() => {
            usageSection.style.height = '60%'; // Smoothly expand to 60% of the screen height
        }, 10);
        backgroundMusic.pause(); // Stop the music when the section is opened
        overlay.style.display = 'block'; // Show the overlay
    }
});


// Close button functionality for Usage section
document.getElementById('closeUsageButton').addEventListener('click', function () {
    const usageSection = document.getElementById('usageSection');
    const backgroundMusic = document.getElementById('backgroundMusic');


    setTimeout(() => {
        usageSection.style.display = 'none';
        backgroundMusic.play(); // Resume the music when the section is closed
        overlay.style.display = 'none'; // Hide the overlay
    }, 500); // Wait for the height transition to finish
});


const aboutContent = document.getElementById('aboutContent');
// Add event listener for About button
aboutButton.addEventListener('click', () => {
    aboutContent.style.display = 'flex';
    Overlay.style.display = 'block';
    document.getElementById('aboutVideo').play(); // Play the video
    if (!backgroundMusic.paused) {
        backgroundMusic.pause();
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicControlButton = document.getElementById('musicControlButton');
    const musicControlIcon = document.getElementById('musicControlIcon');

    // Başlangıç ses seviyesini belirle
    backgroundMusic.volume = 0.02;

    // Müziği durdurma ve başlatma fonksiyonu
    const toggleMusic = () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControlButton.classList.remove('paused');
            musicControlButton.classList.add('playing');
            musicControlIcon.src = 'speaker_on.png'; // 'Açık' ikonunu güncelleyin
        } else {
            backgroundMusic.pause();
            musicControlButton.classList.remove('playing');
            musicControlButton.classList.add('paused');
            musicControlIcon.src = 'speaker_off.png'; // 'Kapalı' ikonunu güncelleyin
        }
    };

    // Butona tıklama olayını dinleyiciye bağla
    musicControlButton.addEventListener('click', toggleMusic);
});

document.addEventListener('DOMContentLoaded', () => {
    const dropdownButton = document.getElementById('dropdownButton');
    const coinDropdown = document.getElementById('coinDropdown');

    let dropdownTimer; // Timer for auto-closing

    // Function to show the dropdown
    function showDropdown() {
        coinDropdown.style.display = 'block';
        clearTimeout(dropdownTimer); // Clear any existing timer
    }

    // Function to hide the dropdown
    function hideDropdown() {
        coinDropdown.style.display = 'none';
    }

    // Show dropdown on button click
    dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        showDropdown();
    });

    // Mouseleave event for the dropdown to start the auto-close timer
    coinDropdown.addEventListener('mouseleave', () => {
        // Set a timer to close the dropdown after 500 milliseconds
        dropdownTimer = setTimeout(hideDropdown, 1500);
    });

    // Mouseenter event to cancel auto-close if the mouse returns
    coinDropdown.addEventListener('mouseenter', () => {
        clearTimeout(dropdownTimer); // Clear the timer if mouse re-enters
    });

    // Click anywhere outside the dropdown to close it
    document.addEventListener('click', (event) => {
        if (!coinDropdown.contains(event.target) && !dropdownButton.contains(event.target)) {
            hideDropdown();
        }
    });

    // Add click event listeners to each dropdown item (optional)
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            console.log(`You selected: ${item.textContent}`);
            hideDropdown(); // Close the dropdown after selection
        });
    });
});







// Function to play the click sound
function playClickSound() {
    var sound = document.getElementById('buttonClickSound');
    sound.play();
}

// Add event listeners to buttons to play sound on click
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playClickSound);
});



// Autoplay music on user interaction
document.body.addEventListener('click', (event) => {
    const aboutButton = document.getElementById('aboutButton');
    const usageButton = document.getElementById('usageButton');

    // Check if the click was on the About or Usage button
    if (event.target !== aboutButton && event.target !== usageButton) {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.error('Autoplay failed:', error);
            });
        }
    }
}, { once: true });



// Video click event to show fullscreen
const videos = document.querySelectorAll('.usage-video video');
const modal = document.getElementById('fullscreenVideoModal');
const modalVideo = document.getElementById('fullscreenVideo');
const closeModalButton = document.getElementById('closeModalButton');

// Add event listener to each video
videos.forEach((video) => {
    video.addEventListener('click', function () {
        modal.style.display = 'block';
        modalVideo.src = this.src; // Set the source of the modal video
        modalVideo.play();
    });
});

// Close modal on close button click
closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = ''; // Reset the source
});




document.getElementById('strategyButton').addEventListener('click', function () {
    const strategySection = document.getElementById('strategySection');
    const overlay = document.getElementById('overlay');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Show the overlay and strategy section
    overlay.style.display = 'block';
    strategySection.style.display = 'block';

    // Stop the background music when strategy section opens
    if (backgroundMusic) {
        backgroundMusic.pause();
    }

    // Auto-play video when section is shown
    const strategyVideo = strategySection.querySelector('video');
    if (strategyVideo) {
        strategyVideo.play();
    }
});

document.getElementById('closeStrategyButton').addEventListener('click', function () {
    const strategySection = document.getElementById('strategySection');
    const overlay = document.getElementById('overlay');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Hide the overlay and strategy section
    overlay.style.display = 'none';
    strategySection.style.display = 'none';

    // Resume the background music when strategy section closes
    if (backgroundMusic) {
        backgroundMusic.play();
    }

    // Pause video when section is closed
    const strategyVideo = strategySection.querySelector('video');
    if (strategyVideo) {
        strategyVideo.pause();
        strategyVideo.currentTime = 0; // Reset to beginning
    }
});




document.getElementById('policyButton').addEventListener('click', function () {
    const policySection = document.getElementById('policySection');
    const overlay = document.getElementById('overlay');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Hide the overlay and strategy section
    overlay.style.display = 'block';
    policySection.style.display = 'block';

    // Resume the background music when strategy section closes
     if (backgroundMusic) {
        backgroundMusic.pause();
    }


});


document.getElementById('closePolicyButton').addEventListener('click', function () {
    const strategySection = document.getElementById('policySection');
    const overlay = document.getElementById('overlay');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Hide the overlay and strategy section
    overlay.style.display = 'none';
    strategySection.style.display = 'none';

    // Resume the background music when strategy section closes
    if (backgroundMusic) {
        backgroundMusic.play();
    }


});


document.getElementById('background-video').addEventListener('canplay', function() {
    document.getElementById('background-container').style.visibility = 'hidden';
    document.getElementById('background-video').style.visibility = 'visible';
});



//Close sections when clicking outside
document.addEventListener('click', function(event) {
    const aboutSection = document.getElementById('aboutSection');
    const usageSection = document.getElementById('usageSection');
    const strategySection = document.getElementById('strategySection');
    const policySection = document.getElementById('policySection');
    const overlay = document.getElementById('overlay');

    if (!aboutSection.contains(event.target) && !usageSection.contains(event.target) &&
        !strategySection.contains(event.target) && !policySection.contains(event.target) &&
        !event.target.closest('.nav-link')) {
        aboutSection.style.display = 'none';
        usageSection.style.display = 'none';
        strategySection.style.display = 'none';
        policySection.style.display = 'none';
        overlay.style.display = 'none';

        const aboutVideo = document.getElementById('aboutVideo');
        aboutVideo.pause();
        const backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.play();
    }
});


// Function to close all sections and pause music
function closeAllSections() {
    const aboutSection = document.getElementById('aboutSection');
    const usageSection = document.getElementById('usageSection');
    const strategySection = document.getElementById('strategySection');
    const policySection = document.getElementById('policySection');
    const overlay = document.getElementById('overlay');

    aboutSection.style.display = 'none';
    usageSection.style.display = 'none';
    strategySection.style.display = 'none';
    policySection.style.display = 'none';
    overlay.style.display = 'none';

    const aboutVideo = document.getElementById('aboutVideo');
    aboutVideo.pause();
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause(); // Pause the music during section transition
}

// Close button functionality for About section
document.getElementById('closeAboutButton').addEventListener('click', function () {
    const aboutSection = document.getElementById('aboutSection');
    const aboutVideo = document.getElementById('aboutVideo');
    const backgroundMusic = document.getElementById('backgroundMusic');

    aboutVideo.pause(); // Pause the video when the section is closed
    setTimeout(() => {
        aboutSection.style.display = 'none';
        backgroundMusic.play(); // Resume the music when the section is closed
        overlay.style.display = 'none'; // Hide the overlay
    }, 500); // Wait for the height transition to finish
});

// Adding event listeners for navbar links to close other sections
document.getElementById('aboutButton').addEventListener('click', function () {
    closeAllSections(); // Close all sections first
    document.getElementById('aboutSection').style.display = 'block';
    overlay.style.display = 'block';
});

document.getElementById('usageButton').addEventListener('click', function () {
    closeAllSections(); // Close all sections first
    document.getElementById('usageSection').style.display = 'block';
    overlay.style.display = 'block';
});

document.getElementById('strategyButton').addEventListener('click', function () {
    closeAllSections(); // Close all sections first
    document.getElementById('strategySection').style.display = 'block';
    overlay.style.display = 'block';
});

document.getElementById('policyButton').addEventListener('click', function () {
    closeAllSections(); // Close all sections first
    document.getElementById('policySection').style.display = 'block';
    overlay.style.display = 'block';
});


//////////
async function fetchUserSettings() {
    try {
        const response = await fetch('https://predatoraibot.com:5000/get_user_settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address: accounts[0] })
        });
        const result = await response.json();

        if (result.coins && result.timeframes) {
            result.coins.forEach((coin, index) => {
                const timeframe = result.timeframes[index];
                const uniqueKey = `${coin}_${timeframe}`;
                selectedCoins.set(uniqueKey, { coin, timeframe });
                signals.set(uniqueKey, { coin, timeframe, predicted_value: 'Signal is waiting' });
            });
            displaySignals();  // Mevcut sinyalleri ekranda göster
        } else {
            console.log("No previous settings found for this user.");
        }
    } catch (error) {
        console.error('Error fetching user settings:', error);
    }
}


////
document.getElementById('communityButton').addEventListener('click', function() {
    const communityDropdown = document.getElementById('communityDropdown');

    // İçeriği temizle ve yeniden ekle
    communityDropdown.innerHTML = `
        <a class="dropdown-item" href="https://www.instagram.com/riseofcryptobrothers?igsh=MWZ1ajltaG5manBhbA==" target="_blank">Instagram: @RiseOfCryptoBro</a>
        <a class="dropdown-item" href="https://x.com/RiseofCryptoBro?t=vM4EmbJUBkTS_gACd7y5Tw&s=09" target="_blank">Twitter: @RiseOfCryptoBro</a>
        <a class="dropdown-item" href="mailto:predatoraibot@predatoraibot.com">Contact Email: predatoraibot@predatoraibot.com</a>
    `;
});

$(document).ready(function () {
    // Navbar menü öğelerine tıklandığında menüyü kapat
    $('.navbar-nav>li>a').not('.dropdown-toggle').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Dropdown menünün otomatik kapanmasını engelle
    $('.dropdown-toggle').on('click', function (e) {
        var $el = $(this).next('.dropdown-menu');
        var isVisible = $el.is(':visible');
        $('.dropdown-menu').not($el).hide(); // Diğer açık menüleri kapat
        if (isVisible) {
            $el.hide(); // Eğer menü zaten açıksa, kapat
        } else {
            $el.show(); // Menü kapalıysa, aç
        }
        e.stopPropagation(); // Tıklamanın dropdown menüyü kapatmasını engelle
    });




    // Sayfadaki herhangi bir yere tıklanırsa dropdown menüyü kapat
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.navbar-nav').length) {
            $('.dropdown-menu').hide();
        }
    });
});


async function fetchLatestNewsAndSignals() {
    try {
        // Fetch the latest news
        const newsResponse = await fetch('https://predatoraibot.com:5000/fetch_latest_news');
        const newsData = await newsResponse.json();

        // Fetch the trade signals based on the news
        const signalsResponse = await fetch('https://predatoraibot.com:5000/fetch_trade_signals');
        const signalsData = await signalsResponse.json();

        // Display the news in the container
        const newsContainer = document.querySelector('.news-container');
        newsContainer.innerHTML = ''; // Clear previous news

        signalsData.news.forEach(news => {
            let headlineColor = 'white'; // Default to neutral

            // Determine headline color based on sentiment
            if (news.sentiment === 'positive') {
                headlineColor = 'green';
            } else if (news.sentiment === 'negative') {
                headlineColor = 'red';
            }

            const newsCard = document.createElement('div');
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <h4 style="font-weight: bold; color: ${headlineColor};">${news.headline}</h4>
                <p>${news.content}</p>
                <p><small>${news.timestamp}</small></p>
            `;
            newsContainer.appendChild(newsCard);
        });



        // Determine the color based on the action
        let actionColor = signalsData.action === 'Buy' ? 'green' : signalsData.action === 'Sell' ? 'red' : 'white';

        // Display the trade signals summary
        const tradeSignalSummary = document.querySelector('.trade-signal-summary');
        tradeSignalSummary.innerHTML = `
            <h4 style="text-align: center;">News Trade Signal</h4>
            <p style="color: ${actionColor}; text-align: center; font-weight: bold; font-size:20px">
                Action: ${signalsData.action}
            </p>
        `;
    } catch (error) {
        console.error('Error fetching news or signals:', error);
    }
}


        // Fetch news and signals every 30 seconds
        //setInterval(fetchLatestNewsAndSignals, 60000);
        //fetchLatestNewsAndSignals(); // Initial fetch



document.getElementById('volumeControlButton').addEventListener('click', async function() {
    const container = document.getElementById('volumeChangeCardsContainer');
    const waitingCard = document.getElementById('volumeWaitingCard');

    const timeframeSelect = document.getElementById('globalTimeframeSelect');  // Timeframe seçim öğesini alıyoruz

    const selectedTimeframe = timeframeSelect.value; // Seçilen timeframe'i alıyoruz
    const modalTitle = document.getElementById('volumeControlModalLabel');
    modalTitle.textContent = `Top 10 Coins with the Highest Volume Increase in the Last ${selectedTimeframe}`;  // Başlığı güncelliyoruz

    // "Volume data is waiting" kartını göster
    waitingCard.style.display = 'block'; // Flex ile merkezde göster
    container.innerHTML = ''; // Önceki kartları temizle



    try {
        // Backend'den dönen örnek veri
         const response = await fetch(`https://predatoraibot.com:5000/top_volume_price_increases?timeframe=${selectedTimeframe}`);
        const data = await response.json();

        if (data.status === 'success' && data.data.length > 0) {
            // Kartı güncellemek için içeriği temizle
            container.innerHTML = '';

            data.data.forEach(line => {
                const [symbol, details] = line.split(': ');
                const detailsParts = details.split(', ');

                const volume_change = detailsParts.find(part => part.includes('Volume')).replace('Volume ', '').replace('%', '');
                const price_change_signal = detailsParts.find(part => part.includes('Price'));
                const price_change = price_change_signal.replace('Price ', '').replace('%', '');
                const coinSymbol1 = symbol.replace('USDT', '').toLowerCase();
                const card = document.createElement('div');
                card.className = 'col-lg-6 mb-3';
                card.innerHTML = `
            <div class="card coin-card" style="background-color: rgba(0, 0, 0, 0.7); color: white; cursor: pointer;">
                <div class="card-body">
                    <h5 class="card-title coin-title" style="cursor: pointer;">
                        <img src="icon/${coinSymbol1}.svg" alt="${symbol} Icon" width="32" height="32" style="margin-right: 10px;">
                        ${symbol}
                    </h5>
                    <p class="card-text">Volume Change: ${volume_change}%</p>
                    <p class="card-text">Price Change: ${price_change}%</p>
                    <select class="form-select mt-2" id="timeframeSelect-${symbol}"  style="background-color: #333; color: white; border-color: #333; padding: 5px; border-radius: 5px;"  >
                        <option value="1m">1 Minute</option>
                        <option value="5m">5 Minutes</option>
                        <option value="15m">15 Minutes</option>
                        <option value="1h">1 Hour</option>
                        <option value="4h">4 Hours</option>
                        <option value="1d">1 Day</option>
                    </select>
                </div>
            </div>
        `;


        const coinTitleElement = card.querySelector('.card-title');
         if (coinTitleElement) {  // Öğenin var olup olmadığını kontrol edin
        // Koin kartına tıklama olayı ekle
        coinTitleElement.addEventListener('click', () => {

              if (selectedCoins.size >= maxCoins) { // maxCoins değişkenini kullanıyoruz
                showAlertModal('You can select a maximum of 3 coins. Please deselect a coin before adding another.');
                return;
            }


            const timeframeSelect = document.getElementById(`timeframeSelect-${symbol}`);
            const selectedTimeframe = timeframeSelect.value; // Seçilen timeframe'i al

                const uniqueKey = `${symbol}_${selectedTimeframe}`; // uniqueKey formatını oluştur
                selectedCoins.set(uniqueKey, { coin: symbol, timeframe: selectedTimeframe }); // uniqueKey ile ekle
                signals.set(uniqueKey, { coin: symbol, timeframe: selectedTimeframe, predicted_value: "Signal is waiting" }); // Signal'in de uniqueKey ile güncellendiğinden emin olun

            // Sinyalleri periyodik olarak çekmeye başla
            displaySignals(); // Sağ tarafta sinyali güncelle
            // VolumeControlModal'ı kapat
            //$('#volumeControlModal').modal('hide');
             fetchSignalsPeriodically();

        });
        }
                container.appendChild(card);
            });

            // 10 koin ekrana geldiğinde bekleme kartını gizle
            waitingCard.style.display = 'none';
            // Modalı göster
            $('#volumeControlModal').modal('show');
        } else {
            // Eğer veri yoksa, kartı hata mesajıyla güncelle
            container.innerHTML = '<p class="text-danger">Hacim değişikliklerini çekerken bir hata oluştu veya veri bulunamadı.</p>';
        }

    } catch (error) {
        console.error('Hacim değişikliklerini çekerken bir hata oluştu:', error);
        // Hata oluştuğunda bekleyen kartı hata mesajıyla güncelle
        waitingCard.style.display = 'none';
        container.innerHTML = '<p class="text-danger">Hacim değişikliklerini çekerken bir hata oluştu.</p>';
    }
});


// Fetch API kullanarak AJAX isteği yapma
fetch("https://www.predatoraibot.com:5000/rss-proxy")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();  // XML veriyi düz metin olarak al
    })
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
        // RSS feed verilerini işleme
        const items = data.querySelectorAll("item");
        const newsContainer = document.querySelector("#newsSection .news-container");

        items.forEach(item => {
            const title = item.querySelector("title") ? item.querySelector("title").textContent : 'Başlık bulunamadı';
            const link = item.querySelector("link") ? item.querySelector("link").textContent : '#';
            const description = item.querySelector("description") ? item.querySelector("description").textContent : 'Açıklama yok';
            const pubDate = item.querySelector("pubDate") ? item.querySelector("pubDate").textContent : 'Tarih bilinmiyor';

            // RSS feed içeriğini sayfanıza ekleyin
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `
                <h5>${title}</h5>
                <p>${description}</p>
                <a href="${link}" target="_blank">Read more</a>
                <p><small>${pubDate}</small></p>
            `;
            newsContainer.appendChild(newsItem);
        });
    })
    .catch(error => {
        console.error("RSS feed yüklenemedi:", error);
    });





 function adjustChartSize() {
        const chartContainer = document.getElementById('realTimeChartContainer');
        if (window.innerWidth <= 768) {
            chartContainer.style.top = '0';
            chartContainer.style.left = '0';
            chartContainer.style.width = '100%';
            chartContainer.style.height = '50%';
        } else {
            chartContainer.style.top = '10%';
            chartContainer.style.left = '0';
            chartContainer.style.width = '50%';
            chartContainer.style.height = '50%';
        }
    }

    // Ekran boyutu değiştiğinde kontrol eder
    window.addEventListener('resize', adjustChartSize);

    // Sayfa yüklendiğinde kontrol eder
    window.addEventListener('load', adjustChartSize);

