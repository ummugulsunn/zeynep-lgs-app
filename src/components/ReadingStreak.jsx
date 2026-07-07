import React from 'react';
import confetti from 'canvas-confetti';

function ReadingStreak({ state, onUpdate }) {
  const streak = state.readingStreak || { currentStreak: 0, highestStreak: 0, lastDate: null };
  const today = new Date().toISOString().split('T')[0];
  const isDoneToday = streak.lastDate === today;

  const handleMarkDone = () => {
    if (isDoneToday) return;

    let newCurrent = streak.currentStreak + 1;
    // Check if yesterday was the last date. If not, reset streak.
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (streak.lastDate && streak.lastDate !== yesterdayStr && streak.lastDate !== today) {
      newCurrent = 1; // broken streak
    }

    const newHighest = Math.max(newCurrent, streak.highestStreak || 0);

    const newStreakState = {
      currentStreak: newCurrent,
      highestStreak: newHighest,
      lastDate: today
    };

    onUpdate({ readingStreak: newStreakState });
    
    // Confetti effect
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF5E3A', '#FF9500', '#FF3B30']
    });
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '20px 24px',
      border: '2px solid rgba(255, 255, 255, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      margin: '0 auto',
      width: '100%',
      boxShadow: '0 10px 30px rgba(255, 155, 190, 0.2)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF9500, #FF5E3A)',
          width: '40px', height: '40px',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', flexShrink: 0,
          filter: isDoneToday ? 'none' : 'grayscale(100%) opacity(0.3)',
          transition: 'all 0.3s',
          boxShadow: isDoneToday ? '0 4px 10px rgba(255,94,58,0.4)' : 'none'
        }}>
          🔥
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '12px', color: '#E65C00', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Paragraf & Kitap Zinciri</div>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-main)', fontWeight: '700' }}>
            Güncel Seri: <span style={{ color: '#E65C00' }}>{streak.currentStreak} Gün</span> <span style={{ fontSize: '12px', color: '#A0A0A0' }}>(En Yüksek: {streak.highestStreak})</span>
          </p>
        </div>
      </div>
      
      <button 
        onClick={handleMarkDone}
        disabled={isDoneToday}
        style={{
          background: isDoneToday ? '#FFF5ED' : '#FF5E3A',
          color: isDoneToday ? '#E65C00' : '#FFF',
          border: 'none',
          padding: '12px 18px',
          borderRadius: '14px',
          fontWeight: '800',
          cursor: isDoneToday ? 'default' : 'pointer',
          transition: 'all 0.2s',
          fontSize: '13px',
          boxShadow: isDoneToday ? 'none' : '0 4px 12px rgba(255,94,58,0.3)'
        }}
      >
        {isDoneToday ? 'Bugün Okundu ✔️' : 'Bugün Okudum! 📚'}
      </button>
    </div>
  );
}

export default ReadingStreak;
