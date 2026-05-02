// data.js — Memoria サンプルデータ
// 7アルバム × 平均15-20枚 = 約110枚

const ALBUMS = [
  {
    id: 'kyoto',         title: '京都の冬',        subtitle: 'Kyoto, Japan',
    date: '2026.01',     year: 2026,  count: 18,  cover: 'kyoto-3',
    desc: '雪のちらつく朝、祖父の手を引いて歩いた石畳。' },
  {
    id: 'okinawa',       title: '沖縄、家族旅行',  subtitle: 'Okinawa, Japan',
    date: '2025.08',     year: 2025,  count: 22,  cover: 'okinawa-2',
    desc: '海の音と笑い声しか聞こえなかった四日間。' },
  {
    id: 'family',        title: 'おばあちゃんの誕生日', subtitle: 'Home, Tokyo',
    date: '2025.05',     year: 2025,  count: 14,  cover: 'family-1',
    desc: '七十五本のろうそく、みんなで吹き消した。' },
  {
    id: 'hokkaido',      title: '北海道、雪の朝',  subtitle: 'Hokkaido, Japan',
    date: '2025.02',     year: 2025,  count: 16,  cover: 'hokkaido-1',
    desc: '銀世界。湯気と、白い息と、やわらかい光。' },
  {
    id: 'paris',         title: 'パリの十日間',     subtitle: 'Paris, France',
    date: '2024.10',     year: 2024,  count: 24,  cover: 'paris-1',
    desc: '古い石と、新しい空。歩き疲れたら珈琲を。' },
  {
    id: 'hawaii',        title: 'ハワイの夏',       subtitle: 'Honolulu, USA',
    date: '2024.07',     year: 2024,  count: 19,  cover: 'hawaii-2',
    desc: '潮風、日焼け、夜のフラ。' },
  {
    id: 'daily',         title: '日々のかけら',     subtitle: 'Around Tokyo',
    date: '通年',         year: 2025,  count: 12,  cover: 'daily-1',
    desc: '何でもない日のごちそう。' },
];

// 1アルバムあたり N 枚を、6種類のプレースホルダーから循環させて生成。
function buildPhotos(album) {
  const out = [];
  const days = ['01','02','03','04','05'];
  for (let i = 0; i < album.count; i++) {
    const slot = (i % 6) + 1;        // 1..6
    const day = days[i % days.length];
    out.push({
      id: `${album.id}-${i+1}`,
      thumb: `placeholders/${album.id}-${slot}.svg`,
      full:  `placeholders/${album.id}-${slot}-lg.svg`,
      date:  `${album.date.replace('通年','2025.06')}.${day}`,
      caption: i === 0 ? album.desc : '',
    });
  }
  return out;
}

const PHOTOS = {};
ALBUMS.forEach(a => { PHOTOS[a.id] = buildPhotos(a); });

const TOTAL_PHOTOS = ALBUMS.reduce((s,a) => s + a.count, 0);

window.MEMORIA = { ALBUMS, PHOTOS, TOTAL_PHOTOS };
