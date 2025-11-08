import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Page.css';
import './Profile.css';

interface ProfileOption {
  id: string;
  label: string;
  iconType: string;
  action?: () => void;
}

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Datos de ejemplo - en producción vendrían de una API
  const [stats] = useState({
    coins: 1450,
    challengesCompleted: 214,
    videosUploaded: 3,
  });

  const [username] = useState('Martuqui.24');
  const [imageError, setImageError] = useState(false);

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

  const profileOptions: ProfileOption[] = [
    {
      id: '1',
      label: 'Configuración general',
      iconType: 'settings',
    },
    {
      id: '2',
      label: 'Notificaciones',
      iconType: 'notifications',
    },
    {
      id: '3',
      label: 'Permisos',
      iconType: 'shield',
    },
    {
      id: '4',
      label: 'Privacidad de la cuenta',
      iconType: 'lock',
    },
    {
      id: '5',
      label: 'Ayuda y soporte',
      iconType: 'help',
    },
    {
      id: '6',
      label: 'Cerrar sesión',
      iconType: 'logout',
      action: handleLogout,
    },
  ];

  const renderIcon = (type: string, className: string = '') => {
    const iconProps = {
      className,
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    };

    switch (type) {
      case 'coins':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'challenges':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'videos':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'settings':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'notifications':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      case 'shield':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'lock':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'help':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'logout':
        return (
          <svg {...iconProps}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return null;
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
    <div className="page-container profile-page">
      <div className="profile-header">
        <h1 className="profile-title">Perfil</h1>
      </div>

      <div className="profile-content">
        {/* Foto de perfil y nombre */}
        <div className="profile-picture-section">
          <div className="profile-picture-container">
            <div className="profile-picture">
              {!imageError ? (
                <img 
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=80'} 
                  alt={username}
                  className="profile-image"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="profile-picture-placeholder">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <h2 className="profile-username">{username}</h2>
          <button className="edit-profile-button">
            <span>Editar Perfil</span>
            <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        {/* Estadísticas */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-icon coins">
              {renderIcon('coins', 'stat-icon-svg')}
            </div>
            <div className="stat-value">{stats.coins}</div>
            <div className="stat-label">Monedas</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon challenges">
              {renderIcon('challenges', 'stat-icon-svg')}
            </div>
            <div className="stat-value">{stats.challengesCompleted.toLocaleString('es-ES')}</div>
            <div className="stat-label">Retos Completados</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon videos">
              {renderIcon('videos', 'stat-icon-svg')}
            </div>
            <div className="stat-value">{stats.videosUploaded}</div>
            <div className="stat-label">Vídeos subidos</div>
          </div>
        </div>

        {/* Insignias ganadas */}
        <div className="profile-badges">
          <h3 className="badges-title">Insignias ganadas</h3>
          <div className="badges-container">
            <div className="badge-item">
              <div className="badge-circle chemistry">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="12" cy="16" rx="4" ry="3" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="8" cy="11" r="1.5" fill="white" opacity="0.9"/>
                  <circle cx="16" cy="11" r="1.5" fill="white" opacity="0.9"/>
                  <circle cx="10" cy="17" r="1" fill="white" opacity="0.7"/>
                  <circle cx="14" cy="17" r="1" fill="white" opacity="0.7"/>
                </svg>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-circle biology">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <path d="M12 2C8 2 6 4 6 8C6 12 8 14 12 16C16 14 18 12 18 8C18 4 16 2 12 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M12 8L10 10L12 12L14 10L12 8Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M8 6L6 8L8 10" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M16 6L18 8L16 10" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M6 12L8 14L6 16" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M18 12L16 14L18 16" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-circle physics">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <circle cx="12" cy="12" r="2" fill="white"/>
                  <ellipse cx="12" cy="8" rx="3" ry="1.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="16" cy="12" rx="1.5" ry="3" stroke="white" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="12" cy="16" rx="3" ry="1.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="12" cy="6" r="0.5" fill="white"/>
                  <circle cx="18" cy="12" r="0.5" fill="white"/>
                  <circle cx="12" cy="18" r="0.5" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-circle technology">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <rect x="6" y="6" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <rect x="8" y="8" width="8" height="8" rx="0.5" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1"/>
                  <line x1="10" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1"/>
                  <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="7" cy="7" r="0.5" fill="currentColor"/>
                  <circle cx="17" cy="7" r="0.5" fill="currentColor"/>
                  <circle cx="7" cy="17" r="0.5" fill="currentColor"/>
                  <circle cx="17" cy="17" r="0.5" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-circle mathematics">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <text x="9" y="10" fontSize="4" fill="currentColor" fontWeight="bold" fontFamily="Arial, sans-serif">+</text>
                  <text x="13" y="10" fontSize="4" fill="currentColor" fontWeight="bold" fontFamily="Arial, sans-serif">-</text>
                  <text x="9" y="14" fontSize="4" fill="currentColor" fontWeight="bold" fontFamily="Arial, sans-serif">=</text>
                  <text x="13" y="14" fontSize="4" fill="currentColor" fontWeight="bold" fontFamily="Arial, sans-serif">÷</text>
                </svg>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-circle engineering">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 6L14 10L10 10L12 6Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M12 18L14 14L10 14L12 18Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M6 12L10 14L10 10L6 12Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M18 12L14 10L14 14L18 12Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            <div className="badge-item">
              <div className="badge-circle stem">
                <svg viewBox="0 0 24 24" fill="none" className="badge-icon">
                  <path d="M12 2L4 6V12C4 16 8 19 12 22C16 19 20 16 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 10L10 12L12 10L16 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <text x="7" y="18" fontSize="3.5" fill="currentColor" fontWeight="bold" fontFamily="Arial, sans-serif">STEM</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Opciones del perfil */}
        <div className="profile-options">
          {profileOptions.map((option) => (
            <div
              key={option.id}
              className="profile-option-item"
              onClick={option.action}
            >
              <div className="option-icon">
                {renderIcon(option.iconType, 'option-icon-svg')}
              </div>
              <span className="option-label">{option.label}</span>
              <svg className="option-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
