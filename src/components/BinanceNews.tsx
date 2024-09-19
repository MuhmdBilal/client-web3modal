import React, { useState, useEffect } from 'react';

// NewsItem tipi
interface NewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

const BinanceNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);  // useState tipi belirlendi

  // Binance'den haberleri çekme
  useEffect(() => {
    fetch("https://www.predatoraibot.com:5000/rss-proxy")
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        const newsArray = Array.from(items).map((item) => ({
          title: item.querySelector("title")?.textContent || 'No title',
          link: item.querySelector("link")?.textContent || '#',
          description: item.querySelector("description")?.textContent || 'No description',
          pubDate: item.querySelector("pubDate")?.textContent || 'No date',
        }));
        setNews(newsArray);
      })
      .catch((error) => console.error("RSS feed yüklenemedi:", error));
  }, []);

  return (
    <div id="newsSection" className="news-container">
      <h3>Latest News from Binance News</h3>
      {news.length === 0 ? (
        <p>Loading news...</p>
      ) : (
        news.map((item, index) => (
          <div key={index} className="news-item">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
            <p><small>{item.pubDate}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default BinanceNews;
