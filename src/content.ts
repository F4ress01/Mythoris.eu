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
    sections: { heading: string; lead?: string; items: string[] }[];
    note: string;
  };
  packs: {
    kicker: string;
    title: string;
    intro: string;
    loading: string;
    empty: string;
    error: string;
    download: string;
    copyUrl: string;
    apiLabel: string;
    version: string;
  };
  footer: {
    copyright: string;
    rules: string;
    packs: string;
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
      title: "REGULAMIN Mythoris.eu",
      intro: "Ostatnia zmiana: 27.10.2026r.",
      sections: [
        {
          heading: "§1. Postanowienia ogólne",
          items: [
            "Dołączając na serwer, akceptujesz poniższy regulamin i zobowiązujesz się do jego przestrzegania.",
            "Nieznajomość regulaminu lub niewiedza o jego istnieniu nie zwalnia z odpowiedzialności za jego łamanie.",
            "Administracja ma prawo do ukarania gracza w sytuacjach nieujętych w regulaminie, jeśli jego działanie działa na szkodę serwera lub społeczności.",
            "Regulamin może zostać zmieniony bez wcześniejszego informowania.",
            "Regulamin jest własnością serwera i zakazuje się jego kopiowania.",
          ],
        },
        {
          heading: "§2. Discord",
          items: [
            "Zakaz spamowania/floodowania.",
            "Zakaz podszywania się pod administrację.",
            "Zakaz upubliczniania danych osobowych innych użytkowników lub kogokolwiek.",
            "Nie nadużywaj obrażania, wyzywania i poniżania innych (w jakikolwiek sposób), a także używania słów/emotek wulgarnie nacechowanych.",
            "Nazwa oraz profilowe użytkownika musi być odpowiednia.",
            "Zakaz poruszania tematów wulgarnych/rasistowskich/erotycznych/religijnych/politycznych itp.",
            "Zakazane jest wysyłanie plików lub linków zawierających treści wulgarne/rasistowskie/pornograficzne/religijne itp.",
            "Zakaz handlu prawdziwą walutą.",
            "Zakaz reklamowania się.",
            "Zakaz pingowania administracji.",
            "Zakaz cytowania wiadomości łamiących regulamin oraz ich rozprzestrzeniania.",
            "Zakaz streamowania treści nieetycznych i materiałów ujawniających cudze dane.",
          ],
        },
        {
          heading: "§3. Minecraft",
          items: [
            "Zakaz używania wspomagaczy/cheatów (także ich posiadania) oraz współpracowania z osobami z nich korzystających. Jeśli nie jesteś pewny czy mod/skrypt jest dozwolony zapytaj o to innych graczy lub na tickecie.",
            "Nie wolno posiadać multikont.",
            "Zakaz reklamowania się.",
            "Zakaz podszywania się pod innych graczy oraz administrację.",
            "Zakaz wykorzystywania błędów serwera/gry. Wszelkie błędy trzeba zgłosić do administracji, a ich nie zgłoszenie jest zaliczane za wykorzystywanie ich.",
            "Zakaz posiadania obraźliwych/wulgarnych/negatywnie nacechowanych nicków, skinów i akcesoriów.",
            "Zakaz wysyłania wiadomości, które są wulgarne/obraźliwe/nacechowane negatywnie oraz mogących urazić innych użytkowników.",
            "Zakaz wysyłania linków niebędących własnością Mythoris.eu lub z nim związane.",
            "Zakaz udostępniania danych osobowych/IP innych graczy.",
            "Zakaz nadmiernego spamowania/floodowania oraz caps locka.",
            "Zakaz wysyłania wiadomości za pomocą skryptu/Tiny Taska itp.",
          ],
        },
        {
          heading: "§4. Kary",
          lead: "Kary są uznawane przez administrację według szkód oraz współpracy z administracją z poniższych kar:",
          items: [
            "Mute: 60s/5min/10min/1h/1d/7d;",
            "Tymczasowy ban: 3d/7d/14d/30d;",
            "Permanentny ban;",
            "Inna kara, jeśli powyższe nie są odpowiednie.",
          ],
        },
      ],
      note: "© 2026 Mythoris.eu",
    },
    packs: {
      kicker: "TEXTUREPACKI",
      title: "Texturepacki Mythoris",
      intro: "Oficjalne texturepacki serwera. Zwykle nie musisz nic pobierać — serwer wysyła pack automatycznie po wejściu. Pliki możesz też pobrać ręcznie.",
      loading: "Ładowanie…",
      empty: "Brak packów do pobrania.",
      error: "Nie udało się pobrać listy packów.",
      download: "POBIERZ",
      copyUrl: "KOPIUJ LINK",
      apiLabel: "API dla pluginów i launcherów",
      version: "Wersja",
    },
    footer: {
      copyright: "MYTHORIS NIE JEST POWIĄZANE Z MOJANG STUDIOS ANI MICROSOFT.",
      rules: "REGULAMIN",
      packs: "TEXTUREPACKI",
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
      title: "Mythoris.eu RULES",
      intro: "Last change: 27.10.2026",
      sections: [
        {
          heading: "§1. General provisions",
          items: [
            "Joining the server means accepting the rules below and agreeing to follow them.",
            "Being unfamiliar with rules or unawareness of their existence does not exempt from liability for violating them.",
            "The administration has the right to punish someone in situations not covered by the rules, if their actions harm the server, its reputation or the community.",
            "The rules may be changed without prior notice.",
            "The rules are the property of the server and copying them is forbidden.",
          ],
        },
        {
          heading: "§2. Discord",
          items: [
            "No spamming/flooding.",
            "No impersonating other players and administration.",
            "No sharing other people's personal information.",
            "No excessive insulting, harassment or inappropriate language, even using emojis and words with vulgar connotation.",
            "Username and profile picture must be appropriate.",
            "No racism/vulgar/erotic/religious/political topics.",
            "No sending files and links containing racism/vulgar/erotic/religious/pornographic topics.",
            "No IRL trading.",
            "No promoting.",
            "No pinging administration.",
            "No quoting messages that breaks rules.",
            "No streaming unethical content or material revealing someone else's personal information.",
          ],
        },
        {
          heading: "§3. Minecraft",
          items: [
            "No cheating/using mods or scripts that makes your game easier and gives you advantage over other players (including possessing them) and cooperating with people using them. If you are unsure whether a mod/script is allowed, ask other players or create a support ticket.",
            "No multi accounts.",
            "No promoting.",
            "No impersonating other players and administration.",
            "It is prohibited to exploit the server/game error. All such errors must be reported to the administration; failure to report them is considered exploitation.",
            "No inappropriate usernames/skins/accessories.",
            "It is prohibited to send messages that are vulgar, offensive, or carry a negative tone, or that could cause offense to other users.",
            "No links that are unrelated to Mythoris.eu .",
            "No sharing other people's personal information.",
            "No excessive spamming/flooding and using caps lock.",
            "No sending messages using scripts/Tiny Task etc.",
          ],
        },
        {
          heading: "§4. Punishments",
          lead: "Punishments are determined by the administration based on the extent of the damage caused and the cooperation with the administration, selected from the following options:",
          items: [
            "Mute: 60s/5min/10min/1h/1d/7d;",
            "Temporary ban: 3d/7d/14d/30d;",
            "Permanent ban;",
            "Other punishment, if penalties above are not appropriate.",
          ],
        },
      ],
      note: "© 2026 Mythoris.eu",
    },
    packs: {
      kicker: "RESOURCE PACKS",
      title: "Mythoris resource packs",
      intro: "Official server resource packs. You usually don't need to download anything — the server sends the pack automatically when you join. You can also download the files manually.",
      loading: "Loading…",
      empty: "No packs available.",
      error: "Could not load the pack list.",
      download: "DOWNLOAD",
      copyUrl: "COPY LINK",
      apiLabel: "API for plugins and launchers",
      version: "Version",
    },
    footer: {
      copyright: "MYTHORIS IS NOT AFFILIATED WITH MOJANG STUDIOS OR MICROSOFT.",
      rules: "RULES",
      packs: "RESOURCE PACKS",
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
