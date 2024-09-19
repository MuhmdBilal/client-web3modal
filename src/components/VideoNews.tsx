import React, { useState, useEffect } from 'react';

const VideoNews = () => {
  const [currentVideo, setCurrentVideo] = useState("https://link.storjshare.io/s/jw2yymwmx5d74sfzk72l45f3ktha/predatoraibot/connect-wallet.mp4?wrap=0");

  // Videoların listesi ve thumbnail'lar
  const videos = [
    { src: 'https://link.storjshare.io/s/jw2yymwmx5d74sfzk72l45f3ktha/predatoraibot/connect-wallet.mp4?wrap=0', thumbnail: '/assets/connectwallet.png', alt: 'Connect Wallet' },
    { src: 'https://link.storjshare.io/s/jwyrab6bzkaxc6oh7rwvdvcx2vhq/predatoraibot/subscribe.mp4?wrap=0', thumbnail: '/assets/subscribe.png', alt: 'Subscribe' },
    { src: 'https://link.storjshare.io/s/juvmcmtgf2krgtqovbyvpfwkdkta/predatoraibot/select-coins.mp4?wrap=0', thumbnail: '/assets/selectcoin.png', alt: 'Select Coins' },
    { src: 'https://link.storjshare.io/s/jvuqfjo3typppjimw23vwlxvfyxq/predatoraibot/monitor-signals.mp4?wrap=0', thumbnail: '/assets/tradesignal.png', alt: 'Monitor Signals' },
    { src: 'https://link.storjshare.io/s/jwtwlevcvtlas3mgfndxu5ij7qcq/predatoraibot/chart-analysis.mp4?wrap=0', thumbnail: '/assets/chartanalysis.png', alt: 'Chart Analysis' },
    { src: 'https://link.storjshare.io/s/julifn3h2knfgueycqrd3rtefcba/predatoraibot/strategy-video.mp4?wrap=0', thumbnail: '/assets/strateji.png', alt: 'Strategy Video' }
  ];

  // Video thumbnail'e tıklandığında çağrılan fonksiyon
  const handleThumbnailClick = (src: string) => {
    setCurrentVideo(src); // Seçilen videoyu günceller
  };

  useEffect(() => {
    const videoElement = document.getElementById('mainVideo') as HTMLVideoElement;
    if (videoElement) {
      videoElement.load(); // Video kaynağı değiştirildiğinde yeni videoyu yükle
    }
  }, [currentVideo]); // currentVideo her değiştiğinde tetiklenir

  return (
    <div className="video-news-container">
      <div className="video-wrapper">
        {/* Oynatılacak video */}
        <video id="mainVideo" key={currentVideo} controls autoPlay loop muted>
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video thumbnail'ları */}
      <div className="media-thumbnails">
        {videos.map((video, index) => (
          <img
            key={index}
            src={video.thumbnail}
            alt={video.alt}
            onClick={() => handleThumbnailClick(video.src)}
            className="thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default VideoNews;
