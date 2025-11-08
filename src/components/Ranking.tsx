import { useState } from 'react';
import './Page.css';
import './Ranking.css';

interface RankingUser {
  id: string;
  name: string;
  score: number;
}

const Ranking = () => {
  // Datos de ejemplo - en producción vendrían de una API
  const [ranking] = useState<RankingUser[]>([
    { id: '1', name: 'María García', score: 9850 },
    { id: '2', name: 'Ana Martínez', score: 9720 },
    { id: '3', name: 'Laura Sánchez', score: 9650 },
    { id: '4', name: 'Sofía González', score: 9420 },
    { id: '5', name: 'Elena Ruiz', score: 9380 },
    { id: '6', name: 'Carmen Díaz', score: 9250 },
    { id: '7', name: 'Isabel Torres', score: 9120 },
    { id: '8', name: 'Lucía Fernández', score: 9050 },
    { id: '9', name: 'Paula López', score: 8920 },
    { id: '10', name: 'Marta Herrera', score: 8850 },
    { id: '11', name: 'Claudia Pérez', score: 8720 },
    { id: '12', name: 'Andrea Jiménez', score: 8650 },
  ]);

  const getRankBadge = (position: number) => {
    switch (position) {
      case 1:
        return <span className="rank-badge gold">🥇</span>;
      case 2:
        return <span className="rank-badge silver">🥈</span>;
      case 3:
        return <span className="rank-badge bronze">🥉</span>;
      default:
        return <span className="rank-number">{position}</span>;
    }
  };

  const formatScore = (score: number) => {
    return score.toLocaleString('es-ES');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Ranking</h1>
        <p className="page-subtitle">Clasificación de participantes</p>
      </div>
      
      <div className="page-content">
        <div className="ranking-list">
          {ranking.map((user, index) => {
            const position = index + 1;
            const isTopThree = position <= 3;
            
            return (
              <div 
                key={user.id} 
                className={`ranking-item ${isTopThree ? 'top-three' : ''}`}
              >
                <div className="ranking-position">
                  {getRankBadge(position)}
                </div>
                <div className="ranking-info">
                  <div className="ranking-name">{user.name}</div>
                  <div className="ranking-score">{formatScore(user.score)} pts</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
