import React from "react";
import { RunOptions } from "../../types";

interface OptionsScreenProps {
  options: RunOptions;
  onChangeOptions: (newOpts: RunOptions) => void;
  onBack: () => void;
  onOpenChangelog?: () => void;
}

export const OptionsScreen: React.FC<OptionsScreenProps> = ({
  options,
  onChangeOptions,
  onBack,
  onOpenChangelog,
}) => {
  const handleScaleChange = (val: number) => {
    onChangeOptions({ ...options, scale: val });
  };

  const handleStrengthChange = (val: number) => {
    onChangeOptions({ ...options, strength: val });
  };

  const handleDensityChange = (density: "adaptive" | "samota" | "hlidka" | "hejno") => {
    onChangeOptions({ ...options, density });
  };

  const handleSeedToggle = (seedOn: boolean) => {
    onChangeOptions({ ...options, seedOn });
  };

  const handleSeedChange = (seed: string) => {
    onChangeOptions({ ...options, seed });
  };

  const rollNewSeed = () => {
    const s = String(Math.floor(1000 + Math.random() * 9000));
    onChangeOptions({ ...options, seedOn: true, seed: s });
  };

  return (
    <div className="flex flex-col min-h-screen bg-parchment-pattern p-4 sm:p-6 select-none max-w-3xl mx-auto w-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b-2 border-[#1c1308] pb-4 mb-6">
        <div>
          <h2 className="font-title text-3xl font-black text-[#1c1308]">⚙️ Volby běhu</h2>
          <p className="text-xs sm:text-sm font-bold text-[#694825]">
            Přizpůsobte si obtížnost, chování bubáků a pevný seed putování.
          </p>
        </div>
        <button type="button" onClick={onBack} className="lada-button text-sm py-2 px-4">
          ⬅️ Zpět
        </button>
      </div>

      <div className="space-y-6 bg-[#fffaf0] p-6 rounded-2xl border-3 border-[#1c1308] shadow-[4px_6px_0_rgba(28,19,8,0.3)]">
        {/* 1. Scale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-lg font-bold text-[#1c1308]">
              Škálování zastávky (+{options.scale} % za úroveň)
            </h3>
            <span className="bg-[#fff8e8] px-3 py-1 rounded-full border border-[#1c1308] font-black text-sm text-[#8c5614]">
              +{options.scale}%
            </span>
          </div>
          <p className="text-xs font-semibold text-[#543b24]">
            Každá další vesnice a zastávka přidává bonus k životům i úderu bubáků. (Výchozí je +12
            %, 0 % škálování vypne).
          </p>
          <input
            type="range"
            min="0"
            max="40"
            step="1"
            value={options.scale}
            onChange={(e) => handleScaleChange(Number(e.target.value))}
            className="w-full accent-[#d69818] h-3 bg-[#e8cd92] rounded-lg cursor-pointer"
          />
        </div>

        {/* 2. Strength */}
        <div className="space-y-2 pt-4 border-t border-[#dfcb9a]">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-lg font-bold text-[#1c1308]">
              Celková síla bubáků (
              {options.strength > 0 ? `+${options.strength}` : options.strength} %)
            </h3>
            <span className="bg-[#fff8e8] px-3 py-1 rounded-full border border-[#1c1308] font-black text-sm text-[#b8331d]">
              {options.strength > 0 ? `+${options.strength}` : options.strength}%
            </span>
          </div>
          <p className="text-xs font-semibold text-[#543b24]">
            Samostatný bonus či postih k síle a životům bubáků nezávisle na zastávce (-30 % pro
            snazší hru, +30 % pro drsnější).
          </p>
          <input
            type="range"
            min="-30"
            max="30"
            step="5"
            value={options.strength}
            onChange={(e) => handleStrengthChange(Number(e.target.value))}
            className="w-full accent-[#c4321d] h-3 bg-[#e8cd92] rounded-lg cursor-pointer"
          />
        </div>

        {/* 3. Density */}
        <div className="space-y-2 pt-4 border-t border-[#dfcb9a]">
          <h3 className="font-title text-lg font-bold text-[#1c1308]">Hustota encounteru</h3>
          <p className="text-xs font-semibold text-[#543b24]">
            Určuje, kolik nepřátel se najednou postaví na scénu.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { id: "adaptive", label: "Adaptive (přirozená)" },
              { id: "samota", label: "Samota (1 bubák)" },
              { id: "hlidka", label: "Hlídka (2 bubáci)" },
              { id: "hejno", label: "Hejno (až 3 bubáci)" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleDensityChange(item.id as any)}
                className={`
                  p-2.5 rounded-xl border-2 text-xs font-bold text-center transition-all
                  ${options.density === item.id ? "bg-[#ffd438] border-[#1c1308] ring-2 ring-[#e69818] shadow-sm" : "bg-[#fff8e8] border-[#1c1308] opacity-75 hover:opacity-100"}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Seed */}
        <div className="space-y-2 pt-4 border-t border-[#dfcb9a]">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="opt-seed-check"
              checked={options.seedOn}
              onChange={(e) => handleSeedToggle(e.target.checked)}
              className="w-4 h-4 accent-[#d69818] rounded cursor-pointer"
            />
            <label
              htmlFor="opt-seed-check"
              className="font-title text-base font-bold text-[#1c1308] cursor-pointer"
            >
              Použít pevný seed pro opakovatelné putování
            </label>
          </div>
          <p className="text-xs font-semibold text-[#543b24]">
            Se stejným seedem vygeneruje mapa, křižovatky i šenk naprosto stejné rozložení.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={options.seed}
              disabled={!options.seedOn}
              onChange={(e) => handleSeedChange(e.target.value)}
              placeholder="např. Hrusice1848"
              className="bg-[#fff8e8] border-2 border-[#1c1308] rounded-xl px-3 py-2 text-sm font-bold text-[#1c1308] flex-1 disabled:opacity-50"
            />
            <button type="button" onClick={rollNewSeed} className="lada-button text-xs py-2 px-3">
              🎲 Nový
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        {onOpenChangelog && (
          <button
            type="button"
            onClick={onOpenChangelog}
            className="lada-button text-sm py-2 px-4 bg-[#f2e2be]"
            title="Otevřít kroniku změn a verzí"
          >
            📜 Kronika změn (v0.3.5)
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className="lada-button lada-button-primary text-base py-2.5 px-6 ml-auto"
        >
          Hotovo & Uložit
        </button>
      </div>
    </div>
  );
};
