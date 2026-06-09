# AI Developer Challenge: „Medien-Radar"

Version 1.0 · 2026-06 · Kontakt: AI:AT Hiring Team

Schön, dass du dabei bist. Das hier ist kein Trick-Test. Es ist ein echtes Stück von dem, was wir im Venture Studio & n8n CoE täglich tun: mit KI schnell etwas Lauffähiges bauen, das Mehrwert schafft.

Es gibt keine Musterlösung, die du treffen musst. Wir schauen, wie du ein unscharf spezifiziertes Problem zerlegst, Entscheidungen triffst und KI sinnvoll einsetzt.

## Die Mission

PR/Comms-Agenturen betreuen mehrere Marken-Accounts gleichzeitig und müssen täglich „noise → signal" verdichten: *Wer schreibt diese Woche über meine Marke? In welchem Ton? Und wann kippt die Stimmung, oder explodiert das Volumen?* Heute erledigen Teams das manuell oder mit Profi-Tools wie Meltwater, die 2 000–5 000 € pro Monat kosten.

Bau einen „Medien-Radar": einen TypeScript-Agenten, der einen Artikel-Korpus (Brand-Mentions aus verschiedenen Quellen) einliest, Sentiment + Entitäten je Artikel klassifiziert, einen Wochen-Report (PDF) erzeugt und bei einem Mention- oder Sentiment-Spike einen Anomalie-Alert auslöst.

**Wir liefern dir:** einen synthetischen Artikel-Korpus (`../data/articles.json`, 36 Einträge über 4 Wochen, Marke „Volt-Cola") mit eingebautem Anomalie-Fenster, sodass dein Agent ohne Netzwerkzugriff kalt starten und dabei tatsächlich etwas zu finden hat.

> **Agentic-Pattern:** `fetch/ingest → dedup/normalize → Sentiment+Entity → Zeitreihen-Anomalie → PDF-Report + Alert`.

> 📂 **Im Repo:** [`../data/`](../data/) mit `articles.json` + Feld-Doku [`../data/README.md`](../data/README.md).

### Teil A: Bau den Agenten

- **Input:** ein Markenname (hier „Volt-Cola") + eine Artikel-Quelle. Der Default-Pfad nutzt den beiliegenden synthetischen Seed `../data/articles.json` (kein Netz, kein API-Key nötig).
- **Output:**
  1. **Wochen-Report (PDF):** Mention-Volumen je Woche und Quelle, Sentiment-Verteilung, Top-Entitäten, Top-Artikel (Titel + Quelle + Sentiment-Label).
  2. **Anomalie-Alert** (maschinenlesbar, z. B. JSON auf stdout): Welche Woche? Mention-Spike, Sentiment-Drop oder beides? Magnitude? Plus eine kurze Begründung.
- **Form:** lauffähiges Git-Repo mit echtem TypeScript-Code + ein README, das uns das Ding in ≤ 5 Minuten zum Laufen bringt. `npm install && npm start` muss ohne API-Key und ohne Netz durchlaufen.

> **Die interessanten Design-Entscheidungen:** Wie definierst du eine „Anomalie" in einer Zeitreihe mit wenigen Wochen: welche Baseline, welcher Schwellenwert, was löst tatsächlich einen Alert aus? Wie gehst du mit Dedup um (dieselbe Story erscheint in mehreren Quellen)? Wie trennst du das Sentiment-Modell vom Rest des Codes, sodass du später ohne Rewrite zwischen LLM-Call und deterministischer Heuristik wechseln kannst? Diese Entscheidungen sind bewusst dir überlassen; wir achten auf die Begründung, nicht auf eine vorgegebene Formel.

> **Sentiment + Entitäten:** Du musst das Sentiment selbst berechnen (LLM oder Heuristik/Keyword-Lexikon, beides ist ok). Das Dataset enthält kein vorberechnetes Sentiment-Feld; das vorzugeben wäre der falsche Weg, denn das Klassifizieren ist Teil der Aufgabe. Ein echter LLM-Call (z. B. OpenAI, Anthropic, lokales Modell) ist erlaubt, aber nicht Pflicht: ein deterministischer Heuristik-Fallback ohne Key ist völlig okay und zählt als vollwertige Lösung. Falls du keinen API-Key hast, brauchst du auch keinen.

> **Optionaler Stretch (Live-Pfad):** Echte Anbindung an die GDELT DOC 2.0 API (`api.gdeltproject.org/api/v2/doc/doc`, kein Key) + öffentliche News-RSS-Feeds (ORF, DerStandard, BBC) via `--live`-Flag. GDELT throttelt aggressiv (429-Fehler), Backoff + Cache sind dann Pflicht. Der Cold-Start ohne `--live` darf dadurch nicht blockieren.

### Teil B: Code-Review (~15 min)

Wir geben dir ein kurzes, KI-generiertes TypeScript-Snippet ([`code-review/snippet.ts`](./code-review/snippet.ts)). **Tipp:** Vergleiche, was der Doc-Kommentar *verspricht*, mit dem, was der Code *tut*, und führe ihn an einem kleinen Beispiel im Kopf durch.

Es gibt einen zentralen funktionalen Bug. Finde *den*, fixe ihn, und begründe in 3–5 Sätzen, warum es einer ist. Sag uns auch, was dir sonst auffällt (Edge-Cases, fragwürdige Annahmen, fehlende Tests); diese weiterführende Kritik zählt für uns genauso wie der Fix selbst. Wir wollen sehen, ob du KI-Output beurteilen kannst, nicht nur erzeugen.

> Das Snippet liegt als Datei unter [`code-review/snippet.ts`](./code-review/snippet.ts) und ist unten in **Anhang A** abgedruckt.

## Spielregeln

- **Aufwand: ~4–6 fokussierte Stunden.** Du hast eine Woche; die ist für *Flexibilität*, nicht zum Durchgrinden. Bitte nicht überinvestieren: wir bewerten Denken & Urteil, nicht Politur. *(Die 4–6 h schließen Walkthrough + Decision-Log ein. Loom: 1 Take, 3–5 min; Decision-Log: 5–10 Zeilen Stichworte.)*
- **Nutze jede KI, jede Library, google frei.** Wird erwartet, nicht nur erlaubt. Cursor, Claude, Copilot, Coding-Agents: leg los.
- **Der Kern (A + B) ist die Latte.** Dazu gehören auch ein paar sinnvolle Tests (kein Coverage-Theater; zählen mit 10 %). Stretch-Goals (Live-Pfad, echter LLM-Anbieter, Multi-Brand-Watchlist, Trend-Charts im PDF, E-Mail-Versand, Deployment) sind zum Glänzen, komplett optional.

> **Wichtig:** Ein breiter, rauer End-to-End-Durchstich schlägt eine perfekte Einzelkomponente. Wir meinen das ernst, bitte nicht überinvestieren. Mehr Stunden bedeuten bei uns nicht mehr Punkte; wir bewerten das Kern-Ergebnis, nicht den Zeitaufwand.

AI Factory Austria steht für Chancengleichheit. Brauchst du Unterstützung oder Anpassungen im Prozess, sag uns Bescheid, wir helfen. Ob Uni, Bootcamp oder self-taught: es zählt, wie du denkst und mit KI arbeitest.

## Was du abgibst

1. **Repo-Link** (GitHub/GitLab) mit Code + README.
2. **Code-Review-Antwort** (Teil B): als Datei im Repo oder kurzes Doc.
3. **Walkthrough (1 Take, 3–5 min, max. 5):** ein Loom/Screen-Recording. Zeig dein Ergebnis und erklär *wie* du gebaut hast, vor allem die KI-Schritte. *(Kein Video möglich oder gewünscht? Ein knappes schriftliches Walkthrough-Skript zählt als gleichwertig, sag einfach Bescheid.)*
4. **Kurzes Decision-Log + Schlüssel-Prompts:** 5–10 Zeilen Entscheidungen/Trade-offs + die KI-Prompts, die den Unterschied gemacht haben. Zeig uns, *wie du mit KI zusammenarbeitest*; das ist genau die Fähigkeit, für die wir die Rolle besetzen.
5. **Selbst-Report:** wie viele Stunden hast du investiert? (Ehrlich, kein Maluspunkt.)

## So bewerten wir (transparent)

| Dimension | Gewicht |
|---|---|
| Funktionalität (läuft es, erfüllt es den Kern) | 20% |
| Decomposition & Urteil (Ambiguität sinnvoll gelöst, gute Trade-offs) | 20% |
| AI-Collaboration / Prozess (wie du KI gehebelt & geprüft hast) | 20% |
| Code-Qualität & Taste (lesbar, wartbar, KI-„Slop" erkannt) | 15% |
| Kommunikation / Doku (README, Decision-Log, Walkthrough) | 15% |
| Tests (sinnvolle Tests, kein Coverage-Theater) | 10% |

> Teil B (Code-Review) fließt nicht in die obige Gewichtung ein. Es ist ein separates Signal mit besonders hohem Informationsgehalt über dein Urteil zu KI-Code und kann bei knappen Entscheidungen den Ausschlag geben.

## Abgabe & Zeitplan

- **Deadline:** **die Begleit-E-Mail nennt das verbindliche Abgabedatum** (Richtwert: 7 Kalendertage ab Erhalt).
- **Abgabe:** per E-Mail an aiandbusinessgrowth@ai-at.eu.
- **Rückmeldung:** Wir melden uns innerhalb von ~10 Werktagen, mit einem Termin für den Live-Teil oder einer kurzen Rückmeldung.

> Die konkreten Daten (Abgabedatum, ggf. Upload-Link) findest du in der Begleit-E-Mail zu diesem Brief.

## Danach

Kurzer **Live-Walkthrough (30–45 min)**: du zeigst dein Ergebnis, wir setzen *live eine neue Anforderung* drauf und schauen, wie du deinen eigenen Code erweiterst. Die neue Anforderung ist bewusst klein. Es geht darum, wie du laut denkst, nicht um ein perfektes Ergebnis in 10 Minuten. Deine gewohnten KI-Tools darfst du dabei nutzen, genau wie beim Bauen. Danach zeigen wir dir unsere eigene Lösung und reden ehrlich darüber. Jede:r bekommt Feedback, egal wie's ausgeht.

> **Fair & transparent.** Diese Challenge ist unbezahlt. Im Gegenzug zeigen wir dir nach dem Debrief unsere eigene Lösung, mit echten Entscheidungen, Prompts und Trade-offs. Das ist unser „Learn"-Versprechen in Aktion. Dazu strukturiertes, ehrliches Feedback für jede:n, egal wie der Prozess ausgeht. Kein Ghosting. Nie.

Wir sind gespannt, wie du die Aufgabe angehst.

## Spielregeln zu den Daten

> ⚠️ Das Seed-Dataset ist synthetisch / vereinfacht (Stand 2026-06) und keine offizielle AI:AT-Position. Die Marke „Volt-Cola" sowie alle genannten Personen, Quellen-Zuordnungen und Ereignisse sind vollständig erfunden. Die Datenstruktur (Felder, Datumsformate, Quellen-Mix) ist an reale GDELT- und News-RSS-Shapes angelehnt, aber stark vereinfacht. Jeder JSON-Eintrag trägt ein `_hinweis`-Feld. Behandle die Daten als Spielmaterial, nicht als echte Medienberichterstattung.

## Datenschutz

> **Datenschutz.** Deine Unterlagen (Repo-Link, Loom-Link, Dokumente, Prompts) nutzen wir ausschließlich für die Besetzungsentscheidung, geben sie nicht an unbeteiligte Dritte weiter und löschen sie spätestens sechs Monate nach Abschluss des Auswahlverfahrens (oder früher auf deinen Wunsch), gemäß DSGVO. Rechtsgrundlage ist die Anbahnung eines möglichen Arbeitsverhältnisses (Art. 6 DSGVO); du kannst jederzeit Auskunft oder Löschung verlangen. Was du erstellst, bleibt deins: wir verwenden es nur zur Bewertung, nie produktiv. Dein Repo kannst du auch privat halten und uns Zugriff geben; deinen Walkthrough sehen nur wir intern. Von dir gewählte Hosting-Dienste (z. B. GitHub, Loom) unterliegen deren eigenen Datenschutzbestimmungen. Fragen: aiandbusinessgrowth@ai-at.eu.

## Anhang A: Code-Snippet (Teil B)

Das ist das Snippet für Teil B: finde den Bug, fixe ihn, kritisiere kurz. (Auch als Datei: [`code-review/snippet.ts`](./code-review/snippet.ts).)

```ts
/**
 * bildeWochenBuckets: Verteilt Artikel auf 7-Tage-Wochen-Buckets je Marke und
 * zählt pro Woche Mention-Volumen + Netto-Sentiment.
 *
 * Die Buckets rastern ab dem frühesten Artikel-Datum in 7-Tage-Schritten. Ein
 * Artikel gehört in genau eine Woche; pro Woche werden Mentions gezählt und das
 * mittlere Sentiment gebildet, die Grundlage für den Anomalie-Detektor
 * (Mention-Spike / Sentiment-Drop).
 */

interface Artikel {
  id: string;
  datum: string; // ISO-8601, z. B. "2026-06-15T09:00:00+02:00"
  titel: string;
  sentiment: number; // berechneter Score, -1..+1
}

interface WochenBucket {
  start: string; // Kalendertag, z. B. "2026-06-15"
  ende: string; // Kalendertag (letzter Tag der Woche)
  mentions: number;
  nettoSentiment: number;
}

/** "2026-06-15T09:00:00+02:00" -> "2026-06-15" */
function kalenderTag(datum: string): string {
  return datum.slice(0, 10);
}

/** Kalendertag + n Tage -> neuer Kalendertag (YYYY-MM-DD). */
function plusTage(tag: string, n: number): string {
  const t = Date.parse(`${tag}T00:00:00Z`) + n * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

function bildeWochenBuckets(artikel: Artikel[]): WochenBucket[] {
  if (artikel.length === 0) return [];

  const tage = artikel.map((a) => kalenderTag(a.datum));
  const ersterTag = tage.reduce((min, d) => (d < min ? d : min), tage[0]);
  const letzterTag = tage.reduce((max, d) => (d > max ? d : max), tage[0]);

  const spanne =
    (Date.parse(`${letzterTag}T00:00:00Z`) - Date.parse(`${ersterTag}T00:00:00Z`)) /
    86_400_000;
  const anzahl = Math.floor(spanne / 7) + 1;

  const buckets: WochenBucket[] = [];
  for (let b = 0; b < anzahl; b++) {
    const start = plusTage(ersterTag, b * 7);
    const ende = plusTage(start, 7); // Wochenende (start + 7 Tage)

    // Artikel dieser Woche: alle Tage von start bis ende.
    const drin = artikel.filter((a) => {
      const tag = kalenderTag(a.datum);
      return tag >= start && tag <= ende;
    });

    const summe = drin.reduce((acc, a) => acc + a.sentiment, 0);
    buckets.push({
      start,
      ende,
      mentions: drin.length,
      nettoSentiment: drin.length ? Math.round((summe / drin.length) * 100) / 100 : 0,
    });
  }

  return buckets;
}

// ---------------------------------------------------------------------------
// Demo
// ---------------------------------------------------------------------------

const artikel: Artikel[] = [
  { id: "a1", datum: "2026-06-01T09:00:00+02:00", titel: "Sommer-Edition", sentiment: 0.4 },
  { id: "a2", datum: "2026-06-07T10:00:00+02:00", titel: "Sponsoring", sentiment: 0.3 },
  { id: "a3", datum: "2026-06-08T09:00:00+02:00", titel: "Abfüllanlage", sentiment: 0.5 },
  { id: "a4", datum: "2026-06-15T08:00:00+02:00", titel: "Rückruf", sentiment: -0.7 },
];

const buckets = bildeWochenBuckets(artikel);

console.log("Wochen-Buckets:");
for (const b of buckets) {
  console.log(`  ${b.start} – ${b.ende}: ${b.mentions} Mentions, Ø ${b.nettoSentiment}`);
}
```
