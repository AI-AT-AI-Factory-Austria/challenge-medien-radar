/**
 * bildeWochenBuckets: Verteilt Artikel auf 7-Tage-Wochen-Buckets je Marke und
 * zählt pro Woche Mention-Volumen + Netto-Sentiment.
 *
 * Die Buckets rastern ab dem frühesten Artikel-Datum in 7-Tage-Schritten. Ein
 * Artikel gehört in genau eine Woche; pro Woche werden Mentions gezählt und das
 * mittlere Sentiment gebildet — die Grundlage für den Anomalie-Detektor
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
