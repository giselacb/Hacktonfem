import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Page.css';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      <div className="page-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Perfil</h1>
        <p className="page-subtitle">Tu perfil</p>
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Información del Usuario</h2>
          {user && (
            <>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={handleLogout} className="logout-button">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

