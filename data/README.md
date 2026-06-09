# Seed-Dataset: Felder & Hinweise

> ⚠️ Das Dataset ist synthetisch und vereinfacht (Stand 2026-06) und keine offizielle AI:AT-Position. Die Marke „Volt-Cola" sowie alle genannten Personen, Quellen-Zuordnungen und Ereignisse sind vollständig erfunden. Die Datenstruktur (Felder, Datumsformate, Quellen-Mix) ist an reale GDELT- und News-RSS-Shapes angelehnt, aber stark vereinfacht. Domänenwissen brauchst du nicht; die Felder unten verstehst du ohne Vorwissen. Behandle die Daten als Spielmaterial, nicht als echte Medienberichterstattung.

## `articles.json` (Artikel-Korpus)

`articles.json` enthält 36 synthetische Artikel-Einträge über 4 Wochen (Juni 2026) zum fiktiven Getränkehersteller „Volt-Cola".

| Feld | Typ | Bedeutung |
|---|---|---|
| `_hinweis` | string | Synthetik-Disclaimer (Kurzform) |
| `id` | string | Stabile Artikel-ID (`art-001` …) |
| `quelle` | string | Medien-Quelle (z. B. `news.ORF.at`, `derStandard.at`, `BBC News`, `Reuters`, `Die Presse`, `Kleine Zeitung`) |
| `sprache` | string | `de` oder `en` |
| `datum` | string (ISO-8601 + TZ) | Veröffentlichungszeitpunkt, z. B. `2026-06-15T09:00:00+02:00` |
| `titel` | string | Artikel-Titel |
| `body_auszug` | string | Kurzer Body-Auszug (1–2 Sätze) |
| `brand` | string | Erwähnte Marke (`Volt-Cola`) |
| `erwaehnte_entitaeten` | string[] | Genannte Entitäten (Personen / Organisationen), Roh-Hinweis für NER |

> **Sentiment ist nicht enthalten; du berechnest es selbst.** Das Klassifizieren von Sentiment je Artikel (per LLM oder Heuristik) ist bewusst Teil der Aufgabe für die Dev-Rolle. Ein vorberechnetes Label würde den Kern der Challenge aushebeln.

## Überblick über den Korpus

Der Korpus umfasst 4 Wochen im Juni 2026 und enthält ein eingebautes Anomalie-Fenster (eine Krisenwoche mit erhöhtem Mention-Volumen und verändertem Stimmungsbild). Dein Agent soll diese Auffälligkeit eigenständig erkennen und als Anomalie-Alert ausgeben.

## Dedup-Testfall

`art-007` (ORF) und `art-036` (Reuters) tragen denselben Titel und berichten über dasselbe Ereignis aus zwei verschiedenen Quellen. Ein robuster Agent behandelt diesen Dedup-Fall; wie du das tust, ist dir überlassen.

## Echte Live-Daten (optionaler Dev-Stretch)

Brauchst du echte News-Daten statt des synthetischen Seeds, stehen zwei offene APIs zur Verfügung, ohne Key:

- **GDELT DOC 2.0 API:** `https://api.gdeltproject.org/api/v2/doc/doc`; throttelt aggressiv (429-Fehler), daher Backoff + Cache notwendig.
- **News-RSS-Feeds** (ORF, derStandard, BBC): Standard-XML, kein Key.

Das ist ein optionaler Stretch; der mitgelieferte Seed reicht für die Aufgabe vollständig aus.
