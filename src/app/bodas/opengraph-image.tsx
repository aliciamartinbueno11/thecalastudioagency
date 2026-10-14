export const dynamic = "force-static";

import { ImageResponse } from "next/og";

export const alt = "Cala Weddings by Cala Studio — Diseño de bodas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#faf6ef", color: "#24201b", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", right: 90, top: 70, width: 330, height: 490, background: "#ece4d6", borderTopLeftRadius: 999, borderTopRightRadius: 999, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6 }}>CALA WEDDINGS · by Cala Studio</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -2 }}>
            <span>Una boda tan vuestra</span>
            <span style={{ color: "#2b6f66" }}>como vuestra historia.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#675f55" }}>Invitaciones · Papelería · Webs de boda · Diseño del gran día</div>
        </div>
      </div>
    ),
    size,
  );
}
