/**
 * Helper to download the standalone single-file HTML bundle of the game.
 */
export async function downloadGameHtml(
  onProgress?: (status: "loading" | "success" | "error", message?: string) => void
): Promise<void> {
  if (onProgress) {
    onProgress("loading", "Připravuji soubor ke stažení...");
  }

  try {
    const response = await fetch("/lovec-bubaku-hra.html");
    if (!response.ok) {
      throw new Error(`Chyba stažení (${response.status})`);
    }

    const htmlBlob = await response.blob();
    const downloadUrl = URL.createObjectURL(htmlBlob);

    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = "Lovec_Bubaku_Hra.html";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setTimeout(() => {
      URL.revokeObjectURL(downloadUrl);
    }, 2000);

    if (onProgress) {
      onProgress("success", "Hra byla úspěšně stažena jako 1 HTML soubor!");
    }
  } catch (err) {
    console.error("Direct fetch download failed, attempting direct link:", err);
    // Fallback: direct anchor link
    try {
      const anchor = document.createElement("a");
      anchor.href = "/lovec-bubaku-hra.html";
      anchor.download = "Lovec_Bubaku_Hra.html";
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      if (onProgress) {
        onProgress("success", "Stahování spuštěno!");
      }
    } catch (fallbackErr) {
      console.error("Fallback download failed:", fallbackErr);
      if (onProgress) {
        onProgress("error", "Nepodařilo se stáhnout soubor hry.");
      }
    }
  }
}
