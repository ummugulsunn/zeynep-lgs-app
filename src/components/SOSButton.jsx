import React, { useState } from 'react';
import confetti from 'canvas-confetti';

const CALMING_MESSAGES = [
  "Derin bir nefes al... Burnundan 4 saniye çek, 8 saniye yavaşça ver. Yapabiliyorsun! 🌬️",
  "Şu an zorlandığın şey zayıf olduğun için değil, seviye atladığın için zor. İlerliyorsun! 🌟",
  "Hata yaptıysan sevin! Çünkü sınavda çıkacak bir tuzağı daha önceden öğrendin. 👾",
  "Matematik bazen inatçı olabilir, sen ondan daha inatçısın! 💖",
  "Şimdi o kalemi yavaşça bırak, git kendine bir bardak soğuk su al. Zihnine bir mola ver. 💧",
  "Bu soru çok uzun olabilir ama uzun sorular her zaman daha fazla ipucu verir. Korkma! 🕵️‍♀️",
  "Ablan seninle gurur duyuyor, pes etmek yok! 💪",
  "LGS bir zeka testi değil, bir çalışma disiplini oyunudur. Sen bu oyunu kuralına göre oynuyorsun! 🎮"
];

function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handlePanicClick = () => {
    const randomMsg = CALMING_MESSAGES[Math.floor(Math.random() * CALMING_MESSAGES.length)];
    setMessage(randomMsg);
    setIsOpen(true);
    // Sparkly confetti for magic potion
    confetti({
      particleCount: 40,
      spread: 50,
      colors: ['#FF9BBE', '#B593FF', '#FFF']
    });
  };

  return (
    <>
      <button 
        onClick={handlePanicClick}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-purple))',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 20px rgba(181,147,255,0.4)',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s',
          animation: 'pulse 2s infinite'
        }}
        title="Cesaret İksiri! ✨"
      >
        🧪
      </button>

      {isOpen && (
        <div className="overlay open" onClick={() => setIsOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center', padding: '30px' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>✨🧪✨</div>
            <h2 style={{ fontFamily: 'Baloo 2', color: 'var(--accent-purple)', margin: '0 0 15px', fontSize: '26px' }}>Cesaret İksiri!</h2>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1.6', padding: '15px', background: '#F5F0FF', borderRadius: '15px', border: '1px solid #EAE0FF' }}>
              "{message}"
            </p>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                marginTop: '20px',
                background: 'var(--accent-purple)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(181,147,255,0.3)'
              }}
            >
              Cesaretimi Topladım! 💪
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SOSButton;
