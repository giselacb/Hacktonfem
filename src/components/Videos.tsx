import './Page.css';

const Videos = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Videos</h1>
        <p className="page-subtitle">Contenido multimedia</p>
      </div>
      
      <div className="page-content">
        <div className="content-card">
          <h2>Videos Disponibles</h2>
          <p>Explora videos relacionados con el hackathon y los desafíos.</p>
        </div>
      </div>
    </div>
  );
};

export default Videos;

