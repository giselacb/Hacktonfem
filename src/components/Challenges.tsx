import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import './Challenges.css';

interface CurrentChallenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isEnrolled: boolean;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  isEnrolled: boolean;
}

const Challenges = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  
  // Retos actuales
  const [currentChallenges] = useState<CurrentChallenge[]>([
    {
      id: '1',
      name: 'Biología',
      description: 'El laboratorio rosalind franklin',
      icon: '/freepik__minimalist-flat-design-icon-of-a-dna-double-helix-__23500.png',
      isEnrolled: true
    }
  ]);
  
  // Retos disponibles
  const [availableChallenges] = useState<Challenge[]>([
    {
      id: '2',
      name: 'Química',
      description: 'Aprende la tabla periódica con Madam curie',
      icon: '/freepik__flat-modern-vector-icon-of-a-laboratory-flask-erle__23499.png',
      isEnrolled: false
    },
    {
      id: '3',
      name: 'Matemáticas',
      description: 'Aprende álgebra con Emmy Noether',
      icon: '/freepik__flat-vector-icon-of-a-compass-ruler-and-mathematic__23503.png',
      isEnrolled: false
    },
    {
      id: '4',
      name: 'Física',
      description: 'Descubre las leyes del universo con Marie Curie',
      icon: '/freepik__minimalist-flat-icon-of-an-atom-with-orbiting-elec__23498.png',
      isEnrolled: false
    },
    {
      id: '5',
      name: 'Tecnología',
      description: 'Programación básica con Ada Lovelace',
      icon: '/freepik__flat-minimalist-icon-of-a-glowing-microchip-or-dig__23496.png',
      isEnrolled: false
    }
  ]);

  const getUserInitial = () => {
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const getUsername = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'Usuario';
  };

  const handleParticipate = (challengeId: string) => {
    // En producción, esto registraría al usuario en el reto
    console.log('Participando en reto:', challengeId);
    navigate(`/challenges/${challengeId}`);
  };

  return (
    <div className="challenges-page">
      {/* Header con usuario */}
      <div className="challenges-header">
        <div className="user-info">
          <div className="user-avatar">{getUserInitial()}</div>
          <h2 className="user-name">{getUsername()}</h2>
        </div>
      </div>

      {/* Retos actuales */}
      <div className="challenges-section">
        <h2 className="section-title">Retos actuales</h2>
        <div className="challenges-grid">
          {currentChallenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className="challenge-card current"
              onClick={() => navigate(`/challenges/${challenge.id}`)}
            >
              <h3 className="challenge-name">{challenge.name}</h3>
              <p className="challenge-description">{challenge.description}</p>
              <div className="challenge-icon-wrapper">
                <img src={challenge.icon} alt={challenge.name} className="challenge-icon-img" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retos disponibles */}
      <div className="challenges-section">
        <h2 className="section-title">Retos disponibles</h2>
        <div className="challenges-grid">
          {availableChallenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className="challenge-card available"
            >
              <h3 className="challenge-name">{challenge.name}</h3>
              <p className="challenge-description">{challenge.description}</p>
              <div className="challenge-icon-wrapper">
                <img src={challenge.icon} alt={challenge.name} className="challenge-icon-img" />
              </div>
              <button 
                className="participate-btn"
                onClick={() => handleParticipate(challenge.id)}
              >
                Participar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
