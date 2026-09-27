# Mythoris — strona (Vite + React + TypeScript)

Ta wersja używa Vite zamiast Next.js — dużo lżejsza instalacja (brak
platformowych binarek SWC, mniej zależności), szybszy start deweloperski.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona wystartuje pod adresem, który pokaże terminal (domyślnie `http://localhost:5173`).

## Build produkcyjny

```bash
npm run build
npm run preview
```

`npm run build` tworzy statyczne pliki w folderze `dist/` — możesz je wrzucić
na dowolny hosting statyczny (Vercel, Netlify, Cloudflare Pages, zwykły serwer WWW).

## Struktura

- `src/pages/HomePage.tsx` — strona główna (Nav, Hero, Gameplay, Community, Footer, Toast)
- `src/pages/DiscordRedirectPage.tsx` — strona przekierowująca na Discord, trasa `/discord`
- `src/App.tsx` — routing (react-router-dom)
- `src/globals.css` — cały styl (te same tokeny co w poprzednich wersjach)
- `src/components/` — komponenty React
- `src/context/SiteProvider.tsx` — stan języka (PL/EN), mobilne menu, kopiowanie IP + toast
- `src/content.ts` — wszystkie teksty PL/EN, adres serwera, link Discord, wersja MC

## Uwaga dot. hostingu z routingiem

Ponieważ `/discord` to trasa obsługiwana po stronie klienta (react-router),
przy wdrażaniu na hosting statyczny musisz skonfigurować przekierowanie
wszystkich adresów do `index.html` (tzw. SPA fallback) — inaczej bezpośrednie
wejście na `mythoris.eu/discord` zwróci błąd 404. Większość hostingów
(Vercel, Netlify, Cloudflare Pages) robi to automatycznie dla projektów Vite/SPA.

## Co jest gotowe do uzupełnienia

W `src/components/Community.tsx` statystyki graczy/gildii/online mają placeholder
`t.community.miniPlaceholder` ("WKRÓTCE" / "COMING SOON") — podmień je na realne dane,
gdy będziesz je mieć.

Treści (PL/EN) edytujesz w jednym miejscu: `src/content.ts`.
