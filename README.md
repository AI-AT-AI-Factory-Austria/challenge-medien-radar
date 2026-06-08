# Medien-Radar — AI:AT Challenge

Willkommen! Schön, dass du dabei bist. Dieses Repo enthält **alles, was du zum Loslegen brauchst** — Aufgabenstellung, Daten und (für die Dev-Rolle) das Code-Snippet.

> Das hier ist kein Trick-Test. Es ist ein kleines, echtes Stück Venture-Studio-Arbeit: mit KI schnell etwas Wertvolles bauen bzw. eine Idee auf Marktreife prüfen. **Es gibt keine Musterlösung, die du treffen musst** — wir schauen, wie du ein unscharf spezifiziertes Problem zerlegst, Entscheidungen triffst und KI sinnvoll einsetzt.

## Das Szenario — „Medien-Radar"

PR/Comms-Agenturen betreuen mehrere Marken-Accounts gleichzeitig und müssen täglich „noise → signal" verdichten: *Wer schreibt diese Woche über meine Marke? In welchem Ton? Und wann kippt die Stimmung — oder explodiert das Volumen?* Heute erledigen Teams das manuell oder mit Profi-Tools wie Meltwater, die **2 000–5 000 € pro Monat** kosten.

**„Medien-Radar"** ist ein KI-gestützter Agent, der einen Artikel-Korpus (Brand-Mentions aus verschiedenen Quellen) einliest, **Sentiment + Entitäten** je Artikel klassifiziert, einen **Wochen-Report** erzeugt und bei einem **Mention- oder Sentiment-Spike** eine Anomalie-Alert auslöst.

Wir liefern dir einen synthetischen Artikel-Korpus (Marke: **„Volt-Cola"** — vollständig erfunden) mit eingebautem Anomalie-Fenster, sodass dein Agent ohne Netzwerkzugriff kalt starten und dabei tatsächlich etwas zu finden hat.

> Das Sentiment der Artikel **berechnest du selbst** — per LLM oder deterministischer Heuristik. Die Rohdaten in `data/articles.json` enthalten kein vorberechnetes Sentiment-Label; das ist absichtlich so, denn genau das Klassifizieren ist Teil der Aufgabe.

## Wähle deine Challenge

| Rolle | Worum geht's | Start hier |
|---|---|---|
| **AI Developer** | Bau den Medien-Radar-Agenten + ein kurzes Code-Review | [`dev/`](./dev/) |
| **AI Business Analyst & Venture Builder** | Ist das ein Geschäft? Business Case + Go-to-Market | [`business/`](./business/) |

> Du weißt aus dem Gespräch mit uns, welche Rolle deine ist — leg einfach im passenden Ordner los. **Falls unklar, welche Rolle deine ist, frag kurz per Mail nach.** (Neugierig auf die andere Seite? Gern reinschauen — für deine Abgabe zählt nur dein Ordner.)

## Die Daten (`data/`)

Beide Rollen teilen sich dieselbe Datengrundlage:

- [`data/articles.json`](./data/articles.json) — synthetischer Artikel-Korpus über 4 Wochen (36 Einträge, Marke „Volt-Cola", Felder dokumentiert in [`data/README.md`](./data/README.md))

> **Zum Sentiment:** Das Dataset enthält **kein vorberechnetes Sentiment-Feld**. Das Klassifizieren von Sentiment je Artikel ist bewusst Teil der Aufgabe für die Dev-Rolle. Für die Business-Rolle genügt das Verständnis der Artikelstruktur (Quellen, Zeiträume, Titel/Body-Auszüge) — kein Sentiment-Berechnen nötig.

> **Synthetischer Datensatz — ausführlicher Hinweis:** Das Dataset ist **synthetisch und vereinfacht (Stand 2026-06) und stellt keine offizielle AI:AT-Position dar.** Die Marke „Volt-Cola" sowie alle genannten Personen, Quellen-Zuordnungen und Ereignisse sind vollständig erfunden. Die Datenstruktur (Felder, Datumsformate, Quellen-Mix) ist an reale GDELT- und News-RSS-Shapes angelehnt, aber stark vereinfacht. Jeder JSON-Eintrag trägt ein `_hinweis`-Feld mit der Kurzform des Disclaimers. Behandle die Daten als Spielmaterial, nicht als echte Medienberichterstattung — und kein Domänenwissen über Medienmonitoring nötig: der Korpus ist selbsterklärend.

## Das Wichtigste in Kürze

- **Aufwand:** ~4–6 fokussierte Stunden. Du hast **7 Kalendertage ab Erhalt** — das Fenster ist für *Flexibilität*, nicht zum Durchgrinden.
- **KI:** Nutze jede KI, jede Library, google frei — das wird **erwartet**, nicht nur erlaubt.
- **Abgabe:** per E-Mail an **aiandbusinessgrowth@ai-at.eu**. Für deinen Code/deine Doku erstellst du ein **eigenes Repo** (z. B. `git init` in deinem Arbeitsordner oder dieses Repo als Vorlage klonen → zu deinem GitHub/GitLab pushen) und schickst uns den Link. Die konkreten Daten (Abgabedatum, ggf. Upload-Link) stehen in deiner Begleit-E-Mail.
- **Bewertung:** transparent — die Gewichtung findest du in deinem Rollen-Brief.
- **Wichtig:** Ein rauer Kern mit klarem Denken schlägt eine polierte, oberflächliche Umsetzung. Mehr Stunden bedeuten bei uns **nicht** mehr Punkte.

## Fair & transparent

AI Factory Austria steht für Chancengleichheit — ob Uni, Bootcamp oder self-taught, es zählt, *wie* du denkst und mit KI arbeitest. Brauchst du Unterstützung oder Anpassungen im Prozess, sag uns Bescheid. Die Challenge ist unbezahlt — dafür bekommst du echten Gegenwert: **nach dem Debrief zeigen wir dir unsere eigene Lösung** (mit echten Entscheidungen, Prompts und Trade-offs) und **strukturiertes, ehrliches Feedback für jede:n** — kein Ghosting, nie.

> Was du **hier nicht findest**, ist unsere eigene Referenzlösung. Die heben wir bewusst für den gemeinsamen Debrief auf — damit du frei und ohne Anchoring an die Aufgabe gehst.

— *AI:AT Hiring Team*
