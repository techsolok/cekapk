// Phase 2 SEO-14: shared branded OG card (1200x630) for next/og ImageResponse.
// Brand blue only, no app logos, no screenshots, no invented ratings/badges.
// Title/subtitle come from the real page data passed in by each route file.
export function OgCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  const fontSize = title.length > 55 ? 50 : 62;
  return (
    <div style={{ width: 1200, height: 630, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 72px", background: "linear-gradient(135deg, #0B4DA2 0%, #1565D8 100%)", color: "#ffffff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>CekAPK</div>
        <div style={{ fontSize: 24, opacity: 0.85 }}>cekapk.com</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ width: 96, height: 8, background: "#ffffff", opacity: 0.9, borderRadius: 4, marginBottom: 26 }} />
        <div style={{ fontSize, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
        <div style={{ marginTop: 20, fontSize: 27, lineHeight: 1.4, color: "#D6E6FB" }}>{subtitle}</div>
      </div>
      <div style={{ fontSize: 24, opacity: 0.85 }}>{eyebrow}</div>
    </div>
  );
}
