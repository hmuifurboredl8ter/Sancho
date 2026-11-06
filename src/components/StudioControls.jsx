import React, { useState, useEffect, useRef } from 'react';
import { audioEngine } from '../audio/audioEngine';
import { Play, Square, Circle, Plus, Minus, Volume2, Sliders, RefreshCw } from 'lucide-react';

export const StudioControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [bpm, setBpm] = useState(92);
  const [activeStep, setActiveStep] = useState(0);

  // 4 Voices x 16 Steps
  // 0: Kick, 1: Snare, 2: Hi-Hat, 3: Perc/Sub
  const [grid, setGrid] = useState([
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick (on beat)
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare (2 and 4)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Hi-Hat (straight 16ths)
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0], // Perc syncopated
  ]);

  // Channel strips state
  const [channels, setChannels] = useState([
    { name: "KICK", muted: false, solo: false, fader: 85, level: 0 },
    { name: "SNARE", muted: false, solo: false, fader: 80, level: 0 },
    { name: "H-HAT", muted: false, solo: false, fader: 70, level: 0 },
    { name: "PERC", muted: false, solo: false, fader: 75, level: 0 }
  ]);

  // Hardware Rotary Knobs
  const [filterCutoff, setFilterCutoff] = useState(8000); // 400 - 16000 Hz
  const [pitchShift, setPitchShift] = useState(1.0);     // 0.5 - 2.0
  const [decayTime, setDecayTime] = useState(1.0);       // 0.4 - 2.5
  const [driveLevel, setDriveLevel] = useState(40);      // 0 - 100%

  // Tap tempo state
  const tapTimes = useRef([]);

  // Loop timer reference
  const timerRef = useRef(null);
  const currentStepRef = useRef(0);

  // Active step synchronization
  useEffect(() => {
    currentStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    if (isPlaying) {
      const stepDurationMs = (60 / bpm / 4) * 1000;
      timerRef.current = setInterval(() => {
        const nextStep = (currentStepRef.current + 1) % 16;
        currentStepRef.current = nextStep;
        setActiveStep(nextStep);

        // Trigger sounds for active voices
        const hasSolo = channels.some(c => c.solo);
        grid.forEach((row, voiceIdx) => {
          const ch = channels[voiceIdx];
          const shouldPlay = hasSolo ? ch.solo : !ch.muted;
          if (row[nextStep] && shouldPlay) {
            audioEngine.playVoice(voiceIdx);
            // Flash level meter
            setChannels(prev => {
              const copy = [...prev];
              copy[voiceIdx] = { ...copy[voiceIdx], level: Math.floor(Math.random() * 25 + 75) };
              return copy;
            });
          }
        });

        // Decay meters
        setChannels(prev => prev.map(c => ({ ...c, level: Math.max(0, c.level - 20) })));
      }, stepDurationMs);
    } else {
      clearInterval(timerRef.current);
      setChannels(prev => prev.map(c => ({ ...c, level: 0 })));
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, bpm, grid, channels]);

  const toggleStep = (voiceIdx, stepIdx) => {
    audioEngine.init();
    setGrid(prev => {
      const copy = prev.map(row => [...row]);
      copy[voiceIdx][stepIdx] = copy[voiceIdx][stepIdx] ? 0 : 1;
      return copy;
    });
    if (!grid[voiceIdx][stepIdx]) {
      audioEngine.playVoice(voiceIdx);
    }
  };

  const handleTapTempo = () => {
    const now = performance.now();
    tapTimes.current.push(now);
    if (tapTimes.current.length > 4) {
      tapTimes.current.shift();
    }
    if (tapTimes.current.length >= 2) {
      const diffs = [];
      for (let i = 1; i < tapTimes.current.length; i++) {
        diffs.push(tapTimes.current[i] - tapTimes.current[i - 1]);
      }
      const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      const calculatedBpm = Math.round(60000 / avgDiff);
      if (calculatedBpm >= 40 && calculatedBpm <= 240) {
        setBpm(calculatedBpm);
      }
    }
  };

  const handleKnobChange = (type, delta) => {
    if (type === 'filter') {
      const newVal = Math.min(16000, Math.max(400, filterCutoff + delta * 200));
      setFilterCutoff(newVal);
      audioEngine.setFilter(newVal);
    } else if (type === 'pitch') {
      const newVal = parseFloat(Math.min(2.0, Math.max(0.5, pitchShift + delta * 0.05)).toFixed(2));
      setPitchShift(newVal);
      audioEngine.setPitch(newVal);
    } else if (type === 'decay') {
      const newVal = parseFloat(Math.min(2.5, Math.max(0.3, decayTime + delta * 0.05)).toFixed(2));
      setDecayTime(newVal);
      audioEngine.setDecay(newVal);
    } else if (type === 'drive') {
      const newVal = Math.min(100, Math.max(0, driveLevel + delta * 2));
      setDriveLevel(newVal);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
          Studio Controls & Synthesizer
        </h2>
        <p className="text-sm text-[#B9BDC2]">
          Custom controls for the music tools you'll build on this brand. Everything here works: press play for sound, drag the knobs, click steps and the waveform.
        </p>
      </div>

      {/* Main Studio Console Chassis */}
      <div className="rounded-2xl bg-[#141311] border-2 border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-8">

        {/* 1. Hardware Transport Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#1a1916] border border-neutral-800 shadow-inner">
          {/* Chrome Buttons (Play, Stop, Record) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                audioEngine.init();
                setIsPlaying(!isPlaying);
              }}
              className={`px-5 py-2.5 rounded font-display font-black text-lg uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg border ${
                isPlaying
                  ? 'bg-[#C5A36A] text-[#11100E] border-[#d4b47d] shadow-[#C5A36A]/20'
                  : 'bg-gradient-to-b from-[#DDE1E5] to-[#8E939A] text-[#11100E] border-white/60 hover:from-white active:translate-y-0.5'
              }`}
            >
              <Play className="w-4 h-4 fill-current" /> {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveStep(0);
              }}
              className="px-4 py-2.5 rounded font-display font-black text-lg uppercase tracking-wider bg-gradient-to-b from-[#DDE1E5] to-[#8E939A] text-[#11100E] border border-white/60 hover:from-white active:translate-y-0.5 shadow-lg flex items-center gap-2"
            >
              <Square className="w-4 h-4 fill-current" /> STOP
            </button>

            {/* Red Record Button */}
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-5 py-2.5 rounded font-display font-black text-lg uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg border ${
                isRecording
                  ? 'bg-[#C2332B] text-white border-red-500 animate-pulse shadow-red-600/40'
                  : 'bg-[#C2332B]/80 hover:bg-[#C2332B] text-white border-red-800 active:translate-y-0.5'
              }`}
            >
              <Circle className="w-4 h-4 fill-current text-white" /> REC
            </button>
          </div>

          {/* Tempo Controls & Hardware LED Display */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setBpm(b => Math.max(40, b - 1))}
                className="w-9 h-9 rounded bg-[#252320] border border-neutral-700 text-[#E7E0D4] font-bold flex items-center justify-center hover:bg-neutral-700 active:bg-black transition"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* LED Glow BPM Readout */}
              <div className="px-4 py-1.5 rounded-lg bg-black border-2 border-neutral-800 flex flex-col items-center shadow-inner min-w-[90px]">
                <span
                  className="font-mono text-2xl font-bold tracking-widest text-[#E2473D]"
                  style={{ textShadow: "0 0 10px rgba(226, 71, 61, 0.7)" }}
                >
                  {bpm}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                  BPM GLOW
                </span>
              </div>

              <button
                onClick={() => setBpm(b => Math.min(240, b + 1))}
                className="w-9 h-9 rounded bg-[#252320] border border-neutral-700 text-[#E7E0D4] font-bold flex items-center justify-center hover:bg-neutral-700 active:bg-black transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tap Tempo Button */}
            <button
              onClick={handleTapTempo}
              className="px-3.5 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 active:bg-[#C5A36A] active:text-black border border-neutral-700 text-xs font-mono font-bold text-[#E7E0D4] uppercase tracking-wider transition"
            >
              Tap Tempo
            </button>
          </div>
        </div>

        {/* 2. Loop Scrubber (1 Bar Waveform with Red Playhead) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#C5A36A] font-bold uppercase tracking-wider">
              Loop Scrubber (1 Bar Waveform)
            </span>
            <span className="text-neutral-400">
              Click anywhere on waveform to jump playhead
            </span>
          </div>

          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const fraction = clickX / rect.width;
              const step = Math.min(15, Math.floor(fraction * 16));
              setActiveStep(step);
              currentStepRef.current = step;
            }}
            className="relative h-20 bg-[#0d0c0a] rounded-xl border border-neutral-800 overflow-hidden cursor-crosshair flex items-center px-4"
          >
            {/* Waveform Visualization Bars */}
            <div className="w-full flex items-center justify-between gap-1 pointer-events-none">
              {[
                30, 45, 80, 60, 40, 95, 70, 50,
                35, 88, 65, 42, 90, 75, 55, 30,
                40, 70, 90, 50, 30, 85, 60, 40,
                25, 75, 50, 35, 95, 65, 45, 20
              ].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-colors duration-150 ${
                    i / 2 <= activeStep ? 'bg-[#C5A36A]' : 'bg-neutral-800'
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Red Playhead Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#C2332B] shadow-[0_0_12px_#C2332B] transition-all duration-75 pointer-events-none"
              style={{ left: `${(activeStep / 16) * 100}%` }}
            >
              <div className="w-3 h-3 bg-[#C2332B] rotate-45 -translate-x-1 -translate-y-1 shadow-md" />
            </div>
          </div>
        </div>

        {/* 3. 16-Step Sequencer Grid */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#C5A36A] font-bold uppercase tracking-wider">
              16-Step Sequencer (4 Drum Voices)
            </span>
            <span className="text-neutral-400">
              Active step lights red (#C2332B) as it fires
            </span>
          </div>

          <div className="space-y-2 bg-[#0d0c0a] p-4 rounded-xl border border-neutral-800">
            {['KICK', 'SNARE', 'HI-HAT', 'PERC'].map((name, voiceIdx) => (
              <div key={name} className="flex items-center gap-3">
                <button
                  onClick={() => audioEngine.playVoice(voiceIdx)}
                  className="w-16 text-left font-mono font-bold text-xs uppercase tracking-wider text-[#E7E0D4] hover:text-[#C5A36A] transition"
                >
                  {name}
                </button>
                <div className="flex-1 grid grid-cols-16 gap-1 sm:gap-1.5">
                  {grid[voiceIdx].map((val, stepIdx) => {
                    const isCurrent = activeStep === stepIdx && isPlaying;
                    const isActive = val === 1;
                    const isQuarter = stepIdx % 4 === 0;

                    return (
                      <button
                        key={stepIdx}
                        onClick={() => toggleStep(voiceIdx, stepIdx)}
                        className={`h-10 rounded transition-all duration-75 border ${
                          isCurrent && isActive
                            ? 'bg-[#E2473D] border-white shadow-[0_0_12px_#E2473D] scale-105'
                            : isCurrent
                            ? 'bg-[#C2332B]/40 border-[#C2332B]'
                            : isActive
                            ? 'bg-[#C5A36A] border-[#d6b57c] text-black shadow-sm'
                            : isQuarter
                            ? 'bg-neutral-800/80 border-neutral-700 hover:bg-neutral-700'
                            : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Channel Strips, Level Meters & Rotary Knobs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-neutral-800">

          {/* Channel Strips with Faders & Bronze-to-Red Meters */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase tracking-wider block">
              Channel Strips & Level Meters
            </span>
            <div className="grid grid-cols-4 gap-3 bg-[#0d0c0a] p-4 rounded-xl border border-neutral-800">
              {channels.map((ch, idx) => (
                <div key={ch.name} className="flex flex-col items-center space-y-3 bg-[#171614] p-2.5 rounded-lg border border-neutral-800/80">
                  <span className="font-mono text-xs font-bold text-[#E7E0D4]">{ch.name}</span>

                  {/* Meter + Fader Column */}
                  <div className="flex items-center gap-2 h-36">
                    {/* Bronze to Red Meter */}
                    <div className="w-2.5 h-full bg-neutral-900 rounded-full overflow-hidden flex flex-col justify-end border border-neutral-800">
                      <div
                        className="w-full transition-all duration-100 rounded-t"
                        style={{
                          height: `${ch.level}%`,
                          background: "linear-gradient(to top, #C5A36A 0%, #E2473D 80%, #FF1E10 100%)"
                        }}
                      />
                    </div>

                    {/* Fader Track & Bronze Cap */}
                    <div className="relative w-7 h-full bg-neutral-950 rounded border border-neutral-800 flex items-center justify-center">
                      <div className="w-1 h-[88%] bg-neutral-800 rounded-full" />
                      {/* Bronze Cap */}
                      <div
                        className="absolute w-6 h-4 bg-gradient-to-b from-[#dfbe87] to-[#C5A36A] rounded border border-amber-900 shadow-md cursor-ns-resize flex items-center justify-center"
                        style={{ bottom: `${ch.fader}%` }}
                      >
                        <div className="w-3 h-0.5 bg-black/60 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Mute and Solo Buttons */}
                  <div className="flex gap-1.5 w-full">
                    <button
                      onClick={() => {
                        setChannels(prev => {
                          const c = [...prev];
                          c[idx].muted = !c[idx].muted;
                          return c;
                        });
                      }}
                      className={`flex-1 py-1 rounded text-[10px] font-mono font-bold uppercase transition ${
                        ch.muted ? 'bg-[#C2332B] text-white' : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => {
                        setChannels(prev => {
                          const c = [...prev];
                          c[idx].solo = !c[idx].solo;
                          return c;
                        });
                      }}
                      className={`flex-1 py-1 rounded text-[10px] font-mono font-bold uppercase transition ${
                        ch.solo ? 'bg-[#C5A36A] text-[#11100E]' : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      S
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rotary Control Knobs (Draggable / Keyable) */}
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase tracking-wider block">
              Master Channel Knobs (Interactive Drag / Arrows)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#0d0c0a] p-4 rounded-xl border border-neutral-800">

              {/* Knob 1: Filter */}
              <div className="flex flex-col items-center space-y-2">
                <span className="font-mono text-[11px] text-neutral-400 uppercase">LP FILTER</span>
                <div
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') handleKnobChange('filter', 1);
                    if (e.key === 'ArrowDown') handleKnobChange('filter', -1);
                  }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DDE1E5] via-[#8E939A] to-[#45484D] p-1 shadow-lg border border-neutral-500 cursor-ns-resize relative focus:outline-none focus:ring-2 focus:ring-[#C5A36A]"
                >
                  <div className="w-full h-full rounded-full bg-[#11100E] flex items-center justify-center relative">
                    <div
                      className="absolute w-1 h-3 bg-[#C5A36A] rounded-full top-1"
                      style={{ transform: `rotate(${(filterCutoff / 16000) * 270 - 135}deg)`, transformOrigin: "50% 24px" }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E7E0D4]">{Math.round(filterCutoff)} Hz</span>
              </div>

              {/* Knob 2: Pitch */}
              <div className="flex flex-col items-center space-y-2">
                <span className="font-mono text-[11px] text-neutral-400 uppercase">PITCH</span>
                <div
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') handleKnobChange('pitch', 1);
                    if (e.key === 'ArrowDown') handleKnobChange('pitch', -1);
                  }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DDE1E5] via-[#8E939A] to-[#45484D] p-1 shadow-lg border border-neutral-500 cursor-ns-resize relative focus:outline-none focus:ring-2 focus:ring-[#C5A36A]"
                >
                  <div className="w-full h-full rounded-full bg-[#11100E] flex items-center justify-center relative">
                    <div
                      className="absolute w-1 h-3 bg-[#C5A36A] rounded-full top-1"
                      style={{ transform: `rotate(${((pitchShift - 0.5) / 1.5) * 270 - 135}deg)`, transformOrigin: "50% 24px" }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E7E0D4]">{pitchShift}x</span>
              </div>

              {/* Knob 3: Decay */}
              <div className="flex flex-col items-center space-y-2">
                <span className="font-mono text-[11px] text-neutral-400 uppercase">DECAY</span>
                <div
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') handleKnobChange('decay', 1);
                    if (e.key === 'ArrowDown') handleKnobChange('decay', -1);
                  }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DDE1E5] via-[#8E939A] to-[#45484D] p-1 shadow-lg border border-neutral-500 cursor-ns-resize relative focus:outline-none focus:ring-2 focus:ring-[#C5A36A]"
                >
                  <div className="w-full h-full rounded-full bg-[#11100E] flex items-center justify-center relative">
                    <div
                      className="absolute w-1 h-3 bg-[#C5A36A] rounded-full top-1"
                      style={{ transform: `rotate(${((decayTime - 0.3) / 2.2) * 270 - 135}deg)`, transformOrigin: "50% 24px" }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E7E0D4]">{decayTime}s</span>
              </div>

              {/* Knob 4: Drive */}
              <div className="flex flex-col items-center space-y-2">
                <span className="font-mono text-[11px] text-neutral-400 uppercase">DRIVE</span>
                <div
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') handleKnobChange('drive', 1);
                    if (e.key === 'ArrowDown') handleKnobChange('drive', -1);
                  }}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#DDE1E5] via-[#8E939A] to-[#45484D] p-1 shadow-lg border border-neutral-500 cursor-ns-resize relative focus:outline-none focus:ring-2 focus:ring-[#C5A36A]"
                >
                  <div className="w-full h-full rounded-full bg-[#11100E] flex items-center justify-center relative">
                    <div
                      className="absolute w-1 h-3 bg-[#C2332B] rounded-full top-1"
                      style={{ transform: `rotate(${(driveLevel / 100) * 270 - 135}deg)`, transformOrigin: "50% 24px" }}
                    />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#E7E0D4]">{driveLevel}%</span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 text-center">
              Click & drag or select a knob and tap ↑ / ↓ arrow keys to modify synthesis live.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
