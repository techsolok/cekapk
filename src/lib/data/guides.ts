import type { Guide } from "./content-types";
import { apkHijau, apkIjo } from "./guides-parts/part1";
import { instalAman, cekIzin, apkPalsu } from "./guides-parts/part2";
import { apkpure } from "./guides-parts/part3";
export const guides: Guide[] = [apkHijau, apkIjo, instalAman, cekIzin, apkPalsu, apkpure];
export function getGuide(slug: string): Guide | undefined { return guides.find((g) => g.slug === slug); }
