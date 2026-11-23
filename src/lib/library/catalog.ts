// Kandidat Library Legal: aplikasi open-source nyata yang file-nya BOLEH didistribusikan ulang
// menurut lisensinya. File TIDAK di-host sampai admin mengunggah file dari sumber resmi dan
// pipeline 14 lolos. Tautan di sini selalu ke halaman resmi F-Droid.
export interface LibraryCandidate { name: string; packageName: string; developer: string; licence: string; fdroidUrl: string; note: string }
export const libraryCandidates: LibraryCandidate[] = [
  { name: "F-Droid", packageName: "org.fdroid.fdroid", developer: "F-Droid Limited", licence: "GPL-3.0+", fdroidUrl: "https://f-droid.org/en/packages/org.fdroid.fdroid/", note: "Katalog aplikasi Android open-source itu sendiri - sumber utama file legal kami." },
  { name: "NewPipe", packageName: "org.schabi.newpipe", developer: "Team NewPipe", licence: "GPL-3.0+", fdroidUrl: "https://f-droid.org/en/packages/org.schabi.newpipe/", note: "Klien YouTube ringan open-source yang terkenal; distribusi ulang diizinkan lisensinya." },
  { name: "AntennaPod", packageName: "de.danoeh.antennapod", developer: "AntennaPod Contributors", licence: "GPL-3.0+", fdroidUrl: "https://f-droid.org/en/packages/de.danoeh.antennapod/", note: "Pemutar podcast open-source tanpa iklan dan tanpa akun wajib." },
  { name: "KeePassDX", packageName: "com.kunzisoft.keepass.libre", developer: "Kunzisoft", licence: "GPL-3.0+", fdroidUrl: "https://f-droid.org/en/packages/com.kunzisoft.keepass.libre/", note: "Pengelola kata sandi offline open-source - kandidat ideal untuk audit izin yang bersih." },
  { name: "Organic Maps", packageName: "app.organicmaps", developer: "Organic Maps Contributors", licence: "Apache-2.0", fdroidUrl: "https://f-droid.org/en/packages/app.organicmaps/", note: "Peta offline open-source berbasis data OpenStreetMap, tanpa pelacak iklan." },
];
