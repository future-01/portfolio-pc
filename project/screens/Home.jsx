// ScreenHome.jsx — トップ画面 (アルバム一覧)

function ScreenHome() {
  const featured = ALBUMS[0];
  const others = ALBUMS.slice(1, 5);

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
        {/* App bar */}
        <div style={{ padding: '64px 22px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase',
              color: 'var(--ink-3)', marginBottom: 4 }}>Family Archive</div>
            <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 30, fontWeight: 500,
              letterSpacing: '.01em', color: 'var(--ink)' }}>記憶 <span style={{
                fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 26,
                color: 'var(--accent)', marginLeft: 4 }}>Memoria</span></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <RoundBtn><Icon.Search /></RoundBtn>
          </div>
        </div>

        {/* Greeting */}
        <div style={{ padding: '4px 22px 20px', fontSize: 13, color: 'var(--ink-2)', letterSpacing: '.04em' }}>
          おかえりなさい、<span style={{ color: 'var(--accent)' }}>みらいさん</span>。<br />
          <span style={{ color: 'var(--ink-3)' }}>新しい写真が <b style={{ color: 'var(--ink)' }}>12枚</b> 届いています。</span>
        </div>

        {/* Featured cover — 最新アルバムを大きく */}
        <div style={{ padding: '0 18px 22px' }}>
          <div style={{ position: 'relative', borderRadius: 22, overflow: 'hidden',
            aspectRatio: '4 / 5',
            background: `url(placeholders/${featured.cover}-lg.svg) center/cover`,
            boxShadow: 'var(--shadow-2)' }}>
            <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(20,12,6,.65) 100%)' }} />
            <div style={{ position: 'absolute', top: 14, left: 14 }}>
              <span className="tag tag-dark">最新</span>
            </div>
            <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18, color: '#fff' }}>
              <div style={{ fontSize: 11, letterSpacing: '.18em', opacity: .85, marginBottom: 6 }}>
                {featured.subtitle.toUpperCase()} · {featured.date}
              </div>
              <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 26, fontWeight: 500,
                lineHeight: 1.2, marginBottom: 6 }}>{featured.title}</div>
              <div style={{ fontSize: 12.5, opacity: .85, lineHeight: 1.6 }}>
                {featured.desc}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10,
                fontSize: 11.5, opacity: .8 }}>
                <Icon.Pin /> {featured.subtitle.split(',')[0]} · {featured.count}枚
              </div>
            </div>
          </div>
        </div>

        {/* セクション見出し: アルバム */}
        <div style={{ padding: '0 22px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase',
              color: 'var(--ink-3)', marginBottom: 2 }}>Albums</div>
            <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 19, fontWeight: 500,
              color: 'var(--ink)' }}>旅とできごと</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 2 }}>
            すべて <Icon.ChevR />
          </div>
        </div>

        {/* 2列グリッド */}
        <div style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {others.map((a) =>
          <AlbumCard key={a.id} album={a} />
          )}
        </div>

        {/* セクション: 横スクロール「年で振り返る」 */}
        <div style={{ padding: '28px 22px 12px' }}>
          <div style={{ fontSize: 10.5, letterSpacing: '.22em', textTransform: 'uppercase',
            color: 'var(--ink-3)', marginBottom: 2 }}>By Year</div>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 19, fontWeight: 500,
            color: 'var(--ink)' }}>年で振り返る</div>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '4px 18px 4px',
          scrollbarWidth: 'none' }}>
          {[2026, 2025, 2024, 2023].map((y, i) =>
          <div key={y} style={{
            minWidth: 116, height: 142, borderRadius: 16, position: 'relative', overflow: 'hidden',
            background: `url(placeholders/${['kyoto', 'okinawa', 'paris', 'hawaii'][i]}-${i % 6 + 1}.svg) center/cover`,
            boxShadow: 'var(--shadow-1)'
          }}>
              <div style={{ position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,12,6,.7) 100%)' }} />
              <div style={{ position: 'absolute', left: 10, bottom: 10, color: '#fff' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, lineHeight: 1, fontWeight: 500 }}>{y}</div>
                <div style={{ fontSize: 10.5, opacity: .85, marginTop: 2 }}>
                  {[3, 4, 2, 1][i]}冊 · {[42, 56, 24, 8][i]}枚
                </div>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <div style={{ padding: '32px 22px 12px', textAlign: 'center', fontSize: 11,
          color: 'var(--ink-3)', letterSpacing: '.08em' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
            fontSize: 13, marginBottom: 4 }}>— a quiet place —</div>
          全 {TOTAL_PHOTOS} 枚 · 7 アルバム
        </div>
      </div>

      <TabBar active="home" />
    </div>);

}

function AlbumCard({ album }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--bg-elev)',
      border: '1px solid var(--line)', boxShadow: 'var(--shadow-1)' }}>
      <div style={{ position: 'relative', aspectRatio: '4 / 5',
        background: `url(placeholders/${album.cover}-lg.svg) center/cover` }}>
        <div style={{ position: 'absolute', top: 8, right: 8,
          padding: '3px 8px', borderRadius: 999, fontSize: 10, letterSpacing: '.04em',
          background: 'rgba(255,255,255,.85)', color: 'var(--ink-2)', backdropFilter: 'blur(6px)' }}>
          {album.count}
        </div>
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
          color: 'var(--ink-3)', marginBottom: 2 }}>{album.date}</div>
        <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 14.5, fontWeight: 500,
          color: 'var(--ink)', lineHeight: 1.3 }}>{album.title}</div>
      </div>
    </div>);

}
window.ScreenHome = ScreenHome;