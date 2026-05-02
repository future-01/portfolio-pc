// Phone.jsx — 軽量 iPhone フレーム (390×844, ステータスバーとホームインジケータのみ)
// IOSDevice よりカスタム性が高いものを自前で。デザインキャンバス上で 7枚並べる用途。

function Phone({ children, label, dark = false, statusDark = false, time = '7:24', noChrome = false }) {
  const W = 390, H = 844;
  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <div style={{
          position: 'absolute', left: 0, right: 0, top: -34,
          textAlign: 'center', fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic', fontSize: 18, color: 'rgba(60,50,40,.7)',
          letterSpacing: '.04em',
        }}>{label}</div>
      )}

      {/* Bezel */}
      <div style={{
        width: W + 16, height: H + 16, padding: 8, borderRadius: 56,
        background: 'linear-gradient(180deg, #2a2520, #15110d)',
        boxShadow: '0 30px 60px rgba(40,28,18,.25), 0 8px 20px rgba(40,28,18,.15), inset 0 0 0 1.5px rgba(255,255,255,.06)',
      }}>
        {/* Screen */}
        <div className="phone-screen" style={{
          width: W, height: H, borderRadius: 48, overflow: 'hidden',
          position: 'relative', background: 'var(--bg)',
        }}>
          {/* Status bar */}
          {!noChrome && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 54,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 32px 0', zIndex: 50, pointerEvents: 'none',
              color: statusDark ? '#fff' : 'var(--ink)',
              fontSize: 15, fontWeight: 600, letterSpacing: '.02em',
            }}>
              <span>{time}</span>
              <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
                  <rect x="1" y="6" width="3" height="4" rx=".7" fill="currentColor"/>
                  <rect x="5.5" y="4" width="3" height="6" rx=".7" fill="currentColor"/>
                  <rect x="10" y="2" width="3" height="8" rx=".7" fill="currentColor"/>
                  <rect x="14.5" y="0" width="3" height="10" rx=".7" fill="currentColor" opacity=".4"/>
                </svg>
                <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
                  <rect x=".5" y=".5" width="20" height="10" rx="2.5" stroke="currentColor" opacity=".5"/>
                  <rect x="2" y="2" width="14" height="7" rx="1.2" fill="currentColor"/>
                  <rect x="21.5" y="3.5" width="1.5" height="4" rx=".5" fill="currentColor" opacity=".5"/>
                </svg>
              </span>
            </div>
          )}
          {/* Dynamic island */}
          {!noChrome && (
            <div style={{
              position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
              width: 124, height: 36, borderRadius: 999, background: '#0a0806', zIndex: 60,
            }}/>
          )}

          {children}

          {/* Home indicator */}
          {!noChrome && (
            <div style={{
              position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
              width: 134, height: 5, borderRadius: 99,
              background: statusDark ? 'rgba(255,255,255,.65)' : 'rgba(40,30,20,.45)',
              zIndex: 50, pointerEvents: 'none',
            }}/>
          )}
        </div>
      </div>
    </div>
  );
}

window.Phone = Phone;
