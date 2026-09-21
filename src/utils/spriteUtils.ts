/**
 * Pomocné funkce pro měřítka a velikostní proporce stádií bubáků (Josef Lada styl).
 *
 * Velikostní odlišení jednotlivých stádií:
 * Přesně 12 procent za každé stádium:
 * - Stádium 0 (Mládě / Churavý / Neduživý): 76 % (-24 % od základu)
 * - Stádium 1 (Pokročilý / Tlející / Vyhublý): 88 % (-12 % od základu)
 * - Stádium 2 (Původní / Dospělý / Standard): 100 % (Základní velikost)
 * - Stádium 3 (Elitní / Pán / Kníže): 112 % (+12 % od základu)
 */

export function getStageScale(stageIndex: number, type?: string): number {
  if (type === "cert_elegan") return 1;
  const stage = Math.max(0, Math.min(3, stageIndex));
  return 1 + (stage - 2) * 0.12;
}

export function getStagePercent(stageIndex: number, type?: string): number {
  return Math.round(getStageScale(stageIndex, type) * 100);
}
