# Blank Canvas App

"Create a minimal blank React app with an empty page."

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/46b96a62-b209-4721-8ce6-2f792ab22c78).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Zásada designu hrdinů (Hero Design Principle)

- **Žádná vazba na konkrétní karty**: Bonusy a pasivní schopnosti postav NESMÍ být vázány na konkrétní karty (žádné bonusy typu „+X k Bloku pro karty Kříž“).
- Schopnosti hrdinů jsou výhradně **obecné a systémové** (ovlivňují obecné kategorie karet jako `defend`/`prep`, začátek souboje jako počáteční Blok či Úhyb, dech a spánek, počet karet na startu nebo odklad nepřátel).

## Pravidla vývoje (Changelog Discipline)

- **Zápisy do changelogu**: Všechny změny v projektu se zapisují do `src/components/modals/ChangelogModal.tsx` (`CHANGELOG_DATA`).
- **Míra detailu záznamů**: Záznamy v changelogu se mají dělat **o něco méně detailní než doposud** — stručně, věcně a přehledně se zaměřením na podstatné novinky a opravy bez zbytečných technických podrobností.

## Kanonické časové zasazení (Lada Lore)

- Hra se odehrává přibližně **50 let před narozením Pepíka** (v polovině 19. století).
- Nevystupuje v ní **Pepík ani jeho kamarádi**, ani **Pulec a Bubáček** (ti se narodí až o generaci později).
- Starý hastrman **Brčál** i strašidlo **Mulisák** v tomto světě samozřejmě již přebývají a vystupují.

