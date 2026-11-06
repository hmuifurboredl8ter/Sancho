import React from 'react';
import { FileText, Download, Code, Layers, FileCheck, CheckCircle2 } from 'lucide-react';

export const SkillsSection = () => {
  const triggerDocxDownload = (templateName) => {
    alert(`Generating & downloading ${templateName}...`);
  };

  return (
    <div className="space-y-16">
      <div className="border-b border-neutral-800 pb-4">
        <h2 className="text-3xl font-black font-display tracking-wide uppercase text-[#E7E0D4]">
          Document Pipeline & Claude Skills
        </h2>
        <p className="text-sm text-[#B9BDC2]">
          Automated track sheets, release one-sheets, formal letters, cover letters, invoices, and rate sheets built with the bwb-docx engine.
        </p>
      </div>

      {/* 1. Track Sheet & Release One-Sheet DOCX */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
            Production Documents
          </h3>
          <p className="text-xs text-neutral-400">
            Real headings, real bullets, US Letter format. Titles use Impact, so they look right on any Windows or Mac with Office.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track Sheet */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#C5A36A] font-bold uppercase">STUDIO SPECIFICATION</span>
                <span className="text-neutral-500">1–2 PAGES US LETTER</span>
              </div>
              <h4 className="font-display font-black text-2xl uppercase text-[#E7E0D4]">
                Track Sheet DOCX
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                A one-to-two page Word document: track details, the 700-character sound description in a box, the tag guide, and the full tagged lyrics in a monospaced face.
              </p>
            </div>
            <button
              onClick={() => triggerDocxDownload("Track-Sheet.docx")}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#C5A36A] text-[#11100E] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d6b57c] transition shadow"
            >
              <Download className="w-4 h-4" /> Track sheet DOCX
            </button>
          </div>

          {/* Release One-Sheet */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#C5A36A] font-bold uppercase">PRESS & PLAYLISTS</span>
                <span className="text-neutral-500">SINGLE PAGE LETTER</span>
              </div>
              <h4 className="font-display font-black text-2xl uppercase text-[#E7E0D4]">
                Release One-Sheet DOCX
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                A single page for blogs, playlists and promoters: what the project is, how it sounds, release details and links. Fill the placeholders and send.
              </p>
            </div>
            <button
              onClick={() => triggerDocxDownload("Release-One-Sheet.docx")}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#C5A36A] text-[#11100E] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#d6b57c] transition shadow"
            >
              <Download className="w-4 h-4" /> One-sheet DOCX
            </button>
          </div>
        </div>

        {/* How a DOCX Gets Made Workflow */}
        <div className="p-6 rounded-xl bg-black border border-neutral-800 space-y-4">
          <span className="font-mono text-xs text-[#C5A36A] font-bold uppercase tracking-wider block">
            How a DOCX Gets Made
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 space-y-1">
              <span className="text-[#C2332B] font-bold block">1. Input</span>
              <p className="text-neutral-300 font-sans">Write the content in chat, or hand over a track.</p>
            </div>
            <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 space-y-1">
              <span className="text-[#C5A36A] font-bold block">2. Skill Build</span>
              <p className="text-neutral-300 font-sans">The bwb-docx skill builds the file with real heading styles, bullet numbering and brand colors.</p>
            </div>
            <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 space-y-1">
              <span className="text-[#B9BDC2] font-bold block">3. PDF Render</span>
              <p className="text-neutral-300 font-sans">The file is rendered to PDF and every page is checked.</p>
            </div>
            <div className="p-3 bg-neutral-900/80 rounded border border-neutral-800 space-y-1">
              <span className="text-emerald-400 font-bold block">4. Final Delivery</span>
              <p className="text-neutral-300 font-sans">You download it and open it in Word. Impact typography guaranteed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Skills and Reusable Instruction Files */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-bold font-display uppercase text-[#E7E0D4]">
            Claude Skills (SKILL.md)
          </h3>
          <p className="text-xs text-neutral-400">
            Reusable instruction files that teach Claude your workflows. Download one, put it in a folder named after the skill, rename the file to SKILL.md, and add it in Claude's skill settings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Formal Letter */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-[#C5A36A] font-bold uppercase">CORRESPONDENCE</span>
              <h5 className="font-display font-bold text-lg text-[#E7E0D4] uppercase">Formal Letter</h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                One page, three short paragraphs: why you're writing, the facts, the exact ask. Body stays plain so it reads as a letter first.
              </p>
            </div>
            <button
              onClick={() => triggerDocxDownload("Formal-Letter.docx")}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-[#E7E0D4] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Letter DOCX
            </button>
          </div>

          {/* Cover Letter */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-[#C5A36A] font-bold uppercase">APPLICATION</span>
              <h5 className="font-display font-bold text-lg text-[#E7E0D4] uppercase">Cover Letter</h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                The same frame with four paragraphs: the role and your strongest qualification, the evidence, the fit, and a clear close.
              </p>
            </div>
            <button
              onClick={() => triggerDocxDownload("Cover-Letter.docx")}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-[#E7E0D4] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Cover letter DOCX
            </button>
          </div>

          {/* Invoice */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-[#C2332B] font-bold uppercase">FINANCE TEMPLATE</span>
              <h5 className="font-display font-bold text-lg text-[#E7E0D4] uppercase">Invoice</h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                A print-ready PDF with a bill-to block, line items, totals and payment terms. Bracketed fields are yours to fill. Generic template only.
              </p>
            </div>
            <button
              onClick={() => triggerDocxDownload("Invoice-Template.pdf")}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-[#E7E0D4] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Invoice PDF
            </button>
          </div>

          {/* Rate Sheet */}
          <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-neutral-400 font-bold uppercase">COMMERCIAL</span>
              <h5 className="font-display font-bold text-lg text-[#E7E0D4] uppercase">Rate Sheet</h5>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                What you offer and what it costs, on one page. Send before the first call so conversation starts on scope, not price. Generic template only.
              </p>
            </div>
            <button
              onClick={() => triggerDocxDownload("Rate-Sheet-Template.pdf")}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-[#E7E0D4] font-mono text-xs font-bold rounded flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A36A]" /> Rate sheet PDF
            </button>
          </div>
        </div>
      </section>

      {/* Footer Notice */}
      <footer className="border-t border-neutral-800 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4">
        <span>Build While Bleeding brand portfolio v3.3 — development/design reference only, not public-facing.</span>
        <span className="text-[#C2332B] font-bold">Keep the ink moving.</span>
      </footer>
    </div>
  );
};
