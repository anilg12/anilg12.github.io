/* ============================================
   ANIL GÜL — PORTFOLIO v3 — main script
   ============================================ */

/* ---------- DATA ---------- */
const icons = {
  gradcap: `<svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17"/><path d="M5 13.18v4L12 21l7-3.82v-4"/></svg>`,
  code: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  award: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  network: `<svg viewBox="0 0 24 24"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 011-1h12a1 1 0 011 1v3"/><line x1="12" y1="12" x2="12" y2="8"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" style="width:8px;height:8px;stroke:currentColor;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
};

const TL_I18N = {
  tr: {
    1: { title: "Eğitim",       date: "2022–2026",
         content: "Kapadokya Üniversitesi, Yönetim Bilişim Sistemleri mezunu. Yazılım, veritabanı ve BT Mühendislik seviyesinde donanım ve sistem bilgisi. OptiStock dahil; Java-odak menajeri uygulamasından Python, Flet ve SQLite ile yazılmış tam-yığın masaüstü & web projeleri.",
         skills: ["YBS","Python","SQLite","Flet","Yazılım Müh.","BT Altyapısı"],
         badge: "MEZUN" },
    2: { title: "Yazılım",      date: "2023–şimdi",
         content: "Backend ve full-stack geliştirme. Üniversite sonrası odağım Java, .NET ve mikroservis mimarileri. REST API'ler, veritabanı odaklı uygulamalar ve masaüstü yazılımları kurarım. Aktif GitHub projelerim var.",
         skills: ["Java",".NET / C#","Python","Mikroservis","REST API","SQL","Git","OOP"],
         badge: "DEVAM EDİYOR" },
    3: { title: "Sistem & Op.", date: "2022–şimdi",
         content: "Windows, Linux ve macOS'ta admin seviyesinde sistem yönetimi. Çekirdek mimarisinden sürücü entegrasyonuna ve topolojiye kadar derin tecrübe. NTLite ile özel, hafif Windows imajları üretir; kendi açık kaynaklı işletim sistemlerimi geliştiririm.",
         skills: ["Windows / Linux / macOS","NTLite","Çekirdek & Sürücü","Sistem Yöneticiliği","Donanım Tanılama","Açık Kaynak OS"],
         badge: "AKTİF" },
    4: { title: "Cisco Ağ",     date: "2023",
         content: "Cisco Networking sertifikalarıyla doğrulanmış ağ yetkinliği: yönlendirme, anahtarlama, IP adresleme ve topoloji tasarımı. Gerçek ağ ortamlarını kurar ve sorun giderir; E-Devlet onaylı mesleki sertifikalarla desteklenir.",
         skills: ["Yönlendirme & Anahtarlama","IP Adresleme","VLAN","Ağ Topolojisi","Cisco IOS","E-Devlet Onaylı"],
         badge: "SERTİFİKALI" },
    5: { title: "Sertifikalar", date: "2023–2026",
         content: "Cisco ve E-Devlet onaylı çok sayıda mesleki sertifika. Ağ, yazılım ve sistem alanlarındaki pratik yetkinliği belgeler; modern verimlilik ve profesyonel becerilerle tamamlanır.",
         skills: ["Cisco Sertifikaları","E-Devlet Onaylı","PCAP / Python","Web (HTML/CSS/JS)","Profesyonel Beceriler"],
         badge: "SERTİFİKALI" }
  },
  en: {
    1: { title: "Education", date: "2022–2026",
         content: "Kapadokya University, Management Information Systems graduate. Engineering-level hardware and system knowledge across software, databases and IT. Full-stack desktop & web projects including OptiStock — from a Java-focused manager app to apps built with Python, Flet and SQLite.",
         skills: ["MIS","Python","SQLite","Flet","Software Engineering","IT Infrastructure"],
         badge: "GRADUATE" },
    2: { title: "Software Dev", date: "2023–now",
         content: "Backend and full-stack development. Since graduating my focus is Java, .NET and microservice architectures. I build REST APIs, database-driven apps and desktop software. Active projects on GitHub.",
         skills: ["Java",".NET / C#","Python","Microservices","REST API","SQL","Git","OOP"],
         badge: "IN PROGRESS" },
    3: { title: "Sys & Ops", date: "2022–now",
         content: "Admin-level system administration on Windows, Linux and macOS. Deep experience from kernel architecture to driver integration and topology. I build custom lightweight Windows images with NTLite and develop my own open-source operating systems.",
         skills: ["Windows / Linux / macOS","NTLite","Kernel & Drivers","System Administration","Hardware Diagnostics","Open-source OS"],
         badge: "ACTIVE" },
    4: { title: "Cisco Net.", date: "2023",
         content: "Network skills verified by Cisco Networking certifications: routing, switching, IP addressing and topology design. I configure and troubleshoot real network environments, backed by state-verified (E-Devlet) professional certificates.",
         skills: ["Routing & Switching","IP Addressing","VLANs","Network Topology","Cisco IOS","E-Devlet Verified"],
         badge: "CERTIFIED" },
    5: { title: "Certificates", date: "2023–2026",
         content: "Multiple Cisco- and state-verified (E-Devlet) professional certificates. They document practical skills across networking, software and systems, rounded out with modern productivity and professional skills.",
         skills: ["Cisco Certificates","E-Devlet Verified","PCAP / Python","Web (HTML/CSS/JS)","Professional Skills"],
         badge: "CERTIFIED" }
  }
};

const timelineData = [
  { id: 1, code: "N-01", status: "completed", energy: 90,  icon: "gradcap", relatedIds: [2, 3] },
  { id: 2, code: "N-02", status: "in-progress", energy: 78,  icon: "code",    relatedIds: [1, 3] },
  { id: 3, code: "N-03", status: "in-progress", energy: 88,  icon: "cpu",     relatedIds: [1, 2, 4] },
  { id: 4, code: "N-04", status: "completed",   energy: 100, icon: "network", relatedIds: [3, 5] },
  { id: 5, code: "N-05", status: "completed",   energy: 100, icon: "award",   relatedIds: [4] }
];

const TECH_CAT = {
  lang: { tr: "DİL",      en: "LANGUAGE"  },
  fw:   { tr: "ÇERÇEVE",  en: "FRAMEWORK" },
  db:   { tr: "VERİTABANI", en: "DATABASE" },
  tool: { tr: "ARAÇ",     en: "TOOLING"   },
  os:   { tr: "İŞL. SİS.", en: "OS"       },
  net:  { tr: "AĞ",       en: "NETWORK"   },
  con:  { tr: "KAVRAM",   en: "CONCEPT"   }
};
const techStack = [
  { idx: "01", catKey: "lang", name: "Python",     lv: 60 },
  { idx: "02", catKey: "lang", name: "Java",       lv: 87 },
  { idx: "03", catKey: "lang", name: ".NET / C#",  lv: 65 },
  { idx: "04", catKey: "os",   name: "Linux",      lv: 80 },
  { idx: "05", catKey: "os",   name: "Gömülü Sistemler", lv: 55 },
  { idx: "06", catKey: "net",  name: "Cisco IOS",  lv: 75 },
  { idx: "07", catKey: "con",  name: "REST API",   lv: 76 },
  { idx: "08", catKey: "con",  name: "OOP",        lv: 82 }
];

/* ---------- CAPABILITIES MATRIX ---------- */
const capabilities = [
  { catKey: "cap.cat.languages", items: [
    { name: "Java",         level: "primary" },
    { name: "Python",       level: "primary" },
    { name: "C# / .NET",    level: "working" },
    { name: "SQL",          level: "primary" }
  ]},
  { catKey: "cap.cat.frameworks", items: [
    { name: "Flet",         level: "primary" },
    { name: "REST API",     level: "primary" },
    { name: "Microservices", level: "working" },
    { name: "SQLite",       level: "primary" },
    { name: "OOP",          level: "primary" },
    { name: "Git",          level: "primary" }
  ]},
  { catKey: "cap.cat.systems", items: [
    { name: "Windows",               level: "primary" },
    { name: "Linux",                 level: "primary" },
    { name: "macOS",                 level: "working" },
    { name: "NTLite",                level: "primary" },
    { name: "Kernel & Drivers",      level: "working" },
    { name: "System Administration", level: "primary" },
    { name: "Hardware Diagnostics",  level: "primary" }
  ]},
  { catKey: "cap.cat.network", items: [
    { name: "Cisco IOS",            level: "cert" },
    { name: "Routing & Switching",  level: "cert" },
    { name: "VLANs",                level: "cert" },
    { name: "IP Addressing",        level: "cert" },
    { name: "Network Topology",     level: "cert" },
    { name: "Network Security",     level: "working" }
  ]}
];

function renderCapabilities() {
  const wrap = document.getElementById("capMatrix");
  if (!wrap) return;
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  wrap.innerHTML = capabilities.map((cat, i) => {
    const idx = String(i + 1).padStart(2, "0");
    const items = cat.items.map(it => {
      return `<span class="cap-chip">${it.name}</span>`;
    }).join("");
    return `
      <div class="cap-row">
        <div class="cap-row-head">
          <span class="cap-idx">C-${idx}</span>
          <span class="cap-cat">${dict[cat.catKey] || cat.catKey}</span>
          <span class="cap-line"></span>
          <span class="cap-count">${String(cat.items.length).padStart(2,"0")}</span>
        </div>
        <div class="cap-row-body">${items}</div>
      </div>`;
  }).join("");
}

/* ---------- PRELOADER ---------- */
const preLines = [
  ["<span class='tag'>[boot]</span> initializing system…", 350],
  ["<span class='tag'>[load]</span> mounting components", 350],
  ["<span class='tag'>[net]</span>  resolving handshake <span class='ok'>OK</span>", 350],
  ["<span class='tag'>[gfx]</span>  constellation kernel <span class='ok'>READY</span>", 350],
  ["<span class='tag'>[user]</span> identifying operator: <span class='ok'>anil.gul</span>", 400],
  ["<span class='tag'>[done]</span> portfolio.v3 — entering interactive mode", 500]
];

function runPreloader() {
  const linesEl = document.getElementById("pre-lines");
  const bar = document.getElementById("pre-bar-fill");
  const pct = document.getElementById("pre-pct");
  let i = 0;
  const total = preLines.length;
  function step() {
    if (i >= total) {
      bar.style.width = "100%";
      pct.textContent = "100";
      setTimeout(() => {
        document.getElementById("preloader").classList.add("gone");
        startHeroIntro();
      }, 400);
      return;
    }
    const [html, delay] = preLines[i];
    const div = document.createElement("div");
    div.className = "pre-line";
    div.innerHTML = html;
    linesEl.appendChild(div);
    const p = Math.round(((i + 1) / total) * 95);
    bar.style.width = p + "%";
    pct.textContent = String(p).padStart(2, "0");
    i++;
    setTimeout(step, delay);
  }
  step();
}

/* ---------- HERO INTRO ---------- */
function startHeroIntro() {
  const wrap = document.querySelector(".hero-name");
  const text = wrap.dataset.text;
  wrap.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = text[i] === " " ? "\u00A0" : text[i];
    span.style.animationDelay = (60 * i) + "ms";
    wrap.appendChild(span);
  }
  requestAnimationFrame(() => {
    wrap.querySelectorAll(".char").forEach(c => c.classList.add("in"));
  });
}

/* ---------- CONSTELLATION CANVAS (tech-flavored: data nodes + faint code-rain) ---------- */
function initConstellation() {
  const canvas = document.getElementById("constellation");
  const ctx = canvas.getContext("2d");
  let w, h, particles = [], glyphs = [];
  const mouse = { x: -9999, y: -9999 };
  const COUNT = window.innerWidth < 768 ? 32 : 70;
  const GLYPH_COUNT = window.innerWidth < 768 ? 10 : 22;
  const GLYPH_CHARS = "01<>{}/[]=*+;:";

  // Theme-aware palette — read live each frame so the toggle updates instantly.
  function pal() {
    const light = document.documentElement.getAttribute("data-theme") === "light";
    return {
      ink: window.__inkRGB || "255,255,255",
      glyph:   light ? "79,95,230"   : "168,185,255",
      accentA: light ? "79,95,230"   : "91,108,248",
      accentB: light ? "124,58,237"  : "196,181,253"
    };
  }

  function resize() {
    w = canvas.width = window.innerWidth * window.devicePixelRatio;
    h = canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22 * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.22 * window.devicePixelRatio,
      s: (Math.random() * 1.6 + 0.8) * window.devicePixelRatio,
      a: Math.random() * 0.3 + 0.25,
      // 0=square, 1=cross, 2=ring
      kind: Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2
    });
  }

  for (let i = 0; i < GLYPH_COUNT; i++) {
    glyphs.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vy: (Math.random() * 0.4 + 0.15) * window.devicePixelRatio,
      ch: GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)],
      a: Math.random() * 0.18 + 0.04,
      next: Math.random() * 60
    });
  }

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX * window.devicePixelRatio;
    mouse.y = e.clientY * window.devicePixelRatio;
  });
  window.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

  const LINK = 130 * window.devicePixelRatio;
  const MOUSE_LINK = 180 * window.devicePixelRatio;

  function drawSquare(p) {
    ctx.fillStyle = `rgba(${window.__inkRGB || '255,255,255'},${p.a})`;
    ctx.fillRect(p.x - p.s/2, p.y - p.s/2, p.s, p.s);
  }
  function drawCross(p) {
    ctx.strokeStyle = `rgba(${pal().accentB},${p.a + 0.12})`;
    ctx.lineWidth = 0.6 * window.devicePixelRatio;
    const r = p.s * 1.5;
    ctx.beginPath();
    ctx.moveTo(p.x - r, p.y); ctx.lineTo(p.x + r, p.y);
    ctx.moveTo(p.x, p.y - r); ctx.lineTo(p.x, p.y + r);
    ctx.stroke();
  }
  function drawRing(p) {
    ctx.strokeStyle = `rgba(${pal().accentA},${p.a + 0.12})`;
    ctx.lineWidth = 0.6 * window.devicePixelRatio;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 1.6, 0, Math.PI * 2); ctx.stroke();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    const P = pal();

    // ambient code glyphs — drifting downward, low opacity
    ctx.font = `${10 * window.devicePixelRatio}px "JetBrains Mono", monospace`;
    for (const g of glyphs) {
      g.y += g.vy;
      if (g.y > h + 20) { g.y = -20; g.x = Math.random() * w; }
      g.next -= 1;
      if (g.next <= 0) { g.ch = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)]; g.next = 60 + Math.random() * 80; }
      ctx.fillStyle = `rgba(${P.glyph},${g.a})`;
      ctx.fillText(g.ch, g.x, g.y);
    }

    // move particles
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
    }

    // links between particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < LINK) {
          const op = (1 - d / LINK) * 0.13;
          ctx.strokeStyle = `rgba(${P.ink},${op})`;
          ctx.lineWidth = 0.5 * window.devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // mouse links
    for (const p of particles) {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < MOUSE_LINK) {
        const op = (1 - d / MOUSE_LINK) * 0.5;
        ctx.strokeStyle = `rgba(${P.accentB},${op})`;
        ctx.lineWidth = 0.5 * window.devicePixelRatio;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // points (squares / crosses / rings)
    for (const p of particles) {
      if (p.kind === 0) drawSquare(p);
      else if (p.kind === 1) drawCross(p);
      else drawRing(p);
    }

    requestAnimationFrame(tick);
  }
  tick();
}

/* ---------- CUSTOM CURSOR ---------- */
function initCursor() {
  if (window.matchMedia("(max-width: 768px)").matches) return;
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const label = document.querySelector(".cursor-label");
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener("mousemove", e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    label.style.transform = `translate(${mx + 16}px, ${my + 16}px)`;
  });

  function followRing() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(followRing);
  }
  followRing();

  document.addEventListener("mouseover", e => {
    const hov = e.target.closest("a, button, .node, .channel, .tech-cell");
    if (hov) {
      ring.classList.add("hover");
      dot.classList.add("hover");
      const cl = hov.dataset.cursor;
      if (cl) { label.textContent = cl; label.classList.add("show"); }
    }
  });
  document.addEventListener("mouseout", e => {
    const hov = e.target.closest("a, button, .node, .channel, .tech-cell");
    if (hov) {
      ring.classList.remove("hover");
      dot.classList.remove("hover");
      label.classList.remove("show");
    }
  });
}

/* ---------- ORBITAL TIMELINE ---------- */
let rotationAngle = 0;
let autoRotate = true;
let activeId = null;
let lastTs = 0;

function getPos(index, total, angle) {
  const a = ((index / total) * 360 + angle) % 360;
  const rad = (a * Math.PI) / 180;
  const radius = 220;
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad),
    opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2))),
    zIndex: Math.round(100 + 50 * Math.cos(rad))
  };
}

function badgeClass(s) { return s === "completed" ? "badge-completed" : "badge-progress"; }

function renderNodes() {
  const layer = document.getElementById("nodesLayer");
  if (!layer) return;
  const total = timelineData.length;
  layer.innerHTML = "";
  const lang = (typeof currentLang !== "undefined" && TL_I18N[currentLang]) ? currentLang : "en";
  const t = TL_I18N[lang];

  timelineData.forEach((item, i) => {
    const localized = t[item.id];
    const pos = getPos(i, total, rotationAngle);
    const isActive = activeId === item.id;

    const div = document.createElement("div");
    div.className = "node" + (isActive ? " active" : "");
    div.style.cssText = `left:50%;top:50%;transform:translate(calc(-50% + ${pos.x}px),calc(-50% + ${pos.y}px));z-index:${isActive ? 300 : pos.zIndex};opacity:${isActive ? 1 : pos.opacity};`;
    div.dataset.id = item.id;
    div.dataset.cursor = lang === "tr" ? "Aç" : "Open";

    const skillTagsHtml = localized.skills.map(s => `<span class="skill-tag">${s}</span>`).join("");
    const relatedHtml = item.relatedIds.map(rid => {
      const r = t[rid];
      return r ? `<button class="related-btn" data-relid="${rid}">${r.title} ${icons.arrow}</button>` : "";
    }).join("");

    const relatedLabel = lang === "tr" ? "Bağlı noktalar" : "Connected nodes";
    const profLabel    = lang === "tr" ? "Yetkinlik" : "Proficiency";

    const cardHtml = isActive ? `
      <div class="node-card">
        <span class="card-corner tl"></span><span class="card-corner tr"></span>
        <span class="card-corner bl"></span><span class="card-corner br"></span>
        <div class="card-connector"></div>
        <div class="card-header">
          <div class="card-meta">
            <span class="card-badge ${badgeClass(item.status)}">${localized.badge}</span>
            <span class="card-date">${localized.date}</span>
          </div>
          <div class="card-title">${localized.title}</div>
          <div class="card-id">${item.code} · NODE</div>
        </div>
        <div class="card-body">
          <p>${localized.content}</p>
          <div class="skills-list">${skillTagsHtml}</div>
          <div class="energy-section">
            <div class="energy-label"><span>${profLabel}</span><span>${item.energy}%</span></div>
            <div class="energy-bar"><div class="energy-fill" style="width:${item.energy}%"></div></div>
          </div>
          ${relatedHtml ? `<div class="related-section"><div class="related-label">${relatedLabel}</div>${relatedHtml}</div>` : ""}
        </div>
      </div>` : "";

    div.innerHTML = `<div class="node-icon">${icons[item.icon]}</div><div class="node-label">${localized.title}</div><div class="node-id">${item.code}</div>${cardHtml}`;
    layer.appendChild(div);
  });
}

function initOrbital() {
  const layer = document.getElementById("nodesLayer");
  let hovering = false;
  layer.addEventListener("mouseover", function(e) {
    if (e.target.closest(".node")) hovering = true;
  });
  layer.addEventListener("mouseout", function(e) {
    if (e.target.closest(".node") && !e.relatedTarget?.closest?.(".node")) hovering = false;
  });
  layer.addEventListener("click", function(e) {
    const relBtn = e.target.closest(".related-btn");
    if (relBtn) {
      e.stopPropagation();
      activeId = parseInt(relBtn.dataset.relid);
      autoRotate = false;
      renderNodes();
      return;
    }
    const nodeEl = e.target.closest(".node");
    if (nodeEl) {
      e.stopPropagation();
      const id = parseInt(nodeEl.dataset.id);
      activeId = activeId === id ? null : id;
      autoRotate = activeId === null;
      renderNodes();
    }
  });
  document.getElementById("orbitalContainer").addEventListener("click", function(e) {
    if (!e.target.closest(".node")) { activeId = null; autoRotate = true; renderNodes(); }
  });

  function animate(ts) {
    if (autoRotate && !hovering && ts - lastTs > 33) {
      rotationAngle = (rotationAngle + 0.18) % 360;
      lastTs = ts;
      renderNodes();
    }
    requestAnimationFrame(animate);
  }
  renderNodes();
  requestAnimationFrame(animate);
}

/* ---------- CERTIFICATIONS ---------- */
const certifications = [
  {
    code: "C-01",
    title: "IT Essentials",
    issuer: "Cisco Networking Academy",
    date: { tr: "21 Şubat 2023", en: "February 21, 2023" },
    desc: {
      tr: "Bilgisayar donanımı ve yazılımı, işletim sistemleri, ağ kavramları, mobil cihazlar, sorun giderme ve bir BT profesyonelinin sorumluluklarında temel bilgi. 128 etkileşimli aktivite ve 26 saate kadar uygulamalı laboratuvar.",
      en: "Foundation knowledge in computer hardware and software, operating systems, networking concepts, mobile devices, troubleshooting and IT professional responsibilities. Up to 128 interactive activities and 26 hours of hands-on labs."
    },
    skills: ["Computer Hardware", "Operating Systems", "Networking", "Mobile Devices", "Troubleshooting", "Printers"],
    verifyUrl: "https://www.credly.com/badges/e0243f64-70cc-4f19-85e7-7a88394acc96",
    pdfUrl: "certificates/IT_Essentials_-_Anil_Gul.pdf",
    accent: "blue"
  },
  {
    code: "C-02",
    title: "Programming Essentials in Python (PCAP)",
    issuer: "Cisco Networking Academy · OpenEDG",
    date: { tr: "2023", en: "2023" },
    desc: {
      tr: "Python programlamanın temelleri: veri tipleri, kontrol akışı, fonksiyonlar, modüller, hata yakalama, dosya işlemleri ve nesne yönelimli programlama. PCAP sertifikasyon sınavına hazırlık.",
      en: "Foundations of Python programming: data types, control flow, functions, modules, exception handling, file I/O and object-oriented programming. Preparation for the PCAP certification exam."
    },
    skills: ["Python", "OOP", "Modules", "Exception Handling", "File I/O", "Data Structures"],
    verifyUrl: null,
    pdfUrl: "certificates/PCAP_Programming_Essentials_in_Python_-_Anil_Gul.pdf",
    accent: "yellow"
  },
  {
    code: "C-03",
    title: "Introduction to Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: { tr: "2023", en: "2023" },
    desc: {
      tr: "Cisco Packet Tracer ile ağ simülasyonu: cihaz yapılandırması, fiziksel ve mantıksal topolojiler, IP adresleme ve temel ağ sorun giderme.",
      en: "Network simulation with Cisco Packet Tracer: device configuration, physical and logical topologies, IP addressing and basic network troubleshooting."
    },
    skills: ["Packet Tracer", "Network Simulation", "Device Config", "Topologies", "IP Addressing"],
    verifyUrl: null,
    pdfUrl: "certificates/Introduction_to_Packet_Tracer_-_Anil_Gul.pdf",
    accent: "blue"
  },
  {
    code: "C-04",
    title: "HTML Essentials",
    issuer: "Cisco · JS Institute",
    date: { tr: "12 Şubat 2026", en: "February 12, 2026" },
    desc: {
      tr: "HTML5 temelleri: belge yapısı, metin biçimlendirme, hiper bağlantılar, multimedya entegrasyonu, formlar ve erişilebilirlik. WDE™ Entry-Level Web Developer sertifikasyon sınavına hazırlık.",
      en: "HTML5 fundamentals: document structure, text formatting, hyperlinks, multimedia integration, forms and accessibility. Preparation for the WDE™ Entry-Level Web Developer certification exam."
    },
    skills: ["HTML5", "Document Structure", "Forms", "Multimedia", "Web Accessibility", "Entry-Level Web Dev"],
    verifyUrl: "https://www.credly.com/badges/52be34e1-4d70-494e-b9f9-04c78427ad4c",
    pdfUrl: "certificates/HTML_Essentials_-_Anil_Gul.pdf",
    accent: "purple"
  },
  {
    code: "C-05",
    title: "CSS Essentials",
    issuer: "Cisco · JS Institute",
    date: { tr: "14 Şubat 2026", en: "February 14, 2026" },
    desc: {
      tr: "CSS3 temelleri: web sayfası stillemesi, düzen teknikleri, responsive tasarım ve erişilebilirlik. WDA™ Associate Web Developer sertifikasyon sınavına hazırlık.",
      en: "CSS3 fundamentals: styling web pages, layout techniques, responsive design and accessibility. Preparation for the WDA™ Associate Web Developer certification exam."
    },
    skills: ["CSS3", "Grid & Flexbox", "Responsive Design", "CSS Animations", "Styling", "Web Layout"],
    verifyUrl: "https://www.credly.com/badges/738f4616-d345-4c79-b3cc-159c900be28c",
    pdfUrl: "certificates/CSS_Essentials_-_Anil_Gul.pdf",
    accent: "purple"
  },
  {
    code: "C-06",
    title: "JavaScript Essentials 2",
    issuer: "Cisco · JS Institute",
    date: { tr: "2026", en: "2026" },
    desc: {
      tr: "İleri JavaScript: kapsamlı OOP, prototip zinciri, asenkron programlama (Promise/async-await), modüller ve modern dil özellikleri. WDA™ sertifikasyon yoluna ileri seviye katkı.",
      en: "Advanced JavaScript: in-depth OOP, prototype chain, asynchronous programming (Promise/async-await), modules and modern language features. Advanced step in the WDA™ certification track."
    },
    skills: ["JavaScript", "OOP", "Async / Promises", "Prototype Chain", "Modules", "Modern ES"],
    verifyUrl: "https://www.credly.com/badges/937b5b55-b614-4949-8626-b2a3ee69df31",
    pdfUrl: "certificates/JavaScript_Essentials_2_-_Anil_Gul.pdf",
    accent: "yellow"
  },
  {
    code: "C-07",
    title: "Certified Red Team Operations Management (CRTOM)",
    issuer: "Red Team Leaders",
    date: { tr: "12 Şubat 2026", en: "February 12, 2026" },
    desc: {
      tr: "Kırmızı takım (red team) operasyonlarının planlanması ve yönetimi: saldırgan güvenlik metodolojisi, operasyon yaşam döngüsü, ekip koordinasyonu ve raporlama. Sınav başarıyla tamamlandı; karttaki QR kod ile doğrulanabilir.",
      en: "Planning and management of red team operations: offensive security methodology, the operations lifecycle, team coordination and reporting. Exam passed; verifiable via the embedded QR code."
    },
    skills: ["Red Team Ops", "Offensive Security", "Operations Mgmt", "Methodology", "Reporting"],
    verifyUrl: "https://courses.redteamleaders.com/exam-completion/824550147dd735f5",
    verifiedLabel: { tr: "QR ile doğrulanmış", en: "QR-verified" },
    pdfUrl: "certificates/Certified_Red_Team_Operations_Management_-_Anil_Gul.pdf",
    accent: "red"
  }
];

const certIcons = {
  blue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><circle cx="7" cy="14" r="1"/><line x1="11" y1="14" x2="17" y2="14"/></svg>`,
  purple: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  yellow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  red: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/></svg>`
};

function renderCertifications() {
  const wrap = document.getElementById("certGrid");
  if (!wrap) return;
  const lang = (typeof currentLang !== "undefined" && TRANSLATIONS[currentLang]) ? currentLang : "tr";
  const verifyL = lang === "tr" ? "Doğrula" : "Verify";
  const pdfL    = lang === "tr" ? "PDF indir" : "Download PDF";
  const previewL = lang === "tr" ? "Önizle" : "Preview";
  const verifiedL = lang === "tr" ? "Credly · Doğrulanmış" : "Credly · Verified";
  const onlyPdfL  = lang === "tr" ? "PDF ile arşivlenmiş" : "Archived as PDF";

  wrap.innerHTML = certifications.map(c => {
    const verified = !!c.verifyUrl;
    const skillsHtml = c.skills.map(s => `<span class="cert-skill">${s}</span>`).join("");
    const verifyBtn = verified
      ? `<a class="cert-btn cert-btn-verify" href="${c.verifyUrl}" target="_blank" rel="noreferrer" data-cursor="${verifyL}">
           <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
           <span>${verifyL}</span>
         </a>`
      : "";
    const pdfBtn = `<a class="cert-btn cert-btn-pdf" href="${c.pdfUrl}" target="_blank" download data-cursor="${pdfL}">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span>${pdfL}</span>
      </a>`;
    const previewBtn = `<button class="cert-btn cert-btn-preview" type="button" data-pdf-src="${c.pdfUrl}" data-pdf-title="${c.title}" data-cursor="${previewL}">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
        <span>${previewL}</span>
      </button>`;
    const statusBadge = verified
      ? `<span class="cert-status cert-status-verified">
           <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
           ${(c.verifiedLabel && c.verifiedLabel[lang]) || verifiedL}
         </span>`
      : `<span class="cert-status cert-status-archived">${onlyPdfL}</span>`;

    return `
      <article class="cert-card cert-accent-${c.accent}" data-cursor="${verified ? verifyL : pdfL}">
        <span class="card-corner tl"></span><span class="card-corner tr"></span>
        <span class="card-corner bl"></span><span class="card-corner br"></span>

        <header class="cert-head">
          <div class="cert-head-left">
            <span class="cert-code">${c.code}</span>
            ${statusBadge}
          </div>
          <div class="cert-icon">${certIcons[c.accent] || certIcons.blue}</div>
        </header>

        <div class="cert-body">
          <div class="cert-issuer">${c.issuer} · ${c.date[lang] || c.date.en}</div>
          <h3 class="cert-title">${c.title}</h3>
          <p class="cert-desc">${c.desc[lang] || c.desc.en}</p>
          <div class="cert-skills">${skillsHtml}</div>
        </div>

        <footer class="cert-foot">
          ${verifyBtn}
          ${previewBtn}
          ${pdfBtn}
        </footer>
      </article>`;
  }).join("");
}
/* ---------- PROJECTS ARCHIVE ---------- */
const projectIcons = {
  os: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1"/><line x1="2" y1="20" x2="22" y2="20"/><line x1="8" y1="16" x2="8" y2="20"/><line x1="16" y1="16" x2="16" y2="20"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="14" height="14" rx="1"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="5"/><line x1="15" y1="2" x2="15" y2="5"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/><line x1="19" y1="9" x2="22" y2="9"/><line x1="19" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="5" y2="9"/><line x1="2" y1="15" x2="5" y2="15"/></svg>`,
  net: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 011-1h12a1 1 0 011 1v3"/><line x1="12" y1="12" x2="12" y2="8"/></svg>`,
  api: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  game: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="3"/></svg>`
};

/* Featured project (OptiStock) lives in the HTML. Add new builds here —
   each entry renders a card in the archive grid automatically. */
const projects = [
  {
    code: "P-02",
    icon: "game",
    accent: "red",
    title: { tr: "Odak Menajeri RPG", en: "Focus Manager RPG" },
    meta:  { tr: "Java · JavaFX", en: "Java · JavaFX" },
    year:  { tr: "Beta sürüm", en: "Beta release" },
    status:{ tr: "Yayında", en: "Released" }, statusKind: "active",
    desc:  {
      tr: "Görev ve zaman yönetimini oyunlaştıran, tamamen Java & JavaFX ile yazılmış masaüstü RPG uygulaması. Karakter seçimi, ders/hedef tanımı ve hatırlatıcılarla; tamamlanan görevlerden XP kazanılır, seviye ve rütbeler (Acemi → Çalışkan → Usta) açılır.",
      en: "A desktop RPG — built entirely in Java & JavaFX — that gamifies task and time management. Pick a character, define lessons, goals and reminders; completed tasks earn XP and unlock levels and ranks (Novice → Diligent → Master)."
    },
    tags: ["Java", "JavaFX", "OOP", "Gamification", "Timer API", "Desktop GUI"],
    link: { url: "https://github.com/anilg12/Odak-Menajeri-RPG", label: { tr: "GitHub", en: "GitHub" } }
  },
  {
    code: "P-03",
    icon: "os",
    accent: "purple",
    title: { tr: "Özel Windows İmajı", en: "Custom Windows Image" },
    meta:  { tr: "NTLite · Sistem", en: "NTLite · Systems" },
    year:  { tr: "2023 — şimdi", en: "2023 — now" },
    status:{ tr: "Aktif", en: "Active" }, statusKind: "active",
    desc:  {
      tr: "NTLite ile sürücü ve bileşen düzeyinde sadeleştirilmiş, dağıtıma hazır hafif Windows imajları. Gereksiz servislerin temizlenmesi, sürücü entegrasyonu ve gözetimsiz kurulum yapılandırması.",
      en: "Lightweight, deployment-ready Windows images trimmed at the driver and component level with NTLite — debloating, driver integration and unattended-install configuration."
    },
    tags: ["NTLite", "Windows", "Debloat", "Driver Integration", "Deployment"],
    link: { url: "https://anilg12.github.io", label: { tr: "Detaylar", en: "Details" } }
  },
  {
    code: "P-04",
    icon: "cpu",
    accent: "blue",
    title: { tr: "Açık Kaynak İşletim Sistemi", en: "Open-source OS / Kernel" },
    meta:  { tr: "Çekirdek · Bare-metal", en: "Kernel · Bare-metal" },
    year:  { tr: "Sürüyor", en: "Ongoing" },
    status:{ tr: "Ar-Ge", en: "R&D" }, statusKind: "progress",
    desc:  {
      tr: "Çıplak donanım seviyesinden başlayan, kendi çekirdeğini derleyen deneysel bir işletim sistemi çalışması. Önyükleme, bellek yönetimi ve donanım soyutlama katmanı (HAL) üzerine odaklanır.",
      en: "An experimental operating-system effort that boots and compiles its own kernel from the bare-metal level — focused on bootstrapping, memory management and the hardware abstraction layer (HAL)."
    },
    tags: ["Kernel", "Bare-metal", "HAL", "C / ASM", "Boot"],
    link: { url: "https://github.com/anilg12", label: { tr: "GitHub", en: "GitHub" } }
  }
];

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const lang = (typeof currentLang !== "undefined" && TRANSLATIONS[currentLang]) ? currentLang : "tr";
  grid.innerHTML = projects.map(p => {
    const tagsHtml = p.tags.map(t => `<span class="cert-skill">${t}</span>`).join("");
    const statusCls = p.statusKind === "active" ? "proj-status-active"
                    : p.statusKind === "progress" ? "proj-status-progress"
                    : "proj-status-done";
    return `
      <article class="proj-card cert-accent-${p.accent}" data-cursor="${(p.link.label[lang] || p.link.label.en)}">
        <span class="card-corner tl"></span><span class="card-corner tr"></span>
        <span class="card-corner bl"></span><span class="card-corner br"></span>

        <header class="proj-card-head">
          <div class="proj-card-head-left">
            <span class="cert-code">${p.code}</span>
            <span class="proj-status ${statusCls}">${p.status[lang] || p.status.en}</span>
          </div>
          <div class="cert-icon">${projectIcons[p.icon] || projectIcons.api}</div>
        </header>

        <div class="proj-card-body">
          <div class="cert-issuer">${p.meta[lang] || p.meta.en} · ${p.year[lang] || p.year.en}</div>
          <h3 class="proj-card-title">${p.title[lang] || p.title.en}</h3>
          <p class="cert-desc">${p.desc[lang] || p.desc.en}</p>
          <div class="cert-skills">${tagsHtml}</div>
        </div>

        <footer class="proj-card-foot">
          <a class="cert-btn cert-btn-pdf" href="${p.link.url}" target="_blank" rel="noreferrer" data-cursor="${(p.link.label[lang] || p.link.label.en)}">
            <span>${p.link.label[lang] || p.link.label.en}</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </a>
        </footer>
      </article>`;
  }).join("");
}

function renderTech() {
  const grid = document.getElementById("techGrid");
  if (!grid) return;
  grid.innerHTML = techStack.map(t => {
    const catLabel = (TECH_CAT[t.catKey] && TECH_CAT[t.catKey][currentLang]) || t.catKey;
    return `
    <div class="tech-cell" data-cursor="${catLabel}">
      <div class="tech-cell-top">
        <span class="tech-idx">${t.idx}</span>
        <span class="tech-cat">${catLabel}</span>
      </div>
      <div>
        <div class="tech-name">${t.name}</div>
        <div class="tech-level"><span>${t.lv}%</span><span class="bar" style="--lv:${t.lv}%"></span></div>
      </div>
    </div>`;
  }).join("");

  grid.addEventListener("mousemove", e => {
    const cell = e.target.closest(".tech-cell");
    if (!cell) return;
    const r = cell.getBoundingClientRect();
    cell.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
    cell.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
  });
}

/* ---------- OPTISTOCK CHART ---------- */
function renderChart() {
  const svg = document.getElementById("optiChart");
  if (!svg) return;
  const points = [];
  const W = 280, H = 70;
  const N = 24;
  let y = 38;
  for (let i = 0; i < N; i++) {
    y += (Math.sin(i * 0.7) * 6) + (Math.random() - 0.4) * 4;
    y = Math.max(8, Math.min(H - 8, y));
    points.push([i / (N - 1) * W, y]);
  }
  const path = points.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const area = path + ` L${W},${H} L0,${H} Z`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="gradArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5b6cf8" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#5b6cf8" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${area}" fill="url(#gradArea)"/>
    <path d="${path}" stroke="#a3b1ff" stroke-width="1.2" fill="none"/>
    ${points.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="1" fill="rgb(var(--ink))" opacity="0.55"/>`).join("")}
  `;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("preserveAspectRatio", "none");
}

/* ---------- SCROLL: PROGRESS + NAV STATE ---------- */
function initScroll() {
  const prog = document.getElementById("scrollProgress");
  const hint = document.getElementById("scrollHint");
  const sections = ["hero", "cap-section", "cert-section", "orbital-section", "tech-section", "project-section", "contact-section"];
  const links = document.querySelectorAll(".nav-link");

  function update() {
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
    prog.style.width = pct + "%";
    if (window.scrollY > 80) hint.classList.add("hide"); else hint.classList.remove("hide");

    let cur = sections[0];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight / 2) cur = id;
    }
    links.forEach(l => l.classList.toggle("active", l.dataset.target === cur));
  }
  window.addEventListener("scroll", update, { passive: true });
  update();

  links.forEach(l => l.addEventListener("click", e => {
    e.preventDefault();
    const t = document.getElementById(l.dataset.target);
    if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
}

/* ---------- LIVE CLOCK ---------- */
function initClock() {
  const el = document.getElementById("liveClock");
  if (!el) return;
  function tick() {
    const d = new Date();
    const t = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    el.textContent = "TR · " + t;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- INTERSECTION REVEAL ---------- */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("reveal-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll("[data-reveal]").forEach(el => io.observe(el));
}

/* ---------- PDF VIEWER MODAL ---------- */
function initPdfModal() {
  const modal = document.getElementById("pdfModal");
  if (!modal) return;
  const frame = document.getElementById("pdfModalFrame");
  const titleEl = document.getElementById("pdfModalTitle");
  const openLink = document.getElementById("pdfModalOpen");
  const dlLink = document.getElementById("pdfModalDownload");
  let lastFocus = null;

  function open(src, title) {
    lastFocus = document.activeElement;
    frame.src = src + "#view=FitH&toolbar=0";
    titleEl.textContent = title || "certificate.pdf";
    openLink.href = src;
    dlLink.href = src;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function close() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // release the PDF so it stops rendering in the background
    setTimeout(() => { if (!modal.classList.contains("open")) frame.src = "about:blank"; }, 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // delegate: any element with data-pdf-src opens the modal
  document.addEventListener("click", e => {
    const trigger = e.target.closest("[data-pdf-src]");
    if (trigger) {
      e.preventDefault();
      open(trigger.dataset.pdfSrc, trigger.dataset.pdfTitle);
      return;
    }
    if (e.target.closest("[data-pdf-close]")) { close(); }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });
}

/* ---------- THEME TOGGLE (dark / light) ---------- */
function applyTheme(theme) {
  const t = theme === "light" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", t);
  window.__inkRGB = t === "light" ? "26,28,38" : "255,255,255";
  try { localStorage.setItem("anilgul.theme", t); } catch (e) {}
}
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  // restore saved theme on load (defaults to dark)
  let saved = "dark";
  try { saved = localStorage.getItem("anilgul.theme") || "dark"; } catch (e) {}
  applyTheme(saved);
  if (!btn) return;
  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(cur === "light" ? "dark" : "light");
  });
}

/* ---------- KICKOFF ---------- */
window.addEventListener("DOMContentLoaded", () => {
  initConstellation();
  initOrbital();
  renderTech();
  renderCapabilities();
  renderCertifications();
  renderProjects();
  renderChart();
  initScroll();
  initClock();
  initReveal();
  initLangToggle();
  initThemeToggle();
  initPdfModal();
  runPreloader();
});
