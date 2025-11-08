import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import './Page.css';

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Inicio</h1>
        {user && <p className="page-subtitle">Bienvenido, {user.email}</p>}
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>¡Bienvenido a Hackaton YWT!</h2>
          <p>Explora los eventos, revisa el ranking, consulta referentes y gestiona tu perfil.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

