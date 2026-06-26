import { ImageResponse } from "next/og";

// Brand-true social card: the wordmark on warm black with the single brass
// hairline, so a shared link or bookmark never breaks the identity.
export const alt = "Crestmont Consulting — Strategy · Advisory · Transformation";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0a08",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: 28,
            color: "#f6f3ec",
            fontFamily: "Helvetica, Arial, sans-serif",
            paddingLeft: 28,
          }}
        >
          CRESTMONT
        </div>
        <div
          style={{ width: 120, height: 1, background: "#c4a978", marginTop: 36 }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            letterSpacing: 14,
            color: "#b3ada0",
            textTransform: "uppercase",
            fontFamily: "Helvetica, Arial, sans-serif",
            paddingLeft: 14,
          }}
        >
          Strategy · Advisory · Transformation
        </div>
      </div>
    ),
    { ...size }
  );
}
