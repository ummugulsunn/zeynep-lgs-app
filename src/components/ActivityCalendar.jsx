import { useState } from 'react';

const ActivityCalendar = ({ state }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust so Monday is 0
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Helper to format date locally as YYYY-MM-DD
  const formatDate = (y, m, d) => {
    const pad = (n) => n.toString().padStart(2, '0');
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  };

  const getDayData = (dateStr) => {
    const history = (state.activityHistory && state.activityHistory[dateStr]) || null;
    
    // Focus sessions for this date
    const focusHistory = state.focusHistory || [];
    const focusSessions = focusHistory.filter(f => f.date && f.date.startsWith(dateStr));
    const focusMinutes = focusSessions.reduce((acc, f) => acc + (f.duration || 0), 0);

    // Practice exams for this date
    const practiceExams = state.practiceExams || [];
    const exams = practiceExams.filter(e => e.date && e.date.startsWith(dateStr));

    const hasActivity = history || focusMinutes > 0 || exams.length > 0;

    return { history, focusMinutes, exams, hasActivity };
  };

  const renderDays = () => {
    const days = [];
    const todayStr = new Date().toISOString().split('T')[0];

    // Empty slots for previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDate(year, month, d);
      const isToday = dateStr === todayStr;
      const data = getDayData(dateStr);
      
      let bg = '#FAFAFA';
      if (data.hasActivity) {
        bg = '#E6FBF5'; // Light mint for activity
        if (data.history?.xpEarned > 50 || data.focusMinutes > 60) bg = '#BEEADD'; // Darker for more activity
      }

      days.push(
        <div 
          key={d} 
          className={`calendar-day ${isToday ? 'today' : ''}`}
          style={{ 
            background: bg, 
            cursor: data.hasActivity ? 'pointer' : 'default',
            border: isToday ? '2px solid var(--accent-pink)' : '1.5px solid #EEE'
          }}
          onClick={() => {
            if (data.hasActivity) setSelectedDateStr(dateStr);
          }}
        >
          <span className="day-num">{d}</span>
          {data.hasActivity && <div className="activity-dot"></div>}
        </div>
      );
    }
    return days;
  };

  const selectedData = selectedDateStr ? getDayData(selectedDateStr) : null;

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-btn" onClick={prevMonth}>&lt;</button>
        <h2>{monthNames[month]} {year}</h2>
        <button className="nav-btn" onClick={nextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
          <div key={d} className="calendar-weekday">{d}</div>
        ))}
        {renderDays()}
      </div>

      <style>{`
        .calendar-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 2px solid rgba(255, 255, 255, 1);
          max-width: 600px;
          margin: 20px auto;
        }
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .calendar-header h2 {
          margin: 0;
          color: var(--accent-purple);
          font-family: 'Baloo 2', sans-serif;
        }
        .nav-btn {
          background: #F0E6F5;
          border: none;
          border-radius: 10px;
          width: 36px;
          height: 36px;
          font-size: 16px;
          font-weight: bold;
          color: var(--accent-purple);
          cursor: pointer;
        }
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
        }
        .calendar-weekday {
          text-align: center;
          font-weight: bold;
          color: var(--text-light);
          font-size: 13px;
          padding-bottom: 10px;
        }
        .calendar-day {
          aspect-ratio: 1;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.2s;
        }
        .calendar-day:not(.empty):hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        .day-num {
          font-weight: bold;
          color: var(--text-main);
          font-size: 14px;
        }
        .activity-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-mint);
          border-radius: 50%;
          margin-top: 4px;
        }
      `}</style>

      {selectedDateStr && selectedData && (
        <div className="overlay open" onClick={() => setSelectedDateStr(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'left', padding: '25px' }}>
            <h2 style={{ fontFamily: 'Baloo 2', color: 'var(--accent-purple)', margin: '0 0 15px', borderBottom: '2px solid #F0E6F5', paddingBottom: '10px' }}>
              📅 {selectedDateStr.split('-').reverse().join('.')}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {selectedData.history && (
                <>
                  <div style={{ background: '#F9F9F9', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>Görevler & Hedefler</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                      {selectedData.history.paragraf && <div>✅ 20 Paragraf Sorusu</div>}
                      {selectedData.history.problem && <div>✅ 20 Problem Sorusu</div>}
                      {(selectedData.history.targets || []).filter(t => t.completed).map((t, idx) => (
                         <div key={idx}>✅ {t.text}</div>
                      ))}
                      {!selectedData.history.paragraf && !selectedData.history.problem && !(selectedData.history.targets || []).filter(t => t.completed).length && (
                        <div style={{ color: '#999', fontWeight: 'normal' }}>Kaydedilmiş tamamlanan görev bulunamadı.</div>
                      )}
                    </div>
                  </div>
                  <div style={{ background: '#FFF0F5', padding: '12px', borderRadius: '12px', color: 'var(--accent-pink)', fontWeight: 'bold' }}>
                    🌟 Günlük XP Kazancı: {selectedData.history.xpEarned || 0} XP
                  </div>
                </>
              )}

              {selectedData.focusMinutes > 0 && (
                <div style={{ background: '#FFF9E6', padding: '12px', borderRadius: '12px', color: '#8F763B', fontWeight: 'bold' }}>
                  🍅 Odaklanma (Pomodoro): {selectedData.focusMinutes} Dakika
                </div>
              )}

              {selectedData.exams.length > 0 && (
                <div style={{ background: '#E6F0FA', padding: '12px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#4A90E2', marginBottom: '8px', textTransform: 'uppercase' }}>Deneme Sınavları</div>
                  {selectedData.exams.map((e, idx) => (
                    <div key={idx} style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                      📝 {e.score} Puan ({e.correct}D {e.wrong}Y)
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              className="btn" 
              onClick={() => setSelectedDateStr(null)}
              style={{ marginTop: '20px', width: '100%' }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCalendar;
