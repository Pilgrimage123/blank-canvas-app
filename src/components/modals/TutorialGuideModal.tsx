import React from "react";

interface TutorialGuideModalProps {
  onClose: () => void;
}

export const TutorialGuideModal: React.FC<TutorialGuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1c1308]/65 flex items-center justify-center p-4 backdrop-blur-xs select-none">
      <div className="lada-card max-w-xl w-full max-h-[85vh] flex flex-col p-6 bg-[#fffdf7] border-4 shadow-[8px_10px_0_rgba(28,19,8,0.4)]">
        <div className="flex items-center justify-between border-b-2 border-[#1c1308] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <h3 className="font-title text-2xl font-black text-[#1c1308]">
              Jak se hraje Lovec bubáků
            </h3>
          </div>
          <button type="button" onClick={onClose} className="lada-button text-xs py-1.5 px-3">
            Zavřít ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 text-xs sm:text-sm font-semibold text-[#382613] leading-relaxed">
          <div className="bg-[#f6ebd0] p-3 rounded-xl border border-[#1c1308]">
            <h4 className="font-title text-base font-black text-[#1c1308] mb-1">
              ⚡ Akce a Nádech
            </h4>
            <p>
              Akce spotřebováváte zahráním karet. Samy od sebe se po kole nedobíjejí! Dobíjíte je
              tlačítkem <b>Nádech</b>. Nádech vám sice doplní Akce, ale přidá <b>Únavu</b>. Čím
              vyšší Únavu máte, tím slabší jsou další nádechy.
            </p>
          </div>

          <div className="bg-[#f6ebd0] p-3 rounded-xl border border-[#1c1308]">
            <h4 className="font-title text-base font-black text-[#1c1308] mb-1">
              ⏳ Augenblicky (čas)
            </h4>
            <p>
              Čas ve hře měříme v <b>Augenblicích</b> (Aug). Vy i každý bubák máte svůj vlastní
              odpočet „kdy jednám příště“. Většina karet lovce má nápřah 2 Aug (např. hodit sůl trvá
              chvilku), bylinkový odvar působí hned. Tlačítko <b>Mrknutí</b> posune čas o 1 Aug
              vpřed bez Akcí, když vyčkáváte.
            </p>
          </div>

          <div className="bg-[#f6ebd0] p-3 rounded-xl border border-[#1c1308]">
            <h4 className="font-title text-base font-black text-[#1c1308] mb-1">
              ⚡ Připravenost a 3× zrychlený rozběh
            </h4>
            <p>
              Před zahájením souboje mají lovec i bubáci zpoždění rovné{" "}
              <b>(50 − Připravenost) Aug</b>. Kdo má vyšší Připravenost (Kostelník 28, Pobuda 25,
              Bylinkářka 22), začíná dříve! Dokud nikdo nejedná,{" "}
              <b>běží čas trojnásobnou rychlostí (3×)</b>, takže rozběh střetu je svižný a plynulý.
            </p>
          </div>

          <div className="bg-[#f6ebd0] p-3 rounded-xl border border-[#1c1308]">
            <h4 className="font-title text-base font-black text-[#1c1308] mb-1">
              😴 Spánek a Kochání
            </h4>
            <p>
              <b>Spánek</b> vás zbaví velké porce Únavy, ale zabere 3 Aug.
              <b>Kochání se krásou krajiny</b> vám umožní ulevit si od 1 Únavy, když je bubák ještě
              daleko od úderu.
            </p>
          </div>

          <div className="bg-[#f6ebd0] p-3 rounded-xl border border-[#1c1308]">
            <h4 className="font-title text-base font-black text-[#1c1308] mb-1">
              🧂 Zranění a Odolnost
            </h4>
            <p>
              Každý bod zranění, který projde skrz Blok bubáka, mu přidá +1 Aug do jeho odpočtu a
              oddálí jeho útok! Jeho <b>Odolnost</b> však část tohoto zpoždění pohltí. Solné karty
              navíc nakládají <b>Sůl na kůži</b>, která bubáka pálí každé 3 Augenblicky.
            </p>
          </div>

          <div className="bg-[#f6ebd0] p-3 rounded-xl border border-[#1c1308]">
            <h4 className="font-title text-base font-black text-[#1c1308] mb-1">
              🧭 Putování krajem a Krejcary
            </h4>
            <p>
              Na mapě volíte cesty a uzly (hospoda, farář, poklad, zkratka). V hospodě můžete za{" "}
              <b>krejcary</b> nakupovat nové karty, vylepšovat staré či vyhazovat slabé.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#dfcb9a] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="lada-button lada-button-primary text-sm py-2 px-6"
          >
            Vše je jasné, jdu na bubáky! ➔
          </button>
        </div>
      </div>
    </div>
  );
};
