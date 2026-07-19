import { useState, useEffect, useRef } from 'react';
import { SUBJECTS } from './data/curriculum';
import { subscribeToProgress, saveProgress } from './firebase';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import NodeModal from './components/NodeModal';
import ZeynepBag from './components/ZeynepBag';
import ReadingStreak from './components/ReadingStreak';
import SOSButton from './components/SOSButton';
import ActivityCalendar from './components/ActivityCalendar';
import confetti from 'canvas-confetti';
import './index.css';

const today = new Date().toISOString().split('T')[0];

function App() {
  const [activeTab, setActiveTab] = useState('matematik');
  const [state, setState] = useState({
    name: 'Zeynep',
    xp: 0,
    completedDailyXP: 0,
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
    activityHistory: {},
    siblingMessage: 'Zeynoşum, LGS ve dersler sadece birer araç. Asıl önemli olan senin kendine inanman ve verdiğin emeğin değeridir. Başarı, her gün pes etmeden gösterdiğin o küçük çabalarla inşa edilir. Sen yetenekli ve güçlü bir kızsın, bu yolda ne kadar emek verirsen karşılığını o kadar alacaksın. Kendine güven, yapabileceğine inan, gerisi zaten gelecektir. Her zaman seninle gurur duyuyorum! 💖',
    readingStreak: { currentStreak: 0, highestStreak: 0, lastDate: null }
  });
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToProgress((data) => {
      if (data) {
        const today = new Date().toISOString().split('T')[0];
        if (data.daily && data.daily.date !== today) {
          // Day has changed! Archive yesterday's daily targets and quests XP
          const completedTargets = (data.dailyTargets || []).filter(t => t.completed).length;
          const allCompleted = (data.dailyTargets || []).length > 0 && (data.dailyTargets || []).every(t => t.completed);
          const targetsXP = completedTargets * 15 + (allCompleted ? 20 : 0);
          const dailyQuestXP = data.dailyXP || 0;
          const earnedXP = targetsXP + dailyQuestXP;

          if (!data.activityHistory) data.activityHistory = {};
          data.activityHistory[data.daily.date] = {
            xpEarned: earnedXP,
            targets: data.dailyTargets || [],
            paragraf: data.daily.paragraf || false,
            problem: data.daily.problem || false
          };

          data.completedDailyXP = (data.completedDailyXP || 0) + earnedXP;
          data.daily = { date: today, paragraf: false, problem: false };
          data.dailyXP = 0;
          saveProgress(data);
        } else if (!data.daily) {
           data.daily = { date: today, paragraf: false, problem: false };
           data.dailyXP = 0;
        }
        setState(data);
        setIsLoaded(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateState = (newStateUpdates) => {
    const updatedState = { ...state, ...newStateUpdates };
    setState(updatedState);
    saveProgress(updatedState);
  };

  const computeXP = () => {
    let xp = state.dailyXP || 0;
    xp += state.completedDailyXP || 0; // Add archived daily XP
    Object.values(SUBJECTS).forEach(subject => {
      subject.nodes.forEach(n => {
        const subs = state.completed[n.id] || [];
        xp += subs.filter(Boolean).length * 10;
        
        const qz = state.quizDone[n.id] || [];
        xp += qz.filter(Boolean).length * 15;

        const bp = state.bookProgress[n.id] || {};
        xp += Object.values(bp).filter(Boolean).length * 20;

        if (state.youtubeLogsProgress?.[n.id]) {
          xp += 20; // 20 XP for YouTube Video
        }
        
        if (subs.length === n.subtopics.length && subs.every(Boolean) && qz.length === n.quiz.length && qz.every(Boolean)) {
          xp += 30; // Node completion bonus
        }
      });
    });

    // XP from Focus Sessions
    const fHistory = state.focusHistory || [];
    xp += fHistory.reduce((acc, s) => acc + (s.duration || 30), 0);

    // XP from Solved Mistakes
    const mList = state.mistakes || [];
    xp += mList.filter(m => m.solved).length * 15;

    // XP from Daily Targets (ONLY count if they are for today!)
    if (state.dailyTargetDate === today) {
      const dTargets = state.dailyTargets || [];
      xp += dTargets.filter(t => t.completed).length * 15;
      if (dTargets.length > 0 && dTargets.every(t => t.completed)) {
        xp += 20; // Full day target completion bonus
      }
    }

    // XP from Practice Exams (Deneme Sınavları)
    const exams = [...(state.practiceExams || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
    exams.forEach((exam, idx) => {
      if (idx > 0 && exam.score > exams[idx - 1].score) {
        xp += 50; // 50 XP for score increase
      }
    });

    // XP from Reading Streak
    const rStreak = state.readingStreak?.currentStreak || 0;
    xp += rStreak * 5; // +5 XP for each consecutive day!

    return xp;
  };

  const currentXP = computeXP();
  const level = Math.floor(currentXP / 200) + 1;
  const xpIntoLevel = currentXP % 200;

  // Level Up Watcher
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpText, setLevelUpText] = useState('');
  const prevLevel = useRef(level);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isLoaded) {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        prevLevel.current = level;
      } else if (level > prevLevel.current) {
        confetti({ particleCount: 150, spread: 80, scalar: 1.2 });
        setLevelUpText(`Tebrikler Zeynep! Seviye ${level} oldun! 🌟 Harikasın, öğrenmeye devam! 🎉`);
        setShowLevelUp(true);
        prevLevel.current = level;
      }
    }
  }, [level, isLoaded]);

  const getUnlockedBadgesCount = () => {
    let count = 0;
    if (Object.values(state.completed || {}).some(arr => arr.some(Boolean))) count++;
    if ((state.focusHistory || []).length >= 3) count++;
    if ((state.mistakes || []).length >= 1) count++;
    if ((state.focusHistory || []).some(f => f.duration >= 40)) count++;
    
    let booksCount = 0;
    Object.values(state.bookProgress || {}).forEach(bp => {
      booksCount += Object.values(bp).filter(Boolean).length;
    });
    if (booksCount >= 3) count++;
    
    if ((state.mistakes || []).some(m => m.solved)) count++;
    if (Object.values(state.youtubeLogsProgress || {}).filter(Boolean).length >= 3) count++;
    if ((state.readingStreak?.currentStreak || 0) >= 3) count++;
    
    return count;
  };

  const earnedBadges = getUnlockedBadgesCount();

  const tabs = [
    ...Object.values(SUBJECTS).map(s => ({ id: s.id, label: s.name, icon: s.icon, color: s.color })),
    { id: 'zeynep_bag', label: 'Zeynep\'in Çantası', icon: '🎒', color: '#FF9BBE' },
    { id: 'dashboard', label: 'Zeynep\'in Karnesi', icon: '📊', color: '#B593FF' },
    { id: 'calendar', label: 'Takvim', icon: '📅', color: '#4CAF50' }
  ];

  const needsDailyTargets = state.dailyTargetDate !== today;
  const needsTargetScore = !state.targetScore;
  const hasPreviousTargets = needsDailyTargets && (state.dailyTargets || []).length > 0;

  // Temporary local state for targets inside the prompt modal
  const [tempTargets, setTempTargets] = useState([]);
  const [tempTargetsLoaded, setTempTargetsLoaded] = useState(false);
  const [newTargetInput, setNewTargetInput] = useState('');
  const [inlineTargetInput, setInlineTargetInput] = useState('');

  // Pre-fill tempTargets with yesterday's targets when Firebase data arrives
  useEffect(() => {
    if (hasPreviousTargets && !tempTargetsLoaded) {
      setTempTargets(state.dailyTargets.map(t => ({ ...t, completed: false, id: 'dt_' + Date.now() + Math.random() })));
      setTempTargetsLoaded(true);
    }
  }, [hasPreviousTargets, state.dailyTargets, tempTargetsLoaded]);

  const handleAddInlineTarget = () => {
    if (!inlineTargetInput.trim()) return;
    const newTarget = {
      id: 'dt_' + Date.now() + Math.random(),
      text: inlineTargetInput.trim(),
      completed: false
    };
    handleUpdateState({
      dailyTargets: [...(state.dailyTargets || []), newTarget],
      dailyTargetDate: today // Ensure date is set so card works correctly
    });
    setInlineTargetInput('');
  };

  const saveDailyTargets = () => {
    if (tempTargets.length === 0) return;
    handleUpdateState({
      dailyTargetDate: today,
      dailyTargets: tempTargets,
      daily: { date: today, paragraf: false, problem: false },
      dailyXP: 0
    });
    setTempTargets([]);
  };

  const addTempTarget = () => {
    if (!newTargetInput.trim()) return;
    setTempTargets([...tempTargets, { id: 'dt_' + Date.now() + Math.random(), text: newTargetInput.trim(), completed: false }]);
    setNewTargetInput('');
  };

  const toggleDailyQuest = (type) => {
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

  const totalDailyTasksCount = (state.dailyTargets || []).length + 2;
  const completedDailyTasksCount = (state.dailyTargets || []).filter(t => t.completed).length + (state.daily.paragraf ? 1 : 0) + (state.daily.problem ? 1 : 0);

  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('role') === 'abla' || urlParams.get('role') === 'admin';

  return (
    <div>
      {isAdmin && (
        <div style={{
          background: 'linear-gradient(90deg, #B593FF, #FF9BBE)',
          color: '#FFF',
          padding: '8px 12px',
          textAlign: 'center',
          fontWeight: '800',
          fontSize: '13px',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          🔑 ABLA YÖNETİM MODU AKTİF (Tüm yönetim yetkilerine sahipsin)
        </div>
      )}
      <div className="topbar">
        <div className="name">{state.name} <span>· 8. Sınıf</span></div>
        <div className="pill">🔥 <span>{state.streak}</span> gün</div>
        <div className="pill">🌟 Sv.<span>{level}</span></div>
        <div className="xp-wrap">
          <div className="xp-bar"><div className="xp-fill" style={{ width: `${(xpIntoLevel / 200) * 100}%` }}></div></div>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-purple)' }}>{currentXP} XP</span>
        </div>
        <div className="pill badge-btn">🎀 <span>{earnedBadges}</span> rozet</div>
        {state.targetScore && (
          <div className="pill" style={{ borderColor: 'var(--accent-yellow)', background: '#FFF9E6', fontSize: '13px', color: '#8F763B' }}>
            🎯 {state.targetScore}
          </div>
        )}
      </div>

      <div className="hero">
        <div className="eyebrow">Zeynep'in Macera Haritası ✨</div>
        <h1>LGS 2027'ye Giden <em>Büyülü Yol!</em></h1>
        <p style={{ fontStyle: 'italic', fontWeight: '700', color: 'var(--text-light)', borderLeft: '4px solid var(--accent-pink)', paddingLeft: '10px', display: 'inline-block', margin: '0 auto 20px' }}>
          💡 Günün Motivasyonu: {getQuoteOfTheDay()}
        </p>
        
        {/* Hero Cards Container Grid */}
        <div className="hero-cards-grid">
          
          {/* Card 1: Abladan Posta Kutusu */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '20px 24px',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(255, 155, 190, 0.15)',
            border: '2px solid rgba(255, 255, 255, 1)',
            display: 'flex',
            gap: '15px',
            alignItems: 'flex-start',
            flex: 1
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #FF9BBE, #FF7AA5)',
              width: '40px', height: '40px',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0,
              boxShadow: '0 4px 10px rgba(255,155,190,0.3)'
            }}>
              💌
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-pink)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Abladan Gelen Posta</div>
              <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: '700', fontSize: '14px', lineHeight: '1.4' }}>
                "{state.siblingMessage || 'Harika bir gün olsun! 🌸'}"
              </p>
            </div>
          </div>

          {/* Card 2: Reading Streak Tracker */}
          <div style={{ display: 'flex', flex: 1 }}>
            <ReadingStreak state={state} onUpdate={handleUpdateState} />
          </div>

          {/* Card 3: Bugünkü LGS Hedeflerim (Merged) */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '20px 24px',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(181, 147, 255, 0.15)',
            border: '2px solid rgba(255, 255, 255, 1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flex: 1
          }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🎯 Bugünkü Hedeflerim
              </span>
              <span style={{ background: '#F5F0FF', padding: '2px 8px', borderRadius: '8px', color: 'var(--accent-purple)', fontSize: '11px' }}>
                {completedDailyTasksCount} / {totalDailyTasksCount}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '130px', overflowY: 'auto', paddingRight: '2px' }}>
              {/* System Task: Paragraf */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                borderRadius: '12px', background: state.daily.paragraf ? '#E6FBF5' : '#FAFAFA',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                border: state.daily.paragraf ? '1.5px solid var(--accent-mint)' : '1.5px solid #EEE'
              }}>
                <input 
                  type="checkbox" 
                  checked={state.daily.paragraf || false}
                  onChange={() => toggleDailyQuest('paragraf')}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--accent-mint)' }}
                />
                <span style={{ color: 'var(--text-main)', textDecoration: state.daily.paragraf ? 'line-through' : 'none' }}>
                  20 Paragraf Sorusu 📚
                </span>
              </label>

              {/* System Task: Problem */}
              <label style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                borderRadius: '12px', background: state.daily.problem ? '#E6FBF5' : '#FAFAFA',
                fontSize: '12px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                border: state.daily.problem ? '1.5px solid var(--accent-mint)' : '1.5px solid #EEE'
              }}>
                <input 
                  type="checkbox" 
                  checked={state.daily.problem || false}
                  onChange={() => toggleDailyQuest('problem')}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--accent-mint)' }}
                />
                <span style={{ color: 'var(--text-main)', textDecoration: state.daily.problem ? 'line-through' : 'none' }}>
                  20 Problem Sorusu 🧠
                </span>
              </label>

              {/* Custom Tasks */}
              {(state.dailyTargets || []).map(target => (
                <div 
                  key={target.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px',
                    borderRadius: '12px', background: target.completed ? '#E6FBF5' : '#FAFAFA',
                    fontSize: '12px', fontWeight: '700', transition: 'all 0.2s',
                    border: target.completed ? '1.5px solid var(--accent-mint)' : '1.5px solid #EEE',
                    justifyContent: 'space-between'
                  }}
                >
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }}>
                    <input 
                      type="checkbox" 
                      checked={target.completed || false}
                      onChange={(e) => {
                        const completed = e.target.checked;
                        const updatedTargets = state.dailyTargets.map(t => t.id === target.id ? { ...t, completed } : t);
                        handleUpdateState({ dailyTargets: updatedTargets });
                        if (completed) {
                          confetti({ particleCount: 30, spread: 40 });
                        }
                      }}
                      style={{ width: '16px', height: '16px', accentColor: 'var(--accent-mint)' }}
                    />
                    <span style={{ color: 'var(--text-main)', textDecoration: target.completed ? 'line-through' : 'none' }}>
                      {target.text}
                    </span>
                  </label>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      const updatedTargets = state.dailyTargets.filter(t => t.id !== target.id);
                      handleUpdateState({ dailyTargets: updatedTargets });
                    }}
                    style={{
                      border: 'none', background: 'none', color: '#D13A6B', cursor: 'pointer',
                      fontSize: '12px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px',
                      background: '#FFF0F5'
                    }}
                    title="Hedefi Sil"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Inline Target Adding Form */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <input 
                type="text"
                placeholder="Yeni hedef ekle..."
                value={inlineTargetInput}
                onChange={(e) => setInlineTargetInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddInlineTarget();
                }}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: '1.5px solid #EAE0FF',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  color: 'var(--text-main)'
                }}
              />
              <button 
                onClick={handleAddInlineTarget}
                style={{
                  background: 'var(--accent-purple)',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0 12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                +
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className="tab-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? tab.color : '#FFF',
              color: activeTab === tab.id ? '#FFF' : 'var(--text-main)',
              boxShadow: activeTab === tab.id ? `0 4px 15px ${tab.color}66` : '0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' ? (
        <Dashboard state={state} subjects={SUBJECTS} onUpdate={handleUpdateState} />
      ) : activeTab === 'zeynep_bag' ? (
        <ZeynepBag state={state} onUpdate={handleUpdateState} currentXP={currentXP} isAdmin={isAdmin} />
      ) : activeTab === 'calendar' ? (
        <ActivityCalendar state={state} />
      ) : (
        <Roadmap 
          subject={SUBJECTS[activeTab]} 
          state={state} 
          onNodeClick={(node) => setSelectedNode({ ...node, subjectId: activeTab })} 
        />
      )}

      {selectedNode && (
        <NodeModal 
          node={selectedNode} 
          state={state}
          onClose={() => setSelectedNode(null)}
          onUpdate={handleUpdateState}
        />
      )}

      {/* Daily Target Prompt Modal */}
      {needsDailyTargets && !needsTargetScore && (
        <div className="overlay open">
          <div className="modal" style={{ maxWidth: '440px', textAlign: 'center', padding: '25px' }}>
            
            {/* Tactic Card */}
            <div style={{ background: '#E6F0FA', borderRadius: '15px', padding: '15px', marginBottom: '20px', border: '2px dashed #B8D4F0' }}>
              <div style={{ fontSize: '12px', color: '#4A90E2', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>💡 Günün Taktik Kartı</div>
              <div style={{ fontSize: '14px', color: 'var(--text-main)', fontWeight: 'bold' }}>{getTacticOfTheDay()}</div>
            </div>

            <h2 style={{ fontFamily: 'Baloo 2', color: 'var(--accent-purple)', margin: '0 0 10px' }}>Bugünkü Hedeflerin 🎯</h2>
            
            {hasPreviousTargets && (
              <div style={{ background: '#F0FFF4', border: '2px dashed #86E3CE', borderRadius: '12px', padding: '12px', marginBottom: '15px', textAlign: 'left' }}>
                <div style={{ fontSize: '12px', color: '#2D9F7B', fontWeight: '800', marginBottom: '4px' }}>💡 Dünden kalan hedeflerin otomatik eklendi!</div>
                <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: '700' }}>İstersen olduğu gibi onayla, istersen düzenle veya yenilerini ekle.</div>
              </div>
            )}

            {!hasPreviousTargets && (
              <p style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '14px', lineHeight: '1.4', marginBottom: '15px' }}>
                Bugün LGS maratonunda neleri tamamlamak istersin? Birden fazla hedef ekleyebilirsin.
              </p>
            )}
            
            {/* Added targets list inside modal */}
            {tempTargets.length > 0 && (
              <div style={{ textAlign: 'left', background: '#FAFAFA', borderRadius: '12px', padding: '12px', marginBottom: '15px', maxHeight: '150px', overflowY: 'auto', border: '1px solid #EEE' }}>
                {tempTargets.map((t, idx) => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: idx < tempTargets.length - 1 ? '1px solid #EEE' : 'none', fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                    <span>📍 {t.text}</span>
                    <button 
                      onClick={() => setTempTargets(tempTargets.filter(item => item.id !== t.id))}
                      style={{ border: 'none', background: 'none', color: '#D13A6B', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Sil
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Örn: 20 Paragraf çözmek..."
                value={newTargetInput}
                onChange={(e) => setNewTargetInput(e.target.value)}
                style={{ 
                  flex: 1, padding: '10px 14px', borderRadius: '12px', 
                  border: '2px solid #F0E6F5', fontFamily: 'inherit', 
                  fontWeight: 'bold', fontSize: '14px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addTempTarget();
                }}
              />
              <button
                onClick={addTempTarget}
                style={{ padding: '0 16px', borderRadius: '12px', border: 'none', background: 'var(--accent-pink)', color: '#FFF', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
              >
                Ekle
              </button>
            </div>
            
            <button
              className="btn"
              onClick={saveDailyTargets}
              disabled={tempTargets.length === 0}
              style={{ opacity: tempTargets.length === 0 ? 0.6 : 1, cursor: tempTargets.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              {hasPreviousTargets ? 'Hedeflerimle Devam Et 🚀' : 'Hedeflerimi Belirledim 🚀'}
            </button>
          </div>
        </div>
      )}

      {/* Target Score First-Time Prompt Modal */}
      {needsTargetScore && (
        <div className="overlay open">
          <div className="modal" style={{ maxWidth: '440px', textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>🎓</div>
            <h2 style={{ fontFamily: 'Baloo 2', color: 'var(--accent-purple)', margin: '0 0 10px' }}>Büyük Hayalin Nedir?</h2>
            <p style={{ fontWeight: '700', color: 'var(--text-light)', fontSize: '14px', lineHeight: '1.5', marginBottom: '20px' }}>
              LGS 2027 macerasına başlarken hedeflediğin liseyi veya hedef puanını yazar mısın? Sana hep bunu hatırlatacağız! 💖
            </p>
            <input
              type="text"
              id="target-score-input"
              placeholder="Örn: Galatasaray Lisesi / 495 Puan"
              style={{ 
                width: '100%', padding: '14px', borderRadius: '15px', 
                border: '2px solid #F0E6F5', fontFamily: 'inherit', 
                fontWeight: 'bold', marginBottom: '24px', textAlign: 'center',
                fontSize: '15px'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleUpdateState({ targetScore: e.target.value.trim() });
                }
              }}
            />
            <button
              className="btn"
              onClick={() => {
                const val = document.getElementById('target-score-input').value;
                if (val.trim()) {
                  handleUpdateState({ targetScore: val.trim() });
                }
              }}
            >
              Rüya Hedefimi Kaydet 🎯
            </button>
          </div>
        </div>
      )}

      {/* Level Up Celebration Modal */}
      {showLevelUp && (
        <div className="overlay open" onClick={() => setShowLevelUp(false)} style={{ zIndex: 1000 }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '60px', marginBottom: '15px' }}>🎉👑🌟</div>
            <h2 style={{ fontFamily: 'Baloo 2', color: 'var(--accent-pink)', margin: '0 0 10px', fontSize: '28px' }}>Seviye Atladın!</h2>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1.5', padding: '15px', background: '#FFF5F5', borderRadius: '15px' }}>
              {levelUpText}
            </p>
            <button 
              onClick={() => setShowLevelUp(false)}
              className="btn"
              style={{ background: 'var(--accent-pink)', marginTop: '15px' }}
            >
              Harika! Devam Et 🚀
            </button>
          </div>
        </div>
      )}

      {/* İmdat / Panik Butonu */}
      <SOSButton />
    </div>
  );
}

const MOTIVATIONAL_QUOTES = [
  "Her günkü küçük çaba, gelecekteki büyük başarının anahtarıdır! 🔑",
  "Hata yapmak, öğrendiğinin ve denediğinin en büyük kanıtıdır. Canavarları evcilleştirmeye devam! 👾",
  "LGS bir maraton Zeynep, ve sen her gün harika adımlar atıyorsun! 🏃‍♀️✨",
  "Kendine inan! Sen zannettiğinden çok daha güçlü ve zekisin. 💖",
  "Zorluklar, başarının süsüdür. Bugün harika bir gün olacak! ☀️",
  "Bugün atacağın her adım seni hayallerine bir adım daha yaklaştıracak! 🎓",
  "Başarı, her gün tekrar edilen küçük disiplinlerin toplamıdır. Hadi başlayalım! 🚀",
  "Yorulduğunda dinlenmeyi öğren, bırakmayı değil. Sen bu yolu tamamlayacaksın! 🌈",
  "Eksiklerin senin zayıflığın değil, sadece henüz fethedilmemiş kalelerindir! 🏰"
];

const getQuoteOfTheDay = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash += todayStr.charCodeAt(i);
  }
  const index = hash % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[index];
};

const DAILY_TACTICS = [
  "Matematikte yeni nesil soru uzunsa korkma! Uzun soru, sana daha çok ipucu veren sorudur.",
  "YouTube'dan ders dinlerken hoca soruyu çözmeden videoyu durdur, önce kendin çözmeye çalış!",
  "Paragraf sorularını çözerken önce sorunun 'kökünü' oku. Neyi aradığını bilirsen paragrafı daha kolay anlarsın.",
  "Yanlış yaptığın soruları çöpe atma! Onlar senin hata canavarların. Yanlışları öğrenmek seni seviye atlatır.",
  "Günde sadece 20 paragraf çözerek bile LGS'de devasa bir fark yaratabilirsin. Okumak güçtür!",
  "Pomodoro yaparken telefonunu kesinlikle odanın dışında bırak. O 25 dakika tamamen sana ait olsun."
];

const getTacticOfTheDay = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    hash += todayStr.charCodeAt(i);
  }
  const index = hash % DAILY_TACTICS.length;
  return DAILY_TACTICS[index];
};

export default App;
