// 範文插圖：一段範文配一張會動的小插圖（鍵 = 層級:題目）
const SC = {
  '1:今天吃了什麼': [S('room', '🏫 8 8 30', '🧒 52 30 28 bounce', '🍽️ 40 44 18', '☀️ 76 6 16 spin'), S('room', '🍚 10 36 22', '🍗 38 34 24 bounce', '🥬 66 38 22', '😋 44 6 18 float')],
  '1:我最喜歡的玩具': [S('room', '🧸 36 24 34 bounce', '🧒 8 34 24', '❤️ 70 8 16 float'), S('room', '🧸 20 26 34 sway', '🤗 56 28 28 bounce', '☁️ 70 6 16 float', '✨ 10 8 14 float')],
  '1:我的媽媽': [S('room', '👩 36 22 34 bounce', '💗 70 8 18 float', '🌸 10 10 16 float'), S('room', '🍳 12 34 22', '👩‍🍳 40 22 34 bounce', '🍚 72 40 18', '❤️ 76 8 14 float')],
  '1:今天的天氣': [S('city', '☁️ 6 6 24 float', '☁️ 66 8 20 float', '🌧️ 36 2 26 float', '🏠 60 28 28'), S('city', '☂️ 36 16 26 bounce', '🧒 18 32 24 bounce', '💦 52 50 18 bounce', '🐸 70 42 16 bounce')],
  '1:我的好朋友': [S('meadow', '🧒 12 30 26 bounce', '👧 46 30 26 bounce', '💖 34 6 18 float'), S('meadow', '👧 10 28 26 bounce', '🧒 62 28 26 bounce', '➰ 36 34 20 sway', '😄 38 6 16 float')],
  '3:我的好朋友': [S('room', '🏫 8 8 30', '🧒 40 30 26 bounce', '🧑 62 30 26 bounce', '🤝 46 6 16 float'), S('room', '🧒 12 30 26', '✏️ 44 40 18 bounce', '🧑 62 28 26 bounce', '😊 36 6 16 float'), S('meadow', '🧒 18 30 26 bounce', '🧑 54 30 26 bounce', '❤️ 38 6 20 float', '🏫 70 6 20')],
  '3:難忘的郊遊': [S('meadow', '☀️ 70 4 18 spin', '☁️ 14 8 22 float', '🌳 6 22 34 sway', '🚌 40 38 26 run'), S('meadow', '🧺 14 40 20', '🍙 40 42 16', '🍱 58 42 16', '🧒 66 24 22 bounce', '⚾ 30 10 16 bounce'), S('night', '🚌 30 36 28 run', '😴 62 14 20 float', '🌙 8 8 18 float')],
  '3:我最喜歡的動物': [S('room', '🐱 36 22 34 bounce', '🏠 6 12 24', '❤️ 74 8 16 float'), S('room', '🪟 8 6 34', '🐱 46 30 28 sway', '☀️ 72 6 16 spin', '🎵 36 12 14 float'), S('room', '🐱 30 30 28 bounce', '🧒 62 30 24 bounce', '💞 44 6 18 float')],
  '3:我最喜歡的季節': [S('forest', '🍂 10 8 20 float', '🍁 66 10 18 float', '🌳 38 14 36 sway', '🧒 8 38 20'), S('forest', '🍂 14 6 18 float', '🍁 56 4 20 float', '🍃 36 16 16 float', '🌼 70 40 16 sway', '🧒 20 38 22 bounce'), S('meadow', '🍁 8 8 22 float', '😌 40 14 24 bounce', '🧥 66 36 22', '🌤️ 70 6 18 float')],
  '4:難忘的一件事': [S('pond', '🧒 12 18 26', '🏊 54 34 22 bounce', '😰 36 4 16 float'), S('pond', '🧑‍🏫 10 18 26', '🧒 42 30 24 bounce', '💧 62 26 18 float', '🫧 76 38 14 float'), S('pond', '🧒 36 36 24 float', '☁️ 10 6 24 float', '🌟 66 8 18 float', '😊 30 10 18 bounce')],
  '4:我的媽媽': [S('room', '👩 36 20 36 bounce', '🌙 10 8 18 float', '😊 70 10 18 float'), S('room', '🛏️ 8 34 34', '🤒 22 24 22', '👩 54 28 30 bounce', '🧊 70 44 14'), S('night', '💡 40 8 30 float', '👩 14 34 26', '🧒 62 34 22', '🏠 76 12 20')],
  '4:秋天的校園': [S('meadow', '🏫 6 12 32', '🌳 52 12 36 sway', '🍂 36 4 16 float', '🍂 80 30 12 float'), S('meadow', '🍂 8 40 18', '🍁 30 44 16', '🍃 70 8 18 float', '🧒 40 30 22 bounce', '💨 12 12 16 float'), S('gold', '🎨 38 14 26 bounce', '🍁 8 10 18 float', '🏫 62 20 28', '❤️ 76 4 14 float')],
  '4:一次失敗的經驗': [S('castle', '🎤 36 18 28 bounce', '😰 62 10 20 float', '🧒 12 30 24', '📖 70 40 18'), S('room', '🧒 12 34 22', '👩 52 26 30 bounce', '😢 36 6 16 float', '💧 22 22 12 float'), S('room', '🪞 12 12 34', '🧒 48 28 26 bounce', '🌱 72 36 20 bounce', '💪 36 6 18 float')],
  '5:一件小事的啟示': [S('city', '🌧️ 40 0 26 float', '👵 14 28 26', '🚏 62 24 28', '🛍️ 40 40 16'), S('city', '🧒 12 30 24 bounce', '☂️ 40 14 26 bounce', '👵 62 28 24', '💧 50 44 14 bounce'), S('gold', '☂️ 36 8 26 float', '🌟 10 10 18 float', '💛 70 10 20 float', '🧒 16 36 24 bounce')],
  '5:我最敬佩的人': [S('room', '👵 36 22 34 bounce', '🌟 12 8 18 float', '❤️ 70 10 18 float'), S('city', '🥬 8 36 22', '👵 38 26 30 bounce', '🧵 70 40 16 sway', '😊 52 6 16 float'), S('night', '🌀 8 8 28 spin', '👵 46 30 28 bounce', '🌱 78 44 14 sway', '💪 36 6 18 float')],
  '5:勇氣（論說文）': [S('gold', '🦁 36 20 32 bounce', '💪 10 10 18 float', '❤️ 70 10 18 float'), S('meadow', '🏔️ 30 6 40', '🧗 18 34 24 bounce', '🚩 60 8 18 sway', '❄️ 74 12 16 float'), S('room', '🏫 8 8 28', '🙋 36 24 30 bounce', '🌟 66 8 18 float', '📖 70 40 18')],
  '5:回家的路（抒情文）': [S('city', '🌇 10 4 34', '🚶 40 34 24 run', '🎒 66 40 16'), S('city', '🌳 8 12 32 sway', '🧑 40 32 22', '🍳 62 26 22', '💨 74 12 14 float'), S('night', '🏠 40 18 32', '💡 52 6 18 float', '🧒 12 34 22 bounce', '❤️ 76 8 16 float')],
};
LESSONS.forEach(l => { const k = l.lv + ':' + l.t; l.pics = SC[k] || l.panels || null; });
