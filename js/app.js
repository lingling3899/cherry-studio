(function () {
  const $ = (id) => document.getElementById(id);

  const routes = {
    home: "page-home",
    works: "page-works",
    play: "page-play",
    styling: "page-styling",
    crystal: "page-crystal",
    about: "page-about",
    brands: "page-brands",
  };
  const tabFor = {
    home: "home",
    works: "works",
    play: "play",
    styling: "play",
    crystal: "play",
    about: "about",
    brands: "about",
  };

  function currentRoute() {
    const raw = (location.hash || "#/home").replace(/^#\/?/, "");
    return routes[raw] ? raw : "home";
  }

  function renderRoute() {
    const route = currentRoute();
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("is-on"));
    const page = $(routes[route]);
    if (page) page.classList.add("is-on");
    const tab = tabFor[route];
    document.querySelectorAll(".tabbar a").forEach((a) => {
      a.classList.toggle("is-on", a.dataset.tab === tab);
    });
    closeMenu();
    window.scrollTo(0, 0);
  }

  function closeMenu() {
    document.body.classList.remove("menu-open");
  }
  $("menuBtn").addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
  $("drawerBg").addEventListener("click", closeMenu);
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-nav]");
    if (a) closeMenu();
  });

  window.addEventListener("hashchange", renderRoute);

  /* Gallery */
  const WORKS = [
    { id: 1, cat: "ai", title: "黃昏裙褶", tag: "AI 圖像 · 示範", art: "art-rose", blurb: "示範作品：晚霞色的裙褶與柔光。" },
    { id: 2, cat: "ai", title: "霧中肖像", tag: "AI 圖像 · 示範", art: "art-lilac", blurb: "示範作品：淡紫色霧氣裡的側臉輪廓。" },
    { id: 3, cat: "ai", title: "櫻桃靜物", tag: "AI 圖像 · 示範", art: "art-cherry", blurb: "示範作品：兩顆櫻桃，留給這個小世界的標記。" },
    { id: 4, cat: "ai", title: "海邊步道", tag: "AI 圖像 · 示範", art: "art-sea", blurb: "示範作品：黃昏海邊的顏色練習。" },
    { id: 5, cat: "look", title: "日常柔粉", tag: "造型靈感 · 示範", art: "art-mint", blurb: "示範造型：淺粉針織、米白長褲、一點櫻桃紅耳飾。" },
    { id: 6, cat: "look", title: "約會晚光", tag: "造型靈感 · 示範", art: "art-ink", blurb: "示範造型：深酒紅與香檳金，適合晚餐場合。" },
    { id: 7, cat: "look", title: "週末散步", tag: "造型靈感 · 示範", art: "art-sky", blurb: "示範造型：天藍外套配米白波鞋，輕便又乾淨。" },
    { id: 8, cat: "look", title: "展覽日", tag: "造型靈感 · 示範", art: "art-gold", blurb: "示範造型：米金層次與一條細鏈，適合看展覽。" },
    { id: 9, cat: "life", title: "生活照位置 1", tag: "生活 · 待放", placeholder: true, blurb: "把你的生活照放在這裡，例如窗邊、餐桌或出門那一刻。" },
    { id: 10, cat: "life", title: "生活照位置 2", tag: "生活 · 待放", placeholder: true, blurb: "可以是寵物、街道，或一張你喜歡的日常。" },
    { id: 11, cat: "life", title: "生活照位置 3", tag: "生活 · 待放", placeholder: true, blurb: "之後會換成真實照片。" },
    { id: 12, cat: "life", title: "生活照位置 4", tag: "生活 · 待放", placeholder: true, blurb: "你傳照片給我，我可以幫你放上來。" },
  ];
  const FILTERS = [
    { id: "all", label: "全部" },
    { id: "ai", label: "AI 圖像" },
    { id: "look", label: "造型靈感" },
    { id: "life", label: "生活" },
  ];
  let filter = "all";

  function paintGallery() {
    $("filters").innerHTML = FILTERS.map(
      (f) => `<button type="button" class="chip${f.id === filter ? " is-on" : ""}" data-filter="${f.id}">${f.label}</button>`
    ).join("");
    const list = WORKS.filter((w) => filter === "all" || w.cat === filter);
    $("gallery").innerHTML = list
      .map((w) => {
        const art = w.placeholder
          ? `<div class="placeholder-art">📷<span>待放生活照</span></div>`
          : `<div class="art ${w.art}"><span class="demo-flag">示範</span></div>`;
        return `<button type="button" class="tile" data-work="${w.id}">${art}<div class="meta"><h3>${w.title}</h3><p class="tag">${w.tag}</p></div></button>`;
      })
      .join("");
  }
  $("filters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filter = btn.dataset.filter;
    paintGallery();
  });
  $("gallery").addEventListener("click", (e) => {
    const tile = e.target.closest("[data-work]");
    if (!tile) return;
    const w = WORKS.find((x) => String(x.id) === tile.dataset.work);
    if (!w) return;
    const art = w.placeholder
      ? `<div class="placeholder-art" style="height:220px">📷<span>待放生活照</span></div>`
      : `<div class="art ${w.art}"></div>`;
    $("lightboxCard").innerHTML = `${art}<div class="meta"><h3>${w.title}</h3><p>${w.blurb}</p></div>`;
    $("lightbox").classList.add("is-on");
  });
  $("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") $("lightbox").classList.remove("is-on");
  });

  /* Data for tools */
  const MBTI = ["INFP","INFJ","INTP","INTJ","ISFP","ISFJ","ISTP","ISTJ","ENFP","ENFJ","ENTP","ENTJ","ESFP","ESFJ","ESTP","ESTJ"];
  const ZODIAC = ["白羊座","金牛座","雙子座","巨蟹座","獅子座","處女座","天秤座","天蠍座","射手座","摩羯座","水瓶座","雙魚座"];
  const OCCASIONS = ["日常","工作","約會","週末散步","聚會","展覽／咖啡"];
  const MOODS = ["想有自信","想被溫柔對待","想清爽一點","想低調","想開心出街","想靜一靜"];
  const TAROT = [
    ["愚者", "輕便出發，少一件飾物反而更好看。"],
    ["魔術師", "用一點金屬光澤做焦點，其他保持簡單。"],
    ["女祭司", "米白與淺紫，讓線條自己說話。"],
    ["女皇", "柔軟的布料，加上一顆圓潤的石。"],
    ["皇帝", "利落剪裁，顏色再沉一點。"],
    ["教皇", "經典款最穩，不必追新。"],
    ["戀人", "對稱的耳飾，讓臉旁有呼應。"],
    ["戰車", "乾淨的運動線條，顏色對比清晰。"],
    ["力量", "暖棕與珊瑚紅，溫柔但有存在感。"],
    ["隱者", "層次的中性色，外套可以大一件。"],
    ["命運之輪", "換一個你平常少用的顏色當鞋或袋。"],
    ["正義", "黑白或深藍，結構清楚即可。"],
    ["吊人", "把平常在下的顏色，放到領口或髮間。"],
    ["死神", "舊物新穿：一件你已有的衣服，換一套新配飾。"],
    ["節制", "兩種相近的粉色疊在一起，不要第三種搶鏡。"],
    ["惡魔", "深色底，用一點櫻桃紅做點綴。"],
    ["塔", "大膽一件主角單品，其餘全部讓路。"],
    ["星星", "淺藍、銀白，帶一點透明材質。"],
    ["月亮", "霧面質感，珍珠或月光石。"],
    ["太陽", "明亮的黃或暖橘，笑容就是配件。"],
    ["審判", "重新拿出衣櫃最整齊的那一套。"],
    ["世界", "完整的一套：顏色從頭到腳有呼應。"],
  ];

  const COLORS = {
    想有自信: ["#7A1F3D", "#E8C9A8", "#D4A017"],
    想被溫柔對待: ["#F3C6D0", "#FFF6F2", "#C9A58D"],
    想清爽一點: ["#E8F1F2", "#A7C4C8", "#F5F0E6"],
    想低調: ["#2C2A32", "#8A8580", "#D9D3CC"],
    想開心出街: ["#E85A8C", "#FFD36A", "#7EC8B8"],
    想靜一靜: ["#4F6F6A", "#D7E0D8", "#C2B8A3"],
  };

  const OUTFITS = {
    日常: "柔軟針織或棉質上衣，配一條乾淨的長褲或裙子，鞋跟不要太高。",
    工作: "利落的外套加素色內搭，飾物只留一件，看起來專心而整齊。",
    約會: "觸感好的布料，領口或手腕留一點細節，顏色比日常再暖一度。",
    週末散步: "輕便外套、好走路的鞋，袋要空一點，讓整個人輕起來。",
    聚會: "一件有存在感的上衣或洋裝，其他配件不要再搶。",
    "展覽／咖啡": "層次簡單的中性色，加一條細鏈或一本書一樣輕的袋子。",
  };

  const HAIR = {
    INFP: "鬆軟的中長髮或低束，留一點碎髮在臉旁。",
    INFJ: "順滑中分，或低盤，線條安靜。",
    ENFP: "有一點捲度或絲帶，讓走起來有動感。",
    ISFP: "自然質感，不要過度定型。",
  };
  const defaultHair = "乾淨、自然的髮型，根據場合決定束起還是放下。";

  const JEWELS = {
    白羊座: "小巧的金屬圈或一顆紅調的石。",
    金牛座: "圓潤的墜飾，質感比閃光重要。",
    雙子座: "不對稱耳飾，或兩條細鏈疊戴。",
    巨蟹座: "珍珠或月光色的圓形飾物。",
    獅子座: "一件明顯的金屬飾物就夠。",
    處女座: "極細的鏈，做工要乾淨。",
    天秤座: "對稱的耳針，粉色或香檳金。",
    天蠍座: "深色寶石，只戴一件。",
    射手座: "稍長的墜飾，走動時會輕輕晃。",
    摩羯座: "經典錶或一條沉色手鏈。",
    水瓶座: "特別一點的幾何形狀。",
    雙魚座: "透明、水感或珍珠的材質。",
  };

  const CRYSTALS = {
    想有自信: "石榴石或紅瑪瑙色的珠，做主石。",
    想被溫柔對待: "粉晶或玫瑰石英色，配一點白珠。",
    想清爽一點: "海藍寶或淺綠色螢石的感覺。",
    想低調: "茶晶、煙晶，或霧灰的珠。",
    想開心出街: "柑橘石或淺黃水晶，點綴兩顆即可。",
    想靜一靜: "綠幽靈或淺青的石，節奏放慢。",
  };

  let tarot = null;

  function fillSelect(el, items, selected) {
    el.innerHTML = items.map((x) => `<option value="${x}"${x === selected ? " selected" : ""}>${x}</option>`).join("");
  }
  fillSelect($("mbti"), MBTI, "INFP");
  fillSelect($("zodiac"), ZODIAC, "白羊座");
  fillSelect($("occasion"), OCCASIONS, "日常");
  fillSelect($("mood"), MOODS, "想有自信");
  fillSelect($("crystalColor"), ["粉櫻", "奶茶", "海藍", "霧灰", "暖金", "墨綠"], "粉櫻");
  fillSelect($("crystalMood"), MOODS, "想被溫柔對待");
  fillSelect($("crystalZodiac"), ZODIAC, "雙魚座");

  $("drawTarot").addEventListener("click", () => {
    tarot = TAROT[Math.floor(Math.random() * TAROT.length)];
    $("tarotState").textContent = tarot[0] + "　·　" + tarot[1];
  });

  $("makeLook").addEventListener("click", () => {
    if (!tarot) {
      tarot = TAROT[Math.floor(Math.random() * TAROT.length)];
      $("tarotState").textContent = tarot[0] + "　·　" + tarot[1];
    }
    const mbti = $("mbti").value;
    const zodiac = $("zodiac").value;
    const occasion = $("occasion").value;
    const mood = $("mood").value;
    const colors = COLORS[mood];
    const swatches = colors.map((c) => `<span class="swatch" style="background:${c}" title="${c}"></span>`).join("");
    const hair = HAIR[mbti] || defaultHair;
    const html = `
      <h3>今日旺我造型</h3>
      <p class="note">${mbti} · ${zodiac} · ${occasion} · ${mood} · ${tarot[0]}</p>
      <div class="swatches">${swatches}</div>
      <ul class="result-list">
        <li><b>衣著</b>${OUTFITS[occasion]}</li>
        <li><b>首飾</b>${JEWELS[zodiac]}</li>
        <li><b>水晶</b>${CRYSTALS[mood]}</li>
        <li><b>髮型</b>${hair}</li>
        <li><b>塔羅給造型的一句</b>${tarot[1]}</li>
      </ul>
      <p class="tiny">只供娛樂及造型靈感，可截圖保存。</p>
      <button class="btn btn-ghost" type="button" id="shareLook" style="margin-top:12px;width:100%">分享這份靈感</button>
    `;
    const box = $("lookResult");
    box.innerHTML = html;
    box.classList.add("show");
    const text = `Cherry Studio｜今日旺我造型\n${mbti} · ${zodiac} · ${occasion} · ${mood}\n塔羅：${tarot[0]} — ${tarot[1]}\n衣著：${OUTFITS[occasion]}\n首飾：${JEWELS[zodiac]}\n水晶：${CRYSTALS[mood]}`;
    $("shareLook").addEventListener("click", () => shareText(text));
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  const BEAD_MAP = {
    粉櫻: ["#f4b8c5", "#fff5f7", "#e85a8c", "#f8d7e0", "#d9899c"],
    奶茶: ["#e6c8a8", "#fff6ea", "#c9a58d", "#8a5a44", "#f0dcc6"],
    海藍: ["#9ec9d4", "#e8f4f6", "#3e7c8a", "#c5e0e6", "#215968"],
    霧灰: ["#c5c1bc", "#f3f1ee", "#7a7671", "#d9d3cc", "#4a4744"],
    暖金: ["#e8c36a", "#fff6d8", "#b8873a", "#f3e1a8", "#8a5a20"],
    墨綠: ["#6b8f7a", "#e6f0e8", "#2f4f3e", "#a8c4b0", "#1d3328"],
  };
  const CRYSTAL_NAME = {
    粉櫻: "粉櫻手鏈",
    奶茶: "奶茶月光鏈",
    海藍: "海水慢走鏈",
    霧灰: "霧灰細語鏈",
    暖金: "暖金午後鏈",
    墨綠: "綠蔭靜心鏈",
  };

  $("makeCrystal").addEventListener("click", () => {
    const color = $("crystalColor").value;
    const mood = $("crystalMood").value;
    const zodiac = $("crystalZodiac").value;
    const beads = BEAD_MAP[color]
      .concat(BEAD_MAP[color])
      .slice(0, 9)
      .map((c) => `<span class="bead" style="background:${c}"></span>`)
      .join("");
    $("crystalResult").innerHTML = `
      <div class="bracelet">${beads}</div>
      <h3>${CRYSTAL_NAME[color]}</h3>
      <p class="note">${zodiac} · ${mood}</p>
      <ul class="result-list">
        <li><b>主色</b>${color}，珠子以深淺交替，戴起來會有呼吸感。</li>
        <li><b>心情</b>${CRYSTALS[mood]}</li>
        <li><b>一句</b>這是一條虛擬手鏈，給今天的顏色一個形狀，不是功效保證。</li>
      </ul>
    `;
    $("crystalResult").classList.add("show");
    $("crystalResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  async function shareText(text) {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Cherry Studio", text });
        return;
      }
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(text);
      alert("已複製到剪貼簿，可以貼到你想分享的地方。");
    } catch (e) {
      alert(text);
    }
  }

  paintGallery();
  renderRoute();
})();
