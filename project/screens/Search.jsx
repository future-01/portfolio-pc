// ScreenSearch.jsx — 検索 / すべての写真へのアクセス

function ScreenSearch() {
  const recent = ['沖縄','おばあちゃん','京都','花火'];
  const all = Object.values(PHOTOS).flat().slice(0, 18);

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '64px 22px 8px' }}>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 28, fontWeight: 500,
            color: 'var(--ink)' }}>さがす</div>
        </div>

        {/* 検索バー */}
        <div style={{ padding: '10px 18px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8,
            height: 46, padding: '0 14px',
            background: 'var(--bg-elev)', border: '1px solid var(--line)',
            borderRadius: 14, boxShadow: 'var(--shadow-1)' }}>
            <Icon.Search style={{ color: 'var(--ink-3)' }}/>
            <input placeholder="場所、人、できごと..." style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit' }}/>
          </div>
        </div>

        {/* よく使うキーワード */}
        <div style={{ padding: '4px 22px 10px', fontSize: 10.5, letterSpacing: '.18em',
          textTransform: 'uppercase', color: 'var(--ink-3)' }}>最近の検索</div>
        <div style={{ display: 'flex', gap: 6, padding: '0 18px 22px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {recent.map(t => <div key={t} className="chip">{t}</div>)}
        </div>

        {/* カテゴリ */}
        <div style={{ padding: '0 22px 12px', fontSize: 10.5, letterSpacing: '.18em',
          textTransform: 'uppercase', color: 'var(--ink-3)' }}>カテゴリ</div>
        <div style={{ padding: '0 18px 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { l: '人物', n: 41, c: 'family-1' },
            { l: '風景', n: 64, c: 'kyoto-3' },
            { l: '海',   n: 32, c: 'okinawa-2' },
            { l: '街',   n: 28, c: 'paris-1' },
          ].map(c => (
            <div key={c.l} style={{ position: 'relative', borderRadius: 14, overflow: 'hidden',
              aspectRatio: '16 / 9',
              background: `url(placeholders/${c.c}-lg.svg) center/cover`,
              boxShadow: 'var(--shadow-1)' }}>
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(20,12,6,.7) 100%)' }}/>
              <div style={{ position: 'absolute', left: 12, bottom: 9, color: '#fff' }}>
                <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 16, fontWeight: 500 }}>{c.l}</div>
                <div style={{ fontSize: 10.5, opacity: .85 }}>{c.n}枚</div>
              </div>
            </div>
          ))}
        </div>

        {/* 全写真 (3列ぎっしり) */}
        <div style={{ padding: '0 22px 10px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
            color: 'var(--ink-3)' }}>すべての写真</div>
          <div style={{ fontSize: 11, color: 'var(--accent)' }}>{TOTAL_PHOTOS}枚</div>
        </div>
        <div style={{ padding: '0 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
          {all.map(p => (
            <div key={p.id} style={{ aspectRatio: '1 / 1', borderRadius: 4,
              background: `url(${p.thumb}) center/cover` }}/>
          ))}
        </div>
      </div>
      <TabBar active="search"/>
    </div>
  );
}
window.ScreenSearch = ScreenSearch;
