import './Page.css';

const Challenges = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Eventos</h1>
        <p className="page-subtitle">Eventos disponibles</p>
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Eventos Activos</h2>
          <p>Aquí encontrarás todos los eventos disponibles para participar.</p>
        </div>
      </div>
    </div>
  );
};

export default Challenges;

