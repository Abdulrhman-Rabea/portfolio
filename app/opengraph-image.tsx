import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#edeae4",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#ff5a1f", letterSpacing: 4 }}>
          PORTFOLIO
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, lineHeight: 1, letterSpacing: -3 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 44, color: "#8a8a8f", marginTop: 24 }}>{siteConfig.title}</div>
        </div>

        <div style={{ display: "flex", height: 6, width: 160, background: "#ff5a1f" }} />
      </div>
    ),
    size,
  );
}