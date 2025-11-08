import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventoDetail.css';

type EventType = 'profesional' | 'formación';
type TabType = 'reto' | 'recursos' | 'forum' | 'ranking';

interface Publisher {
  name: string;
  role: string;
  email: string;
  company: string;
}

interface Evento {
  id: string;
  name: string;
  description: string;
  publisher: Publisher;
  publishDate: string;
  logo: string;
  type: EventType;
  isParticipating?: boolean;
}

const EventoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('reto');
  const [isParticipating, setIsParticipating] = useState(false);

  // Datos de ejemplo - en producción vendrían de una API
  useEffect(() => {
    const eventosData: Evento[] = [
      {
        id: '1',
        name: 'Spotify AI Challenge',
        description: 'Playlist Generator con IA Emocional',
        publisher: {
          name: 'María González',
          role: 'ML Engineering Manager',
          email: 'maria.gonzalez@spotify.com',
          company: 'SpotifyAI'
        },
        publishDate: '2025-11-10',
        logo: '🎵',
        type: 'profesional',
        isParticipating: true
      }
    ];

    const foundEvento = eventosData.find(e => e.id === id);
    if (foundEvento) {
      setEvento(foundEvento);
      setIsParticipating(foundEvento.isParticipating || false);
    }
  }, [id]);

  if (!evento) {
    return (
      <div className="evento-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="evento-detail-container">
      {/* Header con botón volver */}
      <div className="evento-top-bar">
        <button className="btn-back" onClick={() => navigate('/challenges')}>
          ← Volver al Dashboard
        </button>
      </div>

      {/* Hero section con logo y título */}
      <div className="evento-hero">
        <div className="evento-logo">{evento.logo}</div>
        <h1 className="evento-title">{evento.name}</h1>
        <p className="evento-subtitle">"{evento.description}"</p>
        
        <div className="evento-publisher">
          <p className="publisher-name">Publicado por: {evento.publisher.name}</p>
          <p className="publisher-role">Cargo: {evento.publisher.role} @ {evento.publisher.company}</p>
          <p className="publisher-email">📧 {evento.publisher.email}</p>
          <p className="publisher-date">📅 {new Date(evento.publishDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="evento-tabs">
        <button 
          className={`tab ${activeTab === 'reto' ? 'active' : ''}`}
          onClick={() => setActiveTab('reto')}
        >
          🎯 RETO
        </button>
        <button 
          className={`tab ${activeTab === 'recursos' ? 'active' : ''}`}
          onClick={() => setActiveTab('recursos')}
        >
          📦 RECURSOS
        </button>
        <button 
          className={`tab ${activeTab === 'forum' ? 'active' : ''}`}
          onClick={() => setActiveTab('forum')}
        >
          💬 FORUM
        </button>
        <button 
          className={`tab ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => setActiveTab('ranking')}
        >
          🏆 RANKING
        </button>
      </div>

      {/* Contenido según tab */}
      <div className="evento-content">
        {activeTab === 'reto' && (
          <>
            {/* El Problema */}
            <section className="content-section">
              <h2 className="section-title">🔴 EL PROBLEMA</h2>
              <div className="section-body">
                <p>Spotify tiene <strong>500M de usuarios</strong>.</p>
                <p><strong>Problema:</strong> Creamos playlists basadas en género musical (rock, pop, jazz...) pero los usuarios <strong>NO</strong> escuchan música por género.</p>
                
                <p>Escuchan por <strong>MOOD</strong> (estado de ánimo):</p>
                <ul className="mood-list">
                  <li>"Necesito concentrarme para trabajar"</li>
                  <li>"Estoy triste y quiero llorar"</li>
                  <li>"Voy al gym y necesito energía"</li>
                  <li>"Quiero relajarme antes de dormir"</li>
                </ul>

                <div className="alert-box">
                  <strong>NUESTRO DESAFÍO:</strong>
                  <p>Las playlists actuales no capturan esto bien.</p>
                  <p>Resultado: <strong>40% de skips</strong> (usuarios saltan canciones) = Mala UX = Churn</p>
                </div>
              </div>
            </section>

            {/* Tu Misión */}
            <section className="content-section">
              <h2 className="section-title">🎯 TU MISIÓN</h2>
              <div className="section-body">
                <p>Crea un sistema de IA que genere playlists basadas en <strong>EMOCIONES</strong> del usuario, no en géneros.</p>
                
                <div className="code-example">
                  <p className="code-label">INPUT:</p>
                  <pre><code>{`{
  "user_prompt": "Necesito concentrarme, tengo deadline",
  "current_time": "14:30",
  "user_history": [...], // últimas 100 canciones
  "context": "working" // optional
}`}</code></pre>
                </div>

                <div className="code-example">
                  <p className="code-label">OUTPUT:</p>
                  <pre><code>{`{
  "playlist": [
    {
      "track_id": "spotify:track:...",
      "track_name": "Intro - The xx",
      "artist": "The xx",
      "confidence": 0.94,
      "reasoning": "Instrumental, low tempo, helps focus"
    },
    // ... 29 más (30 tracks total)
  ],
  "mood_detected": "focus",
  "energy_level": "medium-low",
  "coherence_score": 0.89
}`}</code></pre>
                </div>
              </div>
            </section>

            {/* Requisitos Técnicos */}
            <section className="content-section">
              <h2 className="section-title">📋 REQUISITOS TÉCNICOS</h2>
              <div className="section-body">
                <h3 className="subsection-title">✅ MUST HAVE:</h3>
                
                <div className="requirement-item">
                  <h4>1. MOOD DETECTION</h4>
                  <ul>
                    <li>Detecta emoción del prompt (NLP)</li>
                    <li>Categorías: focus, sad, energetic, relax, angry, happy, etc.</li>
                    <li>Confidence score &gt; 0.8</li>
                  </ul>
                </div>

                <div className="requirement-item">
                  <h4>2. TRACK SELECTION</h4>
                  <ul>
                    <li>30 tracks por playlist</li>
                    <li>Usa API de Spotify (te damos acceso)</li>
                    <li>Considera audio features: Valence, Energy, Tempo, Acousticness, Danceability</li>
                  </ul>
                </div>

                <div className="requirement-item">
                  <h4>3. PERSONALIZATION</h4>
                  <ul>
                    <li>Usa historial del usuario</li>
                    <li>Balance: 70% familiar + 30% discovery</li>
                    <li>NO duplicar artistas (max 2 tracks/artista)</li>
                  </ul>
                </div>

                <div className="requirement-item">
                  <h4>4. COHERENCE</h4>
                  <ul>
                    <li>Playlist debe fluir bien (transiciones suaves)</li>
                    <li>No cambios bruscos de tempo/energy</li>
                    <li>Coherence score &gt; 0.85</li>
                  </ul>
                </div>

                <div className="requirement-item">
                  <h4>5. PERFORMANCE</h4>
                  <ul>
                    <li>Response time &lt; 3 segundos</li>
                    <li>Cacheable para prompts similares</li>
                  </ul>
                </div>

                <h3 className="subsection-title bonus">⭐ NICE TO HAVE (Bonus Points):</h3>
                <ul className="bonus-list">
                  <li><strong>Multi-language:</strong> Prompts en ES, EN, FR</li>
                  <li><strong>Context-aware:</strong> Adapta según hora del día</li>
                  <li><strong>Explainability:</strong> Por qué eligió cada track</li>
                  <li><strong>A/B Testing:</strong> Genera 2 playlists, usuario elige</li>
                  <li><strong>Collaborative filtering:</strong> Usa data de usuarios similares</li>
                </ul>
              </div>
            </section>

            {/* Entregables */}
            <section className="content-section">
              <h2 className="section-title">📤 ENTREGABLES</h2>
              <div className="section-body">
                <div className="deliverable-item">
                  <h4>1. GITHUB REPOSITORY (Público)</h4>
                  <p>Tu repo debe incluir: src/, notebooks/, tests/, requirements.txt, README.md</p>
                </div>

                <div className="deliverable-item">
                  <h4>2. DEPLOYED API</h4>
                  <p>URL pública con endpoints: POST /generate_playlist, GET /health</p>
                  <p>Debe estar UP durante evaluación (1-5 Dic)</p>
                </div>

                <div className="deliverable-item">
                  <h4>3. TECHNICAL REPORT (PDF, 4-6 páginas)</h4>
                  <p>Executive Summary, Approach, Results, Production Considerations, Future Work</p>
                </div>

                <div className="deliverable-item">
                  <h4>4. VIDEO DEMO (5 min max)</h4>
                  <p>Muestra tu API funcionando con diferentes prompts. Upload a YouTube (unlisted)</p>
                </div>
              </div>
            </section>

            {/* Criterios de Evaluación */}
            <section className="content-section">
              <h2 className="section-title">🏆 CRITERIOS DE EVALUACIÓN (Total: 100 pts)</h2>
              <div className="section-body">
                <div className="evaluation-item">
                  <div className="eval-header">
                    <h4>📊 ACCURACY</h4>
                    <span className="eval-points">35 pts</span>
                  </div>
                  <ul>
                    <li>Mood detection: 15 pts (Accuracy &gt; 90% = 15 pts)</li>
                    <li>Track relevance: 15 pts (User satisfaction score)</li>
                    <li>Coherence: 5 pts (Smooth transitions)</li>
                  </ul>
                </div>

                <div className="evaluation-item">
                  <div className="eval-header">
                    <h4>💡 INNOVATION</h4>
                    <span className="eval-points">25 pts</span>
                  </div>
                  <ul>
                    <li>Novel approach: 15 pts</li>
                    <li>Features (multi-language, explainability, etc.): 10 pts</li>
                  </ul>
                </div>

                <div className="evaluation-item">
                  <div className="eval-header">
                    <h4>💻 TECHNICAL EXECUTION</h4>
                    <span className="eval-points">25 pts</span>
                  </div>
                  <ul>
                    <li>Code quality: 10 pts</li>
                    <li>Performance: 10 pts</li>
                    <li>Deployment: 5 pts</li>
                  </ul>
                </div>

                <div className="evaluation-item">
                  <div className="eval-header">
                    <h4>📝 DOCUMENTATION</h4>
                    <span className="eval-points">15 pts</span>
                  </div>
                  <ul>
                    <li>Technical report quality: 10 pts</li>
                    <li>Video demo: 5 pts</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'recursos' && (
          <section className="content-section">
            <h2 className="section-title">📦 QUÉ TE PROPORCIONAMOS</h2>
            <div className="section-body">
              <div className="resource-card">
                <h3>1️⃣ SPOTIFY API ACCESS</h3>
                <ul>
                  <li>✓ Client ID & Secret (sandbox)</li>
                  <li>✓ 10,000 API calls/día</li>
                  <li>✓ Acceso completo a Search, Audio features, Recommendations</li>
                  <li>✓ Documentación completa</li>
                </ul>
                <button className="resource-button">Obtener credenciales</button>
              </div>

              <div className="resource-card">
                <h3>2️⃣ DATASET</h3>
                <p>📁 spotify_dataset.zip (1.2 GB)</p>
                <ul>
                  <li>tracks.csv (1M tracks con audio features)</li>
                  <li>user_history.json (10K usuarios)</li>
                  <li>mood_labels.csv (50K prompts labeled)</li>
                  <li>playlists.json (100K playlists humanas)</li>
                </ul>
                <button className="resource-button">Descargar dataset</button>
              </div>

              <div className="resource-card">
                <h3>3️⃣ EVALUATION SUITE</h3>
                <p>Python script que evalúa tu solución</p>
                <button className="resource-button">Descargar script</button>
              </div>

              <div className="resource-card">
                <h3>4️⃣ COMPUTE CREDITS</h3>
                <p>€200 en créditos AWS / GCP / Azure</p>
                <button className="resource-button">Solicitar créditos</button>
              </div>

              <div className="resource-card">
                <h3>5️⃣ SLACK SUPPORT</h3>
                <p>Canal: #spotify-ai-challenge</p>
                <p>Office hours: Lunes & Miércoles 18:00-19:00 CET</p>
                <p><strong>847 participantes</strong> ya activos</p>
                <button className="resource-button">Unirse al Slack</button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'forum' && (
          <section className="content-section">
            <h2 className="section-title">💬 FORO DE DISCUSIÓN</h2>
            <div className="section-body">
              <p className="coming-soon">Próximamente disponible. Únete al canal de Slack mientras tanto.</p>
            </div>
          </section>
        )}

        {activeTab === 'ranking' && (
          <section className="content-section">
            <h2 className="section-title">🏆 RANKING DE PARTICIPANTES</h2>
            <div className="section-body">
              <p className="coming-soon">El ranking se publicará una vez finalizado el periodo de envíos.</p>
            </div>
          </section>
        )}
      </div>

      {/* Botón de participar */}
      {!isParticipating && (
        <div className="evento-participate-section">
          <button className="participate-button" onClick={() => setIsParticipating(true)}>
            Participar en este reto
          </button>
        </div>
      )}
    </div>
  );
};

export default EventoDetail;
