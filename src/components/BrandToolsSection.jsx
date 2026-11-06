import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Download, Sparkles, SlidersHorizontal, Flame, Music, Disc } from 'lucide-react';

export const BrandToolsSection = () => {
  // Stinger animation trigger
  const [stingerKey, setStingerKey] = useState(0);

  // Lyric Cards mood selector
  const [mood, setMood] = useState('slow');

  // Sound description editor (700 char limit)
  const [soundDesc, setSoundDesc] = useState(
    "Heavy cinematic industrial trap / gritty mid-tempo hip-hop. 92 BPM. Distorted 808s with sharp sub-kick transients, analog clipping, detuned metallic synthesizers, dry room percussion, filtered noise sweeps. Vocals: male baritone, hard-attack delivery, dry center channel with tight slapback delay, zero auto-tune polish. Melodic hooks are layered, breathy, whisper-soft lowercase phrases. Ad-libs tucked into parentheses with stereo telephone filter. Mastered hot with dynamic punch, asphalt weight, and zero digital sheen."
  );
  const [copiedSound, setCopiedSound] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedSkeleton, setCopiedSkeleton] = useState(false);

  // Section builder state
  const [selectedSections, setSelectedSections] = useState([
    'intro', 'verse1', 'chorus', 'verse2', 'chorus', 'outro'
  ]);

  const moodStyles = {
    slow: {
      label: "slow",
      cardBg: "bg-[#11100E] border-neutral-800 text-[#E7E0D4]",
      fontStyle: "font-serif tracking-widest italic text-2xl sm:text-3xl text-neutral-300",
      motion: "transition-all duration-1000 ease-out",
      sub: "heavy, deliberate pacing"
    },
    rage: {
      label: "rage",
      cardBg: "bg-[#C2332B] border-red-500 text-white shadow-xl shadow-red-900/30",
      fontStyle: "font-display font-black uppercase text-4xl sm:text-5xl tracking-tighter leading-none transform -rotate-1",
      motion: "animate-pulse",
      sub: "maximum attack, distortion"
    },
    heavy: {
      label: "heavy",
      cardBg: "bg-black border-[#C5A36A] text-[#C5A36A]",
      fontStyle: "font-display font-black uppercase text-3xl sm:text-4xl tracking-tight leading-tight",
      motion: "transition duration-300 transform scale-102",
      sub: "low frequency weight"
    },
    whisper: {
      label: "whisper",
      cardBg: "bg-[#E7E0D4] border-neutral-300 text-[#11100E]",
      fontStyle: "font-sans lowercase font-light text-xl sm:text-2xl tracking-widest opacity-80",
      motion: "transition-opacity duration-700",
      sub: "soft intimacy, melodic layer"
    },
    bounce: {
      label: "bounce",
      cardBg: "bg-[#181816] border-neutral-700 text-[#E7E0D4]",
      fontStyle: "font-mono font-bold text-2xl uppercase tracking-widest text-[#C5A36A]",
      motion: "transform hover:-translate-y-1 transition",
      sub: "syncopated cadence"
    }
  };

  const sampleLyrics = `[Verse 1: male, hard-attack, dry]
We built the engine while the pipes were cracking open.
Not waiting for the calm, not begging for the token.
Got bone dust in the bearings and iron in the grease.
(yeah)
They prayed for perfect weather before they wrote the piece.

[Beat drops out]
We take the dent. We keep the wheel moving.

[Chorus: male, layered, melodic]
bleed it out into the tape
never run, never hesitate
build while bleeding in the storm
the scar is where the tools take form
(keep it moving)

[Outro: spoken baritone, filtered]
Development reference only.
Clean cuts.
Appointment closed.`;

  const sectionTemplates = {
    intro: "[Intro: filtered synth pulse, rising sub drone, vinyl crackle]",
    verse1: "[Verse 1: male, hard-attack, dry]\nLine one of punchy baritone delivery.\nLine two pushing rhythm against the kick.\n(yeah)",
    verse2: "[Verse 2: male, aggressive, syncopated]\nSecond verse escalates momentum.\nDirect statements, zero filler words.\n(look)",
    chorus: "[Chorus: male, layered, melodic]\nlowercase melodic hook lines sung soft\nhere the emotion expands wide\n(build it now)",
    bridge: "[Bridge: tension build, distorted snare roll]\n[Beat drops out]\nStripped vocal statement before final hit.",
    outro: "[Outro: spoken baritone, radio filter, slow decay]\nFinal clean boundary.\nThe appointment is closed."
  };

  const generateSkeleton = () => {
    return selectedSections.map(s => sectionTemplates[s] || `[${s.toUpperCase()}]`).join("\n\n");
  };

  const copyText = (txt, setter) => {
    navigator.clipboard?.writeText(txt);
    setter(true);
    setTimeout(() => setter(false), 1800);
  };

  const downloadLyricSheetTxt = () => {
    const blob = new Blob([sampleLyrics], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "BWB-Lyric-Sheet-House-Format.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-16">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
          Brand Tools & Interactive Utilities
        </h2>
        <p className="text-sm text-[#B9BDC2]">
          Production buttons, animated video stingers, mood lyric cards, 700-character sound description generator, house tag guides, and dynamic section builders.
        </p>
      </div>

      {/* 1. Buttons and Interactive States */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
            Buttons and States
          </h3>
          <p className="text-xs text-neutral-400">
            Bronze is the main action, outline is secondary, red is for record and delete. Hover, press, loading and disabled all have a look.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-6 rounded-xl bg-neutral-900 border border-neutral-800">
          {/* Bronze Main Action */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase">MAIN ACTION</span>
            <button className="px-4 py-2.5 rounded font-sans font-semibold text-xs bg-[#C5A36A] text-[#11100E] hover:bg-[#d6b57c] active:bg-[#a88954] transition shadow">
              Save mix
            </button>
          </div>

          {/* Outline Secondary */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase">SECONDARY</span>
            <button className="px-4 py-2.5 rounded font-sans font-semibold text-xs bg-transparent border border-neutral-600 text-[#E7E0D4] hover:bg-neutral-800 active:border-[#C5A36A] transition">
              Preview
            </button>
          </div>

          {/* Red Record / Critical */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase">RECORD / DELETE</span>
            <button className="px-4 py-2.5 rounded font-sans font-semibold text-xs bg-[#C2332B] text-white hover:bg-red-700 active:bg-red-900 transition shadow">
              Record
            </button>
          </div>

          {/* Loading State */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase">LOADING STATE</span>
            <button disabled className="px-4 py-2.5 rounded font-sans font-semibold text-xs bg-neutral-800 text-neutral-400 border border-neutral-700 flex items-center justify-center gap-2 cursor-wait">
              <span className="w-3 h-3 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
              Exporting...
            </button>
          </div>

          {/* Disabled State */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase">DISABLED STATE</span>
            <button disabled className="px-4 py-2.5 rounded font-sans font-semibold text-xs bg-neutral-950 text-neutral-600 border border-neutral-900 cursor-not-allowed">
              Unavailable
            </button>
          </div>

          {/* Armed / Toggle State */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] text-neutral-500 uppercase">ARMED / ACTIVE</span>
            <button className="px-4 py-2.5 rounded font-sans font-semibold text-xs bg-amber-950/60 border border-[#C5A36A] text-[#C5A36A] hover:bg-[#C5A36A] hover:text-black transition">
              Arm track
            </button>
          </div>
        </div>
      </section>

      {/* 2. Loaders and Video Stinger */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
            Loaders and Stinger
          </h3>
          <p className="text-xs text-neutral-400">
            A loader for stem separation and uploads, and a two-second stinger to open a video. The wordmark lands, then the red word follows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stem Separation Loader */}
          <div className="p-8 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-6">
            <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase">
              Stem Separation & Processing Loader
            </span>

            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer Pulsing Waveform Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#C5A36A]/30 animate-ping" />
              <div className="w-20 h-20 rounded-full border-2 border-[#C5A36A] border-t-transparent animate-spin" />
              <div className="absolute w-12 h-12 rounded-full border-2 border-[#C2332B] border-b-transparent animate-spin-reverse" />
              <Disc className="w-6 h-6 text-[#E7E0D4] animate-pulse" />
            </div>

            <div className="text-center space-y-1">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E7E0D4] block">
                “Separating stems”
              </span>
              <span className="font-mono text-[11px] text-neutral-500">
                DSP Isolation in Progress · 4 Stems (Drums / Bass / Vocals / Other)
              </span>
            </div>
          </div>

          {/* 2-Second Stinger Opening */}
          <div className="p-8 rounded-xl bg-black border border-neutral-800 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase">
                Two-Second Opening Stinger
              </span>
              <button
                onClick={() => setStingerKey(k => k + 1)}
                className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-[#E7E0D4] rounded text-xs font-mono transition"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C5A36A]" /> Replay stinger
              </button>
            </div>

            {/* Stinger Animation Stage */}
            <div key={stingerKey} className="py-12 flex flex-col items-center justify-center text-center select-none">
              <span
                className="font-display font-black text-4xl sm:text-5xl uppercase tracking-wider text-[#E7E0D4] animate-fade-in-down"
                style={{ animationDuration: '0.6s' }}
              >
                BUILD WHILE
              </span>
              <span
                className="font-display font-black text-5xl sm:text-6xl uppercase tracking-widest text-[#C2332B] animate-drop-in drop-shadow-[0_0_15px_rgba(194,51,43,0.8)]"
                style={{ animationDelay: '0.7s', animationDuration: '0.7s', animationFillMode: 'both' }}
              >
                BLEEDING
              </span>
              <span
                className="font-mono text-[11px] uppercase tracking-widest text-[#B9BDC2] mt-3 animate-fade-in"
                style={{ animationDelay: '1.4s', animationDuration: '0.5s', animationFillMode: 'both' }}
              >
                Keep the ink moving.
              </span>
            </div>

            <div className="z-10 font-mono text-[10px] text-neutral-500 text-center border-t border-neutral-900 pt-3">
              The wordmark lands firmly, then the red word strikes with acoustic slam.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lyric Cards Generator */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
              Lyric Cards
            </h3>
            <p className="text-xs text-neutral-400">
              One to three words per card, styled by how the line feels. Pick a mood. Each one changes the type and the motion, not only the color.
            </p>
          </div>
          {/* Mood Selector Buttons */}
          <div className="flex gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            {Object.keys(moodStyles).map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase transition ${
                  mood === m
                    ? 'bg-[#C5A36A] text-[#11100E]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Lyric Card Display */}
        <div className="max-w-xl mx-auto">
          <div className={`p-8 rounded-2xl border-2 flex flex-col justify-between min-h-[220px] shadow-2xl transition-all duration-300 ${moodStyles[mood].cardBg}`}>
            <div className="flex justify-between items-center text-xs font-mono opacity-60">
              <span className="uppercase tracking-wider font-bold">MOOD: {moodStyles[mood].label}</span>
              <span className="uppercase">{moodStyles[mood].sub}</span>
            </div>

            <div className={`my-auto text-center py-4 ${moodStyles[mood].fontStyle} ${moodStyles[mood].motion}`}>
              {mood === 'slow' && "“break the silence”"}
              {mood === 'rage' && "NEVER STOP."}
              {mood === 'heavy' && "TAKE THE WEIGHT"}
              {mood === 'whisper' && "before the lights go down"}
              {mood === 'bounce' && "STEP // ROLL // HIT"}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono opacity-50 border-t border-current/20 pt-2">
              <span>BWB LYRIC CARD FORMAT</span>
              <span>1 TO 3 WORDS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sound Description (700 Char Capped Editor) */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
              Sound Description
            </h3>
            <p className="text-xs text-neutral-400">
              The overall music direction, written genre first: tempo, instruments, vocal rules, then mix. It's capped at 700 characters, so edit it and the counter follows.
            </p>
          </div>
          <button
            onClick={() => copyText(soundDesc, setCopiedSound)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A36A] text-[#11100E] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d6b57c] transition shadow"
          >
            {copiedSound ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSound ? "Copied" : "Copy sound description"}
          </button>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <textarea
              maxLength={700}
              rows={5}
              value={soundDesc}
              onChange={(e) => setSoundDesc(e.target.value)}
              className="w-full bg-[#141311] border-2 border-neutral-800 focus:border-[#C5A36A] rounded-xl p-4 font-mono text-xs sm:text-sm text-[#E7E0D4] leading-relaxed focus:outline-none transition"
            />
            <div className="absolute bottom-3 right-4 font-mono text-xs text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-700">
              <span className={soundDesc.length >= 680 ? "text-[#C2332B] font-bold" : "text-[#C5A36A]"}>
                {soundDesc.length}
              </span> / 700 characters
            </div>
          </div>
          <p className="text-[11px] font-mono text-neutral-500">
            Formulation protocol: [Genre First] · [Tempo] · [Instrumentation & Sound Design] · [Vocal Rules & Delivery] · [Mix & Master Aesthetics].
          </p>
        </div>
      </section>

      {/* 5. Lyric Sheet & Tag Guide */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
              Lyric Sheet & Tag Guide
            </h3>
            <p className="text-xs text-neutral-400">
              A finished example in the house format. Every section opens with a bracket tag that carries performance notes. Rap sections are sentence case, melodic sections are lowercase, and ad-libs sit in parentheses.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => copyText(sampleLyrics, setCopiedLyrics)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A36A] text-[#11100E] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d6b57c] transition shadow"
            >
              {copiedLyrics ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLyrics ? "Copied" : "Copy lyrics"}
            </button>
            <button
              onClick={downloadLyricSheetTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 text-[#E7E0D4] font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Full sheet TXT
            </button>
          </div>
        </div>

        {/* Tag Guide Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-mono text-xs font-bold text-[#C5A36A] block">
              [Verse 1: male, hard-attack, dry]
            </span>
            <p className="text-xs text-neutral-400">
              <strong>Section tag.</strong> Performance notes follow the colon. Sets voice attributes and energy level.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-mono text-xs font-bold text-[#C2332B] block">
              [Beat drops out]
            </span>
            <p className="text-xs text-neutral-400">
              <strong>Production cue.</strong> Sits on its own line. Instructs AI and arrangers to pull drums or filters.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-mono text-xs font-bold text-[#E7E0D4] block">
              (yeah) / (keep moving)
            </span>
            <p className="text-xs text-neutral-400">
              <strong>Ad-lib.</strong> In parentheses beside the line it supports. Processed with stereo telephone filter.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-mono text-xs font-bold text-neutral-300 block">
              lowercase lines
            </span>
            <p className="text-xs text-neutral-400">
              <strong>Melodic sections:</strong> sung, soft, layered, breathy. Avoid harsh vocal attacks.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-mono text-xs font-bold text-neutral-300 block">
              Sentence case lines
            </span>
            <p className="text-xs text-neutral-400">
              <strong>Rap sections:</strong> hard-attack, rhythmic, punchy, dry. High speech intelligibility.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="font-mono text-xs font-bold text-amber-500 block">
              No ALL CAPS stress
            </span>
            <p className="text-xs text-neutral-400">
              Suno doesn't read capitals as emphasis. Use line breaks, punctuation, and explicit delivery notes.
            </p>
          </div>
        </div>

        {/* Live Formatted Lyric Box */}
        <div className="p-6 rounded-xl bg-black border border-neutral-800 overflow-x-auto">
          <pre className="font-mono text-xs text-[#E7E0D4] leading-relaxed whitespace-pre-wrap">
            {sampleLyrics}
          </pre>
        </div>
      </section>

      {/* 6. Section Builder */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
              Section Builder
            </h3>
            <p className="text-xs text-neutral-400">
              Pick the sections the song needs and get a tagged skeleton to write into. Each tag comes with the delivery notes that match its role.
            </p>
          </div>
          <button
            onClick={() => copyText(generateSkeleton(), setCopiedSkeleton)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A36A] text-[#11100E] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d6b57c] transition shadow"
          >
            {copiedSkeleton ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSkeleton ? "Copied" : "Copy skeleton"}
          </button>
        </div>

        {/* Section Toggles */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(sectionTemplates).map((s) => {
            const isSelected = selectedSections.includes(s);
            return (
              <button
                key={s}
                onClick={() => {
                  if (isSelected) {
                    setSelectedSections(selectedSections.filter(item => item !== s));
                  } else {
                    setSelectedSections([...selectedSections, s]);
                  }
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#C5A36A] text-[#11100E] border-[#d6b57c]'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                <span>{isSelected ? '✓' : '+'}</span>
                <span>{s}</span>
              </button>
            );
          })}
        </div>

        {/* Live Generated Skeleton Preview */}
        <div className="p-6 rounded-xl bg-[#11100E] border border-neutral-800 overflow-x-auto shadow-inner">
          <pre className="font-mono text-xs text-[#C5A36A] leading-relaxed whitespace-pre-wrap">
            {generateSkeleton() || "// Select at least one section above to generate song skeleton."}
          </pre>
        </div>
      </section>
    </div>
  );
};
