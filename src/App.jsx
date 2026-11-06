import React, { useState } from 'react';
import { BrandSection } from './components/BrandSection';
import { MerchSection } from './components/MerchSection';
import { StudioControls } from './components/StudioControls';
import { BrandToolsSection } from './components/BrandToolsSection';
import { SkillsSection } from './components/SkillsSection';
import { EmblemSVG } from './assets/brandAssets';
import { Sliders, Palette, Package, FileText, Wrench } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('brand');

  const navItems = [
    { id: 'brand', label: 'Brand & Identity', icon: Palette },
    { id: 'merch', label: 'Merch & Physical', icon: Package },
    { id: 'studio', label: 'Studio Controls', icon: Sliders },
    { id: 'tools', label: 'Brand Tools & Copy', icon: Wrench },
    { id: 'skills', label: 'Documents & Skills', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#11100E] text-[#E7E0D4] selection:bg-[#C2332B] selection:text-white font-sans">
      {/* Top Brand Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#11100E]/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            onClick={() => setActiveTab('brand')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9">
              <EmblemSVG className="w-full h-full group-hover:rotate-12 transition-transform duration-300" arrowColor="#E7E0D4" withDrips={false} />
            </div>
            <span className="font-display font-black text-xl tracking-wider uppercase text-[#E7E0D4]">
              BUILD WHILE <span className="text-[#C2332B]">BLEEDING</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition ${
                    isActive
                      ? 'bg-[#C5A36A] text-[#11100E] shadow'
                      : 'text-neutral-400 hover:text-[#E7E0D4] hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="font-mono text-xs text-[#C5A36A] font-bold">
            v3.3
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-neutral-800 gap-1 bg-neutral-950">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1 rounded text-[11px] font-mono font-bold uppercase whitespace-nowrap flex items-center gap-1 transition ${
                  isActive
                    ? 'bg-[#C5A36A] text-[#11100E]'
                    : 'text-neutral-400'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'brand' && <BrandSection />}
        {activeTab === 'merch' && <MerchSection />}
        {activeTab === 'studio' && <StudioControls />}
        {activeTab === 'tools' && <BrandToolsSection />}
        {activeTab === 'skills' && <SkillsSection />}
      </main>
    </div>
  );
}
