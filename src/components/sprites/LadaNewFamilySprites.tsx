import React from 'react';

const ink = '#1c1308';
const skin = '#e0aa79';

export function renderLadaNewFamilySprite(type: string, stage: number = 2): React.ReactNode | null {
  if (type === 'kmotra_liska') return renderFox(stage);
  if (type === 'cert_elegan') return renderElegantDevil(stage);
  if (type === 'lotr_intelektual') return renderIntellectualRobber(stage);
  return null;
}

function renderFox(stage: number) {
  const scarves = ['#4e91c6', '#d6a51f', '#bd3a28', '#6f4b91'];
  const scarf = scarves[stage] || scarves[2];
  const wearsGlasses = stage === 1 || stage === 3;
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Kmotra liška">
      <ellipse cx="60" cy="111" rx="37" ry="6" fill={ink} opacity="0.3" />
      <path d="M35 78 C15 78 8 60 22 48 C18 67 38 59 44 72 Z" fill="#d85b24" stroke={ink} strokeWidth="3.2" />
      <path d="M20 49 C14 58 18 66 27 66 C24 61 25 55 29 51 Z" fill="#f5e4c4" stroke={ink} strokeWidth="2" />
      <path d="M39 65 C32 77 33 98 43 106 L55 104 L60 79 Z" fill="#d85b24" stroke={ink} strokeWidth="3.2" />
      <path d="M81 65 C88 77 87 98 77 106 L65 104 L60 79 Z" fill="#c94b1d" stroke={ink} strokeWidth="3.2" />
      <path d="M39 59 Q60 50 81 59 L77 86 Q60 94 43 86 Z" fill="#eee2bd" stroke={ink} strokeWidth="3.2" />
      <path d="M37 62 Q60 71 83 62 L79 73 Q60 80 41 73 Z" fill={scarf} stroke={ink} strokeWidth="2.5" />
      <path d="M76 70 L91 91 L79 88 L72 75 Z" fill={scarf} stroke={ink} strokeWidth="2.5" />
      <path d="M38 40 L29 13 L51 27 Q60 21 69 27 L91 13 L82 42 Z" fill="#d85b24" stroke={ink} strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M34 20 L39 35 L49 28 Z M86 20 L81 35 L71 28 Z" fill="#552c24" />
      <path d="M39 38 Q60 27 81 38 Q82 57 60 65 Q38 57 39 38 Z" fill="#e9782e" stroke={ink} strokeWidth="3.2" />
      <path d="M48 48 Q60 43 72 48 L68 59 Q60 68 52 59 Z" fill="#f4dfbd" stroke={ink} strokeWidth="2" />
      <circle cx="60" cy="52" r="3.8" fill={ink} />
      <path d="M57 58 Q60 61 63 58" fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="50" cy="41" rx="4" ry="5" fill="#fff8e8" stroke={ink} strokeWidth="1.8" />
      <ellipse cx="70" cy="41" rx="4" ry="5" fill="#fff8e8" stroke={ink} strokeWidth="1.8" />
      <circle cx="51" cy="42" r="1.8" fill={ink} /><circle cx="69" cy="42" r="1.8" fill={ink} />
      {wearsGlasses && <g fill="none" stroke={stage === 3 ? '#d9a52b' : ink} strokeWidth="2"><circle cx="50" cy="41" r="7" /><circle cx="70" cy="41" r="7" /><path d="M57 41 H63 M43 39 L36 36 M77 39 L84 36" /></g>}
      {stage === 0 && <path d="M43 91 L52 92" stroke="#f5e4c4" strokeWidth="5" />}
      {stage === 2 && <g><path d="M82 73 Q101 67 103 75 Q101 81 84 80" fill="#a66d35" stroke={ink} strokeWidth="2.4" /><circle cx="102" cy="74" r="3" fill="#f4e2c1" /></g>}
      {stage === 3 && <path d="M43 30 Q60 13 77 30" fill="none" stroke="#d9a52b" strokeWidth="4" strokeLinecap="round" />}
    </svg>
  );
}

function renderElegantDevil(stage: number) {
  const coats = ['#345f9b', '#3f6331', '#382d4b', '#6f1f26'];
  const coat = coats[stage] || coats[2];
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Čert elegán">
      <ellipse cx="60" cy="112" rx="35" ry="6" fill={ink} opacity="0.32" />
      <path d="M42 87 L38 108 L54 108 L59 86 Z M78 87 L82 108 L66 108 L61 86 Z" fill="#242326" stroke={ink} strokeWidth="3" />
      <path d="M34 50 Q60 42 86 50 L82 91 Q60 100 38 91 Z" fill={coat} stroke={ink} strokeWidth="3.5" />
      <path d="M54 50 L60 69 L66 50" fill="#f5ead2" stroke={ink} strokeWidth="2.2" />
      <path d="M57 52 L60 61 L63 52 L66 68 L60 73 L54 68 Z" fill={stage >= 2 ? '#c4321d' : '#e6b82d'} stroke={ink} strokeWidth="1.6" />
      <circle cx="60" cy="35" r="17" fill="#2b282c" stroke={ink} strokeWidth="3.4" />
      <path d="M48 22 Q42 7 49 5 Q55 11 55 19 M72 22 Q78 7 71 5 Q65 11 65 19" fill="#e9d4a8" stroke={ink} strokeWidth="3" />
      <ellipse cx="54" cy="34" rx="4" ry="5" fill="#f7dc5b" stroke={ink} strokeWidth="1.7" /><ellipse cx="68" cy="34" rx="4" ry="5" fill="#f7dc5b" stroke={ink} strokeWidth="1.7" />
      <circle cx="55" cy="35" r="2" fill={ink} /><circle cx="67" cy="35" r="2" fill={ink} />
      <ellipse cx="61" cy="41" rx="4.2" ry="3.2" fill="#bd3827" stroke={ink} strokeWidth="2" />
      <path d="M52 45 Q60 51 69 45" fill="none" stroke="#f3dfbc" strokeWidth="2.2" />
      <path d="M35 54 Q22 66 30 80" fill="none" stroke={coat} strokeWidth="9" strokeLinecap="round" /><path d="M85 54 Q98 66 90 80" fill="none" stroke={coat} strokeWidth="9" strokeLinecap="round" />
      {stage === 0 && <g><path d="M36 25 Q60 16 84 25 L80 34 Q60 29 40 34 Z" fill="#466fa6" stroke={ink} strokeWidth="3" /><circle cx="60" cy="25" r="3" fill="#d5b23c" /></g>}
      {stage === 1 && <g><path d="M37 26 Q60 15 83 26 L78 34 H42 Z" fill="#3e5d2e" stroke={ink} strokeWidth="3" /><path d="M75 22 Q87 12 91 14 Q86 22 78 29" fill="#b54525" stroke={ink} strokeWidth="1.5" /></g>}
      {stage === 2 && <g><path d="M40 25 Q60 14 80 25 L76 32 H44 Z" fill="#27222f" stroke={ink} strokeWidth="3" /><path d="M34 77 L29 103" stroke={ink} strokeWidth="3" /><path d="M24 103 Q29 96 34 103" fill="none" stroke={ink} strokeWidth="2" /></g>}
      {stage === 3 && <g><path d="M43 23 L48 12 L57 20 L65 10 L72 21 L80 13 L78 29 Z" fill="#d9a52b" stroke={ink} strokeWidth="2.5" /><path d="M86 55 Q103 66 101 99" fill="none" stroke="#d9a52b" strokeWidth="3" /><circle cx="101" cy="102" r="4" fill="#d9a52b" stroke={ink} strokeWidth="2" /></g>}
      <path d="M79 92 Q99 99 104 86 Q109 75 100 69" fill="none" stroke="#2b282c" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function renderIntellectualRobber(stage: number) {
  const coats = ['#7184a1', '#566f47', '#73452e', '#312c3e'];
  const coat = coats[stage] || coats[2];
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" aria-label="Lotr intelektuál">
      <ellipse cx="60" cy="111" rx="36" ry="6" fill={ink} opacity="0.3" />
      <path d="M42 83 L39 108 H55 L59 83 Z M78 83 L81 108 H65 L61 83 Z" fill="#3e3028" stroke={ink} strokeWidth="3" />
      <path d="M34 48 Q60 42 86 48 L82 89 Q60 96 38 89 Z" fill={coat} stroke={ink} strokeWidth="3.4" />
      <path d="M51 48 L60 64 L69 48 L73 81 H47 Z" fill="#efe2c6" stroke={ink} strokeWidth="2.2" />
      <path d="M56 50 L60 58 L64 50" fill="#b83225" stroke={ink} strokeWidth="2" />
      <circle cx="60" cy="35" r="16" fill={skin} stroke={ink} strokeWidth="3.4" />
      <path d="M45 30 Q51 16 66 18 Q78 20 77 33 Q68 26 47 34 Z" fill="#3a2418" stroke={ink} strokeWidth="2.7" />
      <path d="M49 31 Q54 28 58 31 M63 31 Q68 28 72 31" fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="54" cy="35" r="3.5" fill="#fff8e8" stroke={ink} strokeWidth="1.5" /><circle cx="67" cy="35" r="3.5" fill="#fff8e8" stroke={ink} strokeWidth="1.5" />
      <circle cx="55" cy="35" r="1.5" fill={ink} /><circle cx="66" cy="35" r="1.5" fill={ink} />
      <ellipse cx="61" cy="40" rx="3.7" ry="3" fill="#c76a4d" stroke={ink} strokeWidth="1.8" />
      <path d="M54 44 Q60 47 67 44" fill="none" stroke={ink} strokeWidth="1.8" />
      <g fill="none" stroke={stage === 3 ? '#d8ad3c' : ink} strokeWidth="1.8"><circle cx="54" cy="35" r="6" /><circle cx="67" cy="35" r="6" /><path d="M60 35 H61" /></g>
      <path d="M39 55 Q25 66 32 79" fill="none" stroke={coat} strokeWidth="9" strokeLinecap="round" />
      <path d="M81 55 Q94 64 87 77" fill="none" stroke={coat} strokeWidth="9" strokeLinecap="round" />
      <g transform="rotate(-8 84 76)"><rect x="73" y="62" width="25" height="30" rx="2" fill={stage === 3 ? '#4d274f' : '#b23b2e'} stroke={ink} strokeWidth="2.5" /><path d="M78 68 H93 M78 73 H91" stroke="#eedcb0" strokeWidth="1.5" /></g>
      {stage === 0 && <path d="M43 23 Q60 13 77 23 L74 29 H46 Z" fill="#6c819f" stroke={ink} strokeWidth="2.5" />}
      {stage === 1 && <path d="M41 22 Q60 11 79 22 L76 29 H44 Z" fill="#506b42" stroke={ink} strokeWidth="2.5" />}
      {stage === 2 && <g><path d="M39 24 Q60 12 81 24 L77 31 H43 Z" fill="#34251d" stroke={ink} strokeWidth="2.8" /><path d="M75 20 Q86 13 90 16" stroke="#d2aa39" strokeWidth="2.5" /></g>}
      {stage === 3 && <g><path d="M39 23 Q60 10 81 23 L77 31 H43 Z" fill="#272331" stroke={ink} strokeWidth="2.8" /><path d="M48 16 Q60 7 72 16" fill="none" stroke="#d8ad3c" strokeWidth="2.5" /></g>}
      <path d="M79 89 L92 105" stroke={ink} strokeWidth="3" /><path d="M89 105 L97 105" stroke={ink} strokeWidth="3" />
    </svg>
  );
}