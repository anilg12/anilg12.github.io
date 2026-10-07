/* All copy and data for the site, bilingual (tr / en).
   A value is either a plain string (same in both languages) or { tr, en }. */

export const person = {
  name: 'Anıl Gül',
  email: 'anillgul2002@gmail.com',
  github: 'https://github.com/anilg12',
  githubLabel: 'github.com/anilg12',
  linkedin: 'https://www.linkedin.com/in/anilg12',
  linkedinLabel: 'linkedin.com/in/anilg12',
  cv: { tr: 'CV_Anil_Gul_TR.pdf', en: 'CV_Anil_Gul_EN.pdf' },
  coords: '38.35°N 38.31°E',
}

export const ui = {
  nav: [
    { id: 'stack', addr: '0x10', label: { tr: 'Katmanlar', en: 'Layers' } },
    { id: 'isa', addr: '0x20', label: { tr: 'Yetenekler', en: 'Skills' } },
    { id: 'proc', addr: '0x30', label: { tr: 'Projeler', en: 'Projects' } },
    { id: 'sig', addr: '0x40', label: { tr: 'Sertifikalar', en: 'Certificates' } },
    { id: 'ssh', addr: '0xFF', label: { tr: 'İletişim', en: 'Contact' } },
  ],
  layerNames: {
    top: { tr: 'SİLİKON', en: 'SILICON' },
    stack: { tr: 'KATMANLAR', en: 'LAYERS' },
    isa: { tr: 'KOMUT SETİ', en: 'INSTRUCTION SET' },
    proc: { tr: 'PROJELER', en: 'PROJECTS' },
    sig: { tr: 'SERTİFİKALAR', en: 'CERTIFICATES' },
    ssh: { tr: 'İLETİŞİM', en: 'CONTACT' },
  },
  skipBoot: { tr: 'Atlamak için bir tuşa basın', en: 'Press any key to skip' },
}

export const boot = {
  lines: [
    { k: 'AG-BIOS', v: { tr: 'v4.0 · (C) 2002–2026 Anıl Gül', en: 'v4.0 · (C) 2002–2026 Anıl Gül' } },
    { k: 'CPU', v: { tr: 'ANIL.GÜL — Sistem & Yazılım Mühendisi @ 2002 MHz', en: 'ANIL.GUL — Systems & Software Engineer @ 2002 MHz' } },
    { k: 'MEMORY', v: 'mem' },
    { k: 'STORAGE', v: 'EMBERWISE · OBLIVION · SPEKTRA · STOCKFLOW · ROSEOS' },
    { k: 'NETWORK', v: { tr: 'Cisco IOS · bağlantı kuruldu', en: 'Cisco IOS · link up' } },
    { k: 'KERNEL', v: { tr: 'çekirdek yükleniyor', en: 'loading kernel' }, ok: true },
    { k: 'SERVICES', v: { tr: 'servisler başlatılıyor', en: 'starting services' }, ok: true },
  ],
}

export const hero = {
  role: { tr: 'Sistem & Yazılım Mühendisi', en: 'Systems & Software Engineer' },
  motto: 'bare-metal → HAL → kernel → backend → microservices',
  meta: [
    { tr: 'Malatya, Türkiye', en: 'Malatya, Türkiye' },
    { tr: 'Kapadokya Üni. · YBS', en: 'Kapadokya Univ. · MIS' },
  ],
  status: { tr: 'Fırsatlara açık', en: 'Open to opportunities' },
  cue: { tr: 'Kaydır · sistemi başlat', en: 'Scroll · power on' },
  captions: [
    {
      range: [0.2, 0.38],
      addr: '0x00',
      title: { tr: 'Silikon', en: 'Silicon' },
      body: {
        tr: 'Donanımı, ağı ve yazılımı ayrı parçalar olarak değil, kusursuz işleyen tek bir ekosistem olarak tasarlıyorum.',
        en: 'I design hardware, networking and software not as separate parts but as one seamless ecosystem.',
      },
    },
    {
      range: [0.42, 0.58],
      addr: '0x01',
      title: { tr: 'Kapak açık', en: 'Lid off' },
      body: {
        tr: 'Her sistemin altında bir çip, her çipin altında bir karar var. Ben en alttan başlarım: fiziksel donanım ve donanım soyutlama katmanı.',
        en: 'Under every system there is a chip, and under every chip a decision. I start at the bottom: the physical hardware and the hardware abstraction layer.',
      },
    },
    {
      range: [0.62, 0.8],
      addr: '0x02',
      title: { tr: 'Sekiz çekirdek', en: 'Eight cores' },
      body: {
        tr: 'C++, Java, Python ve .NET; yanında Linux, PowerShell, NTLite ve Cisco IOS — her biri gerçek projelerde ve sahada sınanmış bir çekirdek.',
        en: 'C++, Java, Python and .NET, alongside Linux, PowerShell, NTLite and Cisco IOS — each one a core proven in real projects and in the field.',
      },
    },
    {
      range: [0.84, 0.97],
      addr: '0x03',
      title: { tr: 'POST tamam', en: 'POST OK' },
      body: {
        tr: 'Sistem hazır. Şimdi katman katman yukarı çıkalım.',
        en: 'System ready. Now let’s climb the stack, layer by layer.',
      },
    },
  ],
}

export const stack = {
  title: { tr: ['Donanımdan', 'servise.'], en: ['From silicon', 'to service.'] },
  intro: {
    tr: 'Kapadokya Üniversitesi Yönetim Bilişim Sistemleri mezunuyum. Fiziksel donanımdan ve donanım soyutlama katmanından başlayıp C++ ve .NET ile modern servis mimarilerine kadar uçtan uca altyapı kuruyorum. Kendi işletim sistemi imajımı derleyecek kadar çekirdeği, kullanıcının elindeki uygulamayı da o kadar iyi tanırım.',
    en: 'I’m a Management Information Systems graduate from Kapadokya University. I build end-to-end infrastructure — from the physical hardware and the hardware abstraction layer up to modern service architectures in C++ and .NET. I know the kernel well enough to build my own OS images, and the app in the user’s hands just as well.',
  },
  direction: { tr: 'Yukarı doğru · 6 katman', en: 'Ascending · 6 layers' },
  layers: [
    {
      addr: '0x00',
      name: 'Bare-metal',
      body: {
        tr: 'Bileşen seviyesinde donanım tanılama ve kurulum. Sorun nerede başlıyorsa oradan bakarım: kart, bellek, güç, sürücü.',
        en: 'Component-level hardware diagnostics and builds. I look where the problem starts: board, memory, power, driver.',
      },
      tech: ['Intel', 'AMD', 'NVIDIA', 'Raspberry Pi'],
    },
    {
      addr: '0x01',
      name: 'HAL',
      body: {
        tr: 'Donanım soyutlama katmanı ve sürücü entegrasyonu: çekirdeğin donanımla konuştuğu, hataların en pahalı olduğu yer.',
        en: 'Hardware abstraction and driver integration: where the kernel talks to the hardware, and where mistakes cost the most.',
      },
      tech: ['Kernel & Drivers', 'Driver Integration', 'Firmware'],
    },
    {
      addr: '0x02',
      name: 'Kernel / OS',
      body: {
        tr: 'NTLite ile 94 bileşeni sökülmüş, boşta 1.8 GB RAM ile açılan Windows imajları. Windows, Linux ve macOS’ta yönetici seviyesinde sistem yönetimi.',
        en: 'Windows images stripped of 94 components with NTLite, idling at 1.8 GB RAM. Admin-level system administration on Windows, Linux and macOS.',
      },
      tech: ['NTLite', 'Windows', 'Linux', 'macOS', 'PowerShell'],
    },
    {
      addr: '0x03',
      name: 'Network',
      body: {
        tr: 'Cisco sertifikalı yönlendirme, anahtarlama, VLAN ve IP adresleme; gerçek ağları kurar, izler ve sorun gideririm.',
        en: 'Cisco-certified routing, switching, VLANs and IP addressing; I build, monitor and troubleshoot real networks.',
      },
      tech: ['Cisco IOS', 'VLAN', 'IP Addressing', 'Wireshark'],
    },
    {
      addr: '0x04',
      name: 'Backend',
      body: {
        tr: 'C++, Java, Python ve .NET ile servis katmanları ve mikroservis mimarileri. İş kuralı arayüzden ayrı yaşar.',
        en: 'Service layers and microservice architectures in C++, Java, Python and .NET. Business rules live apart from the UI.',
      },
      tech: ['C++', 'Java', 'Python', '.NET', 'Microservices'],
    },
    {
      addr: '0x05',
      name: { tr: 'Uygulamalar', en: 'Applications' },
      body: {
        tr: 'Windows ve macOS’ta yayında olan masaüstü uygulamaları: koddan kurulum dosyasına ve CI’a kadar uçtan uca.',
        en: 'Desktop apps shipping on Windows and macOS — end to end, from the first line of code to installers and CI.',
      },
      tech: ['C++', 'Java', 'JavaFX', '.NET', 'Python'],
    },
  ],
}

export const isa = {
  title: { tr: ['Komut', 'seti.'], en: ['Instruction', 'set.'] },
  intro: {
    tr: 'Teoride değil, projelerde ve sahada sınanmış yetkinlikler — beş yazmaç bankasında 24 komut.',
    en: 'Skills tested in real projects and in the field, not in theory — 24 instructions across five register banks.',
  },
  banks: [
    { reg: 'R0', name: { tr: 'Diller', en: 'Languages' }, items: ['C++', 'Java', 'Python', 'C# / .NET'] },
    { reg: 'R1', name: { tr: 'Çerçeveler & Veri', en: 'Frameworks & Data' }, items: ['JavaFX', 'Flet', 'tkinter', 'SQLite', 'Microservices'] },
    { reg: 'R2', name: { tr: 'Sistemler', en: 'Systems' }, items: ['Windows', 'Linux', 'macOS', 'NTLite', 'Kernel & Drivers', 'System Administration', 'Hardware Diagnostics'] },
    { reg: 'R3', name: { tr: 'Ağ & Güvenlik', en: 'Network & Security' }, items: ['Cisco IOS', 'VLANs', 'IP Addressing', 'Network Topology'] },
    { reg: 'R4', name: { tr: 'Araçlar & Pratikler', en: 'Tools & Practices' }, items: ['Git', 'GitHub Actions (CI/CD)', 'Unit & E2E Testing', 'Installer Packaging'] },
  ],
  stats: [
    { value: 6, label: { tr: 'yayında proje', en: 'shipped projects' } },
    { value: 14, label: { tr: 'sertifika', en: 'certificates' } },
    { value: 12, label: { tr: 'kaynağında doğrulanabilir', en: 'verifiable at source' } },
    { value: 2, label: { tr: 'platform · Windows & macOS', en: 'platforms · Windows & macOS' } },
  ],
}

const download = { tr: 'İndir', en: 'Download' }

export const projects = [
  {
    id: 'emberwise',
    pid: '0x01',
    name: 'Emberwise',
    version: 'v1.1',
    year: '2026',
    platform: 'Windows · macOS',
    kind: { tr: 'Odak RPG’si · en iddialı projem', en: 'Focus RPG · my most ambitious build' },
    tagline: {
      tr: 'Görevlerini maceraya, odaklandığın her dakikayı XP’ye çeviren sıcak bir odak oyunu.',
      en: 'A cozy focus game that turns tasks into quests and every focused minute into XP.',
    },
    desc: {
      tr: 'JavaFX ile yazdığım Odak Menajeri RPG’nin Electron, Svelte 5 ve TypeScript ile baştan aşağı yeniden yazılmış hâli. Pomodoro odak ateşi, elle çizilmiş karakterler, bir yıla yayılan giriş ödülleri ve gerçek saha kayıtlarından ortam sesi karıştırıcı. Tamamen çevrimdışı: hesap, reklam ve takip yok.',
      en: 'A ground-up rewrite of my JavaFX Focus Manager RPG in Electron, Svelte 5 and TypeScript. A Pomodoro focus flame, hand-drawn characters, a year-long login reward path and an ambience mixer built from real field recordings. Fully offline: no account, no ads, no tracking.',
    },
    facts: [
      { v: '19', k: { tr: 'elle çizilmiş karakter', en: 'hand-drawn characters' } },
      { v: '13', k: { tr: 'gerçek ortam sesi', en: 'real ambience tracks' } },
      { v: '~400', k: { tr: 'özgün söz', en: 'original lines' } },
      { v: '29', k: { tr: 'başarım', en: 'achievements' } },
    ],
    stack: ['Electron', 'Svelte 5', 'TypeScript', 'Vite', 'Web Audio API'],
    media: {
      type: 'clips',
      clips: [
        { src: 'media/emberwise/{lang}/quest', label: { tr: 'Görevler', en: 'Quests' } },
        { src: 'media/emberwise/{lang}/focus', label: { tr: 'Odak', en: 'Focus' } },
        { src: 'media/emberwise/{lang}/hero', label: { tr: 'Kahraman', en: 'Hero' } },
        { src: 'media/emberwise/{lang}/rewards', label: { tr: 'Ödüller', en: 'Rewards' } },
        { src: 'media/emberwise/{lang}/sounds', label: { tr: 'Sesler', en: 'Ambience' } },
      ],
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/anilg12/Emberwise' },
      { label: download, url: 'https://github.com/anilg12/Emberwise/releases/latest', download: true },
    ],
  },
  {
    id: 'oblivion',
    pid: '0x02',
    name: 'Oblivion',
    version: 'v3.1',
    year: '2026',
    platform: 'Windows · macOS',
    kind: { tr: 'Sistem bakım aracı', en: 'System maintenance tool' },
    tagline: {
      tr: 'Programları iz bırakmadan kaldırır, bilgisayarını güvenle temizler, sistemini canlı gösterir.',
      en: 'Removes programs without a trace, cleans your computer safely and shows your system live.',
    },
    desc: {
      tr: 'Windows’ta C# / WPF, macOS’ta yerel SwiftUI. Kayıt defteri ve dosya sistemindeki her kalıntıyı bulunma nedeni ve güven seviyesiyle listeler. Canlı sistem izleyici, Avcı Modu, başlangıç yöneticisi ve dosya parçalayıcı tek çatı altında; hiçbir şeyi senin yerine seçmez ve her zaman bir geri dönüş yolu bırakır.',
      en: 'C# / WPF on Windows, native SwiftUI on macOS. Every registry and file-system leftover is listed with the reason it was found and a confidence level. A live system monitor, Hunter Mode, startup manager and file shredder under one roof; it never selects anything for you and always leaves a way back.',
    },
    facts: [
      { v: '2', k: { tr: 'yerel platform', en: 'native platforms' } },
      { v: '3.1', k: { tr: 'güncel sürüm', en: 'current release' } },
      { v: '0', k: { tr: 'önceden seçili öğe', en: 'items pre-selected' } },
      { v: '100%', k: { tr: 'silmeden önce onay', en: 'confirmed before delete' } },
    ],
    stack: ['C#', '.NET 8', 'WPF', 'Swift', 'SwiftUI', 'Win32 API'],
    media: {
      type: 'clips',
      clips: [
        { src: 'media/projects/oblivion-windows', label: 'Windows 10 / 11' },
        { src: 'media/projects/oblivion-macos', label: 'macOS 14+' },
      ],
    },
    links: [
      { label: 'GitHub', url: 'https://github.com/anilg12/Oblivion-Uninstaller' },
      { label: download, url: 'https://github.com/anilg12/Oblivion-Uninstaller/releases/latest', download: true },
    ],
  },
  {
    id: 'spektra',
    pid: '0x03',
    name: 'SPEKTRA',
    version: 'v2.0',
    year: '2026',
    platform: 'Windows · MSI',
    kind: { tr: 'Elektronik harp simülatörü', en: 'Electronic-warfare simulator' },
    tagline: {
      tr: 'Frekans atlamalı bir telsiz, iki düşman karıştırıcıya karşı — canlı spektrum ve şelale üzerinde.',
      en: 'A frequency-hopping radio against two enemy jammers — over a live spectrum and waterfall.',
    },
    desc: {
      tr: 'Saf Java fizik çekirdeği sinyal, gürültü ve karışmayı lineer güç düzleminde modelleyip SJNR ve PDR metriklerini sayısal olarak doğrular. Takip eden karıştırıcının tepki gecikmesi şelalede görünür: telsiz yeterince hızlı atlarsa bağlantı ayakta kalır. jlink + jpackage ile Java gerektirmeyen bir MSI olarak paketlenir.',
      en: 'A pure-Java physics core models signal, noise and interference in the linear power domain and numerically validates SJNR and PDR. The follower jammer’s reaction delay shows up on the waterfall: hop fast enough and the link survives. Packaged with jlink + jpackage as an MSI that needs no Java.',
    },
    facts: [
      { v: '4', k: { tr: 'bant ön ayarı', en: 'band presets' } },
      { v: '2', k: { tr: 'eşzamanlı tehdit', en: 'simultaneous threats' } },
      { v: '~98%', k: { tr: 'hızlı atlamada PDR', en: 'PDR when hopping fast' } },
      { v: '0', k: { tr: 'gereken Java kurulumu', en: 'Java installs needed' } },
    ],
    stack: ['Java 21', 'JavaFX 21', 'RF / DSP', 'FHSS', 'jlink', 'jpackage'],
    media: { type: 'image', src: 'media/projects/spektra.webp', alt: 'SPEKTRA spectrum analyzer and waterfall' },
    links: [
      { label: 'GitHub', url: 'https://github.com/anilg12/Spektra' },
      { label: download, url: 'https://github.com/anilg12/Spektra/releases/latest', download: true },
    ],
  },
  {
    id: 'stockflow',
    pid: '0x04',
    name: 'StockFlow',
    version: 'v1.0',
    year: '2025',
    platform: 'Windows · Linux · macOS',
    kind: { tr: 'Stok & CRM · bitirme projesi', en: 'Inventory & CRM · capstone' },
    tagline: {
      tr: 'Küçük ve orta ölçekli bir işletmenin stoğu ve müşteri ilişkileri, tek pencerede.',
      en: 'A small business’s inventory and customer relationships, in one window.',
    },
    desc: {
      tr: 'Kapadokya Üniversitesi bitirme projem. Yalnızca Python standart kütüphanesiyle yazıldı: tkinter arayüz, SQLite veri katmanı, PBKDF2 parola saklama, elle çizilmiş grafikler. Satış fişleri atomik yazılır, stok her hareketiyle izlenebilir; pip install gerektirmez.',
      en: 'My capstone at Kapadokya University, built with the Python standard library alone: a tkinter UI, an SQLite data layer, PBKDF2 password hashing and hand-drawn charts. Receipts are written atomically and every stock change is traceable; no pip install needed.',
    },
    facts: [
      { v: '0', k: { tr: 'harici bağımlılık', en: 'external dependencies' } },
      { v: '9', k: { tr: 'tablolu veri modeli', en: 'table data model' } },
      { v: '6', k: { tr: 'rapor türü', en: 'report types' } },
      { v: '120k', k: { tr: 'PBKDF2 turu', en: 'PBKDF2 rounds' } },
    ],
    stack: ['Python', 'tkinter', 'SQLite', 'PBKDF2', 'CSV'],
    media: {
      type: 'images',
      images: [
        { src: 'media/projects/stockflow-panel.webp', alt: 'StockFlow dashboard' },
        { src: 'media/projects/stockflow-sales.webp', alt: 'StockFlow sales receipt' },
      ],
    },
    links: [{ label: 'GitHub', url: 'https://github.com/anilg12/StockFlow' }],
  },
  {
    id: 'roseos',
    pid: '0x05',
    name: 'RoseOS',
    version: '11 Pro · 10',
    year: '2023—2026',
    platform: 'NTLite · Windows',
    kind: { tr: 'Hafifletilmiş Windows imajları', en: 'Slimmed-down Windows images' },
    tagline: {
      tr: 'Boşta 1.8 GB RAM ile açılan, 2034’e kadar güvenlik güncellemesi alan Windows 11 LTSC.',
      en: 'Windows 11 LTSC idling at 1.8 GB RAM, with security updates until 2034.',
    },
    desc: {
      tr: 'Windows 11 Enterprise LTSC 2024 tabanlı, 94 bileşeni kaldırılmış ve telemetrisi kısılmış yapılandırma. Repo ISO dağıtmaz: kendi resmi ISO’na uygulayıp aynı sonucu üretebileceğin doğrulanabilir bir preset.xml içerir. RoseOS 10 ise sürücü ve servis düzeyinde sadeleştirilmiş Windows 10 imajı.',
      en: 'A Windows 11 Enterprise LTSC 2024 configuration with 94 components removed and telemetry reduced. The repo ships no ISO — a verifiable preset.xml you apply to your own official ISO to reproduce the result. RoseOS 10 is a Windows 10 image trimmed at the driver and service level.',
    },
    facts: [
      { v: '1.8 GB', k: { tr: 'boşta RAM', en: 'idle RAM' } },
      { v: '94', k: { tr: 'kaldırılan bileşen', en: 'components removed' } },
      { v: '2034', k: { tr: 'güvenlik desteği', en: 'security support' } },
      { v: '0', k: { tr: 'dağıtılan ISO', en: 'ISOs distributed' } },
    ],
    stack: ['NTLite', 'Windows 11 LTSC', 'Windows 10', 'Debloat', 'Reproducible build'],
    media: {
      type: 'layered',
      base: { src: 'media/projects/roseos-ram.webp', alt: 'RoseOS idle RAM usage' },
      card: { src: 'media/projects/roseos-poster.webp', alt: 'RoseOS 11 Pro poster' },
    },
    links: [
      { label: 'Win11 LTSC Lite', url: 'https://github.com/anilg12/win11-ltsc-lite' },
      { label: 'Win10 NTLite', url: 'https://github.com/anilg12/Win10NTLiteLog' },
    ],
  },
]

export const proc = {
  counter: { tr: 'PROJE', en: 'PROJECT' },
  running: { tr: 'YAYINDA', en: 'SHIPPED' },
  hint: { tr: 'Kartların üzerinde kaydırın ya da okları kullanın', en: 'Scroll over the cards or use the arrows' },
  prev: { tr: 'Önceki proje', en: 'Previous project' },
  next: { tr: 'Sonraki proje', en: 'Next project' },
}

/* Technical certificates. `id` names the rendered preview in media/certs/. */
export const certificates = [
  {
    id: 'it-essentials',
    title: 'IT Essentials',
    issuer: 'Cisco Networking Academy',
    date: { tr: 'Şub 2023', en: 'Feb 2023' },
    desc: { tr: 'Donanım, işletim sistemleri, ağ temelleri ve sorun giderme.', en: 'Hardware, operating systems, networking fundamentals and troubleshooting.' },
    verify: 'https://www.credly.com/badges/e0243f64-70cc-4f19-85e7-7a88394acc96',
    via: 'Credly',
    pdf: 'certificates/IT_Essentials_-_Anil_Gul.pdf',
  },
  {
    id: 'crtom',
    title: 'Certified Red Team Operations Management (CRTOM)',
    issuer: 'Red Team Leaders',
    date: { tr: 'Şub 2026', en: 'Feb 2026' },
    desc: { tr: 'Kırmızı takım operasyonlarının planlanması, yönetimi ve raporlanması.', en: 'Planning, managing and reporting red team operations.' },
    verify: 'https://courses.redteamleaders.com/exam-completion/824550147dd735f5',
    via: 'Red Team Leaders',
    pdf: 'certificates/Certified_Red_Team_Operations_Management_-_Anil_Gul.pdf',
  },
  {
    id: 'ileri-java-101',
    title: { tr: 'İleri Java 101', en: 'Advanced Java 101' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'Nesne yönelimli tasarım, koleksiyonlar, generic yapılar ve istisna yönetimi.', en: 'Object-oriented design, collections, generics and exception handling.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/1e941554e6b44eac8f5b1f6029c94b7e',
    via: 'Turkcell',
    pdf: 'certificates/Ileri_Java_101_-_Anil_Gul.pdf',
  },
  {
    id: 'ileri-java-201',
    title: { tr: 'İleri Java 201', en: 'Advanced Java 201' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'Eşzamanlılık, Stream API, lambda ifadeleri ve veri erişimi.', en: 'Concurrency, the Stream API, lambda expressions and data access.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/5913179295154614aefd36401fbffeb1',
    via: 'Turkcell',
    pdf: 'certificates/Ileri_Java_201_-_Anil_Gul.pdf',
  },
  {
    id: 'ileri-java-301',
    title: { tr: 'İleri Java 301', en: 'Advanced Java 301' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'Katmanlı mimari, bağımlılık enjeksiyonu, ORM ve REST servisleri.', en: 'Layered architecture, dependency injection, ORM and REST services.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/38103fd4cd314728aad2e7ce518a06ca',
    via: 'Turkcell',
    pdf: 'certificates/Ileri_Java_301_-_Anil_Gul.pdf',
  },
  {
    id: 'sistem-tasarimi',
    title: { tr: 'Sistem Tasarımı ve Gerçek Case Mimarisi', en: 'System Design & Real-World Case Architecture' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'Ölçeklenebilirlik, yük dengeleme, önbellekleme ve mesaj kuyrukları.', en: 'Scalability, load balancing, caching and message queues.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/45a3f3c9b1574dee9591790f581a5f18',
    via: 'Turkcell',
    pdf: 'certificates/Sistem_Tasarimi_ve_Gercek_Case_Mimarisi_-_Anil_Gul.pdf',
  },
  {
    id: 'yapay-zeka-backend',
    title: { tr: 'Yapay Zeka Destekli Backend: Copilot & FastAPI', en: 'AI-Assisted Backend: Copilot & FastAPI' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'FastAPI ile API geliştirme, Pydantic doğrulama ve asenkron uç noktalar.', en: 'API development with FastAPI, Pydantic validation and async endpoints.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/c7f73c5fa3f344f1beb51f625b6ff134',
    via: 'Turkcell',
    pdf: 'certificates/Yapay_Zeka_Destekli_Backend_-_Anil_Gul.pdf',
  },
  {
    id: 'blockchain',
    title: { tr: 'Blockchain Teknolojileri', en: 'Blockchain Technologies' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'Dağıtık defter, konsensüs algoritmaları ve akıllı sözleşmeler.', en: 'Distributed ledgers, consensus algorithms and smart contracts.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/0b682b4b41ca420fb26b39ea793cede6',
    via: 'Turkcell',
    pdf: 'certificates/Blockchain_Teknolojileri_-_Anil_Gul.pdf',
  },
  {
    id: 'prompt-muhendisligi',
    title: { tr: 'Prompt Mühendisliği', en: 'Prompt Engineering' },
    issuer: 'Turkcell Akademi',
    date: { tr: 'Tem 2026', en: 'Jul 2026' },
    desc: { tr: 'Büyük dil modelleriyle etkili çalışma ve çıktı kalitesinin iyileştirilmesi.', en: 'Working effectively with large language models and improving output quality.' },
    verify: 'https://gelecegiyazanlar.turkcell.com.tr/sertifika/deeff392de824f6a91dda356a3f8f4ba',
    via: 'Turkcell',
    pdf: 'certificates/Prompt_Muhendisligi_-_Anil_Gul.pdf',
  },
  {
    id: 'html-essentials',
    title: 'HTML Essentials',
    issuer: 'Cisco · JS Institute',
    date: { tr: 'Şub 2026', en: 'Feb 2026' },
    desc: { tr: 'HTML5 belge yapısı, formlar, multimedya ve erişilebilirlik.', en: 'HTML5 document structure, forms, multimedia and accessibility.' },
    verify: 'https://www.credly.com/badges/52be34e1-4d70-494e-b9f9-04c78427ad4c',
    via: 'Credly',
    pdf: 'certificates/HTML_Essentials_-_Anil_Gul.pdf',
  },
  {
    id: 'css-essentials',
    title: 'CSS Essentials',
    issuer: 'Cisco · JS Institute',
    date: { tr: 'Şub 2026', en: 'Feb 2026' },
    desc: { tr: 'CSS3 düzen teknikleri, duyarlı tasarım ve stil sistemleri.', en: 'CSS3 layout techniques, responsive design and styling.' },
    verify: 'https://www.credly.com/badges/738f4616-d345-4c79-b3cc-159c900be28c',
    via: 'Credly',
    pdf: 'certificates/CSS_Essentials_-_Anil_Gul.pdf',
  },
  {
    id: 'javascript-essentials-2',
    title: 'JavaScript Essentials 2',
    issuer: 'Cisco · JS Institute',
    date: '2026',
    desc: { tr: 'İleri JavaScript: OOP, prototip zinciri, asenkron programlama ve modüller.', en: 'Advanced JavaScript: OOP, the prototype chain, async programming and modules.' },
    verify: 'https://www.credly.com/badges/937b5b55-b614-4949-8626-b2a3ee69df31',
    via: 'Credly',
    pdf: 'certificates/JavaScript_Essentials_2_-_Anil_Gul.pdf',
  },
  {
    id: 'pcap',
    title: 'Programming Essentials in Python (PCAP)',
    issuer: 'Cisco · OpenEDG',
    date: '2023',
    desc: { tr: 'Python temelleri, modüller, istisna yönetimi ve nesne yönelimli programlama.', en: 'Python fundamentals, modules, exception handling and object-oriented programming.' },
    verify: null,
    pdf: 'certificates/PCAP_Programming_Essentials_in_Python_-_Anil_Gul.pdf',
  },
  {
    id: 'packet-tracer',
    title: 'Introduction to Packet Tracer',
    issuer: 'Cisco Networking Academy',
    date: '2023',
    desc: { tr: 'Ağ simülasyonu, cihaz yapılandırması, topolojiler ve IP adresleme.', en: 'Network simulation, device configuration, topologies and IP addressing.' },
    verify: null,
    pdf: 'certificates/Introduction_to_Packet_Tracer_-_Anil_Gul.pdf',
  },
]

/* Attendance certificates from Kapadokya University (personal data removed from the copies). */
export const trainings = [
  {
    id: 'yapay-zeka-farkindalik',
    title: { tr: 'Yapay Zekaya Giriş ve Üretken Yapay Zeka Araçları', en: 'Introduction to AI & Generative AI Tools' },
    issuer: { tr: 'Kapadokya Üniversitesi · SEM · 6 saat', en: 'Kapadokya University · SEM · 6 hours' },
    date: { tr: 'Nis 2025', en: 'Apr 2025' },
    pdf: 'certificates/yapay-zeka-farkindalik.pdf',
  },
  {
    id: 'ozgecmis-mulakat',
    title: { tr: 'Öz Geçmiş Hazırlama ve Mülakat Teknikleri', en: 'Résumé Writing & Interview Techniques' },
    issuer: { tr: 'Kapadokya Üniversitesi · Anadolu Yetenek Akademisi', en: 'Kapadokya University · Anadolu Talent Academy' },
    date: { tr: 'May 2025', en: 'May 2025' },
    pdf: 'certificates/ozgecmis-mulakat.pdf',
  },
  {
    id: 'not-alma',
    title: { tr: 'Not Alma Teknikleri', en: 'Note-Taking Techniques' },
    issuer: { tr: 'Kapadokya Üniversitesi · SEM · 1 saat', en: 'Kapadokya University · SEM · 1 hour' },
    date: { tr: 'Kas 2025', en: 'Nov 2025' },
    pdf: 'certificates/not-alma.pdf',
  },
  {
    id: 'calisma-yonetimi-empati',
    title: { tr: 'Çalışma Yönetimi ve Empati Becerileri', en: 'Work Management & Empathy Skills' },
    issuer: { tr: 'Kapadokya Üniversitesi · Kariyer Ofisi · 1 saat', en: 'Kapadokya University · Career Office · 1 hour' },
    date: { tr: 'Ara 2025', en: 'Dec 2025' },
    pdf: 'certificates/calisma-yonetimi-empati.pdf',
  },
  {
    id: 'kurumsal-surdurulebilirlik',
    title: { tr: 'Kurumsal Sürdürülebilirlik ve Atık Yönetimi', en: 'Corporate Sustainability & Waste Management' },
    issuer: { tr: 'Kapadokya Üniversitesi · SEM · 2 saat', en: 'Kapadokya University · SEM · 2 hours' },
    date: { tr: 'Oca 2026', en: 'Jan 2026' },
    pdf: 'certificates/kurumsal-surdurulebilirlik.pdf',
  },
]

export const sig = {
  title: { tr: ['Doğrulanmış', 'sertifikalar.'], en: ['Verified', 'certificates.'] },
  intro: {
    tr: 'On dört sertifika; on ikisi kaynağında tek tıkla doğrulanabilir. Her belgeyi indirmeden önizleyebilirsiniz.',
    en: 'Fourteen certificates; twelve can be verified at the source with one click. Every document can be previewed before you download it.',
  },
  verified: { tr: 'Doğrulanabilir', en: 'Verifiable' },
  archived: { tr: 'PDF arşivi', en: 'PDF archive' },
  verify: { tr: 'Doğrula', en: 'Verify' },
  preview: { tr: 'Önizle', en: 'Preview' },
  download: { tr: 'PDF indir', en: 'Download PDF' },
  openTab: { tr: 'Yeni sekmede aç', en: 'Open in new tab' },
  close: { tr: 'Kapat', en: 'Close' },
  prev: { tr: 'Önceki belge', en: 'Previous certificate' },
  next: { tr: 'Sonraki belge', en: 'Next certificate' },
  issuedBy: { tr: 'Veren', en: 'Issued by' },
  trainingsTitle: { tr: 'Mesleki gelişim · katılım belgeleri', en: 'Professional development · attendance certificates' },
  trainingsNote: {
    tr: 'Kapadokya Üniversitesi e-belgeleri. Gizlilik için kimlik ve barkod bilgileri bu kopyalardan kaldırıldı.',
    en: 'Kapadokya University e-certificates. ID and barcode details have been removed from these copies for privacy.',
  },
}

export const ssh = {
  title: { tr: ['İletişime', 'geçin.'], en: ['Get in', 'touch.'] },
  intro: {
    tr: 'Sistem mühendisliği, yazılım mühendisliği ve bilişim sektöründeki ilgili rollere açığım — uzaktan ya da Malatya merkezli.',
    en: 'Open to systems engineering, software engineering and related roles across the IT industry — remote or based in Malatya.',
  },
  channels: {
    email: { tr: 'E-posta', en: 'Email' },
    copied: { tr: 'Kopyalandı', en: 'Copied' },
    copy: { tr: 'Kopyala', en: 'Copy' },
    cv: { tr: 'CV · PDF', en: 'CV · PDF' },
  },
  terminal: {
    hint: { tr: 'Bir komut yazın ya da birine dokunun', en: 'Type a command or tap one' },
    placeholder: { tr: 'help yazın…', en: 'type help…' },
    suggestions: ['help', 'whoami', 'projects', 'skills', 'contact', 'sudo hire anil'],
  },
}

export const footer = {
  halt: { tr: 'Sistem durduruldu.', en: 'System halted.' },
  safe: { tr: 'Artık bilgisayarınızı güvenle kapatabilirsiniz.', en: 'It’s now safe to turn off your computer.' },
  top: { tr: 'Başa dön', en: 'Back to top' },
  rights: { tr: '© MMXXVI · Anıl Gül · Malatya’da tasarlandı ve kodlandı', en: '© MMXXVI · Anıl Gül · designed and engineered in Malatya' },
}
