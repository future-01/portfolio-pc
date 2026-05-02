// ScreenAlbum.jsx — アルバム詳細 (写真グリッド)

function ScreenAlbum({ albumId = 'okinawa' }) {
  const album = ALBUMS.find(a => a.id === albumId);
  const photos = PHOTOS[albumId];

  return (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ height: '100%', overflow: 'auto', paddingBottom: 110 }}>
        {/* ヒーロー */}
        <div style={{ position: 'relative', height: 360,
          background: `url(placeholders/${album.cover}-lg.svg) center/cover` }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(20,12,6,.35) 0%, rgba(20,12,6,0) 35%, rgba(20,12,6,0) 60%, rgba(245,239,230,1) 100%)' }}/>

          {/* nav */}
          <div style={{ position: 'absolute', top: 60, left: 14, right: 14,
            display: 'flex', justifyContent: 'space-between' }}>
            <RoundBtn dark><Icon.ChevL/></RoundBtn>
            <div style={{ display: 'flex', gap: 8 }}>
              <RoundBtn dark><Icon.Share/></RoundBtn>
              <RoundBtn dark><Icon.More/></RoundBtn>
            </div>
          </div>

          {/* title block */}
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 28, color: '#fff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
              opacity: .9, marginBottom: 6 }}>
              <Icon.Pin/> {album.subtitle}
            </div>
            <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 32, fontWeight: 500,
              lineHeight: 1.18, marginBottom: 8 }}>{album.title}</div>
            <div style={{ fontSize: 12.5, opacity: .9, lineHeight: 1.6, maxWidth: 280 }}>{album.desc}</div>
          </div>
        </div>

        {/* meta strip */}
        <div style={{ padding: '6px 22px 16px', display: 'flex', alignItems: 'center', gap: 14,
          fontSize: 11.5, color: 'var(--ink-2)', letterSpacing: '.05em' }}>
          <span><Icon.Calendar style={{ verticalAlign: -3, marginRight: 4 }}/> {album.date}</span>
          <span style={{ width: 1, height: 12, background: 'var(--line-strong)' }}/>
          <span>{album.count}枚の写真</span>
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4,
            color: 'var(--accent)' }}>
            <Icon.Heart/> 12
          </span>
        </div>

        {/* フィルタチップ */}
        <div style={{ display: 'flex', gap: 6, padding: '0 18px 14px', overflowX: 'auto',
          scrollbarWidth: 'none' }}>
          {['すべて','風景','人物','ハイライト'].map((t, i) => (
            <div key={t} className={'chip' + (i === 0 ? ' is-active' : '')}>{t}</div>
          ))}
        </div>

        {/* 日付グループ — 2列のミックスグリッド */}
        <DateGroup date="2025.08.10 (日)" photos={photos.slice(0, 8)}/>
        <DateGroup date="2025.08.11 (月)" photos={photos.slice(8, 16)}/>
        <DateGroup date="2025.08.12 (火)" photos={photos.slice(16, 22)}/>
      </div>

      <TabBar active="home"/>
    </div>
  );
}

function DateGroup({ date, photos }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ padding: '4px 22px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--accent)' }}/>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
          fontSize: 16, color: 'var(--ink-2)', letterSpacing: '.04em' }}>{date}</span>
        <span style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
      </div>
      <div style={{ padding: '0 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {photos.map((p, i) => {
          // 最初の写真だけフルワイド / 2-3番目を動画として演出
          const span = i === 0 ? '1 / -1' : 'auto';
          const ratio = i === 0 ? '4 / 3' : '1 / 1';
          const isVideo = i === 2 || i === 5;
          return (
            <div key={p.id} style={{ gridColumn: span, position: 'relative',
              aspectRatio: ratio, borderRadius: 10, overflow: 'hidden',
              background: `url(${p.thumb}) center/cover`, boxShadow: 'var(--shadow-1)' }}>
              {i === 0 && (
                <div style={{ position: 'absolute', left: 10, bottom: 8, fontSize: 10,
                  color: '#fff', letterSpacing: '.06em',
                  textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>{p.date}</div>
              )}
              {isVideo && (
                <React.Fragment>
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.35) 100%)' }}/>
                  <div style={{ position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)', width: 38, height: 38, borderRadius: 999,
                    background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,.25)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#2a221a"/></svg>
                  </div>
                  <div style={{ position: 'absolute', right: 6, bottom: 6, fontSize: 9,
                    color: '#fff', padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(20,12,6,.6)', backdropFilter: 'blur(4px)',
                    fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', letterSpacing: '.04em' }}>
                    {i === 2 ? '0:18' : '0:24'}
                  </div>
                </React.Fragment>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.ScreenAlbum = ScreenAlbum;
