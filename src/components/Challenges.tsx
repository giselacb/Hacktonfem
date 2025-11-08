import './Page.css';

const Challenges = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Retos</h1>
        <p className="page-subtitle">Retos disponibles</p>
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Retos Activos</h2>
          <p>Aquí encontrarás todos los retos disponibles para participar.</p>
        </div>
      </div>
    </div>
  );
};

export default Challenges;

