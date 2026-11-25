import type { LocaleCode } from "./locales";

const pl = {
  common: {
    loading: "Ładowanie…", waking: "Serwer API budzi się z uśpienia – to może potrwać do minuty. Próbuję ponownie automatycznie…",
    retry: "Spróbuj ponownie", error: "Nie udało się pobrać danych. Spróbuj później.", unconfigured: "Ta funkcja nie jest jeszcze skonfigurowana.",
    rateLimited: "Zbyt wiele zapytań. Odczekaj chwilę i spróbuj ponownie.", forbidden: "Nie masz uprawnień do tej akcji.", notFound: "Nie znaleziono.",
    save: "Zapisz", saving: "Zapisywanie…", saved: "Zapisano.", cancel: "Anuluj", delete: "Usuń", edit: "Edytuj", add: "Dodaj", back: "Wróć",
    confirmDelete: "Na pewno usunąć? Tej operacji nie można cofnąć.", skip: "Przejdź do treści", language: "Język", menu: "Menu", closed: "zamknij",
  },
  nav: { ranking: "Ranking", wiki: "Wiki", changelog: "Zmiany", login: "Zaloguj się", logout: "Wyloguj", account: "Konto", searchPlaceholder: "Nick gracza", searchLabel: "Szukaj profilu gracza", searchBtn: "Szukaj" },
  profile: {
    kicker: "PROFIL GRACZA", missing: "Nie znaleziono gracza (musi choć raz wejść na serwer).", level: "Poziom", cls: "Klasa", rank: "Ranga", guild: "Gildia",
    playtime: "Czas gry", status: "Status", characters: "Postacie", online: "online", offline: "offline", seoDesc: "Profil gracza {name} na serwerze Mythoris: poziom, klasa, gildia i postacie.", hours: "h",
  },
  ranking: {
    kicker: "RANKING", title: "Najlepsi gracze", intro: "Ranking aktualizuje się co kilka minut, na podstawie danych z serwera.", sortLevel: "Wg poziomu", sortPlaytime: "Wg czasu gry",
    player: "Gracz", level: "Poziom", cls: "Klasa", guild: "Gildia", playtime: "Czas gry", empty: "Brak graczy w rankingu.", seoDesc: "Ranking graczy Mythoris wg poziomu i czasu gry.",
  },
  wiki: {
    kicker: "WIKI", title: "Wiki Mythoris", intro: "Poradniki i informacje o świecie Mythoris: klasy, przedmioty, mechaniki.", searchPlaceholder: "Szukaj w wiki…", all: "Wszystkie", empty: "Brak stron wiki.",
    noResults: "Nic nie znaleziono.", updated: "Ostatnia zmiana", by: "przez", newPage: "Nowa strona", editPage: "Edytuj stronę", slug: "Adres strony (slug: a-z, 0-9, -)", category: "Kategoria",
    titleLabel: "Tytuł", bodyLabel: "Treść (Markdown)", preview: "Podgląd", editTab: "Edycja", noTranslation: "Brak tłumaczenia – pokazano wersję w innym języku.", slugInvalid: "Adres może zawierać tylko a-z, 0-9 i myślniki (do 60 znaków).",
    needTitle: "Podaj tytuł w co najmniej jednym języku.", seoDesc: "Poradniki i informacje o grze na serwerze Minecraft MMORPG Mythoris.", uncategorized: "Inne", allPages: "Wszystkie strony wiki",
  },
  changelog: {
    kicker: "DZIENNIK ZMIAN", title: "Co nowego na Mythoris", intro: "Lista zmian i aktualizacji serwera.", empty: "Brak wpisów.", newEntry: "Nowy wpis", editEntry: "Edytuj wpis",
    version: "Wersja", date: "Data", titleLabel: "Tytuł", items: "Zmiany (jedna w linii)", seoDesc: "Dziennik zmian serwera Minecraft MMORPG Mythoris.", needItems: "Dodaj tytuł lub choć jedną zmianę.",
  },
  account: {
    kicker: "KONTO", title: "Twoje konto", loginPrompt: "Zaloguj się przez Discord, aby zobaczyć powiązany profil gracza lub edytować wiki (jeśli masz dostęp).", loginBtn: "Zaloguj przez Discord",
    roleAdmin: "Administrator", roleEditor: "Edytor wiki", roleUser: "Gracz", minecraft: "Konto Minecraft", notLinked: "Twoje konto Discord nie jest jeszcze połączone z kontem Minecraft. Połącz je w grze komendą /discord.",
    access: "Dostęp do edycji wiki", accessIntro: "Osoby z listy mogą tworzyć i edytować strony wiki.", discordId: "ID użytkownika Discord", displayName: "Nazwa (do wyświetlania)", grant: "Nadaj dostęp", revoke: "Odbierz",
    noEditors: "Nikt jeszcze nie ma dostępu.", added: "dodano", authError: "Logowanie nie powiodło się. Spróbuj ponownie.", loggingIn: "Logowanie…", manage: "Zarządzaj wiki i zmianami", seoDesc: "Panel konta Mythoris.",
  },
};

export type Ui = typeof pl;

const en: Ui = {
  common: {
    loading: "Loading…", waking: "The API server is waking up – this can take up to a minute. Retrying automatically…",
    retry: "Try again", error: "Could not load the data. Try again later.", unconfigured: "This feature is not configured yet.",
    rateLimited: "Too many requests. Wait a moment and try again.", forbidden: "You do not have permission to do this.", notFound: "Not found.",
    save: "Save", saving: "Saving…", saved: "Saved.", cancel: "Cancel", delete: "Delete", edit: "Edit", add: "Add", back: "Back",
    confirmDelete: "Delete for good? This cannot be undone.", skip: "Skip to content", language: "Language", menu: "Menu", closed: "close",
  },
  nav: { ranking: "Ranking", wiki: "Wiki", changelog: "Changelog", login: "Log in", logout: "Log out", account: "Account", searchPlaceholder: "Player name", searchLabel: "Search for a player profile", searchBtn: "Search" },
  profile: {
    kicker: "PLAYER PROFILE", missing: "Player not found (they must have joined the server at least once).", level: "Level", cls: "Class", rank: "Rank", guild: "Guild",
    playtime: "Playtime", status: "Status", characters: "Characters", online: "online", offline: "offline", seoDesc: "Mythoris player profile of {name}: level, class, guild and characters.", hours: "h",
  },
  ranking: {
    kicker: "LEADERBOARD", title: "Top players", intro: "The leaderboard refreshes every few minutes from server data.", sortLevel: "By level", sortPlaytime: "By playtime",
    player: "Player", level: "Level", cls: "Class", guild: "Guild", playtime: "Playtime", empty: "No players in the leaderboard yet.", seoDesc: "Mythoris player leaderboard by level and playtime.",
  },
  wiki: {
    kicker: "WIKI", title: "Mythoris Wiki", intro: "Guides and info about the world of Mythoris: classes, items, mechanics.", searchPlaceholder: "Search the wiki…", all: "All", empty: "No wiki pages yet.",
    noResults: "Nothing found.", updated: "Last updated", by: "by", newPage: "New page", editPage: "Edit page", slug: "Page address (slug: a-z, 0-9, -)", category: "Category",
    titleLabel: "Title", bodyLabel: "Content (Markdown)", preview: "Preview", editTab: "Edit", noTranslation: "No translation – showing another language.", slugInvalid: "The address may only contain a-z, 0-9 and hyphens (up to 60 characters).",
    needTitle: "Enter a title in at least one language.", seoDesc: "Guides and game information for the Mythoris Minecraft MMORPG server.", uncategorized: "Other", allPages: "All wiki pages",
  },
  changelog: {
    kicker: "CHANGELOG", title: "What's new on Mythoris", intro: "Server changes and updates.", empty: "No entries yet.", newEntry: "New entry", editEntry: "Edit entry",
    version: "Version", date: "Date", titleLabel: "Title", items: "Changes (one per line)", seoDesc: "Changelog of the Mythoris Minecraft MMORPG server.", needItems: "Add a title or at least one change.",
  },
  account: {
    kicker: "ACCOUNT", title: "Your account", loginPrompt: "Log in with Discord to see your linked player profile or edit the wiki (if you have access).", loginBtn: "Log in with Discord",
    roleAdmin: "Administrator", roleEditor: "Wiki editor", roleUser: "Player", minecraft: "Minecraft account", notLinked: "Your Discord account is not linked to a Minecraft account yet. Link it in game with /discord.",
    access: "Wiki editing access", accessIntro: "People on this list can create and edit wiki pages.", discordId: "Discord user ID", displayName: "Display name", grant: "Grant access", revoke: "Revoke",
    noEditors: "Nobody has access yet.", added: "added", authError: "Login failed. Please try again.", loggingIn: "Logging in…", manage: "Manage wiki and changelog", seoDesc: "Mythoris account panel.",
  },
};

const de: Ui = {
  common: {
    loading: "Lädt…", waking: "Der API-Server wacht gerade auf – das kann bis zu einer Minute dauern. Neuer Versuch erfolgt automatisch…",
    retry: "Erneut versuchen", error: "Die Daten konnten nicht geladen werden. Versuche es später erneut.", unconfigured: "Diese Funktion ist noch nicht eingerichtet.",
    rateLimited: "Zu viele Anfragen. Warte einen Moment und versuche es erneut.", forbidden: "Dazu hast du keine Berechtigung.", notFound: "Nicht gefunden.",
    save: "Speichern", saving: "Wird gespeichert…", saved: "Gespeichert.", cancel: "Abbrechen", delete: "Löschen", edit: "Bearbeiten", add: "Hinzufügen", back: "Zurück",
    confirmDelete: "Wirklich löschen? Das lässt sich nicht rückgängig machen.", skip: "Zum Inhalt springen", language: "Sprache", menu: "Menü", closed: "schließen",
  },
  nav: { ranking: "Rangliste", wiki: "Wiki", changelog: "Änderungen", login: "Anmelden", logout: "Abmelden", account: "Konto", searchPlaceholder: "Spielername", searchLabel: "Spielerprofil suchen", searchBtn: "Suchen" },
  profile: {
    kicker: "SPIELERPROFIL", missing: "Spieler nicht gefunden (er muss mindestens einmal auf dem Server gewesen sein).", level: "Level", cls: "Klasse", rank: "Rang", guild: "Gilde",
    playtime: "Spielzeit", status: "Status", characters: "Charaktere", online: "online", offline: "offline", seoDesc: "Mythoris-Spielerprofil von {name}: Level, Klasse, Gilde und Charaktere.", hours: "Std.",
  },
  ranking: {
    kicker: "RANGLISTE", title: "Beste Spieler", intro: "Die Rangliste wird alle paar Minuten mit Serverdaten aktualisiert.", sortLevel: "Nach Level", sortPlaytime: "Nach Spielzeit",
    player: "Spieler", level: "Level", cls: "Klasse", guild: "Gilde", playtime: "Spielzeit", empty: "Noch keine Spieler in der Rangliste.", seoDesc: "Mythoris-Spielerrangliste nach Level und Spielzeit.",
  },
  wiki: {
    kicker: "WIKI", title: "Mythoris-Wiki", intro: "Anleitungen und Infos zur Welt von Mythoris: Klassen, Items, Mechaniken.", searchPlaceholder: "Im Wiki suchen…", all: "Alle", empty: "Noch keine Wiki-Seiten.",
    noResults: "Nichts gefunden.", updated: "Zuletzt geändert", by: "von", newPage: "Neue Seite", editPage: "Seite bearbeiten", slug: "Seitenadresse (Slug: a-z, 0-9, -)", category: "Kategorie",
    titleLabel: "Titel", bodyLabel: "Inhalt (Markdown)", preview: "Vorschau", editTab: "Bearbeiten", noTranslation: "Keine Übersetzung – es wird eine andere Sprache angezeigt.", slugInvalid: "Die Adresse darf nur a-z, 0-9 und Bindestriche enthalten (max. 60 Zeichen).",
    needTitle: "Gib in mindestens einer Sprache einen Titel ein.", seoDesc: "Anleitungen und Spielinfos zum Minecraft-MMORPG-Server Mythoris.", uncategorized: "Sonstiges", allPages: "Alle Wiki-Seiten",
  },
  changelog: {
    kicker: "ÄNDERUNGSPROTOKOLL", title: "Neues auf Mythoris", intro: "Änderungen und Updates des Servers.", empty: "Noch keine Einträge.", newEntry: "Neuer Eintrag", editEntry: "Eintrag bearbeiten",
    version: "Version", date: "Datum", titleLabel: "Titel", items: "Änderungen (eine pro Zeile)", seoDesc: "Änderungsprotokoll des Minecraft-MMORPG-Servers Mythoris.", needItems: "Füge einen Titel oder mindestens eine Änderung hinzu.",
  },
  account: {
    kicker: "KONTO", title: "Dein Konto", loginPrompt: "Melde dich mit Discord an, um dein verknüpftes Spielerprofil zu sehen oder das Wiki zu bearbeiten (falls du Zugriff hast).", loginBtn: "Mit Discord anmelden",
    roleAdmin: "Administrator", roleEditor: "Wiki-Editor", roleUser: "Spieler", minecraft: "Minecraft-Konto", notLinked: "Dein Discord-Konto ist noch nicht mit einem Minecraft-Konto verknüpft. Verknüpfe es im Spiel mit /discord.",
    access: "Wiki-Bearbeitungsrechte", accessIntro: "Personen auf dieser Liste können Wiki-Seiten erstellen und bearbeiten.", discordId: "Discord-Nutzer-ID", displayName: "Anzeigename", grant: "Zugriff erteilen", revoke: "Entziehen",
    noEditors: "Noch niemand hat Zugriff.", added: "hinzugefügt", authError: "Anmeldung fehlgeschlagen. Bitte versuche es erneut.", loggingIn: "Anmeldung läuft…", manage: "Wiki und Änderungen verwalten", seoDesc: "Mythoris-Kontobereich.",
  },
};

const cs: Ui = {
  common: {
    loading: "Načítání…", waking: "API server se probouzí – může to trvat až minutu. Zkouším to znovu automaticky…",
    retry: "Zkusit znovu", error: "Data se nepodařilo načíst. Zkus to později.", unconfigured: "Tato funkce zatím není nakonfigurována.",
    rateLimited: "Příliš mnoho požadavků. Chvíli počkej a zkus to znovu.", forbidden: "K této akci nemáš oprávnění.", notFound: "Nenalezeno.",
    save: "Uložit", saving: "Ukládání…", saved: "Uloženo.", cancel: "Zrušit", delete: "Smazat", edit: "Upravit", add: "Přidat", back: "Zpět",
    confirmDelete: "Opravdu smazat? Tuto akci nelze vrátit.", skip: "Přejít na obsah", language: "Jazyk", menu: "Menu", closed: "zavřít",
  },
  nav: { ranking: "Žebříček", wiki: "Wiki", changelog: "Změny", login: "Přihlásit se", logout: "Odhlásit se", account: "Účet", searchPlaceholder: "Nick hráče", searchLabel: "Hledat profil hráče", searchBtn: "Hledat" },
  profile: {
    kicker: "PROFIL HRÁČE", missing: "Hráč nenalezen (musí alespoň jednou vstoupit na server).", level: "Úroveň", cls: "Třída", rank: "Hodnost", guild: "Gilda",
    playtime: "Odehraný čas", status: "Stav", characters: "Postavy", online: "online", offline: "offline", seoDesc: "Profil hráče {name} na Mythorisu: úroveň, třída, gilda a postavy.", hours: "h",
  },
  ranking: {
    kicker: "ŽEBŘÍČEK", title: "Nejlepší hráči", intro: "Žebříček se každých pár minut aktualizuje z dat serveru.", sortLevel: "Podle úrovně", sortPlaytime: "Podle času hraní",
    player: "Hráč", level: "Úroveň", cls: "Třída", guild: "Gilda", playtime: "Čas hraní", empty: "V žebříčku zatím nejsou žádní hráči.", seoDesc: "Žebříček hráčů Mythoris podle úrovně a času hraní.",
  },
  wiki: {
    kicker: "WIKI", title: "Wiki Mythoris", intro: "Návody a informace o světě Mythoris: třídy, předměty, mechaniky.", searchPlaceholder: "Hledat ve wiki…", all: "Vše", empty: "Zatím žádné stránky wiki.",
    noResults: "Nic nenalezeno.", updated: "Naposledy změněno", by: "uživatelem", newPage: "Nová stránka", editPage: "Upravit stránku", slug: "Adresa stránky (slug: a-z, 0-9, -)", category: "Kategorie",
    titleLabel: "Název", bodyLabel: "Obsah (Markdown)", preview: "Náhled", editTab: "Úpravy", noTranslation: "Překlad chybí – zobrazena je jiná jazyková verze.", slugInvalid: "Adresa smí obsahovat jen a-z, 0-9 a pomlčky (max. 60 znaků).",
    needTitle: "Zadej název alespoň v jednom jazyce.", seoDesc: "Návody a informace o hře na Minecraft MMORPG serveru Mythoris.", uncategorized: "Ostatní", allPages: "Všechny stránky wiki",
  },
  changelog: {
    kicker: "SEZNAM ZMĚN", title: "Co je nového na Mythorisu", intro: "Změny a aktualizace serveru.", empty: "Zatím žádné záznamy.", newEntry: "Nový záznam", editEntry: "Upravit záznam",
    version: "Verze", date: "Datum", titleLabel: "Název", items: "Změny (jedna na řádek)", seoDesc: "Seznam změn Minecraft MMORPG serveru Mythoris.", needItems: "Přidej název nebo alespoň jednu změnu.",
  },
  account: {
    kicker: "ÚČET", title: "Tvůj účet", loginPrompt: "Přihlas se přes Discord, abys viděl propojený profil hráče nebo mohl upravovat wiki (pokud máš přístup).", loginBtn: "Přihlásit přes Discord",
    roleAdmin: "Administrátor", roleEditor: "Editor wiki", roleUser: "Hráč", minecraft: "Účet Minecraft", notLinked: "Tvůj účet Discord zatím není propojen s účtem Minecraft. Propoj ho ve hře příkazem /discord.",
    access: "Přístup k úpravám wiki", accessIntro: "Lidé ze seznamu mohou vytvářet a upravovat stránky wiki.", discordId: "ID uživatele Discord", displayName: "Zobrazované jméno", grant: "Udělit přístup", revoke: "Odebrat",
    noEditors: "Zatím nikdo nemá přístup.", added: "přidáno", authError: "Přihlášení se nezdařilo. Zkus to znovu.", loggingIn: "Přihlašování…", manage: "Správa wiki a změn", seoDesc: "Panel účtu Mythoris.",
  },
};

const uk: Ui = {
  common: {
    loading: "Завантаження…", waking: "API-сервер прокидається – це може тривати до хвилини. Автоматично повторюю спробу…",
    retry: "Спробувати ще раз", error: "Не вдалося завантажити дані. Спробуй пізніше.", unconfigured: "Цю функцію ще не налаштовано.",
    rateLimited: "Забагато запитів. Зачекай трохи й спробуй ще раз.", forbidden: "У тебе немає дозволу на цю дію.", notFound: "Не знайдено.",
    save: "Зберегти", saving: "Збереження…", saved: "Збережено.", cancel: "Скасувати", delete: "Видалити", edit: "Редагувати", add: "Додати", back: "Назад",
    confirmDelete: "Точно видалити? Цю дію не можна скасувати.", skip: "Перейти до вмісту", language: "Мова", menu: "Меню", closed: "закрити",
  },
  nav: { ranking: "Рейтинг", wiki: "Вікі", changelog: "Зміни", login: "Увійти", logout: "Вийти", account: "Акаунт", searchPlaceholder: "Нік гравця", searchLabel: "Пошук профілю гравця", searchBtn: "Шукати" },
  profile: {
    kicker: "ПРОФІЛЬ ГРАВЦЯ", missing: "Гравця не знайдено (він має хоча б раз зайти на сервер).", level: "Рівень", cls: "Клас", rank: "Ранг", guild: "Гільдія",
    playtime: "Час гри", status: "Статус", characters: "Персонажі", online: "онлайн", offline: "офлайн", seoDesc: "Профіль гравця {name} на Mythoris: рівень, клас, гільдія та персонажі.", hours: "год",
  },
  ranking: {
    kicker: "РЕЙТИНГ", title: "Найкращі гравці", intro: "Рейтинг оновлюється кожні кілька хвилин за даними сервера.", sortLevel: "За рівнем", sortPlaytime: "За часом гри",
    player: "Гравець", level: "Рівень", cls: "Клас", guild: "Гільдія", playtime: "Час гри", empty: "У рейтингу ще немає гравців.", seoDesc: "Рейтинг гравців Mythoris за рівнем і часом гри.",
  },
  wiki: {
    kicker: "ВІКІ", title: "Вікі Mythoris", intro: "Посібники та інформація про світ Mythoris: класи, предмети, механіки.", searchPlaceholder: "Пошук у вікі…", all: "Усі", empty: "Сторінок вікі ще немає.",
    noResults: "Нічого не знайдено.", updated: "Остання зміна", by: "від", newPage: "Нова сторінка", editPage: "Редагувати сторінку", slug: "Адреса сторінки (slug: a-z, 0-9, -)", category: "Категорія",
    titleLabel: "Заголовок", bodyLabel: "Вміст (Markdown)", preview: "Попередній перегляд", editTab: "Редагування", noTranslation: "Перекладу немає – показано іншу мову.", slugInvalid: "Адреса може містити лише a-z, 0-9 і дефіси (до 60 символів).",
    needTitle: "Вкажи заголовок щонайменше однією мовою.", seoDesc: "Посібники та інформація про гру на Minecraft MMORPG-сервері Mythoris.", uncategorized: "Інше", allPages: "Усі сторінки вікі",
  },
  changelog: {
    kicker: "ЖУРНАЛ ЗМІН", title: "Що нового на Mythoris", intro: "Зміни та оновлення сервера.", empty: "Записів ще немає.", newEntry: "Новий запис", editEntry: "Редагувати запис",
    version: "Версія", date: "Дата", titleLabel: "Заголовок", items: "Зміни (по одній у рядку)", seoDesc: "Журнал змін Minecraft MMORPG-сервера Mythoris.", needItems: "Додай заголовок або хоча б одну зміну.",
  },
  account: {
    kicker: "АКАУНТ", title: "Твій акаунт", loginPrompt: "Увійди через Discord, щоб побачити пов’язаний профіль гравця або редагувати вікі (якщо маєш доступ).", loginBtn: "Увійти через Discord",
    roleAdmin: "Адміністратор", roleEditor: "Редактор вікі", roleUser: "Гравець", minecraft: "Акаунт Minecraft", notLinked: "Твій акаунт Discord ще не пов’язано з акаунтом Minecraft. Пов’яжи його в грі командою /discord.",
    access: "Доступ до редагування вікі", accessIntro: "Люди зі списку можуть створювати й редагувати сторінки вікі.", discordId: "ID користувача Discord", displayName: "Ім’я для відображення", grant: "Надати доступ", revoke: "Забрати",
    noEditors: "Ніхто ще не має доступу.", added: "додано", authError: "Не вдалося увійти. Спробуй ще раз.", loggingIn: "Вхід…", manage: "Керування вікі та змінами", seoDesc: "Панель акаунта Mythoris.",
  },
};

export const ui: Record<LocaleCode, Ui> = { pl, en, de, cs, uk };
