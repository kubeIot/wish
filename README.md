# What Is Happening?

Tento repozitář obsahuje zdrojový kód bakalářské práce ** Marka Hrvola ** psanou v roce 2016/2017.

V budoucnosti bude tento repozitář obsahovat taktéž Backend implementovaný ** Mirkem Jarošem **.


## Požadavky

Node.js a npm jsou nezbytné pro spuštění tohoto projektu.

Pokud nemáte nainstalovaný node.js, nainstalujte ho dle návodu na www.nodejs.org nebo https://docs.npmjs.com/getting-started/installing-node

**Ověřte, že máte verzi node alespoň 'v6.9.x' a npm '4.x.x'**
spuštěním příkazů 'node -v' a 'npm -v' v terminálu. Starší verze mohou způsobovat chyby.

Back-end je dostupný na https://github.com/kubeIot/api-docs. Pro správnou funkcionalitu aplikace bez úprav souboru configuration.ts je potřeba spustit back-end serveru na portu 8080.

## Instalace npm balíčků

Nainstalujte balíčky specifikované v 'package.json' a ověřte že fungují:

```bash
npm install
ng serve
```

Příkaz 'ng serve' zkompiluje aplikaci a zároveň spustí server. Veškeré změny souborů jsou ihned zaznamenány.

Server zastavíte manualně klávesovou zkratkou 'Ctrl-C'


### npm skripty

Nejdůležitejší příkazy

* 'start' - zkompiluje aplikaci a zároveň spustí server. Veškeré změny souborů jsou ihned zaznamenány ('watch-mode').
* 'ng serve' - viz start, port lze specifikovat pomocí parametru --port.
* 'ng build' - proběhne build aplikace, pro produkční prostředí je potřeba zvolit přepínač --prod. Změny v kódu nejsou zaznamenány.


