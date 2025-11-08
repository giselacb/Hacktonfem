import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Datos de ejemplo - en producción vendrían de una API/Firestore
  const [stats] = useState({
    coins: 214,
    completedChallenges: 1450,
    uploadedVideos: 54
  });

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

  const getUsername = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuario';
  };

  const getUserInitial = () => {
    const username = getUsername();
    return username.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Perfil</h1>
        <button className="profile-menu-icon">⋮</button>
      </div>

      <div className="profile-hero">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            {getUserInitial()}
          </div>
        </div>
        <h2 className="profile-username">{getUsername()}</h2>
        <button className="edit-profile-btn">
          Editar Perfil ✏️
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-icon">💰</div>
          <p className="stat-value">{stats.coins}</p>
          <p className="stat-label">Monedas</p>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🏆</div>
          <p className="stat-value">{stats.completedChallenges.toLocaleString()}</p>
          <p className="stat-label">Retos Completados</p>
        </div>
        <div className="stat-item">
          <div className="stat-icon">📹</div>
          <p className="stat-value">{stats.uploadedVideos}</p>
          <p className="stat-label">Videos subidos</p>
        </div>
      </div>

      <div className="profile-menu">
        <div className="menu-section">
          <div className="menu-item">
            <div className="menu-item-left">
              <div className="menu-item-icon">⚙️</div>
              <span className="menu-item-text">Configuración general</span>
            </div>
            <span className="menu-item-arrow">→</span>
          </div>

          <div className="menu-item">
            <div className="menu-item-left">
              <div className="menu-item-icon">🔔</div>
              <span className="menu-item-text">Notificaciones</span>
            </div>
            <span className="menu-item-arrow">→</span>
          </div>

          <div className="menu-item">
            <div className="menu-item-left">
              <div className="menu-item-icon">🛡️</div>
              <span className="menu-item-text">Permisos</span>
            </div>
            <span className="menu-item-arrow">→</span>
          </div>

          <div className="menu-item">
            <div className="menu-item-left">
              <div className="menu-item-icon">🔒</div>
              <span className="menu-item-text">Privacidad de la cuenta</span>
            </div>
            <span className="menu-item-arrow">→</span>
          </div>

          <div className="menu-item">
            <div className="menu-item-left">
              <div className="menu-item-icon">❓</div>
              <span className="menu-item-text">Ayuda y soporte</span>
            </div>
            <span className="menu-item-arrow">→</span>
          </div>

          <div className="menu-item logout-item" onClick={handleLogout}>
            <div className="menu-item-left">
              <div className="menu-item-icon">🚪</div>
              <span className="menu-item-text">Cerrar sesión</span>
            </div>
            <span className="menu-item-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

