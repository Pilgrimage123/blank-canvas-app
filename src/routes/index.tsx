import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const App = lazy(() => import("../App"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lovec bubáků — venkovské vymítání podle Josefa Lady" },
      {
        name: "description",
        content:
          "Karetní deckbuilder z Hrusic: vymítejte bubáky, hastrmany a čerty v malebném světě Josefa Lady.",
      },
      { property: "og:title", content: "Lovec bubáků" },
      {
        property: "og:description",
        content:
          "Karetní deckbuilder z Hrusic: vymítejte bubáky, hastrmany a čerty v malebném světě Josefa Lady.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function GameLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6eedb] text-[#1c1308]">
      <p className="text-lg font-black tracking-wide">Zapaluje se fajfka…</p>
    </div>
  );
}

function Index() {
  return (
    <ClientOnly fallback={<GameLoading />}>
      <Suspense fallback={<GameLoading />}>
        <App />
      </Suspense>
    </ClientOnly>
  );
}
