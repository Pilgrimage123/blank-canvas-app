import React from 'react';
import { LocationId } from '../../types';

interface LadaLandscapeProps {
  locId: LocationId | string;
  className?: string;
  height?: number;
}

export const LadaLandscape: React.FC<LadaLandscapeProps> = ({
  locId,
  className = '',
  height = 96
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-xl border-3 border-[#1c1308] bg-[#eadebd] relative shadow-inner ${className}`} style={{ height }}>
      {renderLandscapeSvg(locId)}
    </div>
  );
};

function renderLandscapeSvg(locId: string) {
  switch (locId) {
    case 'mlyn':
      return (
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Sky */}
          <rect width="600" height="100" fill="#a8cde8" />
          {/* Distant green hills */}
          <path d="M0 65 Q140 38 320 60 Q460 40 600 62 L600 100 L0 100 Z" fill="#6d9e52" stroke="#1c1308" strokeWidth="2" />
          
          {/* Mill Stream / River */}
          <path d="M180 100 Q240 70 380 75 Q480 80 560 100 Z" fill="#4d7fa3" stroke="#1c1308" strokeWidth="2.5" />
          
          {/* Watermill Cottage */}
          <rect x="250" y="38" width="85" height="46" fill="#f4ebd0" stroke="#1c1308" strokeWidth="3" />
          {/* Red shingle roof */}
          <polygon points="240,40 292,14 345,40" fill="#c43b22" stroke="#1c1308" strokeWidth="3" />
          {/* Smoking chimney */}
          <rect x="260" y="16" width="10" height="18" fill="#8f4a38" stroke="#1c1308" strokeWidth="2" />
          <circle cx="265" cy="10" r="4" fill="#ffffff" opacity="0.8" />
          <circle cx="270" cy="4" r="5" fill="#ffffff" opacity="0.7" />
          {/* Windows with cross-bars */}
          <rect x="264" y="50" width="16" height="16" fill="#3a5a78" stroke="#1c1308" strokeWidth="2" />
          <line x1="272" y1="50" x2="272" y2="66" stroke="#f4ebd0" strokeWidth="1.5" />
          <line x1="264" y1="58" x2="280" y2="58" stroke="#f4ebd0" strokeWidth="1.5" />
          {/* Wooden door */}
          <rect x="296" y="56" width="14" height="28" fill="#6e4624" stroke="#1c1308" strokeWidth="2" />

          {/* Wooden Water Wheel (Mlýnské kolo) */}
          <g transform="translate(350, 68)">
            <circle cx="0" cy="0" r="22" fill="#54361e" stroke="#1c1308" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="#a8cde8" stroke="#1c1308" strokeWidth="2" />
            <line x1="-20" y1="0" x2="20" y2="0" stroke="#1c1308" strokeWidth="2.5" />
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#1c1308" strokeWidth="2.5" />
            <line x1="-14" y1="-14" x2="14" y2="14" stroke="#1c1308" strokeWidth="2" />
            <line x1="-14" y1="14" x2="14" y2="-14" stroke="#1c1308" strokeWidth="2" />
          </g>

          {/* Pollarded Willows (Hlavaté vrby) */}
          <g transform="translate(100, 48)">
            <path d="M12 40 C14 20 6 8 16 0 C24 8 18 20 20 40 Z" fill="#5a3d24" stroke="#1c1308" strokeWidth="3" />
            {/* Sprouting green shoots */}
            <path d="M16 2 Q2 4 0 20 M16 2 Q10 -12 6 -16 M16 2 Q26 -14 30 -12 M16 2 Q32 8 36 22" fill="none" stroke="#487834" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'les':
      return (
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Evening sky */}
          <rect width="600" height="100" fill="#88b5b8" />
          {/* Deep green forest background */}
          <path d="M0 60 Q120 40 240 54 Q380 34 600 50 L600 100 L0 100 Z" fill="#2d522c" stroke="#1c1308" strokeWidth="2" />

          {/* Lada Pine trees */}
          <g transform="translate(80, 20)">
            <polygon points="20,0 4,45 36,45" fill="#1b3d1f" stroke="#1c1308" strokeWidth="2.5" />
            <polygon points="20,-16 8,24 32,24" fill="#224a27" stroke="#1c1308" strokeWidth="2.5" />
            <rect x="17" y="45" width="6" height="28" fill="#4a2c14" stroke="#1c1308" strokeWidth="2" />
          </g>
          <g transform="translate(160, 26)">
            <polygon points="20,0 4,45 36,45" fill="#1b3d1f" stroke="#1c1308" strokeWidth="2.5" />
            <polygon points="20,-16 8,24 32,24" fill="#224a27" stroke="#1c1308" strokeWidth="2.5" />
            <rect x="17" y="45" width="6" height="26" fill="#4a2c14" stroke="#1c1308" strokeWidth="2" />
          </g>
          <g transform="translate(420, 16)">
            <polygon points="20,0 4,45 36,45" fill="#1b3d1f" stroke="#1c1308" strokeWidth="2.5" />
            <polygon points="20,-16 8,24 32,24" fill="#224a27" stroke="#1c1308" strokeWidth="2.5" />
            <rect x="17" y="45" width="6" height="32" fill="#4a2c14" stroke="#1c1308" strokeWidth="2" />
          </g>

          {/* Mossy knolls */}
          <path d="M0 80 Q180 62 360 76 Q480 68 600 84 L600 100 L0 100 Z" fill="#3f7236" stroke="#1c1308" strokeWidth="2.5" />

          {/* Fairy-tale toadstool mushrooms (Muchomůrky) */}
          <g transform="translate(260, 72)">
            <rect x="10" y="10" width="5" height="14" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
            <ellipse cx="12.5" cy="10" rx="10" ry="7" fill="#d93d25" stroke="#1c1308" strokeWidth="2" />
            <circle cx="8" cy="8" r="1.5" fill="#ffffff" />
            <circle cx="14" cy="7" r="1.5" fill="#ffffff" />
            <circle cx="17" cy="11" r="1" fill="#ffffff" />
          </g>
          <g transform="translate(282, 76)">
            <rect x="8" y="8" width="4" height="12" fill="#ffffff" stroke="#1c1308" strokeWidth="1.5" />
            <ellipse cx="10" cy="8" rx="8" ry="5.5" fill="#d93d25" stroke="#1c1308" strokeWidth="2" />
            <circle cx="7" cy="6" r="1.2" fill="#ffffff" />
            <circle cx="12" cy="7" r="1.2" fill="#ffffff" />
          </g>
        </svg>
      );

    case 'rybnik':
    case 'boss':
      return (
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Twilight sky */}
          <rect width="600" height="100" fill={locId === 'boss' ? '#1c2838' : '#6f9ab8'} />
          
          {/* Full Moon */}
          <circle cx="480" cy="24" r="16" fill="#f8e58a" stroke="#1c1308" strokeWidth="2" />
          <circle cx="484" cy="22" r="14" fill={locId === 'boss' ? '#1c2838' : '#6f9ab8'} />

          {/* Far hills & Village Church Spire */}
          <path d="M0 65 Q180 50 340 62 Q460 52 600 64 L600 100 L0 100 Z" fill="#2d4a36" stroke="#1c1308" strokeWidth="2" />
          {/* Church tower with baroque onion dome (Cibulovitá báň) */}
          <g transform="translate(220, 30)">
            <rect x="6" y="16" width="14" height="24" fill="#e8dec5" stroke="#1c1308" strokeWidth="2" />
            <path d="M13 0 C10 6 6 8 8 16 L18 16 C20 8 16 6 13 0 Z" fill="#bf432b" stroke="#1c1308" strokeWidth="1.5" />
            <line x1="13" y1="0" x2="13" y2="-4" stroke="#1c1308" strokeWidth="1.5" />
          </g>

          {/* Pond water (Hladina rybníka) */}
          <path d="M0 72 Q160 64 320 70 Q480 62 600 72 L600 100 L0 100 Z" fill="#22425a" stroke="#1c1308" strokeWidth="3" />
          {/* Water ripples */}
          <line x1="140" y1="82" x2="200" y2="82" stroke="#5d8ba8" strokeWidth="2" strokeLinecap="round" />
          <line x1="380" y1="86" x2="460" y2="86" stroke="#5d8ba8" strokeWidth="2" strokeLinecap="round" />

          {/* Bulrushes (Orobiniec) */}
          <g transform="translate(80, 56)">
            <line x1="8" y1="36" x2="6" y2="6" stroke="#3a6632" strokeWidth="2.5" />
            <rect x="4" y="8" width="4" height="14" rx="2" fill="#54361e" stroke="#1c1308" strokeWidth="1.5" />
            <line x1="16" y1="38" x2="18" y2="10" stroke="#3a6632" strokeWidth="2.5" />
            <rect x="16" y="12" width="4" height="14" rx="2" fill="#54361e" stroke="#1c1308" strokeWidth="1.5" />
          </g>

          {/* Big Pollarded Willow (Hlavatá vrba nad tůní) */}
          <g transform="translate(490, 36)">
            <path d="M22 55 C24 30 16 14 26 2 C36 14 28 30 30 55 Z" fill="#4d321c" stroke="#1c1308" strokeWidth="3" />
            {/* Willow branches drooping towards water */}
            <path d="M26 4 Q4 10 0 38 M26 4 Q14 -10 10 -18 M26 4 Q38 -12 44 -8 M26 4 Q48 12 52 42" fill="none" stroke="#3a662e" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'zricenina':
      return (
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Crimson Sunset sky */}
          <rect width="600" height="100" fill="#d4795b" />
          
          {/* Steep hill */}
          <path d="M0 80 Q160 55 360 50 Q480 54 600 75 L600 100 L0 100 Z" fill="#525c48" stroke="#1c1308" strokeWidth="2.5" />

          {/* Castle Tower Ruin (Hradní zřícenina) */}
          <g transform="translate(320, 22)">
            {/* Main stone bastion */}
            <rect x="20" y="18" width="56" height="52" fill="#756b5d" stroke="#1c1308" strokeWidth="3" />
            {/* Crenellations (Cimbuří) */}
            <rect x="18" y="8" width="14" height="12" fill="#756b5d" stroke="#1c1308" strokeWidth="2.5" />
            <rect x="42" y="8" width="14" height="12" fill="#756b5d" stroke="#1c1308" strokeWidth="2.5" />
            <rect x="64" y="8" width="14" height="12" fill="#756b5d" stroke="#1c1308" strokeWidth="2.5" />
            {/* Gothic arched window loophole */}
            <path d="M42 30 C42 22 52 22 52 30 L52 46 L42 46 Z" fill="#241c14" stroke="#1c1308" strokeWidth="2" />
            {/* Ivy creeping on wall */}
            <path d="M22 65 Q28 45 24 35 Q30 38 28 50" fill="none" stroke="#2e5926" strokeWidth="3" />
          </g>

          {/* Raven on wooden signpost */}
          <g transform="translate(140, 60)">
            <line x1="20" y1="0" x2="20" y2="36" stroke="#4d321c" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="20" cy="-2" rx="6" ry="4" fill="#1c1308" />
            <polygon points="26,-2 30,-3 26,-1" fill="#c48a25" />
          </g>
        </svg>
      );

    case 'hrbitov':
      return (
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Spooky violet twilight */}
          <rect width="600" height="100" fill="#353b52" />
          {/* Twinkling stars */}
          <circle cx="100" cy="18" r="1.5" fill="#f8e58a" />
          <circle cx="280" cy="14" r="1.5" fill="#f8e58a" />
          <circle cx="500" cy="20" r="1.5" fill="#f8e58a" />

          {/* Grassy Cemetery Mounds */}
          <path d="M0 75 Q140 60 300 70 Q460 62 600 75 L600 100 L0 100 Z" fill="#2d382e" stroke="#1c1308" strokeWidth="2.5" />

          {/* Stone & Wooden Crosses (Kříže na hrobech) */}
          <g transform="translate(120, 52)">
            <line x1="16" y1="0" x2="16" y2="34" stroke="#808a94" strokeWidth="4" strokeLinecap="round" />
            <line x1="8" y1="10" x2="24" y2="10" stroke="#808a94" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g transform="translate(240, 48)">
            <line x1="16" y1="0" x2="16" y2="38" stroke="#5a3d24" strokeWidth="4" strokeLinecap="round" />
            <line x1="6" y1="12" x2="26" y2="12" stroke="#5a3d24" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g transform="translate(380, 50)">
            <line x1="16" y1="0" x2="16" y2="36" stroke="#808a94" strokeWidth="4" strokeLinecap="round" />
            <line x1="8" y1="10" x2="24" y2="10" stroke="#808a94" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Stone cemetery wall */}
          <path d="M440 68 L580 68 L580 95 L440 95 Z" fill="#525863" stroke="#1c1308" strokeWidth="2.5" />
          <line x1="480" y1="68" x2="480" y2="95" stroke="#1c1308" strokeWidth="1.5" />
          <line x1="530" y1="68" x2="530" y2="95" stroke="#1c1308" strokeWidth="1.5" />
        </svg>
      );

    case 'vesnice':
    default:
      return (
        <svg viewBox="0 0 600 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Clear Sky */}
          <rect width="600" height="100" fill="#90c2e6" />
          {/* Sun with golden rim */}
          <circle cx="80" cy="24" r="15" fill="#f4c23c" stroke="#1c1308" strokeWidth="2" />

          {/* Rolling Bohemian hills */}
          <path d="M0 65 Q160 42 340 58 Q480 40 600 60 L600 100 L0 100 Z" fill="#699e4f" stroke="#1c1308" strokeWidth="2" />

          {/* Distant Hrusice Church Spire */}
          <g transform="translate(430, 24)">
            <rect x="6" y="16" width="16" height="28" fill="#f5ede0" stroke="#1c1308" strokeWidth="2" />
            <polygon points="5,16 14,0 23,16" fill="#bf3822" stroke="#1c1308" strokeWidth="2" />
            <line x1="14" y1="0" x2="14" y2="-4" stroke="#1c1308" strokeWidth="1.5" />
            <line x1="12" y1="-2" x2="16" y2="-2" stroke="#1c1308" strokeWidth="1.5" />
          </g>

          {/* Cozy Whitewashed Roubenka Cottage */}
          <g transform="translate(210, 36)">
            {/* Wall */}
            <rect x="0" y="18" width="76" height="40" fill="#fcf6e6" stroke="#1c1308" strokeWidth="3" />
            {/* Red shingle roof */}
            <polygon points="-8,20 38,-4 84,20" fill="#c4321d" stroke="#1c1308" strokeWidth="3" />
            {/* Chimney with cute rounded smoke puffs */}
            <rect x="14" y="0" width="10" height="14" fill="#8f4a38" stroke="#1c1308" strokeWidth="2" />
            <circle cx="19" cy="-5" r="4.2" fill="#ffffff" stroke="#1c1308" strokeWidth="1" className="anim-chimney-smoke-1" />
            <circle cx="24" cy="-14" r="6" fill="#ffffff" stroke="#1c1308" strokeWidth="1" className="anim-chimney-smoke-2" />
            <circle cx="30" cy="-24" r="8" fill="#ffffff" stroke="#1c1308" strokeWidth="1" className="anim-chimney-smoke-3" />
            {/* Windows with warm glowing curtains */}
            <rect x="12" y="28" width="16" height="16" fill="#4d7296" stroke="#1c1308" strokeWidth="2" />
            <rect x="48" y="28" width="16" height="16" fill="#4d7296" stroke="#1c1308" strokeWidth="2" />
            <line x1="20" y1="28" x2="20" y2="44" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="12" y1="36" x2="28" y2="36" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="56" y1="28" x2="56" y2="44" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="48" y1="36" x2="64" y2="36" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* Wooden Picket Fence (Plaňkový plot) */}
          <g transform="translate(130, 68)">
            <line x1="0" y1="12" x2="60" y2="12" stroke="#1c1308" strokeWidth="2" />
            <line x1="0" y1="22" x2="60" y2="22" stroke="#1c1308" strokeWidth="2" />
            <polygon points="6,28 10,6 14,28" fill="#d9aa68" stroke="#1c1308" strokeWidth="1.5" />
            <polygon points="20,28 24,4 28,28" fill="#d9aa68" stroke="#1c1308" strokeWidth="1.5" />
            <polygon points="34,28 38,6 42,28" fill="#d9aa68" stroke="#1c1308" strokeWidth="1.5" />
            <polygon points="48,28 52,4 56,28" fill="#d9aa68" stroke="#1c1308" strokeWidth="1.5" />
          </g>
        </svg>
      );
  }
}
