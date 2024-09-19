import React, { useState, useEffect } from 'react';

// FearGreedData tipi tanımlandı
interface FearGreedData {
  date: string;
  value: number;
  classification: string;
}

const FearGreedIndex: React.FC = () => {
  const [fearGreedData, setFearGreedData] = useState<FearGreedData[]>([]);  // useState tipi belirlendi
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchFearGreedData = async () => {
      const apiUrl = 'https://api.alternative.me/fng/?limit=60&format=csv&date_format=us';
      try {
        const response = await fetch(apiUrl);
        const data = await response.text();

        const lines = data.trim().split('\n').slice(1);
        const parsedData: FearGreedData[] = lines.map(line => {
          const [date, value, classification] = line.split(',');
          return { date, value: parseInt(value, 10), classification };
        }).filter(data => data.value && data.classification);

        setFearGreedData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(3, 0, 0, 0); // Gece saat 3'ü hedefle

      if (now.getHours() >= 3) {
        target.setDate(target.getDate() + 1); // Eğer saat 3'ü geçtiyse, bir sonraki günü ayarla
      }

      const timeDiff = target.getTime() - now.getTime();  // Milisaniye cinsinden fark

      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);

      // Eğer geri sayım sıfırlandıysa (zaman farkı 0 veya daha küçük), grafiği yenile
      if (timeDiff <= 0) {
        fetchFearGreedData(); // Verileri yeniden al ve grafiği yenile
      }
    };

    fetchFearGreedData(); // Sayfa yüklendiğinde verileri al
    const interval = setInterval(updateCountdown, 1000); // Her saniye geri sayımı güncelle
    const fetchInterval = setInterval(fetchFearGreedData, 600000); // 10 dakikada bir verileri yenile

    return () => {
      clearInterval(interval);
      clearInterval(fetchInterval);
    };
  }, []);

  const getColorClass = (value: number) => {
    if (value <= 25) return 'extreme-fear';
    if (value <= 45) return 'fear';
    if (value <= 55) return 'neutral';
    if (value <= 75) return 'greed';
    return 'extreme-greed';
  };

  return (
    <div className="fear-greed-container">
      <div className="fear-greed-content">
        {/* Sol tarafta grafiği gösteriyoruz */}
        <div className="fear-greed-chart">
          <h3>Fear & Greed Index</h3>
          <img
            src={`https://alternative.me/crypto/fear-and-greed-index.png`}
            alt="Fear & Greed Index"
            className="fear-greed-image"
          />
        </div>

        {/* Sağ tarafta tarihsel verileri gösteriyoruz */}
        <div className="fear-greed-history">
          <h4>Historical Values</h4>
          <div className="history-row">
            <span className="label">Now</span>
            <span className="classification">{fearGreedData[0]?.classification}</span>
            <span className={`value ${getColorClass(fearGreedData[0]?.value)}`}>{fearGreedData[0]?.value}</span>
          </div>
          <div className="history-row">
            <span className="label">Yesterday</span>
            <span className="classification">{fearGreedData[1]?.classification}</span>
            <span className={`value ${getColorClass(fearGreedData[1]?.value)}`}>{fearGreedData[1]?.value}</span>
          </div>
          <div className="history-row">
            <span className="label">Last Week</span>
            <span className="classification">{fearGreedData[7]?.classification}</span>
            <span className={`value ${getColorClass(fearGreedData[7]?.value)}`}>{fearGreedData[7]?.value}</span>
          </div>
          <div className="history-row">
            <span className="label">Last Month</span>
            <span className="classification">{fearGreedData[30]?.classification}</span>
            <span className={`value ${getColorClass(fearGreedData[30]?.value)}`}>{fearGreedData[30]?.value}</span>
          </div>
        </div>
      </div>

      {/* Geri sayım */}
      <div className="fear-greed-timer">
        <h4>Next Update</h4>
        <p>The next update will happen in: <strong>{timeLeft}</strong></p>
      </div>
    </div>
  );
};

export default FearGreedIndex;
