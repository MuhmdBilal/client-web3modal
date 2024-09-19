import React from 'react';


const About = () => {
  return (
    <div className="about-container">
      <h2>About PredatorAiBot</h2>
      <div className="about-content">
        <div className="about-video">
          {/* Video otomatik olarak sayfa açıldığında oynayacak */}
          <video autoPlay muted loop controls>
            <source src="https://link.storjshare.io/s/juimn4qslv7572molholwm6qxgwq/predatoraibot/about.mp4?wrap=0" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="about-text">
          <h3>Algorithmic Financial Trading with Deep CNN</h3>
          <p>
            PredatorAiBot leverages the power of deep convolutional neural networks (CNNs) for predicting financial markets.
            Our platform uses advanced algorithms to analyze historical data and predict future price movements with remarkable accuracy.
          </p>
          <h4>How It Works</h4>
          <p>
            We use a combination of historical price data, technical indicators, and market sentiment to make informed trading decisions.
            Our CNN-based model identifies patterns that humans might overlook, providing superior trade recommendations.
          </p>
          <h4>Data Collection and Preprocessing</h4>
          <p>
            Historical stock price data is collected from reliable financial databases, and features such as open, high, low, close prices,
            and trading volume are extracted. Supplementary features like technical indicators (e.g., RSI, MACD) are also computed.
            Data is normalized to ensure uniform scaling and is split into training, validation, and test sets.
          </p>
          <h4>Model Training and Evaluation</h4>
          <p>
            Our model is trained using the training dataset. A loss function (e.g., Mean Squared Error) is minimized using an optimizer like Adam.
            The model’s performance is evaluated using metrics like Mean Absolute Error (MAE) and Sharpe Ratio. Backtesting ensures profitability
            and risk management.
          </p>
          <h4>Our Goal</h4>
          <p>
            The main goal of PredatorAiBot is to help traders minimize risk and maximize profits by providing them with accurate,
            real-time signals powered by cutting-edge AI technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
