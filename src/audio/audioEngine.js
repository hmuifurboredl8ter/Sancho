// Web Audio API Synthesizer and Drum Engine for Build While Bleeding Studio
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.filterNode = null;
    this.filterFreq = 8000;
    this.pitchShift = 1.0;
    this.decayFactor = 1.0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      // Master output chain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(this.filterFreq, this.ctx.currentTime);

      this.masterGain.connect(this.filterNode);
      this.filterNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMasterVolume(val) {
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.05);
    }
  }

  setFilter(freq) {
    this.filterFreq = freq;
    if (this.filterNode) {
      this.filterNode.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
    }
  }

  setPitch(factor) {
    this.pitchShift = factor;
  }

  setDecay(factor) {
    this.decayFactor = factor;
  }

  // 1. Heavy Kick (Deep sine sweep + punch transient)
  playKick(time = 0) {
    this.init();
    const t = time || this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 150 * this.pitchShift;
    const endFreq = 42 * this.pitchShift;
    const decay = 0.35 * this.decayFactor;

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.08);

    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + decay);
  }

  // 2. Snare / Rimshot (Noise burst + tonal snap)
  playSnare(time = 0) {
    this.init();
    const t = time || this.ctx.currentTime;
    const decay = 0.22 * this.decayFactor;

    // Noise buffer
    const bufferSize = this.ctx.sampleRate * decay;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200 * this.pitchShift, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, t + decay);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Body tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.frequency.setValueAtTime(240 * this.pitchShift, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.08);
    oscGain.gain.setValueAtTime(0.6, t);
    oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    whiteNoise.start(t);
    osc.start(t);
    whiteNoise.stop(t + decay);
    osc.stop(t + decay);
  }

  // 3. Crisp Hi-Hat (Band-passed metallic noise)
  playHihat(time = 0, open = false) {
    this.init();
    const t = time || this.ctx.currentTime;
    const decay = (open ? 0.35 : 0.06) * this.decayFactor;

    const bufferSize = this.ctx.sampleRate * decay;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(9500 * this.pitchShift, t);
    filter.Q.setValueAtTime(2.5, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + decay);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(t);
    source.stop(t + decay);
  }

  // 4. Sub / Perc Tone (Analog square/sine metallic bump)
  playPerc(time = 0) {
    this.init();
    const t = time || this.ctx.currentTime;
    const decay = 0.28 * this.decayFactor;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320 * this.pitchShift, t);
    osc.frequency.exponentialRampToValueAtTime(65 * this.pitchShift, t + decay);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + decay);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + decay);
  }

  playVoice(voiceIndex) {
    switch (voiceIndex) {
      case 0:
        this.playKick();
        break;
      case 1:
        this.playSnare();
        break;
      case 2:
        this.playHihat();
        break;
      case 3:
        this.playPerc();
        break;
      default:
        break;
    }
  }
}

export const audioEngine = new AudioEngine();
