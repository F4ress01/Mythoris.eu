export type Locale = "pl" | "en";

export interface SiteContent {
  nav: {
    gameplay: string;
    discord: string;
    community: string;
  };
  hero: {
    eyebrow: string;
    tagline: string;
    joinLabel: string;
    copy: string;
    btnJoin: string;
    btnExplore: string;
    statMode: string;
    statModeValue: string;
    statVersion: string;
  };
  gameplay: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
  };
  discordSection: {
    kicker: string;
    title: string;
    lede: string;
    btnJoin: string;
  };
  community: {
    kicker: string;
    title: string;
    lede: string;
    btnCopyIp: string;
    miniPlaceholder: string;
    miniPlayers: string;
    miniGuilds: string;
    miniOnline: string;
    miniOnlineYes: string;
  };
  rules: {
    kicker: string;
    title: string;
    intro: string;
    sections: { heading: string; items: string[] }[];
    note: string;
  };
  footer: {
    copyright: string;
    rules: string;
  };
  toast: string;
  discord: {
    msg: string;
    btn: string;
    fallbackText: string;
  };
  shop: {
    eyebrow: string;
    title: string;
    msg: string;
    btnHome: string;
    btnDiscord: string;
  };
}

export const SERVER_IP = "mythoris.eu";
export const DISCORD_URL = "https://discord.gg/8875JXWfRE";
export const MC_VERSION = "1.21.11+";

export const content: Record<Locale, SiteContent> = {
  pl: {
    nav: {
      gameplay: "Rozgrywka",
      discord: "Discord",
      community: "Społeczność",
    },
    hero: {
      eyebrow: "☒ SERWER MINECRAFT MMORPG ☒",
      tagline:
        "Mythoris to serwer MMORPG, na którym levelujesz swoją postać, wykonujesz questy i zdobywasz coraz lepszy ekwipunek. Bez presji — możesz grać na chillu, a gdy najdzie Cię ochota, zmierzyć się z ciężkimi bossami.",
      joinLabel: "IP SERWERA",
      copy: "KOPIUJ",
      btnJoin: "Dołącz do serwera",
      btnExplore: "Zobacz rozgrywkę",
      statMode: "TRYB GRY",
      statModeValue: "MMORPG",
      statVersion: "WERSJA MINECRAFT",
    },
    gameplay: {
      kicker: "ROZGRYWKA",
      title: "Jak wygląda gra na Mythoris",
      p1: "Wykonuj questy, zdobywaj doświadczenie i rozwijaj swoją postać. Zbieraj coraz lepszy ekwipunek podczas eksploracji i walk z bossami.",
      p2: "Jeśli lubisz zaryzykować, sprawdź rozbudowany system hazardu na serwerze.",
    },
    discordSection: {
      kicker: "DISCORD",
      title: "Dołącz do naszego Discorda",
      lede: "To tam znajdziesz aktualne informacje o serwerze, ogłoszenia i resztę społeczności Mythoris.",
      btnJoin: "DOŁĄCZ NA DISCORDZIE",
    },
    community: {
      kicker: "SPOŁECZNOŚĆ",
      title: "Dołącz do Mythoris",
      lede: "Skopiuj adres serwera i wskocz na Mythoris razem z resztą graczy.",
      btnCopyIp: "KOPIUJ IP: MYTHORIS.EU",
      miniPlaceholder: "WKRÓTCE",
      miniPlayers: "GRACZY ONLINE",
      miniGuilds: "AKTYWNYCH GILDII",
      miniOnline: "SERWER ONLINE",
      miniOnlineYes: "ONLINE",
    },
    rules: {
      kicker: "REGULAMIN",
      title: "Regulamin serwera",
      intro:
        "Grając na Mythoris, akceptujesz poniższe zasady. Administracja może je aktualizować — zmiany obowiązują od momentu publikacji.",
      sections: [
        {
          heading: "Zasady ogólne",
          items: [
            "Szanuj innych graczy i członków administracji.",
            "Zakazane jest oszukiwanie: używanie cheatów, X-ray, dupe'ów i innych nieuczciwych metod.",
            "Zakazane jest posiadanie więcej niż jednego konta w celu omijania kar lub zdobywania nieuczciwej przewagi.",
          ],
        },
        {
          heading: "Czat i komunikacja",
          items: [
            "Zakazane są mowa nienawiści, treści dyskryminujące oraz spam.",
            "Reklamowanie innych serwerów lub usług bez zgody administracji jest zabronione.",
          ],
        },
        {
          heading: "Świat gry",
          items: [
            "Nie niszcz budowli innych graczy (griefing) bez ich zgody.",
            "Kradzież z budowli i skrzyń nieoznaczonych jako publiczne jest zabroniona.",
          ],
        },
        {
          heading: "System hazardu",
          items: [
            "Korzystanie z systemu hazardu jest całkowicie dobrowolne.",
            "Administracja nie zwraca wirtualnej waluty ani przedmiotów utraconych w hazardzie.",
          ],
        },
        {
          heading: "Kary",
          items: [
            "W zależności od wagi przewinienia administracja może zastosować ostrzeżenie, wyciszenie, wyrzucenie z serwera lub bana czasowego bądź stałego.",
            "Decyzje administracji są ostateczne. Odwołania można składać na Discordzie.",
          ],
        },
      ],
      note: "Regulamin jest w trakcie dopracowywania i może się zmieniać wraz z rozwojem serwera.",
    },
    footer: {
      copyright: "MYTHORIS NIE JEST POWIĄZANE Z MOJANG STUDIOS ANI MICROSOFT.",
      rules: "REGULAMIN",
    },
    toast: "SKOPIOWANO IP SERWERA",
    discord: {
      msg: "Przenosimy Cię na serwer Discord…",
      btn: "OTWÓRZ DISCORD RĘCZNIE",
      fallbackText: "Nie działa? Wróć na",
    },
    shop: {
      eyebrow: "☒ SKLEP MYTHORIS ☒",
      title: "Sklep jest w budowie",
      msg: "Pracujemy nad sklepem Mythoris. Wróć tu wkrótce — na razie zapraszamy na główną stronę serwera albo na Discorda.",
      btnHome: "STRONA GŁÓWNA",
      btnDiscord: "DISCORD",
    },
  },
  en: {
    nav: {
      gameplay: "Gameplay",
      discord: "Discord",
      community: "Community",
    },
    hero: {
      eyebrow: "☒ MINECRAFT MMORPG SERVER ☒",
      tagline:
        "Mythoris is an MMORPG server where you level up your character, complete quests, and gather increasingly better gear. No pressure — play at your own pace, and take on tough bosses whenever you feel like it.",
      joinLabel: "SERVER IP",
      copy: "COPY",
      btnJoin: "Join the server",
      btnExplore: "See the gameplay",
      statMode: "GAME MODE",
      statModeValue: "MMORPG",
      statVersion: "MINECRAFT VERSION",
    },
    gameplay: {
      kicker: "GAMEPLAY",
      title: "What playing on Mythoris looks like",
      p1: "Complete quests, earn experience, and grow your character. Gather increasingly better gear as you explore and fight bosses.",
      p2: "If you like taking risks, check out the server's extensive gambling system.",
    },
    discordSection: {
      kicker: "DISCORD",
      title: "Join our Discord",
      lede: "That's where you'll find the latest server info, announcements, and the rest of the Mythoris community.",
      btnJoin: "JOIN ON DISCORD",
    },
    community: {
      kicker: "COMMUNITY",
      title: "Join Mythoris",
      lede: "Copy the server address and hop on Mythoris with the rest of the players.",
      btnCopyIp: "COPY IP: MYTHORIS.EU",
      miniPlaceholder: "COMING SOON",
      miniPlayers: "PLAYERS ONLINE",
      miniGuilds: "ACTIVE GUILDS",
      miniOnline: "SERVER ONLINE",
      miniOnlineYes: "ONLINE",
    },
    rules: {
      kicker: "RULES",
      title: "Server rules",
      intro:
        "By playing on Mythoris, you agree to the rules below. The administration may update them — changes apply as soon as they're published.",
      sections: [
        {
          heading: "General rules",
          items: [
            "Respect other players and staff members.",
            "Cheating is forbidden: no cheat clients, X-ray, duping, or other unfair methods.",
            "Owning more than one account to bypass punishments or gain an unfair advantage is forbidden.",
          ],
        },
        {
          heading: "Chat & communication",
          items: [
            "Hate speech, discriminatory content, and spam are forbidden.",
            "Advertising other servers or services without staff permission is forbidden.",
          ],
        },
        {
          heading: "In-game world",
          items: [
            "Don't destroy other players' builds (griefing) without their permission.",
            "Stealing from builds or chests not marked as public is forbidden.",
          ],
        },
        {
          heading: "Gambling system",
          items: [
            "Using the gambling system is entirely voluntary.",
            "The administration does not refund virtual currency or items lost while gambling.",
          ],
        },
        {
          heading: "Punishments",
          items: [
            "Depending on the severity of the offense, staff may issue a warning, mute, kick, or a temporary or permanent ban.",
            "Staff decisions are final. Appeals can be submitted on Discord.",
          ],
        },
      ],
      note: "These rules are still being refined and may change as the server develops.",
    },
    footer: {
      copyright: "MYTHORIS IS NOT AFFILIATED WITH MOJANG STUDIOS OR MICROSOFT.",
      rules: "RULES",
    },
    toast: "SERVER IP COPIED",
    discord: {
      msg: "Taking you to the Discord server…",
      btn: "OPEN DISCORD MANUALLY",
      fallbackText: "Not working? Go back to",
    },
    shop: {
      eyebrow: "☒ MYTHORIS SHOP ☒",
      title: "The shop is under construction",
      msg: "We're working on the Mythoris shop. Check back soon — in the meantime, check out the main site or join the Discord.",
      btnHome: "HOME PAGE",
      btnDiscord: "DISCORD",
    },
  },
};
