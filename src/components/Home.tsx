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
        <h1 className="page-title">Feminix</h1>
        {user && <p className="page-subtitle">Hola, {user.email}</p>}
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Esto es Feminix!</h2>
          <p>Explora los retos, revisa el ranking, consulta referentes y gestiona tu perfil.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

