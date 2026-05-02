// ScreenOnboarding.jsx — 限定公開ロック画面

function ScreenOnboarding() {
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: 'url(placeholders/family-1-lg.svg) center/cover',
        filter: 'blur(10px) saturate(.85)', transform: 'scale(1.15)' }}/>
      <div style={{ position: 'absolute', inset: 0, background:
        'linear-gradient(180deg, rgba(40,28,18,.40) 0%, rgba(40,28,18,.65) 60%, rgba(30,20,12,.92) 100%)' }}/>

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        padding: '110px 32px 130px', color: '#fff' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,.14)', border: '1px solid rgba(255,255,255,.22)',
            backdropFilter: 'blur(10px)', fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.92)', marginBottom: 32 }}>
            <Icon.Lock/> Family Only · 限定公開
          </div>
          <div style={{
            fontFamily: "'Shippori Mincho','Hiragino Mincho ProN',serif",
            fontSize: 50, lineHeight: 1.08, fontWeight: 500, marginBottom: 14, letterSpacing: '.01em',
          }}>
            記憶を、<br/>
            そっと<br/>
            ひらく。
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif",
            fontStyle: 'italic', fontSize: 22, opacity: .8, marginBottom: 28, letterSpacing: '.03em' }}>
            Memoria — a private archive
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.85, color: 'rgba(255,255,255,.78)',
            maxWidth: 280 }}>
            家族と、ほんとうに親しい人だけのための、<br/>
            旅と日々の写真集です。
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
            background: 'rgba(255,255,255,.92)', borderRadius: 14, marginBottom: 12,
            color: 'var(--ink)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--bg-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <Icon.User/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.06em' }}>合言葉でひらく</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>·  ·  ·  ·  ·  ·</div>
            </div>
            <Icon.ChevR style={{ color: 'var(--ink-3)' }}/>
          </div>
          <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.6)',
            letterSpacing: '.05em' }}>招待された方のみ閲覧できます</div>
        </div>
      </div>
    </div>
  );
}
window.ScreenOnboarding = ScreenOnboarding;
