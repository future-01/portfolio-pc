// ScreenLightbox.jsx — 写真の拡大表示

function ScreenLightbox({ albumId = 'kyoto', index = 2 }) {
  const album = ALBUMS.find(a => a.id === albumId);
  const photo = PHOTOS[albumId][index];

  return (
    <div style={{ height: '100%', position: 'relative', background: '#0e0a06', overflow: 'hidden' }}>
      {/* ぼかし背景 */}
      <div style={{ position: 'absolute', inset: 0,
        background: `url(${photo.full}) center/cover`, filter: 'blur(40px) saturate(.7)', opacity: .4 }}/>

      {/* メインフォト */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 16px 200px' }}>
        <div style={{ width: '100%', aspectRatio: '3 / 4', borderRadius: 14,
          background: `url(${photo.full}) center/cover`,
          boxShadow: '0 20px 60px rgba(0,0,0,.5), 0 4px 14px rgba(0,0,0,.4)' }}/>
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

      {/* ページ番号 */}
      <div style={{ position: 'absolute', top: 118, left: 0, right: 0, textAlign: 'center',
        zIndex: 10, fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
        fontSize: 13, color: 'rgba(255,255,255,.65)', letterSpacing: '.1em' }}>
        {String(index+1).padStart(2,'0')} / {String(album.count).padStart(2,'0')}
      </div>

      {/* 下部: メタ + アクション */}
      <div style={{ position: 'absolute', left: 14, right: 14, bottom: 28, zIndex: 10 }}>
        {/* メタカード (グラスモーフィズム) */}
        <div style={{
          background: 'rgba(20,14,8,.55)',
          border: '1px solid rgba(255,255,255,.1)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderRadius: 18, padding: '14px 16px', color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ fontSize: 12, opacity: .85, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon.Calendar/> {photo.date}
            </div>
            <div style={{ fontSize: 11, opacity: .6 }}>FUJIFILM · ƒ/2.8</div>
          </div>
          <div style={{ fontFamily: "'Shippori Mincho',serif", fontSize: 14.5, lineHeight: 1.55 }}>
            雪のあと、底冷えのする朝。<br/>
            祖父の手は、思っていたよりずっと温かかった。
          </div>
        </div>
        {/* アクション行 */}
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

      {/* ホームインジケータ用余白 */}
    </div>
  );
}
window.ScreenLightbox = ScreenLightbox;
