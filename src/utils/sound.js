// Subtle tactile analog shutter sound synthesized using Web Audio API
// No external mp3 files required, instantly ready, zero network overhead.

let audioCtx = null;
let soundEnabled = false;

// Initialize sound state from localStorage if available
try {
  const saved = localStorage.getItem('ak_portfolio_sound');
  soundEnabled = saved === 'true';
} catch (e) {
  soundEnabled = false;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
  try {
    localStorage.setItem('ak_portfolio_sound', String(enabled));
  } catch (e) {}
  if (soundEnabled && !audioCtx) {
    initAudio();
  }
}

function initAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (e) {
    console.warn('Web Audio API not supported or blocked:', e);
  }
}

/**
 * Plays a soft, tactile mechanical Leica M shutter click
 */
export function playShutterSound() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  // Curtain 1 (Initial mechanical release click)
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  const filter1 = audioCtx.createBiquadFilter();

  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(140, now);
  osc1.frequency.exponentialRampToValueAtTime(40, now + 0.035);

  filter1.type = 'lowpass';
  filter1.frequency.setValueAtTime(1800, now);

  gain1.gain.setValueAtTime(0.12, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  osc1.connect(filter1);
  filter1.connect(gain1);
  gain1.connect(audioCtx.destination);

  osc1.start(now);
  osc1.stop(now + 0.04);

  // Curtain 2 (Mechanical second shutter curtain snap - 45ms later)
  const snapTime = now + 0.045;
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();

  osc2.type = 'square';
  osc2.frequency.setValueAtTime(420, snapTime);
  osc2.frequency.exponentialRampToValueAtTime(80, snapTime + 0.03);

  gain2.gain.setValueAtTime(0.08, snapTime);
  gain2.gain.exponentialRampToValueAtTime(0.001, snapTime + 0.03);

  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);

  osc2.start(snapTime);
  osc2.stop(snapTime + 0.035);
}

/**
 * Light tactile focus click for navigation / buttons
 */
export function playFocusClick() {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.015);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.02);
}
