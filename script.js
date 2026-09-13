/**
 * Mohamed Akram — Retro Pixel-Art Portfolio Logic
 * Handles 8-bit Web Audio SFX, Modals, Theme Toggling, CRT Overlays, and Copy Actions
 */

// --- 8-Bit Web Audio Sound Effects Synthesizer ---
class RetroAudio {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  // Play crisp 8-bit tone
  playTone(frequency, type = 'square', duration = 0.08, gainVal = 0.05) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Button click blip
  click() {
    this.playTone(480, 'square', 0.05, 0.04);
  }

  // Hover tick
  hover() {
    this.playTone(880, 'sine', 0.02, 0.015);
  }

  // Modal open fanfare
  open() {
    this.playTone(523.25, 'triangle', 0.06, 0.05);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.06, 0.05), 60);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.1, 0.05), 120);
  }

  // Modal close blip
  close() {
    this.playTone(440, 'square', 0.05, 0.04);
    setTimeout(() => this.playTone(220, 'square', 0.08, 0.04), 50);
  }

  // Success coin sound
  success() {
    this.playTone(987.77, 'square', 0.08, 0.05);
    setTimeout(() => this.playTone(1318.51, 'square', 0.2, 0.06), 80);
  }

  // Snake Eat food sound
  eat() {
    this.playTone(600, 'square', 0.05, 0.05);
    setTimeout(() => this.playTone(900, 'square', 0.08, 0.06), 40);
  }

  // Snake Game Over sound
  die() {
    this.playTone(280, 'sawtooth', 0.12, 0.06);
    setTimeout(() => this.playTone(210, 'sawtooth', 0.15, 0.06), 100);
    setTimeout(() => this.playTone(140, 'sawtooth', 0.25, 0.06), 220);
  }

  // Bonus coffee sound
  bonus() {
    this.playTone(523.25, 'triangle', 0.06, 0.06);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.06, 0.06), 50);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.06, 0.06), 100);
    setTimeout(() => this.playTone(1046.50, 'triangle', 0.15, 0.06), 150);
  }
}

const sfx = new RetroAudio();
window.retroSfx = sfx;

// --- Toast Notification ---
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  sfx.success();

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// --- Theme Management (Dark / Light) ---
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('akram_theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);

function handleThemeToggle() {
  sfx.click();
  const currentTheme = htmlEl.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', newTheme);
  localStorage.setItem('akram_theme', newTheme);
  showToast(`Switched to ${newTheme.toUpperCase()} theme!`);
}

themeToggle?.addEventListener('click', handleThemeToggle);

// --- CRT Scanlines Toggle ---
const crtToggle = document.getElementById('crtToggle');
const crtOverlay = document.getElementById('crtOverlay');

const savedCrt = localStorage.getItem('akram_crt') !== 'disabled';
if (!savedCrt && crtOverlay) {
  crtOverlay.classList.add('disabled');
}

if (crtToggle) {
  crtToggle.addEventListener('click', () => {
    sfx.click();
    if (crtOverlay) {
      crtOverlay.classList.toggle('disabled');
      const isDisabled = crtOverlay.classList.contains('disabled');
      localStorage.setItem('akram_crt', isDisabled ? 'disabled' : 'enabled');
      showToast(`CRT Filter: ${isDisabled ? 'OFF' : 'ON'}`);
    }
  });
}

// --- Sound FX Toggle ---
const soundToggle = document.getElementById('soundToggle');
if (soundToggle) {
  soundToggle.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    soundToggle.style.opacity = sfx.enabled ? '1' : '0.5';
    if (sfx.enabled) {
      sfx.click();
      showToast('8-Bit SFX Enabled 🔊');
    } else {
      showToast('8-Bit SFX Muted 🔇');
    }
  });
}

// --- Modals Controller (Gallery, Contact & Snake Game) ---
const galleryModal = document.getElementById('galleryModal');
const contactModal = document.getElementById('contactModal');
const snakeModal = document.getElementById('snakeModal');

const navHomeBtn = document.getElementById('navHomeBtn');
const navGalleryBtn = document.getElementById('navGalleryBtn');
const navContactBtn = document.getElementById('navContactBtn');
const navSnakeBtn = document.getElementById('navSnakeBtn');
const sidebarTagLink = document.getElementById('sidebarTagLink');

const closeGalleryBtn = document.getElementById('closeGalleryBtn');
const closeContactBtn = document.getElementById('closeContactBtn');
const closeSnakeBtn = document.getElementById('closeSnakeBtn');

const contactBackdrop = document.getElementById('contactBackdrop');
const snakeBackdrop = document.getElementById('snakeBackdrop');

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  sfx.open();
  document.body.style.overflow = 'hidden';
  if (modal === galleryModal) {
    startGalleryVideos();
  }
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  sfx.close();
  document.body.style.overflow = '';
  if (modal === snakeModal && snakeGame) {
    snakeGame.pause();
  }
}

function closeAllModals() {
  closeModal(galleryModal);
  closeModal(contactModal);
  closeModal(snakeModal);
}

// Navigation click events
if (navHomeBtn) {
  navHomeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sfx.click();
    closeAllModals();
    navHomeBtn.classList.add('active');
    navGalleryBtn?.classList.remove('active');
    navContactBtn?.classList.remove('active');
    navSnakeBtn?.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (navGalleryBtn) {
  navGalleryBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(contactModal);
    closeModal(snakeModal);
    openModal(galleryModal);
  });
}

if (sidebarTagLink) {
  sidebarTagLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(galleryModal);
  });
}

if (navContactBtn) {
  navContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(galleryModal);
    closeModal(snakeModal);
    openModal(contactModal);
  });
}

if (navSnakeBtn) {
  navSnakeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(galleryModal);
    closeModal(contactModal);
    openModal(snakeModal);
    if (snakeGame && !snakeGame.running) {
      snakeGame.drawInitial();
    }
  });
}

// Close buttons
closeGalleryBtn?.addEventListener('click', () => closeModal(galleryModal));
closeContactBtn?.addEventListener('click', () => closeModal(contactModal));
closeSnakeBtn?.addEventListener('click', () => closeModal(snakeModal));

contactBackdrop?.addEventListener('click', () => closeModal(contactModal));
snakeBackdrop?.addEventListener('click', () => closeModal(snakeModal));

// Ensure auto-playing gallery videos play smoothly
function startGalleryVideos() {
  const videos = document.querySelectorAll('.pin-video');
  videos.forEach(v => {
    v.muted = true;
    v.play().catch(() => {});
  });
}

// Keyboard ESC to close
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

// --- Copy to Clipboard Buttons ---
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const textToCopy = btn.getAttribute('data-copy');
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}"!`);
      }).catch(() => {
        showToast('Copied to clipboard!');
      });
    }
  });
});

// --- Hover SFX for Badges & Interactive items ---
document.querySelectorAll('.pixel-badge, .nav-link, .icon-btn, .sidebar-project-item, .sidebar-tag, .copy-btn, .dpad-btn').forEach(item => {
  item.addEventListener('mouseenter', () => {
    sfx.hover();
  });
});

// --- Tech Badge Click Interactions ---
document.querySelectorAll('.pixel-badge').forEach(badge => {
  badge.addEventListener('click', () => {
    sfx.click();
    const techName = badge.getAttribute('data-tech');
    showToast(`Skill selected: ${techName}`);
  });
});

// Mini terminal dynamic command output
const termOutput = document.getElementById('termOutput');
if (termOutput) {
  termOutput.addEventListener('click', () => {
    sfx.click();
    const commands = [
      '> AI + Economics Ready.',
      '> Loading ML weights... [OK]',
      '> Status: Analyzing data...',
      '> Coffee Level: 100% ☕',
      '> Model accuracy: 98.4%',
      '> Algeria AI Dev: Mohamed Akram'
    ];
    const randomMsg = commands[Math.floor(Math.random() * commands.length)];
    termOutput.innerHTML = `<span class="prompt">$</span> status --active<br><span class="term-green">${randomMsg}</span>`;
  });
}

// ==========================================================================
// 8-BIT RETRO SNAKE GAME ENGINE
// ==========================================================================
class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('snakeCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.gridSize = 18; // 18x18 grid
    this.cellSize = this.canvas.width / this.gridSize; // 20px per cell

    this.scoreEl = document.getElementById('snakeScore');
    this.highScoreEl = document.getElementById('snakeHighScore');
    this.overlay = document.getElementById('snakeOverlay');
    this.overlayTitle = document.getElementById('overlayTitle');
    this.overlaySub = document.getElementById('overlaySub');
    this.startBtn = document.getElementById('snakeStartBtn');
    this.restartBtn = document.getElementById('snakeRestartBtn');

    this.highScore = parseInt(localStorage.getItem('akram_snake_highscore') || '0', 10);
    if (this.highScoreEl) this.highScoreEl.textContent = this.highScore;

    this.snake = [];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.food = { x: 5, y: 5 };
    this.coffee = null; // Bonus coffee item
    this.score = 0;
    this.running = false;
    this.gameLoopId = null;
    this.speedMs = 120;
    this.lastTick = 0;

    this.bindEvents();
    this.drawInitial();
  }

  bindEvents() {
    this.startBtn?.addEventListener('click', () => {
      sfx.click();
      this.start();
    });

    this.restartBtn?.addEventListener('click', () => {
      sfx.click();
      this.start();
    });

    // Keyboard controller
    window.addEventListener('keydown', (e) => {
      if (!snakeModal || !snakeModal.classList.contains('open')) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (this.dir.y === 0) this.nextDir = { x: 0, y: -1 };
          e.preventDefault();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (this.dir.y === 0) this.nextDir = { x: 0, y: 1 };
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (this.dir.x === 0) this.nextDir = { x: -1, y: 0 };
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (this.dir.x === 0) this.nextDir = { x: 1, y: 0 };
          e.preventDefault();
          break;
        case ' ':
          if (!this.running) this.start();
          e.preventDefault();
          break;
      }
    });

    // Touch D-Pad buttons
    document.getElementById('dpadUp')?.addEventListener('click', () => {
      if (this.dir.y === 0) this.nextDir = { x: 0, y: -1 };
      sfx.hover();
    });
    document.getElementById('dpadDown')?.addEventListener('click', () => {
      if (this.dir.y === 0) this.nextDir = { x: 0, y: 1 };
      sfx.hover();
    });
    document.getElementById('dpadLeft')?.addEventListener('click', () => {
      if (this.dir.x === 0) this.nextDir = { x: -1, y: 0 };
      sfx.hover();
    });
    document.getElementById('dpadRight')?.addEventListener('click', () => {
      if (this.dir.x === 0) this.nextDir = { x: 1, y: 0 };
      sfx.hover();
    });
  }

  start() {
    this.snake = [
      { x: 5, y: 9 },
      { x: 4, y: 9 },
      { x: 3, y: 9 }
    ];
    this.dir = { x: 1, y: 0 };
    this.nextDir = { x: 1, y: 0 };
    this.score = 0;
    this.speedMs = 120;
    this.coffee = null;
    this.updateScore();
    this.spawnFood();

    this.running = true;
    this.overlay?.classList.add('hidden');

    if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
    this.lastTick = performance.now();
    this.loop = this.loop.bind(this);
    this.gameLoopId = requestAnimationFrame(this.loop);
  }

  pause() {
    this.running = false;
    if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
    this.overlay?.classList.remove('hidden');
    if (this.overlayTitle) this.overlayTitle.textContent = 'GAME PAUSED';
    if (this.overlaySub) this.overlaySub.textContent = 'Click to Resume';
    if (this.startBtn) this.startBtn.textContent = '▶ RESUME';
  }

  gameOver() {
    this.running = false;
    if (this.gameLoopId) cancelAnimationFrame(this.gameLoopId);
    sfx.die();

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('akram_snake_highscore', this.highScore.toString());
      if (this.highScoreEl) this.highScoreEl.textContent = this.highScore;
      showToast(`🏆 NEW HIGH SCORE: ${this.highScore}!`);
    }

    this.overlay?.classList.remove('hidden');
    if (this.overlayTitle) this.overlayTitle.textContent = 'GAME OVER';
    if (this.overlaySub) this.overlaySub.textContent = `Final Score: ${this.score}`;
    if (this.startBtn) this.startBtn.textContent = '↺ PLAY AGAIN';
  }

  spawnFood() {
    let valid = false;
    while (!valid) {
      this.food = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize)
      };
      valid = !this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y);
    }

    // 25% chance to spawn golden coffee bonus
    if (Math.random() < 0.25 && !this.coffee) {
      this.coffee = {
        x: Math.floor(Math.random() * this.gridSize),
        y: Math.floor(Math.random() * this.gridSize),
        timer: 35 // disappear after 35 ticks
      };
    }
  }

  updateScore() {
    if (this.scoreEl) this.scoreEl.textContent = this.score;
  }

  loop(timestamp) {
    if (!this.running) return;

    const delta = timestamp - this.lastTick;
    if (delta >= this.speedMs) {
      this.lastTick = timestamp;
      this.update();
    }

    this.render();
    if (this.running) {
      this.gameLoopId = requestAnimationFrame(this.loop);
    }
  }

  update() {
    this.dir = { ...this.nextDir };
    const head = {
      x: this.snake[0].x + this.dir.x,
      y: this.snake[0].y + this.dir.y
    };

    // Wall Collision
    if (head.x < 0 || head.x >= this.gridSize || head.y < 0 || head.y >= this.gridSize) {
      this.gameOver();
      return;
    }

    // Self Collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }

    this.snake.unshift(head);

    // Eat Normal Food
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.updateScore();
      sfx.eat();
      this.spawnFood();
      // Increase speed gradually
      if (this.speedMs > 70) this.speedMs -= 2;
    } 
    // Eat Coffee Bonus
    else if (this.coffee && head.x === this.coffee.x && head.y === this.coffee.y) {
      this.score += 30;
      this.updateScore();
      sfx.bonus();
      this.coffee = null;
      showToast('☕ Coffee Boost! +30 PTS');
    } else {
      this.snake.pop();
    }

    // Tick coffee bonus timer
    if (this.coffee) {
      this.coffee.timer--;
      if (this.coffee.timer <= 0) {
        this.coffee = null;
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const size = this.cellSize;

    // Clear Screen (Dark Retro Terminal Blue)
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Subtle Grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < this.gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, this.canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(this.canvas.width, i * size);
      ctx.stroke();
    }

    // Render Food (Red Apple with pixel leaf)
    ctx.fillStyle = '#ff4d4f';
    ctx.fillRect(this.food.x * size + 2, this.food.y * size + 2, size - 4, size - 4);
    // Leaf
    ctx.fillStyle = '#52c41a';
    ctx.fillRect(this.food.x * size + size / 2, this.food.y * size, 4, 3);

    // Render Coffee Bonus
    if (this.coffee) {
      ctx.fillStyle = '#ffd43b';
      ctx.fillRect(this.coffee.x * size + 2, this.coffee.y * size + 2, size - 4, size - 4);
      // Steam
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(this.coffee.x * size + size / 2 - 2, this.coffee.y * size - 1, 4, 3);
    }

    // Render Snake
    this.snake.forEach((segment, index) => {
      if (index === 0) {
        // Head (Bright Lime Green with Eyes)
        ctx.fillStyle = '#73d13d';
        ctx.fillRect(segment.x * size + 1, segment.y * size + 1, size - 2, size - 2);

        // Eyes
        ctx.fillStyle = '#000';
        if (this.dir.x === 1) { // right
          ctx.fillRect(segment.x * size + size - 6, segment.y * size + 4, 3, 3);
          ctx.fillRect(segment.x * size + size - 6, segment.y * size + size - 7, 3, 3);
        } else if (this.dir.x === -1) { // left
          ctx.fillRect(segment.x * size + 3, segment.y * size + 4, 3, 3);
          ctx.fillRect(segment.x * size + 3, segment.y * size + size - 7, 3, 3);
        } else if (this.dir.y === -1) { // up
          ctx.fillRect(segment.x * size + 4, segment.y * size + 3, 3, 3);
          ctx.fillRect(segment.x * size + size - 7, segment.y * size + 3, 3, 3);
        } else { // down
          ctx.fillRect(segment.x * size + 4, segment.y * size + size - 6, 3, 3);
          ctx.fillRect(segment.x * size + size - 7, segment.y * size + size - 6, 3, 3);
        }
      } else {
        // Body (Emerald Green with Pixel Texture)
        ctx.fillStyle = index % 2 === 0 ? '#52c41a' : '#389e0d';
        ctx.fillRect(segment.x * size + 2, segment.y * size + 2, size - 4, size - 4);
      }
    });
  }

  drawInitial() {
    this.render();
  }
}

// ==========================================================================
// RETRO FLIP MUSIC PLAYER CONTROLLER
// ==========================================================================

const PLAYLIST_TRACKS = [
  { id: 1, title: '7AM (Slowed + Reverb)', artist: 'Lofi Aesthetic', file: 'music/7AM (Slowed + Reverb).mp3', cover: 'music/covers/7am.png' },
  { id: 2, title: 'ISVVC - COOL WIT THE PIMP', artist: 'ISVVC', file: 'music/ISVVC - COOL WIT THE PIMP.mp3', cover: 'music/covers/isvvc.png' },
  { id: 3, title: 'MOOD - I RUN WITH TROUBLE', artist: 'MOOD', file: 'music/MOOD - I RUN WITH TROUBLE.mp3', cover: 'music/covers/mood.png' },
  { id: 4, title: 'Midnight Club', artist: 'Synthwave Night', file: 'music/Midnight Club.mp3', cover: 'music/covers/midnight.png' },
  { id: 5, title: 'Palace (Slowed + Reverb)', artist: 'Chill Wave', file: 'music/Palace (Slowed + Reverb).mp3', cover: 'music/covers/palace.png' },
  { id: 6, title: "Sittin' Sideways", artist: 'Phonk Classics', file: "music/Sittin' Sideways.mp3", cover: 'music/covers/sittin.png' },
  { id: 7, title: 'Tek It', artist: 'Cafuné', file: 'music/Tek It.mp3', cover: 'music/covers/tekit.png' }
];

class RetroFlipMusicPlayer {
  constructor() {
    this.container = document.getElementById('flipMusicContainer');
    this.toggleBtn = document.getElementById('flipMusicToggle');
    this.drawer = document.getElementById('flipMusicDrawer');
    this.closeBtn = document.getElementById('musicCloseBtn');
    this.collapseBtn = document.getElementById('drawerCollapseBtn');
    this.audio = document.getElementById('mainAudioPlayer');

    this.playBtn = document.getElementById('musicPlayBtn');
    this.playIcon = document.getElementById('musicPlayIcon');
    this.pauseIcon = document.getElementById('musicPauseIcon');
    this.prevBtn = document.getElementById('musicPrevBtn');
    this.nextBtn = document.getElementById('musicNextBtn');

    this.shuffleBtn = document.getElementById('musicShuffleBtn');
    this.loopBtn = document.getElementById('musicLoopBtn');

    this.statusText = document.getElementById('musicStatusText');
    this.statusDot = document.getElementById('musicStatusDot');

    this.titleEl = document.getElementById('nowPlayingTitle');
    this.artistEl = document.getElementById('nowPlayingArtist');
    this.openTabBtn = document.getElementById('musicOpenTabBtn');
    this.backToPlayerBtn = document.getElementById('musicBackToPlayerBtn');

    this.currentTimeEl = document.getElementById('musicCurrentTime');
    this.totalDurationEl = document.getElementById('musicTotalDuration');

    this.songCoverArt = document.getElementById('songCoverArt');

    this.progressTrack = document.getElementById('musicProgressTrack');
    this.progressFill = document.getElementById('musicProgressFill');
    this.volTrack = document.getElementById('pixelVolTrack');
    this.volBars = document.querySelectorAll('#pixelVolMeter .p-bar');
    this.volLabel = document.getElementById('musicVolLabel');
    this.muteBtn = document.getElementById('musicMuteBtn');
    this.volIcon = document.getElementById('musicVolIcon');

    this.playlistContainer = document.getElementById('playlistItems');

    this.currentIndex = 0;
    this.isPlaying = false;
    this.isShuffle = false;
    this.isLoop = false;
    this.isMuted = false;
    this.previousVolume = 0.8;
    this.isOpen = false;

    if (!this.container || !this.audio) return;

    this.init();
  }

  init() {
    this.renderPlaylist();
    this.loadTrack(0, false);

    // Initial Volume setup
    const savedVol = localStorage.getItem('retro_music_volume');
    const initVol = savedVol !== null ? parseFloat(savedVol) : 0.8;
    this.setVolume(initVol);

    // Toggle Drawer Open / Close
    this.toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDrawer();
    });

    if (this.collapseBtn) {
      this.collapseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeDrawer();
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeDrawer();
      });
    }

    // Swipe to Playlist View (left swipe) when clicking "Open Music Tab →"
    if (this.openTabBtn) {
      this.openTabBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.retroSfx?.open();
        this.drawer.classList.add('show-playlist');
      });
    }

    // Swipe back to Main Player View when clicking "← Back to Player"
    if (this.backToPlayerBtn) {
      this.backToPlayerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.retroSfx?.close();
        this.drawer.classList.remove('show-playlist');
      });
    }

    // Close on outside click if clicked outside container
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.container.contains(e.target)) {
        this.closeDrawer();
      }
    });

    // Audio Playback Controls
    this.playBtn.addEventListener('click', () => {
      window.retroSfx?.click();
      this.togglePlay();
    });

    this.prevBtn.addEventListener('click', () => {
      window.retroSfx?.click();
      this.prevTrack();
    });

    this.nextBtn.addEventListener('click', () => {
      window.retroSfx?.click();
      this.nextTrack();
    });

    // Shuffle & Loop toggles
    this.shuffleBtn.addEventListener('click', () => {
      window.retroSfx?.click();
      this.isShuffle = !this.isShuffle;
      this.shuffleBtn.classList.toggle('active', this.isShuffle);
      this.showToast(this.isShuffle ? '🔀 Shuffle On' : '➡️ Sequential Order');
    });

    this.loopBtn.addEventListener('click', () => {
      window.retroSfx?.click();
      this.isLoop = !this.isLoop;
      this.loopBtn.classList.toggle('active', this.isLoop);
      this.audio.loop = this.isLoop;
      this.showToast(this.isLoop ? '🔁 Repeat Track On' : '➡️ Repeat Off');
    });

    // Pixel Segmented Volume Bar Click & Drag
    if (this.volBars) {
      this.volBars.forEach((bar) => {
        bar.addEventListener('click', (e) => {
          e.stopPropagation();
          window.retroSfx?.click();
          const val = parseFloat(bar.getAttribute('data-val'));
          this.setVolume(val);
        });
      });
    }

    if (this.volTrack) {
      let isVolDragging = false;
      const volHandler = (e) => {
        const rect = this.volTrack.getBoundingClientRect();
        const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const stepped = Math.round(percentage * 10) / 10;
        this.setVolume(stepped);
      };

      this.volTrack.addEventListener('mousedown', (e) => {
        isVolDragging = true;
        volHandler(e);
      });

      window.addEventListener('mousemove', (e) => {
        if (isVolDragging) volHandler(e);
      });

      window.addEventListener('mouseup', () => {
        isVolDragging = false;
      });
    }

    this.muteBtn.addEventListener('click', () => {
      window.retroSfx?.click();
      this.toggleMute();
    });

    // Progress Bar Seeking
    let isDragging = false;
    const seekHandler = (e) => {
      const rect = this.progressTrack.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = clickX / rect.width;
      if (this.audio.duration) {
        this.audio.currentTime = percentage * this.audio.duration;
        this.updateProgress();
      }
    };

    this.progressTrack.addEventListener('click', (e) => {
      seekHandler(e);
    });

    this.progressTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      seekHandler(e);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) seekHandler(e);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Audio Element Event Listeners
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateProgress());
    this.audio.addEventListener('ended', () => this.onTrackEnded());
    this.audio.addEventListener('play', () => this.onPlayStateChange(true));
    this.audio.addEventListener('pause', () => this.onPlayStateChange(false));

    // Keyboard shortcut (Press 'M' to toggle drawer)
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'm' || e.key === 'M') {
        this.toggleDrawer();
      } else if (e.key === ' ' && this.isOpen) {
        e.preventDefault();
        this.togglePlay();
      }
    });
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    this.container.classList.toggle('is-open', this.isOpen);
    this.toggleBtn.setAttribute('aria-expanded', this.isOpen.toString());
    if (this.isOpen) {
      window.retroSfx?.open();
    } else {
      window.retroSfx?.close();
    }
  }

  closeDrawer() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.classList.remove('is-open');
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.drawer.classList.remove('show-playlist');
    window.retroSfx?.close();
  }

  renderPlaylist() {
    this.playlistContainer.innerHTML = '';
    PLAYLIST_TRACKS.forEach((track, index) => {
      const item = document.createElement('div');
      item.className = `track-item ${index === this.currentIndex ? 'active' : ''}`;
      item.setAttribute('data-index', index);
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <img src="${track.cover}" alt="${track.title} cover" class="track-thumb-img">
        <span class="track-num">0${track.id}</span>
        <div class="track-info">
          <div class="track-title">${track.title}</div>
        </div>
        <span class="track-status-icon">${index === this.currentIndex && this.isPlaying ? '▶' : '♫'}</span>
      `;

      item.addEventListener('mouseenter', () => window.retroSfx?.hover());
      item.addEventListener('click', () => {
        window.retroSfx?.click();
        this.loadTrack(index, true);
        // Swipes smoothly back to main view to see playing track
        this.drawer.classList.remove('show-playlist');
      });

      this.playlistContainer.appendChild(item);
    });
  }

  loadTrack(index, autoPlay = true) {
    if (index < 0) index = PLAYLIST_TRACKS.length - 1;
    if (index >= PLAYLIST_TRACKS.length) index = 0;

    this.currentIndex = index;
    const track = PLAYLIST_TRACKS[this.currentIndex];

    // Update Cover Art Image in Player Window
    if (this.songCoverArt) {
      this.songCoverArt.src = track.cover;
      this.songCoverArt.alt = `${track.title} Album Cover`;
    }

    // Encode file path safely for browser URL loading
    this.audio.src = encodeURI(track.file);
    this.titleEl.textContent = track.title;
    this.artistEl.textContent = track.artist;

    // Update active playlist item
    const items = this.playlistContainer.querySelectorAll('.track-item');
    items.forEach((item, idx) => {
      const isActive = idx === this.currentIndex;
      item.classList.toggle('active', isActive);
      const icon = item.querySelector('.track-status-icon');
      if (icon) {
        icon.textContent = isActive && this.isPlaying ? '▶' : '♫';
      }
    });

    if (autoPlay) {
      this.play();
    }
  }

  play() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.onPlayStateChange(true);
      }).catch(err => {
        console.warn('Audio playback prevented:', err);
      });
    }
  }

  pause() {
    this.audio.pause();
    this.onPlayStateChange(false);
  }

  togglePlay() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  prevTrack() {
    if (this.isShuffle) {
      this.loadTrack(this.getRandomIndex(), true);
    } else {
      this.loadTrack(this.currentIndex - 1, true);
    }
  }

  nextTrack() {
    if (this.isShuffle) {
      this.loadTrack(this.getRandomIndex(), true);
    } else {
      this.loadTrack(this.currentIndex + 1, true);
    }
  }

  getRandomIndex() {
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * PLAYLIST_TRACKS.length);
    } while (nextIdx === this.currentIndex && PLAYLIST_TRACKS.length > 1);
    return nextIdx;
  }

  onTrackEnded() {
    if (!this.isLoop) {
      this.nextTrack();
    }
  }

  onPlayStateChange(playing) {
    this.isPlaying = playing;
    this.container.classList.toggle('is-playing', playing);

    if (this.statusText) {
      this.statusText.textContent = playing ? 'PLAYING' : 'PAUSED';
    }

    if (playing) {
      this.playIcon.style.display = 'none';
      this.pauseIcon.style.display = 'block';
    } else {
      this.playIcon.style.display = 'block';
      this.pauseIcon.style.display = 'none';
    }

    // Update active playlist status icon
    const activeItem = this.playlistContainer.querySelector(`.track-item[data-index="${this.currentIndex}"]`);
    if (activeItem) {
      const icon = activeItem.querySelector('.track-status-icon');
      if (icon) icon.textContent = playing ? '▶' : '♫';
    }
  }

  updateProgress() {
    const current = this.audio.currentTime || 0;
    const duration = this.audio.duration || 0;

    this.currentTimeEl.textContent = this.formatTime(current);
    this.totalDurationEl.textContent = this.formatTime(duration);

    if (duration > 0) {
      const percentage = (current / duration) * 100;
      this.progressFill.style.width = `${percentage}%`;
    } else {
      this.progressFill.style.width = '0%';
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  setVolume(val) {
    val = Math.max(0, Math.min(1, val));
    this.audio.volume = val;
    this.volLabel.textContent = `${Math.round(val * 100)}%`;
    this.isMuted = val === 0;

    // Update pixel bars active status
    if (this.volBars) {
      this.volBars.forEach((bar) => {
        const barVal = parseFloat(bar.getAttribute('data-val'));
        bar.classList.toggle('active', barVal <= val + 0.05);
      });
    }

    if (val > 0) {
      this.previousVolume = val;
    }

    localStorage.setItem('retro_music_volume', val.toString());
  }

  toggleMute() {
    if (this.isMuted) {
      this.setVolume(this.previousVolume || 0.8);
    } else {
      this.previousVolume = this.audio.volume || 0.8;
      this.setVolume(0);
    }
  }


  showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }
}

let snakeGame = null;
let flipMusicPlayer = null;

window.addEventListener('DOMContentLoaded', () => {
  snakeGame = new SnakeGame();
  flipMusicPlayer = new RetroFlipMusicPlayer();
});

console.log('🎮 Mohamed Akram Portfolio Loaded Successfully. Snake Game & Retro Flip Music Ready.');


