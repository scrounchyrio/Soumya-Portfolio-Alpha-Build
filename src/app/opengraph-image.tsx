import { ImageResponse } from "next/og";
import { siteConfig } from "../../site.config";

export const runtime = "edge";
export const alt = siteConfig.meta.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          color: "#111111",
          padding: "60px 80px",
          fontFamily: "monospace",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            paddingBottom: "24px",
            fontSize: "18px",
            letterSpacing: "4px",
            color: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#D71921",
                marginRight: "12px",
              }}
            />
            <span>NOTHING_OS // SPEC_LIGHT_2026</span>
          </div>
          <div>{siteConfig.meta.coordinates}</div>
        </div>

        {/* Center: Monogram & Identity */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "6px",
              color: "#D71921",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            [SM // PORTFOLIO]
          </div>

          <div
            style={{
              fontSize: "68px",
              fontWeight: 300,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              color: "#111111",
              marginBottom: "20px",
            }}
          >
            SOUMYAJIT MUKHERJEE
          </div>

          <div
            style={{
              fontSize: "26px",
              color: "rgba(0, 0, 0, 0.65)",
              lineHeight: 1.4,
              maxWidth: "900px",
              fontFamily: "sans-serif",
            }}
          >
            Cinematic 3D LookDev · Hollywood VFX Credits · International Sustainability Research
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            paddingTop: "24px",
            fontSize: "16px",
            letterSpacing: "2px",
            color: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div>KOLKATA, INDIA // UBON // AMSTERDAM</div>
          <div>DNEG · MPC · UBU · UNGC · WAF</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
