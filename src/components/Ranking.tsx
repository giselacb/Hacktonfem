import './Page.css';

const Ranking = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Ranking</h1>
        <p className="page-subtitle">Clasificación de participantes</p>
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Top Participantes</h2>
          <p>Consulta el ranking de los mejores participantes de Feminix.</p>
        </div>
      </div>
    </div>
  );
};

export default Ranking;

