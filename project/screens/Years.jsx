// ScreenYears.jsx — 年別ビュー (補助分類)

function ScreenYears() {
  const years = [
    { y: 2026, count: 18, albums: ['kyoto'] },
    { y: 2025, count: 83, albums: ['okinawa','family','hokkaido','daily'] },
    { y: 2024, count: 43, albums: ['paris','hawaii'] },
    { y: 2023, count: 8,  albums: ['daily'] },
  ];

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '64px 22px 8px' }}>
          <div style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--ink-3)', marginBottom: 4 }}>By Year</div>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 30, fontWeight: 500,
            color: 'var(--ink)' }}>年で振り返る</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.7 }}>
            写真は時間と一緒に。<br/>
            上から新しい順に並んでいます。
          </div>
        </div>

        {years.map(({ y, count, albums }, i) => (
          <div key={y} style={{ padding: '22px 18px 8px' }}>
            {/* 年見出し */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              padding: '0 4px 12px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 500,
                color: 'var(--ink)', lineHeight: 1, letterSpacing: '.01em' }}>{y}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', letterSpacing: '.05em' }}>
                {albums.length}冊 · {count}枚
              </div>
            </div>
            {/* 年内のアルバムを横スクロール */}
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none',
              padding: '0 4px 4px' }}>
              {albums.map(aid => {
                const a = ALBUMS.find(x => x.id === aid);
                return (
                  <div key={aid} style={{ minWidth: 156, borderRadius: 14, overflow: 'hidden',
                    background: 'var(--bg-elev)', border: '1px solid var(--line)',
                    boxShadow: 'var(--shadow-1)' }}>
                    <div style={{ aspectRatio: '4 / 5',
                      background: `url(placeholders/${a.cover}-lg.svg) center/cover` }}/>
                    <div style={{ padding: '8px 11px 11px' }}>
                      <div style={{ fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase',
                        color: 'var(--ink-3)', marginBottom: 2 }}>{a.date}</div>
                      <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 13.5,
                        fontWeight: 500, color: 'var(--ink)' }}>{a.title}</div>
                    </div>
                  </div>
                );
              })}
              {/* 「すべて見る」 */}
              <div className="tap" style={{ minWidth: 90, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                borderRadius: 14, border: '1px dashed var(--line-strong)',
                color: 'var(--ink-3)', fontSize: 11.5, letterSpacing: '.05em', gap: 6 }}>
                <Icon.ChevR/> すべて
              </div>
            </div>
            {i < years.length - 1 && <div style={{ height: 1, background: 'var(--line)', marginTop: 22 }}/>}
          </div>
        ))}
      </div>
      <TabBar active="years"/>
    </div>
  );
}
window.ScreenYears = ScreenYears;
