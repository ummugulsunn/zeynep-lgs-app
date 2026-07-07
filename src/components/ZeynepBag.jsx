import React, { useState } from 'react';
import FocusRoom from './FocusRoom';
import RewardChest from './RewardChest';
import MistakeMonster from './MistakeMonster';

function ZeynepBag({ state, onUpdate, currentXP, isAdmin }) {
  const [activeSubTab, setActiveSubTab] = useState('focus');

  const subTabs = [
    { id: 'focus', label: 'Odaklanma Odası', icon: '⏱️', color: 'var(--accent-pink)' },
    { id: 'rewards', label: 'Ödül Sandığı', icon: '🎁', color: 'var(--accent-yellow)' },
    { id: 'mistakes', label: 'Hata Canavarı', icon: '👾', color: 'var(--accent-purple)' },
    ...(isAdmin ? [{ id: 'inbox', label: 'Posta Ayarları', icon: '💌', color: '#D4A000' }] : [])
  ];

  const [messageInput, setMessageInput] = useState(state.siblingMessage || '');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div className="dash-card" style={{ marginBottom: '30px', padding: '25px' }}>
        <h2 style={{ color: 'var(--accent-pink)', marginTop: 0, marginBottom: '10px', fontFamily: 'Baloo 2', fontSize: '28px' }}>
          Zeynep'in Sihirli Çantası 🎒
        </h2>
        <p style={{ color: 'var(--text-light)', fontSize: '15px', fontWeight: '600', margin: 0 }}>
          Süreci eğlenceli hale getirmek için ihtiyacın olan tüm araçlar burada saklı.
        </p>
        
        {/* Inner sub-tabs */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px', flexWrap: 'wrap' }}>
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '10px 18px',
                borderRadius: '20px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'Quicksand, sans-serif',
                transition: 'all 0.2s',
                background: activeSubTab === tab.id ? tab.color : '#FFF',
                color: activeSubTab === tab.id ? '#5C4B51' : 'var(--text-light)',
                boxShadow: activeSubTab === tab.id ? '0 4px 15px rgba(0,0,0,0.1)' : '0 2px 5px rgba(0,0,0,0.03)',
                border: activeSubTab === tab.id ? '2px solid #FFF' : '2px solid #EEE'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Sub-Views */}
      {activeSubTab === 'focus' && (
        <FocusRoom state={state} onUpdate={onUpdate} />
      )}
      {activeSubTab === 'rewards' && (
        <RewardChest state={state} onUpdate={onUpdate} currentXP={currentXP} isAdmin={isAdmin} />
      )}
      {activeSubTab === 'mistakes' && (
        <MistakeMonster state={state} onUpdate={onUpdate} isAdmin={isAdmin} />
      )}
      {activeSubTab === 'inbox' && (
        <div className="dash-card" style={{ padding: '25px', textAlign: 'center' }}>
          <h3 style={{ color: '#D4A000', fontFamily: 'Baloo 2', fontSize: '24px', margin: '0 0 15px' }}>
            Abladan Gelen Posta (Abla Modu) 💌
          </h3>
          <p style={{ color: 'var(--text-light)', fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}>
            Zeynep ana sayfaya girdiğinde göreceği notu buradan değiştirebilirsin.
          </p>
          <textarea 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: '100px',
              padding: '15px',
              borderRadius: '15px',
              border: '2px dashed #D4A000',
              fontFamily: 'inherit',
              fontWeight: 'bold',
              fontSize: '15px',
              color: 'var(--text-main)',
              resize: 'none',
              marginBottom: '20px'
            }}
            placeholder="Zeynep'e motive edici bir şeyler yaz..."
          />
          <br/>
          <button 
            className="btn"
            onClick={() => {
              onUpdate({ siblingMessage: messageInput });
              alert('Posta başarıyla Zeynep\'e gönderildi! 💌');
            }}
            style={{ background: '#D4A000' }}
          >
            Postayı Gönder 🚀
          </button>

          <div style={{ marginTop: '40px', borderTop: '2px dashed #E2D4C9', paddingTop: '30px' }}>
            <h4 style={{ color: '#D13A6B', fontFamily: 'Baloo 2', fontSize: '18px', margin: '0 0 10px' }}>
              ⚠️ Sistemi Sıfırla (Temiz Başlangıç)
            </h4>
            <p style={{ color: 'var(--text-light)', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.4' }}>
              Zeynep çalışmaya başlamadan önce tüm deneme girişlerini, test verilerini, canavarları ve XP'yi sıfırlayarak uygulamayı sıfırdan başlatabilirsin.
            </p>
            <button 
              onClick={() => {
                if (window.confirm('Tüm verileri sıfırlamak ve temiz bir başlangıç yapmak istediğine emin misin? Bu işlem geri alınamaz!')) {
                  onUpdate({
                    xp: 0,
                    streak: 0,
                    lastActive: null,
                    completed: {},
                    quizDone: {},
                    daily: { date: '', paragraf: false, problem: false },
                    dailyXP: 0,
                    books: {},
                    bookProgress: {},
                    rewards: [
                      { id: 'r1', name: 'En sevdiğin tatlı / dondurma 🍦', xpRequired: 500, status: 'locked' },
                      { id: 'r2', name: '1 Saat Bilgisayar / Konsol saati 🎮', xpRequired: 1000, status: 'locked' },
                      { id: 'r3', name: 'Birlikte sinema keyfi 🎬', xpRequired: 2000, status: 'locked' }
                    ],
                    mistakes: [],
                    focusHistory: [],
                    dailyTargetDate: '',
                    dailyTargets: [],
                    targetScore: '',
                    practiceExams: [],
                    youtubeLogs: {},
                    youtubeLogsProgress: {},
                    siblingMessage: 'Ablan seni çok seviyor! Matematikten korkmak yok! 💖',
                    readingStreak: { currentStreak: 0, highestStreak: 0, lastDate: null }
                  });
                  alert('Sistem başarıyla sıfırlandı! Zeynep artık 0\'dan başlayabilir. 🚀');
                }
              }}
              style={{
                background: '#D13A6B',
                color: '#FFF',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '13px',
                boxShadow: '0 4px 12px rgba(209,58,107,0.3)'
              }}
            >
              Verileri Sıfırla 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZeynepBag;
