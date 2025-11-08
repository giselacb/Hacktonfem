import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './Challenges.css';

type EventType = 'profesional' | 'formación';
type STEMBranch = 'Ciencia' | 'Tecnología' | 'Ingeniería' | 'Matemáticas' | '';

interface CurrentEvent {
  id: string;
  name: string;
  description: string;
  branch: string;
  type: string;
  progress: number;
  daysRemaining: number;
}

interface Evento {
  id: string;
  name: string;
  description: string;
  groupSize: number;
  type: EventType;
  branch: STEMBranch;
}

const Challenges = () => {
  const navigate = useNavigate();
  
  // Evento actual destacado (del Home)
  const [currentEvent] = useState<CurrentEvent | null>({
    id: '1',
    name: 'Spotify AI Challenge',
    description: 'Playlist Generator con IA Emocional',
    branch: 'Tecnología',
    type: 'profesional',
    progress: 65,
    daysRemaining: 3,
  });
  
  // Datos de ejemplo - en producción vendrían de una API
  const [eventos] = useState<Evento[]>([
    {
      id: '1',
      name: 'Hackathon de Inteligencia Artificial',
      description: 'Desarrolla soluciones innovadoras usando IA para resolver problemas reales.',
      groupSize: 4,
      type: 'profesional',
      branch: 'Tecnología',
    },
    {
      id: '2',
      name: 'Taller de Machine Learning',
      description: 'Aprende los fundamentos del machine learning y sus aplicaciones prácticas.',
      groupSize: 2,
      type: 'formación',
      branch: 'Ciencia',
    },
    {
      id: '3',
      name: 'Desafío de Ingeniería Robótica',
      description: 'Construye y programa robots para completar desafíos complejos.',
      groupSize: 5,
      type: 'profesional',
      branch: 'Ingeniería',
    },
    {
      id: '4',
      name: 'Curso de Análisis de Datos',
      description: 'Domina las herramientas de análisis de datos y visualización.',
      groupSize: 3,
      type: 'formación',
      branch: 'Matemáticas',
    },
    {
      id: '5',
      name: 'Competencia de Ciberseguridad',
      description: 'Pon a prueba tus habilidades en seguridad informática y hacking ético.',
      groupSize: 3,
      type: 'profesional',
      branch: 'Tecnología',
    },
    {
      id: '6',
      name: 'Workshop de Química Computacional',
      description: 'Explora la intersección entre química y computación para descubrimientos científicos.',
      groupSize: 4,
      type: 'formación',
      branch: 'Ciencia',
    },
    {
      id: '7',
      name: 'Reto de Desarrollo Web Full Stack',
      description: 'Crea aplicaciones web completas desde el frontend hasta el backend.',
      groupSize: 4,
      type: 'profesional',
      branch: 'Tecnología',
    },
    {
      id: '8',
      name: 'Seminario de Álgebra Avanzada',
      description: 'Profundiza en conceptos avanzados de álgebra y sus aplicaciones.',
      groupSize: 2,
      type: 'formación',
      branch: 'Matemáticas',
    },
    {
      id: '9',
      name: 'Hackathon de Ingeniería Biomédica',
      description: 'Desarrolla dispositivos médicos innovadores usando ingeniería.',
      groupSize: 5,
      type: 'profesional',
      branch: 'Ingeniería',
    },
    {
      id: '10',
      name: 'Taller de Física Cuántica',
      description: 'Introducción a los principios de la física cuántica y computación cuántica.',
      groupSize: 3,
      type: 'formación',
      branch: 'Ciencia',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | ''>('');
  const [selectedBranch, setSelectedBranch] = useState<STEMBranch>('');

  const filteredEventos = useMemo(() => {
    return eventos.filter((evento) => {
      const matchesSearch = evento.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || evento.type === selectedType;
      const matchesBranch = !selectedBranch || evento.branch === selectedBranch;

      return matchesSearch && matchesType && matchesBranch;
    });
  }, [eventos, searchTerm, selectedType, selectedBranch]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedBranch('');
  };

  return (
    <div className="challenges-page">
      {/* Hero section con evento actual */}
      {currentEvent && (
        <div className="current-event-hero">
          <div className="page-header">
            <h1 className="page-title">Reto Actual</h1>
            <p className="page-subtitle">Tu reto en progreso</p>
          </div>
          
          <div className="current-event-card" onClick={() => navigate(`/challenges/${currentEvent.id}`)}>
            <div className="current-event-header">
              <h3 className="current-event-title">EVENTO ACTUAL</h3>
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
        </div>
      )}

      {/* Sección de todos los retos */}
      <div className="all-challenges-section">
        <div className="page-header">
          <h1 className="page-title">Todos los Retos</h1>
          <p className="page-subtitle">Explora y participa en retos</p>
        </div>
        
        <div className="page-content">
        {/* Filtros y búsqueda */}
        <div className="filters-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label className="filter-label">Tipo</label>
              <div className="filter-buttons">
                <button
                  className={`filter-button ${selectedType === '' ? 'active' : ''}`}
                  onClick={() => setSelectedType('')}
                >
                  Todos
                </button>
                <button
                  className={`filter-button ${selectedType === 'profesional' ? 'active' : ''}`}
                  onClick={() => setSelectedType('profesional')}
                >
                  Profesional
                </button>
                <button
                  className={`filter-button ${selectedType === 'formación' ? 'active' : ''}`}
                  onClick={() => setSelectedType('formación')}
                >
                  Formación
                </button>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Rama STEM</label>
              <div className="filter-buttons">
                <button
                  className={`filter-button ${selectedBranch === '' ? 'active' : ''}`}
                  onClick={() => setSelectedBranch('')}
                >
                  Todas
                </button>
                <button
                  className={`filter-button ${selectedBranch === 'Ciencia' ? 'active' : ''}`}
                  onClick={() => setSelectedBranch('Ciencia')}
                >
                  Ciencia
                </button>
                <button
                  className={`filter-button ${selectedBranch === 'Tecnología' ? 'active' : ''}`}
                  onClick={() => setSelectedBranch('Tecnología')}
                >
                  Tecnología
                </button>
                <button
                  className={`filter-button ${selectedBranch === 'Ingeniería' ? 'active' : ''}`}
                  onClick={() => setSelectedBranch('Ingeniería')}
                >
                  Ingeniería
                </button>
                <button
                  className={`filter-button ${selectedBranch === 'Matemáticas' ? 'active' : ''}`}
                  onClick={() => setSelectedBranch('Matemáticas')}
                >
                  Matemáticas
                </button>
              </div>
            </div>
          </div>

          {(searchTerm || selectedType || selectedBranch) && (
            <button className="clear-filters-button" onClick={clearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Lista de eventos */}
        <div className="eventos-list">
          {filteredEventos.length > 0 ? (
            filteredEventos.map((evento) => (
              <div 
                key={evento.id} 
                className="evento-card"
                onClick={() => navigate(`/challenges/${evento.id}`)}
              >
                <div className="evento-header">
                  <h3 className="evento-name">{evento.name}</h3>
                  <span className={`evento-type-badge ${evento.type}`}>
                    {evento.type === 'profesional' ? 'Profesional' : 'Formación'}
                  </span>
                </div>
                
                <p className="evento-description">{evento.description}</p>
                
                <div className="evento-footer">
                  <div className="evento-info">
                    <span className="evento-branch">{evento.branch}</span>
                    <span className="evento-group-size">
                      👥 {evento.groupSize} {evento.groupSize === 1 ? 'persona' : 'personas'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No se encontraron eventos con los filtros seleccionados.</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
