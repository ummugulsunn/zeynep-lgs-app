import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const ROOMS = [
  { id: 'cloud', name: 'Bulut Oda ☁️', bg: 'linear-gradient(135deg, #FFE1EA 0%, #E3E3FF 100%)', emojiActive: '🐱✍️', emojiSleep: '🐱💤', emojiDone: '🐱🎉', color: '#FF9BBE' },
  { id: 'library', name: 'Kütüphane 📚', bg: 'linear-gradient(135deg, #F5ECE3 0%, #E2D4C9 100%)', emojiActive: '🦉📚', emojiSleep: '🦉💤', emojiDone: '🦉🎉', color: '#B08E75' },
  { id: 'nature', name: 'Doğa Evi 🌲', bg: 'linear-gradient(135deg, #E6F5E3 0%, #CDEBD2 100%)', emojiActive: '🦊🍃', emojiSleep: '🦊💤', emojiDone: '🦊🎉', color: '#86E3CE' },
  { id: 'space', name: 'Uzay Üssü 🚀', bg: 'linear-gradient(135deg, #2D2B55 0%, #1E1E3F 100%)', emojiActive: '👽🚀', emojiSleep: '👽💤', emojiDone: '👽🎉', color: '#B593FF', isDark: true }
];

const TIME_OPTIONS = [
  { mins: 0, label: 'Serbest Kronometre ⏱️', xp: 'Dakika başına +1 XP' },
  { mins: 20, xp: 20 },
  { mins: 30, xp: 30 },
  { mins: 40, xp: 40 },
  { mins: 50, xp: 50 },
  { mins: 60, xp: 60 }
];

function FocusRoom({ state, onUpdate }) {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [duration, setDuration] = useState(30); // 0 means stopwatch
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionXP, setSessionXP] = useState(0);
  const timerRef = useRef(null);

  // Sync timeLeft when duration changes (only if timer is not active)
  useEffect(() => {
    if (!isActive && !isCompleted) {
      if (duration === 0) {
        setTimeLeft(0);
      } else {
        setTimeLeft(duration * 60);
      }
    }
  }, [duration, isActive, isCompleted]);

  // Tab change detection to pause focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        setIsActive(false);
        clearInterval(timerRef.current);
        alert(`Oops! Zeynep, başka sekmeye geçtin. ${selectedRoom.name} içindeki çalışman duraklatıldı! 💤 Geri dönüp devam etmelisin.`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, selectedRoom]);

  const startTimer = () => {
    if (isActive) return;
    setIsActive(true);
    setIsCompleted(false);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (duration === 0) {
          // Stopwatch (Count up)
          return prev + 1;
        } else {
          // Pomodoro (Count down)
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsActive(false);
            setIsCompleted(true);
            handleCompletion(duration);
            return 0;
          }
          return prev - 1;
        }
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    clearInterval(timerRef.current);
    setTimeLeft(duration === 0 ? 0 : duration * 60);
  };

  // Used only for Stopwatch mode to manually finish
  const finishStopwatch = () => {
    setIsActive(false);
    setIsCompleted(true);
    clearInterval(timerRef.current);
    
    const elapsedMinutes = Math.floor(timeLeft / 60);
    handleCompletion(elapsedMinutes);
  };

  const handleCompletion = (mins) => {
    const earnedXP = mins > 0 ? mins : 1; // min 1 XP
    setSessionXP(earnedXP);
    
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    
    const session = {
      date: new Date().toISOString().split('T')[0],
      duration: earnedXP // store duration as completed mins (which equals XP)
    };

    const currentHistory = state.focusHistory || [];
    onUpdate({
      focusHistory: [...currentHistory, session]
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="dash-card" 
      style={{ 
        padding: '30px', 
        textAlign: 'center', 
        background: selectedRoom.bg, 
        color: selectedRoom.isDark ? '#FFF' : 'var(--text-main)',
        transition: 'all 0.5s ease',
        border: '3px solid #FFF'
      }}
    >
      <h3 style={{ margin: '0 0 10px', fontSize: '24px', color: selectedRoom.isDark ? '#FFF' : 'inherit' }}>⏱️ Sevimli Çalışma Odası</h3>
      <p style={{ color: selectedRoom.isDark ? '#BBB' : 'var(--text-light)', fontSize: '14px', marginBottom: '20px' }}>
        Bir oda seç, süre belirle ve odaklan. Sekmeyi değiştirirsen oda arkadaşın üzülür ve süre durur!
      </p>

      {/* Room Selector */}
      {!isActive && !isCompleted && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {ROOMS.map(room => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              style={{
                padding: '8px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                fontFamily: 'Quicksand, sans-serif',
                background: selectedRoom.id === room.id ? room.color : '#FFF',
                color: selectedRoom.id === room.id ? (room.isDark ? '#FFF' : '#5C4B51') : '#888',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                border: '2px solid #EEE'
              }}
            >
              {room.name}
            </button>
          ))}
        </div>
      )}

      {/* Room Character Animation state */}
      <div style={{ fontSize: '80px', margin: '20px 0', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.15))' }}>
        {isCompleted ? selectedRoom.emojiDone : isActive ? selectedRoom.emojiActive : selectedRoom.emojiSleep}
      </div>

      <div style={{ fontSize: '56px', fontWeight: '800', fontFamily: 'Baloo 2', color: selectedRoom.isDark ? '#FFF' : 'var(--accent-purple)', margin: '10px 0' }}>
        {formatTime(timeLeft)}
      </div>

      {/* More Time options */}
      {!isActive && !isCompleted && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
          {TIME_OPTIONS.map(opt => (
            <button
              key={opt.mins}
              onClick={() => setDuration(opt.mins)}
              style={{
                padding: '8px 14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold',
                background: duration === opt.mins ? (selectedRoom.isDark ? 'rgba(255,255,255,0.2)' : 'var(--accent-pink)') : '#FFF',
                color: duration === opt.mins ? '#FFF' : '#888',
                border: duration === opt.mins ? '2px solid #FFF' : '2px solid #EEE',
                fontFamily: 'Quicksand, sans-serif'
              }}
            >
              {opt.label || `${opt.mins} Dk (+${opt.xp} XP)`}
            </button>
          ))}
        </div>
      )}

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {isActive ? (
          <>
            <button className="btn" onClick={pauseTimer} style={{ background: 'var(--accent-yellow)', boxShadow: 'none' }}>
              Durdur ⏸️
            </button>
            {duration === 0 && (
              <button className="btn" onClick={finishStopwatch} style={{ background: 'var(--accent-mint)', boxShadow: 'none', color: '#268C72' }}>
                Çalışmayı Bitir 🏁
              </button>
            )}
          </>
        ) : (
          <button className="btn" onClick={startTimer} style={{ background: selectedRoom.isDark ? '#FFF' : undefined, color: selectedRoom.isDark ? '#1E1E3F' : undefined }}>
            {isCompleted ? 'Yeniden Odaklan 🚀' : 'Odaklanmayı Başlat 🚀'}
          </button>
        )}
        {(isActive || (duration === 0 ? timeLeft > 0 : timeLeft < duration * 60)) && (
          <button
            onClick={resetTimer}
            style={{
              padding: '12px 24px', borderRadius: '16px', border: '2px solid #EEE', 
              background: selectedRoom.isDark ? 'rgba(255,255,255,0.1)' : '#FFF',
              color: selectedRoom.isDark ? '#FFF' : '#888', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            Sıfırla 🔄
          </button>
        )}
      </div>

      {isCompleted && (
        <div style={{ marginTop: '20px', color: 'var(--accent-mint)', fontWeight: 'bold', fontSize: '18px' }}>
          Tebrikler Zeynep! {selectedRoom.name} içinde başarıyla çalıştın ve +{sessionXP} XP kazandın! 🎉✨
        </div>
      )}
    </div>
  );
}

export default FocusRoom;
