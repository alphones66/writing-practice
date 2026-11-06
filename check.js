// 錯字與標點的小提醒（用常見錯誤的對照表找，不是萬能的，只能抓常見的）
const SIMP = '们们这说时个对吗为从来学会还开关见问长东车门国过发现点样后里种实当话读写书爱欢乐让听觉经应该总认识谢请记飞鸟鱼马龙红蓝绿黄饭么没边运动园师帮带电脑视买卖热气节难题业习练体几岁图馆礼兴笔纸钱颜声诉谁树猫鸡鸭猪'.split('');
const TRAD = '們們這說時個對嗎為從來學會還開關見問長東車門國過發現點樣後裡種實當話讀寫書愛歡樂讓聽覺經應該總認識謝請記飛鳥魚馬龍紅藍綠黃飯麼沒邊運動園師幫帶電腦視買賣熱氣節難題業習練體幾歲圖館禮興筆紙錢顏聲訴誰樹貓雞鴨豬'.split('');
const S2T = {}; SIMP.forEach((c, i) => { S2T[c] = TRAD[i]; });
const CJK = /[一-鿿]/;
const PLACE = '家|學校|公園|海邊|房間|教室|圖書館|操場|床上|桌上|車上|路上|裡面|外面|這裡|那裡|客廳|廚房';
const ACT = '跑|走|說|唱|玩|吃|睡|笑|哭|看|長|寫|做|想|飛|跳|讀|畫|唸|講|等|忙|住|考|演|表現';
const DEG = '很|好|快|慢|高|大|多|太|真|非常|十分|特別|開心|高興|清楚|漂亮|整齊|認真|累|痛|大聲|小聲';
const MAN = '高興|開心|快樂|認真|慢慢|輕輕|大聲|用力|安靜|仔細|興奮|努力|小心|偷偷|靜靜|默默|匆匆|開開心心|高高興興';
const VERB = '走|跑|說|唱|跳|笑|看|想|做|寫|讀|吃|玩|飛|爬|講|問|回答|走進|走過|說話|工作|打招呼';
// [找什麼, 改成什麼, 為什麼]  改成的字串可以用 $1
const RULES = [
  [/己經/g, '已經', '「已經」的「已」，下面是封起來的，不是自己的「己」。'],
  [/以經/g, '已經', '「已經」是「已」，不是「以」。'],
  [/已後/g, '以後', '「以後」是「以」，不是「已」。'],
  [/已前/g, '以前', '「以前」是「以」，不是「已」。'],
  [/所已/g, '所以', '「所以」是「以」。'],
  [/可已/g, '可以', '「可以」是「以」。'],
  [/因該/g, '應該', '應該的「應」，上面有一個「广」。'],
  [/覺的/g, '覺得', '「覺得」是「得」，表示感覺。'],
  [/記的/g, '記得', '「記得」是「得」。'],
  [/值的/g, '值得', '「值得」是「得」。'],
  [/懂的(?!人)/g, '懂得', '「懂得」是「得」。'],
  [/捨不的/g, '捨不得', '「捨不得」是「得」。'],
  [/不的不/g, '不得不', '「不得不」是「得」。'],
  [/在見/g, '再見', '「再見」是「再」，表示以後還會見面。'],
  [/在會/g, '再會', '「再會」是「再」。'],
  [/在來/g, '再來', '「再來」是「再」。'],
  [new RegExp('再(' + PLACE + ')', 'g'), '在$1', '說「在哪裡」，要用「在」。'],
  [/做業/g, '作業', '寫的功課叫「作業」。'],
  [/做文/g, '作文', '寫文章叫「作文」。'],
  [/作飯/g, '做飯', '煮飯是「做飯」。'],
  [/快落/g, '快樂', '「快樂」的「樂」。'],
  [/高形/g, '高興', '「高興」的「興」。'],
  [/好象/g, '好像', '「好像」是「像」，有人字旁。'],
  [/做位|坐位/g, '座位', '椅子的位置叫「座位」。'],
  [/汽球/g, '氣球', '氣球是裝空氣的，用「氣」。'],
  [/圖書管/g, '圖書館', '「圖書館」是房子，用「館」。'],
  [/那麼樣/g, '那麼樣', ''],
  [/帶(帽子|眼鏡|手套|口罩|項鍊)/g, '戴$1', '東西放在頭、臉或手上，用「戴」。'],
  [/戴(書包|雨傘|便當|行李|錢包)/g, '帶$1', '拿著或背著的東西，用「帶」。'],
  [/渡過/g, '度過', '時間過去了，用「度過」。'],
  [new RegExp('((?:' + ACT + '))的((?:' + DEG + '))', 'g'), '$1得$2', '說明動作「怎麼樣」，用「得」。'],
  [new RegExp('((?:' + MAN + '))的((?:' + VERB + '))', 'g'), '$1地$2', '前面是「怎麼做」，後面是動作，用「地」。'],
];
const HALF = { ',': '，', '.': '。', '!': '！', '?': '？', ':': '：', ';': '；' };
const ENDS = /[。！？」』…：）]$/;

function checkText(text) {
  const out = [];
  const add = (s, e, found, fix, why, kind) => { if (!out.some(o => s < o.e && e > o.s)) out.push({ s, e, found, fix, why, kind }); };
  // 簡體字
  Array.from(text).forEach((c, i) => { if (S2T[c]) add(i, i + 1, c, S2T[c], '這是簡體字，作文要用繁體「' + S2T[c] + '」。', 'typo'); });
  // 常見錯字
  RULES.forEach(([re, fix, why]) => {
    if (!why) return;
    const one = new RegExp(re.source); re.lastIndex = 0; let m;
    while ((m = re.exec(text))) { const f = m[0].replace(one, fix); if (f !== m[0]) add(m.index, m.index + m[0].length, m[0], f, why, 'typo'); if (m[0].length === 0) re.lastIndex++; }
  });
  // 標點：半形改全形
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (HALF[c] && (CJK.test(text[i - 1] || '') || CJK.test(text[i + 1] || '')) && !(/\d/.test(text[i - 1] || '') && /\d/.test(text[i + 1] || ''))) add(i, i + 1, c, HALF[c], '中文作文的標點要用全形的「' + HALF[c] + '」。', 'punct');
  }
  // 重複或亂放
  let m; const rep = /([，。；：])\1+|[，；：]。|。[，；：]/g;
  while ((m = rep.exec(text))) add(m.index, m.index + m[0].length, m[0], m[0].endsWith('。') || m[0].startsWith('。') ? '。' : m[0][0], '標點重複了，留一個就夠了。', 'punct');
  const lead = text.match(/^[\s]*([，。；：、])/); if (lead) add(lead.index + lead[0].length - 1, lead.index + lead[0].length, lead[1], '', '一行的最前面不放這個標點。', 'punct');
  // 說「…」前面要有冒號
  const sayRe = /(說|問|喊|叫|答|回答|笑著說|大聲說|哭著說|想|唸|念)「/g;
  while ((m = sayRe.exec(text))) add(m.index, m.index + m[0].length, m[0], m[0].slice(0, -1) + '：「', '說話的前面要放冒號「：」，再用引號。', 'punct');
  // 像在問問題，卻放句號
  const qRe = /嗎。/g;
  while ((m = qRe.exec(text))) add(m.index, m.index + 2, m[0], '嗎？', '這句像是在問問題，可以放問號「？」。', 'punct');
  // 最後沒有標點
  const t = text.replace(/\s+$/, '');
  if (t && CJK.test(t[t.length - 1]) && !ENDS.test(t)) add(t.length, t.length, '（最後）', '。', '一段話說完了，最後要放句號「。」。', 'punct');
  // 引號要成雙
  const lq = (text.match(/「/g) || []).length, rq = (text.match(/」/g) || []).length;
  if (lq !== rq) out.push({ s: 0, e: 0, found: '「」', fix: null, why: '引號「」要成雙成對，有開頭「，也要有結尾」。', kind: 'hint' });
  // 太長的一段沒有標點
  const run = /[一-鿿]{26,}/g;
  while ((m = run.exec(text))) out.push({ s: m.index + 13, e: m.index + 13, found: m[0].slice(0, 6) + '…', fix: null, why: '這一段話很長，中間可以找個地方放逗號「，」，讀起來比較順。', kind: 'hint' });
  return out.sort((a, b) => a.s - b.s);
}
function applyFix(text, it) { return text.slice(0, it.s) + (it.fix || '') + text.slice(it.e); }
