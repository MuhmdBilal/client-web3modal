import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isConnected, children }) => {
  // Eğer cüzdan bağlı değilse, ana sayfaya yönlendir
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }

  // Eğer cüzdan bağlıysa, bileşeni render et
  return children;
};

export default PrivateRoute;
