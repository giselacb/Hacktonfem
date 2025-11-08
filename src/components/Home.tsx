import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import './Page.css';
import './Home.css';

interface CurrentEvent {
  id: string;
  name: string;
  description: string;
  branch: string;
  type: string;
  progress: number;
  daysRemaining: number;
}

const Home = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Datos de ejemplo - en producción vendrían de una API
  const [currentEvent] = useState<CurrentEvent | null>({
    id: '1',
    name: 'Hackathon de Inteligencia Artificial',
    description: 'Desarrolla soluciones innovadoras usando IA para resolver problemas reales.',
    branch: 'Tecnología',
    type: 'profesional',
    progress: 65,
    daysRemaining: 3,
  });

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
    <div className="page-container home-container">
      <div className="page-header">
        <h1 className="page-title">Feminix</h1>
        {user && <p className="page-subtitle">Hola, {user.email}</p>}
      </div>
      
      <div className="home-content">
        {currentEvent && (
          <div className="current-event-card" onClick={() => navigate(`/challenges/${currentEvent.id}`)}>
            <div className="current-event-header">
              <h3 className="current-event-title">Evento Actual</h3>
              <span className="current-event-badge">{currentEvent.branch}</span>
            </div>
            
            <h4 className="current-event-name">{currentEvent.name}</h4>
            <p className="current-event-description">{currentEvent.description}</p>
            
            <div className="current-event-progress">
              <div className="progress-header">
                <span className="progress-label">Progreso</span>
                <span className="progress-percentage">{currentEvent.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${currentEvent.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="current-event-footer">
              <span className="days-remaining">
                ⏱️ {currentEvent.daysRemaining} {currentEvent.daysRemaining === 1 ? 'día restante' : 'días restantes'}
              </span>
            </div>
          </div>
        )}

        <div className="home-main-content">
          <div className="content-card">
            <h2>¡Bienvenido a Hackaton YWT!</h2>
            <p>Explora los eventos, revisa el ranking, consulta referentes y gestiona tu perfil.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
