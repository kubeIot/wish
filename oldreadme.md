# What Is Happening?

Tento repozitář obsahuje zdrojový kód bakalářské práce ** Marka Hrvola ** psanou v roce 2016/2017.

V budoucnosti bude tento repozitář obsahovat taktéž Backend implementovaný ** Mirkem Jarošem **.

## Požadavky

Node.js a npm jsou nezbytné pro spuštění tohoto projektu.

Pokud nemáte nainstalovaný node.js, nainstalujte ho dle návodu na www.nodejs.org nebo https://docs.npmjs.com/getting-started/installing-node

**Ověřte, že máte verzi node alespoň 'v4.x.x' a npm '3.x.x'**
spuštěním příkazů 'node -v' a 'npm -v' v terminálu. Starší verze mohou způsobovat chyby.

## Instalace npm balíčků

Nainstalujte balíčky specifikované v 'package.json' a ověřte že fungují:

```bash
npm install
npm start
```

Příkaz 'npm start' zkompiluje aplikaci a zároveň spustí server. Veškeré změny souborů jsou ihned zaznamenány.

Server zastavíte manualně klávesovou zkratkou 'Ctrl-C'


### npm skripty

Nejdůležitejší příkazy obsažené v 'package.json'.

* 'npm start' - zkompiluje aplikaci a zároveň spustí server. Veškeré změny souborů jsou ihned zaznamenány ('watch-mode').
* 'npm run tsc' - spustí kompilátor TypeScriptu.
* 'npm run tsc:w' - spustí kompilátor TypeScriptu ve 'watch-mode'.
* 'npm run lite' - spustí server