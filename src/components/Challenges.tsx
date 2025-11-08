import './Page.css';

const Challenges = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Challenges</h1>
        <p className="page-subtitle">Desafíos disponibles</p>
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Desafíos Activos</h2>
          <p>Aquí encontrarás todos los desafíos disponibles para participar.</p>
        </div>
      </div>
    </div>
  );
};

export default Challenges;

