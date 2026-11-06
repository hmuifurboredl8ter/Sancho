// Canonical Color Palette
export const BRAND_COLORS = [
  {
    name: "Asphalt",
    hex: "#11100E",
    role: "Primary dark foundation",
    textClass: "text-[#E7E0D4]",
    bgClass: "bg-[#11100E]",
    borderClass: "border-neutral-800",
    description: "Deep, absorbing carbon black. Grounding tone for backgrounds, shadows, and base surfaces."
  },
  {
    name: "Bone",
    hex: "#E7E0D4",
    role: "Light foundation and readable contrast",
    textClass: "text-[#11100E]",
    bgClass: "bg-[#E7E0D4]",
    borderClass: "border-neutral-300",
    description: "Unbleached parchment tone. High contrast foundation for light themes, paper textures, and typography."
  },
  {
    name: "Rust",
    hex: "#C2332B",
    role: "Reserve for large “bleeding” type and shapes, not small text",
    textClass: "text-white",
    bgClass: "bg-[#C2332B]",
    borderClass: "border-red-900",
    description: "The bloodline of the brand. High impact, saturated iron red for headlines, bleeding glyphs, record states, and critical actions."
  },
  {
    name: "Bronze",
    hex: "#C5A36A",
    role: "Emphasis and primary actions",
    textClass: "text-[#11100E]",
    bgClass: "bg-[#C5A36A]",
    borderClass: "border-amber-700",
    description: "Warm antique metallic. Carries interactive focus, transport buttons, fader caps, and metering peak ceilings."
  },
  {
    name: "Chrome",
    hex: "#B9BDC2",
    role: "Metallic accents",
    textClass: "text-[#11100E]",
    bgClass: "bg-[#B9BDC2]",
    borderClass: "border-neutral-400",
    description: "Industrial brushed silver. Accents rings, transport chassis, knobs, and secondary UI hardware."
  }
];

// SVG Emblem Generator / Component
export const EmblemSVG = ({
  className = "w-24 h-24",
  ringColor = "url(#chromeGrad)",
  waveformColor = "#C2332B",
  arrowColor = "#E7E0D4",
  withDrips = true,
  bgColor = "transparent"
}) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="chromeGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="25%" stopColor="#B9BDC2" />
        <stop offset="50%" stopColor="#7E838B" />
        <stop offset="75%" stopColor="#DDE1E5" />
        <stop offset="100%" stopColor="#8E939A" />
      </linearGradient>
      <linearGradient id="chromeRim" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E5E8EC" />
        <stop offset="50%" stopColor="#989DA4" />
        <stop offset="100%" stopColor="#F0F3F6" />
      </linearGradient>
      <linearGradient id="rustBleed" x1="100" y1="60" x2="100" y2="190" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#E2473D" />
        <stop offset="60%" stopColor="#C2332B" />
        <stop offset="100%" stopColor="#871A14" />
      </linearGradient>
      <filter id="metallicShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
      </filter>
    </defs>

    {bgColor !== "transparent" && (
      <rect width="200" height="200" rx="12" fill={bgColor} />
    )}

    {/* Outer Chrome Bevel Ring */}
    <circle
      cx="100"
      cy="100"
      r="82"
      stroke="url(#chromeRim)"
      strokeWidth="10"
      strokeLinecap="round"
      filter="url(#metallicShadow)"
    />
    {/* Inner Precision Ring */}
    <circle
      cx="100"
      cy="100"
      r="72"
      stroke="#11100E"
      strokeWidth="2"
      strokeDasharray="4 2"
      opacity="0.6"
    />

    {/* Central Sound Waveform (horizontal pulses) */}
    <g transform="translate(100, 100)">
      {[-50, -38, -26, -14, -4, 6, 18, 30, 42, 52].map((x, i) => {
        const heights = [14, 28, 46, 68, 86, 76, 54, 38, 22, 12];
        const h = heights[i];
        return (
          <rect
            key={i}
            x={x - 2.5}
            y={-h / 2}
            width="5"
            height={h}
            rx="2.5"
            fill={waveformColor}
            opacity="0.95"
          />
        );
      })}
    </g>

    {/* Two Crossing Diagonal Arrows Cutting Through */}
    {/* Arrow 1: Upper-left to bottom-right */}
    <g transform="rotate(35 100 100)">
      {/* Shaft */}
      <line x1="18" y1="100" x2="182" y2="100" stroke={arrowColor} strokeWidth="6" strokeLinecap="square" />
      {/* Arrowhead Right */}
      <polygon points="182,100 162,90 168,100 162,110" fill={arrowColor} />
      {/* Back Barb Left */}
      <polygon points="18,100 34,92 28,100 34,108" fill={arrowColor} />
    </g>

    {/* Arrow 2: Lower-left to top-right */}
    <g transform="rotate(-35 100 100)">
      {/* Shaft */}
      <line x1="18" y1="100" x2="182" y2="100" stroke={arrowColor} strokeWidth="6" strokeLinecap="square" />
      {/* Arrowhead Right */}
      <polygon points="182,100 162,90 168,100 162,110" fill={arrowColor} />
      {/* Back Barb Left */}
      <polygon points="18,100 34,92 28,100 34,108" fill={arrowColor} />
    </g>

    {/* Central Splatter / Wound Core */}
    <circle cx="100" cy="100" r="14" fill="#C2332B" stroke="#11100E" strokeWidth="2.5" />
    <circle cx="100" cy="100" r="6" fill="#E7E0D4" />

    {/* Bleeding Ink Drips */}
    {withDrips && (
      <g fill="url(#rustBleed)">
        {/* Main Center Drip */}
        <path d="M 97,112 C 96,135 94,155 94,170 C 94,175 97,180 100,180 C 103,180 106,175 106,170 C 106,155 104,135 103,112 Z" />
        {/* Secondary Left Drip */}
        <path d="M 80,108 C 79,122 77,136 77,146 C 77,150 79,153 82,153 C 85,153 87,150 87,146 C 87,136 85,122 84,108 Z" opacity="0.85" />
        {/* Third Right Drip */}
        <path d="M 116,110 C 117,126 119,142 119,156 C 119,161 121,164 124,164 C 127,164 129,161 129,156 C 129,142 127,126 126,110 Z" opacity="0.9" />
        {/* Droplets */}
        <circle cx="100" cy="192" r="3.5" />
        <circle cx="82" cy="162" r="2.5" />
        <circle cx="124" cy="173" r="2.5" />
      </g>
    )}
  </svg>
);

// Full Lockup Component (Emblem + Wordmark)
export const BrandLockup = ({ variant = "dark", className = "h-16" }) => {
  const isDark = variant === "dark";
  const bg = isDark ? "#11100E" : "#E7E0D4";
  const textColor = isDark ? "#E7E0D4" : "#11100E";
  const rustColor = "#C2332B";
  const chromeTone = isDark ? "#B9BDC2" : "#7E838B";

  return (
    <div className={`inline-flex items-center gap-4 px-4 py-2 rounded-lg ${isDark ? 'bg-[#11100E] border border-neutral-800' : 'bg-[#E7E0D4] border border-neutral-300'} ${className}`}>
      <div className="w-12 h-12 flex-shrink-0">
        <EmblemSVG
          className="w-full h-full"
          arrowColor={isDark ? "#E7E0D4" : "#11100E"}
          withDrips={true}
        />
      </div>
      <div className="flex flex-col select-none leading-none">
        <span
          style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
          className="text-2xl md:text-3xl font-black tracking-wider uppercase text-left"
        >
          <span style={{ color: textColor }}>BUILD WHILE </span>
          <span style={{ color: rustColor }}>BLEEDING</span>
        </span>
        <span
          style={{ fontFamily: "'Libre Franklin', sans-serif", color: chromeTone }}
          className="text-[10px] tracking-widest font-semibold uppercase mt-0.5"
        >
          Tools · Theory · Field Reports · Maps
        </span>
      </div>
    </div>
  );
};
