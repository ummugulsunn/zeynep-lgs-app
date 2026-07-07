import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const SUBJECTS = [
  { id: 'matematik', name: 'Matematik', icon: '📐', color: '#FF9BBE' },
  { id: 'turkce', name: 'Türkçe', icon: '📘', color: '#86E3CE' },
  { id: 'fen', name: 'Fen Bilimleri', icon: '🧪', color: '#FFD166' },
  { id: 'inkilap', name: 'İnkılap Tarihi', icon: '🗺️', color: '#B593FF' },
  { id: 'ingilizce', name: 'İngilizce', icon: '💬', color: '#A3E2F7' },
  { id: 'din', name: 'Din Kültürü', icon: '🕌', color: '#FBC4B6' }
];

function MistakeMonster({ state, onUpdate, isAdmin }) {
  const [selectedSubject, setSelectedSubject] = useState('matematik');
  const [detail, setDetail] = useState('');

  const mistakes = state.mistakes || [];

  const handleAddMistake = () => {
    if (!detail.trim()) return;
    const newMistake = {
      id: 'm_' + Date.now(),
      subjectId: selectedSubject,
      detail: detail.trim(),
      solved: false,
      date: new Date().toLocaleDateString('tr-TR')
    };

    onUpdate({
      mistakes: [newMistake, ...mistakes]
    });
    setDetail('');
  };

  const handleTameMistake = (id) => {
    confetti({ particleCount: 60, spread: 80, colors: ['#86E3CE', '#FFF'] });
    onUpdate({
      mistakes: mistakes.map(m => m.id === id ? { ...m, solved: true } : m)
    });
  };

  const handleDeleteMistake = (id) => {
    onUpdate({
      mistakes: mistakes.filter(m => m.id !== id)
    });
  };

  return (
    <div className="dash-card" style={{ padding: '30px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '24px' }}>👾 Hata Canavarı</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '14px', margin: '4px 0 0' }}>
            Çözemediğin veya yanlış yaptığın soruları buraya fırlat. Birlikte evcilleştirelim!
          </p>
        </div>
      </div>

      {/* Add Mistake Form */}
      <div style={{ background: '#FFF0F5', borderRadius: '16px', padding: '16px', marginBottom: '24px', border: '2px solid #FFF' }}>
        <h4 style={{ margin: '0 0 12px', color: 'var(--accent-pink)', fontFamily: 'Baloo 2', fontSize: '18px' }}>
          Canavara Yeni Soru Fırlat! ☄️
        </h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ padding: '10px', borderRadius: '12px', border: '1px solid #CCC', fontFamily: 'inherit', fontWeight: 'bold' }}
          >
            {SUBJECTS.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.icon} {sub.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Sorunun yerini yaz (Örn: Çarpanlar Test 4 Soru 8...)"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '10px', borderRadius: '12px', border: '1px solid #CCC', fontFamily: 'inherit', fontWeight: '600' }}
          />
          <button
            onClick={handleAddMistake}
            style={{
              padding: '10px 20px', borderRadius: '12px', border: 'none', background: 'var(--accent-pink)',
              color: '#FFF', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Canavara At 👾
          </button>
        </div>
      </div>

      {/* Mistake List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {mistakes.map(m => {
          const sub = SUBJECTS.find(s => s.id === m.subjectId) || SUBJECTS[0];
          return (
            <div
              key={m.id}
              style={{
                background: '#FFF',
                border: m.solved ? '2px solid var(--accent-mint)' : '2px solid #FFE6EB',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Solved/Unsolved status indicator */}
                <div style={{ fontSize: '32px' }}>
                  {m.solved ? '🐱💖' : '👾👹'}
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-light)' }}>
                    {sub.icon} {sub.name} · {m.date}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '4px', textDecoration: m.solved ? 'line-through' : 'none' }}>
                    {m.detail}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Actions */}
                {!m.solved ? (
                  isAdmin ? (
                    <button
                      onClick={() => handleTameMistake(m.id)}
                      style={{
                        padding: '8px 16px', borderRadius: '12px', border: 'none', background: 'var(--accent-mint)',
                        color: '#268C72', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px'
                      }}
                    >
                      Evcilleştir ⚔️ (+15 XP)
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-pink)', background: '#FFEBF0', padding: '4px 8px', borderRadius: '8px' }}>
                      Yardım Bekliyor ⏳
                    </span>
                  )
                ) : (
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#268C72', background: '#E6FBF5', padding: '4px 8px', borderRadius: '8px' }}>
                    Evcilleştirildi! ✨
                  </span>
                )}

                {isAdmin && (
                  <button
                    onClick={() => handleDeleteMistake(m.id)}
                    style={{
                      border: 'none', background: '#FFEBF0', color: '#D13A6B',
                      width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {mistakes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '30px', color: '#999', fontStyle: 'italic' }}>
          Şu an hiç hata canavarı yok. Buralar tamamen güvenli! 🥳
        </div>
      )}
    </div>
  );
}

export default MistakeMonster;
