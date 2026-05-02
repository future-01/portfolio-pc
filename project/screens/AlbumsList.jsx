// ScreenAlbumsList.jsx — アルバム一覧の別ビュー (リスト/グリッド切替の "リスト案")

function ScreenAlbumsList() {
  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '64px 22px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase',
              color: 'var(--ink-3)', marginBottom: 4 }}>Albums</div>
            <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 30, fontWeight: 500,
              color: 'var(--ink)' }}>アルバム</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <RoundBtn><Icon.Grid/></RoundBtn>
          </div>
        </div>

        {/* 並べ替え */}
        <div style={{ display: 'flex', gap: 6, padding: '0 18px 18px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['新しい順','古い順','旅行先','枚数順'].map((t, i) => (
            <div key={t} className={'chip' + (i === 0 ? ' is-active' : '')}>{t}</div>
          ))}
        </div>

        {/* リスト形式アルバム (横長カード) */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ALBUMS.map(a => (
            <div key={a.id} style={{ display: 'flex', gap: 14, alignItems: 'stretch',
              background: 'var(--bg-elev)', border: '1px solid var(--line)',
              borderRadius: 16, padding: 10, boxShadow: 'var(--shadow-1)' }}>
              <div style={{ width: 96, height: 120, borderRadius: 10, flexShrink: 0,
                background: `url(placeholders/${a.cover}-lg.svg) center/cover` }}/>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 4px 4px 0' }}>
                <div style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase',
                  color: 'var(--ink-3)', marginBottom: 4 }}>{a.subtitle} · {a.date}</div>
                <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 17, fontWeight: 500,
                  color: 'var(--ink)', marginBottom: 6, lineHeight: 1.25 }}>{a.title}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.55,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc}</div>
                <div style={{ flex: 1 }}/>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{a.count}枚</span>
                  <Icon.ChevR style={{ color: 'var(--ink-3)' }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="home"/>
    </div>
  );
}
window.ScreenAlbumsList = ScreenAlbumsList;
