import React, { useState } from 'react';
import { EmblemSVG } from '../assets/brandAssets';
import { Play, Pause, Disc, Download, Shirt, Tag, Volume2 } from 'lucide-react';

export const MerchSection = () => {
  const [coverTheme, setCoverTheme] = useState('dark'); // 'dark' or 'bone'
  const [isPlaying, setIsPlaying] = useState(false);

  const downloadCoverSVG = (variant) => {
    alert(`Downloading Single Cover SVG (${variant})...`);
  };

  const downloadStickerSVG = () => {
    alert("Downloading Die-Cut Laptop Sticker SVG with 4mm white bleed margin...");
  };

  return (
    <div className="space-y-16">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
          Physical Formats & Merchandise
        </h2>
        <p className="text-sm text-[#B9BDC2]">
          Single streaming cover, 12-inch vinyl sleeve with red-label record, cassette tape, chest-print apparel, and die-cut laptop sticker.
        </p>
      </div>

      {/* 1. Single Cover & Streaming Player */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
              Single Cover (Streaming)
            </h3>
            <p className="text-xs text-neutral-400">
              Square art for streaming. The emblem fills the frame and the title sits on a red bar, so it still reads at thumbnail size.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-neutral-900 p-1 rounded-lg border border-neutral-800 flex text-xs font-mono">
              <button
                onClick={() => setCoverTheme('dark')}
                className={`px-3 py-1 rounded font-bold transition ${coverTheme === 'dark' ? 'bg-[#11100E] text-[#E7E0D4] border border-neutral-700' : 'text-neutral-400'}`}
              >
                Dark Variant
              </button>
              <button
                onClick={() => setCoverTheme('bone')}
                className={`px-3 py-1 rounded font-bold transition ${coverTheme === 'bone' ? 'bg-[#E7E0D4] text-[#11100E]' : 'text-neutral-400'}`}
              >
                Bone Variant
              </button>
            </div>
            <button
              onClick={() => downloadCoverSVG('dark')}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Cover SVG (dark)
            </button>
            <button
              onClick={() => downloadCoverSVG('bone')}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded bg-neutral-800 text-[#E7E0D4] hover:bg-neutral-700 transition flex items-center gap-1"
            >
              <Download className="w-3 h-3 text-[#C5A36A]" /> Cover SVG (bone)
            </button>
          </div>
        </div>

        {/* Streaming Player Mockup */}
        <div className="max-w-xl mx-auto rounded-2xl overflow-hidden border border-neutral-800 bg-[#161513] shadow-2xl p-6 space-y-6">
          {/* Cover Square Art */}
          <div
            className={`w-full aspect-square rounded-xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 transition-colors duration-300 ${
              coverTheme === 'dark' ? 'bg-[#11100E] text-[#E7E0D4] border border-neutral-800' : 'bg-[#E7E0D4] text-[#11100E] border border-neutral-300'
            }`}
          >
            {/* Background Texture grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-between">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-px bg-current h-full" />
              ))}
            </div>

            <div className="relative z-10 flex justify-between items-center text-xs font-mono">
              <span className="font-bold tracking-widest uppercase">CAT. BWB-001</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${coverTheme === 'dark' ? 'bg-neutral-900 text-[#C5A36A]' : 'bg-neutral-300 text-black'}`}>
                HI-RES MASTER
              </span>
            </div>

            {/* Emblem Centered */}
            <div className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 mx-auto my-auto py-2">
              <EmblemSVG
                className="w-full h-full drop-shadow-2xl"
                arrowColor={coverTheme === 'dark' ? "#E7E0D4" : "#11100E"}
                withDrips={true}
              />
            </div>

            {/* Red Bar with Title */}
            <div className="relative z-10 bg-[#C2332B] text-white px-4 py-2.5 rounded shadow-lg flex items-center justify-between">
              <span className="font-display font-black text-xl sm:text-2xl uppercase tracking-wider truncate">
                Title goes here
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/90 ml-2">
                Ryan Real AF
              </span>
            </div>
          </div>

          {/* Streaming Audio Controls */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-display font-black text-2xl uppercase text-[#E7E0D4]">
                  Title goes here
                </h4>
                <p className="font-sans text-xs text-[#C5A36A] font-semibold">
                  Ryan Real AF · Build While Bleeding
                </p>
              </div>
              <div className="text-right font-mono text-xs text-neutral-400">
                <span>{isPlaying ? "2:11" : "1:24"}</span> / 3:41
              </div>
            </div>

            {/* Scrubber Bar */}
            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-[#C2332B] h-full rounded-full transition-all duration-300"
                style={{ width: isPlaying ? '58%' : '38%' }}
              />
            </div>

            {/* Media Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                FLAC 24-BIT / 96KHZ
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-[#C5A36A] text-[#11100E] flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-lg"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
              </div>
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                STEREO MASTER
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Vinyl and Tape */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
            Vinyl and Tape
          </h3>
          <p className="text-xs text-neutral-400">
            The same cover becomes a 12-inch sleeve with a red-label record, and a bone cassette for limited runs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* 12-inch Vinyl Sleeve & Record */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-4">
            <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase">
              12" Vinyl LP & Red-Label Record
            </span>

            <div className="relative w-72 h-64 flex items-center justify-center">
              {/* Vinyl Disc Sliding Out */}
              <div className="absolute right-0 w-52 h-52 rounded-full bg-[#0a0a0a] border-4 border-neutral-800 shadow-2xl flex items-center justify-center animate-spin-slow">
                {/* Grooves */}
                <div className="w-44 h-44 rounded-full border border-neutral-700/40 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full border border-neutral-700/40 flex items-center justify-center">
                    {/* Red Center Label */}
                    <div className="w-20 h-20 rounded-full bg-[#C2332B] border-2 border-neutral-900 flex flex-col items-center justify-center text-center p-1 text-white shadow-inner">
                      <span className="font-display text-[9px] font-black uppercase leading-tight">BWB RECORD</span>
                      <div className="w-3 h-3 rounded-full bg-[#11100E] my-0.5 border border-white/40" />
                      <span className="font-mono text-[6px] uppercase text-neutral-200">33⅓ RPM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outer Cardboard Jacket */}
              <div className="absolute left-0 w-56 h-56 bg-[#11100E] border-2 border-neutral-800 rounded shadow-2xl p-4 flex flex-col justify-between z-10">
                <div className="flex justify-between items-center text-[9px] font-mono text-[#B9BDC2]">
                  <span>STEREO 12" LP</span>
                  <span className="text-[#C5A36A]">BWB-VINYL</span>
                </div>
                <div className="w-24 h-24 mx-auto">
                  <EmblemSVG className="w-full h-full" arrowColor="#E7E0D4" withDrips={true} />
                </div>
                <div className="bg-[#C2332B] text-white px-2 py-1 text-[10px] font-display font-black uppercase tracking-wider rounded">
                  Ryan Real AF — Heavy Session
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-neutral-400 text-center">
              Heavyweight 180g black wax with rust-red center spindle label and matte sleeve finish.
            </p>
          </div>

          {/* Bone Cassette Tape */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center space-y-4">
            <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase">
              Limited Run Bone Cassette Tape
            </span>

            {/* Cassette Body */}
            <div className="w-72 h-44 bg-[#E7E0D4] rounded-lg border-2 border-neutral-400 shadow-2xl p-3 flex flex-col justify-between text-[#11100E] relative">
              {/* Top Screw Holes */}
              <div className="flex justify-between px-1">
                <div className="w-2 h-2 rounded-full border border-neutral-500 bg-neutral-300" />
                <div className="w-2 h-2 rounded-full border border-neutral-500 bg-neutral-300" />
              </div>

              {/* Tape Label Sticker */}
              <div className="bg-[#11100E] text-[#E7E0D4] rounded p-2 border border-neutral-800 flex flex-col justify-between h-28 mx-1">
                <div className="flex justify-between items-center text-[8px] font-mono">
                  <span className="text-[#C2332B] font-bold">SIDE A · C-60</span>
                  <span className="text-[#C5A36A]">BUILD WHILE BLEEDING</span>
                </div>

                {/* Spool Windows */}
                <div className="bg-neutral-800/80 rounded-full py-1 px-4 flex items-center justify-between border border-neutral-700 mx-3">
                  <div className="w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center bg-black">
                    <div className="w-2 h-2 rounded bg-white/60" />
                  </div>
                  <div className="w-16 h-3 bg-amber-950/40 rounded border border-neutral-600 flex items-center justify-center text-[7px] font-mono text-amber-500/80">
                    ||||||||||||
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-white/50 flex items-center justify-center bg-black">
                    <div className="w-2 h-2 rounded bg-white/60" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[8px] font-display font-bold uppercase">
                  <span>Ryan Real AF</span>
                  <span className="text-neutral-400 font-mono">DOLBY B NR</span>
                </div>
              </div>

              {/* Bottom Trapezoid guide */}
              <div className="w-24 h-2 bg-neutral-400/60 mx-auto rounded-b" />
            </div>

            <p className="text-[11px] font-mono text-neutral-400 text-center">
              Off-white bone shell casing with asphalt screen-printed foil face for boutique runs.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Tees and Stickers */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b border-neutral-800 pb-3 gap-2">
          <div>
            <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
              Tees and Stickers
            </h3>
            <p className="text-xs text-neutral-400">
              The emblem as a chest print on dark and bone tees, and a die-cut sticker with a white border that survives a laptop lid.
            </p>
          </div>
          <button
            onClick={downloadStickerSVG}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 text-[#E7E0D4] font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-700 transition shadow"
          >
            <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Sticker SVG
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dark Tee */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center space-y-4">
            <span className="font-mono text-xs text-[#C5A36A] font-bold">ASPHALT CHEST PRINT TEE</span>
            <div className="w-48 h-48 bg-[#11100E] rounded-2xl border border-neutral-800 shadow-xl flex items-center justify-center relative p-6">
              {/* T-shirt Silhouette Outline */}
              <div className="w-20 h-20">
                <EmblemSVG className="w-full h-full" arrowColor="#E7E0D4" withDrips={true} />
              </div>
              <div className="absolute bottom-3 text-center">
                <span className="font-display font-black text-xs text-[#E7E0D4] uppercase tracking-wider">
                  BUILD WHILE <span className="text-[#C2332B]">BLEEDING</span>
                </span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 text-center">
              100% heavy combed cotton, asphalt #11100E with discharge metallic and rust ink print.
            </p>
          </div>

          {/* Bone Tee */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center space-y-4">
            <span className="font-mono text-xs text-[#C5A36A] font-bold">BONE CHEST PRINT TEE</span>
            <div className="w-48 h-48 bg-[#E7E0D4] rounded-2xl border border-neutral-300 shadow-xl flex items-center justify-center relative p-6">
              <div className="w-20 h-20">
                <EmblemSVG className="w-full h-full" arrowColor="#11100E" withDrips={true} />
              </div>
              <div className="absolute bottom-3 text-center">
                <span className="font-display font-black text-xs text-[#11100E] uppercase tracking-wider">
                  BUILD WHILE <span className="text-[#C2332B]">BLEEDING</span>
                </span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 text-center">
              Raw vintage unbleached bone jersey with crisp asphalt linework and bleeding rust droplets.
            </p>
          </div>

          {/* Die-Cut Laptop Sticker */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center space-y-4">
            <span className="font-mono text-xs text-[#C5A36A] font-bold">DIE-CUT LAPTOP STICKER</span>
            <div className="w-48 h-48 bg-[#202020] rounded-2xl border border-dashed border-neutral-700 flex items-center justify-center relative p-4">
              {/* White Die-cut Border Wrapper */}
              <div className="p-3 bg-white rounded-full shadow-2xl border-2 border-neutral-200">
                <div className="w-24 h-24 bg-[#11100E] rounded-full p-2 flex items-center justify-center">
                  <EmblemSVG className="w-full h-full" arrowColor="#E7E0D4" withDrips={true} />
                </div>
              </div>
            </div>
            <p className="text-[11px] font-mono text-neutral-400 text-center">
              Heavy 6mil vinyl with 4mm white kiss-cut border, weatherproof UV & scratch laminate.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
