# 👾 Mohamed Akram — Retro 8-Bit Pixel Developer Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live_Demo-mohamedakram--portfolio.vercel.app-00df89?style=for-the-badge&logo=vercel&logoColor=white)](https://mohamedakram-portfolio.vercel.app)
[![GitHub Profile](https://img.shields.io/badge/GitHub-akr4mcodes-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akr4mcodes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Built With](https://img.shields.io/badge/Vanilla-HTML5%20%7C%20CSS3%20%7C%20JavaScript-orange?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/)

> A nostalgic, interactive **8-bit retro developer portfolio and arcade hub** crafted with pure vanilla web technologies, featuring Web Audio API chiptunes, a slide-out lo-fi cassette music player, playable canvas Snake arcade, CRT scanlines, and a Pinterest-style masonry gallery.

---

## 🌟 Overview

**Mohamed Akram's Developer Portfolio** is a love letter to vintage 8-bit gaming aesthetics fused with modern web engineering. Designed and built from scratch without bulky frontend frameworks, it delivers ultra-fast load times, pixel-perfect layouts, responsive mobile adaptation, and rich tactile interactions.

* **Developer:** Mohamed Akram ([@akr4mcodes](https://github.com/akr4mcodes))
* **Location:** Annaba, Algeria 🇩🇿
* **Specialization:** Economics & Quantitative Analysis, Artificial Intelligence, Full-Stack Web Development, Cross-Platform Mobile Apps

---

## ✨ Key Features & Interactive Modules

### 🕹️ 1. Retro 8-Bit Aesthetics & CRT Shaders
* **CRT Scanline Overlay:** Instant toggleable nostalgic cathode-ray-tube scanline filter (`#crtOverlay`) replicating vintage CRT monitors.
* **Pixel Typography:** Harmonious pairing of retro Google Fonts (*Press Start 2P*, *Pixelify Sans*, *VT323*, *Silkscreen*) and the local *Determination* 8-bit font.
* **Custom Pixelated Cursors:** Retro pixel mouse pointer, click cursor, and hover states.

### 🔊 2. Procedural 8-Bit Web Audio SFX Synthesizer
* Built with the native **Web Audio API** (`OscillatorNode`, `GainNode`).
* Zero external audio files required for UI sound effects — procedural sound generation on the fly:
  * **Hover Ticks:** High-frequency soft sine blips.
  * **Button Clicks:** Crisp 8-bit square wave pulses.
  * **Modal Open Fanfare:** Three-note arpeggio chord.
  * **Coin / Copy Toast:** Classic arcade pickup chime.
  * **Arcade Sounds:** Dedicated eat, die, and bonus tones for games.
* Includes a global mute/unmute SFX toggle in the navigation bar.

### 🎵 3. Retro Flip Music Player (Floating Drawer Widget)
* **Slide-Out Drawer:** Smoothly tucked into the screen edge with an animated pulsating audio indicator ring.
* **7 Curated Tracks:** Built-in playlist of lo-fi, synthwave, and chill tracks:
  1. *7AM (Slowed + Reverb)*
  2. *ISVVC - COOL WIT THE PIMP*
  3. *MOOD - I RUN WITH TROUBLE*
  4. *Midnight Club*
  5. *Palace (Slowed + Reverb)*
  6. *Sittin' Sideways*
  7. *Tek It*
* **Full Pixel Controls:** Play, pause, track skipping, dynamic seek bar, shuffle, and single-track repeat.
* **10-Segment 8-Bit Volume Meter:** Interactive stepped volume controller with real-time level readout and mute toggle.
* **Playlist Swipe View:** Seamless switch between album cover mode and tracklist selection.

### 🐍 4. In-Browser 8-Bit Snake Arcade Game
* Fully playable canvas-based retro game rendered inside a custom modal.
* **Controls:** Keyboard navigation (Arrow keys & `WASD`) + responsive **Mobile Touch D-Pad**.
* **High Score Tracking:** Persistent high score saved in `localStorage`.
* Integrated retro sound effects for food eating and game over.

### 🖼️ 5. Full-Screen Pinterest Masonry Gallery ("Pics of Me")
* Immersive photo and video showcase celebrating life, university, and surroundings in Annaba, Algeria.
* Filter tags (`#All`, `#Annaba`, `#School`, `#Aesthetic`, `#AlgeriaAI`).
* Smooth masonry grid with image lightbox cards and video player controls.

### 💻 6. Retro Terminal Mini-Widget & Tech Badges
* Interactive Unix-styled terminal mini-widget simulating an active developer shell.
* Interactive tech badges for **Python**, **JavaScript**, **React**, **Node.js**, **PHP**, **MySQL**, **C**, and **C++** with custom retro notification toasts.

### 🌗 7. Dark / Light Mode
* High-contrast retro Dark Mode and Light Mode with custom pixel sun/moon icons.
* Saves theme preference to `localStorage` for returning visits.

### 📋 8. Fast Contact Modal
* One-click copy-to-clipboard for email (`contactakramdev23@gmail.com`) and Instagram (`@akr4mx`).
* Instant retro toast notification and coin chime on copy.

---

## 💼 Client Services

| Service | Description | Core Stack |
| :--- | :--- | :--- |
| **01. E-commerce Websites** | Conversion-focused storefronts, landing pages, and administrative dashboards. | React, Node.js, Firebase, Stripe |
| **02. Portfolio & Brand Sites** | Bespoke personal and corporate identities with distinct visual flair. | HTML5, CSS3, JavaScript, Figma |
| **03. Mobile Store Apps** | Cross-platform mobile applications for retail and ordering. | Flutter, Dart, Firebase, REST APIs |
| **04. Business Analytics & Stats** | Quantitative market insights, econometrics, and predictive financial models. | Python, Pandas, NumPy, Scikit-Learn |
| **05. Custom Management Software** | Tailored management suites for clinics, fitness clubs, and private practices. | Desktop & Web, SQL, Admin Dashboards |
| **06. Automation & AI for Business** | 24/7 WhatsApp/web bots, invoice OCR extraction, and CRM workflow pipelines. | AI Agents, LLM APIs, Webhooks, Python |

---

## 🚀 Featured Projects (Quick Links)

The portfolio sidebar features direct links to selected works:

| Project | Category | Tech Stack | Links |
| :--- | :--- | :--- | :--- |
| **Management Innovation Club** | Web Platform | React.js, Tailwind CSS | [Demo](https://managementinnovationclub.vercel.app/) · [Repo](https://github.com/akr4mcodes/ManagementinnovationClub) |
| **DragonTec** | E-commerce | React, Tailwind CSS | [Demo](https://dragontec.netlify.app/) · [Repo](https://github.com/akr4mcodes/dragontec) |
| **Mobility Hub** | Full-Stack Security | FastAPI, React, Docker | [Repo](https://github.com/Sou1lah/hackathon---2026-30-04) |
| **HomeBite** | Mobile App | Flutter, Dart, Firebase | [Repo](https://github.com/akr4mcodes/HomeBite) |

---

## 🛠️ Technology Stack & Architecture

```
                       ┌─────────────────────────────────┐
                       │   Portfolio In Pixels (Front)   │
                       └────────────────┬────────────────┘
                                        │
         ┌──────────────────────────────┼──────────────────────────────┐
         ▼                              ▼                              ▼
  ┌──────────────┐              ┌──────────────┐              ┌────────────────┐
  │  Pure HTML5  │              │ Vanilla CSS3 │              │ JavaScript ES6 │
  │ Semantic DOM │              │ Pixel System │              │  Audio & Game  │
  └──────────────┘              └──────────────┘              └────────────────┘
         │                              │                              │
         ├─ Top Navigation              ├─ 8-bit Borders & Shadows     ├─ Web Audio API (SFX)
         ├─ Profile & Bio Cards         ├─ CRT Scanline Filter         ├─ RetroFlipMusicPlayer
         ├─ Service Grid                ├─ CSS Grid & Masonry          ├─ Canvas Snake Engine
         └─ Interactive Modals          └─ Dark / Light Themes         └─ Theme & LocalStorage
```

* **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
* **Audio Engine:** HTML5 Web Audio API (`AudioContext`) + `<audio>` streaming element
* **Canvas Engine:** HTML5 Canvas 2D Rendering API
* **Fonts:** `Press Start 2P`, `Pixelify Sans`, `VT323`, `Silkscreen`, `Determination`
* **Zero Dependencies:** No npm runtime dependencies; ultra-lightweight and lightning fast
* **Target Deployments:** Cloudflare Pages, Vercel, Netlify, or GitHub Pages

---

## 📁 Repository Structure

```
portfolio-in-pixels/
├── determination/               # 8-bit typography assets and certificates
│   ├── certificates/            # AI & engineering verified credentials
│   ├── determination.ttf        # Undertale-style pixel font
│   └── readme.txt
├── icons and images/            # Pixel stickers, avatars, and gallery photography
│   ├── 8-Bit Github Sticker.jpg
│   ├── avatar.jpg
│   ├── cursor-min.png           # Custom retro cursors
│   └── ...                      # Masonry gallery photos & assets
├── music/                       # Lo-fi & retro music tracks
│   ├── covers/                  # Pixel album covers (7am, mood, isvvc, etc.)
│   └── *.mp3                    # 7 audio tracks
├── cracking dino game.MP4       # Showcase media
├── index.html                   # Core semantic markup & structure
├── style.css                    # Complete retro design system & CRT effects
├── script.js                    # Web Audio, music player, snake game, modals
├── package.json                 # Static site deployment manifest
└── README.md                    # Project documentation
```

---

## ⚡ Getting Started Locally

Because this project is built entirely with vanilla web standards, you can run it with any static web server:

### Option 1: Python (Recommended)
```bash
# Clone the repository
git clone https://github.com/akr4mcodes/portfolio-in-pixels.git

# Navigate into the folder
cd portfolio-in-pixels

# Start a local HTTP server
python -m http.server 3000
```
Open **`http://localhost:3000`** in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code Live Server
* Right-click [`index.html`](index.html) in VS Code or Antigravity IDE and select **"Open with Live Server"**.

---

## ⚙️ Customization Guide

* **Adding Tracks to Music Player:**
  1. Add your `.mp3` audio file to `music/` and cover image to `music/covers/`.
  2. Open [`script.js`](script.js) and append a new entry to `const playlist = [...]` inside `RetroFlipMusicPlayer`.
* **Adding or Updating Projects:**
  1. Open [`index.html`](index.html) and locate the `<section class="card projects-sidebar-card">` section.
  2. Add your project article following the existing structure.
* **Adjusting Sound Effects:**
  1. Open [`script.js`](script.js) and customize the frequencies, oscillator types (`square`, `triangle`, `sawtooth`, `sine`), or volumes in `RetroAudio`.

---

## 📬 Contact & Connect

* **Website:** [mohamedakram-portfolio.vercel.app](https://mohamedakram-portfolio.vercel.app)
* **GitHub:** [@akr4mcodes](https://github.com/akr4mcodes)
* **Email:** [contactakramdev23@gmail.com](mailto:contactakramdev23@gmail.com)
* **Instagram:** [@akr4m.codes](https://instagram.com/akr4mx)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). Feel free to explore, learn, and adapt the retro pixel mechanics!