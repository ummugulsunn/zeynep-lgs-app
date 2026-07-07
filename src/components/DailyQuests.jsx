import React from 'react';
import confetti from 'canvas-confetti';

function DailyQuests({ state, handleUpdateState }) {
  const toggleDaily = (type) => {
    const isChecked = !state.daily[type];
    
    const newDaily = { ...state.daily, [type]: isChecked };
    let newXP = state.dailyXP || 0;
    
    if (isChecked) {
      newXP += 15;
      confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 }, colors:['#FF9BBE','#86E3CE'] });
    } else {
      newXP -= 15;
    }
    
    handleUpdateState({ daily: newDaily, dailyXP: newXP });
  };

  return (
    <div className="daily-quests">
      <h3>📅 Günlük Görevler</h3>
      <div className="daily-list">
        <label className={`daily-item ${state.daily.paragraf ? 'done' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={state.daily.paragraf || false}
              onChange={() => toggleDaily('paragraf')}
            />
            <span>20 Paragraf Sorusu 📚</span>
          </div>
          <span style={{ color: 'var(--accent-purple)', fontSize: '13px' }}>+15 XP</span>
        </label>
        
        <label className={`daily-item ${state.daily.problem ? 'done' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={state.daily.problem || false}
              onChange={() => toggleDaily('problem')}
            />
            <span>20 Problem Sorusu 🧠</span>
          </div>
          <span style={{ color: 'var(--accent-purple)', fontSize: '13px' }}>+15 XP</span>
        </label>
      </div>
    </div>
  );
}

export default DailyQuests;
