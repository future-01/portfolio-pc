// UI.jsx — 共有の小さなアイコン群と部品

const Icon = {
  Search: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Heart: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  Lock: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6"/></svg>,
  Grid: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
  Calendar: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="6" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M4 10h16M9 4v3M15 4v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  User: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.6"/><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  ChevR: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ChevL: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Close: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Down: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Share: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 4v12m0-12-4 4m4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  More: (p) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>,
  Info: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 11v6M12 7.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Pin: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
  Sparkle: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

// Bottom tab bar (5 items, latte-glass)
function TabBar({ active = 'home', dark = false }) {
  const items = [
    { id: 'home',    label: 'アルバム', icon: Icon.Grid },
    { id: 'years',   label: '年別',     icon: Icon.Calendar },
    { id: 'fav',     label: 'お気に入り', icon: Icon.Heart },
    { id: 'profile', label: '設定',     icon: Icon.User },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 22,
      height: 64, borderRadius: 22,
      background: dark ? 'rgba(28,22,16,.78)' : 'rgba(251,247,240,.85)',
      backdropFilter: 'blur(18px) saturate(160%)',
      WebkitBackdropFilter: 'blur(18px) saturate(160%)',
      border: dark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(184,146,101,.18)',
      boxShadow: dark
        ? '0 8px 24px rgba(0,0,0,.4)'
        : '0 6px 20px rgba(74,55,35,.10)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      zIndex: 40, padding: '0 8px',
    }}>
      {items.map(it => {
        const C = it.icon;
        const isOn = it.id === active;
        return (
          <div key={it.id} className="tap" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isOn ? (dark ? '#f5e6cd' : 'var(--accent)') : (dark ? 'rgba(255,255,255,.55)' : 'var(--ink-3)'),
            padding: '6px 12px', borderRadius: 14,
            background: isOn ? (dark ? 'rgba(245,230,205,.10)' : 'rgba(184,146,101,.10)') : 'transparent',
          }}>
            <C/>
            <span style={{ fontSize: 10.5, fontWeight: 500, letterSpacing: '.04em' }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// Top app bar
function AppBar({ title, sub, trailing, leading, dark = false, large = true }) {
  const c = dark ? '#fff' : 'var(--ink)';
  return (
    <div style={{ padding: '64px 22px 14px', position: 'relative', color: c }}>
      {leading && <div style={{ position: 'absolute', left: 14, top: 60 }}>{leading}</div>}
      {trailing && <div style={{ position: 'absolute', right: 14, top: 60, display: 'flex', gap: 6 }}>{trailing}</div>}
      {sub && <div style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,.65)' : 'var(--ink-3)', marginBottom: 6 }}>{sub}</div>}
      <div className="display" style={{
        fontSize: large ? 36 : 22,
        fontWeight: 500, letterSpacing: '.005em',
        fontFamily: "'Shippori Mincho','Hiragino Mincho ProN',serif",
        lineHeight: 1.15,
      }}>{title}</div>
    </div>
  );
}

// Round icon button (for app bars)
function RoundBtn({ children, dark = false }) {
  return (
    <div className="tap" style={{
      width: 40, height: 40, borderRadius: 999,
      background: dark ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.7)',
      border: dark ? '1px solid rgba(255,255,255,.18)' : '1px solid var(--line)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: dark ? '#fff' : 'var(--ink)',
    }}>{children}</div>
  );
}

Object.assign(window, { Icon, TabBar, AppBar, RoundBtn });
