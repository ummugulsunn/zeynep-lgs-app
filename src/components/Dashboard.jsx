import React, { useState } from 'react';

const EFFORT_BADGES = [
  { id: 'b_first_step', name: 'İlk Adım', desc: 'İlk konu adımını tamamladın! 🚀', icon: '🚀', check: (s) => Object.values(s.completed || {}).some(arr => arr.some(Boolean)) },
  { id: 'b_focus_master', name: 'Odaklanma Ustası', desc: '3 kez odaklanma çalışması yaptın! ⏱️', icon: '⏱️', check: (s) => (s.focusHistory || []).length >= 3 },
  { id: 'b_brave_heart', name: 'Cesur Yürek', desc: 'İlk Hata Canavarını listene ekledin! 🦁', icon: '🦁', check: (s) => (s.mistakes || []).length >= 1 },
  { id: 'b_persistent', name: 'İnatçı Çalışkan', desc: '40 dakikalık bir odaklanma seansı tamamladın! 🏔️', icon: '🏔️', check: (s) => (s.focusHistory || []).some(f => f.duration >= 40) },
  { id: 'b_book_lover', name: 'Kitap Dostu', desc: 'Kaynaklardan 3 kitabı tamamladın! 📖', icon: '📖', check: (s) => {
      let count = 0;
      Object.values(s.bookProgress || {}).forEach(bp => {
        count += Object.values(bp).filter(Boolean).length;
      });
      return count >= 3;
    } 
  },
  { id: 'b_monster_tamer', name: 'Canavar Terbiyecisi', desc: 'İlk hata canavarını ablanla evcilleştirdin! 🧙‍♀️', icon: '🧙‍♀️', check: (s) => (s.mistakes || []).some(m => m.solved) },
  { id: 'b_yt_explorer', name: 'YouTube Kaşifi', desc: 'YouTube günlüğüne 3 ders videosu kaydettin! 📺', icon: '📺', check: (s) => Object.values(s.youtubeLogsProgress || {}).filter(Boolean).length >= 3 },
  { id: 'b_steady_flame', name: 'İstikrarlı Alev', desc: 'Kitap okuma zincirinde 3 güne ulaştın! 🔥', icon: '🔥', check: (s) => (s.readingStreak?.currentStreak || 0) >= 3 }
];

function Dashboard({ state, subjects, onUpdate }) {
  // Calculate progress for each subject
  const getSubjectProgress = (subject) => {
    let totalItems = 0;
    let completedItems = 0;
    
    subject.nodes.forEach(n => {
      totalItems += n.subtopics.length + n.quiz.length;
      
      const subs = state.completed[n.id] || [];
      completedItems += subs.filter(Boolean).length;
      
      const qz = state.quizDone[n.id] || [];
      completedItems += qz.filter(Boolean).length;
    });
    
    return totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  };

  // Find strong and weak topics based on quiz scores
  const getTopics = () => {
    const strong = [];
    const weak = [];
    
    Object.values(subjects).forEach(subject => {
      subject.nodes.forEach(n => {
        const qz = state.quizDone[n.id] || [];
        if (qz.length === n.quiz.length) {
          const correctCount = qz.filter(Boolean).length;
          const ratio = correctCount / n.quiz.length;
          if (ratio === 1) {
            strong.push({ subject: subject.name, title: n.title });
          } else if (ratio < 0.5) {
            weak.push({ subject: subject.name, title: n.title });
          }
        }
      });
    });
    return { strong, weak };
  };

  const { strong, weak } = getTopics();

  const [showAddForm, setShowAddForm] = useState(false);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState(new Date().toISOString().split('T')[0]);
  const [examScore, setExamScore] = useState('');
  
  const [corrects, setCorrects] = useState({ turkce: 0, matematik: 0, fen: 0, inkilap: 0, ingilizce: 0, din: 0 });
  const [wrongs, setWrongs] = useState({ turkce: 0, matematik: 0, fen: 0, inkilap: 0, ingilizce: 0, din: 0 });

  const isAdminMod = () => true;

  const handleAddExam = (e) => {
    e.preventDefault();
    if (!examName.trim() || !examScore) return;

    const netler = {};
    Object.keys(corrects).forEach(subKey => {
      const c = parseInt(corrects[subKey]) || 0;
      const w = parseInt(wrongs[subKey]) || 0;
      netler[subKey] = parseFloat((c - w / 3).toFixed(2));
    });

    const newExam = {
      id: 'ex_' + Date.now(),
      name: examName.trim(),
      date: examDate,
      score: parseInt(examScore) || 0,
      corrects,
      wrongs,
      netler
    };

    const updatedExams = [...(state.practiceExams || []), newExam];
    onUpdate({ practiceExams: updatedExams });

    setExamName('');
    setExamScore('');
    setCorrects({ turkce: 0, matematik: 0, fen: 0, inkilap: 0, ingilizce: 0, din: 0 });
    setWrongs({ turkce: 0, matematik: 0, fen: 0, inkilap: 0, ingilizce: 0, din: 0 });
    setShowAddForm(false);
  };

  const handleDeleteExam = (id) => {
    onUpdate({
      practiceExams: (state.practiceExams || []).filter(e => e.id !== id)
    });
  };

  const sortedExams = [...(state.practiceExams || [])].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: 'var(--accent-purple)', textAlign: 'center', marginBottom: '30px' }}>
        Zeynep'in İlerleme Karnesi 📊
      </h2>

      {/* Gelişim ve Çaba Rozetleri */}
      <div className="dash-card" style={{ marginBottom: '30px', padding: '25px' }}>
        <h3 style={{ color: 'var(--accent-pink)', marginBottom: '5px' }}>🏆 Gelişim & Çaba Rozetlerim</h3>
        <p style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 'bold', margin: '0 0 20px', lineHeight: '1.4' }}>
          Zeynep, LGS yolculuğundaki harika çabaların ve istikrarın buraları aydınlatıyor! ✨
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '15px'
        }}>
          {EFFORT_BADGES.map(badge => {
            const unlocked = badge.check(state);
            return (
              <div 
                key={badge.id}
                style={{
                  background: unlocked ? '#FFF8FA' : '#FAFAFA',
                  border: unlocked ? '2px solid var(--accent-pink)' : '2px dashed #E2D4C9',
                  borderRadius: '20px',
                  padding: '16px 10px',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: unlocked ? '0 6px 15px rgba(255,155,190,0.15)' : 'none',
                  filter: unlocked ? 'none' : 'grayscale(100%) opacity(0.4)',
                  cursor: 'help'
                }}
                title={badge.desc}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{badge.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)', fontFamily: 'Baloo 2' }}>{badge.name}</div>
                <div style={{ fontSize: '11px', color: unlocked ? 'var(--accent-pink)' : 'var(--text-light)', marginTop: '4px', fontWeight: '800' }}>
                  {unlocked ? '🔓 Açıldı!' : '🔒 Kilitli'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="dash-card" style={{ marginBottom: '30px' }}>
        <h3>Genel İlerleme Durumu</h3>
        {Object.values(subjects).map(sub => {
          const pct = getSubjectProgress(sub);
          return (
            <div key={sub.id} style={{ marginBottom: '15px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: 'bold' }}>
                <span>{sub.icon} {sub.name}</span>
                <span>%{pct}</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${pct}%`, background: sub.color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h3>🌟 Yıldızlı Konular (Güçlü)</h3>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Testlerini fullediği veya çok iyi yaptığı konular.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {strong.length === 0 ? <p style={{fontSize:'14px', color:'#999'}}>Henüz yıldızlı konu yok, test çözmeye devam!</p> : null}
            {strong.map((t, i) => (
              <span key={i} className="topic-pill strong">{t.title}</span>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <h3>⚠️ Tekrar Edilmeli (Zayıf)</h3>
          <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Testlerinde çok yanlış çıkan konular.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {weak.length === 0 ? <p style={{fontSize:'14px', color:'#999'}}>Harika! Şu an uyarı veren zayıf konu yok.</p> : null}
            {weak.map((t, i) => (
              <span key={i} className="topic-pill weak">{t.title} ({t.subject})</span>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: '30px' }}>
        <h3>📚 Test Kitapları Çetelesi</h3>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>Hangi konuyu hangi test kitabından bitirdiğini buradan takip edebilirsin.</p>
        
        {!Object.values(subjects).some(sub => (state.books?.[sub.id] || []).length > 0) ? (
          <p style={{fontSize:'14px', color:'#999'}}>Henüz hiçbir ders için test kitabı eklenmemiş.</p>
        ) : (
          Object.values(subjects).map(sub => {
            const subBooks = state.books?.[sub.id] || [];
            if (subBooks.length === 0) return null;

            return (
              <div key={sub.id} style={{ marginBottom: '30px', textAlign: 'left', background: '#FAFAFA', padding: '15px', borderRadius: '15px' }}>
                <h4 style={{ color: sub.color, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', margin: '0 0 10px 0' }}>
                  {sub.icon} {sub.name}
                </h4>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', background: '#FFF', borderRadius: '10px', overflow: 'hidden' }}>
                    <thead style={{ background: '#F0E6F5' }}>
                      <tr>
                        <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-main)', minWidth: '180px' }}>Konu Adı</th>
                        {subBooks.map((b, i) => (
                          <th key={i} style={{ padding: '12px', textAlign: 'center', color: 'var(--text-main)' }}>{b}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sub.nodes.map((n, idx) => {
                        const bp = state.bookProgress?.[n.id] || {};
                        return (
                          <tr key={n.id} style={{ borderBottom: '1px solid #EEE' }}>
                            <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                              {idx + 1}. {n.title}
                            </td>
                            {subBooks.map((b, i) => (
                              <td key={i} style={{ padding: '12px', textAlign: 'center' }}>
                                {bp[b] ? (
                                  <span style={{ background: '#E6FBF5', color: '#268C72', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>✅ Çözüldü</span>
                                ) : (
                                  <span style={{ color: '#DDD', fontSize: '12px' }}>-</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="dash-card" style={{ marginTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ margin: 0 }}>📊 LGS Deneme Sınavı Takibi</h3>
            <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>Girdiğin deneme sonuçlarını kaydedip gelişimini izle.</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            {showAddForm ? 'Kapat ❌' : 'Yeni Deneme Ekle ➕'}
          </button>
        </div>

        {/* Add Exam Form */}
        {showAddForm && (
          <form onSubmit={handleAddExam} style={{ background: '#FFF9E6', border: '2px dashed var(--accent-yellow)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
            <h4 style={{ margin: '0 0 15px', color: '#8F763B', fontFamily: 'Baloo 2', fontSize: '18px' }}>Yeni Deneme Sınavı Ekle 📝</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Deneme Adı</label>
                <input 
                  type="text" 
                  placeholder="Örn: Özdebir LGS 1" 
                  value={examName} 
                  onChange={(e) => setExamName(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #CCC', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Sınav Tarihi</label>
                <input 
                  type="date" 
                  value={examDate} 
                  onChange={(e) => setExamDate(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #CCC', fontFamily: 'inherit' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>LGS Puanı (Maks 500)</label>
                <input 
                  type="number" 
                  placeholder="Örn: 365" 
                  value={examScore} 
                  onChange={(e) => setExamScore(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid #CCC', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-main)', borderBottom: '1px solid #E2D4C9', paddingBottom: '6px', marginBottom: '12px' }}>
              Ders Doğru / Yanlış Sayıları
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              {Object.values(subjects).map(sub => (
                <div key={sub.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF', padding: '10px', borderRadius: '10px', border: '1px solid #E2D4C9' }}>
                  <span style={{ fontSize: '20px' }}>{sub.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{sub.name}</span>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <input 
                        type="number" 
                        placeholder="D" 
                        value={corrects[sub.id] || ''} 
                        onChange={(e) => setCorrects({ ...corrects, [sub.id]: e.target.value })}
                        style={{ width: '100%', padding: '4px', borderRadius: '6px', border: '1px solid #CCC', textAlign: 'center', fontSize: '12px' }}
                      />
                      <input 
                        type="number" 
                        placeholder="Y" 
                        value={wrongs[sub.id] || ''} 
                        onChange={(e) => setWrongs({ ...wrongs, [sub.id]: e.target.value })}
                        style={{ width: '100%', padding: '4px', borderRadius: '6px', border: '1px solid #CCC', textAlign: 'center', fontSize: '12px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className="btn">Deneme Kaydet 💾</button>
          </form>
        )}

        {/* Exam List Table */}
        {sortedExams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#999', fontStyle: 'italic', background: '#FAFAFA', borderRadius: '12px' }}>
            Henüz deneme sınavı sonucu girilmemiş. Zeynep deneme çözmeye başladığında buradan takip edebilirsin!
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #EEE' }}>
                  <th style={{ padding: '12px' }}>Deneme Adı / Tarih</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>LGS Puanı</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Gelişim</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Mat Net</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Türkçe Net</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Fen Net</th>
                  {isAdminMod() && <th style={{ padding: '12px', textAlign: 'center' }}>İşlem</th>}
                </tr>
              </thead>
              <tbody>
                {sortedExams.map((exam, idx) => {
                  let difference = null;
                  if (idx > 0) {
                    difference = exam.score - sortedExams[idx - 1].score;
                  }

                  return (
                    <tr key={exam.id} style={{ borderBottom: '1px solid #EEE' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ fontWeight: 'bold' }}>{exam.name}</div>
                        <div style={{ fontSize: '11px', color: '#999' }}>{exam.date}</div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: 'var(--accent-purple)' }}>
                        {exam.score}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {difference !== null ? (
                          difference > 0 ? (
                            <span style={{ color: '#268C72', fontWeight: 'bold' }}>▲ +{difference}</span>
                          ) : difference < 0 ? (
                            <span style={{ color: '#D13A6B', fontWeight: 'bold' }}>▼ {difference}</span>
                          ) : (
                            <span style={{ color: '#888' }}>=</span>
                          )
                        ) : (
                          <span style={{ color: '#AAA', fontSize: '12px' }}>İlk Sınav</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{exam.netler?.matematik ?? 0}</td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{exam.netler?.turkce ?? 0}</td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{exam.netler?.fen ?? 0}</td>
                      {isAdminMod() && (
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeleteExam(exam.id)}
                            style={{ border: 'none', background: '#FFEBF0', color: '#D13A6B', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                          >
                            Sil
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
