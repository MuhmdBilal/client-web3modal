import React from 'react';

interface PolicyModalProps {
  closeModal: () => void; // closeModal'ın bir fonksiyon olduğunu belirtiyoruz
}

const PolicyModal: React.FC<PolicyModalProps> = ({ closeModal }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={closeModal}>&times;</span>
        <h2>Policy Disclaimer</h2>
        <div className="policy-content">
          <p><strong>PredatorAIbot Usage Disclaimer:</strong></p>
          <p>The information provided by PredatorAIbot may not be sufficient for making investment decisions and does not replace professional financial advice. All decisions to buy, sell, hold, or trade securities, commodities, and other investments involve risk and should be made with the advice of a qualified financial professional. Any trading in securities or other investments carries the risk of significant loss. The practice of "day trading" involves particularly high risks and could result in substantial financial losses. You should consult a qualified financial professional before entering into any trading program. Please consider whether such transactions are suitable for you in light of your financial situation and your tolerance for financial risks. We will not be liable for any loss or damage suffered by you or anyone else as a result of any trading or investment activity you or any other person engages in based on any information or materials you receive through PredatorAIbot or our services.</p>
          <p><strong>Subscription Information:</strong></p>
          <p>PredatorAIbot stores wallet information for the duration of your 24-hour subscription only. Once the subscription ends, this wallet information is deleted.</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
