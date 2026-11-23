import type { PillarApp } from "./content-types";
import { tiktok, capcut } from "./apps-parts/part1";
import { whatsapp, instagram, telegram } from "./apps-parts/part2";
import { youtube, spotify, canva } from "./apps-parts/part3";
import { bstation, minecraft, kucing } from "./apps-parts/part4";
import { expansionA } from "./apps-parts/expansion-a";
import { expansionB } from "./apps-parts/expansion-b";
import { expansionC } from "./apps-parts/expansion-c";

// Katalog Fase 3: 11 halaman Fase 1 + 20 entitas workbook (expansion A+B, keuangan terakhir)
// + 19 aplikasi tambahan (expansion C) = 50 halaman aplikasi terbit.
export const pillarApps: PillarApp[] = [
  tiktok, capcut, whatsapp, instagram, telegram, youtube, spotify, canva, bstation, minecraft, kucing,
  ...expansionA, ...expansionB, ...expansionC,
];
export const catalogApps = pillarApps;
export function getApp(slug: string): PillarApp | undefined { return pillarApps.find((a) => a.slug === slug); }
