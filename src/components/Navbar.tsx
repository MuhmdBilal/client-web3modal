import React, { useState } from 'react';
import PolicyModal from './PolicyModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  // 'e' parametresine tip ataması yapıldı: React.MouseEvent
  const openPolicyModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsPolicyModalOpen(true);
    document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı devre dışı bırak
  };

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
    document.body.style.overflow = 'auto'; // Sayfa kaydırmayı geri getir
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo-container">
          <img src="/assets/PredetorAiBotlogo.svg" alt="Logo" className="enlarged-logo" />
        </div>
        <div className={`menu ${isMenuOpen ? 'active' : ''}`} id="navMenu">
          <a href="#aboutSection">About</a>
          <a href="#contact">Contact</a>
          <a href="#policy" className="policy-link" onClick={openPolicyModal}>
            Policy Disclaimer
          </a>
        </div>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
      {/* Policy Modal */}
      {isPolicyModalOpen && <PolicyModal closeModal={closePolicyModal} />}
    </>
  );
};

export default Navbar;
