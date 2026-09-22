const TONE_CONFIG: Record<string, { frequency: number; dur: number; wave: OscillatorType; volume?: number }> = {
  terminal_click: { frequency: 800, dur: 0.08, wave: 'square', volume: 0.2 },
  cork_push:      { frequency: 300, dur: 0.06, wave: 'triangle', volume: 0.4 },
  click:          { frequency: 1000, dur: 0.04, wave: 'square', volume: 0.2 },
}

function generateToneWavUrl(frequency: number, duration: number, type: OscillatorType = 'square'): string {
  const sampleRate = 44100;
  const length = sampleRate * duration;
  const buffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(buffer);
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * 2, true);
  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const envelope = Math.max(0, 1 - t / duration);
    let sample: number;
    if (type === 'square') {
      sample = Math.sign(Math.sin(2 * Math.PI * frequency * t)) * envelope * 0.3;
    } else if (type === 'sawtooth') {
      sample = (2 * (frequency * t - Math.floor(frequency * t + 0.5))) * envelope * 0.3;
    } else {
      sample = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
      if (type === 'triangle') {
        sample = (2 * Math.abs(2 * (frequency * t - Math.floor(frequency * t + 0.5))) - 1) * envelope * 0.3;
      }
    }
    view.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, Math.floor(sample * 32767))), true);
  }
  const blob = new Blob([buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

const toneUrlCache: Record<string, string> = {};

function playSingleTone(toneKey: string, customVolume?: number) {
  if (!toneUrlCache[toneKey]) {
    const cfg = TONE_CONFIG[toneKey] ?? { frequency: 600, dur: 0.1, wave: 'square' as OscillatorType };
    toneUrlCache[toneKey] = generateToneWavUrl(cfg.frequency, cfg.dur, cfg.wave);
  }
  const cfg = TONE_CONFIG[toneKey] ?? { frequency: 600, dur: 0.1, wave: 'square' as OscillatorType, volume: 0.4 };
  const audio = new Audio(toneUrlCache[toneKey]);
  audio.volume = customVolume ?? cfg.volume ?? 0.4;
  audio.play().catch(() => {});
}

export function playTone(toneKey: string) {
  if (typeof window === 'undefined') return;

  playSingleTone(toneKey);
}