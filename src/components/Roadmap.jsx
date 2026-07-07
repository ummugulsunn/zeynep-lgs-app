import React from 'react';

function Roadmap({ subject, state, onNodeClick }) {
  const isNodeDone = (node) => {
    const subs = state.completed[node.id] || [];
    const qz = state.quizDone[node.id] || [];
    return (
      subs.length >= node.subtopics.length && subs.every(Boolean) &&
      qz.length >= node.quiz.length && qz.every(Boolean)
    );
  };

  const isNodeUnlocked = (idx) => {
    if (idx === 0) return true;
    return isNodeDone(subject.nodes[idx - 1]);
  };

  return (
    <div className="roadmap">
      {subject.nodes.map((node, idx) => {
        const unlocked = isNodeUnlocked(idx);
        const done = isNodeDone(node);
        const completedCount = (state.completed[node.id] || []).filter(Boolean).length;
        const isCurrent = unlocked && !done;

        return (
          <div key={node.id} className={`node-row ${idx % 2 === 0 ? 'left' : 'right'}`}>
            <div className="node-dot"></div>
            <div 
              className={`node-card ${!unlocked ? 'locked' : ''} ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
              onClick={() => { if (unlocked) onNodeClick(node); }}
            >
              {done ? <div className="done-badge">✅</div> : (!unlocked ? <div className="lock-badge">🔒</div> : null)}
              
              <div className="node-top">
                <div className="node-icon">{node.icon || subject.icon}</div>
                <div>
                  <div className="node-title">{node.title}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8, fontWeight: 700, color: 'var(--accent-pink)' }}>
                    {subject.name} - Adım {idx + 1}
                  </div>
                </div>
              </div>
              
              <div className="node-sub">{node.desc}</div>
              
              <div className="node-progress-bar">
                <div 
                  className="node-progress-fill" 
                  style={{ width: `${(completedCount / node.subtopics.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="node-meta">
                <span>{completedCount}/{node.subtopics.length} Görev</span>
                <span>{unlocked ? (done ? 'Tamamlandı ✨' : 'Devam Ediyor') : 'Kilitli'}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Roadmap;
