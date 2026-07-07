import React, { useState } from 'react';
import confetti from 'canvas-confetti';

function RewardChest({ state, onUpdate, currentXP, isAdmin }) {
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardXP, setNewRewardXP] = useState('');

  const rewards = state.rewards || [];

  const handleAddReward = () => {
    if (!newRewardName.trim() || !newRewardXP) return;
    const newReward = {
      id: 'r_' + Date.now(),
      name: newRewardName,
      xpRequired: parseInt(newRewardXP, 10),
      status: 'locked'
    };
    onUpdate({
      rewards: [...rewards, newReward]
    });
    setNewRewardName('');
    setNewRewardXP('');
  };

  const handleDeleteReward = (id) => {
    onUpdate({
      rewards: rewards.filter(r => r.id !== id)
    });
  };

  const handleClaimReward = (id) => {
    confetti({ particleCount: 50, spread: 60 });
    onUpdate({
      rewards: rewards.map(r => r.id === id ? { ...r, status: 'claimed' } : r)
    });
  };

  const handleDeliverReward = (id) => {
    onUpdate({
      rewards: rewards.map(r => r.id === id ? { ...r, status: 'delivered' } : r)
    });
  };

  const handleResetReward = (id) => {
    onUpdate({
      rewards: rewards.map(r => r.id === id ? { ...r, status: 'locked' } : r)
    });
  };

  return (
    <div className="dash-card" style={{ padding: '30px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '24px' }}>🎁 Ödül Sandığı</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '14px', margin: '4px 0 0' }}>
            Kazandığın toplam XP'ler ile ablanın/abinin hazırladığı ödülleri kilitle!
          </p>
        </div>
      </div>

      {/* Admin Panel for Adding Rewards */}
      {isAdmin && (
        <div style={{ background: '#FFF9E6', border: '2px dashed var(--accent-yellow)', borderRadius: '16px', padding: '16px', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#8F763B', fontFamily: 'Baloo 2' }}>Yeni Ödül Tanımla 🔑</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Ödül adı (Örn: Sinema biletli sinema gecesi 🎬)"
              value={newRewardName}
              onChange={(e) => setNewRewardName(e.target.value)}
              style={{ flex: 2, minWidth: '200px', padding: '10px', borderRadius: '12px', border: '1px solid #CCC', fontFamily: 'inherit' }}
            />
            <input
              type="number"
              placeholder="Gerekli XP (Örn: 800)"
              value={newRewardXP}
              onChange={(e) => setNewRewardXP(e.target.value)}
              style={{ flex: 1, minWidth: '100px', padding: '10px', borderRadius: '12px', border: '1px solid #CCC', fontFamily: 'inherit' }}
            />
            <button
              onClick={handleAddReward}
              style={{
                padding: '10px 20px', borderRadius: '12px', border: 'none', background: 'var(--accent-pink)', color: '#FFF', fontWeight: 'bold', cursor: 'pointer'
              }}
            >
              Ödül Ekle
            </button>
          </div>
        </div>
      )}

      {/* Rewards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {rewards.map((r) => {
          const isUnlocked = currentXP >= r.xpRequired;
          const status = r.status || 'locked';

          let bg = '#FAFAFA';
          let border = '2px solid #EEE';
          let actionBtn = null;

          if (status === 'delivered') {
            bg = '#F0FBF9';
            border = '2px solid var(--accent-mint)';
          } else if (status === 'claimed') {
            bg = '#FFF9E6';
            border = '2px solid var(--accent-yellow)';
          } else if (isUnlocked) {
            bg = '#FFF';
            border = '2px solid var(--accent-pink)';
          }

          return (
            <div key={r.id} style={{ background: bg, border: border, borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.2s', position: 'relative' }}>
              
              {/* Delete Button (Admin Only) */}
              {isAdmin && (
                <button
                  onClick={() => handleDeleteReward(r.id)}
                  style={{
                    position: 'absolute', top: '10px', right: '10px', border: 'none', background: '#FFEBF0', color: '#D13A6B',
                    width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              )}

              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-light)', marginBottom: '6px' }}>
                  {r.xpRequired} XP Gerekli
                </div>
                <h4 style={{ margin: '0 0 16px', fontSize: '16px', color: 'var(--text-main)' }}>{r.name}</h4>
              </div>

              <div>
                {/* Visual Status Tag */}
                {status === 'delivered' ? (
                  <div style={{ color: 'var(--accent-mint)', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    🏆 Teslim Edildi!
                  </div>
                ) : status === 'claimed' ? (
                  <div style={{ color: '#8F763B', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    ⌛ Ödül Talep Edildi! (Abla/Abi onayı bekleniyor)
                  </div>
                ) : isUnlocked ? (
                  <div style={{ color: 'var(--accent-pink)', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    🔓 Kilit Açıldı!
                  </div>
                ) : (
                  <div style={{ color: '#AAA', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    🔒 Kilitli ({r.xpRequired - currentXP} XP kaldı)
                  </div>
                )}

                {/* Sibling Admin Controls for Rewards */}
                {isAdmin ? (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {status === 'claimed' && (
                      <button
                        onClick={() => handleDeliverReward(r.id)}
                        style={{
                          flex: 1, padding: '8px', borderRadius: '10px', border: 'none', background: 'var(--accent-mint)',
                          color: '#268C72', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'
                        }}
                      >
                        Teslim Et ✔️
                      </button>
                    )}
                    {(status === 'claimed' || status === 'delivered') && (
                      <button
                        onClick={() => handleResetReward(r.id)}
                        style={{
                          padding: '8px', borderRadius: '10px', border: '1px solid #CCC', background: '#FFF',
                          color: '#888', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'
                        }}
                      >
                        Sıfırla 🔄
                      </button>
                    )}
                  </div>
                ) : (
                  /* Student View Action Button */
                  isUnlocked && status === 'locked' && (
                    <button
                      onClick={() => handleClaimReward(r.id)}
                      style={{
                        width: '100%', padding: '10px', borderRadius: '12px', border: 'none', background: 'var(--accent-pink)',
                        color: '#FFF', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px'
                      }}
                    >
                      Ödülü Talep Et! 🎁
                    </button>
                  )
                )}
              </div>

            </div>
          );
        })}
      </div>

      {rewards.length === 0 && (
        <div style={{ textAlign: 'center', padding: '30px', color: '#999', fontStyle: 'italic' }}>
          Henüz hiçbir ödül eklenmemiş. Lütfen abla/abi moduna geçip ödül ekle!
        </div>
      )}
    </div>
  );
}

export default RewardChest;
