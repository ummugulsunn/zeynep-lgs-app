import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SUBJECTS } from '../data/curriculum';

const TEACHERS_PER_SUBJECT = {
  matematik7: [
    { name: 'Şenol Hoca 📐', query: 'Şenol Hoca 7. Sınıf Matematik' },
    { name: 'Rehber Matematik 📐', query: 'Rehber Matematik 7. Sınıf Matematik' },
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç Akademi 7. Sınıf Matematik' }
  ],
  matematik: [
    { name: 'Şenol Hoca 📐', query: 'Şenol Hoca LGS 8. sınıf' },
    { name: 'Rehber Matematik 📐', query: 'Rehber Matematik LGS 8. sınıf' },
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç Akademi LGS 8. sınıf' }
  ],
  turkce: [
    { name: 'Rüştü Hoca 📘', query: 'Rüştü Hoca LGS Türkçe 8. sınıf' },
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç Akademi LGS Türkçe 8. sınıf' }
  ],
  fen: [
    { name: 'Benim Hocam LGS 🧪', query: 'Benim Hocam LGS Fen Bilimleri' },
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç Akademi LGS Fen Bilimleri' }
  ],
  inkilap: [
    { name: 'Sosyal Kale 🗺️', query: 'Sosyal Kale LGS İnkılap Tarihi' },
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç LGS İnkılap Tarihi' }
  ],
  ingilizce: [
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç LGS İngilizce 8. sınıf' },
    { name: 'Benim Hocam LGS 💬', query: 'Benim Hocam LGS İngilizce' }
  ],
  din: [
    { name: 'Tonguç Akademi 🎓', query: 'Tonguç LGS Din Kültürü 8. sınıf' },
    { name: 'Benim Hocam LGS 🕌', query: 'Benim Hocam LGS Din Kültürü' }
  ]
};

function NodeModal({ node, state, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('subtopics');
  
  const subs = state.completed[node.id] || [];
  const qz = state.quizDone[node.id] || [];
  
  // Track selected wrong options for quiz
  const [selectedWrong, setSelectedWrong] = useState({});

  const subjectBooks = state.books?.[node.subjectId] || [];
  const bp = state.bookProgress?.[node.id] || {};
  const [newBookName, setNewBookName] = useState('');

  const handleAddBook = () => {
    if (!newBookName.trim()) return;
    const currentBooks = state.books?.[node.subjectId] || [];
    if (!currentBooks.includes(newBookName)) {
      onUpdate({
        books: { ...(state.books || {}), [node.subjectId]: [...currentBooks, newBookName] }
      });
    }
    setNewBookName('');
  };

  const handleBookToggle = (bookName) => {
    const isChecked = bp[bookName];
    onUpdate({
      bookProgress: {
        ...(state.bookProgress || {}),
        [node.id]: {
          ...bp,
          [bookName]: !isChecked
        }
      }
    });

    if (!isChecked) {
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 }, colors:['#B593FF','#FF9BBE']});
    }
  };

  const handleSubToggle = (index) => {
    const newSubs = [...subs];
    newSubs[index] = !newSubs[index];
    onUpdate({ completed: { ...state.completed, [node.id]: newSubs } });
    
    // Confetti
    if (newSubs[index]) {
      confetti({ particleCount: 15, spread: 30, origin: { y: 0.7 }, colors: [SUBJECTS[node.subjectId].color, '#FFF'] });
    }
  };

  const handleQuizAnswer = (qIndex, selectedOptIndex, correctOptIndex) => {
    if (qz[qIndex]) return; // already answered correctly

    if (selectedOptIndex === correctOptIndex) {
      const newQz = [...qz];
      newQz[qIndex] = true;
      onUpdate({ quizDone: { ...state.quizDone, [node.id]: newQz } });
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 }, colors:['#86E3CE','#FFD166']});
    } else {
      setSelectedWrong(prev => ({
        ...prev,
        [qIndex]: selectedOptIndex
      }));
    }
  };

  const subject = SUBJECTS[node.subjectId];

  return (
    <div className="overlay open">
      <div className="modal">
        <button className="close" onClick={onClose}>×</button>
        
        <div className="modal-head">
          <div className="icon">{node.icon || subject.icon}</div>
          <h2>{node.title}</h2>
        </div>
        
        <div className="desc">{node.desc}</div>
        
        {node.tip && (
          <div className="tip-box">💡 {node.tip}</div>
        )}
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setActiveTab('subtopics')}
            style={{
              flex: 1, padding: '10px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
              background: activeTab === 'subtopics' ? subject.color : '#EEE',
              color: activeTab === 'subtopics' ? '#FFF' : '#888'
            }}
          >
            Görevler
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            style={{
              flex: 1, padding: '10px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
              background: activeTab === 'quiz' ? subject.color : '#EEE',
              color: activeTab === 'quiz' ? '#FFF' : '#888'
            }}
          >
            Mini Test
          </button>
          <button 
            onClick={() => setActiveTab('books')}
            style={{
              flex: 1, padding: '10px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
              background: activeTab === 'books' ? subject.color : '#EEE',
              color: activeTab === 'books' ? '#FFF' : '#888'
            }}
          >
            Kaynaklar
          </button>
          <button 
            onClick={() => setActiveTab('youtube')}
            style={{
              flex: 1, padding: '10px', borderRadius: '15px', border: 'none', fontWeight: 'bold', cursor: 'pointer',
              background: activeTab === 'youtube' ? subject.color : '#EEE',
              color: activeTab === 'youtube' ? '#FFF' : '#888'
            }}
          >
            📺 YouTube
          </button>
        </div>

        {activeTab === 'subtopics' && (
          <div style={{ marginTop: '20px' }}>
            <div className="section-label">Konu Başlıkları</div>
            {node.subtopics.map((sub, i) => (
              <label key={i} className={`sub-item ${subs[i] ? 'checked' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={subs[i] || false}
                  onChange={() => handleSubToggle(i)}
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div style={{ marginTop: '20px' }}>
            <div className="section-label">Minik Bilgi Testi</div>
            {node.quiz.map((q, qIndex) => (
              <div key={qIndex} className="quiz-q">
                <p>Soru {qIndex + 1}: {q.q}</p>
                <div>
                  {q.opts.map((opt, oIndex) => {
                    const isCorrect = qz[qIndex] && q.answer === oIndex;
                    const isWrong = selectedWrong[qIndex] === oIndex;
                    
                    let cls = '';
                    if (isCorrect) cls = 'correct';
                    else if (isWrong) cls = 'wrong';

                    return (
                      <button 
                        key={oIndex}
                        className={`opt ${cls}`}
                        disabled={qz[qIndex]}
                        onClick={() => handleQuizAnswer(qIndex, oIndex, q.answer)}
                      >
                        {String.fromCharCode(65 + oIndex)}) {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'books' && (
          <div style={{ marginTop: '20px' }}>
            <div className="section-label">Çözdüğüm Test Kitapları</div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input 
                type="text" 
                placeholder="Örn: Okyanus Master..." 
                value={newBookName}
                onChange={(e) => setNewBookName(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', borderRadius: '12px', border: '2px solid #F0E6F5', fontFamily: 'inherit', fontWeight: '600' }}
              />
              <button 
                onClick={handleAddBook}
                style={{ padding: '0 20px', borderRadius: '12px', border: 'none', background: 'var(--accent-pink)', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Ekle
              </button>
            </div>

            {subjectBooks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#888', fontStyle: 'italic', background: '#FAFAFA', borderRadius: '12px' }}>
                Henüz bu ders için bir test kitabı eklemedin. Hemen yukarıdan ekleyebilirsin!
              </div>
            ) : (
              subjectBooks.map((bookName, i) => (
                <label key={i} className={`sub-item ${bp[bookName] ? 'checked' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={bp[bookName] || false}
                    onChange={() => handleBookToggle(bookName)}
                  />
                  <span>{bookName}</span>
                  {bp[bookName] && <span style={{ marginLeft: 'auto', color: 'var(--accent-mint)' }}>+20 XP</span>}
                </label>
              ))
            )}
          </div>
        )}

        {activeTab === 'youtube' && (
          <div style={{ marginTop: '20px' }}>
            <div className="section-label">📺 YouTube LGS Dersleri</div>
            <p style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-light)', marginBottom: '12px' }}>
              Zeynep, aşağıdan izlemek istediğin hocayı seçtiğinde doğrudan o konunun LGS dersi açılır:
            </p>

            {/* General LGS Search Button */}
            <div style={{ marginBottom: '16px' }}>
              <button 
                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent('8. Sınıf LGS ' + node.title + ' konu anlatımı')}`, '_blank')}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: '#FF0000', color: '#FFF', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px', boxShadow: '0 4px 12px rgba(255,0,0,0.2)' }}
              >
                🔴 Genel LGS Konu Anlatımı Ara 🔍
              </button>
            </div>

            {/* Subject Specific Teachers Quick Search */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>Hoca Seçenekleri 🎓</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(TEACHERS_PER_SUBJECT[node.subjectId] || []).map((teacher, idx) => (
                  <button
                    key={idx}
                    onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(teacher.query + ' ' + node.title)}`, '_blank')}
                    style={{
                      background: '#FFF',
                      border: '2px solid #FFE6EB',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'var(--accent-pink)';
                      e.target.style.background = '#FFF8FA';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#FFE6EB';
                      e.target.style.background = '#FFF';
                    }}
                  >
                    🎓 {teacher.name} ile İzle
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '6px', color: 'var(--text-light)' }}>
                İzlediğin Hocanın veya Videonun Adı:
              </label>
              <input 
                type="text" 
                placeholder="Örn: Rehber Matematik - 1. Gün Kampı..." 
                value={state.youtubeLogs?.[node.id] || ''}
                onChange={(e) => {
                  onUpdate({
                    youtubeLogs: {
                      ...(state.youtubeLogs || {}),
                      [node.id]: e.target.value
                    }
                  });
                }}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '2px solid #F0E6F5', fontFamily: 'inherit', fontWeight: '600' }}
              />
            </div>

            <label className={`sub-item ${(state.youtubeLogsProgress?.[node.id]) ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={state.youtubeLogsProgress?.[node.id] || false}
                disabled={!(state.youtubeLogs?.[node.id]?.trim())}
                onChange={(e) => {
                  const completed = e.target.checked;
                  onUpdate({
                    youtubeLogsProgress: {
                      ...(state.youtubeLogsProgress || {}),
                      [node.id]: completed
                    }
                  });
                  if (completed) {
                    confetti({ particleCount: 30, spread: 40, colors: ['#FF0000', '#FFF'] });
                  }
                }}
              />
              <span>Konu Anlatım Videosunu İzledim</span>
              {state.youtubeLogsProgress?.[node.id] && <span style={{ marginLeft: 'auto', color: 'var(--accent-mint)' }}>+20 XP</span>}
            </label>
            {!(state.youtubeLogs?.[node.id]?.trim()) && (
              <span style={{ fontSize: '11px', color: '#888', fontStyle: 'italic', display: 'block', marginTop: '4px' }}>
                * Önce izlediğin videonun adını yazmalısın.
              </span>
            )}
          </div>
        )}
        
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Haritaya Dön 🗺️</button>
        </div>
      </div>
    </div>
  );
}

export default NodeModal;
