import React from 'react';

interface CombatLogModalProps {
  logs: string[];
  onClose: () => void;
}

export const CombatLogModal: React.FC<CombatLogModalProps> = ({ logs, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1c1308]/60 flex items-center justify-center p-4 backdrop-blur-xs select-none">
      <div className="lada-card max-w-lg w-full max-h-[80vh] flex flex-col p-5 bg-[#fffdf5] border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)]">
        <div className="flex items-center justify-between border-b-2 border-[#1c1308] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <h3 className="font-title text-2xl font-black text-[#1c1308]">
              Bojový deník
            </h3>
          </div>
          <button type="button" onClick={onClose} className="lada-button text-xs py-1.5 px-3">
            Zavřít ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 p-2 bg-[#f4ebd0] rounded-xl border border-[#1c1308] text-xs font-semibold text-[#1c1308]">
          {logs.length === 0 ? (
            <div className="py-8 text-center text-[#705638] italic">
              Zatím nebyl zaznamenán žádný úder ani kouzlo.
            </div>
          ) : (
            logs.map((entry, idx) => (
              <div key={idx} className="p-1.5 border-b border-[#dfcb9a] last:border-b-0">
                • {entry}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
