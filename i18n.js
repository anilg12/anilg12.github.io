/* ============================================
   I18N — Turkish / English
   ============================================ */

const TRANSLATIONS = {
  tr: {
    "nav.index": "Anasayfa",
    "nav.orbit": "Yörünge",
    "nav.stack": "Yetenekler",
    "nav.work": "Çalışmalar",
    "nav.contact": "İletişim",
    "nav.certs": "Sertifikalar",

    "hero.available": "Fırsatlara açık",
    "hero.est": "MALATYA · TR",
    "hero.portfolio": "PORTFOLYO · MMXXVI",
    "hero.role1": "Sistem & Yazılım Geliştirici",
    "hero.role2": "BT Çözümleri & Donanım",
    "hero.tagline_html": "Kapadokya Üniversitesi Yönetim Bilişim Sistemleri mezunuyum. Donanım, ağ ve yazılımı izole parçalar olarak değil, kusursuz işleyen bir <em>ekosistem</em> olarak tasarlıyorum. Çıplak donanım (<em>bare-metal</em>) seviyesinden ve donanım soyutlama katmanı (<em>HAL</em>) entegrasyonundan başlayarak; <em>Java ve .NET</em> ile modern mikroservis mimarileri kurmaya kadar uçtan uca altyapılar inşa ediyorum. Kendi işletim sistemimi derleyecek seviyedeki <em>çekirdek (kernel)</em> bilgimle, donanımın en alt katmanından backend servislerine kadar tam kontrol sağlayan bir Yazılım Geliştirici / Sistem Mühendisiyim.",
    "hero.cta_primary": "Konuşma başlat",
    "hero.cta_secondary": "Yörüngeyi keşfet",
    "hero.scroll": "Kaydır",

    "cap.title_html": "Teknik <em>yetkinlikler.</em>",
    "cap.subtitle": "Diller, sistemler, ağ ve sertifikalar — teorik değil, projelerde ve sahada sınanmış, Cisco ile E-Devlet onaylı yetkinlikler.",
    "cap.cat.languages": "Diller",
    "cap.cat.frameworks": "Çerçeveler & Veri",
    "cap.cat.systems": "Sistemler & İşletim Sistemleri",
    "cap.cat.network": "Ağ & Güvenlik",
    "cap.cat.tools": "Araçlar & Pratikler",
    "cap.cat.certs": "Sertifikalar",
    "cap.legend.primary": "Birincil yetkinlik",
    "cap.legend.working": "Çalışma seviyesinde",
    "cap.legend.cert": "Sertifikalı",
    "cap.head_meta": "4 alan · 23 yetkinlik",

    "orbit.head": "Radyal Yörünge Zaman Çizelgesi",
    "orbit.head_meta": "Etkileşimli · Tıklayarak gez",
    "orbit.intro_title_html": "Beş nokta,<br/>tek bir yörünge.",
    "orbit.intro_body": "Eğitim, yazılım, sistemler, ağ ve sertifikalar — tek bir çekirdek etrafında dönen beceri noktalarından oluşan bir takımyıldız. Herhangi bir noktaya tıklayarak inceleyin; bağlantılara dokunarak ilerleyin.",
    "orbit.ctrl1": "Otomatik dönüyor",
    "orbit.ctrl2": "Noktayı incele",
    "orbit.ctrl3": "Kapat",

    "tech.head": "Teknik Yığın",
    "tech.head_meta": "8 disiplin",
    "tech.title_html": "Sıkça başvurduğum araçlar — <br/><em>kod, donanım ve kablo</em> arasında.",
    "tech.body": "Çoğu projenin aynı anda ihtiyaç duyduğu katmanlarda rahatım: uygulama dili, altındaki veritabanı, üzerinden gittiği ağ ve çalıştığı işletim sistemi imajı.",

    "proj.head": "Seçili Çalışmalar",
    "proj.head_meta": "Öne çıkan + proje arşivi",
    "proj.featured": "/ Öne çıkan çalışma",
    "proj.archive_title_html": "Proje <em>arşivi.</em>",
    "proj.archive_body": "Sistem, ağ ve yazılım katmanlarında süregelen çalışmalar. Yeni projeler eklendikçe burası büyüyor.",
    "proj.eyebrow": "/ Vaka Çalışması 01",
    "proj.tagline": "Windows için modern, güçlü ve şık bir kaldırma aracı — standart kaldırıcıların geride bıraktığı kalıntıları derinlemesine temizler.",
    "proj.desc": "WPF & .NET ile yazılmış bir sistem bakım aracı. Oblivion; programları kaldırmakla kalmaz, kayıt defteri ve dosya sistemindeki gizli kalıntıları bulup yok eder. Avcı Modu ile rahatsız edici bir pencerenin üzerine sürükleyerek kaynağını anında bulur; Gereksiz Dosya Temizleyici, Başlangıç Yöneticisi ve Windows bloatware sökücü ile sistemi hızlı, temiz ve güvende tutar.",
    "proj.role": "Rol", "proj.role_v": "Tek başına geliştirme",
    "proj.year": "Yıl",
    "proj.scope": "Kapsam", "proj.scope_v": "Masaüstü (Windows)",
    "proj.stack": "Yığın",
    "proj.data": "Veri",
    "proj.status": "Durum", "proj.status_v": "v1.0 · yayında",
    "proj.kpi1": "Kalıntı bulundu",
    "proj.kpi2": "Kazanılan alan",
    "proj.kpi1_trend": "● Avcı Modu",
    "proj.kpi2_trend": "Advanced Uninstaller",
    "proj.chart_label": "↓ temizlendi",

    "cert.head": "Doğrulanmış Sertifikalar",
    "cert.head_meta": "14 sertifika · 12 doğrulanabilir",
    "cert.title_html": "<em>Doğrulanmış</em> kimlik bilgileri ve sertifikalar.",
    "cert.body": "Her sertifika kaynağında doğrulanabilir veya PDF kopyası indirilebilir. Cisco Networking Academy, JS Institute, Turkcell Akademi ve Red Team Leaders tarafından verildi.",
    "cert.legend.verified": "Kaynağında doğrulanabilir",
    "cert.legend.archived": "PDF arşivli",

    "contact.eyebrow": "/ İşbirliğine açık",
    "contact.title_html": "Karmaşık BT altyapıları, <em>mikroservis mimarileri</em>, yazılım geliştirme ve özel sistem çözümleri arıyorsanız — doğru kişiyle konuşuyorsunuz.",
    "contact.desc": "Sistem yöneticiliği, ağ mühendisliği ve backend / mikroservis geliştirme rolleri için açığım — uzaktan ya da Malatya, Türkiye merkezli.",
    "contact.ch_email": "/ E-posta · birincil",
    "contact.ch_github": "/ GitHub · profil",
    "contact.ch_linkedin": "/ LinkedIn · profil",
    "contact.ch_cv": "/ Özgeçmiş · indir",
    "contact.ch_cv_value": "PDF belgesi (.pdf) — Türkçe",
    "contact.cv_href": "CV_Anil_Gul_TR.pdf",
    "contact.marquee1": "Sistem",
    "contact.marquee2": "Mimarisi",
    "pdf.view": "Önizle",
    "pdf.newtab": "Yeni sekme",
    "pdf.download": "İndir",

    "foot.left": "© MMXXVI · ANIL GÜL · TÜM HAKLARI SAKLIDIR",
    "foot.center": "Malatya, Türkiye'de tasarlandı & üretildi",
    "foot.right_v": "· Özenle inşa edildi"
  },
  en: {
    "nav.index": "Index",
    "nav.orbit": "Orbit",
    "nav.stack": "Stack",
    "nav.work": "Work",
    "nav.contact": "Contact",
    "nav.certs": "Certificates",

    "hero.available": "Available for opportunities",
    "hero.est": "MALATYA · TR",
    "hero.portfolio": "PORTFOLIO · MMXXVI",
    "hero.role1": "Systems & Software Developer",
    "hero.role2": "IT Solutions & Hardware",
    "hero.tagline_html": "I'm a Management Information Systems graduate from Kapadokya University. I design hardware, networking and software not as isolated parts but as one seamless <em>ecosystem</em>. Starting from the <em>bare-metal</em> level and hardware abstraction layer (<em>HAL</em>) integration, I build end-to-end infrastructure all the way up to modern microservice architectures in <em>Java and .NET</em>. With <em>kernel</em> knowledge deep enough to compile my own operating system, I'm a Software Developer / Systems Engineer who keeps full control from the lowest hardware layer to backend services.",
    "hero.cta_primary": "Start a conversation",
    "hero.cta_secondary": "Explore the orbit",
    "hero.scroll": "Scroll",

    "cap.title_html": "Technical <em>capabilities.</em>",
    "cap.subtitle": "Languages, systems, networking and certifications — not theory, but skills tested in real projects and the field, verified by Cisco and E-Devlet.",
    "cap.cat.languages": "Languages",
    "cap.cat.frameworks": "Frameworks & Data",
    "cap.cat.systems": "Systems & Operating Systems",
    "cap.cat.network": "Network & Security",
    "cap.cat.tools": "Tools & Practices",
    "cap.cat.certs": "Certifications",
    "cap.legend.primary": "Primary skill",
    "cap.legend.working": "Working knowledge",
    "cap.legend.cert": "Certified",
    "cap.head_meta": "4 areas · 23 skills",

    "orbit.head": "Radial Orbital Timeline",
    "orbit.head_meta": "Interactive · Click to explore",
    "orbit.intro_title_html": "Five nodes,<br/>one trajectory.",
    "orbit.intro_body": "Education, software, systems, networking and certifications — mapped as a constellation of skill nodes orbiting a single core. Click any node to inspect; tap a connection to traverse.",
    "orbit.ctrl1": "Auto rotating",
    "orbit.ctrl2": "Inspect node",
    "orbit.ctrl3": "Dismiss",

    "tech.head": "Technical Stack",
    "tech.head_meta": "8 disciplines",
    "tech.title_html": "Tools I reach for — <br/>across <em>code, metal & wire</em>.",
    "tech.body": "Comfortable across the layers most projects need at once: an application language, the database under it, the network it travels on, and the OS image it runs on.",

    "proj.head": "Selected Work",
    "proj.head_meta": "Featured + project archive",
    "proj.featured": "/ Featured build",
    "proj.archive_title_html": "Project <em>archive.</em>",
    "proj.archive_body": "Ongoing work across the systems, networking and software layers. This grows as new projects ship.",
    "proj.eyebrow": "/ Case Study 01",
    "proj.tagline": "A modern, powerful and elegant uninstaller for Windows — deep-cleaning the leftovers standard uninstallers leave behind.",
    "proj.desc": "A system-maintenance tool built with WPF & .NET. Oblivion doesn't just remove programs — it hunts down and destroys hidden leftovers in the registry and file system. Hunter Mode finds the source of an annoying window by dragging onto it; a Junk Cleaner, Startup Manager and Windows bloatware remover keep the system fast, clean and safe.",
    "proj.role": "Role", "proj.role_v": "Solo build",
    "proj.year": "Year",
    "proj.scope": "Scope", "proj.scope_v": "Desktop (Windows)",
    "proj.stack": "Stack",
    "proj.data": "Data",
    "proj.status": "Status", "proj.status_v": "v1.0 · shipped",
    "proj.kpi1": "Leftovers found",
    "proj.kpi2": "Space reclaimed",
    "proj.kpi1_trend": "● Hunter Mode",
    "proj.kpi2_trend": "Advanced Uninstaller",
    "proj.chart_label": "↓ cleaned",

    "cert.head": "Verified Certifications",
    "cert.head_meta": "14 certificates · 12 verifiable",
    "cert.title_html": "<em>Verified</em> credentials & certificates.",
    "cert.body": "Each certificate can be verified at its source or downloaded as a PDF copy. Issued by Cisco Networking Academy, JS Institute, Turkcell Akademi and Red Team Leaders.",
    "cert.legend.verified": "Verifiable at source",
    "cert.legend.archived": "PDF archive",

    "contact.eyebrow": "/ Open for collaboration",
    "contact.title_html": "Looking for complex IT infrastructure, <em>microservice architectures</em>, software development or custom system solutions? — you're talking to the right person.",
    "contact.desc": "Open to system administration, network engineering and backend / microservice development roles — remote or based in Malatya, Türkiye.",
    "contact.ch_email": "/ Email · primary",
    "contact.ch_github": "/ GitHub · profile",
    "contact.ch_linkedin": "/ LinkedIn · profile",
    "contact.ch_cv": "/ Resume · download",
    "contact.ch_cv_value": "PDF document (.pdf) — English",
    "contact.cv_href": "CV_Anil_Gul_EN.pdf",
    "contact.marquee1": "System",
    "contact.marquee2": "Architecture",
    "pdf.view": "Preview",
    "pdf.newtab": "New tab",
    "pdf.download": "Download",

    "foot.left": "© MMXXVI · ANIL GÜL · ALL RIGHTS RESERVED",
    "foot.center": "Designed & engineered in Malatya, Türkiye",
    "foot.right_v": "· Built with care"
  }
};

let currentLang = localStorage.getItem("anilgul.lang") || "tr";

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("anilgul.lang", lang);
  document.documentElement.lang = lang;
  const dict = TRANSLATIONS[lang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (!dict[key]) return;
    if (key.endsWith("_html")) el.innerHTML = dict[key];
    else el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    const [attr, key] = el.dataset.i18nAttr.split(":");
    if (dict[key]) el.setAttribute(attr, dict[key]);
  });
  // toggle button state
  document.querySelectorAll(".lang-opt").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });
  // re-render dynamic bits that depend on i18n
  if (typeof renderCapabilities === "function") renderCapabilities();
  if (typeof renderTech === "function") renderTech();
  if (typeof renderNodes === "function") renderNodes();
  if (typeof renderCertifications === "function") renderCertifications();
  if (typeof renderProjects === "function") renderProjects();
}

function initLangToggle() {
  document.querySelectorAll(".lang-opt").forEach(b => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });
  applyLang(currentLang);
}
