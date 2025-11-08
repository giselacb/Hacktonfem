import { useState } from 'react';
import './Page.css';
import './Videos.css';

interface Referente {
  id: string;
  name: string;
  profession: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

const Videos = () => {
  // Datos de ejemplo - en producción vendrían de una API
  const [referentes] = useState<Referente[]>([
    {
      id: '1',
      name: 'Dr. Elena Martínez',
      profession: 'Ingeniera de Software',
      description: 'Elena comparte su experiencia trabajando en inteligencia artificial y cómo superó los desafíos para convertirse en líder técnica en una de las mayores empresas tecnológicas.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Dra. Ana García',
      profession: 'Científica de Datos',
      description: 'Ana explica su trayectoria desde las matemáticas hasta la ciencia de datos, y cómo utiliza el machine learning para resolver problemas del mundo real.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      name: 'Ing. Laura Fernández',
      profession: 'Ingeniera Aeroespacial',
      description: 'Laura cuenta su historia de cómo llegó a trabajar en proyectos espaciales y los obstáculos que enfrentó como mujer en un campo tradicionalmente masculino.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop',
    },
    {
      id: '4',
      name: 'Dr. Carmen López',
      profession: 'Investigadora en Biotecnología',
      description: 'Carmen habla sobre su investigación en biotecnología y cómo su trabajo está contribuyendo al desarrollo de nuevas terapias médicas.',
      imageUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
    },
    {
      id: '5',
      name: 'Ing. Sofía Rodríguez',
      profession: 'Arquitecta de Sistemas',
      description: 'Sofía comparte su experiencia diseñando sistemas escalables y cómo se convirtió en referente en arquitectura de software a nivel internacional.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
    },
    {
      id: '6',
      name: 'Dra. Isabel Torres',
      profession: 'Especialista en Ciberseguridad',
      description: 'Isabel explica su camino hacia la ciberseguridad y cómo protege a las empresas de amenazas digitales, siendo una de las expertas más reconocidas del sector.',
      imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=300&fit=crop',
    },
  ]);

  const handleConocer = (referente: Referente) => {
    // En producción, esto abriría el video o redirigiría a una página de detalle
    console.log('Conocer más sobre:', referente.name);
    // Aquí podrías abrir un modal, navegar a una página de detalle, o abrir el video
    if (referente.videoUrl) {
      window.open(referente.videoUrl, '_blank');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Referentes</h1>
        <p className="page-subtitle">Mujeres profesionales en STEM compartiendo su experiencia</p>
      </div>
      
      <div className="page-content">
        <div className="referentes-list">
          {referentes.map((referente) => (
            <div key={referente.id} className="referente-card">
              <div className="referente-image-container">
                <img 
                  src={referente.imageUrl} 
                  alt={referente.name}
                  className="referente-image"
                  loading="lazy"
                />
                <div className="play-overlay">
                  <svg className="play-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              
              <div className="referente-content">
                <div className="referente-header">
                  <h3 className="referente-name">{referente.name}</h3>
                  <span className="referente-profession">{referente.profession}</span>
                </div>
                
                <p className="referente-description">{referente.description}</p>
                
                <button 
                  className="conocer-button"
                  onClick={() => handleConocer(referente)}
                >
                  Conocer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
