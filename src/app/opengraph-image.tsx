export const dynamic = "force-static";

import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Cala Studio — Marketing con cabeza.";
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
          background: "#f8f7f2",
          color: "#171717",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 360,
            height: 360,
            background: "#42dcc6",
            borderTopRightRadius: 360,
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 3 }}>
          <span>CALA STUDIO</span>
          <span style={{ color: "#62615c" }}>
            {site.coordinates.lat} · {site.coordinates.lng}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontSize: 92, lineHeight: 1, letterSpacing: -3, fontWeight: 700 }}>
          <span>Marketing con cabeza.</span>
          <span style={{ color: "#159c8e" }}>Creatividad con intención.</span>
        </div>
      </div>
    ),
    size,
  );
}
