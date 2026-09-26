import React, { useState } from "react";
import { EnemySprite } from "../sprites/EnemySprite";
import { downloadGameHtml } from "../../utils/downloadGameHtml";

interface TitleScreenProps {
  onNewRun: () => void;
  onContinue: () => void;
  hasSavedRun: boolean;
  onTraining: () => void;
  onMovie: () => void;
  onIntro: () => void;
  onOptions: () => void;
  onChangelog: () => void;
  onTest: () => void;
  onBestiary?: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onNewRun,
  onContinue,
  hasSavedRun,
  onTraining,
  onMovie,
  onIntro,
  onOptions,
  onChangelog,
  onTest,
  onBestiary,
}) => {
  const [downloadMsg, setDownloadMsg] = useState<{
    status: "loading" | "success" | "error";
    text: string;
  } | null>(null);

  const handleDownload = () => {
    downloadGameHtml((status, message) => {
      setDownloadMsg({ status, text: message || "" });
      if (status === "success" || status === "error") {
        setTimeout(() => setDownloadMsg(null), 4000);
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-parchment-pattern p-4 select-none relative overflow-y-auto">
      {/* Wooden Signboard Menu Card */}
      <div className="lada-card max-w-xl w-full p-6 sm:p-8 flex flex-col items-center border-4 shadow-[8px_10px_0_rgba(28,19,8,0.38)] my-auto">
        {/* Folk Header with small sprites */}
        <div className="flex items-center justify-between w-full border-b-2 border-[#1c1308] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <EnemySprite type="rarasek" size={48} />
            <div>
              <h2 className="font-title text-2xl sm:text-3xl font-black text-[#1c1308] leading-tight">
                Lovec bubáků
              </h2>
              <span className="text-xs font-bold text-[#694825]">
                podle Josefa Lady (Bubáci a hastrmani)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onChangelog}
              className="lada-button text-xs py-1 px-2.5 bg-[#f5e4bc]"
              title="Kronika novinek a změn (Changelog)"
            >
              📜 Kronika změn
            </button>
            <button
              type="button"
              onClick={onOptions}
              className="lada-button text-xs py-1 px-2.5"
              title="Nastavení škálování, hustoty a seedu"
            >
              ⚙️ Volby
            </button>
          </div>
        </div>

        <p className="text-center text-sm font-semibold text-[#4a3420] mb-6 max-w-md">
          Vyberte si venkovského hrdinu se slánkou, křížkem či odvarem a vydejte se přes Hrusice,
          Klapáčův mlýn až k Černé tůni.
        </p>

        {/* Action Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mb-4">
          <button
            type="button"
            onClick={onNewRun}
            className="lada-button lada-button-primary text-base py-3"
          >
            🚶 Nové putování
          </button>

          <button
            type="button"
            onClick={onContinue}
            disabled={!hasSavedRun}
            className={`lada-button text-base py-3 ${hasSavedRun ? "lada-button-good" : ""}`}
            title={hasSavedRun ? "Pokračovat v rozehraném putování" : "Žádné uložené putování"}
          >
            ▶️ Pokračovat {hasSavedRun ? "" : "(prázdné)"}
          </button>

          {/* Test & Bestiary Buttons */}
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={onTest}
              className="lada-button text-base py-2.5 bg-[#ffd438] hover:bg-[#ffe066] border-2 border-[#1c1308] font-black text-[#1c1308] shadow-[0_3px_0_#1c1308] flex items-center justify-center gap-2"
              title="Otevřít zkušebnu s testovacím soubojem pro 8 bubáků"
            >
              <span className="text-xl">🧪</span>
              <span>Test</span>
            </button>

            {onBestiary && (
              <button
                type="button"
                onClick={onBestiary}
                className="lada-button text-base py-2.5 bg-[#fff8e8] hover:bg-[#ffd438] border-2 border-[#1c1308] font-black text-[#1c1308] shadow-[0_3px_0_#1c1308] flex items-center justify-center gap-2"
                title="Otevřít přehled všech rodin a druhů bubáků"
              >
                <span className="text-xl">📖</span>
                <span>Přehled bubáků</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onTraining}
            className="lada-button text-sm py-2.5"
            title="Krokovaný výcvik s farářem a cvičným bubákem"
          >
            🎓 Školení faráře
          </button>

          <button
            type="button"
            onClick={onMovie}
            className="lada-button text-sm py-2.5"
            title="Automatická ukázka boje, karet a Augenblicku"
          >
            🎬 Video výcvik
          </button>

          <button
            type="button"
            onClick={onIntro}
            className="lada-button text-sm py-2.5"
            title="Vysvětlení Akcí, Augenblicků, Únavy a mapy"
          >
            📖 Pravidla & nápověda
          </button>

          <button
            type="button"
            onClick={onChangelog}
            className="lada-button text-sm py-2.5"
            title="Přehled verzí a pohádkových novinek"
          >
            📜 Kronika novinek (Changelog)
          </button>

          {/* Download Standalone Single-file Game Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="lada-button text-sm py-2.5 bg-[#eaf4dc] hover:bg-[#d8edbe] border-2 border-[#1c1308] font-black text-[#1c1308] shadow-[0_3px_0_#1c1308] flex items-center justify-center gap-2 sm:col-span-2 cursor-pointer transition-colors"
            title="Stáhnout celou hru v jediném HTML souboru (hraje i offline bez internetu)"
          >
            <span className="text-lg">📥</span>
            <span>Stáhnout celou hru (1 samostatný HTML soubor)</span>
          </button>
        </div>

        {/* Download notification */}
        {downloadMsg && (
          <div
            className={`w-full max-w-md mb-3 py-2 px-3 rounded-xl border-2 text-xs font-black text-center flex items-center justify-center gap-2 transition-all ${
              downloadMsg.status === "loading"
                ? "bg-[#fff8d4] border-[#d69818] text-[#7a4e0a]"
                : downloadMsg.status === "success"
                  ? "bg-[#e2f7d8] border-[#2e6629] text-[#1c5017]"
                  : "bg-[#fde2de] border-[#c23318] text-[#8a1a08]"
            }`}
          >
            <span>{downloadMsg.status === "loading" ? "⏳" : downloadMsg.status === "success" ? "✅" : "⚠️"}</span>
            <span>{downloadMsg.text}</span>
          </div>
        )}

        {/* Small folk footer */}
        <div className="flex items-center gap-4 text-xs font-bold text-[#694825] mt-2 border-t border-[#d8c498] pt-3 w-full justify-center">
          <span>🌱 Akce a Nádech</span>
          <span>·</span>
          <span>⏳ Čas v Augenblicích</span>
          <span>·</span>
          <span>🧂 Sůl a kříž</span>
          <span>·</span>
          <button
            type="button"
            onClick={onChangelog}
            className="underline hover:text-[#1c1308] cursor-pointer"
          >
            v0.9.6
          </button>
        </div>
      </div>
    </div>
  );
};
