import React, { useState } from 'react';
import { BRAND_COLORS, EmblemSVG, BrandLockup } from '../assets/brandAssets';
import { Copy, Check, Download, ExternalLink, Smartphone, Monitor, Globe, Share2, Layers, AlertCircle } from 'lucide-react';

export const BrandSection = () => {
  const [copiedHex, setCopiedHex] = useState(null);
  const [maskType, setMaskType] = useState('squircle'); // 'squircle' or 'circle'

  const copyToClipboard = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const downloadJsonPalette = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(BRAND_COLORS, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "bwb-canonical-palette.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadMockSVG = (filename, content) => {
    const blob = new Blob([content], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-16">
      {/* 1. Header & Overview */}
      <header className="border-b border-neutral-800 pb-8 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C2332B]/10 border border-[#C2332B]/30 rounded-full text-[#C2332B] text-xs font-mono font-bold tracking-wider uppercase">
              Development/design reference only — not public-facing
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight text-[#E7E0D4] uppercase">
              Build While <span className="text-[#C2332B]">Bleeding</span>
            </h1>
            <p className="text-base md:text-lg text-[#B9BDC2] max-w-3xl">
              Logo, color, type, icons and banners, each shown where it will live, with a download beside it. v3.3, 2026-10-24. Keep the ink moving.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="font-mono text-xs text-[#C5A36A] uppercase tracking-wider font-semibold">
              BRAND SPECIFICATION V3.3
            </span>
            <span className="font-mono text-xs text-neutral-500">
              STRICT CANONICAL CODES
            </span>
          </div>
        </div>
      </header>

      {/* 2. The Emblem & Lockups */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
              The Emblem
            </h2>
            <p className="text-sm text-[#B9BDC2]">
              A chrome ring holding one waveform, cut by two arrows, bleeding ink. Use the emblem alone when there is room and the lockup when the name has to be read.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => alert("Emblem PNG asset ready in production suite.")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Emblem PNG
            </button>
            <button
              onClick={() => alert("Lockup SVG Dark asset ready in production suite.")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Lockup SVG (dark)
            </button>
            <button
              onClick={() => alert("Lockup SVG Light asset ready in production suite.")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Lockup SVG (light)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Emblem on Bone */}
          <div className="p-8 rounded-xl bg-[#E7E0D4] text-[#11100E] flex flex-col items-center justify-center space-y-4 shadow-xl border border-neutral-300">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-600 bg-neutral-300/60 px-3 py-1 rounded">
              Emblem on Bone
            </span>
            <div className="w-48 h-48 py-2">
              <EmblemSVG className="w-full h-full drop-shadow-md" arrowColor="#11100E" withDrips={true} />
            </div>
            <div className="w-full pt-4 border-t border-neutral-300 flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-700">Light Foundation / High Contrast</span>
              <span className="font-bold text-[#C2332B]">#E7E0D4 Background</span>
            </div>
          </div>

          {/* Emblem on Asphalt */}
          <div className="p-8 rounded-xl bg-[#11100E] text-[#E7E0D4] flex flex-col items-center justify-center space-y-4 shadow-xl border border-neutral-800">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C5A36A] bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              Emblem on Asphalt
            </span>
            <div className="w-48 h-48 py-2">
              <EmblemSVG className="w-full h-full drop-shadow-xl" arrowColor="#E7E0D4" withDrips={true} />
            </div>
            <div className="w-full pt-4 border-t border-neutral-800 flex justify-between items-center text-xs font-mono">
              <span className="text-neutral-400">Primary Dark Foundation</span>
              <span className="font-bold text-[#C5A36A]">#11100E Background</span>
            </div>
          </div>
        </div>

        {/* Lockups Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-lg bg-[#11100E] border border-neutral-800 flex flex-col items-center justify-center gap-3">
            <span className="font-mono text-xs text-neutral-400 self-start">LOCKUP (DARK FOUNDATION)</span>
            <BrandLockup variant="dark" />
          </div>
          <div className="p-6 rounded-lg bg-[#E7E0D4] border border-neutral-300 flex flex-col items-center justify-center gap-3">
            <span className="font-mono text-xs text-neutral-600 self-start">LOCKUP (LIGHT FOUNDATION)</span>
            <BrandLockup variant="light" />
          </div>
        </div>
      </section>

      {/* 3. Five Colors */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
              Five Colors
            </h2>
            <p className="text-sm text-[#B9BDC2]">
              Asphalt and bone carry the page. Red is the word bleeding, so keep it to big type and shapes, never small text. Bronze and chrome handle emphasis. Tap a swatch to copy its hex.
            </p>
          </div>
          <button
            onClick={downloadJsonPalette}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#C5A36A] text-[#11100E] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d6b57c] transition shadow-md"
          >
            <Download className="w-4 h-4" /> Palette JSON
          </button>
        </div>

        {/* Swatch Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {BRAND_COLORS.map((c) => {
            const isCopied = copiedHex === c.hex;
            return (
              <div
                key={c.name}
                onClick={() => copyToClipboard(c.hex)}
                className="group relative cursor-pointer rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/60 hover:border-[#C5A36A] transition-all duration-200 transform hover:-translate-y-1 flex flex-col"
              >
                {/* Visual Color Block */}
                <div
                  className="h-28 w-full flex items-center justify-center relative p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <span className={`text-xs font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded shadow ${c.textClass} bg-black/20 backdrop-blur-sm`}>
                    {c.hex}
                  </span>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    {isCopied ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> COPIED
                      </span>
                    ) : (
                      <span className="bg-black/60 text-white text-[10px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Copy className="w-3 h-3" /> COPY
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="text-xl font-black font-display uppercase tracking-wide text-[#E7E0D4]">
                      {c.name}
                    </h3>
                    <p className="text-xs font-medium text-[#C5A36A] mt-0.5">
                      {c.role}
                    </p>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed border-t border-neutral-800 pt-2">
                    {c.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Canonical Palette Table */}
        <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-neutral-900 text-neutral-400 uppercase tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Color</th>
                <th className="py-3 px-4">Hex</th>
                <th className="py-3 px-4">Role & Rules</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-900 text-[#E7E0D4]">
              {BRAND_COLORS.map((c) => (
                <tr key={c.name} className="hover:bg-neutral-900/50">
                  <td className="py-3 px-4 flex items-center gap-2.5 font-bold">
                    <span className="w-4 h-4 rounded-full border border-neutral-600 inline-block" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </td>
                  <td className="py-3 px-4 text-[#C5A36A] font-bold">{c.hex}</td>
                  <td className="py-3 px-4 text-neutral-300 font-sans">{c.role}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => copyToClipboard(c.hex)}
                      className="px-2 py-1 text-[10px] bg-neutral-800 hover:bg-neutral-700 text-[#E7E0D4] rounded"
                    >
                      {copiedHex === c.hex ? "Copied" : "Copy Hex"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Two Typefaces */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
            Two Typefaces
          </h2>
          <p className="text-sm text-[#B9BDC2]">
            Big Shoulders Display for anything that shouts: headlines, banners, the wordmark. Libre Franklin for everything that has to be read. Both are free on Google Fonts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Big Shoulders Display */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#C5A36A] border-b border-neutral-800 pb-2">
              <span>PRIMARY DISPLAY HEADLINES</span>
              <a
                href="https://fonts.google.com/specimen/Big+Shoulders+Display"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1 text-[#E7E0D4]"
              >
                Google Fonts <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-1">
              <p className="font-display text-4xl sm:text-5xl font-black uppercase text-[#E7E0D4] tracking-tight leading-none">
                Tools. Theory.
              </p>
              <p className="font-display text-4xl sm:text-5xl font-black uppercase text-[#C2332B] tracking-tight leading-none">
                Field reports. Maps.
              </p>
            </div>
            <p className="text-xs font-sans text-neutral-400">
              <strong className="text-[#E7E0D4]">Big Shoulders Display, 900.</strong> Condensed, industrial, set in capitals. Used for punchy authority, bold callouts, and release identities.
            </p>
          </div>

          {/* Libre Franklin */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#C5A36A] border-b border-neutral-800 pb-2">
              <span>BODY & INTERFACE TEXT</span>
              <a
                href="https://fonts.google.com/specimen/Libre+Franklin"
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1 text-[#E7E0D4]"
              >
                Google Fonts <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2">
              <p className="font-sans text-sm text-[#E7E0D4] font-normal leading-relaxed">
                When you make music or build tools, the system must remain reliable under friction. Sentence case, plain verbs, short lines. We build while bleeding because waiting for painless conditions is surrender.
              </p>
              <div className="flex gap-2">
                <span className="font-sans text-xs font-semibold px-2.5 py-1 bg-[#11100E] border border-neutral-700 text-[#E7E0D4] rounded">
                  Regular 400
                </span>
                <span className="font-sans text-xs font-semibold px-2.5 py-1 bg-[#C5A36A] text-[#11100E] rounded">
                  SemiBold 600
                </span>
              </div>
            </div>
            <p className="text-xs font-sans text-neutral-400">
              <strong className="text-[#E7E0D4]">Libre Franklin, 400 and 600.</strong> For paragraphs, captions and buttons. Sentence case, plain verbs, short lines.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Browser Tab & Favicons */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
              Browser Tab
            </h2>
            <p className="text-sm text-[#B9BDC2]">
              The favicon crops tight to the ring and arrows and skips the drips, so it still reads at 16 pixels. It sits on bone so it holds up in light and dark browsers.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => alert("Downloading Favicon 32 PNG...")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Favicon 32 PNG
            </button>
            <button
              onClick={() => alert("Downloading Favicon 48 PNG...")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Favicon 48 PNG
            </button>
          </div>
        </div>

        {/* Mock Browser Window */}
        <div className="rounded-xl overflow-hidden border border-neutral-800 bg-[#1e1e1e] shadow-2xl">
          {/* Browser Chrome Header */}
          <div className="bg-[#181818] px-4 py-2.5 flex items-center gap-3 border-b border-neutral-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            {/* Browser Tab */}
            <div className="flex items-center gap-2 bg-[#1e1e1e] text-xs font-sans text-[#E7E0D4] px-4 py-1.5 rounded-t-lg border-t border-x border-neutral-700 max-w-xs">
              <div className="w-4 h-4 rounded bg-[#E7E0D4] flex items-center justify-center p-0.5 flex-shrink-0">
                <EmblemSVG className="w-full h-full" withDrips={false} arrowColor="#11100E" />
              </div>
              <span className="truncate font-medium">Build While Bleeding</span>
              <span className="text-neutral-500 hover:text-white cursor-pointer ml-auto">×</span>
            </div>

            <div className="text-xs text-neutral-500 flex items-center gap-1 ml-1 cursor-pointer">
              <span>+</span>
            </div>
          </div>

          {/* Browser URL Bar */}
          <div className="bg-[#1e1e1e] px-4 py-2 flex items-center gap-3 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 text-neutral-500">
              <span>←</span>
              <span>→</span>
              <span>↻</span>
            </div>
            <div className="flex-1 bg-[#121212] px-3 py-1 rounded border border-neutral-700/60 text-neutral-300 flex items-center justify-between">
              <span>https://buildwhilebleeding.com</span>
              <span className="text-neutral-500 font-sans text-[11px]">🔒</span>
            </div>
          </div>

          {/* Enlarged Favicon Inspections */}
          <div className="p-8 bg-[#11100E] flex flex-wrap items-center justify-around gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-[#E7E0D4] rounded-lg p-2 flex items-center justify-center shadow-lg border border-neutral-300">
                <EmblemSVG className="w-full h-full" withDrips={false} arrowColor="#11100E" />
              </div>
              <span className="text-xs font-mono text-[#B9BDC2]">16 px (enlarged)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-[#E7E0D4] rounded-xl p-3 flex items-center justify-center shadow-lg border border-neutral-300">
                <EmblemSVG className="w-full h-full" withDrips={false} arrowColor="#11100E" />
              </div>
              <span className="text-xs font-mono text-[#B9BDC2]">32 px (enlarged)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-[#E7E0D4] rounded-2xl p-4 flex items-center justify-center shadow-xl border border-neutral-300">
                <EmblemSVG className="w-full h-full" withDrips={false} arrowColor="#11100E" />
              </div>
              <span className="text-xs font-mono text-[#B9BDC2]">48 px (enlarged)</span>
            </div>
          </div>
          <div className="bg-neutral-900 px-4 py-2 text-center text-xs text-neutral-400 font-mono">
            Favicon crops tight to ring and arrows; drips removed to preserve 16px micro-readability on light & dark browser shells.
          </div>
        </div>
      </section>

      {/* 6. Home Screen Icons (iOS & Android) */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
              Home Screen
            </h2>
            <p className="text-sm text-[#B9BDC2]">
              The full emblem, drips included, sits on bone for iOS and Android. The maskable version has extra padding so circle and squircle crops never clip the ring.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => alert("Downloading Apple Icon 180...")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Apple icon 180
            </button>
            <button
              onClick={() => alert("Downloading Icon 512...")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Icon 512
            </button>
            <button
              onClick={() => alert("Downloading Maskable 512...")}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Maskable 512
            </button>
          </div>
        </div>

        {/* Mobile Device Mockup and Mask Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* iOS Rounded Rect */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-3">
            <span className="font-mono text-xs text-[#C5A36A] font-bold">iOS HOME SCREEN ICON</span>
            <div className="w-28 h-28 bg-[#E7E0D4] rounded-[22%] p-3.5 shadow-2xl border border-neutral-300 flex items-center justify-center">
              <EmblemSVG className="w-full h-full" withDrips={true} arrowColor="#11100E" />
            </div>
            <span className="text-xs font-bold text-[#E7E0D4]">BWB App (180px)</span>
            <span className="text-[11px] text-neutral-400 text-center">Continuous curvature squircle standard</span>
          </div>

          {/* Android Squircle Mask */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-3">
            <span className="font-mono text-xs text-[#C5A36A] font-bold">ANDROID SQUIRCLE CROP</span>
            <div className="w-28 h-28 bg-[#E7E0D4] rounded-2xl p-5 shadow-2xl border border-neutral-300 flex items-center justify-center overflow-hidden">
              <EmblemSVG className="w-full h-full" withDrips={true} arrowColor="#11100E" />
            </div>
            <span className="text-xs font-bold text-[#E7E0D4]">Maskable Safe Zone</span>
            <span className="text-[11px] text-neutral-400 text-center">Padding guarantees ring never clips</span>
          </div>

          {/* Android Circle Mask */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-3">
            <span className="font-mono text-xs text-[#C5A36A] font-bold">ANDROID CIRCLE CROP</span>
            <div className="w-28 h-28 bg-[#E7E0D4] rounded-full p-5 shadow-2xl border border-neutral-300 flex items-center justify-center overflow-hidden">
              <EmblemSVG className="w-full h-full" withDrips={true} arrowColor="#11100E" />
            </div>
            <span className="text-xs font-bold text-[#E7E0D4]">Circle Crop Safe Zone</span>
            <span className="text-[11px] text-neutral-400 text-center">Pixel 8 / Samsung OneUI circular mask</span>
          </div>
        </div>
      </section>

      {/* 7. Profile Header, Channel Banner & Share Card */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
            Banners & Social Headers
          </h2>
          <p className="text-sm text-[#B9BDC2]">
            Exact aspect ratios and safe zones for X profile headers, video channel banners, and open-graph link previews.
          </p>
        </div>

        {/* Profile Header (1500x500) */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#C5A36A] font-bold">PROFILE HEADER (1500 × 500) — FOR X AND SIMILAR PROFILES</span>
            <button
              onClick={() => alert("Downloading Header SVG (1500x500)...")}
              className="text-[#E7E0D4] hover:text-[#C5A36A] flex items-center gap-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" /> Header SVG 1500×500
            </button>
          </div>
          <div className="relative w-full aspect-[3/1] bg-[#11100E] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl p-6 flex flex-col justify-between">
            {/* Background Texture & Waveform Grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-around">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-1 bg-[#C5A36A] h-full" style={{ opacity: (i % 2 === 0 ? 0.4 : 0.8) }} />
              ))}
            </div>

            {/* Header Content Right Aligned */}
            <div className="relative z-10 flex justify-between items-start">
              <div />
              <div className="text-right">
                <span className="font-display font-black text-3xl md:text-5xl uppercase tracking-wider text-[#E7E0D4]">
                  BUILD WHILE <span className="text-[#C2332B]">BLEEDING</span>
                </span>
                <p className="font-mono text-xs md:text-sm text-[#B9BDC2]">
                  Tools. Theory. Field reports. Maps.
                </p>
              </div>
            </div>

            {/* Avatar Safe Zone Visualization */}
            <div className="relative z-10 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-[#11100E] bg-[#E7E0D4] flex items-center justify-center p-2 shadow-2xl">
                  <EmblemSVG className="w-full h-full" withDrips={false} arrowColor="#11100E" />
                </div>
                <div>
                  <span className="font-display font-bold text-lg md:text-xl text-[#E7E0D4] block">Build While Bleeding</span>
                  <span className="font-mono text-xs text-[#C5A36A]">@buildwhilebleeding</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-neutral-500 bg-black/60 px-2 py-1 rounded">
                Clear of bottom-left avatar overlap
              </div>
            </div>
          </div>
        </div>

        {/* Channel Banner (2560x1440) */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#C5A36A] font-bold">CHANNEL BANNER (2560 × 1440) — TV / DESKTOP / MOBILE SAFE AREA</span>
            <button
              onClick={() => alert("Downloading Banner SVG (2560x1440)...")}
              className="text-[#E7E0D4] hover:text-[#C5A36A] flex items-center gap-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" /> Banner SVG 2560×1440
            </button>
          </div>
          <div className="relative w-full aspect-[16/9] bg-[#11100E] rounded-xl overflow-hidden border border-neutral-800 shadow-2xl flex items-center justify-center">
            {/* TV full aspect backing */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <EmblemSVG className="w-[60%] h-[60%]" arrowColor="#E7E0D4" withDrips={true} />
            </div>

            {/* Center Strip (Phone / Tablet Safe Area) */}
            <div className="w-full h-[28%] bg-neutral-900/90 border-y-2 border-dashed border-[#C2332B]/60 relative flex items-center justify-between px-8 z-10 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12">
                  <EmblemSVG className="w-full h-full" arrowColor="#E7E0D4" withDrips={true} />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl uppercase tracking-wider text-[#E7E0D4]">
                    BUILD WHILE <span className="text-[#C2332B]">BLEEDING</span>
                  </h3>
                  <p className="font-mono text-[10px] text-[#C5A36A] uppercase tracking-wider">
                    Official Channel · Music Tools & Stems
                  </p>
                </div>
              </div>
              <div className="font-mono text-xs text-[#E7E0D4] bg-[#11100E] px-3 py-1 rounded border border-neutral-800 hidden sm:block">
                Visible on every screen (Center Safe Band)
              </div>
            </div>

            <div className="absolute top-3 right-3 font-mono text-[10px] text-neutral-500 bg-black/60 px-2 py-0.5 rounded">
              TV Full Area (2560 × 1440)
            </div>
          </div>
        </div>

        {/* Share Card (1200x630) */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#C5A36A] font-bold">SHARE CARD (1200 × 630) — OPEN GRAPH LINK PREVIEW</span>
            <button
              onClick={() => alert("Downloading Share Card SVG (1200x630)...")}
              className="text-[#E7E0D4] hover:text-[#C5A36A] flex items-center gap-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" /> Share card SVG 1200×630
            </button>
          </div>
          <div className="w-full aspect-[1200/630] max-w-2xl mx-auto bg-[#11100E] border-2 border-[#C5A36A]/40 rounded-xl overflow-hidden shadow-2xl p-8 flex flex-col justify-between relative">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16">
                <EmblemSVG className="w-full h-full" arrowColor="#E7E0D4" withDrips={true} />
              </div>
              <span className="font-mono text-xs text-[#C5A36A] bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
                buildwhilebleeding.com
              </span>
            </div>

            <div className="space-y-2 my-auto">
              <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#E7E0D4]">
                BUILD WHILE <span className="text-[#C2332B]">BLEEDING</span>
              </h3>
              <p className="font-display font-bold text-2xl uppercase tracking-wide text-[#C5A36A]">
                Tools. Theory. Field reports. Maps.
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-neutral-800 pt-3 text-xs font-mono text-neutral-400">
              <span>“Look what I found.”</span>
              <span className="text-[#B9BDC2]">OG Protocol 1200 × 630</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Reference Art */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
            Reference Art
          </h2>
          <p className="text-sm text-[#B9BDC2]">
            Four marks supplied for this revision, shown as reference — not as finished canonical assets. The lexicon card needs clean typesetting before reuse, and the chrome wordmark is display-only. Everything else in this file still follows the canonical palette and type.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reference 1: Lexicon Entry 001 */}
          <div className="p-6 rounded-xl bg-[#E7E0D4] text-[#11100E] border border-neutral-300 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs border-b border-neutral-400 pb-2">
                <span className="font-bold uppercase tracking-wider">ENTRY 001 // DEFINITION</span>
                <span className="text-neutral-600">BONE PAPER SPEC</span>
              </div>
              <h3 className="font-display font-black text-3xl uppercase tracking-tight text-[#11100E]">
                Build While Bleeding
              </h3>
              <div className="space-y-2 font-serif text-sm">
                <p>
                  <strong className="font-sans font-bold text-xs uppercase text-[#C2332B] block">1. Verb phrase</strong>
                  “While it’s still happening.” Continued creation in the active presence of personal or material injury.
                </p>
                <p>
                  <strong className="font-sans font-bold text-xs uppercase text-[#C2332B] block">2. Injunction</strong>
                  “Build anyway. Build because it won’t.” Refusal to await ideal conditions before committing to the work.
                </p>
              </div>
            </div>

            <div className="bg-[#11100E]/5 p-3 rounded border border-neutral-400/50 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#C2332B]">
                <AlertCircle className="w-3.5 h-3.5" /> FLAG: TYPESETTING DIRECTIVE
              </div>
              <p className="text-[11px] text-neutral-700 leading-snug">
                The small Etymology, Usage and Antonyms text in the generated reference is garbled nonsense — do not lift that text. Clean typesetting is still needed before any reuse.
              </p>
              <button
                onClick={() => alert("Downloading Lexicon 001 Card Image Reference...")}
                className="w-full text-center py-1.5 bg-[#11100E] text-[#E7E0D4] font-mono text-xs font-bold rounded uppercase hover:bg-neutral-800 transition"
              >
                Download Image
              </button>
            </div>
          </div>

          {/* Reference 2: Distressed Lockup */}
          <div className="p-6 rounded-xl bg-[#11100E] text-[#E7E0D4] border border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs border-b border-neutral-800 pb-2 text-neutral-400">
                <span className="text-[#C5A36A] font-bold uppercase tracking-wider">DISTRESSED VARIANT</span>
                <span>BONE & BRIGHT RED</span>
              </div>
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <h3 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#E7E0D4] leading-tight drop-shadow-lg">
                  BUILD WHILE <br />
                  <span className="text-[#E6281D] tracking-widest font-black inline-block transform -rotate-1">
                    BLEEDING
                  </span>
                </h3>
                <div className="w-32 h-1 bg-[#E6281D] mt-2 rounded-full" />
              </div>
            </div>

            <div className="bg-neutral-900 p-3 rounded border border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#C5A36A]">
                <AlertCircle className="w-3.5 h-3.5" /> COLOR VARIANT NOTE
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                The red here is brighter and purer than canonical rust #C2332B, so treat this as a distressed variant, not the canonical lockup color. Drips fall off the frame.
              </p>
              <button
                onClick={() => alert("Downloading Distressed Lockup Image...")}
                className="w-full text-center py-1.5 bg-[#C2332B] text-white font-mono text-xs font-bold rounded uppercase hover:bg-red-700 transition"
              >
                Download Image
              </button>
            </div>
          </div>

          {/* Reference 3: Ryan Real AF — Stencil */}
          <div className="p-6 rounded-xl bg-white text-black border border-neutral-300 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs border-b border-neutral-300 pb-2 text-neutral-600">
                <span className="font-bold uppercase tracking-wider">ARTIST WORDMARK A</span>
                <span>STACKED STENCIL</span>
              </div>
              <div className="py-6 flex flex-col items-center justify-center font-black leading-none uppercase text-black select-none">
                <span className="font-display text-4xl tracking-tight">RYAN</span>
                <span className="font-display text-4xl tracking-tight">REAL</span>
                <span className="font-display text-7xl tracking-tighter text-black mt-1">AF</span>
              </div>
            </div>

            <div className="bg-neutral-100 p-3 rounded border border-neutral-300 space-y-2">
              <p className="text-[11px] text-neutral-700 leading-snug">
                <strong>Strongest for small sizes and merch.</strong> The oversized AF is the design — keep the crop, don’t even it out into equal lines.
              </p>
              <button
                onClick={() => alert("Downloading Ryan Real AF Stencil...")}
                className="w-full text-center py-1.5 bg-black text-white font-mono text-xs font-bold rounded uppercase hover:bg-neutral-800 transition"
              >
                Download Image
              </button>
            </div>
          </div>

          {/* Reference 4: Ryan Real — Chrome */}
          <div className="p-6 rounded-xl bg-[#11100E] text-[#E7E0D4] border border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center font-mono text-xs border-b border-neutral-800 pb-2 text-neutral-400">
                <span className="text-[#B9BDC2] font-bold uppercase tracking-wider">ARTIST WORDMARK B</span>
                <span>ANGLED CHROME</span>
              </div>
              <div className="py-8 flex items-center justify-center">
                <span
                  className="font-display text-5xl font-black italic tracking-tighter transform -rotate-3"
                  style={{
                    background: "linear-gradient(135deg, #FFF 0%, #B9BDC2 40%, #555 70%, #FFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 0 15px rgba(255,255,255,0.2)"
                  }}
                >
                  RYAN REAL
                </span>
              </div>
            </div>

            <div className="bg-neutral-900 p-3 rounded border border-neutral-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-500">
                <AlertCircle className="w-3.5 h-3.5" /> DISPLAY-ONLY RESTRICTION
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Angled chrome letters, overlapping. At small sizes the overlapping letters stop reading. Keep for large hero or cover use only — never as a small wordmark.
              </p>
              <button
                onClick={() => alert("Downloading Ryan Real Chrome Reference...")}
                className="w-full text-center py-1.5 bg-neutral-800 text-[#B9BDC2] font-mono text-xs font-bold rounded uppercase hover:bg-neutral-700 transition"
              >
                Download Image
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
