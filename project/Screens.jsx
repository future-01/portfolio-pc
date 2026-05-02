// Screens.jsx — Memoria の各画面
// すべて 390×844 の Phone 内に収める。スマホファースト。

const { ALBUMS, PHOTOS, TOTAL_PHOTOS } = window.MEMORIA;

/* ─────────────────────────────────────────────────────────────
   1. オンボーディング (合言葉ロック画面)
   - 限定公開なので「見るときの合言葉」を明示
   ───────────────────────────────────────────────────────────── */
function ScreenLock() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Background — soft beige with photo glimpse */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #efe6d4 0%, #d8c4a4 60%, #a98864 100%)',
      }}/>
      <img src="placeholders/family-2-lg.svg" alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: .55, filter: 'blur(2px) saturate(.9)',
      }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(40,28,18,.05) 0%, rgba(40,28,18,.55) 100%)' }}/>

      {/* Lock badge */}
      <div style={{
        position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(255,255,255,.18)', border: '1px solid rgba(255,255,255,.3)',
        backdropFilter: 'blur(8px)', color: '#fff', fontSize: 11, letterSpacing: '.16em',
      }}>
        <Icon.Lock/> LIMITED · 家族のみ
      </div>

      {/* Wordmark */}
      <div style={{
        position: 'absolute', top: 220, left: 0, right: 0, textAlign: 'center', color: '#fff',
      }}>
        <div className="display" style={{
          fontSize: 64, lineHeight: 1, letterSpacing: '.02em',
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          textShadow: '0 2px 24px rgba(0,0,0,.25)',
        }}>Memoria</div>
        <div style={{ marginTop: 14, fontSize: 13, letterSpacing: '.32em', opacity: .85 }}>
          家族の、写真の本。
        </div>
      </div>

      {/* Passphrase */}
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 130 }}>
        <div style={{ color: 'rgba(255,255,255,.85)', fontSize: 12, marginBottom: 10, textAlign: 'center', letterSpacing: '.08em' }}>
          合言葉を入れてください
        </div>
        <div style={{
          height: 56, borderRadius: 16, background: 'rgba(255,255,255,.16)',
          border: '1px solid rgba(255,255,255,.28)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
        }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{
              width: 12, height: 12, borderRadius: 99,
              background: i <= 4 ? '#fff' : 'rgba(255,255,255,.3)',
            }}/>
          ))}
        </div>
        <div style={{
          marginTop: 14, height: 52, borderRadius: 14,
          background: '#fff', color: '#2a221a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 600, fontSize: 15, letterSpacing: '.04em',
          boxShadow: '0 8px 24px rgba(0,0,0,.18)',
        }}>はじめる</div>
        <div style={{ marginTop: 14, textAlign: 'center', color: 'rgba(255,255,255,.7)', fontSize: 11 }}>
          このサイトは家族のためだけにあります
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. ホーム (アルバム一覧) — メイン画面
   - ヒーロー: 最近のアルバム
   - その下: アルバムカード縦リスト (旅行先別)
   ───────────────────────────────────────────────────────────── */
function ScreenHome() {
  const featured = ALBUMS[0];
  const rest = ALBUMS.slice(1);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      {/* App bar */}
      <AppBar
        sub="Memoria"
        title={<>家族の、<br/>写真の本。</>}
        trailing={<><RoundBtn><Icon.Search/></RoundBtn></>}
      />

      {/* Scroll content */}
      <div style={{
        position: 'absolute', top: 168, left: 0, right: 0, bottom: 0,
        overflow: 'hidden', // 静的モック
      }}>
        {/* Featured hero */}
        <div style={{ padding: '0 18px 8px' }}>
          <div style={{
            position: 'relative', height: 320, borderRadius: 22, overflow: 'hidden',
            boxShadow: 'var(--shadow-2)', border: '1px solid var(--line)',
          }} className="grain">
            <img src={`placeholders/${featured.cover}-lg.svg`} alt="" style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            }}/>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(20,12,4,.65) 100%)',
            }}/>
            <div style={{ position: 'absolute', top: 14, left: 14 }}>
              <span className="tag tag-dark"><Icon.Sparkle/> 最新のアルバム</span>
            </div>
            <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, color: '#fff' }}>
              <div style={{ fontSize: 11, letterSpacing: '.18em', opacity: .85, marginBottom: 4 }}>
                {featured.subtitle.toUpperCase()} · {featured.date}
              </div>
              <div className="display" style={{
                fontFamily: "'Shippori Mincho', serif", fontSize: 28, lineHeight: 1.15, fontWeight: 500,
              }}>{featured.title}</div>
              <div style={{ marginTop: 8, fontSize: 12, opacity: .85 }}>{featured.count} 枚 · {featured.desc}</div>
            </div>
          </div>
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '20px 22px 10px' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '.18em', color: 'var(--ink-3)' }}>BY DESTINATION</div>
            <div className="serif" style={{ fontSize: 19, marginTop: 2, fontFamily: "'Shippori Mincho', serif" }}>旅行先で見る</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--accent)' }}>すべて &nbsp;<Icon.ChevR style={{ verticalAlign: -3 }}/></div>
        </div>

        {/* Album list — horizontal cards */}
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rest.slice(0,3).map(a => (
            <div key={a.id} className="paper" style={{
              padding: 10, display: 'flex', gap: 12, alignItems: 'center',
              borderRadius: 18,
            }}>
              <div style={{
                width: 92, height: 92, borderRadius: 14, overflow: 'hidden', flex: 'none', position: 'relative',
                boxShadow: 'inset 0 0 0 1px rgba(74,55,35,.08)',
              }}>
                <img src={`placeholders/${a.cover}.svg`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10.5, letterSpacing: '.18em', color: 'var(--ink-3)' }}>
                  {a.subtitle.toUpperCase()}
                </div>
                <div className="serif" style={{
                  fontFamily: "'Shippori Mincho', serif", fontSize: 17, marginTop: 2, color: 'var(--ink)',
                }}>{a.title}</div>
                <div style={{ marginTop: 6, fontSize: 11.5, color: 'var(--ink-3)', display: 'flex', gap: 10 }}>
                  <span>{a.date}</span><span>·</span><span>{a.count}枚</span>
                </div>
              </div>
              <Icon.ChevR style={{ color: 'var(--ink-3)', flex: 'none' }}/>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="home"/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. アルバム一覧 (グリッド表示) — Home の別バリエーション/全アルバム
   ───────────────────────────────────────────────────────────── */
function ScreenAlbums() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      <AppBar
        sub="ALBUMS · 7冊 · 写真125枚"
        title="アルバム"
        trailing={<><RoundBtn><Icon.Search/></RoundBtn></>}
      />

      {/* Filter chips */}
      <div style={{ padding: '0 18px 12px', display: 'flex', gap: 8, overflowX: 'hidden' }}>
        <div className="chip is-active">旅行先</div>
        <div className="chip">年別</div>
        <div className="chip">人物</div>
        <div className="chip">お気に入り</div>
      </div>

      <div style={{ position: 'absolute', top: 220, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <div style={{
          padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        }}>
          {ALBUMS.slice(0,6).map((a, i) => (
            <div key={a.id} style={{
              borderRadius: 16, overflow: 'hidden',
              background: 'var(--bg-elev)', border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-1)',
            }}>
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                <img src={`placeholders/${a.cover}.svg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(6px)',
                  padding: '2px 8px', borderRadius: 99, fontSize: 10.5, color: 'var(--ink-2)',
                  border: '1px solid rgba(255,255,255,.4)',
                }}>{a.count}</div>
              </div>
              <div style={{ padding: '10px 12px 12px' }}>
                <div className="serif" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 14.5, color: 'var(--ink)' }}>
                  {a.title}
                </div>
                <div style={{ marginTop: 3, fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '.06em' }}>
                  {a.date} · {a.subtitle}
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

/* ─────────────────────────────────────────────────────────────
   4. アルバム詳細 — フルブリードのカバー + 写真グリッド
   ───────────────────────────────────────────────────────────── */
function ScreenAlbumDetail() {
  const album = ALBUMS[1]; // 沖縄
  const photos = PHOTOS[album.id];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Cover hero */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 360, overflow: 'hidden' }}>
        <img src={`placeholders/${album.cover}-lg.svg`} alt="" style={{
          width: '100%', height: '100%', objectFit: 'cover',
        }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(40,28,18,.35) 0%, rgba(40,28,18,0) 30%, rgba(245,239,230,1) 100%)' }}/>
      </div>

      {/* Top chrome — back + actions */}
      <div style={{ position: 'absolute', top: 56, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <RoundBtn dark><Icon.ChevL/></RoundBtn>
        <div style={{ display: 'flex', gap: 8 }}>
          <RoundBtn dark><Icon.Share/></RoundBtn>
          <RoundBtn dark><Icon.More/></RoundBtn>
        </div>
      </div>

      {/* Title overlay */}
      <div style={{ position: 'absolute', top: 220, left: 22, right: 22, color: '#fff', zIndex: 5 }}>
        <div style={{ fontSize: 11, letterSpacing: '.22em', opacity: .9, marginBottom: 6 }}>
          {album.subtitle.toUpperCase()} · {album.date}
        </div>
        <div className="display" style={{
          fontFamily: "'Shippori Mincho', serif", fontSize: 30, lineHeight: 1.15, fontWeight: 500,
        }}>{album.title}</div>
      </div>

      {/* Meta strip */}
      <div style={{
        position: 'absolute', top: 320, left: 18, right: 18,
        background: 'var(--bg-elev)', border: '1px solid var(--line)',
        borderRadius: 18, padding: '14px 16px',
        boxShadow: 'var(--shadow-2)', zIndex: 8,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>
            「{album.desc}」
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--ink-3)', display: 'flex', gap: 12 }}>
            <span><Icon.Pin style={{verticalAlign:-2}}/> 那覇 · 恩納</span>
            <span>·</span>
            <span>{album.count} 枚</span>
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div style={{
        position: 'absolute', top: 432, left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
      }}>
        <div style={{ padding: '0 14px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
          {photos.slice(0, 12).map((p, i) => (
            <div key={p.id} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: 4 }}>
              <img src={p.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </div>
          ))}
        </div>
      </div>

      {/* Floating action — download all */}
      <div style={{
        position: 'absolute', right: 16, bottom: 100, zIndex: 30,
        height: 48, padding: '0 16px 0 14px', borderRadius: 99,
        background: 'var(--ink)', color: 'var(--bg)',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 10px 24px rgba(40,28,18,.3)', fontSize: 13,
      }}>
        <Icon.Down/> アルバムを保存
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. ライトボックス (写真の拡大表示)
   ───────────────────────────────────────────────────────────── */
function ScreenLightbox() {
  const album = ALBUMS[3]; // 北海道
  const photos = PHOTOS[album.id];
  const cur = photos[2];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0a0806' }}>
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 56, left: 14, right: 14, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff',
      }}>
        <RoundBtn dark><Icon.Close/></RoundBtn>
        <div style={{ textAlign: 'center' }}>
          <div className="serif" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 14 }}>{album.title}</div>
          <div style={{ fontSize: 10.5, opacity: .65, marginTop: 2 }}>3 / {album.count}</div>
        </div>
        <RoundBtn dark><Icon.Info/></RoundBtn>
      </div>

      {/* Main photo (centered) */}
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, bottom: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8,
      }}>
        <img src={cur.full} alt="" style={{
          maxWidth: '100%', maxHeight: '100%', borderRadius: 8,
          boxShadow: '0 20px 50px rgba(0,0,0,.6)',
        }}/>
      </div>

      {/* Caption + date */}
      <div style={{
        position: 'absolute', left: 22, right: 22, bottom: 142, color: '#fff', textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, letterSpacing: '.18em', opacity: .65 }}>{cur.date.replaceAll('.','/')}</div>
        <div className="serif" style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 14, marginTop: 6, opacity: .92, lineHeight: 1.6 }}>
          銀世界、湯気と白い息と、やわらかい光。
        </div>
      </div>

      {/* Filmstrip */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 84, zIndex: 5,
        display: 'flex', gap: 5, padding: '0 16px', alignItems: 'center', justifyContent: 'center',
      }}>
        {photos.slice(0,7).map((p, i) => (
          <div key={p.id} style={{
            width: i === 2 ? 56 : 40, height: i === 2 ? 56 : 40,
            borderRadius: 6, overflow: 'hidden', flex: 'none',
            border: i === 2 ? '2px solid #f5e6cd' : '1.5px solid rgba(255,255,255,.15)',
            opacity: i === 2 ? 1 : .55,
            transition: 'all .2s',
          }}>
            <img src={p.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          </div>
        ))}
      </div>

      {/* Action row */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 22, zIndex: 5,
        display: 'flex', gap: 10,
      }}>
        <div className="tap" style={{
          flex: 1, height: 48, borderRadius: 14,
          background: 'rgba(255,255,255,.10)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,.18)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13,
        }}><Icon.Heart/> お気に入り</div>
        <div className="tap" style={{
          flex: 1, height: 48, borderRadius: 14,
          background: 'rgba(255,255,255,.10)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,.18)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 13,
        }}><Icon.Down/> 元データを保存</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   6. 年別ビュー — タイムライン
   ───────────────────────────────────────────────────────────── */
function ScreenYears() {
  const groups = [
    { y: 2026, items: ALBUMS.filter(a => a.year === 2026) },
    { y: 2025, items: ALBUMS.filter(a => a.year === 2025) },
    { y: 2024, items: ALBUMS.filter(a => a.year === 2024) },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      <AppBar sub="TIMELINE" title="年別に見る" trailing={<RoundBtn><Icon.Search/></RoundBtn>}/>

      <div style={{ position: 'absolute', top: 168, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {groups.map(g => (
          <div key={g.y} style={{ marginBottom: 28 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              padding: '0 22px 10px',
            }}>
              <div className="display" style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
                fontSize: 36, color: 'var(--ink)',
              }}>{g.y}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '.1em' }}>
                {g.items.reduce((s,a)=>s+a.count,0)} 枚 · {g.items.length} 冊
              </div>
            </div>
            <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.items.map(a => (
                <div key={a.id} className="paper" style={{
                  display: 'flex', borderRadius: 14, overflow: 'hidden', padding: 0, alignItems: 'stretch',
                }}>
                  <div style={{ width: 80, flex: 'none', position: 'relative' }}>
                    <img src={`placeholders/${a.cover}.svg`} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <div style={{ padding: '12px 14px', flex: 1 }}>
                    <div style={{ fontSize: 10.5, letterSpacing: '.18em', color: 'var(--ink-3)' }}>
                      {a.date}
                    </div>
                    <div className="serif" style={{
                      fontFamily: "'Shippori Mincho', serif", fontSize: 15.5, marginTop: 3, color: 'var(--ink)',
                    }}>{a.title}</div>
                    <div style={{ marginTop: 6, fontSize: 11, color: 'var(--ink-3)' }}>
                      {a.subtitle} · {a.count}枚
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <TabBar active="years"/>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   7. プロフィール / 設定 — 限定公開と家族設定
   ───────────────────────────────────────────────────────────── */
function ScreenProfile() {
  const rows = [
    { i: 'みのり (母)', s: '管理者' },
    { i: '健太 (父)',   s: '閲覧・追加' },
    { i: 'おばあちゃん',s: '閲覧のみ' },
    { i: 'ゆうた',     s: '閲覧のみ' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      <AppBar sub="MY MEMORIA" title="設定" trailing={null}/>

      <div style={{ position: 'absolute', top: 168, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        {/* Privacy panel */}
        <div style={{ padding: '0 18px 14px' }}>
          <div className="paper" style={{ padding: 16, borderRadius: 18, position: 'relative', overflow:'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(184,146,101,.10), rgba(184,146,101,0))',
              pointerEvents: 'none',
            }}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent)' }}>
              <Icon.Lock/> <span style={{ fontSize: 11.5, letterSpacing: '.16em' }}>LIMITED ACCESS</span>
            </div>
            <div className="serif" style={{
              fontFamily: "'Shippori Mincho', serif", fontSize: 18, marginTop: 8, color: 'var(--ink)',
            }}>家族のみ、4人が閲覧中</div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 6, lineHeight: 1.6 }}>
              リンクは家族にだけ共有しています。<br/>
              合言葉と二段階確認で守られています。
            </div>
          </div>
        </div>

        {/* Family list */}
        <div style={{ padding: '4px 22px 8px', fontSize: 11, letterSpacing: '.18em', color: 'var(--ink-3)' }}>
          FAMILY · 4人
        </div>
        <div style={{ padding: '0 18px' }}>
          <div style={{
            background: 'var(--bg-elev)', border: '1px solid var(--line)',
            borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-1)',
          }}>
            {rows.map((r, i) => (
              <div key={r.i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderTop: i === 0 ? 'none' : '1px solid var(--line)',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 99,
                  background: ['#cdb595','#b89265','#a08a72','#9a7a5c'][i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, fontWeight: 600,
                }}>{r.i.slice(0,1)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: 'var(--ink)' }}>{r.i}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{r.s}</div>
                </div>
                <Icon.ChevR style={{ color: 'var(--ink-3)' }}/>
              </div>
            ))}
          </div>
        </div>

        {/* Settings list */}
        <div style={{ padding: '20px 22px 8px', fontSize: 11, letterSpacing: '.18em', color: 'var(--ink-3)' }}>
          SETTINGS
        </div>
        <div style={{ padding: '0 18px' }}>
          <div style={{
            background: 'var(--bg-elev)', border: '1px solid var(--line)',
            borderRadius: 18, overflow: 'hidden', boxShadow: 'var(--shadow-1)',
          }}>
            {[
              ['顔写真の自動ぼかし', 'オフ'],
              ['ダウンロードを許可', '管理者のみ'],
              ['通知', '新しいアルバムのみ'],
              ['表示テーマ', 'Sand'],
            ].map((r, i) => (
              <div key={r[0]} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                borderTop: i === 0 ? 'none' : '1px solid var(--line)',
              }}>
                <div style={{ flex: 1, fontSize: 14, color: 'var(--ink)' }}>{r[0]}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{r[1]}</div>
                <Icon.ChevR style={{ color: 'var(--ink-3)' }}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar active="profile"/>
    </div>
  );
}

Object.assign(window, {
  ScreenLock, ScreenHome, ScreenAlbums, ScreenAlbumDetail,
  ScreenLightbox, ScreenYears, ScreenProfile,
});
