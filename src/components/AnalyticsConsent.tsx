"use client";

import { useEffect, useRef, useState } from "react";

const GA_ID = "G-7N3Q6ZC3X1";
const CONSENT_KEY = "cekapk-analytics-consent";

type Choice = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
  }
}

function prepareGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
}

function setDefaultConsent() {
  prepareGtag();

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

function updateConsent(accepted: boolean) {
  prepareGtag();

  Reflect.set(window, `ga-disable-${GA_ID}`, !accepted);

  window.gtag("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

function loadAnalytics() {
  prepareGtag();

  updateConsent(true);

  if (document.getElementById("cekapk-ga4")) return;

  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  const script = document.createElement("script");
  script.id = "cekapk-ga4";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export default function AnalyticsConsent({
  locale,
}: {
  locale: "id" | "en";
}) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(false);
  // UI-03 Rev 1 (Part 3): measured overlap correction. While the banner is
  // open, an in-flow spacer of exactly the banner's height (+ its distance
  // from the viewport bottom) sits at the end of the page, so the last
  // content can scroll fully above the fixed banner instead of hiding
  // behind it. The banner itself sits ABOVE the mobile bottom nav
  // (bottom-[72px] = 56px nav + 16px gap), and the settings pill sits above
  // the nav too (bottom-20 on mobile). Consent logic is untouched.
  const bannerRef = useRef<HTMLElement | null>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  const en = locale === "en";
  const bannerOpen = ready && (choice === null || open);

  useEffect(() => {
    setDefaultConsent();

    let saved: string | null = null;

    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {
      // Consent can still be selected for the current page session.
    }

    if (saved === "accepted") {
      setChoice("accepted");
      loadAnalytics();
    } else if (saved === "rejected") {
      setChoice("rejected");
      updateConsent(false);
    } else {
      setChoice(null);
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!bannerOpen) return;
    const el = bannerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      // Banner height + its gap to the viewport bottom (72px mobile above
      // the nav, 20px desktop) — the spacer must clear both.
      setSpacerHeight(Math.ceil(r.height + (window.innerHeight - r.bottom)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [bannerOpen]);

  function choose(next: "accepted" | "rejected") {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // Apply the selection for this page session if storage is unavailable.
    }

    setChoice(next);

    if (next === "accepted") {
      loadAnalytics();
    } else {
      updateConsent(false);
    }

    setOpen(false);
  }

  if (!ready) return null;

  return (
    <>
      {bannerOpen ? (
        <section
          ref={bannerRef}
          role="region"
          aria-label={en ? "Analytics cookie preferences" : "Preferensi cookie analitik"}
          className="fixed inset-x-3 bottom-[72px] z-[60] mx-auto max-w-2xl rounded-2xl border border-mist bg-paper p-5 shadow-2xl sm:inset-x-6 sm:bottom-5"
        >
          <h2 className="text-base font-bold text-ink">
            {en ? "Your privacy choices" : "Pilihan privasimu"}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-ink/75">
            {en
              ? "CekAPK uses Google Analytics to understand website traffic and improve its pages. Analytics is optional and stays disabled unless you accept. You can change your choice at any time in Cookie settings. Read our"
              : "CekAPK menggunakan Google Analytics untuk memahami kunjungan situs dan meningkatkan halaman. Analitik bersifat opsional dan tetap nonaktif sampai kamu menyetujuinya. Kamu dapat mengubah pilihan kapan saja melalui Pengaturan cookie. Baca"}
            {" "}
            <a
              href={en ? "/en/privacy-policy" : "/privasi"}
              className="font-semibold text-primary underline underline-offset-2"
            >
              {en ? "Privacy Policy" : "Kebijakan Privasi"}
            </a>.
          </p>

          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="rounded-xl border border-mist px-4 py-2.5 text-sm font-semibold text-ink hover:bg-mist"
            >
              {en ? "Reject optional cookies" : "Tolak cookie opsional"}
            </button>

            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              {en ? "Accept analytics" : "Terima analitik"}
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 z-[60] rounded-full border border-mist bg-paper px-4 py-2 text-xs font-semibold text-ink shadow-lg hover:border-primary sm:bottom-4"
          aria-label={en ? "Open cookie settings" : "Buka pengaturan cookie"}
        >
          {en ? "Cookie settings" : "Pengaturan cookie"}
        </button>
      )}
      {/* Spacer reserving exactly the banner's footprint while it is open;
          animates to 0 when it closes so the page never jumps. */}
      <div aria-hidden="true" style={{ height: bannerOpen ? spacerHeight : 0 }} className="transition-[height] duration-300 ease-out" />
    </>
  );
}
