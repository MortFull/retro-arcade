// sound.js
// Centralized sound manager for IvoCade

// Preload sounds (reuse existing files where needed)
const sounds = {
  hover:     new Audio('sounds/hover.wav'),
  select:    new Audio('sounds/select.wav'),
  back:      new Audio('sounds/back.wav'),
  toggle:    new Audio('sounds/toggle.wav'),
  score:     new Audio('sounds/score.wav'),
  gameOver:  new Audio('sounds/gameover.wav'),
  levelUp:   new Audio('sounds/levelup.wav'),
  hit:       new Audio('sounds/hit.wav'),
  start:     new Audio('sounds/start.wav'),
  restart:   new Audio('sounds/restart.wav'),
  jump:      new Audio('sounds/jump.wav'),
  enemy:     new Audio('sounds/enemy.wav')
};

// Ensure all sounds preload
Object.values(sounds).forEach(s => {
  s.preload = 'auto';
  s.volume = 0.8; // default volume
});

// Global sound toggle + volume
let soundEnabled = true;
let globalVolume = 0.8;

// Core play function
function playSound(name) {
  const audio = sounds[name];
  if (soundEnabled && audio) {
    audio.currentTime = 0; // reset to start
    audio.volume = globalVolume;
    audio.play().catch(err => {
      console.warn(`Sound ${name} failed:`, err);
    });
  }
}

// Toggle sound on/off
function toggleSound() {
  soundEnabled = !soundEnabled;
  playSound('toggle');
  return soundEnabled;
}

// Adjust global volume (0.0–1.0)
function setVolume(v) {
  globalVolume = Math.max(0, Math.min(1, v));
}

// Hub UI events
function attachHubSounds() {
  document.querySelectorAll('.game-link').forEach(btn => {
    btn.addEventListener('mouseenter', () => playSound('hover'));
    btn.addEventListener('click', () => {
      playSound('select');
      window.location.href = btn.dataset.game;
    });
  });

  const backBtn = document.querySelector('.back-btn');
  if (backBtn) backBtn.addEventListener('click', () => {
    playSound('back');
    window.history.back();
  });

  const restartBtn = document.querySelector('.restart-btn');
  if (restartBtn) restartBtn.addEventListener('click', () => {
    playSound('restart');
    window.location.reload();
  });

  const soundToggleBtn = document.querySelector('.sound-toggle');
  if (soundToggleBtn) soundToggleBtn.addEventListener('click', () => {
    const enabled = toggleSound();
    soundToggleBtn.classList.toggle('off', !enabled);
  });
}

// Auto‑attach hub sounds
document.addEventListener('DOMContentLoaded', attachHubSounds);

// =============================
// 🎮 In‑Game Sound Hooks
// =============================
function playScore()    { playSound('score'); }
function playGameOver() { playSound('gameOver'); }
function playLevelUp()  { playSound('levelUp'); }
function playHit()      { playSound('hit'); }
function playStart()    { playSound('start'); }
function playJump()     { playSound('jump'); }
function playEnemy()    { playSound('enemy'); }