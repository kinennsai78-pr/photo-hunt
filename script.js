const startScreen = document.getElementById("start-screen");
const cardScreen = document.getElementById("card-screen");
const completeScreen = document.getElementById("complete-screen");

const startbutton = document.getElementById("start-button")
const continuebutton = document.getElementById("continue-button")
const viewcompletebutton = document.getElementById("view-complete-button")
const resetbutton = document.getElementById("reset-button")

document.getElementById("yoko-button").addEventListener("click", () => {
  currentFrame = "yoko";
  updateCompleteImage();
});
document.getElementById("tate-button").addEventListener("click", () => {
  currentFrame = "tate";
  updateCompleteImage();
});



const grid = document.getElementById("bingo-grid");
const cameraInput = document.getElementById("camera-input")




const genreData = {
  "クラス企画": ["101R","102R","103R","104R","105R","106R","107R","108R","109R","201R","202R","203R","204R","205R","206R","207R","208R","209R","301R","302R","303R","304R","305R","306R","307R","308R","309R"],
  "企画ジャンル・校内": ["射的", "お化け屋敷", "クイズ", "乗り物", "謎解き", "瑞光館", "中庭", "昇降口", "正門", "階段", "廊下(１階)", "廊下(２階)", "廊下(３階)", "廊下(４階)"],
  "有志・部活動企画": ["生徒会企画", "軽音楽部", "ダンス部", "茶道", "花道", "自然科学部", "液体窒素", "棋道部", "美術部", "文芸部", "写真部", "インターアクト", "クイズ研究部", "家庭クラブ", "放送部"],
  "体育祭": ["横断幕（赤）", "横断幕（青）", "横断幕（緑）", "横断幕（黄）", "枇杷島スポーツセンター", "横断幕", "観戦中の写真", "クラスTシャツ(赤)", "クラスTシャツ(青)", "クラスTシャツ(緑)", "クラスTシャツ(黄)", "玉入れ", "障害物競争", "体操服"],
  "チャレンジ": ["ピース", "二人でピース", "ジャンプ", "みんなでジャンプ", "ハイタッチ", "手でハート", "指ハート", "チア長", "ブロ長", "２人で写真", "３人で写真", "5人以上で写真", "円陣", "クラスtシャツ2色集合", "クラスtシャツ4色集合", "遠近法を使った写真", "自分と同じ出席番号の人", "同じ部活動の人（3人）", "たくさんの人が集まる写真", "78を手で作る", "先輩・後輩と写真", "同じクラスの人5人と", "同じクラスだった人と", "他クラス同じブロックの人と", "先生と写真", "他学年の人と写真", "後ろ姿", "影絵", "観戦席からの景色", "体育祭終わりの空", "文化祭終わりの空", "高いところから撮った写真", "校舎と空", "ドアップ", "体育祭らしい写真", "文化祭らしい写真", "人がいない場所", "奥行きを感じる写真"],
  "記念祭のもの": ["記念祭キーホルダー", "記念祭ロゴ", "記念祭ペンライト", "記念祭プログラム", "記念祭２日目の旗", "記念祭３日目の旗", "有志企画ポスター", "クラス看板（1年）", "クラス看板（2年）", "クラス看板（3年）", "オープニングタイムテーブル","後夜祭タイムテーブル"],
  "ミッケ！": ["「瑞」の字", "ブルーシート", "うちわ", "ストップウォッチ", "チョコレート", "「祭」の字", "校章", "「z」の字", "「1」の字", "「2」の字", "ランキング", "デジタル時計", "楽器", "ギター", "お菓子", "マイク", "かわいいイラスト", "ジュース", "メガホン", "タオル", "サングラス", "はちまき", "水筒", "帽子", "風船", "ティアラ", "メイド服", "チャイナドレス", "コスプレ", "警備係の人", "横断幕係の人", "生徒会", "記念祭準備委員", "記念祭パート長", "双子コーデ", "写真を撮っている人", "アイドル風衣装", "手袋", "パイプ椅子", "！マーク", "？マーク", "スピーカー", "スポーツドリンク", "亀", "花", "机", "「78」の数字"],
  "色・形": ["白色", "赤色", "青色", "黄色", "緑色", "ピンク", "紫色", "黄緑色", "オレンジ色", "虹色", "金色", "銀色", "カラフル", "ハート", "星", "丸", "三角形", "四角形", "リボン", "花柄", "チェック柄", "水玉", "光っているもの", "キラキラしたもの", "大きいもの", "小さいもの", "長いもの", "ふわふわしたもの", "懐かしいもの", "面白いもの"]
};
const CENTER_TOPIC = "記念祭1番の思い出";






continuebutton.addEventListener("click", () => {
  currentCard = saved;
  startScreen.classList.add("hidden");
  cardScreen.classList.remove("hidden");
  renderCard(currentCard);
});

viewcompletebutton.addEventListener("click", () => {
  currentCard = saved;
  startScreen.classList.add("hidden");
  completeScreen.classList.remove("hidden");
  updateCompleteImage();
});


startbutton.addEventListener("click",() => {

  if (saved) {
    const ok = confirm("新しく始めますか？※撮影した写真は消去されます。");
    if (!ok) return;
  }
  currentCard = generateCard()
  renderCard(currentCard)
  startScreen.classList.add("hidden");
  cardScreen.classList.remove("hidden");
  saveCard(currentCard)
});


resetbutton.addEventListener("click",() => {
  if(confirm("お題を引き直しますか※保存した画像は消去されます")){
    currentCard = generateCard()
    renderCard(currentCard)
  }
  saveCard(currentCard)
});


document.getElementById("go-complete-button").addEventListener("click", () => {
  if (checkComplete(currentCard)) {
    cardScreen.classList.add("hidden");
    completeScreen.classList.remove("hidden");
    updateCompleteImage();
  } else {
    alert("まだ全部のマスが埋まっていません");
  }
});


document.getElementById("home-button").addEventListener("click", () => {
  location.reload();
});




function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}



function generateCard() {
  const cells = new Array(9).fill(null);
  cells[4] = { topic: CENTER_TOPIC, photo: null };
  const genreNames = shuffle(Object.keys(genreData));
  
  const positions = [0, 1, 2, 3, 5, 6, 7, 8];
  
  positions.forEach((pos, i) => {
    const genre = genreNames[i];
    const topics = genreData[genre];
    const topic = topics[Math.floor(Math.random() * topics.length)];
    cells[pos] = { topic: topic, photo: null };
  });
  
  return cells;
}


function renderCard(cells) {
  grid.innerHTML = "";
  cells.forEach((cellData, index) => {
  const cellEl = document.createElement("div");
  
  if (cellData.photo) {
    const img = document.createElement("img");
    img.src = cellData.photo;
    cellEl.appendChild(img);
  } else {
    cellEl.textContent = cellData.topic;
  }

  cellEl.addEventListener("click", () => {
      activeCellIndex = index;
      document.getElementById("camera-input").click();
  });

  grid.appendChild(cellEl);
  });

  saveCard(currentCard)
}



function saveCard(cells) {
  localStorage.setItem("photoBingoCard", JSON.stringify(cells));
}

function loadCard() {
  const raw = localStorage.getItem("photoBingoCard");
  if (raw) {
    return JSON.parse(raw);
  } else {
    return null;
  }
}



let currentCard = null;
let activeCellIndex = null;

cameraInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      currentCard[activeCellIndex].photo = compressImage(img, 800);
      renderCard(currentCard);

      if (checkComplete(currentCard)) {
        cardScreen.classList.add("hidden");
        completeScreen.classList.remove("hidden");
        updateCompleteImage();
      }
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});




startScreen.classList.remove("hidden");

const saved = loadCard();


if (saved) {
  continuebutton.classList.remove("hidden");
}
if (saved && checkComplete(saved)) {
  viewcompletebutton.classList.remove("hidden");
} 



function compressImage(img, maxWidth) {
  const scale = Math.min(1, maxWidth / img.width);
  const canvas = document.createElement("canvas");
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.7);
}



function checkComplete(cells) {
  return cells.every((cellData) => cellData.photo);
}



function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}


const frameConfigs = {
  yoko: {
    src: "frame-yoko.jpg",
    canvasWidth: 1076,
    canvasHeight: 650,
    cellWidth: 158,
    cellHeight: 159,
    cellPositions: [
      {x: 497, y: 69},  {x: 671, y: 69},  {x: 847, y: 69},
      {x: 497, y: 245}, {x: 671, y: 245}, {x: 847, y: 245},
      {x: 497, y: 421}, {x: 671, y: 421}, {x: 847, y: 421}
    ]
  },
  tate: {
    src: "frame-tate.jpg",
    canvasWidth: 650,
    canvasHeight: 1076,
    cellWidth: 158,
    cellHeight: 157,
    cellPositions: [
      {x: 422, y: 467}, {x: 422, y: 641}, {x: 422, y: 817},
      {x: 246, y: 467}, {x: 246, y: 641}, {x: 246, y: 817},
      {x: 70,  y: 467}, {x: 70,  y: 641}, {x: 70,  y: 817}
    ]
  }
};

let currentFrame = "yoko";
async function composeFinalImage(cells, frameKey) {
  const config = frameConfigs[frameKey];
  const frameImg = await loadImage(config.src);
  const photoImgs = await Promise.all(cells.map((c) => loadImage(c.photo)));

  const canvas = document.createElement("canvas");
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(frameImg, 0, 0, config.canvasWidth, config.canvasHeight);

  cells.forEach((cellData, index) => {
    const pos = config.cellPositions[index];
    ctx.drawImage(photoImgs[index], pos.x, pos.y, config.cellWidth, config.cellHeight);
  });

  return canvas.toDataURL("image/jpeg", 0.9);
}


async function updateCompleteImage() {
  const dataUrl = await composeFinalImage(currentCard, currentFrame);
  document.getElementById("final-card-img").src = dataUrl;
}


document.getElementById("save-button").addEventListener("click", async () => {
  const img = document.getElementById("final-card-img");
  const response = await fetch(img.src);
  const blob = await response.blob();
  const file = new File([blob], "photo-hunt-card.png", { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "フォトハント完成カード" });
      return;
    } catch (e) {
     }
  }

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "photo-hunt-card.png";
  link.click();
});