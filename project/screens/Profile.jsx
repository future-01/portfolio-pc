// ScreenProfile.jsx — 設定 / プロフィール

function ScreenProfile() {
  const rows1 = [
    { label: 'みんなの招待状', detail: '4名がアクセス中', icon: <Icon.User/> },
    { label: '合言葉の変更',   detail: '最終: 2026.01.04', icon: <Icon.Lock/> },
    { label: '通知',          detail: 'ON',                icon: <Icon.Sparkle/> },
  ];
  const rows2 = [
    { label: '画質',           detail: 'オリジナル', icon: <Icon.Down/> },
    { label: 'ダウンロード許可', detail: '家族のみ',   icon: <Icon.Down/> },
    { label: 'このサイトについて', detail: 'v.1.0',     icon: <Icon.Info/> },
  ];

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
        {/* プロフィールヘッダ */}
        <div style={{ padding: '64px 22px 26px', textAlign: 'center' }}>
          <div style={{ width: 74, height: 74, borderRadius: 999, margin: '0 auto 14px',
            background: 'linear-gradient(135deg, #c9a065 0%, #7a4f2c 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 500,
            boxShadow: 'var(--shadow-2)', border: '3px solid var(--bg-elev)' }}>A</div>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 22, fontWeight: 500,
            color: 'var(--ink)' }}>あやか</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4, letterSpacing: '.06em' }}>
            <Icon.Lock style={{ verticalAlign: -2, marginRight: 4 }}/> 家族 · 管理者
          </div>
        </div>

        {/* スタッツ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          margin: '0 18px 26px', padding: '14px 0',
          background: 'var(--bg-elev)', border: '1px solid var(--line)',
          borderRadius: 16, boxShadow: 'var(--shadow-1)' }}>
          {[
            { n: TOTAL_PHOTOS, l: '写真' },
            { n: ALBUMS.length, l: 'アルバム' },
            { n: 4, l: 'みんな' },
          ].map((s, i, arr) => (
            <div key={s.l} style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 500,
                color: 'var(--ink)', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 4, letterSpacing: '.1em' }}>{s.l}</div>
              {i < arr.length - 1 && <div style={{ position: 'absolute', right: 0, top: '20%',
                bottom: '20%', width: 1, background: 'var(--line)' }}/>}
            </div>
          ))}
        </div>

        {/* グループ1 */}
        <SettingsGroup title="家族・プライバシー" rows={rows1}/>
        <SettingsGroup title="表示と保存" rows={rows2}/>

        {/* サインアウト */}
        <div style={{ padding: '8px 18px 32px' }}>
          <div className="tap" style={{ height: 48, borderRadius: 14, background: 'var(--bg-elev)',
            border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>
            ロックする
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-3)',
          fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', letterSpacing: '.08em' }}>
          Memoria · made with love
        </div>
      </div>
      <TabBar active="profile"/>
    </div>
  );
}

function SettingsGroup({ title, rows }) {
  return (
    <div style={{ padding: '0 18px 22px' }}>
      <div style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
        color: 'var(--ink-3)', padding: '0 6px 8px' }}>{title}</div>
      <div style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--bg-elev)',
        border: '1px solid var(--line)', boxShadow: 'var(--shadow-1)' }}>
        {rows.map((r, i) => (
          <div key={r.label} className="tap" style={{ display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(184,146,101,.14)',
              color: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.icon}</div>
            <div style={{ flex: 1, fontSize: 14, color: 'var(--ink)' }}>{r.label}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r.detail}</div>
            <Icon.ChevR style={{ color: 'var(--ink-3)' }}/>
          </div>
        ))}
      </div>
    </div>
  );
}
window.ScreenProfile = ScreenProfile;
