// ScreenVideoLightbox.jsx — 動画ライトボックス (静止画版とほぼ同じUIだが、▶/タイムラインを足す)

function ScreenVideoLightbox({ albumId = 'okinawa', index = 5 }) {
  const album = ALBUMS.find(a => a.id === albumId);
  const photo = PHOTOS[albumId][index];

  return (
    <div style={{ height: '100%', position: 'relative', background: '#0a0703', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0,
        background: `url(${photo.full}) center/cover`, filter: 'blur(40px) saturate(.7)', opacity: .35 }}/>

      {/* メイン動画 (まだタップされていない、再生前の状態) */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 16px 220px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', borderRadius: 14,
          background: `url(${photo.full}) center/cover`,
          boxShadow: '0 20px 60px rgba(0,0,0,.5), 0 4px 14px rgba(0,0,0,.4)', overflow: 'hidden' }}>
          {/* 再生ボタン */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 76, height: 76, borderRadius: 999,
            background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(0,0,0,.4)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#2a221a"/></svg>
          </div>
          {/* 「タップで再生」 */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(50% + 52px)',
            textAlign: 'center', color: '#fff', fontSize: 11, letterSpacing: '.1em',
            textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>
            タップで再生 · 音はオフではじまります
          </div>
          {/* 尺バッジ */}
          <div style={{ position: 'absolute', top: 12, right: 12,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(20,12,6,.65)', backdropFilter: 'blur(8px)',
            color: '#fff', fontSize: 11, letterSpacing: '.05em',
            fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
            display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#e6c89a' }}/>
            VIDEO · 0:24
          </div>
        </div>
      </div>

      {/* トップバー */}
      <div style={{ position: 'absolute', top: 60, left: 14, right: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <RoundBtn dark><Icon.Close/></RoundBtn>
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 10.5, letterSpacing: '.18em', opacity: .7,
            textTransform: 'uppercase' }}>{album.subtitle}</div>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 14, fontWeight: 500,
            marginTop: 2 }}>{album.title}</div>
        </div>
        <RoundBtn dark><Icon.More/></RoundBtn>
      </div>

      {/* 下部: メタ + タイムライン */}
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 28, zIndex: 10 }}>
        <div style={{
          background: 'rgba(20,14,8,.55)', border: '1px solid rgba(255,255,255,.1)',
          backdropFilter: 'blur(20px) saturate(160%)',
          borderRadius: 18, padding: '14px 16px', color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontSize: 12, opacity: .85, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon.Calendar/> {photo.date}
            </div>
            <div style={{ fontSize: 11, opacity: .6,
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>iPhone · 4K · 30fps</div>
          </div>
          {/* タイムライン (再生前) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 11, opacity: .8,
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>0:00</span>
            <div style={{ flex: 1, height: 3, borderRadius: 99,
              background: 'rgba(255,255,255,.18)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '0%',
                background: '#e6c89a' }}/>
            </div>
            <span style={{ fontSize: 11, opacity: .8,
              fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic' }}>0:24</span>
          </div>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 14, lineHeight: 1.55 }}>
            波打ち際を駆ける足音と、笑い声。<br/>
            <span style={{ opacity: .7, fontSize: 12 }}>音をオンにすると、はっきり聞こえます。</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14,
          padding: '8px 4px', color: '#fff' }}>
          {[
            { icon: <Icon.Heart/>, label: 'お気に入り' },
            { icon: <Icon.Down/>,  label: '保存' },
            { icon: <Icon.Share/>, label: '共有' },
            { icon: <Icon.Info/>,  label: '詳細' },
          ].map(a => (
            <div key={a.label} className="tap" style={{ display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4, opacity: .92 }}>
              <div style={{ width: 44, height: 44, borderRadius: 999,
                background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</div>
              <span style={{ fontSize: 10.5, letterSpacing: '.05em', opacity: .85 }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
window.ScreenVideoLightbox = ScreenVideoLightbox;
