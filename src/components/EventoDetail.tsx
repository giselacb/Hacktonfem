import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Page.css';
import './EventoDetail.css';

type EventType = 'profesional' | 'formación';
type STEMBranch = 'Ciencia' | 'Tecnología' | 'Ingeniería' | 'Matemáticas';

interface Evento {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  groupSize: number;
  type: EventType;
  branch: STEMBranch;
  startDate: string;
  endDate: string;
  duration: string;
  files?: string[];
  isParticipating?: boolean;
}

const EventoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Datos de ejemplo - en producción vendrían de una API
  useEffect(() => {
    // Simular carga de datos del evento
    const eventosData: Evento[] = [
      {
        id: '1',
        name: 'Hackathon de Inteligencia Artificial',
        description: 'Desarrolla soluciones innovadoras usando IA para resolver problemas reales.',
        fullDescription: 'Este hackathon te desafía a crear soluciones innovadoras utilizando inteligencia artificial para resolver problemas del mundo real. Trabajarás en equipos para desarrollar proyectos que puedan tener un impacto positivo en la sociedad. Incluye mentorías, talleres y acceso a recursos especializados.',
        groupSize: 4,
        type: 'profesional',
        branch: 'Tecnología',
        startDate: '2024-03-15',
        endDate: '2024-03-17',
        duration: '48 horas',
        files: ['guia-participante.pdf', 'datasets.zip', 'api-documentation.pdf'],
        isParticipating: true,
      },
      {
        id: '2',
        name: 'Taller de Machine Learning',
        description: 'Aprende los fundamentos del machine learning y sus aplicaciones prácticas.',
        fullDescription: 'Un taller completo donde aprenderás los fundamentos del machine learning desde cero. Cubriremos algoritmos básicos, procesamiento de datos, y aplicaciones prácticas en diferentes industrias.',
        groupSize: 2,
        type: 'formación',
        branch: 'Ciencia',
        startDate: '2024-03-20',
        endDate: '2024-03-22',
        duration: '3 días',
        files: ['material-curso.pdf', 'ejercicios-practicos.zip'],
        isParticipating: false,
      },
      // Agregar más eventos según sea necesario
    ];

    const foundEvento = eventosData.find(e => e.id === id);
    if (foundEvento) {
      setEvento(foundEvento);
      setIsParticipating(foundEvento.isParticipating || false);
    }
  }, [id]);

  const handleDownloadFile = (fileName: string) => {
    // En producción, esto descargaría el archivo real
    console.log('Descargando archivo:', fileName);
    // Simulación de descarga
    const link = document.createElement('a');
    link.href = `#`; // URL real del archivo
    link.download = fileName;
    link.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // En producción, aquí subirías el archivo a un servidor
      console.log('Archivo seleccionado:', file.name);
    }
  };

  const handleSubmitResults = () => {
    if (uploadedFile) {
      // En producción, aquí subirías el archivo
      console.log('Subiendo resultados:', uploadedFile.name);
      alert(`Resultados subidos: ${uploadedFile.name}`);
    } else {
      alert('Por favor, selecciona un archivo para subir');
    }
  };

  const handleParticipate = () => {
    setIsParticipating(true);
    // En producción, esto registraría al usuario en el evento
    console.log('Participando en evento:', evento?.id);
    alert('¡Te has unido al evento!');
  };

  if (!evento) {
    return (
      <div className="page-container">
        <div className="loading">Cargando evento...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/challenges')}>
          ← Volver
        </button>
        <h1 className="page-title">{evento.name}</h1>
        <p className="page-subtitle">{evento.branch} • {evento.type === 'profesional' ? 'Profesional' : 'Formación'}</p>
      </div>

      <div className="page-content">
        <div className="evento-detail-card">
          <div className="evento-detail-header">
            <div className="evento-badges">
              <span className={`evento-type-badge ${evento.type}`}>
                {evento.type === 'profesional' ? 'Profesional' : 'Formación'}
              </span>
              <span className="evento-branch-badge">{evento.branch}</span>
            </div>
          </div>

          <div className="evento-detail-info">
            <div className="info-item">
              <span className="info-label">📅 Fechas:</span>
              <span className="info-value">{new Date(evento.startDate).toLocaleDateString('es-ES')} - {new Date(evento.endDate).toLocaleDateString('es-ES')}</span>
            </div>
            <div className="info-item">
              <span className="info-label">⏱️ Duración:</span>
              <span className="info-value">{evento.duration}</span>
            </div>
            <div className="info-item">
              <span className="info-label">👥 Tamaño de grupo:</span>
              <span className="info-value">{evento.groupSize} {evento.groupSize === 1 ? 'persona' : 'personas'}</span>
            </div>
          </div>

          <div className="evento-description-section">
            <h2 className="section-title">Descripción</h2>
            <p className="evento-full-description">{evento.fullDescription}</p>
          </div>

          {isParticipating ? (
            <>
              {/* Sección de archivos para descargar */}
              {evento.files && evento.files.length > 0 && (
                <div className="evento-files-section">
                  <h2 className="section-title">Archivos del evento</h2>
                  <div className="files-list">
                    {evento.files.map((file, index) => (
                      <div key={index} className="file-item">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{file}</span>
                        <button
                          className="download-button"
                          onClick={() => handleDownloadFile(file)}
                        >
                          Descargar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sección para subir resultados */}
              <div className="evento-upload-section">
                <h2 className="section-title">Subir resultados</h2>
                <div className="upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileUpload}
                    className="file-input"
                    accept=".pdf,.zip,.rar,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="file-label">
                    {uploadedFile ? (
                      <>
                        <span className="file-icon">✓</span>
                        <span className="file-name">{uploadedFile.name}</span>
                      </>
                    ) : (
                      <>
                        <span className="file-icon">📤</span>
                        <span>Seleccionar archivo</span>
                      </>
                    )}
                  </label>
                  {uploadedFile && (
                    <button
                      className="submit-button"
                      onClick={handleSubmitResults}
                    >
                      Subir resultados
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="evento-participate-section">
              <button className="participate-button" onClick={handleParticipate}>
                Participar en este evento
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventoDetail;

