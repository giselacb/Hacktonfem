import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">¡Bienvenido!</h1>
        {user && (
          <>
            <p className="home-email">{user.email}</p>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

