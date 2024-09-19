import React from 'react';

const AppPage = ({ walletType, handleWalletTypeChange, isSubscribed, subscriptionFee, handleSubscribe, handleLogin, isLoading }) => {
  return (
    <div className="card">
      <div className="card-header">Wallet Selection</div>
      <div className="card-body">
        <select id="walletType" value={walletType} onChange={handleWalletTypeChange} className="wallet-select">
          <option className="wallet-option" value="">Select a wallet</option>
          <option className="wallet-option" value="MetaMask">MetaMask</option>
          <option className="wallet-option" value="Coinbase">Coinbase Wallet</option>
          <option className="wallet-option" value="TrustWallet">Trust Wallet</option>
        </select>
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
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default AppPage;
